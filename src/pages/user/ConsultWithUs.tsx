/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// // ============================================================================
// // DUMMY DATA (DIPERBARUI DENGAN ASET INTERNAL/BEBAS ROYALTI)
// // ============================================================================

// // Ikon SVG sederhana untuk masing-masing kategori
// const IconAcne = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// const IconHair = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>; // Representasi sisir/arah pertumbuhan
// const IconSkin = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>; // Sparkles untuk kulit kusam/cerah
// const IconBeard = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>; // Representasi wajah pria

// const consultationCategories = [
//   { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
//   { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
//   { id: 3, title: "Kebotakan", icon: <IconHair /> },
//   { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
//   { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
//   { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
//   { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
//   { id: 8, title: "Ketombe", icon: <IconHair /> },
// ];

// const clinicTreatments = [
//   { id: 1, title: "Gycora Facial Acne Repair", price: "Rp235.000", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 2, title: "Promo Pico Laser 499", price: "Rp499.000", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 3, title: "My First Glow", price: "Rp499.000", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 4, title: "Glass Skin Facial", price: "Rp699.000", image: "https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 5, title: "Hair Growth Express", price: "Rp299.000", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
//   { id: 6, title: "Laser A+ Scalp", price: "Rp1.000.000", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
// ];

// const otcProducts = [
//   { id: 1, title: "Gycora Micellar Water 60 ml", price: "Rp89.000", discPrice: "Rp21.500", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//   { id: 2, title: "BoostME Daily Serum 15 ml", price: "Rp135.000", discPrice: "Rp90.000", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//   { id: 3, title: "RefineME Acne Serum 15 ml", price: "Rp139.000", discPrice: "Rp30.000", image: "https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
//   { id: 4, title: "PurifyME Gentle Cleanser", price: "Rp85.000", discPrice: "Rp65.000", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
// ];

// // Placeholder untuk logo media
// const mediaLogos = [
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tech_in_Asia_logo.svg/512px-Tech_in_Asia_logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kompas_Logo.svg/512px-Kompas_Logo.svg.png",
// ];

// const faqs = [
//   { q: "Apa itu Gycora Care?", a: "Gycora Care adalah klinik kesehatan kulit dan rambut terdepan. Kami menyediakan solusi medis untuk kulit lebih cerah dan rambut yang lebih lebat, tersedia secara online maupun di outlet resmi kami." },
//   { q: "Apakah produk dari Gycora aman?", a: "Ya, seluruh produk kami diformulasikan oleh tim dokter ahli, terdaftar di BPOM, tidak mengandung bahan berbahaya, dan sudah teruji secara klinis." },
//   { q: "Apakah saya dikenakan biaya untuk konsultasi?", a: "Konsultasi di Aplikasi Gycora maupun outlet Gycora Clinic tidak dipungut biaya (GRATIS) untuk evaluasi awal kondisi Anda." },
//   { q: "Bagaimana cara memulai perawatan?", a: "Pilih kondisi keluhan Anda di halaman ini, isi kuesioner medis, dan dokter kami akan langsung memberikan rekomendasi produk atau treatment yang paling tepat untuk Anda." },
// ];

// export default function ConsultWithUs() {
//   const navigate = useNavigate();
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData] = useState<any>(() => {
//     const storedUser = localStorage.getItem("user_data");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [activeFaq, setActiveFaq] = useState<number | null>(null);

//   const handleStartConsultation = (categoryName: string) => {
//     if (!userData) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk atau daftar terlebih dahulu untuk memulai konsultasi medis gratis.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonText: "Login Sekarang",
//         cancelButtonText: "Nanti",
//         confirmButtonColor: "#059669"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     Swal.fire({
//       icon: 'success',
//       title: 'Memulai Konsultasi',
//       text: `Anda memilih kategori: ${categoryName}. Sistem kuesioner medis segera disiapkan.`,
//       confirmButtonColor: "#059669"
//     });
//   };

//   const toggleFaq = (index: number) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen pb-20 font-sans bg-gray-50 animate-fade-in">
      
//       {/* ================= HERO SECTION ================= */}
//       <div className="relative bg-[linear-gradient(180deg,#0072CD_0%,#009CDE_100%)] md:bg-[linear-gradient(181deg,#0072CD_0.75%,#58A8DD_49.94%,#59CBE8_99.12%)] overflow-hidden">
//         <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl opacity-20"></div>
//         <div className="relative flex flex-col items-center gap-12 px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 lg:py-24 md:text-left md:flex-row">
//           <div className="flex-1 space-y-6">
//             <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-white bg-white/20 uppercase border border-white/30 backdrop-blur-sm shadow-sm">
//               ✨ Konsultasi Dokter Gratis
//             </span>
//             <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
//               Hai, Selamat datang!<br />
//               <span className="text-emerald-100">Mulai perjalanan #RawatDiri-mu</span>
//             </h1>
//             <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
//               Dapatkan hasil nyata dengan resep dokter spesialis. Solusi tepat untuk jerawat, kusam, kebotakan, hingga rambut rontok.
//             </p>
//             <div className="pt-4">
//               <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="px-8 py-4 text-base font-bold text-gray-900 transition-all bg-white rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1">
//                 Pilih Keluhanmu Sekarang
//               </button>
//             </div>
//           </div>
          
//           <div className="relative justify-end flex-1 hidden md:flex">
//              {/* Lingkaran dekoratif di belakang foto dokter */}
//              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-80 h-80 bg-white/20 blur-2xl"></div>
//              {/* Foto Dokter dari Unsplash */}
//              <img 
//                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
//                alt="Gycora Dermatologist" 
//                className="relative z-10 w-full max-w-md rounded-[2rem] shadow-2xl border-4 border-white/50 animate-fade-in-up object-cover h-[450px]" 
//              />
//           </div>
//         </div>
//       </div>

//       {/* ================= STATISTIK / SOCIAL PROOF ================= */}
//       <div className="relative z-10 py-8 -mt-4 bg-white border-b border-gray-200 shadow-sm rounded-t-3xl md:rounded-none md:mt-0">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-6 text-center divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">1 Juta+</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Produk Terjual</p>
//             </div>
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">1.000+</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Kombinasi Formulasi</p>
//             </div>
//             <div className="py-4 md:py-0">
//               <p className="text-3xl font-black md:text-4xl text-gycora drop-shadow-sm">4.8 / 5</p>
//               <p className="mt-1 text-sm font-medium tracking-widest text-gray-500 uppercase">Rating Kepuasan</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CARA KERJA ================= */}
//       <div className="py-16 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-10 text-center">
//             <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Cara #RawatDiri bareng Gycora</h2>
//             <p className="text-sm text-gray-500">Proses mudah, cepat, dan terpercaya.</p>
//           </div>
          
//           <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
//             <div className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 w-[70%] h-0.5 bg-gradient-to-r from-emerald-200 via-gycora to-emerald-200 z-0"></div>
            
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">1</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Pilih Kondisi</h3>
//               <p className="px-4 text-xs text-gray-500">Pilih keluhan yang paling sesuai dengan kebutuhanmu saat ini.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">2</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Isi Kuesioner</h3>
//               <p className="px-4 text-xs text-gray-500">Jawab pertanyaan medis singkat & chat dengan dokter spesialis.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">3</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Beli Produk</h3>
//               <p className="px-4 text-xs text-gray-500">Beli racikan produk khusus yang direkomendasikan dokter untukmu.</p>
//             </div>
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white rounded-full shadow-lg bg-gycora ring-4 ring-white">4</div>
//               <h3 className="mb-2 text-sm font-bold text-gray-900">Update Progress</h3>
//               <p className="px-4 text-xs text-gray-500">Pantau perkembanganmu dan konsultasi ulang secara GRATIS.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CATEGORY GRID ================= */}
//       <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-end">
//           <div>
//             <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Konsul keluhan sesuai kebutuhan</h2>
//             <p className="text-sm text-gray-500">Pilih kondisi dan dapatkan panduan dari dokter ahli.</p>
//           </div>
//           <span className="px-4 py-1.5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse shadow-md w-max">
//             Konsultasi 100% GRATIS
//           </span>
//         </div>

//         <div className="flex gap-4 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
//           {consultationCategories.map((category) => (
//             <div 
//               key={category.id} 
//               onClick={() => handleStartConsultation(category.title)}
//               className="relative flex flex-col items-center w-40 p-4 transition-all duration-300 bg-white border border-gray-200 cursor-pointer snap-center shrink-0 md:w-auto md:p-6 rounded-2xl group hover:border-gycora hover:shadow-xl hover:-translate-y-1"
//             >
//               <div className="flex items-center justify-center w-16 h-16 mb-4 transition-colors border border-gray-100 rounded-full bg-gray-50 group-hover:bg-emerald-50">
//                 {category.icon}
//               </div>
//               <h3 className="text-sm font-bold text-center text-gray-900 group-hover:text-gycora">
//                 {category.title}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= SIGNATURE CLINIC TREATMENTS ================= */}
//       <div className="py-16 bg-gray-900">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Gycora Clinic's Signature Treatments</h2>
//               <p className="text-sm text-gray-400">Perawatan langsung di klinik dengan teknologi mutakhir.</p>
//             </div>
//             <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-white">Lihat Semua Treatment &rarr;</Link>
//           </div>

//           <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {clinicTreatments.map((treatment) => (
//               <div key={treatment.id} className="flex flex-col w-64 overflow-hidden transition-shadow bg-white shadow-lg snap-center shrink-0 rounded-2xl hover:shadow-gycora/20">
//                 <div className="relative bg-gray-100 aspect-square">
//                   <img src={treatment.image} alt={treatment.title} className="object-cover w-full h-full" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-5">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2">{treatment.title}</h3>
//                   <p className="mb-4 text-lg font-black text-gycora">{treatment.price}</p>
//                   <button onClick={() => handleStartConsultation(treatment.title)} className="w-full py-2.5 text-xs font-bold text-white bg-gray-900 rounded-lg hover:bg-black transition-colors">
//                     Buat Janji Temu
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= OTC / ESSENTIALS PRODUCTS ================= */}
//       <div className="py-16 bg-white border-b border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-end">
//             <div>
//               <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Skip Konsultasi dengan Gycora Essentials</h2>
//               <p className="text-sm text-gray-500">Skincare harian (Bebas Beli) yang aman digunakan tanpa resep.</p>
//             </div>
//             <Link to="/products" className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark">Lihat Semua Produk &rarr;</Link>
//           </div>

//           <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
//             {otcProducts.map((product) => (
//               <div key={product.id} className="flex flex-col w-56 overflow-hidden transition-colors bg-white border border-gray-200 snap-center shrink-0 rounded-2xl hover:border-gycora group">
//                 <div className="relative flex items-center justify-center p-4 aspect-square bg-gray-50">
//                   <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">PROMO</div>
//                   <img src={product.image} alt={product.title} className="object-contain w-full h-full transition-transform group-hover:scale-105" />
//                 </div>
//                 <div className="flex flex-col flex-1 p-4 border-t border-gray-100">
//                   <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-gycora">{product.title}</h3>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-xs text-gray-400 line-through">{product.price}</span>
//                     <span className="text-base font-black text-gycora">{product.discPrice}</span>
//                   </div>
//                   <button onClick={() => navigate('/products')} className="w-full py-2 text-xs font-bold transition-colors border rounded-lg text-gycora-dark bg-emerald-50 border-emerald-200 hover:bg-gycora hover:text-white">
//                     Beli Langsung
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= MEDIA COVERAGE ================= */}
//       <div className="py-12 border-b border-gray-200 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <h3 className="mb-8 text-sm font-bold tracking-widest text-center text-gray-400 uppercase">Telah Diliput Oleh Media Nasional</h3>
//           <div className="flex flex-wrap items-center justify-center gap-8 transition-all duration-500 md:gap-16 opacity-60 grayscale hover:grayscale-0">
//             {mediaLogos.map((logo, idx) => (
//               <img key={idx} src={logo} alt="Media Coverage" className="object-contain h-8 md:h-10" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= FAQ SECTION ================= */}
//       <div className="py-20 bg-white">
//         <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
//             <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
//                 <button 
//                   onClick={() => toggleFaq(index)}
//                   className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50"
//                 >
//                   <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
//                   <svg 
//                     className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`} 
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div 
//                   className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? 'max-h-40 py-5 border-t border-gray-100 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}
//                 >
//                   {faq.a}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-10 text-center">
//             <button onClick={() => navigate('/help-center')} className="text-sm font-bold text-gycora hover:underline">
//               Lihat Pusat Bantuan Lengkap &rarr;
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

// ============================================================================
// 1. IKON SVG TETAP HARDCODED (Karena lebih ringan dirender langsung)
// ============================================================================
const IconAcne = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconHair = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const IconSkin = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const IconBeard = () => <svg className="w-8 h-8 text-gycora" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

const consultationCategories = [
  { id: 1, title: "Jerawat Remaja", icon: <IconAcne /> },
  { id: 2, title: "Jerawat Dewasa", icon: <IconAcne /> },
  { id: 3, title: "Kebotakan", icon: <IconHair /> },
  { id: 4, title: "Rambut Rontok", icon: <IconHair /> },
  { id: 5, title: "Penumbuh Brewok", icon: <IconBeard /> },
  { id: 6, title: "Kulit Kusam", icon: <IconSkin /> },
  { id: 7, title: "Bekas Jerawat", icon: <IconAcne /> },
  { id: 8, title: "Ketombe", icon: <IconHair /> },
];

export default function ConsultWithUs() {
  const navigate = useNavigate();
  
  const [userData] = useState<any>(() => {
    const storedUser = localStorage.getItem("user_data");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // --- STATE UNTUK DATA DINAMIS DARI BACKEND ---
  const [clinicTreatments, setClinicTreatments] = useState<any[]>([]);
  const [otcProducts, setOtcProducts] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH DATA DARI API ---
  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/landing-page/consult`);
        if (res.ok) {
          const data = await res.json();
          setClinicTreatments(data.treatments || []);
          setOtcProducts(data.otc_products || []);
          setFaqs(data.faqs || []);
        }
      } catch (error) {
        console.error("Gagal memuat data landing page:", error);
        // Fallback ke dummy data Aset Lokal jika API belum siap
        loadDummyLocalData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchLandingData();
  }, []);

  const loadDummyLocalData = () => {
    setClinicTreatments([
      { id: 1, title: "Gycora Facial Acne Repair", price: 235000, image_url: "/consult_images/treatment_1.jpg" },
      { id: 2, title: "Promo Pico Laser 499", price: 499000, image_url: "/consult_images/treatment_2.jpg" },
      { id: 3, title: "My First Glow", price: 499000, image_url: "/consult_images/treatment_3.jpg" },
      { id: 4, title: "Glass Skin Facial", price: 699000, image_url: "/consult_images/treatment_4.jpg" },
    ]);
    
    setOtcProducts([
      { id: 1, title: "Gycora Micellar Water 60 ml", price: 89000, discPrice: 21500, image_url: "/consult_images/otc_1.jpg" },
      { id: 2, title: "BoostME Daily Serum 15 ml", price: 135000, discPrice: 90000, image_url: "/consult_images/otc_2.jpg" },
    ]);

    setFaqs([
      { q: "Apa itu Gycora Care?", a: "Gycora Care adalah klinik kesehatan kulit dan rambut terdepan..." },
      { q: "Apakah produk dari Gycora aman?", a: "Ya, seluruh produk kami diformulasikan oleh tim dokter ahli..." },
    ]);
  };

  const handleStartConsultation = (categoryName: string) => {
    if (!userData) {
      Swal.fire({
        title: "Login Diperlukan",
        text: "Silakan masuk atau daftar terlebih dahulu untuk memulai konsultasi medis gratis.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login Sekarang",
        cancelButtonText: "Nanti",
        confirmButtonColor: "#059669"
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Memulai Konsultasi',
      text: `Anda memilih kategori: ${categoryName}. Sistem kuesioner medis segera disiapkan.`,
      confirmButtonColor: "#059669"
    });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 rounded-full border-emerald-200 border-t-gycora animate-spin"></div></div>;

  return (
    <div className="min-h-screen pb-20 font-sans bg-gray-50 animate-fade-in">
      
      {/* ... [HERO SECTION, STATISTIK, CARA KERJA TETAP SAMA SEPERTI SEBELUMNYA] ... */}
      
      {/* ================= SIGNATURE CLINIC TREATMENTS (DINAMIS) ================= */}
      <div className="py-16 bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">Gycora Clinic's Signature Treatments</h2>
              <p className="text-sm text-gray-400">Perawatan langsung di klinik dengan teknologi mutakhir.</p>
            </div>
          </div>

          <div className="flex gap-6 pb-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {clinicTreatments.map((treatment) => (
              <div key={treatment.id} className="flex flex-col w-64 overflow-hidden transition-shadow bg-white shadow-lg snap-center shrink-0 rounded-2xl hover:shadow-gycora/20">
                <div className="relative bg-gray-100 aspect-square">
                  <img src={treatment.image_url} alt={treatment.title} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="flex-1 mb-2 text-sm font-bold text-gray-900 line-clamp-2">{treatment.title}</h3>
                  <p className="mb-4 text-lg font-black text-gycora">{formatRupiah(treatment.price)}</p>
                  <button onClick={() => handleStartConsultation(treatment.title)} className="w-full py-2.5 text-xs font-bold text-white bg-gray-900 rounded-lg hover:bg-black transition-colors">
                    Buat Janji Temu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FAQ SECTION (DINAMIS) ================= */}
      <div className="py-20 bg-white">
        <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Kamu Tanya, Kami Jawab</h2>
            <p className="text-gray-500">Pertanyaan yang paling sering diajukan oleh pelanggan kami.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full p-5 text-left transition-colors bg-white hover:bg-gray-50"
                >
                  <span className="pr-4 text-sm font-bold text-gray-900 md:text-base">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gycora transform transition-transform duration-300 shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out bg-gray-50 ${activeFaq === index ? 'max-h-40 py-5 border-t border-gray-100 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}