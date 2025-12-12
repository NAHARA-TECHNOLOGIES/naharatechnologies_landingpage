

import Career from "./Career";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Nahara Technologies PLC",
  description:
    "Explore exciting career opportunities at Nahara Technologies PLC. Join our innovative team and help shape the future of technology. Discover open positions and grow with us.",
  icons: {
    icon: "/NaharaIcon2.ico",
  },
};


export default function CareerPage(){
  return <Career/>
}