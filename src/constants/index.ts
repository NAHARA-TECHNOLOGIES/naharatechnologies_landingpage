import SmileImg from "@/assets/smiley-man.jpg";
import boundary from "@/assets/boundary.png";
import map from "@/assets/map.png";
import mivision from "@/assets/mivision.jpg";
import choose from "@/assets/choose.webp";
import acmeLogo from "@/assets/logo-acme.png";
import quantumLogo from "@/assets/logo-quantum.png";
import echoLogo from "@/assets/logo-echo.png";
import celestiaLogo from "@/assets/logo-celestial.png";
import pulseLogo from "@/assets/logo-pulse.png";
import apexLogo from "@/assets/logo-apex.png";
import logo from "@/assets/NaharaTechnologiesWhite.png";
import whyChooseUS from "@/assets/why-choose-us.png";
import { Palette, Code, PenLine, Megaphone } from "lucide-react";

// images import
import helpHeroBg from "@/assets/help-hero-bg.jpg";
import helpFaqBg from "@/assets/images/help_faq_bg.png";

// icons import
import help_category_icon1 from "@/assets/icons/help_category_icon1.png";
import help_category_icon2 from "@/assets/icons/help_category_icon2.png";
import help_category_icon3 from "@/assets/icons/help_category_icon3.png";
import help_category_icon4 from "@/assets/icons/help_category_icon4.png";
import quick_help_icon1 from "@/assets/icons/quick_help_icon1.png";
import quick_help_icon2 from "@/assets/icons/quick_help_icon2.png";
import quick_help_icon3 from "@/assets/icons/quick_help_icon3.png";
import quick_help_clock_icon from "@/assets/icons/quick_help_clock_icon.png";
import quick_help_response_icon from "@/assets/icons/quick_help_response_icon.png";

// lottie animations
import globe from "@/assets/animation-data/globe.json";

// icons
const icons = {
  help_category_icon1,
  help_category_icon2,
  help_category_icon3,
  help_category_icon4,
  quick_help_icon1,
  quick_help_icon2,
  quick_help_icon3,
  quick_help_response_icon,
  quick_help_clock_icon,
};

// images
const images = {
  SmileImg,
  boundary,
  whyChooseUS,
  choose,
  map,
  mivision,
  acmeLogo,
  quantumLogo,
  echoLogo,
  celestiaLogo,
  pulseLogo,
  apexLogo,
  logo,
  helpHeroBg,
  helpFaqBg,
};

const lottieAnims = {
  globe,
};

const aboutBriefing =
  "Born from a bold desire to elevate every brand to a pinnacle where it is not only seen but sought after. We exist to unlock global potential for individuals and businesses by crafting solutions that command attention and inspire action. Weempower brands across the globe through: Cutting-edge softwaresolutions Impact-driven brand strategies Data-backed marketingexpertise Our mission is simple: to ignite sustainable growth andglobal relevance for the businesses we serve.";

const whatWeDo = [
  {
    id: 1,
    title: "Branding",
    text: "We Craft unforgettable identities that set you apart. Whether you're an individual or a business, we design brands that resonate and endure.",
    icon: Palette,
  },
  {
    id: 2,
    title: "Software Solutions",
    text: "From websites to mobile apps, we build digital experiences tailored to solve real problems, enhance visibility, and drive sales.",
    icon: Code,
  },
  {
    id: 3,
    title: "Content Writing",
    text: "We tell your story with creativity, clarity, and strategy — because words should work for you, not just fill space.",
    icon: PenLine,
  },
  {
    id: 4,
    title: "Marketing",
    text: "We don't just market — we connect. With precise, data-driven strategies, we position yourbrand in front of the audience that truly matters.",
    icon: Megaphone,
  },
];


const missionText =
  "We help businesses thrive by delivering impactful branding, advanced software solutions, and actionable insights that turn ideas into measurable growth.";

const visionText =
  "To empower businesses worldwide to achieve lasting success through strategic branding, innovative software, and results-driven marketing.";

const howWeWorkContent = [
  {
    id: 1,
    imageSetupType: "first",
    title: "We stretch beyound boundary",
    text: "From launching promising startups to scaling thriving enterprises. We combine creative brilliance with technical expertise to bridge the gap between branding and technology, helping businesses stand out and stay relevant.",
    imageWrapAnimProps: {
      initial: { scale: 0, opacity: 0 },
      whileInView: { scale: 1, opacity: [0.5, 1] },
    },
    titleAnimProps: {
      initial: { x: -200, opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
    },
    descAnimProps: {
      initial: { x: -200, opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
      transition: { duration: 1, delay: 0.35 },
    },
  },
  {
    id: 2,
    imageSetupType: "last",
    title: "Everything we do is anchored on our core values (IDECIA)",
    text: "The six pillars of our culture and commitment",
    values: [
      { id: 1, title: "Integrity", desc: "We do what is right always" },
      {
        id: 2,
        title: "Dedication",
        desc: "We pursue excellence with passion and persistence",
      },
      {
        id: 3,
        title: "Excellence",
        desc: "We raise the bar, then go beyound it.",
      },
      {
        id: 4,
        title: "Customer Focus",
        desc: "We value your vision and amplify your voice",
      },
      {
        id: 5,
        title: "Innovation",
        desc: "We embrace change, leveraging technology to lead it.",
      },
      {
        id: 6,
        title: "Accountability",
        desc: "We own outcomes and deliver results you can trust",
      },
    ],
    imageWrapAnimProps: {
      initial: { scale: 0, opacity: 0 },
      whileInView: { scale: 1, opacity: [0.5, 1] },
    },
    titleAnimProps: {
      initial: { x: 200, opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
    },
    descAnimProps: {
      initial: { x: 200, opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
      transition: { duration: 1, delay: 0.35 },
    },
  },
];

const logos = [
  {
    id: 1,
    src: images.acmeLogo,
    title: "Acme",
  },
  {
    id: 2,
    src: images.quantumLogo,
    title: "Quantum",
  },
  {
    id: 3,
    src: images.echoLogo,
    title: "Echo",
  },
  {
    id: 4,
    src: images.celestiaLogo,
    title: "Celestia",
  },
  {
    id: 5,
    src: images.pulseLogo,
    title: "Pulse",
  },
  {
    id: 6,
    src: images.apexLogo,
    title: "Apex",
  },
];

const faqCategories = [
  {
    id: 1,
    title: "General Questions",
    faqs: [
      "How do I create an account?",
      "How can I reset my password?",
      "Where can I access support?",
    ],
  },
  {
    id: 2,
    title: "Billing & Payments",
    faqs: [
      "How do I update payment information?",
      "What happens if my payment fails?",
      "Are refunds available?",
    ],
  },
  {
    id: 3,
    title: "Technical Issues",
    faqs: [
      "Why is my app not working?",
      "How do I report a bug?",
      "Where do I find system requirements?",
    ],
  },
];

const mockTickets: TicketProps[] = [
  {
    id: 1,
    issue: "App crashing on startup",
    priority: "High",
    status: "Open",
    resolutionTime: "24 hours",
  },
  {
    id: 2,
    issue: "Billing error on my account",
    priority: "Medium",
    status: "Pending",
    resolutionTime: "48 hours",
  },
  {
    id: 3,
    issue: "Slow network connectivity",
    priority: "Low",
    status: "Resolved",
    resolutionTime: "N/A",
  },
];

const helpTopics = [
  {
    title: "Account & Billing",
    description: "Manage your account details, invoices and payment plans.",
    link: "View topics",
    icon: icons.help_category_icon1,
  },
  {
    title: "Services & Projects",
    description:
      "Everything about starting, tracking, and managing your projects.",
    link: "View topics",
    icon: icons.help_category_icon2,
  },
  {
    title: "Technical Support",
    description:
      "Troubleshooting, bug fixes, and performance tips for your products.",
    link: "View topics",
    icon: icons.help_category_icon3,
  },
  {
    title: "General Questions",
    description:
      "Learn more about Nahara Technologies, policies, and timelines.",
    link: "View topics",
    icon: icons.help_category_icon4,
  },
];

const supportOptions = [
  {
    icon: icons.quick_help_icon1,
    title: "Email Support",
    description: "Get detailed help via email",
    responseTime: "24 hours",
    availability: "24/7",
    btnText: "Send Email",
  },
  {
    icon: icons.quick_help_icon2,
    title: "Live Chat",
    description: "Chat with our support team",
    responseTime: "Immediate",
    availability: "9 a.m. - 6 p.m. WAT",
    btnText: "Start Chat",
  },
  {
    icon: icons.quick_help_icon3,
    title: "Phone Support",
    description: "Speak directly with our experts",
    responseTime: "Immediate",
    availability: "9 a.m. - 6 p.m. WAT",
    btnText: "Call Now",
  },
];

const faqs = [
  {
    question: "What Does Nahara Technologies Do?",
    answer:
      "Nahara Technologies helps businesses turn ideas into real, functional, beautifully built products. From branding to software development, digital marketing, and strategic consulting, we guide founders and companies through every stage of bringing their vision to life.",
    isShowing: true,
  },
  {
    question: "What Services Does Nahara Technologies Provide?",
    answer:
      "We offer a full suite of services including branding & creative design, digital marketing, consulting & strategy, software development, cloud & infrastructure, hosting & domain services, business support, and product development as a service (PDaaS).",
    isShowing: true,
  },
  {
    question: "Do You Provide After-Launch Support?",
    answer:
      "Yes! We don’t just build products,we ensure they keep performing. Our support team handles updates, optimizations, and troubleshooting to keep your digital solutions effective long after launch.",
    isShowing: false,
  },
  {
    question: "How Do I Track My Projects?",
    answer:
      "We keep you informed every step of the way. For each milestone, we share clear visual reports and hold regular update meetings so you always know where your project stands. Our team is there to answer questions, gather feedback, and make sure your vision stays on track.",
    isShowing: false,
  },

  {
    question: " Can Nahara Handle My Project End-to-End While I Focus on Other Priorities?",
    answer:
      "Absolutely. We manage everything, from ideation to development to maintenance. We listen, guide, and handle the technical and creative work so you can focus on running your business with confidence.",
    isShowing: false,
  },
  {
    question: "How Does the Build Now, Pay Later Plan Work?",
    answer:
      "With our Build Now, Pay Later plan, you only pay 50% upfront. The remaining balance is spread flexibly along with hosting and maintenance costs, helping you launch without financial pressure.",
    isShowing: false,
  },

  {
    question: "Where Can I Find System Requirements?",
    answer:
      "System requirements are included in your project documentation or on the product download page. We also give recommendations to ensure the best performance on your devices.",
    isShowing: false,
  },
  {
    question: "How Do I Get Help With My Account or Project?",
    answer:
      "You can reach our support team at support@naharatechnologies.com. We respond quickly to keep your experience smooth and worry-free.",
    isShowing: false,
  }
];

export {
  icons,
  images,
  aboutBriefing,
  whatWeDo,
  howWeWorkContent,
  missionText,
  visionText,
  logos,
  lottieAnims,
  faqCategories,
  mockTickets,
  helpTopics,
  supportOptions,
  faqs,
};
