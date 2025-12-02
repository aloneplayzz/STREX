import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Code2, Server, Palette, Globe, Smartphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCourses } from "@/hooks/useLocalStorage";

const defaultCourses = [
  {
    id: "course-1",
    title: "Complete Web Development Bootcamp",
    description: "From zero to full-stack developer. Master HTML, CSS, JavaScript, React, Node.js, and databases.",
    price: "299",
    category: "course",
    icon: "Code2",
    features: ["60+ hours", "Beginner", "Certificate", "Projects"],
  },
  {
    id: "course-2",
    title: "Advanced React & Next.js",
    description: "Build production-ready applications with React 18, Next.js 14, and modern best practices.",
    price: "199",
    category: "course",
    icon: "Globe",
    features: ["40+ hours", "Advanced", "Live coding", "Real projects"],
  },
  {
    id: "course-3",
    title: "Backend Mastery with Node.js",
    description: "Create scalable APIs, work with databases, implement authentication, and deploy to cloud.",
    price: "179",
    category: "course",
    icon: "Server",
    features: ["35+ hours", "Intermediate", "REST & GraphQL", "AWS/GCP"],
  },
  {
    id: "course-4",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles, Figma, prototyping, and create stunning user interfaces.",
    price: "149",
    category: "course",
    icon: "Palette",
    features: ["25+ hours", "Beginner", "Figma files", "Portfolio"],
  },
  {
    id: "course-5",
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps with React Native and Flutter from scratch.",
    price: "249",
    category: "course",
    icon: "Smartphone",
    features: ["45+ hours", "Intermediate", "iOS & Android", "Publishing"],
  },
  {
    id: "course-6",
    title: "AI & Machine Learning for Developers",
    description: "Integrate AI into your applications. Learn ML basics, APIs, and build intelligent features.",
    price: "229",
    category: "course",
    icon: "GraduationCap",
    features: ["30+ hours", "Intermediate", "OpenAI/Claude", "Projects"],
  },
];

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
  const { courses: dbCourses } = useCourses();
  const allCourses = (dbCourses && dbCourses.length > 0) ? [...defaultCourses, ...dbCourses] : defaultCourses;

  const course = allCourses?.find(c => c.id === courseId);

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
                  {(course as any).level || "All Levels"}
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
                  <Link href="/#contact">
                    <Button className="w-full bg-gradient-to-r from-primary to-purple" size="lg" data-testid="button-enroll">
                      Enroll Now
                    </Button>
                  </Link>

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
