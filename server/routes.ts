import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store the contact submission
      const contact = await storage.createContact(validatedData);
      
      // Log the submission (in production, you would send an email notification here)
      console.log("New contact submission:", {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        timestamp: contact.createdAt,
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
          message: "An error occurred while processing your request. Please try again later.",
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching contacts.",
      });
    }
  });

  return httpServer;
}
