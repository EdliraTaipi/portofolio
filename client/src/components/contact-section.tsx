import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, MapPin, Clock, Send, Download, Linkedin, Twitter, Github, Instagram } from "lucide-react";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { InsertContactMessage } from "@shared/schema";
import { z } from "zod";

const contactFormSchema = insertContactMessageSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const handleCVDownload = () => {
    toast({
      title: "CV Download",
      description: "CV download functionality will be implemented with actual PDF file.",
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50/50 to-blue-100/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Let's Work Together</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to bring strategic thinking and innovative solutions to your next project? 
            Let's discuss how we can create meaningful impact together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="contact-form p-8 rounded-2xl shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="collaboration">Collaboration Opportunity</SelectItem>
                          <SelectItem value="consultation">Marketing Consultation</SelectItem>
                          <SelectItem value="project">Project Discussion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={6} 
                          placeholder="Tell me about your project or how I can help..." 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={contactMutation.isPending}
                >
                  <Send className="mr-2" size={20} />
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <Mail className="text-2xl text-blue-600" size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">edlira.taipi@example.com</p>
                  <p className="text-sm text-gray-500 mt-1">I'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <MapPin className="text-2xl text-blue-600" size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">London, United Kingdom</p>
                  <p className="text-sm text-gray-500 mt-1">Available for remote & in-person collaboration</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <Clock className="text-2xl text-blue-600" size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Availability</h3>
                  <p className="text-gray-600">Monday - Friday, 9AM - 6PM GMT</p>
                  <p className="text-sm text-gray-500 mt-1">Flexible scheduling for international clients</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <Github size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            {/* CV Download */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-3">Download My CV</h3>
              <p className="text-blue-100 mb-4">Get a comprehensive overview of my education, skills, and project experience.</p>
              <Button 
                onClick={handleCVDownload}
                className="bg-white text-blue-600 hover:bg-gray-100 w-full"
              >
                <Download className="mr-2" size={20} />
                Download CV (PDF)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
