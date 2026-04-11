/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Category {
  id: number;
  category_name: string;
}

interface Coa {
  id: number;
  name: string;
  coa_no: string;
  category?: Category;
  coa_category_id: number;
  type: "Debit" | "Kredit";
  amount: number | string;
  debit: number;
  credit: number;
  date: string;
  description: string;
  posted: boolean;
}

export default function CoaPage() {
  const [coas, setCoas] = useState<Coa[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<{
    id: number | null;
    name: string;
    coa_no: string;
    coa_category_id: number | string;
    type: "Debit" | "Kredit";
    amount: number | string;
    date: string;
    description: string;
  }>({
    id: null,
    name: "",
    coa_no: "",
    coa_category_id: "",
    type: "Debit",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const totalDebit = useMemo(() => {
    return coas.reduce((acc, curr) => acc + parseFloat(curr.debit?.toString() || "0"), 0);
  }, [coas]);

  const totalCredit = useMemo(() => {
    return coas.reduce((acc, curr) => acc + parseFloat(curr.credit?.toString() || "0"), 0);
  }, [coas]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const [resCoas, resCat] = await Promise.all([
        fetch(`${BASE_URL}/api/admin/coas`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${BASE_URL}/api/admin/category-coas`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (resCoas.ok && resCat.ok) {
        setCoas(await resCoas.json());
        setCategories(await resCat.json());
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

  const openModal = (data: Coa | null = null) => {
    setIsEdit(!!data);
    if (data) {
      setForm({
        id: data.id,
        name: data.name,
        coa_no: data.coa_no,
        coa_category_id: data.coa_category_id,
        type: data.type,
        amount: data.type === "Debit" ? data.debit : data.credit,
        date: data.date ? data.date.split("T")[0] : new Date().toISOString().split("T")[0],
        description: data.description || "",
      });
    } else {
      setForm({
        id: null,
        name: "",
        coa_no: "",
        coa_category_id: "",
        type: "Debit",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("admin_token");
      const url = isEdit ? `${BASE_URL}/api/admin/coas/${form.id}` : `${BASE_URL}/api/admin/coas`;
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
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Jurnal berhasil disimpan", showConfirmButton: false, timer: 1500 });
      } else {
        throw new Error("Validation failed");
      }
    } catch (err) {
      Swal.fire("Error", "Validasi gagal atau nomor akun duplikat.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Jurnal?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const token = localStorage.getItem("admin_token");
          const response = await fetch(`${BASE_URL}/api/admin/coas/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            fetchData();
          } else {
            throw new Error("Terkunci");
          }
        } catch (err) {
          Swal.fire("Error", "Gagal menghapus. Kemungkinan jurnal ini sudah di-Post.", "error");
        }
      }
    });
  };

  const postEntry = (id: number) => {
    Swal.fire({
      title: "Posting Jurnal?",
      text: "Jurnal yang telah di-Post akan terkunci permanen (tidak dapat diedit atau dihapus).",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Ya, Posting!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const token = localStorage.getItem("admin_token");
          const response = await fetch(`${BASE_URL}/api/admin/coas/${id}/post`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            fetchData();
            Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Jurnal di-Posting", showConfirmButton: false, timer: 1500 });
          } else {
            throw new Error("Gagal mem-posting");
          }
        } catch (err) {
          Swal.fire("Error", "Gagal mem-posting entri.", "error");
        }
      }
    });
  };

  const formatPrice = (v: number) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(v || 0);
  const formatDate = (date: string) => (date ? new Date(date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-");

  return (
    <div className="relative p-8 bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px] animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-4 pb-6 mb-8 border-b border-gray-100 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Chart of Accounts</h1>
          <p className="text-sm text-gray-500">Kelola catatan keuangan dan jurnal akuntansi Anda.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/category-coas"
            className="flex items-center px-6 py-2 text-xs font-bold tracking-widest text-gray-700 uppercase transition bg-gray-100 rounded-xl hover:bg-gray-200"
          >
            Kategori
          </Link>
          <button
            onClick={() => openModal()}
            className="px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition shadow-sm bg-gycora hover:bg-gycora-dark rounded-xl"
          >
            + Jurnal Baru
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-200 bg-gray-50">
              <th className="p-4 rounded-tl-xl">Nomor COA</th>
              <th className="p-4">Nama Akun</th>
              <th className="p-4">Kategori</th>
              <th className="p-4 text-right">Debit (Rp)</th>
              <th className="p-4 text-right">Kredit (Rp)</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center rounded-tr-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {loading ? (
               <tr>
                 <td colSpan={7} className="py-16 text-center text-gray-400 animate-pulse">Memuat jurnal...</td>
               </tr>
            ) : coas.length === 0 ? (
               <tr>
                 <td colSpan={7} className="py-16 italic text-center text-gray-400">Belum ada catatan jurnal.</td>
               </tr>
            ) : (
              coas.map((coa) => (
                <tr key={coa.id} className="transition border-b group border-gray-50 hover:bg-gray-50">
                  <td className="p-4 font-mono font-bold text-gray-900">{coa.coa_no}</td>
                  <td className="p-4">
                    <p className="font-bold text-gray-900 uppercase">{coa.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{formatDate(coa.date)}</p>
                  </td>
                  <td className="p-4 text-xs font-bold text-gray-500 uppercase">
                    {coa.category?.category_name || "-"}
                  </td>
                  <td className="p-4 font-mono font-medium text-right text-emerald-600">
                    {coa.debit > 0 ? formatPrice(coa.debit) : "-"}
                  </td>
                  <td className="p-4 font-mono font-medium text-right text-red-500">
                    {coa.credit > 0 ? formatPrice(coa.credit) : "-"}
                  </td>
                  <td className="p-4 text-center">
                    {coa.posted ? (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">Posted</span>
                    ) : (
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">Draft</span>
                    )}
                  </td>
                  <td className="p-4 space-x-3 text-center">
                    {!coa.posted ? (
                      <>
                        <button onClick={() => postEntry(coa.id)} className="text-xs font-bold uppercase transition text-emerald-600 hover:text-emerald-800">Post</button>
                        <button onClick={() => openModal(coa)} className="text-xs font-bold uppercase transition text-amber-500 hover:text-amber-700">Edit</button>
                        <button onClick={() => confirmDelete(coa.id)} className="text-xs font-bold text-red-500 uppercase transition hover:text-red-700">Del</button>
                      </>
                    ) : (
                      <span className="text-xs italic text-gray-300">Terkunci</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="font-bold border-t-2 border-gray-200 bg-gray-50">
            <tr>
              <td colSpan={3} className="p-4 text-xs tracking-widest text-right text-gray-500 uppercase">Total Balance</td>
              <td className="p-4 font-mono text-lg font-black text-right text-emerald-700">{formatPrice(totalDebit)}</td>
              <td className="p-4 font-mono text-lg font-black text-right text-red-600">{formatPrice(totalCredit)}</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto transition-opacity bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="w-full max-w-2xl p-8 my-8 bg-white shadow-2xl rounded-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{isEdit ? "Edit Jurnal" : "Jurnal Baru"}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Nomor COA</label>
                  <input 
                    type="text" required placeholder="Contoh: 1-1000" 
                    value={form.coa_no} onChange={(e) => setForm({ ...form, coa_no: e.target.value })}
                    className="w-full p-3 font-mono text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Nama Akun</label>
                  <input 
                    type="text" required placeholder="Contoh: Cash in Bank" 
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 text-sm uppercase transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Kategori</label>
                  <select 
                    required value={form.coa_category_id} 
                    onChange={(e) => setForm({ ...form, coa_category_id: e.target.value })}
                    className="w-full p-3 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Tanggal Transaksi</label>
                  <input 
                    type="date" required 
                    value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-3 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 py-4 my-4 border-t border-b border-gray-100 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Tipe Jurnal</label>
                  <div className="flex gap-6 mt-1">
                    <label className="flex items-center gap-2 font-bold text-gray-800 cursor-pointer select-none">
                      <input 
                        type="radio" name="type" value="Debit" 
                        checked={form.type === "Debit"} onChange={() => setForm({ ...form, type: "Debit" })}
                        className="w-5 h-5 cursor-pointer text-gycora focus:ring-gycora accent-gycora" 
                      />
                      Debit
                    </label>
                    <label className="flex items-center gap-2 font-bold text-gray-800 cursor-pointer select-none">
                      <input 
                        type="radio" name="type" value="Kredit" 
                        checked={form.type === "Kredit"} onChange={() => setForm({ ...form, type: "Kredit" })}
                        className="w-5 h-5 cursor-pointer text-gycora focus:ring-gycora accent-gycora" 
                      />
                      Kredit
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Nominal (Rp)</label>
                  <input 
                    type="number" required min="0"
                    value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full p-3 font-mono text-lg font-bold transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" 
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Deskripsi / Catatan Tambahan</label>
                <textarea 
                  rows={2} 
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 text-sm transition border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-gray-500 transition rounded-xl hover:bg-gray-100">Batal</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 font-bold text-white transition shadow-md bg-gycora rounded-xl hover:bg-gycora-dark disabled:opacity-50 shadow-gycora/20">
                  Simpan Jurnal
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}