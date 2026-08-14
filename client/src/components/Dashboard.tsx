import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  Clock,
  MessageSquare,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

/**
 * TicketStream Dashboard
 * Period controls and quick actions update local UI state immediately so the dashboard feels alive.
 */

type Period = "7d" | "30d" | "90d";

const periodData: Record<Period, {
  label: string;
  tickets: number;
  responseTime: string;
  chats: number;
  resolutionRate: string;
  ticketVolume: Array<{ name: string; tickets: number; resolved: number }>;
  responseTrend: Array<{ time: string; avgTime: number }>;
  resolvedToday: number;
  urgentTickets: number;
  satisfaction: string;
  teamOnline: number;
}> = {
  "7d": {
    label: "Last 7 days",
    tickets: 247,
    responseTime: "4.2m",
    chats: 18,
    resolutionRate: "92%",
    ticketVolume: [
      { name: "Mon", tickets: 24, resolved: 18 },
      { name: "Tue", tickets: 32, resolved: 28 },
      { name: "Wed", tickets: 28, resolved: 22 },
      { name: "Thu", tickets: 35, resolved: 30 },
      { name: "Fri", tickets: 42, resolved: 38 },
      { name: "Sat", tickets: 18, resolved: 16 },
      { name: "Sun", tickets: 12, resolved: 10 },
    ],
    responseTrend: [
      { time: "00:00", avgTime: 8 },
      { time: "04:00", avgTime: 12 },
      { time: "08:00", avgTime: 5 },
      { time: "12:00", avgTime: 3 },
      { time: "16:00", avgTime: 4 },
      { time: "20:00", avgTime: 6 },
      { time: "23:00", avgTime: 9 },
    ],
    resolvedToday: 156,
    urgentTickets: 23,
    satisfaction: "8.4/10",
    teamOnline: 12,
  },
  "30d": {
    label: "Last 30 days",
    tickets: 984,
    responseTime: "4.8m",
    chats: 26,
    resolutionRate: "89%",
    ticketVolume: [
      { name: "W1", tickets: 214, resolved: 188 },
      { name: "W2", tickets: 238, resolved: 214 },
      { name: "W3", tickets: 276, resolved: 245 },
      { name: "W4", tickets: 256, resolved: 228 },
    ],
    responseTrend: [
      { time: "Week 1", avgTime: 6.1 },
      { time: "Week 2", avgTime: 5.4 },
      { time: "Week 3", avgTime: 4.9 },
      { time: "Week 4", avgTime: 4.8 },
    ],
    resolvedToday: 42,
    urgentTickets: 31,
    satisfaction: "8.1/10",
    teamOnline: 14,
  },
  "90d": {
    label: "Last 90 days",
    tickets: 2847,
    responseTime: "5.1m",
    chats: 34,
    resolutionRate: "87%",
    ticketVolume: [
      { name: "Apr", tickets: 846, resolved: 734 },
      { name: "May", tickets: 912, resolved: 781 },
      { name: "Jun", tickets: 1089, resolved: 924 },
    ],
    responseTrend: [
      { time: "Apr", avgTime: 6.8 },
      { time: "May", avgTime: 5.7 },
      { time: "Jun", avgTime: 5.1 },
    ],
    resolvedToday: 38,
    urgentTickets: 44,
    satisfaction: "7.9/10",
    teamOnline: 16,
  },
};

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("just now");
  const data = periodData[period];

  const metrics = useMemo(
    () => [
      { label: "Total Tickets", value: data.tickets.toLocaleString(), detail: "↑ 12% from last period", icon: AlertCircle, iconClass: "text-blue-600", bgClass: "bg-blue-100" },
      { label: "Avg Response Time", value: data.responseTime, detail: "↓ 8% improvement", icon: Clock, iconClass: "text-green-600", bgClass: "bg-green-100" },
      { label: "Active Chats", value: data.chats.toString(), detail: "3 waiting", icon: MessageSquare, iconClass: "text-orange-600", bgClass: "bg-orange-100" },
      { label: "Resolution Rate", value: data.resolutionRate, detail: "↑ 5% this period", icon: TrendingUp, iconClass: "text-blue-600", bgClass: "bg-blue-100" },
    ],
    [data]
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated("just now");
      toast.success("Dashboard data refreshed");
    }, 450);
  };

  const handleQuickAction = (label: string) => {
    toast.success(`${label} opened`, { description: "This action is ready for the next workflow step." });
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-white border border-border p-8">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="currentColor" className="text-blue-400" />
            <circle cx="350" cy="150" r="60" fill="currentColor" className="text-orange-300" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="1" className="text-blue-200" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back to TicketStream</h1>
            <p className="text-muted-foreground">Your support team's command center. Manage tickets, respond to customers, and track performance.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-border bg-white/80 p-1" role="group" aria-label="Dashboard period">
              {(["7d", "30d", "90d"] as Period[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={period === option}
                  onClick={() => setPeriod(option)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${period === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {option === "7d" ? "7D" : option === "30d" ? "30D" : "90D"}
                </button>
              ))}
            </div>
            <Button type="button" size="sm" variant="outline" onClick={handleRefresh} disabled={isRefreshing} className="gap-2 bg-white/80">
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
        <p className="relative z-10 mt-3 text-xs text-muted-foreground">Showing {data.label.toLowerCase()} · Updated {lastUpdated}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="metric-card transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-green-600 mt-2">{metric.detail}</p>
                </div>
                <div className={`p-3 rounded-lg ${metric.bgClass}`}>
                  <Icon className={`w-6 h-6 ${metric.iconClass}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-border">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Ticket Volume</h3>
            <span className="text-xs text-muted-foreground">{data.label}</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.ticketVolume}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
              <Bar dataKey="tickets" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="resolved" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border border-border">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Response Time Trend</h3>
            <span className="text-xs text-muted-foreground">Minutes</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.responseTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="avgTime" stroke="var(--accent)" strokeWidth={2} dot={{ fill: "var(--accent)", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 border border-border bg-gradient-to-r from-blue-50 to-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Jump into the next support workflow.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => handleQuickAction("New ticket")}>New ticket</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => handleQuickAction("Live chat")}>Open live chat</Button>
            <Button type="button" size="sm" variant="outline" onClick={() => handleQuickAction("Knowledge base")}>Browse articles</Button>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center"><p className="text-2xl font-bold text-primary">{data.resolvedToday}</p><p className="text-xs text-muted-foreground mt-1">Resolved Today</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-accent">{data.urgentTickets}</p><p className="text-xs text-muted-foreground mt-1">Urgent Tickets</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-green-600">{data.satisfaction}</p><p className="text-xs text-muted-foreground mt-1">Customer Satisfaction</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-blue-600">{data.teamOnline}</p><p className="text-xs text-muted-foreground mt-1">Team Members Online</p></div>
        </div>
      </Card>
    </div>
  );
}
