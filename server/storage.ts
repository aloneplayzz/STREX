import {
  users,
  contactSubmissions,
  blogPosts,
  testimonials,
  caseStudies,
  courses,
  enrollments,
  analyticsEvents,
  type User,
  type UpsertUser,
  type Contact,
  type InsertContact,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type CaseStudy,
  type InsertCaseStudy,
  type Course,
  type InsertCourse,
  type Enrollment,
  type InsertEnrollment,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  markContactRead(id: string): Promise<void>;
  
  // Blog operations
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<void>;
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  
  // Testimonial operations
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<void>;
  getTestimonials(featured?: boolean): Promise<Testimonial[]>;
  
  // Case study operations
  createCaseStudy(study: InsertCaseStudy): Promise<CaseStudy>;
  updateCaseStudy(id: string, study: Partial<InsertCaseStudy>): Promise<CaseStudy | undefined>;
  deleteCaseStudy(id: string): Promise<void>;
  getCaseStudies(featured?: boolean): Promise<CaseStudy[]>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>;
  
  // Course operations
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<void>;
  getCourses(published?: boolean): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  getCourseBySlug(slug: string): Promise<Course | undefined>;
  
  // Enrollment operations
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined>;
  getUserEnrollments(userId: string): Promise<Enrollment[]>;
  updateEnrollmentProgress(id: string, progress: number, completedLessons: string[]): Promise<Enrollment | undefined>;
  
  // Analytics operations
  trackEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(eventType?: string, limit?: number): Promise<AnalyticsEvent[]>;
  getAnalyticsSummary(): Promise<{ totalPageViews: number; totalContacts: number; totalEnrollments: number; recentEvents: AnalyticsEvent[] }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Contact operations
  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await db
      .insert(contactSubmissions)
      .values(contact)
      .returning();
    return result;
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContact(id: string): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return contact;
  }

  async markContactRead(id: string): Promise<void> {
    await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, id));
  }

  // Blog operations
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [result] = await db.insert(blogPosts).values(post).returning();
    return result;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [result] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return result;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    if (published !== undefined) {
      return db.select().from(blogPosts)
        .where(eq(blogPosts.published, published))
        .orderBy(desc(blogPosts.createdAt));
    }
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  // Testimonial operations
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [result] = await db.insert(testimonials).values(testimonial).returning();
    return result;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [result] = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return result;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  async getTestimonials(featured?: boolean): Promise<Testimonial[]> {
    if (featured !== undefined) {
      return db.select().from(testimonials)
        .where(eq(testimonials.featured, featured))
        .orderBy(desc(testimonials.createdAt));
    }
    return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  // Case study operations
  async createCaseStudy(study: InsertCaseStudy): Promise<CaseStudy> {
    const [result] = await db.insert(caseStudies).values(study).returning();
    return result;
  }

  async updateCaseStudy(id: string, study: Partial<InsertCaseStudy>): Promise<CaseStudy | undefined> {
    const [result] = await db
      .update(caseStudies)
      .set(study)
      .where(eq(caseStudies.id, id))
      .returning();
    return result;
  }

  async deleteCaseStudy(id: string): Promise<void> {
    await db.delete(caseStudies).where(eq(caseStudies.id, id));
  }

  async getCaseStudies(featured?: boolean): Promise<CaseStudy[]> {
    if (featured !== undefined) {
      return db.select().from(caseStudies)
        .where(eq(caseStudies.featured, featured))
        .orderBy(desc(caseStudies.createdAt));
    }
    return db.select().from(caseStudies).orderBy(desc(caseStudies.createdAt));
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    const [study] = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug));
    return study;
  }

  // Course operations
  async createCourse(course: InsertCourse): Promise<Course> {
    const [result] = await db.insert(courses).values(course as any).returning();
    return result;
  }

  async updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined> {
    const updateData: any = { ...course, updatedAt: new Date() };
    const [result] = await db
      .update(courses)
      .set(updateData)
      .where(eq(courses.id, id))
      .returning();
    return result;
  }

  async deleteCourse(id: string): Promise<void> {
    await db.delete(courses).where(eq(courses.id, id));
  }

  async getCourses(published?: boolean): Promise<Course[]> {
    if (published !== undefined) {
      return db.select().from(courses)
        .where(eq(courses.published, published))
        .orderBy(desc(courses.createdAt));
    }
    return db.select().from(courses).orderBy(desc(courses.createdAt));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.slug, slug));
    return course;
  }

  // Enrollment operations
  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [result] = await db.insert(enrollments).values(enrollment).returning();
    return result;
  }

  async getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined> {
    const [enrollment] = await db.select().from(enrollments)
      .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
    return enrollment;
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return db.select().from(enrollments)
      .where(eq(enrollments.userId, userId))
      .orderBy(desc(enrollments.enrolledAt));
  }

  async updateEnrollmentProgress(id: string, progress: number, completedLessons: string[]): Promise<Enrollment | undefined> {
    const [result] = await db
      .update(enrollments)
      .set({ 
        progress, 
        completedLessons,
        completedAt: progress >= 100 ? new Date() : null
      })
      .where(eq(enrollments.id, id))
      .returning();
    return result;
  }

  // Analytics operations
  async trackEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [result] = await db.insert(analyticsEvents).values(event).returning();
    return result;
  }

  async getAnalyticsEvents(eventType?: string, limit: number = 100): Promise<AnalyticsEvent[]> {
    if (eventType) {
      return db.select().from(analyticsEvents)
        .where(eq(analyticsEvents.eventType, eventType))
        .orderBy(desc(analyticsEvents.createdAt))
        .limit(limit);
    }
    return db.select().from(analyticsEvents)
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(limit);
  }

  async getAnalyticsSummary(): Promise<{ totalPageViews: number; totalContacts: number; totalEnrollments: number; recentEvents: AnalyticsEvent[] }> {
    const pageViews = await db.select().from(analyticsEvents).where(eq(analyticsEvents.eventType, 'page_view'));
    const contacts = await db.select().from(contactSubmissions);
    const enrollmentCount = await db.select().from(enrollments);
    const recentEvents = await db.select().from(analyticsEvents)
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(10);
    
    return {
      totalPageViews: pageViews.length,
      totalContacts: contacts.length,
      totalEnrollments: enrollmentCount.length,
      recentEvents,
    };
  }
}

export const storage = new DatabaseStorage();
