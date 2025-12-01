import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { AIAgents } from "@/components/AIAgents";
import { Courses } from "@/components/Courses";
import { Founders } from "@/components/Founders";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <Products />
        <AIAgents />
        <Courses />
        <Founders />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
