/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Coa {
  id: number;
  coa_no: string;
  name: string;
}

interface Payment {
  id: number;
  no_transaction: string;
  recipient_name: string;
  amount: number;
  date: string;
  type: "receive" | "transfer";
  description: string;
  debit_coa?: Coa;
  kredit_coa?: Coa;
}

export default function TransferReceivePage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [coasList, setCoasList] = useState<Coa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [form, setForm] = useState({
    id: null as number | null,
    kredit_coa_id: "",
    debit_coa_id: "",
    recipient_name: "",
    amount: "",
    date: "",
    type: "receive",
    description: "",
  });

  // --- Fetch Initial Data ---
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const [resPayments, resCoas] = await Promise.all([
        fetch(`${BASE_URL}/api/admin/payments`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${BASE_URL}/api/admin/coas`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (resPayments.ok && resCoas.ok) {
        setPayments(await resPayments.json());
        setCoasList(await resCoas.json());
      }
    } catch (error) {
      console.error("Gagal mengambil data", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Computed Properties for Filtering & Pagination ---
  const filteredPayments = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return payments.filter((p) => {
      const matchSearch =
        (p.no_transaction && p.no_transaction.toLowerCase().includes(query)) ||
        (p.recipient_name && p.recipient_name.toLowerCase().includes(query));

      const matchType = typeFilter === "all" ? true : p.type === typeFilter;

      return matchSearch && matchType;
    });
  }, [payments, searchQuery, typeFilter]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(start, start + itemsPerPage);
  }, [filteredPayments, currentPage, itemsPerPage]);

  const showingStart = filteredPayments.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, filteredPayments.length);

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
  }, [searchQuery, typeFilter, itemsPerPage]);

  // --- Actions ---
  const openModal = (data: any = null) => {
    setIsEdit(!!data);
    if (data) {
      // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
      const formattedDate = data.date ? new Date(data.date).toISOString().slice(0, 16) : "";
      setForm({ ...data, date: formattedDate });
    } else {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setForm({
        id: null,
        kredit_coa_id: "",
        debit_coa_id: "",
        recipient_name: "",
        amount: "",
        date: now.toISOString().slice(0, 16),
        type: "receive",
        description: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format date to string for backend (MySQL datetime format: YYYY-MM-DD HH:mm:ss)
    const payload = {
      ...form,
      date: form.date.replace("T", " ") + ":00",
    };

    try {
      const token = localStorage.getItem("admin_token");
      const url = isEdit ? `${BASE_URL}/api/admin/payments/${form.id}` : `${BASE_URL}/api/admin/payments`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchData();
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Pembayaran disimpan", showConfirmButton: false, timer: 1500 });
      } else {
        throw new Error("Validation failed");
      }
    } catch (err) {
      Swal.fire("Error", "Validasi gagal. Pastikan akun debit/kredit sudah dipilih.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Rekaman?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Ya, hapus",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const token = localStorage.getItem("admin_token");
          const response = await fetch(`${BASE_URL}/api/admin/payments/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            fetchData();
          } else {
            throw new Error("Gagal menghapus");
          }
        } catch (err) {
          Swal.fire("Error", "Gagal menghapus rekaman transaksi.", "error");
        }
      }
    });
  };

  // --- Helpers ---
  const formatPrice = (v: number) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(v || 0);
  const formatDate = (date: string) =>
    date ? new Date(date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";

  return (
    <div className="relative p-8 bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px] animate-fade-in">
      
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 bg-white/60 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
            <p className="mt-4 text-xs font-bold tracking-widest text-black uppercase animate-pulse">Loading Data...</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-4 pb-6 mb-8 border-b border-gray-100 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transfer & Receive</h1>
          <p className="text-sm text-gray-500">Kelola arus kas masuk dan keluar operasional.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-black shadow-sm rounded-xl hover:bg-gray-800"
        >
          + Record Payment
        </button>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <div className="flex items-center w-full gap-4 md:w-auto">
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Cari No. Transaksi atau Nama..."
              className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="py-2 pl-3 pr-8 text-sm border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
          >
            <option value="all">Semua Tipe</option>
            <option value="receive">Penerimaan (Receive)</option>
            <option value="transfer">Pengeluaran (Transfer)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">Tampilkan:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-200 bg-gray-50">
              <th className="p-4 rounded-tl-xl">Transaksi</th>
              <th className="p-4">Penerima/Pengirim</th>
              <th className="p-4">Debit (Ke)</th>
              <th className="p-4">Kredit (Dari)</th>
              <th className="p-4 text-right">Nominal (Rp)</th>
              <th className="p-4 text-center rounded-tr-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {paginatedPayments.map((payment) => (
              <tr key={payment.id} className="transition border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${payment.type === "receive" ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"}`}>
                      {payment.type === "receive" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      )}
                    </div>
                    <div>
                      <p className="font-mono font-bold text-gray-900">{payment.no_transaction}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{formatDate(payment.date)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-bold">{payment.recipient_name || "-"}</td>
                <td className="p-4">
                  <span className="px-2 py-1 font-mono text-xs bg-gray-100 rounded">{payment.debit_coa?.coa_no}</span>
                  <p className="w-32 mt-1 text-xs text-gray-500 truncate" title={payment.debit_coa?.name}>{payment.debit_coa?.name}</p>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 font-mono text-xs bg-gray-100 rounded">{payment.kredit_coa?.coa_no}</span>
                  <p className="w-32 mt-1 text-xs text-gray-500 truncate" title={payment.kredit_coa?.name}>{payment.kredit_coa?.name}</p>
                </td>
                <td className="p-4 text-base font-black text-right">{formatPrice(payment.amount)}</td>
                <td className="p-4 space-x-3 text-center">
                  <button onClick={() => openModal(payment)} className="text-xs font-bold uppercase transition text-amber-500 hover:underline hover:text-amber-600">Edit</button>
                  <button onClick={() => confirmDelete(payment.id)} className="text-xs font-bold text-red-500 uppercase transition hover:underline hover:text-red-600">Del</button>
                </td>
              </tr>
            ))}
            {paginatedPayments.length === 0 && (
              <tr>
                <td colSpan={6} className="py-16 italic text-center text-gray-400">Tidak ada data ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredPayments.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-8 border-t border-gray-100 md:flex-row">
          <p className="text-sm text-gray-400">
            Menampilkan <span className="font-bold text-black">{showingStart}</span> hingga{" "}
            <span className="font-bold text-black">{showingEnd}</span> dari{" "}
            <span className="font-bold text-black">{filteredPayments.length}</span> entri
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <div className="flex gap-1">
              {visiblePages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => (typeof page === "number" ? setCurrentPage(page) : null)}
                  disabled={page === "..."}
                  className={`w-10 h-10 rounded-xl font-medium transition flex items-center justify-center text-sm ${
                    currentPage === page ? "bg-black text-white border-black" : "hover:bg-gray-50 border-gray-200"
                  } ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto transition-opacity bg-black/50 backdrop-blur-sm animate-fade-in-up">
          <div className="w-full max-w-2xl p-8 my-8 bg-white shadow-2xl rounded-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{isEdit ? "Edit Rekaman" : "Pembayaran Baru"}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Tipe Transaksi</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as "receive" | "transfer" })}
                    className="w-full p-3 font-bold transition outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="receive">Penerimaan (Masuk)</option>
                    <option value="transfer">Pengeluaran (Keluar)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Tanggal & Waktu</label>
                  <input
                    type="datetime-local"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-3 transition outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Nama Penerima / Pengirim</label>
                <input
                  type="text"
                  placeholder="Nama orang atau perusahaan..."
                  value={form.recipient_name}
                  onChange={(e) => setForm({ ...form, recipient_name: e.target.value })}
                  className="w-full p-3 transition outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 border md:grid-cols-2 bg-gray-50/50 rounded-xl">
                <div>
                  <label className="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Akun Debit (Tujuan)</label>
                  <select
                    value={form.debit_coa_id}
                    onChange={(e) => setForm({ ...form, debit_coa_id: e.target.value })}
                    className="w-full p-3 transition bg-white border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="" disabled>Pilih COA Debit</option>
                    {coasList.map((coa) => (
                      <option key={coa.id} value={coa.id}>[{coa.coa_no}] {coa.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Akun Kredit (Asal)</label>
                  <select
                    value={form.kredit_coa_id}
                    onChange={(e) => setForm({ ...form, kredit_coa_id: e.target.value })}
                    className="w-full p-3 transition bg-white border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="" disabled>Pilih COA Kredit</option>
                    {coasList.map((coa) => (
                      <option key={coa.id} value={coa.id}>[{coa.coa_no}] {coa.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Nominal (Rp)</label>
                <input
                  type="number"
                  min="0"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full p-3 font-mono text-xl font-black text-black transition outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Deskripsi / Catatan Tambahan</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 transition outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-gray-500 transition hover:bg-gray-100 rounded-xl">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 font-bold text-white transition bg-black shadow-md disabled:opacity-50 rounded-xl shadow-black/20 hover:bg-gray-800">
                  Simpan Transaksi
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}