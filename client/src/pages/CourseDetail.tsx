import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Code2, Server, Palette, Globe, Smartphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCourses } from "@/hooks/useLocalStorage";

const iconMap: Record<string, any> = {
  Code2,
  Server,
  Palette,
  Globe,
  Smartphone,
  GraduationCap,
};

export default function CourseDetail() {
  const params = useParams();
  const courseId = params?.id;
  const { courses } = useCourses();

  const course = courses?.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl mb-4">Course not found</h1>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist.
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

  const Icon = iconMap[course.icon] || GraduationCap;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/#courses">
            <Button variant="ghost" size="sm" data-testid="button-back-courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </header>

      {/* Course Content */}
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
                <Badge variant="secondary" className="mb-4">
                  {course.level || "All Levels"}
                </Badge>
                
                <h1 
                  className="font-display font-bold text-3xl md:text-4xl mb-4"
                  data-testid="text-course-title"
                >
                  {course.title}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>{course.features?.[1] || "All Levels"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.features?.[0] || "Self-paced"}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {course.features && course.features.length > 0 ? (
                    course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Comprehensive curriculum covering all topics</p>
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
                  {/* Course Icon */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-purple" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="font-display font-bold text-4xl gradient-text">
                      ${course.price || "Free"}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full bg-gradient-to-r from-primary to-purple" size="lg" data-testid="button-enroll">
                    Enroll Now
                  </Button>

                  {/* Course Features */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Certificate included</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Project files included</span>
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
