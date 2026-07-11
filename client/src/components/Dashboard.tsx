import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertCircle, Clock, MessageSquare, TrendingUp } from "lucide-react";

/**
 * TicketStream Dashboard
 * Displays key metrics: ticket volume, response time, chat activity, resolution rate
 * Uses card-based layout with soft shadows and sky blue accents
 */

const metricsData = [
  { name: "Mon", tickets: 24, resolved: 18 },
  { name: "Tue", tickets: 32, resolved: 28 },
  { name: "Wed", tickets: 28, resolved: 22 },
  { name: "Thu", tickets: 35, resolved: 30 },
  { name: "Fri", tickets: 42, resolved: 38 },
  { name: "Sat", tickets: 18, resolved: 16 },
  { name: "Sun", tickets: 12, resolved: 10 },
];

const responseTimeData = [
  { time: "00:00", avgTime: 8 },
  { time: "04:00", avgTime: 12 },
  { time: "08:00", avgTime: 5 },
  { time: "12:00", avgTime: 3 },
  { time: "16:00", avgTime: 4 },
  { time: "20:00", avgTime: 6 },
  { time: "23:00", avgTime: 9 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-white border border-border p-8">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="40" fill="currentColor" className="text-blue-400" />
            <circle cx="350" cy="150" r="60" fill="currentColor" className="text-orange-300" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="1" className="text-blue-200" />
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back to TicketStream</h1>
          <p className="text-muted-foreground">Your support team's command center. Manage tickets, respond to customers, and track performance.</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tickets */}
        <Card className="metric-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Tickets</p>
              <p className="text-3xl font-bold text-foreground">247</p>
              <p className="text-xs text-green-600 mt-2">↑ 12% from last week</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Avg Response Time */}
        <Card className="metric-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Avg Response Time</p>
              <p className="text-3xl font-bold text-foreground">4.2m</p>
              <p className="text-xs text-green-600 mt-2">↓ 8% improvement</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Active Chats */}
        <Card className="metric-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Chats</p>
              <p className="text-3xl font-bold text-foreground">18</p>
              <p className="text-xs text-orange-600 mt-2">3 waiting</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        {/* Resolution Rate */}
        <Card className="metric-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Resolution Rate</p>
              <p className="text-3xl font-bold text-foreground">92%</p>
              <p className="text-xs text-blue-600 mt-2">↑ 5% this month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Volume Chart */}
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Ticket Volume (7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="tickets" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="resolved" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Response Time Trend */}
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Response Time Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="avgTime"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ fill: "var(--accent)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="p-6 border border-border bg-gradient-to-r from-blue-50 to-white">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">156</p>
            <p className="text-xs text-muted-foreground mt-1">Resolved Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">23</p>
            <p className="text-xs text-muted-foreground mt-1">Urgent Tickets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">8.4/10</p>
            <p className="text-xs text-muted-foreground mt-1">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-xs text-muted-foreground mt-1">Team Members Online</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
