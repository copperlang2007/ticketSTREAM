import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Ticket, MessageSquare, BookOpen, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

/**
 * TicketStream Navigation
 * Sidebar navigation with main sections: Dashboard, Tickets, Chat, Knowledge Base
 */

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tickets", label: "Ticket Queue", icon: Ticket },
    { id: "conversation", label: "Conversation", icon: MessageSquare },
    { id: "knowledge-base", label: "Knowledge Base", icon: BookOpen },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-border transition-transform duration-300 lg:translate-x-0 z-40 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">TS</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">TicketStream</h1>
            <p className="text-xs text-muted-foreground">Support Hub</p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-700">SJ</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground truncate">Team Lead</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-3">Main</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <Separator className="my-2" />

        {/* Settings Section */}
        <div className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-3">Other</p>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground hover:bg-muted"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground hover:bg-muted"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            v1.0.0 • <a href="#" className="hover:text-primary">Help</a>
          </p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
