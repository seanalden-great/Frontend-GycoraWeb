/* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { BASE_URL } from "../../config/api";
// import Swal from "sweetalert2";

// export default function AdminTreatments() {
//   const [treatments, setTreatments] = useState([]);
//   const [formData, setFormData] = useState({ title: "", price: "", image_url: "" });

//   const fetchTreatments = async () => {
//     const token = localStorage.getItem("admin_token");
//     // Gunakan endpoint index admin Anda
//     const res = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
//         headers: { "Authorization": `Bearer ${token}` }
//     });
//     if (res.ok) {
//         const data = await res.json();
//         setTreatments(data);
//     }
//   };

//   useEffect(() => {
//     fetchTreatments();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("admin_token");
    
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
//         method: "POST",
//         headers: { 
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}` 
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire("Berhasil", "Treatment ditambahkan!", "success");
//         setFormData({ title: "", price: "", image_url: "" });
//         fetchTreatments();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-5xl p-8 mx-auto">
//       <h1 className="mb-8 text-2xl font-bold text-gray-900">Manajemen Clinic Treatments</h1>
      
//       {/* Form Tambah */}
//       <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
//         <h2 className="mb-4 text-lg font-bold">Tambah Treatment Baru</h2>
//         <form onSubmit={handleSubmit} className="flex items-end gap-4">
//           <div className="flex-1">
//             <label className="block text-xs font-semibold text-gray-600">Nama Treatment</label>
//             <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg" />
//           </div>
//           <div className="w-40">
//             <label className="block text-xs font-semibold text-gray-600">Harga (Rp)</label>
//             <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg" />
//           </div>
//           <div className="flex-1">
//             <label className="block text-xs font-semibold text-gray-600">URL Gambar Lokal (/consult_images/...)</label>
//             <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg" />
//           </div>
//           <button type="submit" className="px-6 py-2 text-white rounded-lg bg-gycora hover:bg-gycora-dark">Simpan</button>
//         </form>
//       </div>

//       {/* Tabel Data */}
//       <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
//         <table className="w-full text-left">
//           <thead className="border-b border-gray-200 bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Gambar</th>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Nama Treatment</th>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Harga</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {treatments.map((t: any) => (
//               <tr key={t.id}>
//                 <td className="px-6 py-4">
//                   <img src={t.image_url} alt="" className="object-cover w-16 h-16 bg-gray-100 rounded" />
//                 </td>
//                 <td className="px-6 py-4 font-medium">{t.title}</td>
//                 <td className="px-6 py-4 font-bold text-gycora">Rp {parseInt(t.price).toLocaleString('id-ID')}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useCallback } from "react";
// import { BASE_URL } from "../../config/api";
// import Swal from "sweetalert2";

// export default function AdminTreatments() {
//   const [treatments, setTreatments] = useState([]);
//   const [formData, setFormData] = useState({ title: "", price: "", image_url: "" });

//   // Gunakan useCallback agar fungsi ini stabil dan bisa dipanggil di dalam useEffect 
//   // maupun di luar useEffect (saat form disubmit) tanpa memicu render tak berujung.
//   const fetchTreatments = useCallback(async () => {
//     const token = localStorage.getItem("admin_token");
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setTreatments(data);
//       }
//     } catch (error) {
//       console.error("Gagal memuat data treatments:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTreatments();
//   }, [fetchTreatments]); // <-- fetchTreatments dimasukkan ke dependency array dengan aman

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("admin_token");
    
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
//         method: "POST",
//         headers: { 
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}` 
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         Swal.fire("Berhasil", "Treatment ditambahkan!", "success");
//         setFormData({ title: "", price: "", image_url: "" });
        
//         // Panggil lagi untuk merefresh data di tabel setelah sukses menambahkan data baru
//         fetchTreatments();
//       } else {
//         Swal.fire("Error", "Gagal menambahkan treatment.", "error");
//       }
//     } catch (error) {
//       console.error("Error submit treatment:", error);
//       Swal.fire("Error", "Terjadi kesalahan server.", "error");
//     }
//   };

//   return (
//     <div className="max-w-5xl p-8 mx-auto">
//       <h1 className="mb-8 text-2xl font-bold text-gray-900">Manajemen Clinic Treatments</h1>
      
//       {/* Form Tambah */}
//       <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
//         <h2 className="mb-4 text-lg font-bold">Tambah Treatment Baru</h2>
//         <form onSubmit={handleSubmit} className="flex items-end gap-4">
//           <div className="flex-1">
//             <label className="block text-xs font-semibold text-gray-600">Nama Treatment</label>
//             <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg" />
//           </div>
//           <div className="w-40">
//             <label className="block text-xs font-semibold text-gray-600">Harga (Rp)</label>
//             <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg" />
//           </div>
//           <div className="flex-1">
//             <label className="block text-xs font-semibold text-gray-600">URL Gambar Lokal (/consult_images/...)</label>
//             <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg" />
//           </div>
//           <button type="submit" className="px-6 py-2 text-white rounded-lg bg-gycora hover:bg-gycora-dark">Simpan</button>
//         </form>
//       </div>

//       {/* Tabel Data */}
//       <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
//         <table className="w-full text-left">
//           <thead className="border-b border-gray-200 bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Gambar</th>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Nama Treatment</th>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Harga</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {treatments.map((t: any) => (
//               <tr key={t.id}>
//                 <td className="px-6 py-4">
//                   <img src={t.image_url} alt="" className="object-cover w-16 h-16 bg-gray-100 rounded" />
//                 </td>
//                 <td className="px-6 py-4 font-medium">{t.title}</td>
//                 <td className="px-6 py-4 font-bold text-gycora">Rp {parseInt(t.price).toLocaleString('id-ID')}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useCallback } from "react";
// import { BASE_URL } from "../../config/api";
// import Swal from "sweetalert2";

// export default function AdminTreatments() {
//   const [treatments, setTreatments] = useState([]);
//   const [formData, setFormData] = useState({ title: "", price: "" });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const fetchTreatments = useCallback(async () => {
//     const token = localStorage.getItem("admin_token");
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setTreatments(data);
//       }
//     } catch (error) {
//       console.error("Gagal memuat data treatments:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTreatments();
//   }, [fetchTreatments]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!imageFile) {
//       Swal.fire("Peringatan", "Harap pilih gambar terlebih dahulu.", "warning");
//       return;
//     }

//     setIsSubmitting(true);
//     const token = localStorage.getItem("admin_token");
    
//     // Menggunakan FormData karena kita mengirimkan File (multipart/form-data)
//     const payload = new FormData();
//     payload.append("title", formData.title);
//     payload.append("price", formData.price);
//     payload.append("image", imageFile);
    
//     try {
//       const res = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
//         method: "POST",
//         headers: { 
//             // CATATAN: JANGAN set 'Content-Type': 'application/json' 
//             // ataupun 'multipart/form-data' di sini. 
//             // Browser akan mengaturnya secara otomatis jika body berupa FormData.
//             "Authorization": `Bearer ${token}`,
//             "Accept": "application/json"
//         },
//         body: payload,
//       });

//       if (res.ok) {
//         Swal.fire("Berhasil", "Treatment ditambahkan!", "success");
//         setFormData({ title: "", price: "" });
//         setImageFile(null);
//         // Reset input file secara manual
//         const fileInput = document.getElementById('imagePicker') as HTMLInputElement;
//         if(fileInput) fileInput.value = "";
        
//         fetchTreatments();
//       } else {
//         const errData = await res.json();
//         Swal.fire("Error", errData.message || "Gagal menambahkan treatment.", "error");
//       }
//     } catch (error) {
//       console.error("Error submit treatment:", error);
//       Swal.fire("Error", "Terjadi kesalahan server.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl p-8 mx-auto">
//       <h1 className="mb-8 text-2xl font-bold text-gray-900">Manajemen Clinic Treatments</h1>
      
//       {/* Form Tambah */}
//       <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
//         <h2 className="mb-4 text-lg font-bold">Tambah Treatment Baru</h2>
//         <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4 md:flex-nowrap">
//           <div className="flex-1 min-w-[200px]">
//             <label className="block text-xs font-semibold text-gray-600">Nama Treatment</label>
//             <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-gycora" />
//           </div>
//           <div className="w-32 min-w-[120px]">
//             <label className="block text-xs font-semibold text-gray-600">Harga (Rp)</label>
//             <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-gycora" />
//           </div>
//           <div className="flex-1 min-w-[200px]">
//             <label className="block text-xs font-semibold text-gray-600">Pilih Gambar</label>
//             <input 
//               id="imagePicker"
//               type="file" 
//               accept="image/*" 
//               required 
//               onChange={handleFileChange} 
//               className="w-full px-3 py-1.5 mt-1 border rounded-lg text-sm bg-white file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer" 
//             />
//           </div>
//           <button type="submit" disabled={isSubmitting} className="w-full px-6 py-2 text-white rounded-lg md:w-auto bg-gycora hover:bg-gycora-dark disabled:bg-gray-400">
//             {isSubmitting ? "Mengunggah..." : "Simpan"}
//           </button>
//         </form>
//       </div>

//       {/* Tabel Data */}
//       <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
//         <table className="w-full text-left">
//           <thead className="border-b border-gray-200 bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Gambar</th>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Nama Treatment</th>
//               <th className="px-6 py-3 text-sm font-bold text-gray-700">Harga</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {treatments.map((t: any) => (
//               <tr key={t.id}>
//                 <td className="px-6 py-4">
//                   <img src={t.image_url} alt={t.title} className="object-cover w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg shadow-sm" />
//                 </td>
//                 <td className="px-6 py-4 font-medium">{t.title}</td>
//                 <td className="px-6 py-4 font-bold text-gycora">Rp {parseInt(t.price).toLocaleString('id-ID')}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config/api";
import Swal from "sweetalert2";

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [logs, setLogs] = useState<{ consults: any[], appointments: any[] }>({ consults: [], appointments: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({ title: "", price: "", is_active: true });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchAllData = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    const headers = { "Authorization": `Bearer ${token}` };
    
    // Fetch Treatments
    const resT = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, { headers });
    if (resT.ok) setTreatments(await resT.json());

    // Fetch Notifications/Logs
    const resL = await fetch(`${BASE_URL}/api/admin/clinic-notifications`, { headers });
    if (resL.ok) setLogs(await resL.json());
  }, []);

  useEffect(() => { fetchAllData(); }, [fetchAllData]);

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setIsEdit(true);
      setSelectedId(item.id);
      setFormData({ title: item.title, price: item.price, is_active: item.is_active });
    } else {
      setIsEdit(false);
      setFormData({ title: "", price: "", is_active: true });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Hapus Treatment?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("admin_token");
        await fetch(`${BASE_URL}/api/admin/clinic-treatments/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        fetchAllData();
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("is_active", String(formData.is_active ? 1 : 0));
    if (imageFile) data.append("image", imageFile);
    if (isEdit) data.append("_method", "PUT");

    const url = isEdit 
      ? `${BASE_URL}/api/admin/clinic-treatments/${selectedId}` 
      : `${BASE_URL}/api/admin/clinic-treatments`;

    const res = await fetch(url, {
      method: "POST", // Laravel handle PUT via _method
      headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" },
      body: data
    });

    if (res.ok) {
      Swal.fire("Berhasil", "Data berhasil disimpan", "success");
      setIsModalOpen(false);
      fetchAllData();
    }
  };

  return (
    <div className="max-w-6xl p-8 mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Portal Manajemen Klinik</h1>
        <button onClick={() => handleOpenModal()} className="px-6 py-2 text-white transition-all shadow-lg bg-gycora rounded-xl hover:bg-gycora-dark">
          + Tambah Treatment
        </button>
      </div>

      {/* TABEL TREATMENT */}
      <section className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="p-6 font-bold border-b border-gray-100">Daftar Treatment</div>
        <table className="w-full text-left">
          <thead className="text-xs font-bold text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-4">Gambar</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Harga</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {treatments.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4"><img src={t.image_url} className="object-cover w-12 h-12 rounded-lg" /></td>
                <td className="px-6 py-4 font-medium">{t.title}</td>
                <td className="px-6 py-4 font-bold text-gycora">Rp {parseInt(t.price).toLocaleString()}</td>
                <td className="flex justify-center gap-2 px-6 py-4">
                  <button onClick={() => handleOpenModal(t)} className="p-2 text-blue-600 rounded-lg hover:bg-blue-50">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 text-red-600 rounded-lg hover:bg-red-50">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* LOG NOTIFIKASI KONSULTASI */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h2 className="flex items-center gap-2 mb-4 font-bold text-amber-600">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span> Log Konsultasi User
          </h2>
          <div className="space-y-4">
            {logs.consults.map((log: any) => (
              <div key={log.id} className="p-3 text-sm rounded-lg bg-gray-50">
                <p className="font-bold">{log.email}</p>
                <p className="text-xs text-gray-500">Ingin konsultasi: <span className="font-bold text-gycora">{log.category_title}</span></p>
                <p className="text-[10px] mt-1 text-gray-400">{new Date(log.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h2 className="flex items-center gap-2 mb-4 font-bold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Janji Temu Baru
          </h2>
          <div className="space-y-4">
            {logs.appointments.map((ap: any) => (
              <div key={ap.id} className="p-3 text-sm rounded-lg bg-gray-50">
                <p className="font-bold">{ap.email}</p>
                <p className="text-xs text-gray-500">Treatment: {ap.treatment?.title}</p>
                <p className="text-xs font-bold text-gycora">Jadwal: {new Date(ap.appointment_time).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL ADD/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-3xl animate-fade-in-up">
            <div className="flex items-center justify-between p-6 border-b bg-gray-50">
              <h3 className="text-lg font-bold">{isEdit ? 'Update Treatment' : 'Tambah Treatment'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block mb-1 text-sm font-bold">Nama Treatment</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded-xl" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-bold">Harga (Rp)</label>
                <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 border rounded-xl" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-bold">Gambar (Upload S3)</label>
                <input type="file" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
              </div>
              <button type="submit" className="w-full py-4 font-bold text-white transition-all shadow-lg bg-gycora rounded-2xl hover:bg-gycora-dark">
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}