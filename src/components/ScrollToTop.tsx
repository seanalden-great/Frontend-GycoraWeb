import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Setiap kali 'pathname' berubah, scroll layar kembali ke titik 0,0 (paling atas)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Gunakan "smooth" jika ingin efek menggulir perlahan
    });
  }, [pathname]);

  return null; // Komponen ini tidak merender apa pun ke layar (invisible)
}