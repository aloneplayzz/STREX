import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Clock, BarChart3, Users, Play, CheckCircle2, 
  Lock, BookOpen, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useAnalytics } from "@/hooks/useAnalytics";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Course, Enrollment } from "@shared/schema";

function CourseSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Skeleton className="h-8 w-32 mb-8" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
        <div>
          <Skeleton className="h-64 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  useAnalytics();

  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: ["/api/courses", slug],
  });

  const { data: enrollments } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments"],
    enabled: isAuthenticated,
  });

  const enrollment = enrollments?.find(e => e.courseId === course?.id);

  const enrollMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/enrollments', { courseId: course?.id });
    },
    onSuccess: () => {
      toast({
        title: "Enrolled successfully!",
        description: "You now have access to this course.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Sign in required",
          description: "Please sign in to enroll in this course.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Enrollment failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to enroll in courses.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }
    enrollMutation.mutate();
  };

  if (isLoading || authLoading) {
    return <CourseSkeleton />;
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl mb-4">Course not found</h1>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist or has been removed.
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

  const lessons = course.lessons || [];
  const completedLessons = enrollment?.completedLessons || [];
  const progress = enrollment?.progress || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/#courses">
              <Button variant="ghost" size="sm" data-testid="button-back-courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = "/api/logout"}
                data-testid="button-logout"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = "/api/login"}
                data-testid="button-login"
              >
                Sign In
              </Button>
            )}
          </div>
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
            >
              <Badge variant="secondary" className="mb-4">
                {course.level}
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

              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>By {course.instructor}</span>
                </div>
              </div>

              {/* Cover Image */}
              {course.coverImage && (
                <div className="relative rounded-md overflow-hidden mb-8">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Curriculum */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Course Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {lessons.length > 0 ? (
                    lessons.map((lesson, index) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isLocked = !enrollment && index > 0;
                      
                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-3 p-3 rounded-md ${
                            isCompleted ? 'bg-primary/10' : 'bg-surface/50'
                          }`}
                          data-testid={`lesson-${lesson.id}`}
                        >
                          {isLocked ? (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          ) : (
                            <Play className="w-5 h-5 text-muted-foreground" />
                          )}
                          <span className={`flex-1 ${isLocked ? 'text-muted-foreground' : ''}`}>
                            {lesson.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Course curriculum coming soon!
                    </p>
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
            >
              <Card className="glass sticky top-24">
                <CardContent className="p-6">
                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="font-display font-bold text-4xl gradient-text">
                      ${course.price}
                    </span>
                    {course.price > 0 && (
                      <span className="text-sm text-muted-foreground ml-2 line-through">
                        ${course.price + 50}
                      </span>
                    )}
                  </div>

                  {/* Progress (if enrolled) */}
                  {enrollment && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Your Progress</span>
                        <span className="text-sm text-muted-foreground">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      {progress >= 100 && (
                        <div className="flex items-center gap-2 mt-4 p-3 rounded-md bg-primary/10 text-primary">
                          <Award className="w-5 h-5" />
                          <span className="text-sm font-medium">Course Completed!</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA Button */}
                  {enrollment ? (
                    <Button className="w-full" size="lg" data-testid="button-continue-course">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-purple"
                      size="lg"
                      onClick={handleEnroll}
                      disabled={enrollMutation.isPending}
                      data-testid="button-enroll"
                    >
                      {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                    </Button>
                  )}

                  {/* Course Features */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{lessons.length} lessons included</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Certificate of completion</span>
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
