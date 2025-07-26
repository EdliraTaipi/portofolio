import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      return response.json();
    },
    onSuccess: () => {
      const { dismiss } = toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Auto-dismiss the toast after 3 seconds
      setTimeout(() => {
        dismiss();
      }, 3000);
      
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again or send me an email directly.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="relative">
      {/* Large glowing border animation */}
      <motion.div
        className="absolute -inset-1 rounded-sm border border-white/20"
        animate={{
          boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.3)",
            "0 0 40px rgba(59, 130, 246, 0.5)",
            "0 0 20px rgba(59, 130, 246, 0.3)"
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94],
          repeatType: "reverse"
        }}
      />
      
      {/* Content container */}
      <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-sm p-4 sm:p-6">
      
      <h4 className="font-semibold text-base sm:text-lg text-white mb-4 sm:mb-6">Contact Me</h4>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your first name"
                      {...field}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your last name"
                      {...field}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+44 123 456 7890"
                    type="tel"
                    {...field}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What would you like to discuss?"
                    {...field}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your project, challenges, or how I can help..."
                    rows={4}
                    {...field}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 resize-none rounded-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <button
            type="submit"
            disabled={contactMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-sm transition-all duration-200 shadow-lg"
          >
            {contactMutation.isPending ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Sending...</span>
              </div>
            ) : (
              <span className="text-lg font-semibold tracking-wide">SEND MESSAGE</span>
            )}
          </button>
        </form>
      </Form>
      </div>
    </div>
  );
}