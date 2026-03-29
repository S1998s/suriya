"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { contactEmail, contactPhone } from "@/lib/siteInfo";

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          subject:      formData.subject,
          message:      formData.message,
          to_email:     "shanmugavel127@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      setError(`Failed to send: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: "📧",
      label: "Email",
      value: contactEmail,
      link: `mailto:${contactEmail}`,
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/Shanmugavel",
      link: "https://www.linkedin.com/in/shanmugavelcf/",
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: "github.com/shanmugavelr",
      link: "https://github.com/shanmugavelr",
    },
    {
      icon: "📱",
      label: "Phone",
      value: contactPhone,
      link: `tel:${contactPhone.replace(/\s+/g, "")}`,
    },
    {
      icon: "💬",
      label: "WhatsApp",
      value: "Message on WhatsApp",
      link: "https://wa.me/918667809442?text=Hi%21%20I%27d%20like%20to%20connect%20with%20you.",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-white">Get In Touch</h2>
        <div className="h-1 w-20 bg-blue-400 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <p className="text-dark-muted text-lg mb-8">
              I&apos;m always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say
              hello, feel free to reach out!
            </p>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-dark-bg rounded-lg hover:border border-blue-400 transition-all group"
                >
                  <span className="text-3xl">{method.icon}</span>
                  <div>
                    <p className="text-dark-muted text-sm">{method.label}</p>
                    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted && (
              <div className="mb-4 p-4 bg-green-600/20 border border-green-600 rounded-lg text-green-300">
                ✓ Message sent! I&apos;ll get back to you soon.
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-300">
                ✗ {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block text-dark-muted text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-muted focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-dark-muted text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-muted focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-dark-muted text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-muted focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-dark-muted text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-muted focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
