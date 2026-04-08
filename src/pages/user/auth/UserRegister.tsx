import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Ganti import next
import Swal from "sweetalert2";

export default function UserRegister() {
  const navigate = useNavigate(); // Ganti useRouter
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      Swal.fire("Peringatan", "Password minimal harus 8 karakter.", "warning");
      return;
    }
    
    if (formData.password !== formData.password_confirmation) {
      Swal.fire("Peringatan", "Konfirmasi password tidak cocok.", "warning");
      return;
    }

    setLoading(true);

    try {
      // Pastikan port disesuaikan dengan server API Anda nanti (misal 8000 untuk Laravel)
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const contentType = res.headers.get("content-type");
      let errorMessage = "Gagal melakukan registrasi.";

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil!",
          text: "Silakan login menggunakan akun baru Anda.",
          confirmButtonColor: "#059669",
        }).then(() => {
          navigate("/login"); // Ganti router.push
        });
      } else {
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await res.text(); 
        }
        Swal.fire("Registrasi Gagal", errorMessage, "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Gagal terhubung ke server backend.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-white">
      <div className="w-full max-w-md p-8 border border-gray-100 shadow-sm rounded-2xl">
        <h1 className="mb-2 text-3xl font-extrabold text-center text-gray-900">Daftar Akun</h1>
        <p className="mb-8 text-sm text-center text-gray-500">Bergabunglah dengan Gycora hari ini.</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Nama Depan</label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full p-3 transition-all border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Nama Belakang</label>
              <input
                type="text"
                name="last_name"
                required
                className="w-full p-3 transition-all border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 transition-all border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="w-full p-3 transition-all border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <input
              type="password"
              name="password_confirmation"
              required
              minLength={8}
              className="w-full p-3 transition-all border border-gray-300 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-4 py-3 mt-4 font-bold text-white transition-colors rounded-lg bg-gycora hover:bg-gycora-dark disabled:opacity-70"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Sudah punya akun? <Link to="/login" className="font-semibold text-gycora hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}