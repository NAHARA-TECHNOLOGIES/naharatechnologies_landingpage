"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FAQCategory from "@/components/FAQCategory";
import TicketList, { TicketProps } from "@/components/TicketList";
import ContactCard from "@/components/ContactCard";
import SearchBar from "@/components/SearchBar";
import { FiArrowLeft } from "react-icons/fi";
import { faqCategories, mockTickets } from "@/constants";
import { HelpCategories, HelpFAQ, HelpHero, QuickHelp } from "@/sections/help-section";



export default function HelpClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketSearch, setTicketSearch] = useState("");
  const router = useRouter();
  
  return (
    <section className="mx-auto">
      <HelpHero />
      <HelpCategories />
      <HelpFAQ />
      <QuickHelp />
      {/* <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8">
        Need Help?
      </h2>
      <SearchBar
        placeholder="Search for help topics..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqCategories.map((category) => (
          <FAQCategory key={category.id} {...category} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTickets
          .filter((ticket) =>
            ticket.issue.toLowerCase().includes(ticketSearch.toLowerCase())
          )
          .map((ticket) => (
            <TicketList key={ticket.id} {...ticket} />
          ))}
      </div> */}
      {/* <ContactCard /> */}
      {/* <div className="text-center mt-8">
        <button
          className="bg-gray-800 text-white px-6 py-3 hover:bg-gray-900 flex items-center gap-2 mx-auto"
          onClick={() => router.push("/")}
        >
          <FiArrowLeft /> Go Back
        </button>
      </div> */}
    </section>
  );
}
