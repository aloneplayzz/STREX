import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ProductsPage from "@/pages/Products";
import AIAgentsPage from "@/pages/AIAgentsPage";
import CourseDetail from "@/pages/CourseDetail";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import AIAgentDetail from "@/pages/AIAgentDetail";
import ProductDetail from "@/pages/ProductDetail";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/ai-agents" component={AIAgentsPage} />
      <Route path="/ai-agents/:id" component={AIAgentDetail} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/case-studies/:id" component={CaseStudyDetail} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
