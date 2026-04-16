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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config/api";
import Swal from "sweetalert2";

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [formData, setFormData] = useState({ title: "", price: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTreatments = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTreatments(data);
      }
    } catch (error) {
      console.error("Gagal memuat data treatments:", error);
    }
  }, []);

  useEffect(() => {
    fetchTreatments();
  }, [fetchTreatments]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      Swal.fire("Peringatan", "Harap pilih gambar terlebih dahulu.", "warning");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("admin_token");
    
    // Menggunakan FormData karena kita mengirimkan File (multipart/form-data)
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("price", formData.price);
    payload.append("image", imageFile);
    
    try {
      const res = await fetch(`${BASE_URL}/api/admin/clinic-treatments`, {
        method: "POST",
        headers: { 
            // CATATAN: JANGAN set 'Content-Type': 'application/json' 
            // ataupun 'multipart/form-data' di sini. 
            // Browser akan mengaturnya secara otomatis jika body berupa FormData.
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        },
        body: payload,
      });

      if (res.ok) {
        Swal.fire("Berhasil", "Treatment ditambahkan!", "success");
        setFormData({ title: "", price: "" });
        setImageFile(null);
        // Reset input file secara manual
        const fileInput = document.getElementById('imagePicker') as HTMLInputElement;
        if(fileInput) fileInput.value = "";
        
        fetchTreatments();
      } else {
        const errData = await res.json();
        Swal.fire("Error", errData.message || "Gagal menambahkan treatment.", "error");
      }
    } catch (error) {
      console.error("Error submit treatment:", error);
      Swal.fire("Error", "Terjadi kesalahan server.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl p-8 mx-auto">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Manajemen Clinic Treatments</h1>
      
      {/* Form Tambah */}
      <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <h2 className="mb-4 text-lg font-bold">Tambah Treatment Baru</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4 md:flex-nowrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-gray-600">Nama Treatment</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-gycora" />
          </div>
          <div className="w-32 min-w-[120px]">
            <label className="block text-xs font-semibold text-gray-600">Harga (Rp)</label>
            <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-gycora" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-gray-600">Pilih Gambar</label>
            <input 
              id="imagePicker"
              type="file" 
              accept="image/*" 
              required 
              onChange={handleFileChange} 
              className="w-full px-3 py-1.5 mt-1 border rounded-lg text-sm bg-white file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer" 
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full px-6 py-2 text-white rounded-lg md:w-auto bg-gycora hover:bg-gycora-dark disabled:bg-gray-400">
            {isSubmitting ? "Mengunggah..." : "Simpan"}
          </button>
        </form>
      </div>

      {/* Tabel Data */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-sm font-bold text-gray-700">Gambar</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700">Nama Treatment</th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700">Harga</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {treatments.map((t: any) => (
              <tr key={t.id}>
                <td className="px-6 py-4">
                  <img src={t.image_url} alt={t.title} className="object-cover w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg shadow-sm" />
                </td>
                <td className="px-6 py-4 font-medium">{t.title}</td>
                <td className="px-6 py-4 font-bold text-gycora">Rp {parseInt(t.price).toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}