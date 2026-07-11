import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Lock, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";

/**
 * TicketStream Conversation Thread
 * Displays customer conversation with internal notes section
 * Shows message history with timestamps and author info
 */

interface Message {
  id: string;
  author: string;
  role: "customer" | "agent" | "internal";
  content: string;
  timestamp: string;
  avatar?: string;
}

const conversationData: Message[] = [
  {
    id: "msg-1",
    author: "John Smith",
    role: "customer",
    content: "Hi, I'm having trouble with my payment. It says my card was declined but I was charged anyway.",
    timestamp: "2 hours ago",
    avatar: "JS",
  },
  {
    id: "msg-2",
    author: "Sarah Johnson",
    role: "agent",
    content:
      "Thank you for reaching out! I'm sorry to hear you're experiencing this issue. Let me look into your account right away. Can you please provide your order number?",
    timestamp: "1 hour 58 minutes ago",
    avatar: "SJ",
  },
  {
    id: "msg-3",
    author: "John Smith",
    role: "customer",
    content: "Sure, it's ORD-2847-5932. The charge appeared on my statement this morning.",
    timestamp: "1 hour 45 minutes ago",
    avatar: "JS",
  },
  {
    id: "msg-4",
    author: "Sarah Johnson",
    role: "agent",
    content:
      "Thank you! I found your order. I can see there was indeed a duplicate charge. I'm processing a refund for the extra charge right now. You should see it back in your account within 1-2 business days.",
    timestamp: "1 hour 30 minutes ago",
    avatar: "SJ",
  },
  {
    id: "msg-5",
    author: "Sarah Johnson",
    role: "internal",
    content: "Processed refund of $49.99 to card ending in 4242. Refund ID: REF-8847-2023",
    timestamp: "1 hour 28 minutes ago",
    avatar: "SJ",
  },
  {
    id: "msg-6",
    author: "John Smith",
    role: "customer",
    content: "Wow, thank you so much! That was really fast. I appreciate your help!",
    timestamp: "45 minutes ago",
    avatar: "JS",
  },
];

const internalNotes = [
  {
    id: "note-1",
    author: "Sarah Johnson",
    content: "Customer had duplicate charge issue. Verified in system and processed refund immediately.",
    timestamp: "1 hour 28 minutes ago",
  },
  {
    id: "note-2",
    author: "Sarah Johnson",
    content: "Follow up: Check if this is part of the payment gateway issue reported by other customers.",
    timestamp: "1 hour 25 minutes ago",
  },
];

export default function ConversationThread() {
  const [replyMessage, setReplyMessage] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [activeTab, setActiveTab] = useState("conversation");

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      setReplyMessage("");
    }
  };

  const handleAddNote = () => {
    if (internalNote.trim()) {
      setInternalNote("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Ticket TKT-2847</h2>
            <p className="text-muted-foreground">Payment processing error on checkout</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-red-100 text-red-700">Critical</Badge>
            <Badge className="bg-green-100 text-green-700">Resolved</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
          <div>
            <span className="font-medium text-foreground">Customer:</span> Acme Corp
          </div>
          <div>
            <span className="font-medium text-foreground">Assigned to:</span> Sarah Johnson
          </div>
          <div>
            <span className="font-medium text-foreground">Created:</span> 2 hours ago
          </div>
          <div>
            <span className="font-medium text-foreground">Last updated:</span> 45 minutes ago
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="conversation" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Conversation
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Internal Notes
          </TabsTrigger>
        </TabsList>

        {/* Conversation Tab */}
        <TabsContent value="conversation" className="space-y-4 mt-4">
          <Card className="p-6 border border-border bg-muted/30 max-h-96 overflow-y-auto space-y-4">
            {conversationData.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "customer" ? "justify-start" : "justify-end"}`}
              >
                {message.role === "customer" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                    {message.avatar}
                  </div>
                )}

                <div
                  className={`max-w-xs lg:max-w-md ${
                    message.role === "customer"
                      ? "bg-white border border-border rounded-lg rounded-tl-none"
                      : message.role === "internal"
                      ? "bg-yellow-50 border border-yellow-200 rounded-lg rounded-tr-none"
                      : "bg-blue-50 border border-blue-200 rounded-lg rounded-tr-none"
                  } p-3`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-foreground">{message.author}</p>
                    {message.role === "internal" && (
                      <Lock className="w-3 h-3 text-yellow-600 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-foreground">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{message.timestamp}</p>
                </div>

                {message.role !== "customer" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                    {message.avatar}
                  </div>
                )}
              </div>
            ))}
          </Card>

          {/* Reply Input */}
          <Card className="p-4 border border-border">
            <div className="space-y-3">
              <Textarea
                placeholder="Type your response to the customer..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="min-h-24 resize-none"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline">Save as Draft</Button>
                <Button
                  onClick={handleSendReply}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Internal Notes Tab */}
        <TabsContent value="notes" className="space-y-4 mt-4">
          <Card className="p-6 border border-border bg-yellow-50/50 max-h-96 overflow-y-auto space-y-4">
            {internalNotes.map((note) => (
              <div key={note.id} className="border-l-4 border-yellow-400 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">{note.author}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {note.timestamp}
                  </div>
                </div>
                <p className="text-sm text-foreground">{note.content}</p>
              </div>
            ))}
          </Card>

          {/* Add Internal Note */}
          <Card className="p-4 border border-border">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Add Internal Note
              </label>
              <Textarea
                placeholder="Add a note visible only to your team..."
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className="min-h-20 resize-none"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={handleAddNote}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Add Note
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
