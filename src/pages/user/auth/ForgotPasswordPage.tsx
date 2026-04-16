/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/forgot-password/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Terkirim!", text: data.message, confirmButtonColor: "#059669" });
        // Lempar ke halaman verifikasi dengan membawa email
        navigate("/verify-code", { state: { email } });
      } else {
        Swal.fire("Gagal", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan server", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Lupa Password?</h2>
        <p className="mb-6 text-sm text-gray-500">Masukkan email yang terdaftar. Kami akan mengirimkan 6 digit kode OTP untuk mengatur ulang password Anda.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora" placeholder="Contoh: user@gmail.com" />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-70">
            {loading ? "Mengirim..." : "Kirim Kode OTP"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-semibold text-gray-500 hover:text-gycora">Kembali ke Login</Link>
        </div>
      </div>
    </div>
  );
}