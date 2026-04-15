// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setUserData(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <div className="font-sans bg-white">
      
//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         {/* Dekorasi Background Blur */}
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif dan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 {/* Gambar Hero Placeholder - Ganti dengan URL gambar produk asli Anda nanti */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
//                 <img 
//                   src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//                   alt="Gycora Premium Hair Care" 
//                   className="object-cover w-full shadow-2xl h-[500px] rounded-[3rem]"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-20 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Static-Free Technology</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Premium Ingredients</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. FEATURED PRODUCTS (PRODUK UNGGULAN)
//       ========================================= */}
//       {/* <div className="py-24 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//             <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
//               <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                 <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Ethereal Glow Brush" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
//                 <div className="absolute px-3 py-1 text-xs font-bold text-gray-900 rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">Best Seller</div>
//               </div>
//               <div className="p-6">
//                 <h3 className="mb-1 text-lg font-bold text-gray-900">Ethereal Glow Brush</h3>
//                 <p className="mb-4 text-sm text-gray-500 line-clamp-2">Sisir berteknologi anti-statis dengan molekul karbon untuk rambut halus bebas kusut.</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-extrabold text-gycora">Rp 250.000</span>
//                   <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
//               <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                 <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Revitalizing Shampoo" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
//               </div>
//               <div className="p-6">
//                 <h3 className="mb-1 text-lg font-bold text-gray-900">Revitalizing Shampoo</h3>
//                 <p className="mb-4 text-sm text-gray-500 line-clamp-2">Membersihkan kulit kepala secara mendalam sambil menjaga kelembapan alami rambut.</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-extrabold text-gycora">Rp 185.000</span>
//                   <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="hidden overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer lg:block group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
//               <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                 <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Argan Hair Serum" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
//                 <div className="absolute px-3 py-1 text-xs font-bold text-pink-700 rounded-full shadow-sm top-4 left-4 bg-pink-100/90 backdrop-blur-sm">New Arrival</div>
//               </div>
//               <div className="p-6">
//                 <h3 className="mb-1 text-lg font-bold text-gray-900">Argan Hair Serum</h3>
//                 <p className="mb-4 text-sm text-gray-500 line-clamp-2">Serum kaya nutrisi untuk mengunci kilau dan memperbaiki ujung rambut yang bercabang.</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-extrabold text-gycora">Rp 210.000</span>
//                   <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div> */}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         {/* </div> */}
//       {/* </div>  */}

//       {/* =========================================
//           4. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData && (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; // Pastikan path ini benar

// // --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER ---
// // Silakan sesuaikan nama dan ekstensi file dengan yang ada di folder assets Anda
// import slide1 from "../assets/hero_slide_1.jpg";
// import slide2 from "../assets/hero_slide_2.jpg";
// import slide3 from "../assets/hero_slide_3.jpg";

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
  
//   // State untuk Carousel
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // State untuk Featured Products (Mengambil data asli dari API)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mengambil Produk Bestseller/Featured dari API (Data Real)
//     const fetchFeaturedProducts = async () => {
//       try {
//         // Asumsi endpoint untuk mengambil semua produk aktif
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           // Ambil 3 produk teratas saja untuk ditampilkan di halaman depan
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // Efek Autoplay untuk Slider
//   useEffect(() => {
//     // Jika user sudah login, slider tidak tampil, jadi tidak perlu jalankan interval
//     if (userData) return; 

//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); // Ganti gambar setiap 4 detik

//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <div className="font-sans bg-white">
      
//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         {/* Dekorasi Background Blur */}
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             // TAMPILAN JIKA USER SUDAH LOGIN
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif dan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // TAMPILAN JIKA GUEST (BELUM LOGIN)
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               {/* IMAGE CAROUSEL AREA */}
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 {/* Latar belakang dekoratif */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 {/* Wadah Gambar Slider */}
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   {/* Tombol Navigasi Manual Slider (Muncul saat hover) */}
//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button 
//                       onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)}
//                       className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button 
//                       onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)}
//                       className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   {/* Indikator Titik (Dots) di bawah gambar */}
//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button 
//                         key={index} 
//                         onClick={() => setCurrentSlide(index)}
//                         className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`}
//                         aria-label={`Slide ${index + 1}`}
//                       ></button>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-20 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           4. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData && (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; // Pastikan path ini benar

// // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
  
//   // State untuk Carousel
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // State untuk Featured Products (Mengambil data asli dari API)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mengambil Produk Bestseller/Featured dari API (Data Real)
//     const fetchFeaturedProducts = async () => {
//       try {
//         // Asumsi endpoint untuk mengambil semua produk aktif
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           // Ambil 3 produk teratas saja untuk ditampilkan di halaman depan
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // Efek Autoplay untuk Slider
//   useEffect(() => {
//     // Jika user sudah login, slider tidak tampil, jadi tidak perlu jalankan interval
//     if (userData) return; 

//     const slideInterval = setInterval(() => {
//       // Logika otomatis menyesuaikan jumlah gambar di array heroSlides
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); // Ganti gambar setiap 4 detik

//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <div className="font-sans bg-white">
      
//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         {/* Dekorasi Background Blur */}
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             // TAMPILAN JIKA USER SUDAH LOGIN
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif dan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // TAMPILAN JIKA GUEST (BELUM LOGIN)
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               {/* IMAGE CAROUSEL AREA */}
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 {/* Latar belakang dekoratif */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 {/* Wadah Gambar Slider */}
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   {/* Tombol Navigasi Manual Slider (Muncul saat hover) */}
//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button 
//                       onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)}
//                       className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button 
//                       onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)}
//                       className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   {/* Indikator Titik (Dots) di bawah gambar */}
//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button 
//                         key={index} 
//                         onClick={() => setCurrentSlide(index)}
//                         className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`}
//                         aria-label={`Slide ${index + 1}`}
//                       ></button>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-20 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-gray-50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           4. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData && (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 

// // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// // --- DATA DUMMY TESTIMONI ---
// const testimonials = [
//   {
//     id: 1,
//     name: "Amanda S.",
//     role: "Verified Buyer",
//     text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!",
//     rating: 5
//   },
//   {
//     id: 2,
//     name: "Rina Kartika",
//     role: "Gycora Member",
//     text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.",
//     rating: 5
//   },
//   {
//     id: 3,
//     name: "Jessica W.",
//     role: "Verified Buyer",
//     text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!",
//     rating: 4
//   }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
  
//   // State untuk Carousel
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // State untuk Featured Products (Mengambil data asli dari API)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     }

//     // Mengambil Produk Bestseller/Featured dari API (Data Real)
//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // Efek Autoplay untuk Slider
//   useEffect(() => {
//     if (userData) return; 

//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 

//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   return (
//     <div className="font-sans bg-white">
      
//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             // TAMPILAN JIKA USER SUDAH LOGIN
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // TAMPILAN JIKA GUEST (BELUM LOGIN)
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               {/* IMAGE CAROUSEL AREA */}
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CATEGORY (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
//             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             {/* Category 1 */}
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
//               </div>
//             </Link>
            
//             {/* Category 2 */}
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
//               </div>
//             </Link>

//             {/* Category 3 */}
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../config/api"; 
// import Swal from "sweetalert2"; // Pastikan Swal di-import untuk notifikasi langganan

// // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
// import slide1 from "/landing_page_images/hero_slide_1.jpg";
// import slide2 from "/landing_page_images/hero_slide_2.jpg";
// import slide3 from "/landing_page_images/hero_slide_3.jpg";
// import slide4 from "/landing_page_images/hero_slide_4.jpg";
// import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

// const heroSlides = [
//   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
//   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
//   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
//   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
//   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
// ];

// const testimonials = [
//   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
//   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
//   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [userData, setUserData] = useState<any>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

//   // --- STATE UNTUK POP-UP PROMO ---
//   const [showPromoModal, setShowPromoModal] = useState(false);
//   const [promoEmail, setPromoEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user_data");
//     if (storedUser) {
//       setUserData(JSON.parse(storedUser));
//     } else {
//       // Tampilkan Promo Modal hanya untuk Guest yang belum pernah melihatnya di sesi ini
//       const hasSeenPromo = sessionStorage.getItem("hasSeenPromo");
//       if (!hasSeenPromo) {
//         // Delay sedikit agar lebih natural setelah halaman dimuat
//         const timer = setTimeout(() => {
//           setShowPromoModal(true);
//         }, 1500);
//         return () => clearTimeout(timer);
//       }
//     }

//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (res.ok) {
//           const data = await res.json();
//           const productsArray = data.data ? data.data : data;
//           setFeaturedProducts(productsArray.slice(0, 3) || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat produk unggulan:", error);
//       } finally {
//         setIsLoadingProducts(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   useEffect(() => {
//     if (userData) return; 
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(slideInterval);
//   }, [userData]);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
//   };

//   // --- HANDLER TUTUP PROMO & SUBMIT ---
//   const closePromoModal = () => {
//     setShowPromoModal(false);
//     sessionStorage.setItem("hasSeenPromo", "true"); // Tandai agar tidak muncul lagi di tab ini
//   };

//   const handleSubscribePromo = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!promoEmail) return;
    
//     setIsSubscribing(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/subscribe`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Accept": "application/json" },
//         body: JSON.stringify({ email: promoEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         closePromoModal();
//         Swal.fire({
//           icon: "success",
//           title: "Berhasil!",
//           text: "Cek email Anda untuk kode voucher 50% Gycora.",
//           confirmButtonColor: "#059669",
//         });
//       } else {
//         Swal.fire({ icon: "warning", title: "Pemberitahuan", text: data.message || "Gagal berlangganan.", confirmButtonColor: "#d33" });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({ icon: "error", title: "Gagal", text: "Terjadi kesalahan server.", confirmButtonColor: "#d33" });
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <div className="relative font-sans bg-white">
      
//       {/* =========================================
//           POP-UP PROMO MODAL (GUEST ONLY)
//       ========================================= */}
//       {showPromoModal && !userData && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
//           <div className="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl">
            
//             {/* Tombol Close */}
//             <button 
//               onClick={closePromoModal}
//               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//             </button>

//             {/* Bagian Kiri: Teks & Form */}
//             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
//               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
//               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
//                 Dapatkan Diskon 50% + Produk Spesial
//               </h3>
//               <p className="mb-8 text-sm font-medium text-gray-500">
//                 Daftarkan Email & SMS untuk mendapatkan penawaran eksklusif, tips kecantikan, dan banyak lagi dari kami!
//               </p>
              
//               <form onSubmit={handleSubscribePromo} className="space-y-4">
//                 <input 
//                   type="email" 
//                   value={promoEmail}
//                   onChange={(e) => setPromoEmail(e.target.value)}
//                   placeholder="Masukkan Email Anda" 
//                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   disabled={isSubscribing}
//                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
//                 >
//                   {isSubscribing ? "Memproses..." : "Continue"}
//                 </button>
//               </form>
              
//               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
//                 *Penawaran hanya berlaku untuk pesanan pertama di atas Rp 200.000. Tidak dapat digabungkan dengan promo lain.
//               </p>
//             </div>

//             {/* Bagian Kanan: Gambar Pemanis (Akan disembunyikan di layar kecil) */}
//             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
//               <img 
//                 src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
//                 alt="Promo Gycora" 
//                 className="object-cover w-full h-full"
//               />
//             </div>

//           </div>
//         </div>
//       )}


//       {/* =========================================
//           1. HERO SECTION
//       ========================================= */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
//         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
//           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
//         </div>

//         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
//           {userData ? (
//             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
//                 Gycora Exclusive Member
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
//                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
//               </p>
//               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
//                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
//                   Lanjutkan Belanja
//                 </button>
//                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                   Profil & Pesanan Saya
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
//               <div className="space-y-8 animate-fade-in-up">
//                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
//                   ✨ Solusi Perawatan Rambut Premium
//                 </div>
//                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
//                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
//                 </h1>
//                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
//                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
//                 </p>
//                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
//                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
//                     Eksplorasi Katalog
//                   </Link>
//                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
//                     Daftar Member
//                   </Link>
//                 </div>
//               </div>
              
//               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
//                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
//                   {heroSlides.map((slide, index) => (
//                     <img 
//                       key={slide.id}
//                       src={slide.image} 
//                       alt={slide.alt} 
//                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
//                     />
//                   ))}

//                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
//                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
//                     </button>
//                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
//                     </button>
//                   </div>

//                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
//                     {heroSlides.map((_, index) => (
//                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* =========================================
//           2. SHOP BY CATEGORY (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 bg-white border-t border-gray-100">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
//             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
//               </div>
//             </Link>
            
//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
//               </div>
//             </Link>

//             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
//               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
//                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
//                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. VALUE PROPOSITION (MENGAPA GYCORA?)
//       ========================================= */}
//       <div className="py-24 border-gray-100 bg-gray-50 border-y">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
//               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
//               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
//             </div>
//             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
//               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
//               </div>
//               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
//               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
//       ========================================= */}
//       <div className="py-24 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
//               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
//             </div>
//             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>

//           {isLoadingProducts ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
//                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
//                   <div className="p-6 space-y-3">
//                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
//                     <div className="w-full h-4 bg-gray-200 rounded"></div>
//                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {featuredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
//                   onClick={() => navigate(`/product/${product.id}`)}
//                 >
//                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
//                     />
//                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
//                       {product.category?.name || "Gycora"}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
//                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
//                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
//                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
//           )}
          
//           <div className="mt-8 text-center sm:hidden">
//             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
//               Lihat Semua Produk &rarr;
//             </Link>
//           </div>
//         </div>
//       </div> 

//       {/* =========================================
//           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
//       ========================================= */}
//       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
//             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//             {testimonials.map((testi) => (
//               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(testi.rating)].map((_, i) => (
//                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                   ))}
//                 </div>
//                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
//                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
//                     {testi.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
//                     <p className="text-xs text-gray-500">{testi.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           6. CTA (CALL TO ACTION) / NEWSLETTER
//       ========================================= */}
//       <div className="relative py-24 overflow-hidden bg-gray-900">
//         {/* Dekorasi Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
//         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
//             Siap mengubah rutinitas rambut Anda?
//           </h2>
//           <p className="mt-4 mb-10 text-lg text-gray-400">
//             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
//           </p>
//           {!userData ? (
//              <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Mulai Perjalanan Anda Sekarang
//              </button>
//           ) : (
//             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
//                Belanja Koleksi Kami
//             </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

  // import { useState, useEffect } from "react";
  // import { Link, useNavigate } from "react-router-dom";
  // import { BASE_URL } from "../../config/api"; 
  // import Swal from "sweetalert2"; // Pastikan Swal di-import untuk notifikasi langganan

  // // --- IMPORT 5 GAMBAR DARI LOKAL UNTUK SLIDER ---
  // import slide1 from "/landing_page_images/hero_slide_1.jpg";
  // import slide2 from "/landing_page_images/hero_slide_2.jpg";
  // import slide3 from "/landing_page_images/hero_slide_3.jpg";
  // import slide4 from "/landing_page_images/hero_slide_4.jpg";
  // import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

  // const heroSlides = [
  //   { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
  //   { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
  //   { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
  //   { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
  //   { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
  // ];

  // const testimonials = [
  //   { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
  //   { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
  //   { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
  // ];

  // export default function Home() {
  //   const navigate = useNavigate();
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const [userData, setUserData] = useState<any>(null);
  //   const [currentSlide, setCurrentSlide] = useState(0);
    
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  //   const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  //   // --- STATE UNTUK POP-UP PROMO ---
  //   const [showPromoModal, setShowPromoModal] = useState(false);
  //   const [promoEmail, setPromoEmail] = useState("");
  //   const [isSubscribing, setIsSubscribing] = useState(false);

  //   useEffect(() => {
  //     const storedUser = localStorage.getItem("user_data");
  //     if (storedUser) {
  //       setUserData(JSON.parse(storedUser));
  //     } else {
  //       // Tampilkan Promo Modal hanya untuk Guest yang belum pernah melihatnya di sesi ini
  //       const hasSeenPromo = sessionStorage.getItem("hasSeenPromo");
  //       if (!hasSeenPromo) {
  //         // Delay sedikit agar lebih natural setelah halaman dimuat
  //         const timer = setTimeout(() => {
  //           setShowPromoModal(true);
  //         }, 1500);
  //         return () => clearTimeout(timer);
  //       }
  //     }

  //     const fetchFeaturedProducts = async () => {
  //       try {
  //         const res = await fetch(`${BASE_URL}/api/products`);
  //         if (res.ok) {
  //           const data = await res.json();
  //           const productsArray = data.data ? data.data : data;
  //           setFeaturedProducts(productsArray.slice(0, 3) || []);
  //         }
  //       } catch (error) {
  //         console.error("Gagal memuat produk unggulan:", error);
  //       } finally {
  //         setIsLoadingProducts(false);
  //       }
  //     };

  //     fetchFeaturedProducts();
  //   }, []);

  //   useEffect(() => {
  //     if (userData) return; 
  //     const slideInterval = setInterval(() => {
  //       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  //     }, 4000); 
  //     return () => clearInterval(slideInterval);
  //   }, [userData]);

  //   const formatRupiah = (angka: number) => {
  //     return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  //   };

  //   // --- HANDLER TUTUP PROMO & SUBMIT ---
  //   const closePromoModal = () => {
  //     setShowPromoModal(false);
  //     sessionStorage.setItem("hasSeenPromo", "true"); // Tandai agar tidak muncul lagi di tab ini
  //   };

  //   const handleSubscribePromo = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!promoEmail) return;
      
  //     setIsSubscribing(true);
  //     try {
  //       const res = await fetch(`${BASE_URL}/api/subscribe`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json", "Accept": "application/json" },
  //         body: JSON.stringify({ email: promoEmail }),
  //       });

  //       const data = await res.json();

  //       if (res.ok) {
  //         closePromoModal();
  //         Swal.fire({
  //           icon: "success",
  //           title: "Berhasil!",
  //           text: "Cek email Anda untuk kode voucher 50% Gycora.",
  //           confirmButtonColor: "#059669",
  //         });
  //       } else {
  //         Swal.fire({ icon: "warning", title: "Pemberitahuan", text: data.message || "Gagal berlangganan.", confirmButtonColor: "#d33" });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       Swal.fire({ icon: "error", title: "Gagal", text: "Terjadi kesalahan server.", confirmButtonColor: "#d33" });
  //     } finally {
  //       setIsSubscribing(false);
  //     }
  //   };

  //   return (
  //     <div className="relative font-sans bg-white">
        
  //       {/* =========================================
  //           POP-UP PROMO MODAL (GUEST ONLY)
  //       ========================================= */}
  //       {showPromoModal && !userData && (
  //         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
  //           <div className="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl">
              
  //             {/* Tombol Close */}
  //             <button 
  //               onClick={closePromoModal}
  //               className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
  //             >
  //               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
  //             </button>

  //             {/* Bagian Kiri: Teks & Form */}
  //             <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
  //               <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
  //               <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
  //                 Dapatkan Diskon 50% + Produk Spesial
  //               </h3>
  //               <p className="mb-8 text-sm font-medium text-gray-500">
  //                 Daftarkan Email & SMS untuk mendapatkan penawaran eksklusif, tips kecantikan, dan banyak lagi dari kami!
  //               </p>
                
  //               <form onSubmit={handleSubscribePromo} className="space-y-4">
  //                 <input 
  //                   type="email" 
  //                   value={promoEmail}
  //                   onChange={(e) => setPromoEmail(e.target.value)}
  //                   placeholder="Masukkan Email Anda" 
  //                   className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
  //                   required
  //                 />
  //                 <button 
  //                   type="submit" 
  //                   disabled={isSubscribing}
  //                   className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
  //                 >
  //                   {isSubscribing ? "Memproses..." : "Continue"}
  //                 </button>
  //               </form>
                
  //               <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
  //                 *Penawaran hanya berlaku untuk pesanan pertama di atas Rp 200.000. Tidak dapat digabungkan dengan promo lain.
  //               </p>
  //             </div>

  //             {/* Bagian Kanan: Gambar Pemanis (Akan disembunyikan di layar kecil) */}
  //             <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
  //               <img 
  //                 src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
  //                 alt="Promo Gycora" 
  //                 className="object-cover w-full h-full"
  //               />
  //             </div>

  //           </div>
  //         </div>
  //       )}


  //       {/* =========================================
  //           1. HERO SECTION
  //       ========================================= */}
  //       <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
  //         <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
  //           <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
  //         </div>

  //         <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
  //           {userData ? (
  //             <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
  //               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
  //                 <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
  //                 Gycora Exclusive Member
  //               </div>
  //               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
  //                 Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
  //               </h1>
  //               <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
  //                 Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
  //               </p>
  //               <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
  //                 <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
  //                   Lanjutkan Belanja
  //                 </button>
  //                 <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
  //                   Profil & Pesanan Saya
  //                 </button>
  //               </div>
  //             </div>
  //           ) : (
  //             <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
  //               <div className="space-y-8 animate-fade-in-up">
  //                 <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
  //                   ✨ Solusi Perawatan Rambut Premium
  //                 </div>
  //                 <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
  //                   Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
  //                 </h1>
  //                 <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
  //                   Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
  //                 </p>
  //                 <div className="flex flex-col gap-4 pt-4 sm:flex-row">
  //                   <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
  //                     Eksplorasi Katalog
  //                   </Link>
  //                   <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
  //                     Daftar Member
  //                   </Link>
  //                 </div>
  //               </div>
                
  //               <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
  //                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                  
  //                 <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
  //                   {heroSlides.map((slide, index) => (
  //                     <img 
  //                       key={slide.id}
  //                       src={slide.image} 
  //                       alt={slide.alt} 
  //                       className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
  //                     />
  //                   ))}

  //                   <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
  //                     <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
  //                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
  //                     </button>
  //                     <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
  //                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  //                     </button>
  //                   </div>

  //                   <div className="absolute flex justify-center w-full gap-2 bottom-6">
  //                     {heroSlides.map((_, index) => (
  //                       <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>

  //       {/* =========================================
  //           2. SHOP BY CATEGORY (SEKSI BARU)
  //       ========================================= */}
  //       <div className="py-24 bg-white border-t border-gray-100">
  //         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //           <div className="mb-12 text-center">
  //             <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
  //             <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
  //           </div>
            
  //           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  //             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
  //               <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
  //               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
  //               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
  //                 <h3 className="text-2xl font-bold text-white">Hair Care</h3>
  //                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
  //               </div>
  //             </Link>
              
  //             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
  //               <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
  //               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
  //               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
  //                 <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
  //                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
  //               </div>
  //             </Link>

  //             <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
  //               <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
  //               <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
  //               <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
  //                 <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
  //                 <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
  //               </div>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>

  //       {/* =========================================
  //           3. VALUE PROPOSITION (MENGAPA GYCORA?)
  //       ========================================= */}
  //       <div className="py-24 border-gray-100 bg-gray-50 border-y">
  //         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //           <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
  //             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
  //               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
  //                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  //               </div>
  //               <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
  //               <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
  //             </div>
  //             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
  //               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
  //                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  //               </div>
  //               <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
  //               <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
  //             </div>
  //             <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
  //               <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
  //                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  //               </div>
  //               <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
  //               <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* =========================================
  //           4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
  //       ========================================= */}
  //       <div className="py-24 bg-white">
  //         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //           <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
  //             <div>
  //               <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
  //               <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
  //             </div>
  //             <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
  //               Lihat Semua Produk &rarr;
  //             </Link>
  //           </div>

  //           {isLoadingProducts ? (
  //             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  //               {[1, 2, 3].map((i) => (
  //                 <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
  //                   <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
  //                   <div className="p-6 space-y-3">
  //                     <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
  //                     <div className="w-full h-4 bg-gray-200 rounded"></div>
  //                     <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           ) : featuredProducts.length > 0 ? (
  //             <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  //               {featuredProducts.map((product) => (
  //                 <div 
  //                   key={product.id} 
  //                   className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
  //                   onClick={() => navigate(`/product/${product.id}`)}
  //                 >
  //                   <div className="relative overflow-hidden bg-gray-100 aspect-square">
  //                     <img 
  //                       src={product.image_url} 
  //                       alt={product.name} 
  //                       className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
  //                     />
  //                     <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
  //                       {product.category?.name || "Gycora"}
  //                     </div>
  //                   </div>
  //                   <div className="p-6">
  //                     <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
  //                     <p className="mb-4 text-sm text-gray-500 line-clamp-2">
  //                       {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
  //                     </p>
  //                     <div className="flex items-center justify-between">
  //                       <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
  //                       <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
  //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           ) : (
  //             <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
  //           )}
            
  //           <div className="mt-8 text-center sm:hidden">
  //             <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
  //               Lihat Semua Produk &rarr;
  //             </Link>
  //           </div>
  //         </div>
  //       </div> 

  //       {/* =========================================
  //           5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
  //       ========================================= */}
  //       <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
  //         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  //           <div className="mb-16 text-center">
  //             <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
  //             <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
  //           </div>

  //           <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
  //             {testimonials.map((testi) => (
  //               <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
  //                 <div className="flex gap-1 mb-4 text-amber-400">
  //                   {[...Array(testi.rating)].map((_, i) => (
  //                     <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
  //                   ))}
  //                 </div>
  //                 <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
  //                 <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
  //                   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
  //                     {testi.name.charAt(0)}
  //                   </div>
  //                   <div>
  //                     <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
  //                     <p className="text-xs text-gray-500">{testi.role}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>

  //       {/* =========================================
  //           6. CTA (CALL TO ACTION) / NEWSLETTER
  //       ========================================= */}
  //       <div className="relative py-24 overflow-hidden bg-gray-900">
  //         {/* Dekorasi Glow */}
  //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          
  //         <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
  //           <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
  //             Siap mengubah rutinitas rambut Anda?
  //           </h2>
  //           <p className="mt-4 mb-10 text-lg text-gray-400">
  //             Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
  //           </p>
  //           {!userData ? (
  //             <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
  //               Mulai Perjalanan Anda Sekarang
  //             </button>
  //           ) : (
  //             <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
  //               Belanja Koleksi Kami
  //             </button>
  //           )}
  //         </div>
  //       </div>

  //     </div>
  //   );
  // }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api"; 
import Swal from "sweetalert2";

// --- IMPORT GAMBAR DARI LOKAL UNTUK SLIDER ---
import slide1 from "/landing_page_images/hero_slide_1.jpg";
import slide2 from "/landing_page_images/hero_slide_2.jpg";
import slide3 from "/landing_page_images/hero_slide_3.jpg";
import slide4 from "/landing_page_images/hero_slide_4.jpg";
import slide5 from "/landing_page_images/hero_slide_5.jpg"; 

const heroSlides = [
  { id: 1, image: slide1, alt: "Gycora Premium Hair Care 1" },
  { id: 2, image: slide2, alt: "Gycora Premium Hair Care 2" },
  { id: 3, image: slide3, alt: "Gycora Premium Hair Care 3" },
  { id: 4, image: slide4, alt: "Gycora Premium Hair Care 4" },
  { id: 5, image: slide5, alt: "Gycora Premium Hair Care 5" },
];

const testimonials = [
  { id: 1, name: "Amanda S.", role: "Verified Buyer", text: "Ethereal Glow Brush benar-benar mengubah hidup saya. Rambut yang biasanya rontok saat disisir sekarang sangat mudah diatur dan jauh lebih berkilau!", rating: 5 },
  { id: 2, name: "Rina Kartika", role: "Gycora Member", text: "Wangi dari Revitalizing Shampoo sangat elegan dan tahan lama. Kulit kepala terasa lebih bersih tanpa membuat ujung rambut menjadi kering.", rating: 5 },
  { id: 3, name: "Jessica W.", role: "Verified Buyer", text: "Awalnya ragu, tapi setelah mencoba Argan Hair Serum selama 2 minggu, ujung rambut bercabang saya benar-benar membaik. Sangat direkomendasikan!", rating: 4 }
];

export default function Home() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // --- STATE UNTUK POP-UP PROMO ---
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoEmail, setPromoEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    // Tampilkan Promo Modal setiap kali komponen Home di-mount (baik user login maupun guest)
    const promoTimer = setTimeout(() => {
      setShowPromoModal(true);
    }, 1500);

    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          const productsArray = data.data ? data.data : data;
          setFeaturedProducts(productsArray.slice(0, 3) || []);
        }
      } catch (error) {
        console.error("Gagal memuat produk unggulan:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchFeaturedProducts();

    // Cleanup timer saat komponen di-unmount
    return () => clearTimeout(promoTimer);
  }, []);

  useEffect(() => {
    if (userData) return; 
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(slideInterval);
  }, [userData]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  // --- HANDLER TUTUP PROMO & SUBMIT ---
  const closePromoModal = () => {
    setShowPromoModal(false);
  };

  const handleSubscribePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoEmail) return;
    
    setIsSubscribing(true);
    try {
      const res = await fetch(`${BASE_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email: promoEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        closePromoModal();
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Cek email Anda untuk kode voucher 50% Gycora.",
          confirmButtonColor: "#059669",
        });
      } else {
        Swal.fire({ icon: "warning", title: "Pemberitahuan", text: data.message || "Gagal berlangganan.", confirmButtonColor: "#d33" });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Gagal", text: "Terjadi kesalahan server.", confirmButtonColor: "#d33" });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="relative font-sans bg-white">
      
      {/* =========================================
          POP-UP PROMO MODAL (SELALU MUNCUL)
      ========================================= */}
      {showPromoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-2xl">
            
            {/* Tombol Close */}
            <button 
              onClick={closePromoModal}
              className="absolute z-10 flex items-center justify-center w-8 h-8 text-gray-500 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100 hover:text-gray-900"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Bagian Kiri: Teks & Form */}
            <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
              <h2 className="mb-2 font-serif text-4xl font-black tracking-tight text-gray-900 uppercase">Gycora</h2>
              <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gycora-dark">
                Dapatkan Diskon 50% + Produk Spesial
              </h3>
              <p className="mb-8 text-sm font-medium text-gray-500">
                Daftarkan Email & SMS untuk mendapatkan penawaran eksklusif, tips kecantikan, dan banyak lagi dari kami!
              </p>
              
              <form onSubmit={handleSubscribePromo} className="space-y-4">
                <input 
                  type="email" 
                  value={promoEmail}
                  onChange={(e) => setPromoEmail(e.target.value)}
                  placeholder="Masukkan Email Anda" 
                  className="w-full px-4 py-3 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gycora"
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSubscribing}
                  className="w-full px-4 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all bg-gray-900 rounded-lg hover:bg-black disabled:bg-gray-400"
                >
                  {isSubscribing ? "Memproses..." : "Continue"}
                </button>
              </form>
              
              <p className="mt-4 text-[9px] text-gray-400 leading-relaxed">
                *Penawaran hanya berlaku untuk pesanan pertama di atas Rp 200.000. Tidak dapat digabungkan dengan promo lain.
              </p>
            </div>

            {/* Bagian Kanan: Gambar Pemanis dari Aset Lokal */}
            <div className="hidden w-full md:block md:w-5/12 bg-emerald-50">
              <img 
                src="/landing_page_images/promo_popup.jpg" 
                alt="Promo Gycora" 
                className="object-cover w-full h-full"
              />
            </div>

          </div>
        </div>
      )}

      {/* =========================================
          1. HERO SECTION
      ========================================= */}
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
          <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
          {userData ? (
            <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Gycora Exclusive Member
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
                Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif, lacak pesanan, dan dapatkan kemudahan berbelanja khusus untuk member Gycora.
              </p>
              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                <button onClick={() => navigate("/products")} className="px-8 py-3.5 text-base font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5">
                  Lanjutkan Belanja
                </button>
                <button onClick={() => navigate("/profile")} className="px-8 py-3.5 text-base font-bold text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
                  Profil & Pesanan Saya
                </button>
              </div>
            </div>
          ) : (
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-emerald-800 bg-emerald-100 uppercase border border-emerald-200">
                  ✨ Solusi Perawatan Rambut Premium
                </div>
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                  Tingkatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gycora to-emerald-400">Pesona</span><br /> Mahkota Anda.
                </h1>
                <p className="text-lg leading-relaxed text-gray-500 sm:text-xl">
                  Temukan koleksi eksklusif Gycora. Diformulasikan dengan teknologi mutakhir dan bahan premium untuk rambut yang lebih sehat, bersinar, dan bebas kusut dari akar hingga ujung.
                </p>
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <Link to="/products" className="px-8 py-4 text-lg font-bold text-center text-white transition-all rounded-full bg-gycora hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:-translate-y-0.5">
                    Eksplorasi Katalog
                  </Link>
                  <Link to="/register" className="px-8 py-4 text-lg font-bold text-center text-gray-700 transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:-translate-y-0.5">
                    Daftar Member
                  </Link>
                </div>
              </div>
              
              <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                
                <div className="relative w-full overflow-hidden shadow-2xl h-[500px] rounded-[3rem] group">
                  {heroSlides.map((slide, index) => (
                    <img 
                      key={slide.id}
                      src={slide.image} 
                      alt={slide.alt} 
                      className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    />
                  ))}

                  <div className="absolute inset-0 flex items-center justify-between px-4 transition-opacity opacity-0 group-hover:opacity-100">
                    <button onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)} className="p-3 text-gray-800 transition-colors rounded-full shadow-md bg-white/80 hover:bg-white backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>

                  <div className="absolute flex justify-center w-full gap-2 bottom-6">
                    {heroSlides.map((_, index) => (
                      <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-gycora' : 'w-2.5 bg-white/70 hover:bg-white'}`} aria-label={`Slide ${index + 1}`}></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================
          2. SHOP BY CATEGORY (SEKSI BARU)
      ========================================= */}
      <div className="py-24 bg-white border-t border-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Kategori Terpopuler</h2>
            <p className="mt-4 text-gray-500">Jelajahi rangkaian produk spesifik untuk setiap kebutuhan mahkota Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
              <img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white">Hair Care</h3>
                <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Shampoo, Conditioner & Serum</p>
              </div>
            </Link>
            
            <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
              <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tools & Accessories" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white">Tools & Brushes</h3>
                <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Anti-Static & Detangling</p>
              </div>
            </Link>

            <Link to="/products" className="relative block overflow-hidden shadow-sm h-80 rounded-3xl group">
              <img src="https://images.unsplash.com/photo-1615397323218-c2bda069f9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bundles & Gift Sets" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center transition-transform transform translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white">Bundles & Gifts</h3>
                <p className="mt-2 text-sm text-gray-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100">Set Lengkap & Promo Spesial</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================
          3. VALUE PROPOSITION (MENGAPA GYCORA?)
      ========================================= */}
      <div className="py-24 border-gray-100 bg-gray-50 border-y">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Teknologi Anti-Statis</h3>
              <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
            </div>
            <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Bahan Baku Premium</h3>
              <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
            </div>
            <div className="p-8 transition-colors bg-white border border-transparent shadow-sm rounded-3xl hover:border-emerald-100 hover:shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Cruelty-Free</h3>
              <p className="leading-relaxed text-gray-500">Kecantikan sejati tidak menyakiti. Seluruh lini produk Gycora 100% bebas dari uji coba pada hewan.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          4. FEATURED PRODUCTS (PRODUK UNGGULAN DINAMIS)
      ========================================= */}
      <div className="py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between mb-12 sm:flex-row">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Produk Terlaris Kami</h2>
              <p className="mt-2 text-gray-500">Pilihan favorit pelanggan Gycora bulan ini.</p>
            </div>
            <Link to="/products" className="hidden font-bold transition-colors sm:block text-gycora hover:text-gycora-dark hover:underline">
              Lihat Semua Produk &rarr;
            </Link>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse">
                  <div className="w-full bg-gray-200 aspect-square rounded-t-2xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-6 mt-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1" 
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">
                      {product.category?.name || "Gycora"}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="mb-4 text-sm text-gray-500 line-clamp-2">
                      {product.description || "Temukan kilau alami rambut Anda dengan perawatan eksklusif dari Gycora."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-extrabold text-gycora">{formatRupiah(product.price)}</span>
                      <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 italic text-center text-gray-500">Belum ada produk yang tersedia.</div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
              Lihat Semua Produk &rarr;
            </Link>
          </div>
        </div>
      </div> 

      {/* =========================================
          5. TESTIMONIALS / SOCIAL PROOF (SEKSI BARU)
      ========================================= */}
      <div className="py-24 border-t border-gray-100 bg-emerald-50/50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Kata Mereka Tentang Gycora</h2>
            <p className="mt-4 text-gray-500">Ulasan jujur dari pelanggan setia yang telah membuktikan kualitas kami.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testi) => (
              <div key={testi.id} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(testi.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="mb-6 italic text-gray-600">"{testi.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-emerald-100 text-emerald-700">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{testi.name}</h4>
                    <p className="text-xs text-gray-500">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================
          6. CTA (CALL TO ACTION) / NEWSLETTER
      ========================================= */}
      <div className="relative py-24 overflow-hidden bg-gray-900">
        {/* Dekorasi Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gycora rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
        <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Siap mengubah rutinitas rambut Anda?
          </h2>
          <p className="mt-4 mb-10 text-lg text-gray-400">
            Bergabunglah dengan ribuan pelanggan yang telah merasakan keajaiban Ethereal Glow Brush dan rangkaian produk Gycora lainnya.
          </p>
          {!userData ? (
             <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
               Mulai Perjalanan Anda Sekarang
             </button>
          ) : (
            <button onClick={() => navigate("/products")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
               Belanja Koleksi Kami
            </button>
          )}
        </div>
      </div>

    </div>
  );
}