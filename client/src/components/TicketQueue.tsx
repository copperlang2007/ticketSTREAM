import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MessageSquare, User, Search } from "lucide-react";
import { useState } from "react";

/**
 * TicketStream Ticket Queue
 * Displays support tickets with priority tags, customer info, and response times
 * Supports filtering by status and priority
 */

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

const ticketsData: Ticket[] = [
  {
    id: "TKT-2847",
    title: "Payment processing error on checkout",
    customer: "Acme Corp",
    priority: "critical",
    status: "open",
    responseTime: "2m",
    messages: 3,
    lastUpdate: "5 min ago",
  },
  {
    id: "TKT-2846",
    title: "Feature request: Dark mode support",
    customer: "TechStart Inc",
    priority: "low",
    status: "in-progress",
    responseTime: "15m",
    messages: 5,
    lastUpdate: "12 min ago",
  },
  {
    id: "TKT-2845",
    title: "API documentation unclear",
    customer: "DevTools LLC",
    priority: "high",
    status: "waiting",
    responseTime: "8m",
    messages: 2,
    lastUpdate: "8 min ago",
  },
  {
    id: "TKT-2844",
    title: "Billing inquiry - duplicate charge",
    customer: "Global Solutions",
    priority: "high",
    status: "open",
    responseTime: "3m",
    messages: 4,
    lastUpdate: "2 min ago",
  },
  {
    id: "TKT-2843",
    title: "Login issues after password reset",
    customer: "Creative Agency",
    priority: "medium",
    status: "in-progress",
    responseTime: "12m",
    messages: 6,
    lastUpdate: "1 min ago",
  },
  {
    id: "TKT-2842",
    title: "Export data in CSV format",
    customer: "Analytics Pro",
    priority: "medium",
    status: "waiting",
    responseTime: "20m",
    messages: 1,
    lastUpdate: "25 min ago",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "priority-critical";
    case "high":
      return "priority-high";
    case "medium":
      return "priority-medium";
    case "low":
      return "priority-low";
    default:
      return "priority-low";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-red-50 text-red-700 border-red-200";
    case "in-progress":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "waiting":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "resolved":
      return "bg-green-50 text-green-700 border-green-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export default function TicketQueue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTickets = ticketsData.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return ticket.status === activeTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Ticket Queue</h2>
        <p className="text-muted-foreground">Manage and respond to customer support tickets</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by ticket ID, title, or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-10"
        />
      </div>

      {/* Tabs for Status Filtering */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted">
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3 mt-4">
          {filteredTickets.length === 0 ? (
            <Card className="p-8 text-center border border-border">
              <p className="text-muted-foreground">No tickets found</p>
            </Card>
          ) : (
            filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="p-4 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left Section: Ticket Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-primary">{ticket.id}</span>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                          </Badge>
                          <Badge className={`border ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace("-", " ").charAt(0).toUpperCase() +
                              ticket.status.replace("-", " ").slice(1)}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-foreground truncate">{ticket.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {ticket.customer}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Response: {ticket.responseTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {ticket.messages} messages
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Actions */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{ticket.lastUpdate}</span>
                    <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Summary Footer */}
      <Card className="p-4 border border-border bg-muted/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredTickets.length}</span> of{" "}
              <span className="font-semibold text-foreground">{ticketsData.length}</span> tickets
            </p>
          </div>
          <div className="flex gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Critical: </span>
              <span className="font-semibold text-red-600">{ticketsData.filter((t) => t.priority === "critical").length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">High: </span>
              <span className="font-semibold text-orange-600">{ticketsData.filter((t) => t.priority === "high").length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Avg Response: </span>
              <span className="font-semibold text-blue-600">4.2m</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
