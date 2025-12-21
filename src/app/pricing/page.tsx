"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Check, ChevronDown, ChevronUp, MessageCircle, Palette, TrendingUp, Lightbulb, Code, Cloud, Globe, Briefcase, Layers } from "lucide-react";

const pricingData = {
  brandingCreative: {
    title: "Branding & Creative",
    icon: Palette,
    description: "We help you shape a brand that feels true to who you are—clear, modern, and memorable. From identity design to UI/UX, corporate visuals, and customized materials for events, we bring your story to life with creativity that stands out.",
    note: "This includes customization of materials like polos, books, pens, banners, and flyers for companies, tech events, conferences, workshops, retreats, and more.",
    categories: [
      {
        name: "Logo Design",
        priceRange: "₦5,000 – ₦300,000",
        tiers: [
          {
            name: "Basic Logo (No Trademark)",
            price: "₦5,000",
            features: ["1 simple logo concept", "Basic typography selection", "Simple icon/pattern style", "Social media header mockup", "Basic brand usage guide (logo usage + colors)"],
            ideal: "Startups that need a recognizable brand quickly without heavy documentation"
          },
          {
            name: "Standard Identity",
            price: "₦250,000",
            features: ["Full logo system (primary, secondary, brandmark/icon)", "Extended color palette with shades/tones", "Typography system (headings, body text, alternative fonts)", "Custom brand icons & patterns", "Business card mockup", "Social media kit (profile, header, 3 branded templates)", "Medium brand guide (logo rules, spacing, colors, typography, dos & don'ts)"],
            ideal: "Growing businesses building a stronger brand presence"
          },
          {
            name: "Complete Brand Identity",
            price: "₦300,000 – ₦350,000",
            popular: true,
            features: ["Full logo system (all variations + watermark)", "Full color system (primary, secondary, accents, neutrals)", "Typography system (pairing rules + alternatives)", "Custom brand icons & pattern library", "Brand shapes & graphic elements", "Business card, letterhead, envelope mockups", "Signage mockup", "Social media kit (templates + style guide)", "Brand imagery style (photography/illustration direction)", "Advanced brand manual (40+ pages), voice & tone, usage rules, layout grid, spacing rules, misuse guidelines, application samples"],
            ideal: "Businesses ready to scale or launch professionally with a full identity system"
          }
        ]
      },
      {
        name: "UI/UX Design",
        priceRange: "₦200,000 – ₦900,000",
        description: "We craft intuitive, beautiful, user-centered interfaces for web or mobile.",
        subcategories: [
          {
            name: "Mobile App UI/UX",
            tiers: [
              {
                name: "Basic Mobile App",
                price: "₦200,000 – ₦350,000",
                features: ["5–10 screens, wireframes & high-fidelity mockups", "Interactive prototype", "Basic style guide", "Delivered in PNG, PDF, clickable prototype"],
                ideal: "Small apps, MVPs, or startups validating an idea"
              },
              {
                name: "Standard Mobile App",
                price: "₦400,000 – ₦600,000",
                popular: true,
                features: ["10–20 screens, complete wireframes & mockups", "Interactive prototype with basic animations", "Medium style guide", "Component library", "Export-ready assets"],
                ideal: "Growing apps with moderate features"
              },
              {
                name: "Advanced Mobile App",
                price: "₦700,000 – ₦900,000",
                features: ["20+ screens, multi-platform design", "Full wireframes & mockups", "Interactive prototype with animations", "Advanced style guide & design system", "Usability testing", "Developer-ready assets"],
                ideal: "Complex apps or enterprise solutions"
              }
            ]
          },
          {
            name: "Website UI/UX",
            tiers: [
              {
                name: "Landing Page",
                price: "₦80,000 – ₦150,000",
                features: ["1-page wireframe & mockup", "Basic style guide", "Clickable prototype", "Developer-ready assets"],
                ideal: "Single-page websites, campaigns, or MVP landing pages"
              },
              {
                name: "Business Website",
                price: "₦200,000 – ₦400,000",
                popular: true,
                features: ["5–7 pages, wireframes & high-fidelity mockups", "Interactive prototype", "Style guide", "Basic component library", "Developer-ready assets"],
                ideal: "Corporate websites, small businesses"
              },
              {
                name: "Web App Interface",
                price: "₦350,000 – ₦900,000",
                features: ["Multi-page web application", "Wireframes & mockups", "Interactive prototype with user flows", "Advanced style guide & design system", "Component library", "Optional usability testing", "Developer-ready assets"],
                ideal: "Enterprise software, SaaS platforms"
              }
            ]
          }
        ],
        allInclude: "Wireframes, high-fidelity mockups, clickable prototypes, style guide, component library (for larger packages)"
      },
      {
        name: "Full Brand Kit",
        priceRange: "₦300,000 – ₦1,500,000",
        tiers: [
          {
            name: "Starter Brand Kit",
            price: "₦300,000 – ₦450,000",
            features: ["Logo + brand identity", "Brand colors & typography", "Business card design", "Social media templates (3)"],
            ideal: "Small businesses or startups needing a cohesive identity quickly"
          },
          {
            name: "Professional Brand Kit",
            price: "₦500,000 – ₦850,000",
            popular: true,
            features: ["Everything in Starter", "Brand patterns", "Custom brand icons", "Extended mockups", "Brand usage guidelines (10–20 pages)", "Email signature template"],
            ideal: "Growing businesses seeking a polished brand presence"
          },
          {
            name: "Corporate Brand Kit",
            price: "₦900,000 – ₦1,500,000",
            features: ["Everything in Professional", "Full brand strategy & tone of voice", "Visual identity system", "Corporate document templates", "Advanced brand manual (30–50 pages)", "Logo usage rules, typography & color guides", "Layout & spacing rules", "Launch graphics pack"],
            ideal: "Established businesses needing full-scale branding"
          }
        ]
      }
    ]
  },
  digitalMarketing: {
    title: "Digital Marketing",
    icon: TrendingUp,
    priceRange: "₦120,000 – ₦900,000/month",
    tiers: [
      {
        name: "Starter — Social Media Only",
        price: "₦120,000/month",
        features: ["1–2 social accounts", "12–20 posts/month", "Caption writing", "Basic graphics", "Hashtag research", "Engagement monitoring", "Monthly performance summary"]
      },
      {
        name: "Standard — Socials + SEO",
        price: "₦250,000/month",
        features: ["Everything in Starter", "On-page SEO", "Keyword research", "Content optimization", "Monthly SEO report", "Basic SEO strategy guidance"]
      },
      {
        name: "Growth — Socials + SEO + Ads",
        price: "₦450,000/month",
        popular: true,
        features: ["Everything in Standard", "Paid ads campaigns (Facebook, Instagram, Google)", "Ad copywriting", "Campaign setup & targeting", "Monthly ad performance report", "Budget planning guidance (ad spend not included)"]
      },
      {
        name: "Performance Pro — Full Management",
        price: "₦600,000 – ₦900,000/month",
        features: ["Everything in Growth", "Full marketing strategy & execution", "Advanced analytics", "A/B testing", "Quarterly marketing roadmap", "Dedicated account manager"]
      }
    ]
  },
  consultingStrategy: {
    title: "Consulting & Strategy",
    icon: Lightbulb,
    priceRange: "₦0 – ₦500,000",
    tiers: [
      {
        name: "Quick Advice (Free)",
        price: "₦0",
        features: ["15–30 min consultation", "Initial advice", "Guidance on next steps"]
      },
      {
        name: "One-Time Consultation",
        price: "₦50,000",
        features: ["1-hour session", "Analysis", "Actionable recommendations"]
      },
      {
        name: "Product Strategy Session",
        price: "₦120,000",
        popular: true,
        features: ["2-hour session", "Roadmap guidance", "Feature prioritization", "User research", "High-level development & design recommendations"]
      },
      {
        name: "Business & Market Strategy",
        price: "₦150,000 – ₦500,000",
        features: ["Competitor analysis", "Market positioning", "Business model clarity", "Go-to-market planning", "Optional follow-up sessions"],
        note: "Pricing tiers: Starter ₦150,000, Standard ₦250,000, Premium ₦400,000 – ₦500,000"
      }
    ]
  },
  softwareDevelopment: {
    title: "Software Development",
    icon: Code,
    priceRange: "₦250,000 – ₦5,000,000+",
    tiers: [
      {
        name: "Landing Page Website",
        price: "₦250,000 – ₦450,000",
        features: ["Single page design", "Responsive layout", "Contact form", "SEO basics", "Fast deployment"]
      },
      {
        name: "Business Website",
        price: "₦350,000 – ₦900,000",
        features: ["5-10 pages", "CMS integration", "Contact forms", "Blog setup", "Analytics integration"]
      },
      {
        name: "Web Application",
        price: "₦600,000 – ₦3,500,000",
        popular: true,
        features: ["Custom functionality", "User authentication", "Database integration", "Admin dashboard", "API development"]
      },
      {
        name: "Mobile App (Android/iOS)",
        price: "₦1,200,000 – ₦5,000,000+",
        features: ["Native or cross-platform", "App store submission", "Push notifications", "In-app payments", "Analytics integration"]
      }
    ],
    note: "Includes: design, development, deployment, revisions, optional add-ons (analytics, integrations, push notifications, in-app payments)."
  },
  cloudInfrastructure: {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    priceRange: "₦30,000 – ₦300,000/month",
    tiers: [
      {
        name: "Cloud Setup",
        price: "₦80,000 – ₦250,000",
        features: ["Cloud architecture design", "Server provisioning", "Security configuration", "Documentation"]
      },
      {
        name: "DevOps / CI/CD Setup",
        price: "₦100,000 – ₦300,000",
        popular: true,
        features: ["Automated pipelines", "Testing integration", "Deployment automation", "Monitoring setup"]
      },
      {
        name: "Server Management",
        price: "₦30,000 – ₦120,000/month",
        features: ["24/7 monitoring", "Security updates", "Performance optimization", "Backup management"]
      }
    ]
  },
  hostingDomain: {
    title: "Hosting & Domain Services",
    icon: Globe,
    priceRange: "₦20,000 – ₦150,000/year",
    tiers: [
      {
        name: "Domain Registration",
        price: "₦15,000 – ₦30,000/year",
        features: ["Domain name registration", "DNS management", "Email forwarding", "WHOIS privacy"]
      },
      {
        name: "Basic Hosting",
        price: "₦20,000 – ₦50,000/year",
        features: ["Shared hosting", "SSL certificate", "Email accounts", "Basic support"]
      },
      {
        name: "Business Hosting",
        price: "₦60,000 – ₦150,000/year",
        popular: true,
        features: ["Dedicated resources", "Premium SSL", "Priority support", "Daily backups", "CDN integration"]
      }
    ]
  },
  businessSupport: {
    title: "Business Support & Digital Setup",
    icon: Briefcase,
    priceRange: "₦40,000 – ₦300,000",
    tiers: [
      {
        name: "Company Profile Design",
        price: "₦40,000 – ₦120,000",
        features: ["Professional company profile", "Digital & print formats", "Brand-aligned design", "Revisions included"]
      },
      {
        name: "Digital Presence Setup",
        price: "₦80,000 – ₦180,000",
        popular: true,
        features: ["Google Business Profile", "Social media setup", "Basic SEO", "Directory listings"]
      },
      {
        name: "Launch Support",
        price: "₦150,000 – ₦300,000",
        features: ["Launch strategy", "Marketing materials", "Press kit preparation", "Social media campaign", "Launch day coordination"]
      }
    ]
  },
  pdaas: {
    title: "Product Development as a Service (PDaaS)",
    icon: Layers,
    description: "Full design & development team at your disposal with ongoing support.",
    features: ["Full design & development team", "Monthly feature updates", "Maintenance & support", "Project management"],
    note: "Pricing depends on product size and scope — consult with our team"
  }
};

function ServiceCard({ service, isOpen, onToggle }: { service: typeof pricingData.brandingCreative | typeof pricingData.digitalMarketing; isOpen: boolean; onToggle: () => void }) {
  const Icon = service.icon;
  
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <button
        onClick={onToggle}
        className="w-full p-6 sm:p-8 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#C41E3A] to-[#B91C1C] flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{service.title}</h3>
            {"priceRange" in service && (
              <p className="text-sm sm:text-base text-[#C41E3A] font-semibold mt-1">{service.priceRange}</p>
            )}
          </div>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#C41E3A] text-white rotate-180' : 'bg-red-50 text-[#C41E3A]'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 sm:px-8 pb-8 border-t border-gray-100">
          {"description" in service && service.description && (
            <p className="text-gray-600 mt-6 mb-4 leading-relaxed">{service.description}</p>
          )}
          {"note" in service && service.note && !("features" in service && !("tiers" in service)) && (
            <p className="text-sm text-gray-500 italic mb-6 p-4 bg-red-50/50 rounded-xl border border-red-100">{service.note}</p>
          )}
          
          {"categories" in service && service.categories ? (
            <div className="space-y-8 mt-6">
              {service.categories.map((category, catIdx) => (
                <div key={catIdx} className="border-l-4 border-[#C41E3A] pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-[#C41E3A] font-semibold text-sm mb-4">{category.priceRange}</p>
                  {"description" in category && category.description && (
                    <p className="text-gray-600 mb-4">{category.description}</p>
                  )}
                  
                  {"subcategories" in category && category.subcategories ? (
                    <div className="space-y-6">
                      {category.subcategories.map((subcat, subIdx) => (
                        <div key={subIdx} className="bg-gray-50 rounded-2xl p-6">
                          <h5 className="font-bold text-gray-800 mb-4">{subcat.name}</h5>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {subcat.tiers.map((tier, tierIdx) => (
                              <TierCard key={tierIdx} tier={tier} />
                            ))}
                          </div>
                        </div>
                      ))}
                      {"allInclude" in category && category.allInclude && (
                        <p className="text-sm text-gray-500 mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                          <strong>All Packages Include:</strong> {category.allInclude}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {"tiers" in category && category.tiers?.map((tier, tierIdx) => (
                        <TierCard key={tierIdx} tier={tier} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : "tiers" in service && service.tiers ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
              {service.tiers.map((tier, tierIdx) => (
                <TierCard key={tierIdx} tier={tier} />
              ))}
            </div>
          ) : "features" in service && Array.isArray(service.features) ? (
            <div className="mt-6">
              <ul className="grid sm:grid-cols-2 gap-3">
                {(service.features as string[]).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#C41E3A]" />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {"note" in service && service.note && (
                <p className="text-sm text-[#C41E3A] font-semibold mt-6 p-4 bg-red-50 rounded-xl text-center">{service.note}</p>
              )}
            </div>
          ) : null}
          
          {"note" in service && service.note && "tiers" in service && (
            <p className="text-sm text-gray-500 mt-6 p-3 bg-gray-50 rounded-lg">{service.note}</p>
          )}
        </div>
      )}
    </div>
  );
}

function TierCard({ tier }: { tier: { name: string; price: string; features: string[]; ideal?: string; popular?: boolean; note?: string } }) {
  return (
    <div className={`relative bg-white rounded-2xl p-5 shadow-md border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${tier.popular ? 'border-[#C41E3A] ring-2 ring-[#C41E3A]/20' : 'border-gray-200'}`}>
      {tier.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C41E3A] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
          Popular
        </span>
      )}
      <h5 className="font-bold text-gray-900 mb-2">{tier.name}</h5>
      <p className="text-lg font-bold text-[#C41E3A] mb-4">{tier.price}</p>
      <ul className="space-y-2 mb-4">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {tier.ideal && (
        <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-3">
          <strong>Ideal for:</strong> {tier.ideal}
        </p>
      )}
      {tier.note && (
        <p className="text-xs text-gray-500 mt-2">{tier.note}</p>
      )}
    </div>
  );
}

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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "sent">("idle");

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
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
      <section 
        className="relative min-h-[70vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/020efcc2-39fa-4397-a8b1-657fce73285a-naharatechnologies-com/assets/images/hero-section-bg-29.png')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center text-white px-4 py-20 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-white/10 backdrop-blur-sm text-white tracking-wide uppercase mb-6 border border-white/20">
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Transparent Pricing for Every Stage
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
            Designed to fit startups, growing businesses, and established brands. All projects can be customized based on your scope and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="bg-[#C41E3A] hover:bg-[#B91C1C] px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg">
              View All Pricing
            </a>
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-bold transition-all duration-300">
              Get Custom Quote
            </a>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-100 text-[#C41E3A] tracking-wide uppercase mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
              Choose What Works for You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any service category to explore detailed pricing options tailored to your needs.
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(pricingData).map(([key, service]) => (
              <ServiceCard
                key={key}
                service={service as typeof pricingData.brandingCreative}
                isOpen={openSections[key]}
                onToggle={() => toggleSection(key)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#fff0ef] to-[#feecea]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-100 text-[#C41E3A] tracking-wide uppercase mb-4">
            Flexible Payment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Pay-As-You-Go Plans Available
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We understand that funding can be a challenge for growing businesses. Our flexible payment plans allow you to kickstart your project with an initial deposit, followed by manageable installments as we reach key milestones.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#C41E3A]">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Initial Deposit</h3>
              <p className="text-sm text-gray-600">Start your project with a manageable upfront payment</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#C41E3A]">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Milestone Payments</h3>
              <p className="text-sm text-gray-600">Pay as we complete key phases of your project</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#C41E3A]">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Final Delivery</h3>
              <p className="text-sm text-gray-600">Complete payment upon successful project delivery</p>
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
                Let&apos;s discuss your project and find the perfect solution for your business. Our team is ready to help you spark your vision.
              </p>
              <div className="mt-8 grid gap-4 text-white/90 text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white font-semibold">1</span>
                  <span>Share your goals and timelines</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white font-semibold">2</span>
                  <span>We tailor a quote to your scope</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white font-semibold">3</span>
                  <span>Kick off with a milestone plan</span>
                </div>
              </div>
            </div>
            <div className="mt-12 w-full max-w-xl lg:mt-0 lg:max-w-[520px]">
              <div className="rounded-2xl bg-white/95 backdrop-blur shadow-2xl border border-white/60 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#C41E3A]">Custom Quote</p>
                    <h3 className="text-xl font-bold text-gray-900">Tell us about your project</h3>
                  </div>
                  {submitStatus === "sent" && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Request sent</span>
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
                    {submitStatus === "loading" ? "Sending..." : submitStatus === "sent" ? "Request received" : "Send my custom quote"}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    We&apos;ll respond within 1 business day with a tailored plan.
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
            Sparking Your Vision — We help businesses grow with innovative software solutions, branding, and digital marketing.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.naharatechnologies.com" className="text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="https://www.naharatechnologies.com/about" className="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="https://www.naharatechnologies.com/services" className="text-gray-400 hover:text-white transition-colors">Services</a>
            <a href="https://www.naharatechnologies.com/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-xs">
            © 2025 Nahara Technologies™ Plc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}