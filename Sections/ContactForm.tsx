"use client";

import { useState } from "react";
import Button from "@/Components/Button";
import Textarea from "@/Components/Textarea";
import Input from "@/Components/TextInput";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle success
      console.log("Form submitted:", formData);
      alert("Message sent successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ArrowIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );

  return (
    <section className="px-8">
      <div className="w-[95%] mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8 my-11">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            WE'RE HERE <span className="text-[#2563EB]">TO HELP</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Have questions or need assistance? Our team is available to support
            you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-lg font-semibold text-gray-900 mb-4">
            Get in Touch Form
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter Name"
              required
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Name"
              required
              error={errors.lastName}
            />
          </div>

          {/* Email and Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email Address"
              required
              error={errors.email}
            />
            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter Subject"
              required
              error={errors.subject}
            />
          </div>

          {/* Message */}
          <Textarea
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Type Here"
            rows={6}
            required
            error={errors.message}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              icon={ArrowIcon}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
