// import React from "react";

export default function WhatsAppButton() {
  // Ganti dengan pesan default yang ingin Anda terima dari pelanggan
  const defaultMessage = encodeURIComponent("Halo Gycora, saya butuh bantuan.");
  
  // Format nomor: hilangkan angka '0' di depan dan ganti dengan kode negara '62'
  const waNumber = "6289517999768"; 
  const waLink = `https://wa.me/${waNumber}?text=${defaultMessage}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center transition-transform duration-300 rounded-full shadow-2xl w-14 h-14 bottom-6 right-6 hover:scale-110 group animate-fade-in-up"
      style={{ backgroundColor: "#25D366" }} // Warna hijau resmi WhatsApp
      title="Hubungi Kami via WhatsApp"
      aria-label="Chat WhatsApp"
    >
      {/* Ikon WhatsApp SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-8 h-8 drop-shadow-md"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.004 1.298.38 2.27 1.052 3.287l-.724 2.65 2.827-.707c.932.53 1.966.814 3.011.814 3.182 0 5.77-2.585 5.77-5.766 0-3.181-2.588-5.766-5.768-5.766zm3.352 8.021c-.164.466-.968.906-1.336.94-.311.028-.716.126-2.432-.622-2.127-.922-3.485-3.13-3.585-3.272-.1-.139-.853-1.151-.853-2.193 0-1.042.531-1.554.716-1.748.185-.195.4-.244.53-.244h.359c.148 0 .307-.058.455.334l.698 1.716c.04.103.076.242.015.39-.06.146-.09.239-.18.336l-.358.38c-.09.098-.184.195-.084.364.1.168.442.748.956 1.206.66.592 1.218.775 1.385.865.168.09.266.076.365-.04l.417-.507c.108-.135.215-.11.359-.057l2.259 1.077c.143.069.238.103.272.16.035.056.035.321-.129.787z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.252.628 4.356 1.722 6.148L.369 23.63l5.63-1.465A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.031 19.393c-1.636 0-3.183-.438-4.561-1.258l-.326-.193-2.115.551.564-2.023-.213-.342c-.895-1.434-1.368-3.08-1.368-4.789 0-4.992 4.06-9.053 9.055-9.053 4.993 0 9.052 4.061 9.052 9.053 0 4.991-4.059 9.054-9.052 9.054z" />
      </svg>
      
      {/* Tooltip Hover Effect (Opsional, Pemanis) */}
      <span className="absolute right-16 px-3 py-1.5 text-xs font-bold text-gray-800 transition-opacity duration-300 opacity-0 pointer-events-none bg-white rounded-lg shadow-lg whitespace-nowrap group-hover:opacity-100">
        Butuh bantuan? Chat kami!
      </span>
    </a>
  );
}