import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCourses } from "@/hooks/useLocalStorage";
import {
  GraduationCap,
  Code2,
  Server,
  Palette,
  Globe,
  Smartphone,
  ArrowRight,
  Clock,
  Users,
  Star,
  PlayCircle,
} from "lucide-react";

interface CourseItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "course";
  icon: string;
  features: string[];
  price: string;
}

const courses: CourseItem[] = [
  {
    id: "course-1",
    slug: "complete-web-development-bootcamp",
    title: "Complete Web Development Bootcamp",
    description: "From zero to full-stack developer. Master HTML, CSS, JavaScript, React, Node.js, and databases.",
    category: "course",
    icon: "Code2",
    features: ["60+ hours", "Beginner", "Certificate", "Projects"],
    price: "$299",
  },
  {
    id: "course-2",
    slug: "advanced-react-nextjs",
    title: "Advanced React & Next.js",
    description: "Build production-ready applications with React 18, Next.js 14, and modern best practices.",
    category: "course",
    icon: "Globe",
    features: ["40+ hours", "Advanced", "Live coding", "Real projects"],
    price: "$199",
  },
  {
    id: "course-3",
    slug: "backend-mastery-nodejs",
    title: "Backend Mastery with Node.js",
    description: "Create scalable APIs, work with databases, implement authentication, and deploy to cloud.",
    category: "course",
    icon: "Server",
    features: ["35+ hours", "Intermediate", "REST & GraphQL", "AWS/GCP"],
    price: "$179",
  },
  {
    id: "course-4",
    slug: "uiux-design-fundamentals",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles, Figma, prototyping, and create stunning user interfaces.",
    category: "course",
    icon: "Palette",
    features: ["25+ hours", "Beginner", "Figma files", "Portfolio"],
    price: "$149",
  },
  {
    id: "course-5",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps with React Native and Flutter from scratch.",
    category: "course",
    icon: "Smartphone",
    features: ["45+ hours", "Intermediate", "iOS & Android", "Publishing"],
    price: "$249",
  },
  {
    id: "course-6",
    slug: "ai-machine-learning-developers",
    title: "AI & Machine Learning for Developers",
    description: "Integrate AI into your applications. Learn ML basics, APIs, and build intelligent features.",
    category: "course",
    icon: "GraduationCap",
    features: ["30+ hours", "Intermediate", "OpenAI/Claude", "Projects"],
    price: "$229",
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

function CourseCard({ course, index }: { course: CourseItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[course.icon] || GraduationCap;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group relative h-full glass-strong border-white/10 hover:border-purple/30 transition-all duration-500 hover:shadow-glow-purple"
        data-testid={`card-course-${course.id}`}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-purple/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-6 space-y-4">
          {/* Thumbnail / Icon Area */}
          <div className="relative h-32 rounded-md bg-gradient-to-br from-purple/20 via-primary/10 to-cyan/10 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
            <Icon className="w-12 h-12 text-purple" />
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md text-xs">
              <PlayCircle className="w-3 h-3" />
              <span>{course.features[0]}</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-purple transition-colors duration-300">
                {course.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {course.description}
            </p>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.features[0]}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {course.features[1]}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              4.9
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="font-display font-bold text-xl text-purple">
              {course.price}
            </span>
            <Link href={`/courses/${course.slug}`}>
              <Button
                variant="ghost"
                size="sm"
                className="group/btn hover:text-purple"
                data-testid={`button-enroll-${course.id}`}
              >
                View Course
                <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Courses() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { courses: dbCourses } = useCourses();
  
  const displayCourses = dbCourses && dbCourses.length > 0 ? dbCourses : courses;

  return (
    <section
      id="courses"
      className="relative py-24 md:py-32"
      data-testid="section-courses"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      
      {/* Decorative orbs */}
      <div className="absolute top-40 left-10 w-80 h-80 bg-purple/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-glow-pulse animation-delay-700" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="outline" className="mb-4 border-purple/30 text-purple">
            <GraduationCap className="w-3 h-3 mr-1" />
            Web Development Courses
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Learn From{" "}
            <span className="bg-gradient-to-r from-purple to-primary bg-clip-text text-transparent">
              The Experts
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive courses designed to take you from beginner to professional. 
            Learn at your own pace with hands-on projects and real-world examples.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {[
            { value: "10+", label: "Courses" },
            { value: "200+", label: "Hours" },
            { value: "1000+", label: "Students" },
            { value: "4.9", label: "Avg Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 glass rounded-md">
              <div className="font-display font-bold text-2xl text-purple">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple to-primary"
            data-testid="button-browse-courses"
          >
            Browse All Courses
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
