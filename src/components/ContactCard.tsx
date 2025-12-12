"use client";
import { useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import ContactLink from "./ContactLink";
import LiveChatButton from "./LiveChatButton";
import ChatModal from "./ChatModal";

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

const ContactCard: React.FC = () => {
  const [openChat, setOpenChat] = useState(false);

  const handleOpenChat = () => {
    if ((window as any).Tawk_API) {
      (window as any).Tawk_API.maximize(); // Open Tawk.to chat box
    } else {
      // Fallback to your custom chat modal if Tawk.to isn't available
      setOpenChat(true);
    }
  };

  return (
    <div className="mt-12 px-4 py-6 bg-gray-100 rounded-lg shadow-lg text-center">
      <h3 className="text-h3 font-semibold text-brandRed">
        💻 IT Support Contact
      </h3>
      <p className="text-bodySmall text-gray-700 mt-2">
        Get in touch with our team for advanced technical assistance.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
        <ContactLink
          href="mailto:support@naharatechnologies.com"
          icon={FiMail}
          text="support@naharatechnologies.com"
        />
        <ContactLink
          href="tel:+2349078781812"
          icon={FiPhone}
          text="+234 9078781812"
        />
        <LiveChatButton onClick={() => handleOpenChat()} />
      </div>

      <ChatModal isOpen={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};

export default ContactCard;
