"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Palette,
  TrendingUp,
  Lightbulb,
  Code,
  Cloud,
  Globe,
  Briefcase,
  Layers,
  CheckCircle,
} from "lucide-react";
import PricingHero from "@/sections/pricing/PricingHero";
import PricingMain from "@/sections/pricing/PricingMain";

export default function PricingPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    brandingCreative: true,
    digitalMarketing: false,
    consultingStrategy: false,
    softwareDevelopment: false,
    cloudInfrastructure: false,
    hostingDomain: false,
    businessSupport: false,
    pdaas: false,
  });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    details: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "sent">(
    "idle"
  );

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setTimeout(() => {
      setSubmitStatus("sent");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FEECEA]">
      <PricingHero />
      <PricingMain />

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#fff0ef] to-[#feecea]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full text-bodyXS bg-red-100 text-[#C41E3A] tracking-wide uppercase mb-4">
            Flexible Payment
          </span>
          <h2 className="text-h2 text-gray-900 mb-6">
            Pay-As-You-Go Plans Available
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We understand that funding can be a challenge for growing
            businesses. Our flexible payment plans allow you to kickstart your
            project with an initial deposit, followed by manageable installments
            as we reach key milestones.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#C41E3A]">1</span>
              </div>
              <h3 className="text-h3 text-gray-900 mb-2">Initial Deposit</h3>
              <p className="text-bodySmall text-gray-600">
                Start your project with a manageable upfront payment
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#C41E3A]">2</span>
              </div>
              <h3 className="text-h3 text-gray-900 mb-2">
                Milestone Payments
              </h3>
              <p className="text-bodySmall text-gray-600">
                Pay as we complete key phases of your project
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#C41E3A]">3</span>
              </div>
              <h3 className="text-h3 text-gray-900 mb-2">Final Delivery</h3>

              <p className="text-bodySmall text-gray-600">
                Complete payment upon successful project delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#FB923C] px-6 py-12 shadow-2xl sm:px-12 sm:py-16 lg:flex lg:items-start lg:gap-x-20 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:flex-auto lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
                Ready to Get Started?
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/90 font-medium max-w-lg mx-auto lg:mx-0">
                Let&apos;s discuss your project and find the perfect solution
                for your business. Our team is ready to help you spark your
                vision.
              </p>
              <div className="mt-8 grid gap-4 text-white/90 text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white font-semibold">
                    1
                  </span>
                  <span>Share your goals and timelines</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white font-semibold">
                    2
                  </span>
                  <span>We tailor a quote to your scope</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white font-semibold">
                    3
                  </span>
                  <span>Kick off with a milestone plan</span>
                </div>
              </div>
            </div>
            <div className="mt-12 w-full max-w-xl lg:mt-0 lg:max-w-[520px]">
              <div className="rounded-2xl bg-white/95 backdrop-blur shadow-2xl border border-white/60 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#C41E3A]">
                      Custom Quote
                    </p>
                    <h3 className="text-xl font-bold text-gray-900">
                      Tell us about your project
                    </h3>
                  </div>
                  {submitStatus === "sent" && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      Request sent
                    </span>
                  )}
                </div>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Full name"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20 outline-none"
                    />
                    <input
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Work email"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20 outline-none"
                    />
                  </div>
                  <input
                    name="company"
                    value={formState.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20 outline-none"
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select
                      name="service"
                      value={formState.service}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20 outline-none"
                    >
                      <option value="">Select a service</option>
                      <option>Branding & Creative</option>
                      <option>UI/UX Design</option>
                      <option>Full Brand Kit</option>
                      <option>Digital Marketing</option>
                      <option>Consulting & Strategy</option>
                      <option>Software Development</option>
                      <option>Cloud & Infrastructure</option>
                      <option>Hosting & Domains</option>
                      <option>Business Support</option>
                      <option>PDaaS</option>
                    </select>
                    <select
                      name="budget"
                      value={formState.budget}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20 outline-none"
                    >
                      <option value="">Budget range</option>
                      <option>₦50k – ₦150k</option>
                      <option>₦150k – ₦500k</option>
                      <option>₦500k – ₦1.5m</option>
                      <option>₦1.5m – ₦3m</option>
                      <option>₦3m+</option>
                    </select>
                  </div>
                  <select
                    name="timeline"
                    value={formState.timeline}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20 outline-none"
                  >
                    <option value="">Timeline</option>
                    <option>Asap (0-2 weeks)</option>
                    <option>2-4 weeks</option>
                    <option>1-2 months</option>
                    <option>3+ months</option>
                  </select>
                  <textarea
                    name="details"
                    value={formState.details}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Project goals, scope, and any specific requirements"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="w-full inline-flex items-center justify-center rounded-full bg-[#C41E3A] px-5 py-3 text-white font-semibold shadow-lg transition-all duration-200 hover:bg-[#B91C1C] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                  >
                    {submitStatus === "loading"
                      ? "Sending..."
                      : submitStatus === "sent"
                      ? "Request received"
                      : "Send my custom quote"}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    We&apos;ll respond within 1 business day with a tailored
                    plan.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/message"
        className="fixed bottom-6 right-6 z-50 bg-[#C41E3A] text-white py-3 px-5 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Quick chat with us</span>
      </a>

      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-2xl font-bold">Nahara Technologies</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Sparking Your Vision — We help businesses grow with innovative
            software solutions, branding, and digital marketing.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://www.naharatechnologies.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="https://www.naharatechnologies.com/about"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="https://www.naharatechnologies.com/services"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="https://www.naharatechnologies.com/contact"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-gray-500 text-xs">
            © 2025 Nahara Technologies™ Plc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
