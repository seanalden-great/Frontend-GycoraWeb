/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email || !code) navigate("/forgot-password", { replace: true });
  }, [email, code, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      Swal.fire("Error", "Konfirmasi password tidak cocok.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/forgot-password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, code, password, password_confirmation: passwordConfirmation }),
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Berhasil", text: "Password Anda telah diubah. Silakan login kembali.", confirmButtonColor: "#059669" })
        .then(() => navigate("/login"));
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
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Buat Password Baru</h2>
        <p className="mb-6 text-sm text-gray-500">Silakan buat password baru yang kuat dan mudah Anda ingat.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password Baru</label>
            <input type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora" placeholder="Minimal 8 karakter" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
            <input type="password" minLength={8} required value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora" placeholder="Ulangi password baru" />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white transition-colors rounded-lg bg-gycora hover:bg-gycora-dark disabled:opacity-70">
            {loading ? "Menyimpan..." : "Simpan Password Baru"}
          </button>
        </form>
      </div>
    </div>
  );
}