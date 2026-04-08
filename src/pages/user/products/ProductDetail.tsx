import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ganti dari next/navigation
import Swal from "sweetalert2";
import { useCart } from "../../../context/CartContext"; 

interface Product {
  id: number;
  category_id: number;
  category_name: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  benefits: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>(); // Tangkap ID dari URL params
  const navigate = useNavigate(); // Ganti useRouter
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false); 
  
  const { fetchCart, setIsCartOpen } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://backend-gycora-web.vercel.app/api/api/products/${id}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        const responseData = await res.json();
        // --- PERBAIKAN DI SINI ---
        // Jika dibungkus "data" oleh Laravel Resource, ambil isinya.
        const productObject = responseData.data ? responseData.data : responseData;
        setProduct(productObject);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id, navigate]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      Swal.fire({
        title: "Login Diperlukan",
        text: "Silakan masuk ke akun Anda untuk mulai berbelanja.",
        icon: "info",
        confirmButtonColor: "#059669",
        confirmButtonText: "Ke Halaman Login"
      }).then(() => navigate("/login"));
      return;
    }

    setIsAdding(true);

    try {
      const res = await fetch("https://backend-gycora-web.vercel.app/api/api/carts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          product_id: product?.id,
          quantity: quantity
        })
      });

      const data = await res.json();

      if (res.ok) {
        // ANIMASI GAMBAR TERBANG
        const startEl = document.getElementById("product-image");
        const endEl = document.getElementById("cart-icon"); 
        
        if (startEl && endEl && product?.image_url) {
          const startRect = startEl.getBoundingClientRect();
          const endRect = endEl.getBoundingClientRect();
          
          const flyingImg = document.createElement("img");
          flyingImg.src = product.image_url;
          flyingImg.style.position = "fixed";
          flyingImg.style.top = `${startRect.top}px`;
          flyingImg.style.left = `${startRect.left}px`;
          flyingImg.style.width = `${startRect.width}px`;
          flyingImg.style.height = `${startRect.height}px`;
          flyingImg.style.borderRadius = "10%";
          flyingImg.style.zIndex = "9999";
          flyingImg.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; 
          document.body.appendChild(flyingImg);

          requestAnimationFrame(() => {
            flyingImg.style.top = `${endRect.top + 10}px`;
            flyingImg.style.left = `${endRect.left + 10}px`;
            flyingImg.style.width = "20px";
            flyingImg.style.height = "20px";
            flyingImg.style.opacity = "0.2";
            flyingImg.style.borderRadius = "50%";
          });

          setTimeout(() => {
            flyingImg.remove();
            fetchCart(); 
            setIsCartOpen(true); 
          }, 800);
        } else {
           fetchCart();
           setIsCartOpen(true);
        }
      } else {
        Swal.fire("Gagal", data.message || "Stok tidak mencukupi", "error");
      }
    } catch (error) {
        console.error("Gagal add to cart:", error);
      Swal.fire("Error", "Gagal terhubung ke server", "error");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen font-sans bg-white"><div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div></div>;
  if (!product) return null;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="min-h-screen py-12 font-sans bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
          {/* Image Section */}
          <div className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] mb-10 lg:mb-0 border border-gray-100">
            {product.image_url ? (
              <img 
                id="product-image" 
                src={product.image_url} 
                alt={product.name} 
                className="object-cover object-center w-full h-full"
              />
            ) : (
              <div id="product-image" className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100">
                No Image
              </div>
            )}
            
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 text-sm font-bold text-gray-900 rounded-full shadow-sm bg-white/90 backdrop-blur-md">
                {product.category_name}
              </span>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-center">
             <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{product.name}</h1>
             <p className="mb-8 font-mono text-gray-500">SKU: {product.sku}</p>
             <div className="mb-8"><p className="text-4xl font-extrabold text-gycora">{formatRupiah(product.price)}</p></div>

             <div className="p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-semibold text-gray-700">Status Ketersediaan:</span>
                  {isOutOfStock ? (
                    <span className="px-3 py-1 text-sm font-bold text-red-600 rounded-full bg-red-50">Stok Habis</span>
                  ) : (
                    <span className="px-3 py-1 text-sm font-bold rounded-full text-emerald-600 bg-emerald-50">Tersedia ({product.stock} Unit)</span>
                  )}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-xl sm:w-32 h-14">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-l-xl disabled:opacity-50">-</button>
                    <span className="font-bold text-gray-900">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={isOutOfStock} className="flex items-center justify-center w-10 h-full text-gray-600 transition-colors hover:text-gycora hover:bg-gray-50 rounded-r-xl disabled:opacity-50">+</button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || isAdding}
                    className={`flex-1 h-14 rounded-xl text-lg font-bold transition-all ${
                      isOutOfStock 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gycora text-white hover:bg-gycora-dark shadow-[0_4px_14px_0_rgba(5,150,105,0.39)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.23)] hover:-translate-y-0.5'
                    }`}
                  >
                    {isAdding ? "Menambahkan..." : (isOutOfStock ? 'Tidak Tersedia' : 'Tambah ke Keranjang')}
                  </button>
                </div>
             </div>

             <div className="space-y-8">
                <div>
                  <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Tentang Produk Ini</h3>
                  <div className="leading-relaxed prose-sm prose text-gray-600 whitespace-pre-wrap sm:prose max-w-none">{product.description}</div>
                </div>
                {product.benefits && (
                  <div>
                    <h3 className="pb-2 mb-4 text-lg font-bold text-gray-900 border-b border-gray-200">Manfaat Utama</h3>
                    <div className="p-5 border border-pink-100 bg-pink-50/50 rounded-2xl">
                      <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">{product.benefits}</p>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}