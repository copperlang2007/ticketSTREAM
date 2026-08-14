import { useState } from "react";
import { Bell, Check, CircleAlert } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import TicketQueue from "@/components/TicketQueue";
import ConversationThread from "@/components/ConversationThread";
import KnowledgeBase from "@/components/KnowledgeBase";
import Footer from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  detail: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "notification-1", title: "Critical ticket needs attention", detail: "TKT-2847 · Payment processing error", read: false },
  { id: "notification-2", title: "New live chat waiting", detail: "Visitor from Acme Corp", read: false },
  { id: "notification-3", title: "Weekly report is ready", detail: "Your support summary is available", read: true },
];

/**
 * TicketStream Home Page
 * Navigation, notification state, and section content all respond immediately to agent actions.
 */
export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "tickets":
        return <TicketQueue />;
      case "conversation":
        return <ConversationThread />;
      case "knowledge-base":
        return <KnowledgeBase />;
      default:
        return <Dashboard />;
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((current) => current.map((notification) => notification.id === id ? { ...notification, read: true } : notification));
  };

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
    toast.success("All notifications marked as read");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="flex-1 lg:ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 pl-16 lg:ml-0 lg:pl-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">
              {activeSection === "dashboard" && "Dashboard"}
              {activeSection === "tickets" && "Ticket Queue"}
              {activeSection === "conversation" && "Conversation"}
              {activeSection === "knowledge-base" && "Knowledge Base"}
            </h1>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" aria-label={`${unreadCount} unread notifications`} className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">{unreadCount}</span>}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <DropdownMenuLabel className="px-0">Notifications</DropdownMenuLabel>
                    {unreadCount > 0 && <button type="button" onClick={markAllRead} className="text-xs font-semibold text-primary hover:underline">Mark all read</button>}
                  </div>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} onSelect={() => markNotificationRead(notification.id)} className="items-start gap-3 py-3">
                      <span className={`mt-0.5 rounded-full p-1 ${notification.read ? "bg-muted text-muted-foreground" : "bg-orange-100 text-orange-600"}`}><CircleAlert className="h-3.5 w-3.5" /></span>
                      <span className="flex flex-col gap-0.5">
                        <span className={`text-sm ${notification.read ? "font-medium" : "font-semibold"}`}>{notification.title}</span>
                        <span className="text-xs text-muted-foreground">{notification.detail}</span>
                      </span>
                      {notification.read && <Check className="ml-auto mt-1 h-3.5 w-3.5 text-green-600" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-sm font-semibold text-blue-700">SJ</span></div>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">{renderSection()}</div>
        <Footer />
      </main>
    </div>
  );
}
