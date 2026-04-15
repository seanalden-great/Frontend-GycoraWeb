// import React from "react";
import waIcon from "../assets/wa_icon.png"; // <-- Import logo WA dari aset lokal

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
      style={{ backgroundColor: "#25D366" }} // Background lingkaran hijau (bisa dihapus jika PNG-nya sudah bentuk bulat hijau full)
      title="Hubungi Kami via WhatsApp"
      aria-label="Chat WhatsApp"
    >
      {/* Gambar Logo WA */}
      <img 
        src={waIcon} 
        alt="WhatsApp Icon" 
        className="object-contain w-8 h-8 drop-shadow-md" 
      />
      
      {/* Tooltip Hover Effect (Opsional, Pemanis) */}
      <span className="absolute right-16 px-3 py-1.5 text-xs font-bold text-gray-800 transition-opacity duration-300 opacity-0 pointer-events-none bg-white rounded-lg shadow-lg whitespace-nowrap group-hover:opacity-100">
        Butuh bantuan? Chat kami!
      </span>
    </a>
  );
}