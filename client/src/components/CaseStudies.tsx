import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Building2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCaseStudies } from "@/hooks/useLocalStorage";
import type { CaseStudy } from "@shared/schema";

const fallbackCaseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Scaling E-commerce with AI-Powered Automation",
    slug: "scaling-ecommerce-ai-automation",
    client: "RetailMax",
    industry: "E-commerce",
    challenge: "Manual order processing and customer support were creating bottlenecks during peak seasons.",
    solution: "Implemented AI-powered order processing and automated customer support agents.",
    results: "200% increase in order processing capacity, 60% reduction in support tickets.",
    coverImage: null,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Digital Transformation for Healthcare Provider",
    slug: "healthcare-digital-transformation",
    client: "MedCare Plus",
    industry: "Healthcare",
    challenge: "Legacy systems were causing delays in patient data access and appointment scheduling.",
    solution: "Built a modern web platform with real-time data sync and automated scheduling.",
    results: "75% faster patient processing, 90% reduction in scheduling conflicts.",
    coverImage: null,
    featured: true,
    createdAt: new Date(),
  },
];

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <Card 
        className="h-full glass hover-elevate overflow-hidden"
        data-testid={`card-case-study-${study.id}`}
      >
        {study.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={study.coverImage}
              alt={study.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}
        <CardHeader className="gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Building2 className="w-3 h-3 mr-1" />
              {study.industry}
            </Badge>
          </div>
          <h3 className="font-display font-bold text-xl leading-tight">
            {study.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            Client: <span className="text-foreground font-medium">{study.client}</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Challenge
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {study.challenge}
            </p>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-md bg-primary/10 border border-primary/20">
            <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-primary">
              {study.results}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full group"
            data-testid={`button-view-case-study-${study.id}`}
          >
            View Full Case Study
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function CaseStudySkeleton() {
  return (
    <Card className="h-full glass overflow-hidden">
      <CardHeader className="gap-3">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-32 h-4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Skeleton className="w-16 h-3 mb-1" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4 mt-1" />
        </div>
        <Skeleton className="w-full h-16 rounded-md" />
      </CardContent>
      <CardFooter>
        <Skeleton className="w-full h-10" />
      </CardFooter>
    </Card>
  );
}

export function CaseStudies() {
  const { studies: dbCaseStudies } = useCaseStudies();
  
  const caseStudies = dbCaseStudies && dbCaseStudies.length > 0 
    ? dbCaseStudies.filter(s => s.featured)
    : fallbackCaseStudies;

  return (
    <section id="case-studies" className="py-24 relative" data-testid="section-case-studies">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we've helped businesses transform their operations with 
            cutting-edge technology solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.slice(0, 4).map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
