import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import TicketQueue from "@/components/TicketQueue";
import ConversationThread from "@/components/ConversationThread";
import KnowledgeBase from "@/components/KnowledgeBase";
import Footer from "@/components/Footer";

/**
 * TicketStream Home Page
 * Main application layout with navigation and section switching
 * Displays Dashboard, Ticket Queue, Conversation Thread, and Knowledge Base
 */

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");

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

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Header Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 lg:ml-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">
              {activeSection === "dashboard" && "Dashboard"}
              {activeSection === "tickets" && "Ticket Queue"}
              {activeSection === "conversation" && "Conversation"}
              {activeSection === "knowledge-base" && "Knowledge Base"}
            </h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-700">SJ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {renderSection()}
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
