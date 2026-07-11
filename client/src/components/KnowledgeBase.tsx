import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Eye, ThumbsUp, ChevronRight } from "lucide-react";
import { useState } from "react";

/**
 * TicketStream Knowledge Base
 * Browse and search help articles organized by category
 * Shows article metadata like views and helpful votes
 */

interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  views: number;
  helpful: number;
  updated: string;
}

const articlesData: Article[] = [
  {
    id: "kb-1",
    title: "Getting Started with TicketStream",
    category: "Getting Started",
    description: "Learn the basics of setting up your helpdesk and managing your first tickets.",
    views: 2847,
    helpful: 156,
    updated: "2 weeks ago",
  },
  {
    id: "kb-2",
    title: "How to Configure Ticket Routing Rules",
    category: "Configuration",
    description: "Set up automatic ticket assignment based on priority, category, and customer type.",
    views: 1923,
    helpful: 89,
    updated: "3 weeks ago",
  },
  {
    id: "kb-3",
    title: "Integrating Live Chat with Your Website",
    category: "Integration",
    description: "Add the TicketStream chat widget to your website in just a few minutes.",
    views: 3421,
    helpful: 234,
    updated: "1 week ago",
  },
  {
    id: "kb-4",
    title: "Understanding Ticket Priorities",
    category: "Getting Started",
    description: "Learn how to classify tickets by priority and set appropriate response times.",
    views: 1456,
    helpful: 78,
    updated: "1 month ago",
  },
  {
    id: "kb-5",
    title: "API Documentation and Endpoints",
    category: "API",
    description: "Complete reference for TicketStream REST API with code examples.",
    views: 5234,
    helpful: 412,
    updated: "3 days ago",
  },
  {
    id: "kb-6",
    title: "Setting Up Team Permissions",
    category: "Configuration",
    description: "Configure role-based access control for your support team members.",
    views: 892,
    helpful: 45,
    updated: "2 weeks ago",
  },
  {
    id: "kb-7",
    title: "Troubleshooting Common Issues",
    category: "Troubleshooting",
    description: "Solutions to frequently encountered problems and error messages.",
    views: 4123,
    helpful: 289,
    updated: "1 week ago",
  },
  {
    id: "kb-8",
    title: "Creating Custom Reports",
    category: "Reporting",
    description: "Build custom dashboards and reports to track your team's performance.",
    views: 1234,
    helpful: 92,
    updated: "2 weeks ago",
  },
];

const categories = ["All", "Getting Started", "Configuration", "Integration", "API", "Troubleshooting", "Reporting"];

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articlesData.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeCategory === "All") return matchesSearch;
    return article.category === activeCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Knowledge Base</h2>
        <p className="text-muted-foreground">Browse help articles and documentation</p>
      </div>

      {selectedArticle ? (
        <>
          {/* Article View */}
          <Button
            variant="outline"
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2"
          >
            ← Back to Articles
          </Button>

          <Card className="p-8 border border-border">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <Badge className="bg-blue-100 text-blue-700 mb-4">{selectedArticle.category}</Badge>
                <h1 className="text-3xl font-bold text-foreground mb-3">{selectedArticle.title}</h1>
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {selectedArticle.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    {selectedArticle.helpful} found this helpful
                  </div>
                  <div>Updated {selectedArticle.updated}</div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none mb-8">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                  <p className="text-foreground">{selectedArticle.description}</p>
                </div>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Overview</h2>
                <p className="text-foreground mb-4">
                  This article provides comprehensive guidance on {selectedArticle.title.toLowerCase()}. Follow the steps below to
                  implement this feature in your TicketStream account.
                </p>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Step-by-Step Guide</h2>
                <ol className="list-decimal list-inside space-y-3 text-foreground">
                  <li>Navigate to the settings section in your TicketStream dashboard</li>
                  <li>Locate the relevant configuration option</li>
                  <li>Follow the on-screen prompts to complete the setup</li>
                  <li>Test the feature to ensure it's working correctly</li>
                  <li>Contact support if you encounter any issues</li>
                </ol>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Best Practices</h2>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>Always test changes in a staging environment first</li>
                  <li>Document your configuration for future reference</li>
                  <li>Review your settings regularly to ensure they meet your needs</li>
                  <li>Keep your team informed of any changes</li>
                </ul>

                <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Need Help?</h2>
                <p className="text-foreground">
                  If you have questions about this article or need additional support, please contact our support team or visit our
                  community forum.
                </p>
              </div>

              {/* Feedback Section */}
              <Card className="p-4 border border-border bg-muted/30">
                <p className="text-sm font-medium text-foreground mb-3">Was this article helpful?</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    Yes
                  </Button>
                  <Button variant="outline" size="sm">
                    No
                  </Button>
                </div>
              </Card>
            </div>
          </Card>
        </>
      ) : (
        <>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 bg-muted h-auto p-1">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="space-y-3 mt-4">
              {filteredArticles.length === 0 ? (
                <Card className="p-8 text-center border border-border">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No articles found</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredArticles.map((article) => (
                    <Card
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="p-4 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-700 text-xs">{article.category}</Badge>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {article.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {article.helpful}
                        </div>
                        <div>{article.updated}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
