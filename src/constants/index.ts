import SmileImg from "@/assets/smiley-man.jpg";
import helpHeroBg from '@/assets/help-hero-bg.jpg';
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

// lottie animations
import globe from "@/assets/animation-data/globe.json";

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
  helpHeroBg
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

const whatWeWorkText =
  "Because we want your buisness online — pay only 50% upfront, the rest spread flexibly with hosting and maintenance cost included";

const doWeWorkText =
  "Because you're more than just a service provider — you're a partner. At Nahara Technologies, we have the team, the strategy, and the technical expertise to bridge the gap between sound and result.";

const missionText =
  "We empower businesses to thrive through innovative branding, advanced software solutions, and actionable insights.";

const visionText =
  "To drive global success for businesses through strategic branding, innovative software, and marketing expertise.";


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

export {
  images,
  aboutBriefing,
  whatWeDo,
  whatWeWorkText,
  doWeWorkText,
  howWeWorkContent,
  missionText,
  visionText,
  logos,
  lottieAnims,
  faqCategories,
  mockTickets,
};
