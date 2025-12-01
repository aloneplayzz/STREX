import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  MessageSquare,
  Mail,
  Calendar,
  FileSearch,
  Workflow,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import type { Product } from "@shared/schema";

const aiProducts: Product[] = [
  {
    id: "ai-1",
    title: "Customer Support Agent",
    description: "24/7 intelligent support bot that handles inquiries, resolves issues, and escalates complex cases seamlessly.",
    category: "ai",
    icon: "MessageSquare",
    features: ["Multi-language", "Sentiment analysis", "Smart routing", "Analytics"],
    price: "$199/mo",
  },
  {
    id: "ai-2",
    title: "Email Automation Suite",
    description: "AI-powered email management that categorizes, prioritizes, and drafts responses automatically.",
    category: "ai",
    icon: "Mail",
    features: ["Auto-categorize", "Smart replies", "Follow-ups", "Templates"],
    price: "$149/mo",
  },
  {
    id: "ai-3",
    title: "Meeting Scheduler",
    description: "Intelligent scheduling assistant that coordinates meetings, manages calendars, and sends reminders.",
    category: "ai",
    icon: "Calendar",
    features: ["Time zone sync", "Conflict detection", "Reminders", "Integration"],
    price: "$79/mo",
  },
  {
    id: "ai-4",
    title: "Document Analyzer",
    description: "Extract insights, summarize content, and answer questions from your documents using advanced NLP.",
    category: "ai",
    icon: "FileSearch",
    features: ["PDF/DOC support", "Summaries", "Q&A", "Data extraction"],
    price: "$129/mo",
  },
  {
    id: "ai-5",
    title: "Workflow Automator",
    description: "Connect apps and automate complex workflows with natural language instructions.",
    category: "ai",
    icon: "Workflow",
    features: ["500+ integrations", "Natural language", "Triggers", "Monitoring"],
    price: "$249/mo",
  },
  {
    id: "ai-6",
    title: "Custom AI Agent",
    description: "Tailored AI solutions built specifically for your business needs and existing systems.",
    category: "ai",
    icon: "Bot",
    features: ["Custom trained", "API access", "White-label", "Dedicated support"],
    price: "Custom",
  },
];

const iconMap: Record<string, any> = {
  Bot,
  MessageSquare,
  Mail,
  Calendar,
  FileSearch,
  Workflow,
};

function AIProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[product.icon] || Bot;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group relative h-full glass-strong border-white/10 hover:border-cyan/30 transition-all duration-500 hover:shadow-glow-cyan"
        data-testid={`card-ai-${product.id}`}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-6 space-y-4">
          {/* Icon */}
          <div className="relative">
            <div className="w-14 h-14 rounded-md bg-gradient-to-br from-cyan/20 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-cyan" />
            </div>
            <div className="absolute inset-0 w-14 h-14 rounded-md bg-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display font-semibold text-lg group-hover:text-cyan transition-colors duration-300">
                {product.title}
              </h3>
              {product.price && (
                <Badge variant="secondary" className="bg-cyan/10 text-cyan border-cyan/20 whitespace-nowrap">
                  {product.price}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature) => (
              <span
                key={feature}
                className="text-xs px-2 py-1 rounded-md bg-white/5 text-muted-foreground"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Action */}
          <Button
            variant="ghost"
            className="w-full mt-2 group/btn hover:text-cyan"
            data-testid={`button-view-ai-${product.id}`}
          >
            Learn More
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export function AIAgents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="ai-agents"
      className="relative py-24 md:py-32"
      data-testid="section-ai-agents"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-glow-pulse animation-delay-500" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="outline" className="mb-4 border-cyan/30 text-cyan">
            <Zap className="w-3 h-3 mr-1" />
            AI Agents & Automations
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Intelligent{" "}
            <span className="bg-gradient-to-r from-cyan to-primary bg-clip-text text-transparent">
              Automation
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Supercharge your business with AI-powered agents that work around the clock. 
            Automate repetitive tasks and focus on what matters most.
          </p>
        </motion.div>

        {/* Benefits Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            "Save 40+ hours/week",
            "24/7 availability",
            "99.9% uptime",
            "Instant deployment",
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-cyan" />
              <span>{benefit}</span>
            </div>
          ))}
        </motion.div>

        {/* AI Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiProducts.map((product, index) => (
            <AIProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan to-primary"
            data-testid="button-explore-ai"
          >
            Explore AI Solutions
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
