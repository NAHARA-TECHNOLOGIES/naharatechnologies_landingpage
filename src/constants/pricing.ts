import {
  Briefcase,
  Cloud,
  Code,
  Globe,
  Layers,
  Lightbulb,
  LucideIcon,
  Palette,
  TrendingUp,
} from "lucide-react";

export interface BaseService {
  title: string;
  icon: LucideIcon;
  description?: string;
  note?: string;
  priceRange?: string;
}

export interface Tier {
  name: string;
  price: string;
  features: string[];
  ideal?: string;
  popular?: boolean;
  note?: string;
}

export interface SubCategory {
  name: string;
  tiers: Tier[];
}

export interface Category {
  name: string;
  tiers?: Tier[];
  subcategories?: SubCategory[];
  description?: string;
  priceRange: string;
  allInclude?: string;
}

export interface CategorizedService extends BaseService {
  categories: Category[];
}

export interface TierOnlyService extends BaseService {
  tiers: Tier[];
}

export interface PDaaSService extends BaseService {
  features: string[];
}

const pricingData: Record<
  string,
  CategorizedService | TierOnlyService | PDaaSService
> = {
  branding: {
    title: "Branding & Creative",
    icon: Palette,
    description:
      "We help you shape a brand that feels true to who you are—clear, modern, and memorable. From identity design to UI/UX, corporate visuals, and customized materials for events, we bring your story to life with creativity that stands out.",
    note: "This includes customization of materials like polos, books, pens, banners, and flyers for companies, tech events, conferences, workshops, retreats, and more.",
    categories: [
      {
        name: "Logo Design",
        priceRange: "₦5,000 – ₦300,000",
        tiers: [
          {
            name: "Basic Logo (No Trademark)",
            price: "₦5,000",
            features: [
              "1 simple logo concept",
              "Basic typography selection",
              "Simple icon/pattern style",
              "Social media header mockup",
              "Basic brand usage guide (logo usage + colors)",
            ],
            ideal:
              "Startups that need a recognizable brand quickly without heavy documentation",
          },
          {
            name: "Standard Identity",
            price: "₦250,000",
            features: [
              "Full logo system (primary, secondary, brandmark/icon)",
              "Extended color palette with shades/tones",
              "Typography system (headings, body text, alternative fonts)",
              "Custom brand icons & patterns",
              "Business card mockup",
              "Social media kit (profile, header, 3 branded templates)",
              "Medium brand guide (logo rules, spacing, colors, typography, dos & don'ts)",
            ],
            ideal: "Growing businesses building a stronger brand presence",
          },
          {
            name: "Complete Brand Identity",
            price: "₦300,000 – ₦350,000",
            popular: true,
            features: [
              "Full logo system (all variations + watermark)",
              "Full color system (primary, secondary, accents, neutrals)",
              "Typography system (pairing rules + alternatives)",
              "Custom brand icons & pattern library",
              "Brand shapes & graphic elements",
              "Business card, letterhead, envelope mockups",
              "Signage mockup",
              "Social media kit (templates + style guide)",
              "Brand imagery style (photography/illustration direction)",
              "Advanced brand manual (40+ pages), voice & tone, usage rules, layout grid, spacing rules, misuse guidelines, application samples",
            ],
            ideal:
              "Businesses ready to scale or launch professionally with a full identity system",
          },
        ],
      },
      {
        name: "UI/UX Design",
        priceRange: "₦200,000 – ₦900,000",
        description:
          "We craft intuitive, beautiful, user-centered interfaces for web or mobile.",
        subcategories: [
          {
            name: "Mobile App UI/UX",
            tiers: [
              {
                name: "Basic Mobile App",
                price: "₦200,000 – ₦350,000",
                features: [
                  "5–10 screens, wireframes & high-fidelity mockups",
                  "Interactive prototype",
                  "Basic style guide",
                  "Delivered in PNG, PDF, clickable prototype",
                ],
                ideal: "Small apps, MVPs, or startups validating an idea",
              },
              {
                name: "Standard Mobile App",
                price: "₦400,000 – ₦600,000",
                popular: true,
                features: [
                  "10–20 screens, complete wireframes & mockups",
                  "Interactive prototype with basic animations",
                  "Medium style guide",
                  "Component library",
                  "Export-ready assets",
                ],
                ideal: "Growing apps with moderate features",
              },
              {
                name: "Advanced Mobile App",
                price: "₦700,000 – ₦900,000",
                features: [
                  "20+ screens, multi-platform design",
                  "Full wireframes & mockups",
                  "Interactive prototype with animations",
                  "Advanced style guide & design system",
                  "Usability testing",
                  "Developer-ready assets",
                ],
                ideal: "Complex apps or enterprise solutions",
              },
            ],
          },
          {
            name: "Website UI/UX",
            tiers: [
              {
                name: "Landing Page",
                price: "₦80,000 – ₦150,000",
                features: [
                  "1-page wireframe & mockup",
                  "Basic style guide",
                  "Clickable prototype",
                  "Developer-ready assets",
                ],
                ideal: "Single-page websites, campaigns, or MVP landing pages",
              },
              {
                name: "Business Website",
                price: "₦200,000 – ₦400,000",
                popular: true,
                features: [
                  "5–7 pages, wireframes & high-fidelity mockups",
                  "Interactive prototype",
                  "Style guide",
                  "Basic component library",
                  "Developer-ready assets",
                ],
                ideal: "Corporate websites, small businesses",
              },
              {
                name: "Web App Interface",
                price: "₦350,000 – ₦900,000",
                features: [
                  "Multi-page web application",
                  "Wireframes & mockups",
                  "Interactive prototype with user flows",
                  "Advanced style guide & design system",
                  "Component library",
                  "Optional usability testing",
                  "Developer-ready assets",
                ],
                ideal: "Enterprise software, SaaS platforms",
              },
            ],
          },
        ],
        allInclude:
          "Wireframes, high-fidelity mockups, clickable prototypes, style guide, component library (for larger packages)",
      },
      {
        name: "Full Brand Kit",
        priceRange: "₦300,000 – ₦1,500,000",
        tiers: [
          {
            name: "Starter Brand Kit",
            price: "₦300,000 – ₦450,000",
            features: [
              "Logo + brand identity",
              "Brand colors & typography",
              "Business card design",
              "Social media templates (3)",
            ],
            ideal:
              "Small businesses or startups needing a cohesive identity quickly",
          },
          {
            name: "Professional Brand Kit",
            price: "₦500,000 – ₦850,000",
            popular: true,
            features: [
              "Everything in Starter",
              "Brand patterns",
              "Custom brand icons",
              "Extended mockups",
              "Brand usage guidelines (10–20 pages)",
              "Email signature template",
            ],
            ideal: "Growing businesses seeking a polished brand presence",
          },
          {
            name: "Corporate Brand Kit",
            price: "₦900,000 – ₦1,500,000",
            features: [
              "Everything in Professional",
              "Full brand strategy & tone of voice",
              "Visual identity system",
              "Corporate document templates",
              "Advanced brand manual (30–50 pages)",
              "Logo usage rules, typography & color guides",
              "Layout & spacing rules",
              "Launch graphics pack",
            ],
            ideal: "Established businesses needing full-scale branding",
          },
        ],
      },
    ],
  },
  digital: {
    title: "Digital Marketing",
    icon: TrendingUp,
    priceRange: "₦120,000 – ₦900,000/month",
    tiers: [
      {
        name: "Starter — Social Media Only",
        price: "₦120,000/month",
        features: [
          "1–2 social accounts",
          "12–20 posts/month",
          "Caption writing",
          "Basic graphics",
          "Hashtag research",
          "Engagement monitoring",
          "Monthly performance summary",
        ],
      },
      {
        name: "Standard — Socials + SEO",
        price: "₦250,000/month",
        features: [
          "Everything in Starter",
          "On-page SEO",
          "Keyword research",
          "Content optimization",
          "Monthly SEO report",
          "Basic SEO strategy guidance",
        ],
      },
      {
        name: "Growth — Socials + SEO + Ads",
        price: "₦450,000/month",
        popular: true,
        features: [
          "Everything in Standard",
          "Paid ads campaigns (Facebook, Instagram, Google)",
          "Ad copywriting",
          "Campaign setup & targeting",
          "Monthly ad performance report",
          "Budget planning guidance (ad spend not included)",
        ],
      },
      {
        name: "Performance Pro — Full Management",
        price: "₦600,000 – ₦900,000/month",
        features: [
          "Everything in Growth",
          "Full marketing strategy & execution",
          "Advanced analytics",
          "A/B testing",
          "Quarterly marketing roadmap",
          "Dedicated account manager",
        ],
      },
    ],
  },
  consult: {
    title: "Consulting & Strategy",
    icon: Lightbulb,
    priceRange: "₦0 – ₦500,000",
    tiers: [
      {
        name: "Quick Advice (Free)",
        price: "₦0",
        features: [
          "15–30 min consultation",
          "Initial advice",
          "Guidance on next steps",
        ],
      },
      {
        name: "One-Time Consultation",
        price: "₦50,000",
        features: ["1-hour session", "Analysis", "Actionable recommendations"],
      },
      {
        name: "Product Strategy Session",
        price: "₦120,000",
        popular: true,
        features: [
          "2-hour session",
          "Roadmap guidance",
          "Feature prioritization",
          "User research",
          "High-level development & design recommendations",
        ],
      },
      {
        name: "Business & Market Strategy",
        price: "₦150,000 – ₦500,000",
        features: [
          "Competitor analysis",
          "Market positioning",
          "Business model clarity",
          "Go-to-market planning",
          "Optional follow-up sessions",
        ],
        note: "Pricing tiers: Starter ₦150,000, Standard ₦250,000, Premium ₦400,000 – ₦500,000",
      },
    ],
  },
  software: {
    title: "Software Development",
    icon: Code,
    priceRange: "₦250,000 – ₦5,000,000+",
    tiers: [
      {
        name: "Landing Page Website",
        price: "₦250,000 – ₦450,000",
        features: [
          "Single page design",
          "Responsive layout",
          "Contact form",
          "SEO basics",
          "Fast deployment",
        ],
      },
      {
        name: "Business Website",
        price: "₦350,000 – ₦900,000",
        features: [
          "5-10 pages",
          "CMS integration",
          "Contact forms",
          "Blog setup",
          "Analytics integration",
        ],
      },
      {
        name: "Web Application",
        price: "₦600,000 – ₦3,500,000",
        popular: true,
        features: [
          "Custom functionality",
          "User authentication",
          "Database integration",
          "Admin dashboard",
          "API development",
        ],
      },
      {
        name: "Mobile App (Android/iOS)",
        price: "₦1,200,000 – ₦5,000,000+",
        features: [
          "Native or cross-platform",
          "App store submission",
          "Push notifications",
          "In-app payments",
          "Analytics integration",
        ],
      },
    ],
    note: "Includes: design, development, deployment, revisions, optional add-ons (analytics, integrations, push notifications, in-app payments).",
  },
  cloud: {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    priceRange: "₦30,000 – ₦300,000/month",
    tiers: [
      {
        name: "Cloud Setup",
        price: "₦80,000 – ₦250,000",
        features: [
          "Cloud architecture design",
          "Server provisioning",
          "Security configuration",
          "Documentation",
        ],
      },
      {
        name: "DevOps / CI/CD Setup",
        price: "₦100,000 – ₦300,000",
        popular: true,
        features: [
          "Automated pipelines",
          "Testing integration",
          "Deployment automation",
          "Monitoring setup",
        ],
      },
      {
        name: "Server Management",
        price: "₦30,000 – ₦120,000/month",
        features: [
          "24/7 monitoring",
          "Security updates",
          "Performance optimization",
          "Backup management",
        ],
      },
    ],
  },
  hosting: {
    title: "Hosting & Domain Services",
    icon: Globe,
    priceRange: "₦20,000 – ₦150,000/year",
    tiers: [
      {
        name: "Domain Registration",
        price: "₦15,000 – ₦30,000/year",
        features: [
          "Domain name registration",
          "DNS management",
          "Email forwarding",
          "WHOIS privacy",
        ],
      },
      {
        name: "Basic Hosting",
        price: "₦20,000 – ₦50,000/year",
        features: [
          "Shared hosting",
          "SSL certificate",
          "Email accounts",
          "Basic support",
        ],
      },
      {
        name: "Business Hosting",
        price: "₦60,000 – ₦150,000/year",
        popular: true,
        features: [
          "Dedicated resources",
          "Premium SSL",
          "Priority support",
          "Daily backups",
          "CDN integration",
        ],
      },
    ],
  },
  business: {
    title: "Business Support & Digital Setup",
    icon: Briefcase,
    priceRange: "₦40,000 – ₦300,000",
    tiers: [
      {
        name: "Company Profile Design",
        price: "₦40,000 – ₦120,000",
        features: [
          "Professional company profile",
          "Digital & print formats",
          "Brand-aligned design",
          "Revisions included",
        ],
      },
      {
        name: "Digital Presence Setup",
        price: "₦80,000 – ₦180,000",
        popular: true,
        features: [
          "Google Business Profile",
          "Social media setup",
          "Basic SEO",
          "Directory listings",
        ],
      },
      {
        name: "Launch Support",
        price: "₦150,000 – ₦300,000",
        features: [
          "Launch strategy",
          "Marketing materials",
          "Press kit preparation",
          "Social media campaign",
          "Launch day coordination",
        ],
      },
    ],
  },
  pdaas: {
    title: "Product Development as a Service (PDaaS)",
    icon: Layers,
    description:
      "Full design & development team at your disposal with ongoing support.",
    features: [
      "Full design & development team",
      "Monthly feature updates",
      "Maintenance & support",
      "Project management",
    ],
    note: "Pricing depends on product size and scope — consult with our team",
  },
};

// const getTitles = (): { key: keyof typeof pricingData; title: string }[] => {
//   return Object.entries(pricingData).map(([key, { title }]) => {
//     return {
//       key: key as keyof typeof pricingData,
//       title,
//     };
//   });
// };

export { pricingData as default };
