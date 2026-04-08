/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ganti dari next/navigation
import Swal from "sweetalert2";

interface Address {
  id: number;
  receiver: { first_name: string; last_name: string; full_name: string };
  details: {
    region: string;
    address_location: string;
    type: string;
    city: string;
    province: string;
    postal_code: string;
    latitude: string;
    longitude: string;
  };
  is_default: boolean;
}

export default function UserProfile() {
  const navigate = useNavigate(); // Ganti useRouter
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  // --- State Modal Alamat ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    region: "",
    first_name_address: "",
    last_name_address: "",
    address_location: "",
    city: "",
    province: "",
    postal_code: "",
    location_type: "home",
    latitude: "",
    longitude: "",
    is_default: false,
  });

  // --- State Modal Edit Profil ---
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const storedUser = localStorage.getItem("user_data");

    if (!token || !storedUser) {
      navigate("/login"); // Ganti router.push
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchAddresses(token);
  }, [navigate]); // Tambahkan navigate ke dependency array

  const fetchAddresses = async (token: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        // --- PERBAIKAN DI SINI ---
        const addressArray = data.data ? data.data : data; 
        setAddresses(addressArray || []);
      }
    } catch (error) {
      console.error("Gagal load alamat", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers untuk Profil ---
  const handleOpenProfileModal = () => {
    setProfileFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone || "",
    });
    setIsProfileModalOpen(true);
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileFormData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Profil Diperbarui!",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsProfileModalOpen(false);

        setUser(data.user);
        localStorage.setItem("user_data", JSON.stringify(data.user));

        // Memaksa reload agar Header membaca nama baru dari localStorage
        setTimeout(() => window.location.reload(), 1500);
      } else {
        Swal.fire("Gagal", data.message || "Gagal memperbarui profil", "error");
      }
    } catch (error) {
      console.error("Gagal update profil:", error); // Tambahkan console.error agar linter tidak protes
      Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
    }
  };

  // --- Handlers untuk Alamat ---
  const handleOpenModal = (address: Address | null = null) => {
    if (address) {
      setEditingId(address.id);
      setFormData({
        region: address.details.region,
        first_name_address: address.receiver.first_name,
        last_name_address: address.receiver.last_name,
        address_location: address.details.address_location,
        city: address.details.city,
        province: address.details.province,
        postal_code: address.details.postal_code,
        location_type: address.details.type,
        latitude: address.details.latitude,
        longitude: address.details.longitude,
        is_default: address.is_default,
      });
    } else {
      setEditingId(null);
      setFormData({
        region: "",
        first_name_address: "",
        last_name_address: "",
        address_location: "",
        city: "",
        province: "",
        postal_code: "",
        location_type: "home",
        latitude: "",
        longitude: "",
        is_default: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://127.0.0.1:8000/api/addresses/${editingId}`
      : "http://127.0.0.1:8000/api/addresses";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: editingId ? "Alamat diperbarui." : "Alamat ditambahkan.",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsModalOpen(false);
        fetchAddresses(token!);
      } else {
        throw new Error("Gagal menyimpan alamat");
      }
    } catch (error) {
      console.error("Gagal submit alamat:", error);
      Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const result = await Swal.fire({
      title: "Hapus alamat?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Hapus",
    });
    if (result.isConfirmed) {
      const token = localStorage.getItem("user_token");
      await fetch(`http://127.0.0.1:8000/api/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses(token!);
      Swal.fire("Terhapus!", "Alamat telah dihapus.", "success");
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 font-sans bg-gray-50">
      <div className="max-w-5xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
        {/* --- PROFIL PENGGUNA --- */}
        <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-100 shadow-sm rounded-2xl md:flex-row md:items-start">
          <div className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white uppercase rounded-full shadow-md bg-gradient-to-tr from-gycora to-emerald-300 shrink-0">
            {user.first_name.charAt(0)}
            {user.last_name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
            <p className="mt-1 text-gray-500">{user.email}</p>
            <p className="mt-1 text-sm text-gray-500">
              {user.phone ? (
                user.phone
              ) : (
                <span className="italic">Belum ada nomor telepon</span>
              )}
            </p>
            <div className="inline-flex items-center px-3 py-1 mt-4 text-xs font-semibold border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
              Gycora Member
            </div>
          </div>
          <button
            onClick={handleOpenProfileModal}
            className="px-6 py-2 text-sm font-semibold text-gray-700 transition-colors border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
          >
            Edit Profil
          </button>
        </div>

        {/* --- BUKU ALAMAT (ADDRESS BOOK) --- */}
        <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-gray-900">
              Buku Alamat
            </h2>
            <button
              onClick={() => handleOpenModal()}
              className="px-5 py-2 text-sm font-bold text-white transition-all rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
            >
              + Tambah Alamat
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="py-12 text-center border border-gray-300 border-dashed bg-gray-50 rounded-xl">
              <p className="font-medium text-gray-500">
                Anda belum memiliki alamat tersimpan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`relative p-6 rounded-xl border-2 transition-all ${addr.is_default ? "border-gycora bg-emerald-50/30" : "border-gray-200 hover:border-gray-300"}`}
                >
                  {addr.is_default && (
                    <span className="absolute top-4 right-4 bg-gycora text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm">
                      Utama
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-bold text-gray-500 uppercase bg-gray-100 rounded">
                      {addr.details.type === "home"
                        ? "Rumah"
                        : addr.details.type === "office"
                          ? "Kantor"
                          : "Lainnya"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {addr.receiver.full_name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {addr.details.address_location} <br /> {addr.details.city},{" "}
                    {addr.details.province} <br /> {addr.details.postal_code}
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-500">
                    Region: {addr.details.region}
                  </p>
                  <div className="flex items-center gap-4 pt-4 mt-6 border-t border-gray-100">
                    <button
                      onClick={() => handleOpenModal(addr)}
                      className="text-sm font-bold transition-colors text-gycora hover:text-gycora-dark"
                    >
                      Edit
                    </button>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-sm font-bold text-red-500 transition-colors hover:text-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL FORM EDIT PROFIL */}
      {/* ======================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Ubah Profil</h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmitProfile} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    required
                    value={profileFormData.first_name}
                    onChange={(e) =>
                      setProfileFormData({
                        ...profileFormData,
                        first_name: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    required
                    value={profileFormData.last_name}
                    onChange={(e) =>
                      setProfileFormData({
                        ...profileFormData,
                        last_name: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={profileFormData.email}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={profileFormData.phone}
                  onChange={(e) =>
                    setProfileFormData({
                      ...profileFormData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-5 py-2 text-sm font-bold text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold text-white transition-colors rounded-full shadow-md bg-gycora hover:bg-gycora-dark"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* MODAL FORM ALAMAT */}
      {/* ======================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Alamat" : "Tambah Alamat Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={handleSubmitAddress}
              className="flex-1 p-6 space-y-6 overflow-y-auto"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Nama Depan Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.first_name_address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_name_address: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Nama Belakang Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.last_name_address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        last_name_address: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Label Alamat (Rumah/Kantor)
                </label>
                <select
                  value={formData.location_type}
                  onChange={(e) =>
                    setFormData({ ...formData, location_type: e.target.value })
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none bg-white"
                >
                  <option value="home">Rumah</option>
                  <option value="office">Kantor</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Alamat Lengkap (Jalan, RT/RW, Patokan)
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.address_location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address_location: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none resize-none"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.province}
                    onChange={(e) =>
                      setFormData({ ...formData, province: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Kecamatan / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.region}
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postal_code}
                    onChange={(e) =>
                      setFormData({ ...formData, postal_code: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gycora outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-100">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={formData.is_default}
                  onChange={(e) =>
                    setFormData({ ...formData, is_default: e.target.checked })
                  }
                  className="w-5 h-5 rounded cursor-pointer text-gycora focus:ring-gycora accent-gycora"
                />
                <label
                  htmlFor="is_default"
                  className="text-sm font-bold cursor-pointer select-none text-emerald-800"
                >
                  Jadikan sebagai alamat utama
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-full shadow-lg transition-colors"
                >
                  {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
