import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Linkedin,
  Twitter,
  Github,
  Quote,
  ArrowRight,
} from "lucide-react";
import type { Founder } from "@shared/schema";

const founders: Founder[] = [
  {
    id: "1",
    name: "Ruthvesh",
    role: "CEO & Lead Developer",
    bio: "Full-stack developer with 8+ years of experience building scalable applications. Passionate about AI and automation technologies. Previously led engineering teams at multiple startups.",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "2",
    name: "Thigazh",
    role: "CTO & AI Architect",
    bio: "Machine learning engineer specializing in NLP and conversational AI. Built AI systems serving millions of users. Expert in transformer architectures and LLM applications.",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "3",
    name: "Surya",
    role: "COO & Product Lead",
    bio: "Product strategist with a background in UX design and business development. Focused on creating user-centric products that solve real problems. MBA from a top business school.",
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group"
    >
      <Card
        className="relative h-full glass-strong border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-glow"
        data-testid={`card-founder-${founder.id}`}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/5 via-purple/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-6 md:p-8 space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                <AvatarFallback className="bg-gradient-to-br from-primary via-purple to-cyan text-white text-2xl font-display font-bold">
                  {founder.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Info */}
          <div className="text-center space-y-2">
            <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors duration-300">
              {founder.name}
            </h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {founder.role}
            </Badge>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            {founder.bio}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            {founder.socials.linkedin && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10"
                data-testid={`link-linkedin-${founder.id}`}
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            )}
            {founder.socials.twitter && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10"
                data-testid={`link-twitter-${founder.id}`}
              >
                <Twitter className="w-4 h-4" />
              </Button>
            )}
            {founder.socials.github && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10"
                data-testid={`link-github-${founder.id}`}
              >
                <Github className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Founders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="founders"
      className="relative py-24 md:py-32"
      data-testid="section-founders"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple/10 rounded-full blur-3xl animate-glow-pulse animation-delay-500" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Users className="w-3 h-3 mr-1" />
            Meet The Team
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            The Minds Behind{" "}
            <span className="gradient-text">StratiumeX</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A team of passionate technologists and entrepreneurs dedicated to 
            pushing the boundaries of digital innovation.
          </p>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {founders.map((founder, index) => (
            <FounderCard key={founder.id} founder={founder} index={index} />
          ))}
        </div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="glass-strong border-white/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-purple/20 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-xl">Our Story</h3>
                <p className="text-muted-foreground leading-relaxed">
                  StratiumeX was founded with a simple yet powerful vision: to democratize 
                  access to cutting-edge technology. What started as a small team of developers 
                  building automation tools has grown into a comprehensive platform offering 
                  digital products, AI solutions, and educational resources. We believe that 
                  technology should empower, not overwhelm, and we're committed to creating 
                  solutions that are both powerful and accessible.
                </p>
                <Button variant="ghost" className="group" data-testid="button-learn-more-story">
                  Learn more about our journey
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
