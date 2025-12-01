import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import { 
  insertContactSchema, 
  insertBlogPostSchema, 
  insertTestimonialSchema, 
  insertCaseStudySchema,
  insertCourseSchema,
  insertEnrollmentSchema,
  insertAnalyticsEventSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ========== Contact Form Endpoints ==========
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      console.log("New contact submission:", {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        timestamp: contact.createdAt,
      });
      
      // Track analytics event
      await storage.trackEvent({
        eventType: 'contact_submission',
        eventData: { subject: contact.subject },
        page: '/contact',
      });
      
      res.status(201).json({
        success: true,
        message: "Your message has been received. We'll get back to you within 24 hours.",
        id: contact.id,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message,
        });
      } else {
        console.error("Error processing contact submission:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request.",
        });
      }
    }
  });

  app.get("/api/contacts", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.patch("/api/contacts/:id/read", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.markContactRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking contact as read:", error);
      res.status(500).json({ message: "Failed to update contact" });
    }
  });

  // ========== Blog Endpoints ==========
  app.get("/api/blog", async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : 
                        req.query.published === 'false' ? false : undefined;
      const posts = await storage.getBlogPosts(published);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/blog", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        console.error("Error creating blog post:", error);
        res.status(500).json({ message: "Failed to create post" });
      }
    }
  });

  app.patch("/api/blog/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  app.delete("/api/blog/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // ========== Testimonials Endpoints ==========
  app.get("/api/testimonials", async (req, res) => {
    try {
      const featured = req.query.featured === 'true' ? true : 
                       req.query.featured === 'false' ? false : undefined;
      const testimonials = await storage.getTestimonials(featured);
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        console.error("Error creating testimonial:", error);
        res.status(500).json({ message: "Failed to create testimonial" });
      }
    }
  });

  app.patch("/api/testimonials/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const testimonial = await storage.updateTestimonial(req.params.id, req.body);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // ========== Case Studies Endpoints ==========
  app.get("/api/case-studies", async (req, res) => {
    try {
      const featured = req.query.featured === 'true' ? true : 
                       req.query.featured === 'false' ? false : undefined;
      const studies = await storage.getCaseStudies(featured);
      res.json(studies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({ message: "Failed to fetch case studies" });
    }
  });

  app.get("/api/case-studies/:slug", async (req, res) => {
    try {
      const study = await storage.getCaseStudyBySlug(req.params.slug);
      if (!study) {
        return res.status(404).json({ message: "Case study not found" });
      }
      res.json(study);
    } catch (error) {
      console.error("Error fetching case study:", error);
      res.status(500).json({ message: "Failed to fetch case study" });
    }
  });

  app.post("/api/case-studies", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertCaseStudySchema.parse(req.body);
      const study = await storage.createCaseStudy(validatedData);
      res.status(201).json(study);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        console.error("Error creating case study:", error);
        res.status(500).json({ message: "Failed to create case study" });
      }
    }
  });

  app.patch("/api/case-studies/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const study = await storage.updateCaseStudy(req.params.id, req.body);
      if (!study) {
        return res.status(404).json({ message: "Case study not found" });
      }
      res.json(study);
    } catch (error) {
      console.error("Error updating case study:", error);
      res.status(500).json({ message: "Failed to update case study" });
    }
  });

  app.delete("/api/case-studies/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteCaseStudy(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting case study:", error);
      res.status(500).json({ message: "Failed to delete case study" });
    }
  });

  // ========== Courses Endpoints ==========
  app.get("/api/courses", async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : 
                        req.query.published === 'false' ? false : undefined;
      const courses = await storage.getCourses(published);
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:slug", async (req, res) => {
    try {
      const course = await storage.getCourseBySlug(req.params.slug);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post("/api/courses", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validatedData);
      res.status(201).json(course);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Failed to create course" });
      }
    }
  });

  app.patch("/api/courses/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const course = await storage.updateCourse(req.params.id, req.body);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ message: "Failed to update course" });
    }
  });

  app.delete("/api/courses/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteCourse(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ message: "Failed to delete course" });
    }
  });

  // ========== Enrollment Endpoints ==========
  app.get("/api/enrollments", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const enrollments = await storage.getUserEnrollments(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.post("/api/enrollments", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { courseId } = req.body;
      
      // Check if already enrolled
      const existing = await storage.getEnrollment(userId, courseId);
      if (existing) {
        return res.status(400).json({ message: "Already enrolled in this course" });
      }
      
      const enrollment = await storage.createEnrollment({ userId, courseId });
      
      // Track analytics event
      await storage.trackEvent({
        eventType: 'course_enrollment',
        eventData: { courseId },
        userId,
        page: '/courses',
      });
      
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Error creating enrollment:", error);
      res.status(500).json({ message: "Failed to enroll in course" });
    }
  });

  app.patch("/api/enrollments/:id/progress", isAuthenticated, async (req, res) => {
    try {
      const { progress, completedLessons } = req.body;
      const enrollment = await storage.updateEnrollmentProgress(
        req.params.id,
        progress,
        completedLessons
      );
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      res.json(enrollment);
    } catch (error) {
      console.error("Error updating enrollment progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // ========== Analytics Endpoints ==========
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const validatedData = insertAnalyticsEventSchema.parse(req.body);
      await storage.trackEvent(validatedData);
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking analytics event:", error);
      res.status(500).json({ message: "Failed to track event" });
    }
  });

  app.get("/api/analytics/summary", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      res.json(summary);
    } catch (error) {
      console.error("Error fetching analytics summary:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get("/api/analytics/events", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const eventType = req.query.type as string | undefined;
      const limit = parseInt(req.query.limit as string) || 100;
      const events = await storage.getAnalyticsEvents(eventType, limit);
      res.json(events);
    } catch (error) {
      console.error("Error fetching analytics events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  return httpServer;
}
