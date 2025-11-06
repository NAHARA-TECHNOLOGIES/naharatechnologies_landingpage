import UpcomingProducts from "./Products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Products | Nahara Technologies PLC",
  description:
    "Discover the next generation of innovations from Nahara Technologies. Explore our upcoming products designed to revolutionize businesses with creativity, technology, and impact. Stay tuned for official launches.",
  icons: {
    icon: "/NaharaIcon2.ico",
  },
};

export default function ProductPage() {
  return <UpcomingProducts />;
}
