import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MessageSquare, Search, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Ticket {
  id: string;
  title: string;
  customer: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "open" | "in-progress" | "waiting" | "resolved";
  responseTime: string;
  messages: number;
  lastUpdate: string;
}

type StatusFilter = "all" | Ticket["status"];
type PriorityFilter = "all" | Ticket["priority"];

const initialTickets: Ticket[] = [
  { id: "TKT-2847", title: "Payment processing error on checkout", customer: "Acme Corp", priority: "critical", status: "open", responseTime: "2m", messages: 3, lastUpdate: "5 min ago" },
  { id: "TKT-2846", title: "Feature request: Dark mode support", customer: "TechStart Inc", priority: "low", status: "in-progress", responseTime: "15m", messages: 5, lastUpdate: "12 min ago" },
  { id: "TKT-2845", title: "API documentation unclear", customer: "DevTools LLC", priority: "high", status: "waiting", responseTime: "8m", messages: 2, lastUpdate: "8 min ago" },
  { id: "TKT-2844", title: "Billing inquiry - duplicate charge", customer: "Global Solutions", priority: "high", status: "open", responseTime: "3m", messages: 4, lastUpdate: "2 min ago" },
  { id: "TKT-2843", title: "Login issues after password reset", customer: "Creative Agency", priority: "medium", status: "in-progress", responseTime: "12m", messages: 6, lastUpdate: "1 min ago" },
  { id: "TKT-2842", title: "Export data in CSV format", customer: "Analytics Pro", priority: "medium", status: "waiting", responseTime: "20m", messages: 1, lastUpdate: "25 min ago" },
];

const getPriorityColor = (priority: Ticket["priority"]) => ({
  critical: "priority-critical",
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
}[priority]);

const getStatusColor = (status: Ticket["status"]) => ({
  open: "bg-red-50 text-red-700 border-red-200",
  "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
  waiting: "bg-yellow-50 text-yellow-700 border-yellow-200",
  resolved: "bg-green-50 text-green-700 border-green-200",
}[status]);

const formatStatus = (status: Ticket["status"]) => status.replace("-", " ").replace(/^[a-z]/, (letter) => letter.toUpperCase());

export default function TicketQueue() {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const filteredTickets = useMemo(() => tickets.filter((ticket) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = !query || [ticket.title, ticket.customer, ticket.id].some((value) => value.toLowerCase().includes(query));
    const matchesStatus = activeTab === "all" || ticket.status === activeTab;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  }), [activeTab, priorityFilter, searchTerm, tickets]);

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;

  const updateTicketStatus = (id: string, status: Ticket["status"]) => {
    setTickets((current) => current.map((ticket) => ticket.id === id ? { ...ticket, status, lastUpdate: "just now" } : ticket));
    toast.success(`Ticket ${id} marked ${formatStatus(status).toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Ticket Queue</h2>
        <p className="text-muted-foreground">Manage and respond to customer support tickets</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search by ticket ID, title, or customer..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="pl-10 h-10" aria-label="Search tickets" />
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by priority">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Priority</span>
        {(["all", "critical", "high", "medium", "low"] as PriorityFilter[]).map((priority) => (
          <button
            key={priority}
            type="button"
            aria-pressed={priorityFilter === priority}
            onClick={() => setPriorityFilter(priority)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${priorityFilter === priority ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white text-muted-foreground hover:text-foreground"}`}
          >
            {priority === "all" ? "All" : priority.charAt(0).toUpperCase() + priority.slice(1)}
          </button>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as StatusFilter)} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted">
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3 mt-4">
          {filteredTickets.length === 0 ? (
            <Card className="p-8 text-center border border-border"><p className="text-muted-foreground">No tickets match these filters.</p></Card>
          ) : filteredTickets.map((ticket) => (
            <Card key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)} className={`p-4 border transition-all duration-200 cursor-pointer ${selectedTicketId === ticket.id ? "border-primary shadow-md" : "border-border hover:border-primary/30 hover:shadow-md"}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-primary">{ticket.id}</span>
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}</Badge>
                        <Badge className={`border ${getStatusColor(ticket.status)}`}>{formatStatus(ticket.status)}</Badge>
                      </div>
                      <h3 className="font-medium text-foreground truncate">{ticket.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{ticket.customer}</div>
                        <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Response: {ticket.responseTime}</div>
                        <div className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{ticket.messages} messages</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{ticket.lastUpdate}</span>
                  <Button type="button" variant="outline" size="sm" onClick={(event) => { event.stopPropagation(); setSelectedTicketId(ticket.id); }} className="hover:bg-primary hover:text-primary-foreground">View</Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {selectedTicket && (
        <Card className="border-primary/30 bg-blue-50/50 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2"><Badge className="bg-blue-100 text-blue-700">Selected ticket</Badge><span className="text-sm font-semibold text-primary">{selectedTicket.id}</span></div>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{selectedTicket.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{selectedTicket.customer} · Last update {selectedTicket.lastUpdate}</p>
            </div>
            <Button type="button" variant="ghost" size="icon" aria-label="Close ticket details" onClick={() => setSelectedTicketId(null)}><X className="h-4 w-4" /></Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedTicket.status !== "resolved" && <Button type="button" size="sm" onClick={() => updateTicketStatus(selectedTicket.id, "resolved")}>Mark resolved</Button>}
            {selectedTicket.status !== "in-progress" && <Button type="button" size="sm" variant="outline" onClick={() => updateTicketStatus(selectedTicket.id, "in-progress")}>Start work</Button>}
            {selectedTicket.status !== "waiting" && <Button type="button" size="sm" variant="outline" onClick={() => updateTicketStatus(selectedTicket.id, "waiting")}>Request customer</Button>}
          </div>
        </Card>
      )}

      <Card className="p-4 border border-border bg-muted/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <p className="text-muted-foreground">Showing <span className="font-semibold text-foreground">{filteredTickets.length}</span> of <span className="font-semibold text-foreground">{tickets.length}</span> tickets</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <div><span className="text-muted-foreground">Critical: </span><span className="font-semibold text-red-600">{tickets.filter((ticket) => ticket.priority === "critical").length}</span></div>
            <div><span className="text-muted-foreground">High: </span><span className="font-semibold text-orange-600">{tickets.filter((ticket) => ticket.priority === "high").length}</span></div>
            <div><span className="text-muted-foreground">Avg Response: </span><span className="font-semibold text-blue-600">4.2m</span></div>
          </div>
        </div>
      </Card>
    </div>
  );
}
