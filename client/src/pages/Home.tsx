import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { AIAgents } from "@/components/AIAgents";
import { Courses } from "@/components/Courses";
import { Testimonials } from "@/components/Testimonials";
import { CaseStudies } from "@/components/CaseStudies";
import { Founders } from "@/components/Founders";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function Home() {
  useAnalytics();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <Products />
        <AIAgents />
        <Courses />
        <Testimonials />
        <CaseStudies />
        <Founders />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
