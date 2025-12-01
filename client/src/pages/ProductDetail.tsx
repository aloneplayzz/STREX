import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Smartphone, BarChart3, FileText, ShoppingCart, Palette, Database, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const defaultProducts = [
  {
    id: "1",
    title: "Analytics Dashboard",
    description: "Real-time business intelligence with customizable metrics, interactive charts, and AI-powered insights.",
    price: "$49",
    icon: "BarChart3",
    features: ["Real-time data", "Custom widgets", "Export reports", "Team sharing"],
    details: "Monitor your business metrics in real-time with beautiful, interactive dashboards.",
  },
  {
    id: "2",
    title: "Mobile App Templates",
    description: "Production-ready React Native and Flutter templates with modern UI components and backend integration.",
    price: "$79",
    icon: "Smartphone",
    features: ["Cross-platform", "Auth ready", "Push notifications", "Dark mode"],
    details: "Get started with production-ready mobile templates and launch faster.",
  },
  {
    id: "3",
    title: "Content Management System",
    description: "Headless CMS with visual editor, API-first architecture, and seamless deployment workflows.",
    price: "$99",
    icon: "FileText",
    features: ["Visual editor", "REST & GraphQL", "Media library", "Webhooks"],
    details: "Manage your content with a powerful, flexible CMS built for modern teams.",
  },
  {
    id: "4",
    title: "E-commerce Starter",
    description: "Complete e-commerce solution with payment processing, inventory management, and order tracking.",
    price: "$129",
    icon: "ShoppingCart",
    features: ["Stripe/PayPal", "Inventory", "Analytics", "Multi-currency"],
    details: "Launch your online store with our complete e-commerce solution.",
  },
  {
    id: "5",
    title: "Design System Kit",
    description: "Comprehensive UI component library with Figma files, React components, and documentation.",
    price: "$59",
    icon: "Palette",
    features: ["50+ components", "Figma source", "Dark/Light", "Accessible"],
    details: "Build consistent, beautiful interfaces with our comprehensive design system.",
  },
  {
    id: "6",
    title: "Database Toolkit",
    description: "Database management tools with schema visualization, migration helpers, and performance monitoring.",
    price: "$89",
    icon: "Database",
    features: ["Schema viewer", "Migrations", "Query builder", "Monitoring"],
    details: "Simplify your database management with powerful tools and monitoring.",
  },
];

const iconMap: Record<string, any> = {
  Smartphone,
  BarChart3,
  FileText,
  ShoppingCart,
  Palette,
  Database,
};

export default function ProductDetail() {
  const params = useParams();
  const productId = params?.id;
  const product = defaultProducts.find(p => p.id === productId);
  const Icon = product && iconMap[product.icon] || Palette;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
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
          <Link href="/#products">
            <Button variant="ghost" size="sm" data-testid="button-back-products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </header>

      {/* Product Content */}
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
                <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">
                  Digital Product
                </Badge>
                
                <h1 
                  className="font-display font-bold text-3xl md:text-4xl mb-4"
                  data-testid="text-product-title"
                >
                  {product.title}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>
              </div>

              {/* Details Section */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">About This Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.details}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.features && product.features.length > 0 ? (
                    product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Comprehensive features included</p>
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
                  {/* Product Icon */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-purple/20 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="font-display font-bold text-3xl gradient-text">
                      {product.price}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link href="/#contact">
                    <Button className="w-full bg-gradient-to-r from-primary to-purple" size="lg" data-testid="button-buy-product">
                      Purchase Now
                    </Button>
                  </Link>

                  {/* Benefits */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Instant access</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Full updates</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Money-back guarantee</span>
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
