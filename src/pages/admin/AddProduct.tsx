// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function AddProduct() {
//   const navigate = useNavigate(); 
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     sku: "",
//     name: "",
//     price: "",
//     stock: "0",
//     description: "",
//     benefits: "",
//   });

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/categories`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data.data ? data.data : data || []))
//       .catch((err) => console.error("Gagal mengambil kategori:", err));
//   }, []);

//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     data.append("category_id", formData.category_id);
//     data.append("sku", formData.sku);
//     data.append("name", formData.name);
//     data.append("price", formData.price);
//     data.append("stock", formData.stock);
//     if (formData.description) data.append("description", formData.description);
//     if (formData.benefits) data.append("benefits", formData.benefits);
//     if (imageFile) data.append("image", imageFile);

//     try {
//       const token = localStorage.getItem("admin_token");

//       const res = await fetch(`${BASE_URL}/api/products`, {
//         method: "POST",
//         headers: {
//           "Accept": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: data, 
//       });

//       if (res.ok) {
//         Swal.fire("Berhasil!", "Produk ditambahkan.", "success");
//         navigate("/admin/products");
//       } else {
//         const errorData = await res.json();
//         console.error("Validasi gagal:", errorData);
//         Swal.fire("Gagal!", errorData.message || "Pastikan semua data terisi dengan benar.", "error");
//       }
//     } catch (error) {
//       console.error("Gagal submit produk:", error);
//       Swal.fire("Error!", "Gagal terhubung ke server.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl p-8 mx-auto font-sans">
//       <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="flex items-center gap-4 mb-8">
//           <button
//             onClick={() => navigate("/admin/products")} 
//             className="p-2 text-gray-400 transition rounded-lg hover:text-gray-600 hover:bg-gray-50"
//             title="Kembali"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
//             <p className="mt-1 text-sm text-gray-500">Tambahkan item baru ke dalam katalog Gycora.</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori Produk</label>
//               <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
//                 <option value="" disabled>Pilih Kategori...</option>
//                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
//                 {categories.map((c: any) => (
//                   <option key={c.id} value={c.id}>{c.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">SKU (Stock Keeping Unit)</label>
//               <input type="text" required placeholder="Misal: SHP-01" value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
//             </div>
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
//             <input type="text" required placeholder="Misal: Gycora Revitalizing Shampoo" value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
//                 <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
//               <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
//             </div>
//           </div>

//           <div className="pt-4 space-y-6 border-t border-gray-100">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Foto Produk</label>
//               <input type="file" accept="image/*" className="w-full p-2 border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi Produk (Opsional)</label>
//               <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Jelaskan detail produk ini..." />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
//               <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} placeholder="Misal: Mencegah kerontokan, Melembutkan rambut..." />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//             <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               Batal
//             </button>
//             <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
//               {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

export default function AddProduct() {
  const navigate = useNavigate(); 
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    sku: "",
    name: "",
    price: "",
    stock: "0",
    description: "",
    benefits: "",
  });

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data ? data.data : data || []))
      .catch((err) => console.error("Gagal mengambil kategori:", err));
  }, []);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("admin_token");
      let uploadedImageUrl = null;

      // 1. JIKA ADA GAMBAR: Upload langsung ke Clever Cloud S3
      if (imageFile) {
        Swal.fire({ title: "Mengunggah Gambar...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        
        const ext = imageFile.name.split('.').pop();
        const contentType = imageFile.type;

        // // A. Minta izin & URL S3 sementara ke Backend
        // const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        //   body: JSON.stringify({ extension: ext, content_type: contentType })
        // });
        
        // if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
        // const { upload_url, file_url } = await presignedRes.json();

        // // B. Upload file langsung ke URL Clever Cloud S3
        // const s3UploadRes = await fetch(upload_url, {
        //   method: "PUT",
        //   body: imageFile,
        //   headers: { "Content-Type": contentType } // Wajib sama persis dengan yang direquest
        // });

        const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ extension: ext, content_type: contentType })
        });
        
        if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
        
        // Tangkap upload_headers dari backend Laravel
        const { upload_url, upload_headers, file_url } = await presignedRes.json();

        // Gunakan upload_url sebagai URL, dan gabungkan upload_headers untuk keamanan S3
        const s3UploadRes = await fetch(upload_url, {
          method: "PUT",
          body: imageFile,
          headers: {
            ...upload_headers, // Gunakan header otentikasi spesifik yang diminta oleh S3
            "Content-Type": contentType 
          }
        });

        if (!s3UploadRes.ok) throw new Error("Gagal mengunggah ke S3");
        uploadedImageUrl = file_url; // Simpan URL publiknya
      }

      Swal.fire({ title: "Menyimpan Data...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      // 2. SIMPAN DATA KE LARAVEL (Gunakan format JSON yang lebih cepat dan bersih)
      const payload = {
        ...formData,
        image_url: uploadedImageUrl // Masukkan URL S3 ke database
      };

      const res = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload), 
      });

      if (res.ok) {
        Swal.fire("Berhasil!", "Produk ditambahkan.", "success");
        navigate("/admin/products");
      } else {
        const errorData = await res.json();
        Swal.fire("Gagal!", errorData.message || "Pastikan semua data terisi dengan benar.", "error");
      }
    } catch (error) {
      console.error("Gagal submit produk:", error);
      Swal.fire("Error!", "Terjadi kesalahan saat mengunggah atau menyimpan.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto font-sans">
      <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/admin/products")} 
            className="p-2 text-gray-400 transition rounded-lg hover:text-gray-600 hover:bg-gray-50"
            title="Kembali"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
            <p className="mt-1 text-sm text-gray-500">Tambahkan item baru ke dalam katalog Gycora.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori Produk</label>
              <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                <option value="" disabled>Pilih Kategori...</option>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">SKU (Stock Keeping Unit)</label>
              <input type="text" required placeholder="Misal: SHP-01" value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
            <input type="text" required placeholder="Misal: Gycora Revitalizing Shampoo" value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
              <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
            </div>
          </div>

          <div className="pt-4 space-y-6 border-t border-gray-100">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Foto Produk</label>
              <input type="file" accept="image/*" className="w-full p-2 border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi Produk (Opsional)</label>
              <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Jelaskan detail produk ini..." />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
              <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} placeholder="Misal: Mencegah kerontokan, Melembutkan rambut..." />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
              {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}