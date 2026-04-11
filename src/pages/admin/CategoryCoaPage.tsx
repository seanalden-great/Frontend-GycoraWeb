/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Category {
  id: number;
  category_name: string;
}

export default function CategoryCoaPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<{ id: number | null; category_name: string }>({
    id: null,
    category_name: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/category-coas`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (data: Category | null = null) => {
    setIsEdit(!!data);
    if (data) {
      setForm({ id: data.id, category_name: data.category_name });
    } else {
      setForm({ id: null, category_name: "" });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("admin_token");
      const url = isEdit
        ? `${BASE_URL}/api/admin/category-coas/${form.id}`
        : `${BASE_URL}/api/admin/category-coas`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowModal(false);
        fetchData();
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Kategori berhasil disimpan", showConfirmButton: false, timer: 1500 });
      } else {
        throw new Error("Validation failed or duplicate name");
      }
    } catch (err: any) {
      Swal.fire("Error", err.message || "Gagal menyimpan kategori", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Kategori?",
      text: "Kategori yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const token = localStorage.getItem("admin_token");
          const response = await fetch(`${BASE_URL}/api/admin/category-coas/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
          });

          if (response.ok) {
            fetchData();
            Swal.fire("Terhapus!", "Kategori telah dihapus.", "success");
          } else {
            const errData = await response.json();
            throw new Error(errData.message || "Gagal menghapus");
          }
        } catch (err: any) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  return (
    <div className="relative p-8 bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[500px] animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kategori COA</h1>
          <p className="text-sm text-gray-500">Kelola kategori untuk Chart of Accounts Anda.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-2 font-bold text-white transition shadow-sm rounded-xl bg-gycora hover:bg-gycora-dark"
        >
          + Tambah Kategori
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
              <th className="pb-4 pl-2 font-medium">ID</th>
              <th className="pb-4 font-medium">Nama Kategori</th>
              <th className="pb-4 pr-2 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {loading ? (
              <tr>
                <td colSpan={3} className="py-10 text-center text-gray-400 animate-pulse">Memuat data...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-10 italic text-center text-gray-400">Belum ada kategori.</td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="transition border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4 pl-2 font-mono text-gray-500">{cat.id}</td>
                  <td className="py-4 font-bold text-gray-900">{cat.category_name}</td>
                  <td className="py-4 pr-2 text-right">
                    <button onClick={() => openModal(cat)} className="mr-4 font-bold transition text-amber-500 hover:text-amber-600">
                      Edit
                    </button>
                    <button onClick={() => confirmDelete(cat.id)} className="font-bold text-red-500 transition hover:text-red-600">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-[2rem]">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900">
              {isEdit ? "Edit Kategori" : "Kategori Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Nama Kategori</label>
                <input
                  value={form.category_name}
                  onChange={(e) => setForm({ ...form, category_name: e.target.value })}
                  type="text"
                  className="w-full p-3 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 font-bold text-gray-500 transition rounded-xl hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 font-bold text-white transition shadow-md bg-gycora rounded-xl hover:bg-gycora-dark disabled:opacity-50 shadow-gycora/20"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}