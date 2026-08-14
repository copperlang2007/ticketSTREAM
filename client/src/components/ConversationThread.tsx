import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Clock,
  Lock,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

/**
 * TicketStream Conversation Thread
 * Displays the customer conversation and gives agents an optional, editable AI reply draft.
 * AI-generated copy is never sent automatically.
 */

interface Message {
  id: string;
  author: string;
  role: "customer" | "agent" | "internal";
  content: string;
  timestamp: string;
  avatar?: string;
}

type ReplyTone = "empathetic" | "concise" | "technical";

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

const toneOptions: Array<{ id: ReplyTone; label: string; description: string }> = [
  { id: "empathetic", label: "Empathetic", description: "Warm and reassuring" },
  { id: "concise", label: "Concise", description: "Short and direct" },
  { id: "technical", label: "Technical", description: "Precise and structured" },
];

export default function ConversationThread({ messages = conversationData }: { messages?: Message[] }) {
  const [threadMessages, setThreadMessages] = useState(messages);
  const [notes, setNotes] = useState(internalNotes);
  const [replyMessage, setReplyMessage] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [activeTab, setActiveTab] = useState("conversation");
  const [ticketStatus, setTicketStatus] = useState<"open" | "resolved">("resolved");
  const [isSending, setIsSending] = useState(false);
  const [replyTone, setReplyTone] = useState<ReplyTone>("empathetic");
  const [suggestion, setSuggestion] = useState("");
  const [suggestionError, setSuggestionError] = useState("");
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestReply = trpc.ai.suggestReply.useMutation();

  const customerContext = threadMessages
    .filter((message) => message.role !== "internal")
    .slice(-6)
    .map(({ role, content }) => ({ role, content }));

  const handleSendReply = () => {
    const content = replyMessage.trim();
    if (!content || isSending) return;

    setIsSending(true);
    window.setTimeout(() => {
      setThreadMessages((current) => [
        ...current,
        {
          id: `msg-${Date.now()}`,
          author: "Sarah Johnson",
          role: "agent",
          content,
          timestamp: "just now",
          avatar: "SJ",
        },
      ]);
      setReplyMessage("");
      setTicketStatus("open");
      setIsSending(false);
      toast.success("Reply added to the conversation");
    }, 350);
  };

  const handleSaveDraft = () => {
    if (!replyMessage.trim()) {
      toast("Start typing before saving a draft");
      return;
    }
    toast.success("Reply saved as a draft");
  };

  const handleAddNote = () => {
    const content = internalNote.trim();
    if (!content) return;
    setNotes((current) => [
      ...current,
      {
        id: `note-${Date.now()}`,
        author: "Sarah Johnson",
        content,
        timestamp: "just now",
      },
    ]);
    setInternalNote("");
    toast.success("Internal note added");
  };

  const handleToggleStatus = () => {
    const nextStatus = ticketStatus === "resolved" ? "open" : "resolved";
    setTicketStatus(nextStatus);
    toast.success(`Ticket marked ${nextStatus}`);
  };

  const handleGenerateSuggestion = async () => {
    if (customerContext.length === 0) {
      setSuggestionError("Add customer context before requesting a draft.");
      return;
    }

    setSuggestionError("");
    try {
      const result = await suggestReply.mutateAsync({
        ticketTitle: "Payment processing error on checkout",
        messages: customerContext,
        tone: replyTone,
      });
      setSuggestion(result.suggestion);
    } catch {
      setSuggestionError("We couldn't draft a reply. Try again.");
      toast.error("Couldn't generate a reply draft");
    }
  };

  const handleInsertSuggestion = () => {
    if (!suggestion) return;
    setReplyMessage((current) => (current.trim() ? `${current.trim()}\n\n${suggestion}` : suggestion));
    toast.success("AI draft inserted into reply");
    requestAnimationFrame(() => replyTextareaRef.current?.focus());
  };

  const handleDismissSuggestion = () => {
    setSuggestion("");
    setSuggestionError("");
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Ticket TKT-2847</h2>
            <p className="text-muted-foreground">Payment processing error on checkout</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-red-100 text-red-700">Critical</Badge>
            <Badge className={ticketStatus === "resolved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>{ticketStatus === "resolved" ? "Resolved" : "Open"}</Badge>
            <Button type="button" size="sm" variant="outline" onClick={handleToggleStatus}>{ticketStatus === "resolved" ? "Reopen" : "Resolve"}</Button>
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

        <TabsContent value="conversation" className="space-y-4 mt-4">
          <Card className="min-w-0 overflow-x-hidden p-4 sm:p-6 border border-border bg-muted/30 max-h-96 overflow-y-auto space-y-4">
            {threadMessages.length === 0 ? (
              <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50/60 p-5 text-center">
                <p className="text-sm font-semibold text-blue-900">No conversation context yet</p>
                <p className="mt-1 text-xs text-blue-800/75">Add a customer message before asking TicketStream to draft a reply.</p>
              </div>
            ) : threadMessages.map((message) => (
              <div
                key={message.id}
                className={`flex min-w-0 flex-shrink-0 items-start gap-3 py-1 ${message.role === "customer" ? "justify-start" : "justify-end"}`}
              >
                {message.role === "customer" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                    {message.avatar}
                  </div>
                )}

                <div
                  className={`min-w-0 max-w-[80%] break-words overflow-hidden ${
                    message.role === "customer"
                      ? "bg-white border border-border rounded-lg rounded-tl-none"
                      : message.role === "internal"
                      ? "bg-yellow-50 border border-yellow-200 rounded-lg rounded-tr-none"
                      : "bg-blue-50 border border-blue-200 rounded-lg rounded-tr-none"
                  } p-3`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-foreground">{message.author}</p>
                    {message.role === "internal" && <Lock className="w-3 h-3 text-yellow-600 ml-2" />}
                  </div>
                  <p className="text-sm leading-5 text-foreground break-words">{message.content}</p>
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

          <Card className="p-4 border border-border">
            <div className="space-y-3">
              <div className="flex flex-col gap-3 rounded-lg border border-blue-200 bg-blue-50/70 p-3" aria-busy={suggestReply.isPending}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                      <Sparkles className="w-4 h-4 text-primary" />
                      AI reply draft
                    </div>
                    <p className="mt-1 text-xs text-blue-800/80">Draft a grounded reply from the latest conversation context.</p>
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-blue-700">Review before sending</span>
                </div>

                <div className="flex flex-wrap gap-2" role="group" aria-label="Reply tone">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.id}
                      type="button"
                      aria-pressed={replyTone === tone.id}
                      onClick={() => setReplyTone(tone.id)}
                      className={`rounded-full border px-3 py-1.5 text-left text-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        replyTone === tone.id
                          ? "border-primary bg-white text-primary shadow-sm"
                          : "border-blue-200 bg-transparent text-blue-800 hover:bg-white/70"
                      }`}
                    >
                      <span className="font-semibold">{tone.label}</span>
                      <span className="ml-1 text-blue-800/70">· {tone.description}</span>
                    </button>
                  ))}
                </div>

                {suggestReply.isPending && (
                  <div className="flex items-center gap-2 text-sm text-blue-800" role="status" aria-live="polite">
                    <RotateCcw className="h-4 w-4 animate-spin" />
                    Drafting a reply…
                  </div>
                )}

                {suggestion && !suggestReply.isPending && (
                  <div className="rounded-md border border-blue-200 bg-white p-3">
                    <p className="text-sm leading-6 text-foreground">{suggestion}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button type="button" size="sm" onClick={handleInsertSuggestion} className="gap-2">
                        <Sparkles className="h-4 w-4" />
                        Insert into reply
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={handleGenerateSuggestion} className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button type="button" size="sm" variant="ghost" onClick={handleDismissSuggestion} className="gap-2">
                        <X className="h-4 w-4" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                )}

                {suggestionError && (
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                    <span>{suggestionError}</span>
                    <Button type="button" size="sm" variant="outline" onClick={handleGenerateSuggestion} disabled={suggestReply.isPending}>
                      Try again
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-blue-800/70">AI suggestions can be incomplete. Edit the draft before sending.</p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleGenerateSuggestion}
                    disabled={suggestReply.isPending || customerContext.length === 0}
                    className="gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    {suggestReply.isPending ? "Drafting…" : suggestion ? "Suggest again" : "Suggest reply"}
                  </Button>
                </div>
              </div>

              <Textarea
                ref={replyTextareaRef}
                placeholder="Type your response to the customer..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="min-h-24 resize-none"
                aria-label="Reply to customer"
              />
              <div className="flex flex-wrap gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleSaveDraft}>Save as Draft</Button>
                <Button
                  type="button"
                  onClick={handleSendReply}
                  disabled={isSending || !replyMessage.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSending ? "Sending…" : "Send Reply"}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4 mt-4">
          <Card className="p-6 border border-border bg-yellow-50/50 max-h-96 overflow-y-auto space-y-4">
              {notes.map((note) => (
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
                  type="button"
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
