import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Bot, Code, Layers } from "lucide-react";
import { motion } from "framer-motion";

function FloatingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  );
}

function FloatingCard({ icon: Icon, label, className, delay = 0 }: { icon: any; label: string; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute glass-strong px-4 py-3 rounded-md flex items-center gap-3 animate-float ${className}`}
    >
      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary/20 to-purple/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
}

function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      data-testid="section-hero"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface/50" />
      <GridPattern />

      {/* Floating Orbs */}
      <FloatingOrb 
        className="w-96 h-96 bg-primary/20 -top-20 -left-20 animate-glow-pulse" 
        delay={0.2}
      />
      <FloatingOrb 
        className="w-80 h-80 bg-purple/20 top-40 -right-20 animate-glow-pulse animation-delay-500" 
        delay={0.4}
      />
      <FloatingOrb 
        className="w-64 h-64 bg-cyan/15 bottom-20 left-1/4 animate-glow-pulse animation-delay-300" 
        delay={0.6}
      />

      {/* Floating Cards */}
      <FloatingCard
        icon={Bot}
        label="AI Automation"
        className="top-32 left-[10%] hidden lg:flex animation-delay-200"
        delay={1}
      />
      <FloatingCard
        icon={Code}
        label="Web Development"
        className="top-48 right-[8%] hidden lg:flex animation-delay-400"
        delay={1.2}
      />
      <FloatingCard
        icon={Layers}
        label="Digital Products"
        className="bottom-40 left-[15%] hidden lg:flex animation-delay-600"
        delay={1.4}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Building the Future of Digital Innovation</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight"
          >
            <span className="block">Transform Your Vision</span>
            <span className="block mt-2">
              With{" "}
              <span className="gradient-text bg-[length:200%_auto] animate-gradient-shift">
                Cutting-Edge Tech
              </span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            We create powerful digital products, intelligent AI agents & automations, 
            and comprehensive web development courses to accelerate your success.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("#products")}
              className="bg-gradient-to-r from-primary to-purple hover:opacity-90 transition-all duration-300 px-8 py-6 text-base font-semibold group"
              data-testid="button-explore-products"
            >
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className="border-white/20 hover:bg-white/5 px-8 py-6 text-base font-semibold backdrop-blur-sm"
              data-testid="button-contact-us"
            >
              Contact Us
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: "50+", label: "Digital Products" },
              { value: "100+", label: "AI Automations" },
              { value: "1000+", label: "Students" },
              { value: "99%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("#products")}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-scroll-down"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-current rounded-full"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
