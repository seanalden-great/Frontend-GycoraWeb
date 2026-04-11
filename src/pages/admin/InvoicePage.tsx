/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Invoice {
  id: number;
  no_invoice: string;
  supplier_id: number;
  amount: number;
  deadline_invoice: string;
  payment_status: "Paid" | "Not Yet";
  image_invoice?: string;
  image_proof?: string;
  supplier?: { name: string };
}

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [coasList, setCoasList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "pay">("add");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [form, setForm] = useState<any>({});
  const [fileInvoice, setFileInvoice] = useState<File | null>(null);
  const [fileProof, setFileProof] = useState<File | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const [invRes, supRes, coaRes] = await Promise.all([
        fetch(`${BASE_URL}/api/admin/invoices`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
        fetch(`${BASE_URL}/api/admin/suppliers`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
        fetch(`${BASE_URL}/api/admin/coas`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
      ]);
      
      if (invRes.ok) setInvoices(await invRes.json());
      if (supRes.ok) setSuppliers((await supRes.json()).suppliers || []);
      if (coaRes.ok) setCoasList(await coaRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return invoices.filter((inv) => {
      const matchSearch =
        inv.no_invoice.toLowerCase().includes(query) ||
        (inv.supplier?.name && inv.supplier.name.toLowerCase().includes(query));
      const matchStatus = statusFilter === "All" ? true : inv.payment_status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

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
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, itemsPerPage]);

  const openModal = (mode: "add" | "edit" | "pay", data: any = null) => {
    setModalMode(mode);
    setFileInvoice(null);
    setFileProof(null);

    if (data) {
      const formData = { ...data };
      if (formData.date) formData.date = formData.date.slice(0, 16);
      if (formData.deadline_invoice) formData.deadline_invoice = formData.deadline_invoice.slice(0, 16);
      if (mode === "pay") {
        formData.payment_date = new Date().toISOString().split("T")[0];
      }
      setForm(formData);
    } else {
      setForm({ date: "", deadline_invoice: "", amount: "" });
    }
    setShowModal(true);
  };

  // --- FUNGSI UPLOAD S3 VIA PRESIGNED URL ---
  const uploadToS3WithPresignedUrl = async (file: File): Promise<string> => {
    const token = localStorage.getItem("admin_token");
    const ext = file.name.split('.').pop();
    const contentType = file.type;

    // 1. Dapatkan Pre-signed URL dari Laravel
    const presignedRes = await fetch(`${BASE_URL}/api/admin/presigned-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ extension: ext, content_type: contentType })
    });
    
    if (!presignedRes.ok) throw new Error("Gagal mengambil S3 URL");
    const { upload_url, upload_headers, file_url } = await presignedRes.json();

    // 2. Upload file langsung ke S3
    const s3UploadRes = await fetch(upload_url, {
      method: "PUT",
      body: file,
      headers: { ...upload_headers, "Content-Type": contentType, "x-amz-acl": "public-read" }
    });

    if (!s3UploadRes.ok) throw new Error("Gagal upload file ke S3");

    return file_url; // Kembalikan URL publik
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("admin_token");

    try {
      let invoiceImageUrl = form.image_invoice;
      let proofUrl = form.image_proof;

      // Proses Upload Gambar Invoice (Jika ada file baru)
      if (fileInvoice) {
        Swal.fire({ title: "Mengunggah Dokumen...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        invoiceImageUrl = await uploadToS3WithPresignedUrl(fileInvoice);
      }

      // Proses Upload Bukti Bayar (Hanya di mode Pay)
      if (modalMode === "pay" && fileProof) {
        Swal.fire({ title: "Mengunggah Bukti Bayar...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        proofUrl = await uploadToS3WithPresignedUrl(fileProof);
      }

      const payload = {
        ...form,
        image_invoice: invoiceImageUrl,
        image_proof: proofUrl,
      };

      Swal.fire({ title: "Menyimpan Data...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      let url = "";
      let method = "POST";

      if (modalMode === "add") {
        url = `${BASE_URL}/api/admin/invoices`;
      } else if (modalMode === "edit") {
        url = `${BASE_URL}/api/admin/invoices/${form.id}`;
        method = "PUT";
      } else if (modalMode === "pay") {
        url = `${BASE_URL}/api/admin/invoices/${form.id}/pay`;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, Accept: "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      setShowModal(false);
      fetchData();
      Swal.fire({ toast: true, icon: "success", title: "Berhasil", timer: 1500, showConfirmButton: false, position: "top-end" });
    } catch (e: any) {
      console.error(e);
      Swal.fire("Error", e.message || "Operasi gagal", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Invoice?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Ya, Hapus",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const token = localStorage.getItem("admin_token");
          const response = await fetch(`${BASE_URL}/api/admin/invoices/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            fetchData();
          } else {
            throw new Error("Gagal menghapus");
          }
        } catch (e) {
          Swal.fire("Error", "Gagal menghapus", "error");
        }
      }
    });
  };

  const formatPrice = (v: number) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(v || 0);
  const formatDate = (date: string) => date ? new Date(date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-";

  return (
    <div className="relative p-8 bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px] animate-fade-in">
      
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 bg-white/60 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-4 pb-6 mb-8 border-b border-gray-100 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tagihan Supplier</h1>
          <p className="text-sm text-gray-500">Kelola hutang usaha dan upload bukti pembayaran.</p>
        </div>
        <button onClick={() => openModal("add")} className="px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition rounded-xl bg-gycora hover:bg-gycora-dark">
          + Invoice Baru
        </button>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <div className="flex items-center w-full gap-4 md:w-auto">
          <input
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            type="text" placeholder="Cari No Invoice atau Supplier..."
            className="w-full px-4 py-2 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora md:w-64"
          />
          <select
            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
          >
            <option value="All">Semua Status</option>
            <option value="Not Yet">Belum Lunas</option>
            <option value="Paid">Lunas</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">Tampilkan:</span>
          <select
            value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
          >
            <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-200 bg-gray-50">
              <th className="p-4 rounded-tl-xl">Info Invoice</th>
              <th className="p-4">Supplier</th>
              <th className="p-4 text-right">Nominal (Rp)</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center rounded-tr-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {paginatedData.map((inv) => (
              <tr key={inv.id} className="transition border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-mono font-bold text-gray-800">{inv.no_invoice}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Tenggat: {formatDate(inv.deadline_invoice)}</p>
                </td>
                <td className="p-4 font-bold text-gray-800">{inv.supplier?.name}</td>
                <td className="p-4 text-base font-black text-right">{formatPrice(inv.amount)}</td>
                <td className="p-4 text-center">
                  {inv.payment_status === "Paid" ? (
                    <span className="px-3 py-1 font-bold tracking-widest uppercase rounded-md text-[10px] bg-emerald-100 text-emerald-700">Lunas</span>
                  ) : (
                    <span className="px-3 py-1 font-bold tracking-widest uppercase rounded-md text-[10px] bg-amber-100 text-amber-700">Belum</span>
                  )}
                </td>
                <td className="p-4 space-x-3 text-center">
                  {inv.image_invoice && (
                    <a href={inv.image_invoice} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-500 uppercase transition hover:text-blue-700">Doc</a>
                  )}
                  {inv.payment_status === "Not Yet" && (
                    <button onClick={() => openModal("pay", inv)} className="text-xs font-bold uppercase transition text-emerald-600 hover:text-emerald-800">Bayar</button>
                  )}
                  {inv.payment_status === "Paid" && inv.image_proof && (
                    <a href={inv.image_proof} target="_blank" rel="noreferrer" className="text-xs font-bold text-purple-600 uppercase transition hover:text-purple-800">Bukti</a>
                  )}
                  <button onClick={() => openModal("edit", inv)} className="text-xs font-bold uppercase transition text-amber-500 hover:text-amber-600">Edit</button>
                  <button onClick={() => confirmDelete(inv.id)} className="text-xs font-bold text-red-500 uppercase transition hover:text-red-600">Del</button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr><td colSpan={5} className="py-16 italic text-center text-gray-400">Tidak ada tagihan ditemukan.</td></tr>
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
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              {modalMode === "add" ? "Buat Invoice Baru" : modalMode === "edit" ? "Edit Invoice" : "Proses Pembayaran"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {(modalMode === "add" || modalMode === "edit") && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">No. Invoice</label>
                      <input value={form.no_invoice} onChange={e => setForm({...form, no_invoice: e.target.value})} type="text" className="w-full p-3 text-sm transition border outline-none bg-gray-50 rounded-xl focus:border-gycora" required/>
                    </div>
                    <div>
                      <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Supplier</label>
                      <select value={form.supplier_id} onChange={e => setForm({...form, supplier_id: e.target.value})} className="w-full p-3 text-sm transition border outline-none bg-gray-50 rounded-xl focus:border-gycora" required>
                        <option value="" disabled>Pilih Supplier</option>
                        {suppliers.map(sup => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Tanggal</label>
                      <input value={form.date} onChange={e => setForm({...form, date: e.target.value})} type="datetime-local" className="w-full p-3 text-sm transition border outline-none bg-gray-50 rounded-xl focus:border-gycora" required/>
                    </div>
                    <div>
                      <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Jatuh Tempo</label>
                      <input value={form.deadline_invoice} onChange={e => setForm({...form, deadline_invoice: e.target.value})} type="datetime-local" className="w-full p-3 text-sm transition border outline-none bg-gray-50 rounded-xl focus:border-gycora" required/>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Nominal (Rp)</label>
                    <input value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} type="number" className="w-full p-3 font-mono text-lg font-black transition border outline-none bg-gray-50 rounded-xl focus:border-gycora" required/>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-4 border border-gray-200 bg-gray-50/50 rounded-xl">
                    <div>
                      <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Akun Debit (Tujuan)</label>
                      <select value={form.debit_coa_id} onChange={e => setForm({...form, debit_coa_id: e.target.value})} className="w-full p-2 text-sm bg-white border rounded-lg outline-none" required>
                        <option value="" disabled>Pilih COA</option>
                        {coasList.map(coa => <option key={coa.id} value={coa.id}>[{coa.coa_no}] {coa.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Akun Kredit (Asal)</label>
                      <select value={form.kredit_coa_id} onChange={e => setForm({...form, kredit_coa_id: e.target.value})} className="w-full p-2 text-sm bg-white border rounded-lg outline-none" required>
                        <option value="" disabled>Pilih COA</option>
                        {coasList.map(coa => <option key={coa.id} value={coa.id}>[{coa.coa_no}] {coa.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Dokumen Tagihan (Gambar/PDF)</label>
                    <input type="file" onChange={e => setFileInvoice(e.target.files?.[0] || null)} className="w-full mt-1 text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" required={modalMode === "add"}/>
                  </div>
                </>
              )}

              {modalMode === "pay" && (
                <>
                  <div className="p-4 mb-4 border border-blue-100 bg-blue-50 rounded-xl">
                    <p className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Pembayaran Tagihan</p>
                    <p className="text-lg font-black text-blue-700">{form.no_invoice} - Rp {formatPrice(form.amount)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Tanggal Bayar</label>
                      <input value={form.payment_date} onChange={e => setForm({...form, payment_date: e.target.value})} type="date" className="w-full p-3 text-sm transition border outline-none bg-gray-50 rounded-xl focus:border-gycora" required/>
                    </div>
                    <div>
                      <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Metode Pembayaran</label>
                      <input value={form.payment_method} onChange={e => setForm({...form, payment_method: e.target.value})} type="text" placeholder="Transfer BCA, Tunai, dll" className="w-full p-3 text-sm transition border outline-none bg-gray-50 rounded-xl focus:border-gycora" required/>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Bukti Pembayaran</label>
                    <input type="file" onChange={e => setFileProof(e.target.files?.[0] || null)} className="w-full mt-1 text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" required/>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4 mt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-gray-500 transition rounded-xl hover:bg-gray-100">Batal</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 font-bold text-white transition shadow-md bg-gycora disabled:opacity-50 rounded-xl hover:bg-gycora-dark shadow-gycora/20">
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