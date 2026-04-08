import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext"; 

export default function Header() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);

  const { cartItems, cartTotalItems, cartSubtotal, isCartOpen, setIsCartOpen, fetchCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const storedUser = localStorage.getItem("user_data");
    if (token && storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Keluar?", icon: "warning", showCancelButton: true, confirmButtonColor: "#059669", cancelButtonColor: "#d33", confirmButtonText: "Ya, Keluar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_data");
        setUserData(null);
        navigate("/");
        Swal.fire({ title: "Berhasil Keluar", icon: "success", timer: 1500, showConfirmButton: false });
      }
    });
  };

  const handleRemoveItem = async (id: number) => {
    // Nanti sesuaikan URL API dengan Laravel (misal port 8000)
    const token = localStorage.getItem("user_token");
    await fetch(`http://localhost:8000/api/carts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    fetchCart(); 
  };

  const handleUpdateQty = async (id: number, newQty: number) => {
    if (newQty < 1) return;
    const token = localStorage.getItem("user_token");
    const res = await fetch(`http://localhost:8000/api/carts/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ quantity: newQty }),
    });
    if (!res.ok) Swal.fire("Peringatan", "Stok tidak mencukupi", "warning");
    fetchCart(); 
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center flex-1"></div>

          <div className="flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-4xl italic font-extrabold tracking-tighter text-gycora">
              Gycora<span className="text-xs align-top super">®</span>
            </span>
          </div>

          <div className="flex items-center justify-end flex-1 gap-5">
            {userData ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer group">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-full bg-gycora-light text-gycora-dark group-hover:bg-gycora group-hover:text-white">
                    {userData.first_name.charAt(0)}
                  </div>
                  <span className="hidden text-sm font-semibold text-gray-800 transition-colors md:block group-hover:text-gycora">
                    Hi, {userData.first_name}
                  </span>
                </Link>
                <div className="hidden w-px h-5 bg-gray-300 md:block"></div>
                <button onClick={handleLogout} className="text-sm font-medium text-gray-500 transition-colors hover:text-red-600">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 transition-colors hover:text-gycora">Login</Link>
            )}

            {/* <button onClick={() => setIsCartOpen(true)} className="relative text-gray-600 transition-colors hover:text-gycora">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </button> */}
            {/* UBAH BARIS INI */}
            <button onClick={() => navigate("/cart")} className="relative text-gray-600 transition-colors hover:text-gycora">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gycora text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="hidden px-4 mx-auto border-t border-gray-100 max-w-7xl sm:px-6 lg:px-8 md:block">
          <nav className="flex items-center justify-center h-12 space-x-10 text-sm font-semibold text-gray-700">
             {/* --- TAUTAN BARU: Home --- */}
             <Link to="/" className="transition-colors hover:text-gycora">Home</Link>
             
             {/* Tautan Lama: Shop All */}
             <Link to="/products" className="transition-colors hover:text-gycora">Shop All</Link>

             {/* --- TAUTAN BARU: Order --- */}
             {/* Asumsi: Halaman riwayat pesanan/order diletakkan di rute /orders */}
             <Link to="/orders" className="transition-colors hover:text-gycora">Order</Link>
          </nav>
        </div>
      </header>

      {/* SLIDE-OUT CART */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900">Keranjang Belanja</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 transition-colors hover:text-gray-900">Close</button>
          </div>
          
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="mt-10 text-center text-gray-500">Keranjang Anda masih kosong.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b">
                  <img src={item.product.image_url} alt={item.product.name} className="object-cover w-16 h-16 rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{item.product.name}</p>
                    <p className="text-sm font-bold text-gycora">{formatRupiah(item.product.price)}</p>
                    <div className="flex gap-2 mt-2">
                       <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)}>-</button>
                       <span>{item.quantity}</span>
                       <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)}>+</button>
                       <button onClick={() => handleRemoveItem(item.id)} className="ml-auto text-xs text-red-500">Hapus</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between mb-4 font-bold">
                <p>Subtotal</p><p>{formatRupiah(cartSubtotal)}</p>
              </div>
              <button onClick={() => { setIsCartOpen(false); navigate("/checkout"); }} className="w-full py-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800">
                Lanjut ke Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}