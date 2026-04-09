import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart, type CartItem, type Product } from "../../context/CartContext";
import { BASE_URL } from "../../config/api";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, fetchCart } = useCart();
  
  // State untuk Pemilihan Item
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  
  // State untuk Rekomendasi Produk
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);
  // const [suggestedProducts, setSuggestedProducts] = useState<CartItem["product"][]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  // --- LOGIKA PEMILIHAN (SELECTION) ---
  // Hapus ID dari state selection jika item sudah dihapus dari keranjang
  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => cartItems.some((item) => item.id === id)));
  }, [cartItems]);

  const isAllSelected = cartItems.length > 0 && selectedIds.length === cartItems.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]); // Deselect all
    } else {
      setSelectedIds(cartItems.map((item) => item.id)); // Select all
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // --- LOGIKA PERHITUNGAN CHECKOUT ---
  const checkoutTotalAmount = useMemo(() => {
    return cartItems
      .filter((item) => selectedIds.includes(item.id))
      .reduce((total, item) => total + Number(item.gross_amount), 0);
  }, [cartItems, selectedIds]);

  // --- LOGIKA OPTIMISTIC UI (UPDATE & DELETE) ---
  const handleQtyChange = async (item: CartItem, newQty: number) => {
    if (newQty < 1 || newQty > item.product.stock) {
        if(newQty > item.product.stock) Swal.fire("Peringatan", `Stok maksimum ${item.product.stock} tercapai.`, "warning");
        return;
    }
    
    const token = localStorage.getItem("user_token");
    try {
      const res = await fetch(`${BASE_URL}/api/carts/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quantity: newQty }),
      });
      if (!res.ok) {
          const err = await res.json();
          Swal.fire("Peringatan", err.message || "Gagal mengubah kuantitas", "warning");
      }
      fetchCart(); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptimisticDelete = async (id: number) => {
    const token = localStorage.getItem("user_token");
    try {
      // Langsung panggil API penghapusan
      await fetch(`${BASE_URL}/api/carts/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Sinkronisasi ulang data
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Gagal menghapus item", "error");
    }
  };

  // --- LOGIKA REKOMENDASI PRODUK ---
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const products: any[] = data.data ? data.data : data;

        // Filter produk yang sudah ada di keranjang & stok kosong
        const cartProductIds = cartItems.map((item) => item.product_id);
        const available = products.filter((p) => !cartProductIds.includes(p.id) && p.stock > 0);

        // Acak (Shuffle) dan ambil 4 teratas
        const shuffled = available.sort(() => 0.5 - Math.random());
        setSuggestedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Gagal memuat rekomendasi:", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };
    fetchSuggestions();
  }, [cartItems]); // Refresh rekomendasi jika isi keranjang berubah

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const addSuggestedProduct = async (product: any) => {

  // Kita harus menambahkan 'id' ke dalam tipe karena API produk mengembalikan objek dengan id,
  // sedangkan di CartItem.product, id tersebut tidak dideklarasikan (hanya ada product_id di CartItem-nya)
  // const addSuggestedProduct = async (product: CartItem["product"] & { id: number }) => {
  const addSuggestedProduct = async (product: Product) => {
    const token = localStorage.getItem("user_token");
    if(!token) {
        navigate("/login");
        return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });
      if (res.ok) {
        Swal.fire({ title: "Ditambahkan ke Keranjang", icon: "success", toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
        fetchCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = () => {
    if (selectedIds.length === 0) return;
    setIsProcessingCheckout(true);
    // Simulasi loading sebelum pindah halaman
    setTimeout(() => {
        setIsProcessingCheckout(false);
        // navigate("/checkout"); // Arahkan ke halaman checkout yang sesungguhnya nanti
        navigate("/checkout", { state: { selectedIds: selectedIds } });
    }, 800);
  };

  const formatPrice = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="min-h-screen px-4 py-16 mx-auto font-sans max-w-7xl sm:px-6 lg:px-8">
      
      {/* HEADER KERANJANG */}
      <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
        <button
          onClick={() => navigate("/products")}
          className="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Keranjang Belanja
        </h1>
        <span className="ml-2 text-xl font-medium text-gray-400">
          ({cartItems.length} items)
        </span>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        
        {/* AREA KIRI: DAFTAR ITEM & REKOMENDASI */}
        <div className="flex-grow lg:w-2/3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          
          {cartItems.length === 0 ? (
            <div className="py-20 text-center border border-gray-200 border-dashed rounded-3xl bg-gray-50">
              <p className="mb-6 text-2xl font-medium text-gray-400">
                Keranjang Anda masih kosong.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-full shadow-xl hover:bg-black shadow-gray-200"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl sm:p-8">
              
              {/* Checkbox Select All */}
              <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  id="selectAll"
                  className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
                />
                <label htmlFor="selectAll" className="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none">
                  Pilih Semua Item
                </label>
              </div>

              {/* List Keranjang */}
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="relative flex items-start gap-4 pb-8 border-b border-gray-50 sm:gap-6 last:border-0 last:pb-0">
                    
                    <div className="pt-3 sm:pt-12">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-5 h-5 transition border-gray-300 rounded shadow-sm cursor-pointer text-gycora focus:ring-gycora"
                      />
                    </div>

                    <div 
                      className="relative w-24 h-24 overflow-hidden border border-gray-100 cursor-pointer shrink-0 sm:w-40 sm:h-40 rounded-2xl bg-gray-50"
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    >
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-grow min-h-[6rem] sm:min-h-[10rem]">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className="w-2/3 text-sm font-bold tracking-tight text-gray-900 transition-colors cursor-pointer sm:text-lg hover:text-gycora line-clamp-2"
                            onClick={() => navigate(`/product/${item.product.id}`)}
                          >
                            {item.product.name}
                          </h3>
                          <p className="text-sm font-extrabold text-right sm:text-lg whitespace-nowrap text-gycora">
                            {formatPrice(item.gross_amount)}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center mt-2 gap-x-3 gap-y-1">
                          <p className="text-xs italic tracking-wider text-gray-400">
                            {formatPrice(item.product.price)} / pc
                          </p>
                          <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
                          <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                            Stok Tersedia: <span className="text-gray-900">{item.product.stock}</span>
                          </p>
                        </div>
                      </div>

                      {/* Kontrol Kuantitas & Hapus */}
                      <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6">
                        <div className="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
                          <button
                            onClick={() => handleQtyChange(item, item.quantity - 1)}
                            className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
                          >
                            -
                          </button>
                          <span className="w-10 text-sm font-bold text-center text-gray-900 sm:w-12 sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item, item.quantity + 1)}
                            className="px-4 py-2 text-base font-bold text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:py-2"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleOptimisticDelete(item.id)}
                          className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
                        >
                          <svg className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AREA REKOMENDASI PRODUK */}
          <div className="pt-12 mt-12 border-t border-gray-100">
            <h3 className="mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase">
              Mungkin Anda Juga Suka
            </h3>

            {loadingSuggestions ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse"></div>
                    <div className="w-3/4 h-3 mt-1 bg-gray-100 rounded animate-pulse"></div>
                    <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : suggestedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {suggestedProducts.map((product) => (
                  <div key={product.id} className="flex flex-col group">
                    <div
                      className="relative mb-3 overflow-hidden border border-gray-100 cursor-pointer aspect-square rounded-2xl bg-gray-50"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="mb-1 text-[11px] font-bold tracking-wide text-gray-900 uppercase truncate">
                      {product.name}
                    </h4>
                    <p className="mb-3 text-xs font-bold text-gycora">
                      {formatPrice(product.price)}
                    </p>
                    <button
                      onClick={() => addSuggestedProduct(product)}
                      className="px-3 py-2 mt-auto text-[9px] font-bold tracking-widest text-gray-700 uppercase transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                    >
                      Tambah +
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* AREA KANAN: ORDER SUMMARY */}
        {cartItems.length > 0 && (
          <div className="lg:w-1/3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="sticky p-8 bg-gray-50/50 border border-gray-100 rounded-[2rem] top-32 shadow-sm">
              <h2 className="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
                Ringkasan Pesanan
              </h2>

              <div className="mb-8 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Item Dipilih</span>
                  <span className="font-bold text-gray-900">{selectedIds.length}</span>
                </div>
                
                <div className="flex items-end justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                    Estimasi Total
                  </span>
                  <span className="text-2xl font-black text-gycora">
                    {formatPrice(checkoutTotalAmount)}
                  </span>
                </div>
                <p className="mt-1 text-right text-[10px] italic text-gray-400">
                  Pajak & pengiriman dihitung saat checkout.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessingCheckout || selectedIds.length === 0}
                className="flex items-center justify-center w-full gap-3 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 shadow-xl bg-gray-900 rounded-2xl hover:bg-black disabled:bg-gray-300 hover:shadow-black/20"
              >
                {!isProcessingCheckout ? (
                  `Checkout (${selectedIds.length})`
                ) : (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
                    Memproses...
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}