import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Bot, MessageSquare, Mail, Calendar, FileSearch, Workflow, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const defaultAgents = [
  {
    id: "ai-1",
    title: "Customer Support Agent",
    description: "24/7 intelligent support bot that handles inquiries, resolves issues, and escalates complex cases seamlessly.",
    price: "$199/mo",
    icon: "MessageSquare",
    features: ["Multi-language", "Sentiment analysis", "Smart routing", "Analytics"],
    details: "Our AI-powered customer support agent can handle up to 80% of support inquiries without human intervention.",
  },
  {
    id: "ai-2",
    title: "Email Automation Suite",
    description: "AI-powered email management that categorizes, prioritizes, and drafts responses automatically.",
    price: "$149/mo",
    icon: "Mail",
    features: ["Auto-categorize", "Smart replies", "Follow-ups", "Templates"],
    details: "Automate your email workflows and save hours of manual work every week with intelligent categorization.",
  },
  {
    id: "ai-3",
    title: "Meeting Scheduler",
    description: "Intelligent scheduling assistant that coordinates meetings, manages calendars, and sends reminders.",
    price: "$79/mo",
    icon: "Calendar",
    features: ["Time zone sync", "Conflict detection", "Reminders", "Integration"],
    details: "Never waste time scheduling meetings again. Let AI handle timezone conversions and conflict resolution.",
  },
  {
    id: "ai-4",
    title: "Document Analyzer",
    description: "Extract insights, summarize content, and answer questions from your documents using advanced NLP.",
    price: "$129/mo",
    icon: "FileSearch",
    features: ["PDF/DOC support", "Summaries", "Q&A", "Data extraction"],
    details: "Process hundreds of documents instantly and get actionable insights from your data.",
  },
  {
    id: "ai-5",
    title: "Workflow Automator",
    description: "Connect apps and automate complex workflows with natural language instructions.",
    price: "$249/mo",
    icon: "Workflow",
    features: ["500+ integrations", "Natural language", "Triggers", "Monitoring"],
    details: "Create automation workflows without coding. Just describe what you want in plain English.",
  },
  {
    id: "ai-6",
    title: "Custom AI Agent",
    description: "Tailored AI solutions built specifically for your business needs and existing systems.",
    price: "Custom",
    icon: "Bot",
    features: ["Custom trained", "API access", "White-label", "Dedicated support"],
    details: "Get a custom AI agent built specifically for your unique business requirements.",
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

export default function AIAgentDetail() {
  const params = useParams();
  const agentId = params?.id;
  const agent = defaultAgents.find(a => a.id === agentId);
  const Icon = agent && iconMap[agent.icon] || Bot;

  if (!agent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl mb-4">AI Agent not found</h1>
          <p className="text-muted-foreground mb-6">
            The AI agent you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/#ai-agents">
            <Button variant="ghost" size="sm" data-testid="button-back-ai-agents">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AI Agents
            </Button>
          </Link>
        </div>
      </header>

      {/* Agent Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <Badge variant="secondary" className="mb-4 bg-cyan/20 text-cyan border-cyan/30">
                  AI Automation
                </Badge>
                
                <h1 
                  className="font-display font-bold text-3xl md:text-4xl mb-4"
                  data-testid="text-agent-title"
                >
                  {agent.title}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {agent.description}
                </p>
              </div>

              {/* Details Section */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">About This Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {agent.details}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {agent.features && agent.features.length > 0 ? (
                    agent.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-cyan flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Comprehensive AI automation features</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  {/* Agent Icon */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-cyan/20 to-primary/20 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-cyan" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="font-display font-bold text-3xl gradient-text">
                      {agent.price}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link href="/#contact">
                    <Button className="w-full bg-gradient-to-r from-cyan to-primary" size="lg" data-testid="button-get-agent">
                      Get Started
                    </Button>
                  </Link>

                  {/* Benefits */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-cyan" />
                      <span>Easy integration</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-cyan" />
                      <span>24/7 support</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-cyan" />
                      <span>Free trial included</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
