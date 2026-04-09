import { useState } from "react";
import { Link } from "react-router-dom"; // Ganti import next
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Tambahan state loading agar tombol disable saat submit

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pastikan port disesuaikan dengan server API Anda nanti (misal 8000 untuk Laravel)
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user_token", data.access_token);
        localStorage.setItem("user_data", JSON.stringify(data.user));

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
           // Menggunakan window.location.href agar seluruh State di React (seperti header & cart) terre-inisialisasi
           window.location.href = "/"; 
        });

      } else {
        Swal.fire("Login Gagal", data.message, "error");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      Swal.fire("Error", "Gagal terhubung ke server", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-white">
      <div className="w-full max-w-md p-8 border border-gray-100 shadow-sm rounded-2xl">
        <h1 className="mb-2 text-3xl font-extrabold text-center text-gray-900">Masuk</h1>
        <p className="mb-8 text-sm text-center text-gray-500">Selamat datang kembali di Gycora.</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-4 py-3 font-bold text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-70"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Belum punya akun? <Link to="/register" className="font-semibold text-gycora hover:underline">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}