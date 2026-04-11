/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Supplier {
  id: number;
  name: string;
  no_telp: string;
  email: string;
  address: string;
  city: string;
  province: string;
  post_code: string;
  accountnumber: string;
  accountnumber_holders_name: string;
  bank_name: string;
  description: string;
}

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [stats, setStats] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [form, setForm] = useState({
    id: null as number | null,
    name: "",
    no_telp: "",
    email: "",
    bank_name: "",
    accountnumber: "",
    accountnumber_holders_name: "",
    address: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/suppliers`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      
      if (res.ok) {
        const data = await res.json();
        setSuppliers(data.suppliers || []);
        setStats(data.stats || {});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return suppliers.filter((s) => s.name.toLowerCase().includes(query));
  }, [suppliers, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const showingStart = filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, filteredData.length);

  const visiblePages = useMemo(() => {
    const total = totalPages;
    const current = currentPage;
    const maxVisible = 7;

    if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  const openModal = (data: any = null) => {
    setIsEdit(!!data);
    if (data) {
      setForm({ ...data });
    } else {
      setForm({ id: null, name: "", no_telp: "", email: "", bank_name: "", accountnumber: "", accountnumber_holders_name: "", address: "" });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const url = isEdit ? `${BASE_URL}/api/admin/suppliers/${form.id}` : `${BASE_URL}/api/admin/suppliers`;
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
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Supplier disimpan", showConfirmButton: false, timer: 1500 });
      } else {
        throw new Error("Gagal menyimpan");
      }
    } catch (err) {
      Swal.fire("Error", "Validasi gagal. Pastikan email belum digunakan.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Supplier?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Ya",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const token = localStorage.getItem("admin_token");
          const response = await fetch(`${BASE_URL}/api/admin/suppliers/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            fetchData();
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

  const formatPrice = (v: number) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(v || 0);

  return (
    <div className="relative p-8 bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px] animate-fade-in">
      
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 bg-white/60 backdrop-blur-sm rounded-2xl">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
        <div className="p-4 border border-gray-100 bg-gray-50 rounded-xl">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Supplier</p>
          <p className="mt-1 text-2xl font-black">{stats.total_supplier || 0}</p>
        </div>
        <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
          <p className="text-[10px] text-blue-500 uppercase tracking-widest font-bold">Total Invoices</p>
          <p className="mt-1 text-2xl font-black text-blue-700">{stats.total_invoice || 0}</p>
        </div>
        <div className="p-4 border bg-amber-50 border-amber-100 rounded-xl">
          <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Unpaid Invoices</p>
          <p className="mt-1 text-2xl font-black text-amber-700">{stats.unpaid_invoice || 0}</p>
        </div>
        <div className="p-4 border bg-emerald-50 border-emerald-100 rounded-xl">
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Total Value (Rp)</p>
          <p className="mt-1 text-xl font-black text-emerald-700">{formatPrice(stats.total_nominal || 0)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
            type="text" placeholder="Cari Nama Supplier..." 
            className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora" 
          />
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} 
            className="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
          >
            <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option>
          </select>
          <button onClick={() => openModal()} className="px-4 py-2 text-sm font-bold text-white transition rounded-xl bg-gycora hover:bg-gycora-dark">
            + Tambah Supplier
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100">
              <th className="pb-4">Nama Supplier</th>
              <th className="pb-4">Kontak</th>
              <th className="pb-4">Akun Bank</th>
              <th className="pb-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {paginatedData.map((sup) => (
              <tr key={sup.id} className="transition border-b border-gray-50 hover:bg-gray-50">
                <td className="py-4 font-bold text-gray-800">{sup.name}</td>
                <td className="py-4">
                  <p>{sup.email}</p>
                  <p className="text-xs text-gray-400">{sup.no_telp}</p>
                </td>
                <td className="py-4">
                  <p className="font-bold">{sup.bank_name || '-'}</p>
                  <p className="font-mono text-xs">{sup.accountnumber || '-'}</p>
                </td>
                <td className="py-4 space-x-3 text-center">
                  <button onClick={() => openModal(sup)} className="text-xs font-bold uppercase transition text-amber-500 hover:text-amber-600">Edit</button>
                  <button onClick={() => confirmDelete(sup.id)} className="text-xs font-bold text-red-500 uppercase transition hover:text-red-600">Del</button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr><td colSpan={4} className="py-10 italic text-center text-gray-400">Tidak ada supplier ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row">
          <p className="text-sm text-gray-400">Menampilkan <span className="font-bold text-black">{showingStart}</span> hingga <span className="font-bold text-black">{showingEnd}</span> dari <span className="font-bold text-black">{filteredData.length}</span></p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">Prev</button>
            <div className="flex gap-1">
              {visiblePages.map((page, index) => (
                <button key={index} onClick={() => typeof page === 'number' ? setCurrentPage(page) : null} disabled={page === '...'} className={`w-10 h-10 rounded-xl font-medium transition flex items-center justify-center text-sm ${currentPage === page ? 'bg-black text-white border-black' : 'hover:bg-gray-50 border-gray-200'} ${page === '...' ? 'cursor-default border-transparent hover:bg-transparent' : 'border'}`}>{page}</button>
              ))}
            </div>
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">Next</button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto transition-opacity bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="w-full max-w-2xl p-8 my-8 bg-white shadow-2xl rounded-3xl">
            <h2 className="mb-6 text-xl font-bold text-gray-900">{isEdit ? "Edit Supplier" : "Tambah Supplier"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Nama</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} type="text" className="w-full p-3 transition border outline-none bg-gray-50 rounded-xl focus:border-gycora focus:ring-1 focus:ring-gycora" required/></div>
                <div><label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Telepon</label><input value={form.no_telp} onChange={e => setForm({...form, no_telp: e.target.value})} type="text" className="w-full p-3 transition border outline-none bg-gray-50 rounded-xl focus:border-gycora focus:ring-1 focus:ring-gycora" required/></div>
                <div><label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Email</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" className="w-full p-3 transition border outline-none bg-gray-50 rounded-xl focus:border-gycora focus:ring-1 focus:ring-gycora" required/></div>
                <div><label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Nama Bank</label><input value={form.bank_name} onChange={e => setForm({...form, bank_name: e.target.value})} type="text" className="w-full p-3 transition border outline-none bg-gray-50 rounded-xl focus:border-gycora focus:ring-1 focus:ring-gycora" /></div>
                <div><label className="text-xs font-bold tracking-widest text-gray-500 uppercase">No. Rekening</label><input value={form.accountnumber} onChange={e => setForm({...form, accountnumber: e.target.value})} type="text" className="w-full p-3 transition border outline-none bg-gray-50 rounded-xl focus:border-gycora focus:ring-1 focus:ring-gycora" /></div>
                <div><label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Nama Pemilik Rek.</label><input value={form.accountnumber_holders_name} onChange={e => setForm({...form, accountnumber_holders_name: e.target.value})} type="text" className="w-full p-3 transition border outline-none bg-gray-50 rounded-xl focus:border-gycora focus:ring-1 focus:ring-gycora" /></div>
              </div>
              <div><label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Alamat Lengkap</label><textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} rows={2} className="w-full p-3 transition border outline-none resize-none bg-gray-50 rounded-xl focus:border-gycora focus:ring-1 focus:ring-gycora"></textarea></div>
              <div className="flex gap-4 pt-4 mt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-gray-500 transition rounded-xl hover:bg-gray-100">Batal</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 font-bold text-white transition shadow-md bg-gycora rounded-xl disabled:opacity-50 hover:bg-gycora-dark shadow-gycora/20">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}