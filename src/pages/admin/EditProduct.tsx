// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom"; 
// import Swal from "sweetalert2";

// interface Category {
//   id: number;
//   name: string;
// }

// export default function EditProduct() {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>(); 

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState("");
  
//   const [formData, setFormData] = useState({
//     category_id: "",
//     sku: "",
//     name: "",
//     price: "",
//     stock: "", // Hanya untuk display
//     description: "",
//     benefits: "",
//   });

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         const catRes = await fetch("https://backend-gycora-web.vercel.app/api/api/categories");
//         const rawCatData = await catRes.json();
//         setCategories(rawCatData.data ? rawCatData.data : rawCatData || []);

//         const prodRes = await fetch(`https://backend-gycora-web.vercel.app/api/api/products/${id}`);
//         if (!prodRes.ok) throw new Error("Produk tidak ditemukan");
        
//         const rawProdData = await prodRes.json();
//         const prodData = rawProdData.data ? rawProdData.data : rawProdData;

//         setFormData({
//           category_id: prodData.category_id ? prodData.category_id.toString() : "", 
//           sku: prodData.sku || "",
//           name: prodData.name || "",
//           price: prodData.price ? prodData.price.toString() : "", 
//           stock: prodData.stock ? prodData.stock.toString() : "0", 
//           description: prodData.description || "",
//           benefits: prodData.benefits || "",
//         });
        
//         if (prodData.image_url) setPreview(prodData.image_url);

//       } catch (error) {
//         console.error("Gagal memuat data produk:", error);
//         Swal.fire("Error!", "Gagal memuat data produk.", "error");
//         navigate("/admin/products");
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) fetchInitialData();
//   }, [id, navigate]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setPreview(URL.createObjectURL(file)); 
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     const data = new FormData();
//     data.append("_method", "PUT"); // Method spoofing untuk Laravel
    
//     data.append("category_id", formData.category_id);
//     data.append("sku", formData.sku);
//     data.append("name", formData.name);
//     data.append("price", formData.price);
//     // CATATAN KUNCI: formData.stock TIDAK DILAMPIRKAN LAGI
//     if (formData.description) data.append("description", formData.description);
//     if (formData.benefits) data.append("benefits", formData.benefits);
//     if (imageFile) data.append("image", imageFile);

//     try {
//       const token = localStorage.getItem("admin_token"); 

//       const res = await fetch(`https://backend-gycora-web.vercel.app/api/api/products/${id}`, {
//         method: "POST", 
//         headers: {
//             "Accept": "application/json",
//             "Authorization": `Bearer ${token}`
//         },
//         body: data, 
//       });

//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Berhasil!", text: "Produk diperbarui.", timer: 1500, showConfirmButton: false });
//         navigate("/admin/products");
//       } else {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Gagal menyimpan");
//       }
//     } catch (error: any) {
//       console.error("Gagal memperbarui produk:", error);
//       Swal.fire("Error!", error.message, "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) return <div className="p-20 font-sans font-bold text-center animate-pulse text-gycora">Memuat data...</div>;

//   return (
//     <div className="max-w-4xl p-8 mx-auto font-sans">
//       <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
        
//         <div className="flex items-center gap-4 mb-8 text-gray-900">
//           <button 
//             onClick={() => navigate("/admin/products")} 
//             className="p-2 transition-colors rounded-lg hover:bg-gray-50"
//             title="Kembali"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//           </button>
//           <h1 className="text-2xl font-bold">Edit Produk</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col gap-6 p-4 border border-gray-200 border-dashed sm:flex-row sm:items-center bg-gray-50 rounded-xl">
//             <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-white border rounded-lg">
//               {preview ? (
//                 <img src={preview} className="object-cover w-full h-full" alt="Preview" />
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-xs text-gray-300">No Image</div>
//               )}
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Ganti Foto Produk (Opsional)</label>
//               <input type="file" accept="image/*" onChange={handleImageChange} className="text-xs outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gycora-light file:text-gycora-dark hover:file:bg-gycora/20" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori</label>
//               <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
//                 <option value="" disabled>Pilih Kategori</option>
//                 {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">SKU</label>
//               <input type="text" required value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
//             </div>
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
//             <input type="text" required value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
//               <input type="number" required value={formData.price} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
//             </div>
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-sm font-semibold text-gray-700">Stok (Read-Only)</label>
//                 <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold">Gunakan Menu Stok</span>
//               </div>
//               {/* STOK DIBUAT DISABLED AGAR SESUAI DENGAN BACKEND YANG MENGABAIKAN INPUT STOK SAAT UPDATE */}
//               <input type="number" disabled value={formData.stock} className="w-full p-2.5 bg-gray-200 border border-gray-200 rounded-lg outline-none text-gray-500 cursor-not-allowed" />
//             </div>
//           </div>

//           <div className="pt-4 space-y-6 border-t border-gray-100">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi (Opsional)</label>
//               <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
//               <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//             <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               Batal
//             </button>
//             <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
//               {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface Category {
  id: number;
  name: string;
}

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  
  const [formData, setFormData] = useState({
    category_id: "",
    sku: "",
    name: "",
    price: "",
    stock: "", // Hanya untuk display
    description: "",
    benefits: "",
    image_url: "", // Untuk menyimpan referensi URL lama
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const catRes = await fetch(`${BASE_URL}/api/categories`);
        const rawCatData = await catRes.json();
        setCategories(rawCatData.data ? rawCatData.data : rawCatData || []);

        const prodRes = await fetch(`${BASE_URL}/api/products/${id}`);
        if (!prodRes.ok) throw new Error("Produk tidak ditemukan");
        
        const rawProdData = await prodRes.json();
        const prodData = rawProdData.data ? rawProdData.data : rawProdData;

        setFormData({
          category_id: prodData.category_id ? prodData.category_id.toString() : "", 
          sku: prodData.sku || "",
          name: prodData.name || "",
          price: prodData.price ? prodData.price.toString() : "", 
          stock: prodData.stock ? prodData.stock.toString() : "0", 
          description: prodData.description || "",
          benefits: prodData.benefits || "",
          image_url: prodData.image_url || "",
        });
        
        if (prodData.image_url) setPreview(prodData.image_url);

      } catch (error) {
        console.error("Gagal memuat data produk:", error);
        Swal.fire("Error!", "Gagal memuat data produk.", "error");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchInitialData();
  }, [id, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("admin_token"); 
      let uploadedImageUrl = formData.image_url;

      // 1. JIKA GAMBAR DIGANTI: Upload langsung ke Clever Cloud S3
      if (imageFile) {
        Swal.fire({ title: "Mengunggah Gambar...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        
        const ext = imageFile.name.split('.').pop();
        const contentType = imageFile.type;

        const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ extension: ext, content_type: contentType })
        });
        
        if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
        const { upload_url, file_url } = await presignedRes.json();

        const s3UploadRes = await fetch(upload_url, {
          method: "PUT",
          body: imageFile,
          headers: { "Content-Type": contentType }
        });

        if (!s3UploadRes.ok) throw new Error("Gagal mengunggah ke S3");
        uploadedImageUrl = file_url; 
      }

      Swal.fire({ title: "Menyimpan Data...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      // 2. SIMPAN KE LARAVEL
      const payload = {
        category_id: formData.category_id,
        sku: formData.sku,
        name: formData.name,
        price: formData.price,
        description: formData.description,
        benefits: formData.benefits,
        image_url: uploadedImageUrl
      };

      const res = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "PUT", // Karena Payload berupa JSON murni, gunakan PUT
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload), 
      });

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Produk diperbarui.", timer: 1500, showConfirmButton: false });
        navigate("/admin/products");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal menyimpan");
      }
    } catch (error: any) {
      console.error("Gagal memperbarui produk:", error);
      Swal.fire("Error!", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-20 font-sans font-bold text-center animate-pulse text-gycora">Memuat data...</div>;

  return (
    <div className="max-w-4xl p-8 mx-auto font-sans">
      <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
        
        <div className="flex items-center gap-4 mb-8 text-gray-900">
          <button 
            onClick={() => navigate("/admin/products")} 
            className="p-2 transition-colors rounded-lg hover:bg-gray-50"
            title="Kembali"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-2xl font-bold">Edit Produk</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-6 p-4 border border-gray-200 border-dashed sm:flex-row sm:items-center bg-gray-50 rounded-xl">
            <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-white border rounded-lg">
              {preview ? (
                <img src={preview} className="object-cover w-full h-full" alt="Preview" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-xs text-gray-300">No Image</div>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Ganti Foto Produk (Opsional)</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-xs outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gycora-light file:text-gycora-dark hover:file:bg-gycora/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori</label>
              <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                <option value="" disabled>Pilih Kategori</option>
                {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">SKU</label>
              <input type="text" required value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
            <input type="text" required value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
              <input type="number" required value={formData.price} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Stok (Read-Only)</label>
                <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold">Gunakan Menu Stok</span>
              </div>
              {/* STOK DIBUAT DISABLED AGAR SESUAI DENGAN BACKEND YANG MENGABAIKAN INPUT STOK SAAT UPDATE */}
              <input type="number" disabled value={formData.stock} className="w-full p-2.5 bg-gray-200 border border-gray-200 rounded-lg outline-none text-gray-500 cursor-not-allowed" />
            </div>
          </div>

          <div className="pt-4 space-y-6 border-t border-gray-100">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi (Opsional)</label>
              <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
              <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}