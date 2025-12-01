import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useLogout } from "@/hooks/useAuth";
import {
  Zap,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Mail,
  ArrowRight,
  Settings,
  LogOut,
} from "lucide-react";

const footerLinks = {
  products: [
    { label: "Digital Products", href: "#products" },
    { label: "AI Agents", href: "#ai-agents" },
    { label: "Courses", href: "#courses" },
    { label: "Enterprise", href: "#contact" },
  ],
  company: [
    { label: "About Us", href: "#founders" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "Community", href: "#" },
    { label: "Support", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Licenses", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function Footer() {
  const { isAuthenticated } = useAuth();
  const logout = useLogout();

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative bg-surface/50 border-t border-white/5" data-testid="footer">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 text-center max-w-xl mx-auto">
          <h3 className="font-display font-bold text-2xl mb-3">
            Stay in the loop
          </h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest updates, product releases, 
            and exclusive content.
          </p>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-background border-white/10 focus:border-primary/50"
              data-testid="input-newsletter"
            />
            <Button
              className="bg-gradient-to-r from-primary to-purple flex-shrink-0"
              data-testid="button-subscribe"
            >
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 mb-4 group"
              data-testid="link-footer-logo"
            >
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary via-purple to-cyan flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl">StratiumeX</span>
            </button>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Empowering businesses with cutting-edge digital products, AI solutions, 
              and comprehensive learning resources.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary hover:bg-primary/10"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} StratiumeX. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built with</span>
            <span className="text-red-500">&#x2764;</span>
            <span>by Ruthvesh, Thigazh & Surya</span>
            <span className="text-muted-foreground/50">|</span>
            {isAuthenticated ? (
              <>
                <Link href="/admin">
                  <span className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer" data-testid="link-admin">
                    <Settings className="w-3 h-3" />
                    Admin
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                  data-testid="button-logout"
                >
                  <LogOut className="w-3 h-3" />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <span className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer" data-testid="link-login">
                  <Settings className="w-3 h-3" />
                  Admin Login
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
