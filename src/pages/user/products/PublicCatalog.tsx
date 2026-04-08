import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Ganti dari next/link

interface Product {
  id: number;
  category_name: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function PublicCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Sesuaikan URL jika nanti menggunakan Laravel API
        const res = await fetch("http://127.0.0.1:8000/api/products");
        if (!res.ok) throw new Error("Gagal mengambil data produk");
        // const data = await res.json();

        const responseData = await res.json();
        
        // --- PERBAIKAN DI SINI ---
        // Jika responseData memiliki properti "data" (Format Laravel API Resource), gunakan itu.
        // Jika tidak ada (Format Golang lama), langsung gunakan responseData.
        const productsArray = responseData.data ? responseData.data : responseData;
        setProducts(productsArray || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans bg-white">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Header Banner */}
      <div className="py-16 text-center border-b border-pink-100 bg-pink-50">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Koleksi Gycora</h1>
        <p className="max-w-xl px-4 mx-auto mt-4 text-gray-600">
          Temukan perawatan rambut premium yang dirancang khusus untuk Anda. Dari serum yang merevitalisasi hingga kondisioner yang melembapkan.
        </p>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`} // Ganti href menjadi to
              className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-gycora/20"
            >
              {/* Product Image Area */}
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
                    Belum ada gambar
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute flex flex-col gap-2 top-3 left-3">
                  <span className="px-2 py-1 text-xs font-bold text-gray-900 rounded-md shadow-sm bg-white/90 backdrop-blur-sm">
                    {product.category_name}
                  </span>
                  {product.stock < 5 && product.stock > 0 && (
                    <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-red-500/90 backdrop-blur-sm animate-pulse">
                      Sisa {product.stock}!
                    </span>
                  )}
                  {product.stock === 0 && (
                     <span className="px-2 py-1 text-xs font-bold text-white rounded-md shadow-sm bg-gray-900/90 backdrop-blur-sm">
                      Habis
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow p-5">
                <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-gycora line-clamp-2">
                  {product.name}
                </h3>
                <p className="mb-4 font-mono text-sm text-gray-500">{product.sku}</p>
                <div className="mt-auto">
                  <p className="text-xl font-extrabold text-gycora">
                    {formatRupiah(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="py-20 text-center">
            <h3 className="text-xl font-bold text-gray-700">Belum ada produk</h3>
            <p className="mt-2 text-gray-500">Katalog kami sedang diperbarui, silakan periksa kembali nanti.</p>
          </div>
        )}
      </div>
    </div>
  );
}