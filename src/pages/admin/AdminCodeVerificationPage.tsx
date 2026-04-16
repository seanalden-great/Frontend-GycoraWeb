/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

export default function AdminCodeVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) navigate("/admin/forgot-password", { replace: true });
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return Swal.fire("Perhatian", "Kode harus 6 digit", "warning");
    
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/forgot-password/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/admin/reset-password", { state: { email, code } });
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
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
        <h2 className="mb-2 text-2xl font-bold text-gycora">Verifikasi Admin</h2>
        <p className="mb-6 text-sm text-gray-500">Masukkan 6 digit kode OTP yang telah dikirimkan ke <span className="font-bold text-gray-800">{email}</span></p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Kode OTP</label>
            <input type="text" maxLength={6} required value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} className="w-full p-3 text-center tracking-[0.5em] text-xl bg-gray-50 font-bold border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gycora" placeholder="------" />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-gycora hover:bg-gycora-dark disabled:opacity-70">
            {loading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>
      </div>
    </div>
  );
}