/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Ganti dari next/link
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_name: string;
//   sku: string;
//   name: string;
//   price: number;
//   stock: number;
//   image_url: string;
// }

// export default function PublicCatalog() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Sesuaikan URL jika nanti menggunakan Laravel API
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");
//         // const data = await res.json();

//         const responseData = await res.json();
        
//         // --- PERBAIKAN DI SINI ---
//         // Jika responseData memiliki properti "data" (Format Laravel API Resource), gunakan itu.
//         // Jika tidak ada (Format Golang lama), langsung gunakan responseData.
//         const productsArray = responseData.data ? responseData.data : responseData;
//         setProducts(productsArray || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen font-sans bg-white">
//       {/* Header Banner */}
//       <div className="py-16 text-center border-b border-pink-100 bg-pink-50">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Koleksi Gycora</h1>
//         <p className="max-w-xl px-4 mx-auto mt-4 text-gray-600">
//           Temukan perawatan rambut premium yang dirancang khusus untuk Anda. Dari serum yang merevitalisasi hingga kondisioner yang melembapkan.
//         </p>
//       </div>

//       <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         {/* Product Grid */}
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => (
//             <Link 
//               key={product.id} 
//               to={`/product/${product.id}`} // Ganti href menjadi to
//               className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-gycora/20"
//             >
//               {/* Product Image Area */}
//               <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
//                 {product.image_url ? (
//                   <img 
//                     src={product.image_url} 
//                     alt={product.name} 
//                     className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
//                     Belum ada gambar
//                   </div>
//                 )}
                
//                 {/* Badges */}
//                 <div className="absolute flex flex-col gap-2 top-3 left-3">
//                   <span className="px-2 py-1 text-xs font-bold text-gray-900 rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
//                     {product.category_name}
//                   </span>
//                   {product.stock < 5 && product.stock > 0 && (
//                     <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
//                       Sisa {product.stock}!
//                     </span>
//                   )}
//                   {product.stock === 0 && (
//                      <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
//                       Habis
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Product Info */}
//               <div className="flex flex-col flex-grow p-5">
//                 <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-gycora line-clamp-2">
//                   {product.name}
//                 </h3>
//                 <p className="mb-4 font-mono text-sm text-gray-500">{product.sku}</p>
//                 <div className="mt-auto">
//                   <p className="text-xl font-extrabold text-gycora">
//                     {formatRupiah(product.price)}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {products.length === 0 && !loading && (
//           <div className="py-20 text-center">
//             <h3 className="text-xl font-bold text-gray-700">Belum ada produk</h3>
//             <p className="mt-2 text-gray-500">Katalog kami sedang diperbarui, silakan periksa kembali nanti.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../../config/api";

// interface Product {
//   id: number;
//   category_name: string;
//   // sku: string;
//   name: string;
//   price: number;
//   stock: number;
//   image_url: string;
// }

// export default function PublicCatalog() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // STATE BARU: Menyimpan daftar ID produk yang difavoritkan
//   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/products`);
//         if (!res.ok) throw new Error("Gagal mengambil data produk");

//         const responseData = await res.json();
//         const productsArray = responseData.data ? responseData.data : responseData;
//         setProducts(productsArray || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // FUNGSI BARU: Ambil data wishlist jika user sudah login
//     const fetchWishlists = async () => {
//       const token = localStorage.getItem("user_token");
//       if (!token) return; // Jika belum login, abaikan

//       try {
//         const res = await fetch(`${BASE_URL}/api/wishlists`, {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           // Simpan hanya kumpulan ID produknya saja agar mudah dicek
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setWishlistIds(data.map((item: any) => item.product_id));
//         }
//       } catch (error) {
//         console.error("Gagal mengambil wishlist:", error);
//       }
//     };

//     fetchProducts();
//     fetchWishlists();
//   }, []);

//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka);
//   };

//   // FUNGSI BARU: Handle klik tombol Favorit
//   const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
//     e.preventDefault(); // Mencegah klik men-trigger Link ke halaman detail

//     const token = localStorage.getItem("user_token");
//     if (!token) {
//       Swal.fire({
//         title: "Login Diperlukan",
//         text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
//         icon: "info",
//         showCancelButton: true,
//         confirmButtonColor: "#059669",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Ke Halaman Login",
//         cancelButtonText: "Batal"
//       }).then((result) => {
//         if (result.isConfirmed) navigate("/login");
//       });
//       return;
//     }

//     // Optimistic Update: Langsung ubah warna UI sebelum API selesai
//     const isWished = wishlistIds.includes(productId);
//     if (isWished) {
//       setWishlistIds((prev) => prev.filter(id => id !== productId));
//     } else {
//       setWishlistIds((prev) => [...prev, productId]);
//     }

//     // Hit API di background
//     try {
//       const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ product_id: productId })
//       });
      
//       if (!res.ok) throw new Error("Gagal memproses wishlist");
//     } catch (error) {
//       // Jika gagal, kembalikan ke state semula
//       if (isWished) {
//         setWishlistIds((prev) => [...prev, productId]);
//       } else {
//         setWishlistIds((prev) => prev.filter(id => id !== productId));
//       }
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen font-sans bg-white">
//       {/* Header Banner */}
//       <div className="py-16 text-center border-b border-pink-100 bg-pink-50">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Koleksi Gycora</h1>
//         <p className="max-w-xl px-4 mx-auto mt-4 text-gray-600">
//           Temukan perawatan rambut premium yang dirancang khusus untuk Anda. Dari serum yang merevitalisasi hingga kondisioner yang melembapkan.
//         </p>
//       </div>

//       <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         {/* Product Grid */}
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => {
//             const isWished = wishlistIds.includes(product.id);

//             return (
//               <Link 
//                 key={product.id} 
//                 to={`/product/${product.id}`} 
//                 className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-gycora/20"
//               >
//                 {/* Product Image Area */}
//                 <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
//                   {product.image_url ? (
//                     <img 
//                       src={product.image_url} 
//                       alt={product.name} 
//                       className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
//                       Belum ada gambar
//                     </div>
//                   )}
                  
//                   {/* Badges */}
//                   <div className="absolute flex flex-col gap-2 top-3 left-3">
//                     <span className="px-2 py-1 text-xs font-bold text-gray-900 rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
//                       {product.category_name}
//                     </span>
//                     {product.stock < 5 && product.stock > 0 && (
//                       <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
//                         Sisa {product.stock}!
//                       </span>
//                     )}
//                     {product.stock === 0 && (
//                        <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
//                         Habis
//                       </span>
//                     )}
//                   </div>

//                   {/* TOMBOL FAVORIT (HEART ICON) */}
//                   <button 
//                     onClick={(e) => handleToggleWishlist(e, product.id)}
//                     className="absolute z-10 flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-md top-3 right-3 hover:bg-gray-50"
//                   >
//                     <svg 
//                       xmlns="http://www.w3.org/2000/svg" 
//                       viewBox="0 0 24 24" 
//                       strokeWidth={1.5} 
//                       stroke="currentColor" 
//                       className={`w-6 h-6 transition-all duration-300 ${isWished ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-400 hover:text-red-500"}`}
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                     </svg>
//                   </button>
//                 </div>

//                 {/* Product Info */}
//                 <div className="flex flex-col flex-grow p-5">
//                   <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-gycora line-clamp-2">
//                     {product.name}
//                   </h3>
//                   {/* <p className="mb-4 font-mono text-sm text-gray-500">{product.sku}</p> */}
//                   <div className="mt-auto">
//                     <p className="text-xl font-extrabold text-gycora">
//                       {formatRupiah(product.price)}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {products.length === 0 && !loading && (
//           <div className="py-20 text-center">
//             <h3 className="text-xl font-bold text-gray-700">Belum ada produk</h3>
//             <p className="mt-2 text-gray-500">Katalog kami sedang diperbarui, silakan periksa kembali nanti.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";
import { useCart } from "../../../context/CartContext";

interface Product {
  id: number;
  category_name: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  color?: string | any[]; // Menambahkan properti color untuk pengecekan
}

export default function PublicCatalog() {
  const navigate = useNavigate();
  const { fetchCart } = useCart() as any; 

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  // --- FILTERING STATE ---
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        if (!res.ok) throw new Error("Gagal mengambil data produk");

        const responseData = await res.json();
        const productsArray = responseData.data ? responseData.data : responseData;
        setProducts(productsArray || []);

        // Ekstrak kategori unik dari data produk
        const uniqueCategories = Array.from(new Set(productsArray.map((p: Product) => p.category_name))) as string[];
        setCategories(uniqueCategories.filter(Boolean));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlists = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) return;

      try {
        const res = await fetch(`${BASE_URL}/api/wishlists`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
        });
        if (res.ok) {
          const data = await res.json();
          setWishlistIds(data.map((item: any) => item.product_id));
        }
      } catch (error) {
        console.error("Gagal mengambil wishlist:", error);
      }
    };

    fetchProducts();
    fetchWishlists();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault(); 

    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire({
        title: "Login Diperlukan",
        text: "Silakan masuk ke akun Anda untuk menyimpan produk ke favorit.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#059669",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ke Halaman Login",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    const isWished = wishlistIds.includes(productId);
    if (isWished) {
      setWishlistIds((prev) => prev.filter(id => id !== productId));
    } else {
      setWishlistIds((prev) => [...prev, productId]);
    }

    try {
      const res = await fetch(`${BASE_URL}/api/wishlists/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({ product_id: productId })
      });
      
      if (!res.ok) throw new Error("Gagal memproses wishlist");
    } catch (error) {
      if (isWished) {
        setWishlistIds((prev) => [...prev, productId]);
      } else {
        setWishlistIds((prev) => prev.filter(id => id !== productId));
      }
      console.error(error);
    }
  };

  // --- QUICK ADD TO CART ---
  const handleQuickAdd = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Cegah redirect ke halaman detail
    e.stopPropagation();

    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire("Login Diperlukan", "Silakan login untuk menambahkan ke keranjang.", "info");
      navigate("/login");
      return;
    }

    // Jika produk memiliki varian warna, arahkan ke detail agar user bisa memilih
    if (product.color && product.color.length > 0) {
      navigate(`/product/${product.id}`);
      return;
    }

    setAddingToCartId(product.id);

    try {
      const res = await fetch(`${BASE_URL}/api/carts`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Accept: "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });
      
      if (res.ok) {
        fetchCart(); // Update badge di header
        Swal.fire({
          title: "Ditambahkan!",
          text: `${product.name} masuk ke keranjang.`,
          icon: "success",
          toast: true,
          position: "top-end",
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        const err = await res.json();
        Swal.fire("Gagal", err.message || "Gagal menambahkan produk.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan koneksi.", "error");
    } finally {
      setAddingToCartId(null);
    }
  };

  // --- FILTER LOGIC ---
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category_name === activeCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-white">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Header Banner */}
      <div className="py-20 text-center border-b border-gray-100 bg-gray-50/50">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">Koleksi Gycora</h1>
        <p className="max-w-2xl px-4 mx-auto mt-4 text-lg text-gray-500">
          Temukan rangkaian perawatan premium yang diformulasikan khusus untuk merevitalisasi dan menjaga kesehatan mahkota Anda.
        </p>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* --- CATEGORY FILTER TABS --- */}
        {categories.length > 0 && (
          <div className="flex items-center gap-4 pb-8 mb-8 overflow-x-auto border-b border-gray-100 custom-scrollbar">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === "All" 
                ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" 
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              Semua Produk
            </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const isWished = wishlistIds.includes(product.id);
            const hasVariant = product.color && product.color.length > 0;
            const isAdding = addingToCartId === product.id;

            return (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`} 
                className="relative flex flex-col overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-sm group rounded-3xl hover:shadow-xl hover:border-gycora/30 hover:-translate-y-1"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
                      Belum ada gambar
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute flex flex-col gap-2 top-4 left-4">
                    <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-gray-900 uppercase rounded-full shadow-sm bg-white/90 backdrop-blur-sm">
                      {product.category_name}
                    </span>
                    {product.stock < 5 && product.stock > 0 && (
                      <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase rounded-full shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse w-max">
                        Sisa {product.stock}!
                      </span>
                    )}
                    {product.stock === 0 && (
                       <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase rounded-full shadow-sm bg-gray-900/90 backdrop-blur-sm w-max">
                        Habis
                      </span>
                    )}
                  </div>

                  {/* TOMBOL FAVORIT (HEART ICON) */}
                  <button 
                    onClick={(e) => handleToggleWishlist(e, product.id)}
                    className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all bg-white rounded-full shadow-md top-4 right-4 hover:scale-110"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className={`w-5 h-5 transition-all duration-300 ${isWished ? "fill-red-500 text-red-500" : "fill-none text-gray-400 hover:text-red-500"}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>

                  {/* QUICK ADD TO CART OVERLAY */}
                  {product.stock > 0 && (
                    <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        disabled={isAdding}
                        className="w-full py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors bg-gray-900 rounded-xl hover:bg-black disabled:bg-gray-400 backdrop-blur-md"
                      >
                        {isAdding 
                          ? "Memproses..." 
                          : (hasVariant ? "Pilih Varian" : "+ Keranjang")}
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="mb-2 text-base font-bold leading-tight text-gray-900 transition-colors sm:text-lg group-hover:text-gycora line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-50">
                    <p className="text-xl font-extrabold text-gycora">
                      {formatRupiah(product.price)}
                    </p>
                    {hasVariant && (
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        + Varian
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="py-24 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <h3 className="text-xl font-bold text-gray-700">Tidak ada produk ditemukan</h3>
            <p className="mt-2 text-gray-500">Kategori ini sedang kosong, silakan telusuri kategori lainnya.</p>
            <button 
              onClick={() => setActiveCategory("All")}
              className="inline-block mt-6 px-6 py-2.5 bg-gycora text-white font-bold rounded-full hover:bg-gycora-dark transition-colors"
            >
              Lihat Semua Produk
            </button>
          </div>
        )}
      </div>
    </div>
  );
}