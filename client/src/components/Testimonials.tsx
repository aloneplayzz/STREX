import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonials } from "@/hooks/useLocalStorage";
import type { Testimonial } from "@shared/schema";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Solutions",
    content: "The AI automation tools from StratiumeX transformed our customer service. We reduced response time by 80% while improving customer satisfaction scores.",
    avatarUrl: null,
    rating: 5,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Founder",
    company: "StartupLab",
    content: "The web development courses are incredibly comprehensive. I went from beginner to deploying full-stack applications in just 3 months. Highly recommend!",
    avatarUrl: null,
    rating: 5,
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "Product Manager",
    company: "DataDriven Inc",
    content: "Their analytics dashboard has become essential to our daily operations. The insights we've gained have directly contributed to 40% revenue growth.",
    avatarUrl: null,
    rating: 5,
    featured: true,
    createdAt: new Date(),
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card 
        className="h-full glass hover-elevate"
        data-testid={`card-testimonial-${testimonial.id}`}
      >
        <CardContent className="p-6">
          <Quote className="w-8 h-8 text-primary/30 mb-4" />
          
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            "{testimonial.content}"
          </p>
          
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={testimonial.avatarUrl || undefined} alt={testimonial.name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-sm">{testimonial.name}</h4>
              <p className="text-xs text-muted-foreground">
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TestimonialSkeleton() {
  return (
    <Card className="h-full glass">
      <CardContent className="p-6">
        <Skeleton className="w-8 h-8 rounded mb-4" />
        <Skeleton className="w-24 h-4 mb-4" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-3/4 h-4 mb-6" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div>
            <Skeleton className="w-24 h-4 mb-1" />
            <Skeleton className="w-32 h-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const { testimonials: dbTestimonials } = useTestimonials();
  
  const displayTestimonials = dbTestimonials && dbTestimonials.length > 0 
    ? dbTestimonials
    : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-24 relative" data-testid="section-testimonials">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what business leaders and developers 
            have to say about working with StratiumeX.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.slice(0, 6).map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
