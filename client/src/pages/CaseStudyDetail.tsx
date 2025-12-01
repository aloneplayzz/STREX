import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCaseStudies } from "@/hooks/useLocalStorage";

export default function CaseStudyDetail() {
  const params = useParams();
  const studyId = params?.id;
  const { studies } = useCaseStudies();

  const study = studies?.find(s => s.id === studyId);

  if (!study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl mb-4">Case Study not found</h1>
          <p className="text-muted-foreground mb-6">
            The case study you're looking for doesn't exist.
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
          <Link href="/#case-studies">
            <Button variant="ghost" size="sm" data-testid="button-back-case-studies">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Button>
          </Link>
        </div>
      </header>

      {/* Case Study Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <Badge className="mb-4 bg-purple/20 text-purple border-0">
              <Building2 className="w-3 h-3 mr-1" />
              {study.industry}
            </Badge>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              {study.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Client: <span className="text-foreground font-semibold">{study.client}</span>
            </p>
          </div>

          {/* Cover Image */}
          {study.coverImage && (
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={study.coverImage}
                alt={study.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Challenge Section */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">The Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {study.challenge}
              </p>
            </CardContent>
          </Card>

          {/* Solution Section */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Our Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {study.solution}
              </p>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="glass border-white/10 bg-gradient-to-br from-primary/10 to-purple/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
                Results & Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary">
                {study.results}
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center py-8">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple">
                View More Case Studies
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
