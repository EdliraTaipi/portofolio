import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./email";
import { sendViaFormspree } from "./backup-email";
import { sendDirectNotification } from "./simple-email";
import { sendViaWebhook, sendViaResend } from "./webhook-email";

import { sendViaFormSubmit, sendViaTelegram } from "./telegram-email";
import { sendDirectSMTP, sendViaEmailJS } from "./emailjs-service";
import { sendViaBrevoAPI, triggerFormSubmitActivation } from "./brevo-smtp";
import { sendViaBrevoSMTP } from "./brevo-direct";


export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Save to database
      const message = await storage.createContactMessage(validatedData);
      
      // Try to send email notification
      let emailResult: { success: boolean; error?: string } = { success: false, error: 'No email service configured' };
      
      // Prepare data for email (map form fields to expected format)
      const emailData = {
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        phone: validatedData.phone || undefined,
        message: validatedData.message
      };
      
      // Primary: FormSubmit (reliable and working)
      console.log('Sending email via FormSubmit...');
      emailResult = await sendViaFormSubmit(emailData);
      
      // Backup 1: Brevo SMTP if FormSubmit fails
      if (!emailResult.success) {
        console.log('FormSubmit failed, trying Brevo SMTP...');
        emailResult = await sendViaBrevoSMTP(emailData);
      }
      
      // Final backup: Notification service (always works)
      if (!emailResult.success) {
        console.log('All email services failed, using notification backup...');
        emailResult = await sendDirectNotification(emailData);
      }
      
      // Return success with email status
      res.status(201).json({ 
        message: "Message saved successfully", 
        id: message.id,
        emailSent: emailResult.success,
        emailError: emailResult.error
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error('Contact form error:', error);
        res.status(500).json({ message: "Failed to process message" });
      }
    }
  });

  // Get contact messages
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
