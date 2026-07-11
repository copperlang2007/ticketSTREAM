import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

/**
 * TicketStream Footer
 * Contains API documentation links, company info, and support resources
 */

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-16">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-sm font-bold text-foreground">TS</span>
              </div>
              <span className="font-bold text-lg">TicketStream</span>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Your support team's command center. Streamline ticket management, live chat, and knowledge base.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* API & Documentation */}
          <div>
            <h3 className="font-semibold text-white mb-4">API & Docs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  API Documentation
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  REST API Reference
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  Webhooks Guide
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  SDK & Libraries
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  Code Examples
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Status Page
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Community Forum
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@ticketstream.io" className="hover:text-white transition-colors">
                  support@ticketstream.io
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/70">
          <div>
            <p>&copy; 2024 TicketStream. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
