import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="font-sans bg-white">
      
      {/* =========================================
          1. HERO SECTION
      ========================================= */}
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
        {/* Dekorasi Background Blur */}
        <div className="absolute top-0 -translate-x-1/2 left-1/2 -z-10">
          <div className="w-[800px] h-[400px] bg-emerald-200/30 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        </div>

        <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32">
          {userData ? (
            <div className="max-w-4xl mx-auto space-y-8 text-center animate-fade-in-up">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Selamat datang kembali, <span className="text-gycora">{userData.first_name}</span>.
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
                Katalog rambut premium terbaru kami sudah menanti Anda. Nikmati penawaran eksklusif dan kemudahan berbelanja khusus untuk member Gycora.
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
                {/* Gambar Hero Placeholder - Ganti dengan URL gambar produk asli Anda nanti */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-pink-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Gycora Premium Hair Care" 
                  className="object-cover w-full shadow-2xl h-[500px] rounded-[3rem]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================
          2. VALUE PROPOSITION (MENGAPA GYCORA?)
      ========================================= */}
      <div className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Static-Free Technology</h3>
              <p className="leading-relaxed text-gray-500">Molekul karbon konduktif pada sisir kami menetralkan listrik statis, mencegah rambut kusut dan rusak seketika.</p>
            </div>
            <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 text-gycora">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Premium Ingredients</h3>
              <p className="leading-relaxed text-gray-500">Setiap tetes diformulasikan dengan bahan baku berkualitas tinggi yang aman dan teruji klinis untuk kesehatan kulit kepala.</p>
            </div>
            <div className="p-6 transition-colors border border-transparent rounded-3xl hover:bg-gray-50 hover:border-gray-100">
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
          3. FEATURED PRODUCTS (PRODUK UNGGULAN)
      ========================================= */}
      {/* <div className="py-24 bg-gray-50">
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img src="https://images.unsplash.com/photo-1598440947619-2ce6598c4e1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Ethereal Glow Brush" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute px-3 py-1 text-xs font-bold text-gray-900 rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm">Best Seller</div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold text-gray-900">Ethereal Glow Brush</h3>
                <p className="mb-4 text-sm text-gray-500 line-clamp-2">Sisir berteknologi anti-statis dengan molekul karbon untuk rambut halus bebas kusut.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-gycora">Rp 250.000</span>
                  <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Revitalizing Shampoo" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold text-gray-900">Revitalizing Shampoo</h3>
                <p className="mb-4 text-sm text-gray-500 line-clamp-2">Membersihkan kulit kepala secara mendalam sambil menjaga kelembapan alami rambut.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-gycora">Rp 185.000</span>
                  <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer lg:block group rounded-2xl hover:shadow-xl hover:-translate-y-1" onClick={() => navigate('/products')}>
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Argan Hair Serum" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute px-3 py-1 text-xs font-bold text-pink-700 rounded-full shadow-sm top-4 left-4 bg-pink-100/90 backdrop-blur-sm">New Arrival</div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold text-gray-900">Argan Hair Serum</h3>
                <p className="mb-4 text-sm text-gray-500 line-clamp-2">Serum kaya nutrisi untuk mengunci kilau dan memperbaiki ujung rambut yang bercabang.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-gycora">Rp 210.000</span>
                  <button className="p-2 text-gray-900 transition-colors bg-gray-100 rounded-full hover:bg-gycora hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="font-bold transition-colors text-gycora hover:text-gycora-dark hover:underline">
              Lihat Semua Produk &rarr;
            </Link>
          </div>
        {/* </div> */}
      {/* </div>  */}

      {/* =========================================
          4. CTA (CALL TO ACTION) / NEWSLETTER
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
          {!userData && (
             <button onClick={() => navigate("/register")} className="px-10 py-4 text-lg font-bold text-gray-900 transition-all bg-[#D4FF32] rounded-full hover:bg-[#bce520] hover:shadow-lg hover:shadow-[#D4FF32]/20 hover:-translate-y-0.5">
               Mulai Perjalanan Anda Sekarang
             </button>
          )}
        </div>
      </div>

    </div>
  );
}