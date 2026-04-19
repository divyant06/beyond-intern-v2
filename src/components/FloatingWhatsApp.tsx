"use client";

import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const waLink = `https://wa.me/${waNumber}?text=Hey%20BeyondIntern!%20I%20have%20a%20question.`;

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.12, rotate: -5 }}
      whileTap={{ scale: 0.92 }}
      className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg cursor-pointer"
      style={{
        bottom: "5.5rem",   /* Stack above the ChatBot icon which is at bottom-6 (1.5rem) + h-14 (3.5rem) ≈ 5rem, giving 0.5rem gap */
        right: "1.5rem",
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 0 24px 4px rgba(37,211,102,0.35), 0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="h-7 w-7"
      >
        <path d="M16.004 2.003C8.267 2.003 2.003 8.267 2.003 16.004c0 2.476.647 4.898 1.879 7.035L2 30l7.138-1.87A13.94 13.94 0 0 0 16.004 30c7.737 0 13.993-6.264 13.993-14.001C29.997 8.262 23.74 2.003 16.004 2.003zm0 25.603a11.554 11.554 0 0 1-5.888-1.614l-.422-.25-4.372 1.146 1.166-4.26-.277-.44a11.556 11.556 0 0 1-1.773-6.188c0-6.39 5.2-11.59 11.59-11.59 6.39 0 11.59 5.2 11.59 11.59-.005 6.39-5.205 11.606-11.614 11.606zm6.36-8.676c-.35-.174-2.065-1.02-2.386-1.136-.32-.117-.553-.174-.786.175-.233.348-.903 1.136-1.107 1.369-.204.234-.408.263-.758.088-.349-.175-1.473-.543-2.806-1.732-1.037-.925-1.737-2.068-1.94-2.417-.205-.35-.023-.538.153-.712.158-.156.35-.408.524-.612.175-.204.233-.35.35-.582.116-.233.058-.437-.03-.612-.087-.175-.786-1.893-1.077-2.593-.284-.68-.572-.588-.786-.599l-.67-.012a1.283 1.283 0 0 0-.93.437c-.32.35-1.222 1.194-1.222 2.912s1.252 3.376 1.427 3.61c.175.232 2.465 3.763 5.972 5.277.834.36 1.485.575 1.993.737.837.266 1.6.228 2.202.138.672-.1 2.065-.844 2.357-1.66.29-.816.29-1.515.204-1.66-.088-.146-.32-.233-.67-.408z" />
      </svg>

      {/* Glow pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
      />
    </motion.a>
  );
}
