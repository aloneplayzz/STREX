import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link as WouterLink } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  BarChart3,
  FileText,
  ShoppingCart,
  Palette,
  Database,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { Product } from "@shared/schema";

const products: Product[] = [
  {
    id: "1",
    title: "Analytics Dashboard",
    description: "Real-time business intelligence with customizable metrics, interactive charts, and AI-powered insights.",
    category: "digital",
    icon: "BarChart3",
    features: ["Real-time data", "Custom widgets", "Export reports", "Team sharing"],
    price: "$49",
  },
  {
    id: "2",
    title: "Mobile App Templates",
    description: "Production-ready React Native and Flutter templates with modern UI components and backend integration.",
    category: "digital",
    icon: "Smartphone",
    features: ["Cross-platform", "Auth ready", "Push notifications", "Dark mode"],
    price: "$79",
  },
  {
    id: "3",
    title: "Content Management System",
    description: "Headless CMS with visual editor, API-first architecture, and seamless deployment workflows.",
    category: "digital",
    icon: "FileText",
    features: ["Visual editor", "REST & GraphQL", "Media library", "Webhooks"],
    price: "$99",
  },
  {
    id: "4",
    title: "E-commerce Starter",
    description: "Complete e-commerce solution with payment processing, inventory management, and order tracking.",
    category: "digital",
    icon: "ShoppingCart",
    features: ["Stripe/PayPal", "Inventory", "Analytics", "Multi-currency"],
    price: "$129",
  },
  {
    id: "5",
    title: "Design System Kit",
    description: "Comprehensive UI component library with Figma files, React components, and documentation.",
    category: "digital",
    icon: "Palette",
    features: ["50+ components", "Figma source", "Dark/Light", "Accessible"],
    price: "$59",
  },
  {
    id: "6",
    title: "Database Toolkit",
    description: "Database management tools with schema visualization, migration helpers, and performance monitoring.",
    category: "digital",
    icon: "Database",
    features: ["Schema viewer", "Migrations", "Query builder", "Monitoring"],
    price: "$89",
  },
];

const iconMap: Record<string, any> = {
  BarChart3,
  Smartphone,
  FileText,
  ShoppingCart,
  Palette,
  Database,
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[product.icon] || Sparkles;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group relative h-full glass-strong border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
        data-testid={`card-product-${product.id}`}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative p-6 space-y-4">
          {/* Icon */}
          <div className="relative">
            <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary/20 to-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div className="absolute inset-0 w-14 h-14 rounded-md bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                {product.title}
              </h3>
              {product.price && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
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
          <WouterLink href={`/products/${product.id}`}>
            <Button
              variant="ghost"
              className="w-full mt-2 group/btn"
              data-testid={`button-view-product-${product.id}`}
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </WouterLink>
        </div>
      </Card>
    </motion.div>
  );
}

export function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="products"
      className="relative py-24 md:py-32"
      data-testid="section-products"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background" />

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
            <Sparkles className="w-3 h-3 mr-1" />
            Digital Products
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Premium Digital{" "}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Professionally crafted digital products designed to accelerate your development 
            workflow and elevate your projects to the next level.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <WouterLink href="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple"
              data-testid="button-view-all-products"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </WouterLink>
        </motion.div>
      </div>
    </section>
  );
}
