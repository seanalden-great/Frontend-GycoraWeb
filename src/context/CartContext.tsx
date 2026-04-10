import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";

// // Tipe data berdasarkan struktur dari API Golang
// export interface CartItem {
//   id: number;
//   product_id: number;
//   quantity: number;
//   gross_amount: number;
//   product: {
//     name: string;
//     price: number;
//     image_url: string;
//     sku?: string; // Sifatnya opsional jika tidak selalu turun dari API
//   };
// }

// Tipe data berdasarkan struktur dari API Golang/Laravel
// export interface CartItem {
//   id: number;
//   product_id: number;
//   quantity: number;
//   gross_amount: number;
//   product: {
//     name: string;
//     price: number;
//     image_url: string;
//     sku?: string; // Sifatnya opsional jika tidak selalu turun dari API
//     // --- TAMBAHKAN BARIS DI BAWAH INI ---
//     stock: number; 
//   };
// }

// --- 1. BUAT INTERFACE PRODUCT TERPISAH ---
export interface Product {
  color: string;
  id: number;
  name: string;
  price: number;
  image_url: string;
  sku?: string;
  stock: number;
}

// --- 2. GUNAKAN INTERFACE PRODUCT DI CART ITEM ---
export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  gross_amount: number;
  product: Product; // Panggil tipe Product di sini
}

interface CartContextType {
  cartItems: CartItem[];
  fetchCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartTotalItems: number;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fungsi untuk menarik data terbaru dari Golang API
  const fetchCart = async () => {
    const token = localStorage.getItem("user_token");
    if (!token) return; // Jangan fetch jika belum login

    try {
      // Pastikan port ini sesuai dengan server Golang Anda (misal 8080 atau 8000)
      const res = await fetch(`${BASE_URL}/api/carts`, {
        headers: { Authorization: `Bearer ${token}`, "Accept": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        const cartsArray = data.data ? data.data : data;
        setCartItems(cartsArray || []);
      }
    } catch (error) {
      console.error("Gagal mengambil data keranjang:", error);
    }
  };

  // Otomatis tarik data keranjang saat web pertama kali dimuat
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCart();
  }, []);

  const cartTotalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.gross_amount,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCart,
        isCartOpen,
        setIsCartOpen,
        cartTotalItems,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook agar mudah digunakan di komponen lain
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart harus digunakan di dalam CartProvider");
  return context;
};
