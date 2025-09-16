import { useEffect, useState } from "react";

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}


const useLiveChat = () => {
  const [openChat, setOpenChat] = useState(false);
  useEffect(() => {
    // Load the Tawk.to script
    var Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/68a11ac79a68c0192a7e29fe/1j2ql17mi"; // your ID
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode?.insertBefore(s1, s0);
    })();

    // hide default widget when loaded
    window.Tawk_API = {
      onLoad: function () {
        window.Tawk_API.hideWidget();
      },
    };
  }, []);

  const handleOpenChat = () => {
    if ((window as any).Tawk_API) {
      (window as any).Tawk_API.maximize(); // Open Tawk.to chat box
    } else {
      // Fallback to your custom chat modal if Tawk.to isn't available
      setOpenChat(true);
    }
  };

  return {openChat, handleOpenChat, setOpenChat}
};

export default useLiveChat;
