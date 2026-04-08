import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

interface Product {
  id: number;
  category: { name: string };
  sku: string;
  name: string;
  slug: string;
  description: string;
  benefits: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function AdminProductDetail() {
  const navigate = useNavigate(); 
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        
        const data = await res.json();
        // PERBAIKAN: Tangani bungkus data dengan benar
        const responseData = data.data ? data.data : data;
        setProduct(responseData);
      } catch (error) {
        console.error("Detail produk error:", error);
        Swal.fire('Error!', 'Gagal memuat detail produk.', 'error');
        navigate("/admin/products"); 
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Yakin menghapus produk ini?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, { 
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          await Swal.fire('Terhapus!', 'Produk telah dihapus.', 'success');
          navigate("/admin/products"); 
        } else {
          throw new Error("Gagal menghapus data");
        }
      } catch (error) {
        console.error("Gagal hapus produk:", error); 
        Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
      }
    }
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)] font-sans">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-5xl p-8 mx-auto space-y-6 font-sans">
      
      {/* Top Navigation & Actions */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/admin/products")}
            className="p-2 text-gray-400 transition-colors border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-white bg-gray-50"
            title="Kembali"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Detail Produk</h1>
        </div>

        <div className="flex gap-3">
          <Link 
            to={`/admin/products/${product.id}/edit`} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Edit Produk
          </Link>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Hapus
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Left Column: Image Area */}
          <div className="bg-gray-50 border-r border-gray-100 p-8 flex flex-col items-center justify-center min-h-[300px]">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="object-cover h-auto max-w-full shadow-sm rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center space-y-3 text-gray-400">
                <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-sm font-medium">Belum ada gambar</span>
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="p-8 space-y-8 lg:col-span-2">
            
            {/* Header Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gycora-light text-gycora-dark">
                  {product.category?.name || "Uncategorized"}
                </span>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  SKU: {product.sku}
                </span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-400">Slug: <span className="font-mono text-gray-500">{product.slug}</span></p>
            </div>

            {/* Price & Stock Stats */}
            <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 bg-gray-50 rounded-xl">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-500">Harga Jual</p>
                <p className="text-2xl font-bold text-gycora">{formatRupiah(product.price)}</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-gray-500">Stok Gudang</p>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${product.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>
                    {product.stock}
                  </span>
                  <span className="text-sm text-gray-500">Unit</span>
                </div>
              </div>
            </div>

            {/* Description & Benefits */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Deskripsi Produk</h3>
                <div className="prose-sm prose text-gray-600 max-w-none">
                  {product.description ? (
                    <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p>
                  ) : (
                    <p className="italic text-gray-400">Tidak ada deskripsi.</p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-900 uppercase">Manfaat (Benefits)</h3>
                <div className="p-4 border bg-gycora-light/30 rounded-xl border-gycora-light">
                  {product.benefits ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-gycora-dark">{product.benefits}</p>
                  ) : (
                    <p className="text-sm italic text-gray-400">Tidak ada catatan manfaat.</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}