// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // Ganti import next/link
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';

// // --- DATA DUMMY GRAFIK PENJUALAN TAHUNAN ---
// const salesData = [
//   { month: 'Jan', revenue: 25 },
//   { month: 'Feb', revenue: 35 },
//   { month: 'Mar', revenue: 30 },
//   { month: 'Apr', revenue: 45 },
//   { month: 'May', revenue: 60 },
//   { month: 'Jun', revenue: 55 },
//   { month: 'Jul', revenue: 75 },
//   { month: 'Aug', revenue: 85 },
//   { month: 'Sep', revenue: 70 },
//   { month: 'Oct', revenue: 90 },
//   { month: 'Nov', revenue: 110 },
//   { month: 'Dec', revenue: 140 }, // Puncak akhir tahun
// ];

// // --- DATA DUMMY PIE CHART (TOP 5 PRODUK) ---
// const topProductsData = [
//   { name: 'Revitalizing Shampoo', value: 450 },
//   { name: 'Argan Hair Serum', value: 300 },
//   { name: 'Repair Mask', value: 250 },
//   { name: 'Volume Conditioner', value: 150 },
//   { name: 'Scalp Tonic', value: 100 },
// ];
// // Palet warna hijau khas Gycora dari gelap ke terang
// const PIE_COLORS = ['#065f46', '#059669', '#10b981', '#34d399', '#6ee7b7'];

// export default function AdminDashboard() {
//   const [adminName, setAdminName] = useState("Admin");
//   const [loading, setLoading] = useState(true); // Pengganti isClient

//   useEffect(() => {
//     const userStr = localStorage.getItem("admin_user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       setAdminName(user.first_name);
//     }
//     setLoading(false);
//   }, []);

//   // Format tooltip angka ke Rupiah (Juta)
//   const formatRupiahTooltip = (value: any) => [`Rp ${value} Juta`, 'Pendapatan'];

//   if (loading) return <div className="p-8 font-sans font-bold text-center text-gycora animate-pulse">Memuat Dasbor...</div>;

//   return (
//     <div className="p-8 pb-20 mx-auto space-y-8 font-sans max-w-7xl animate-fade-in-up">
      
//       {/* HEADER DASHBOARD */}
//       <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
//           <p className="mt-1 text-gray-500">Selamat datang kembali, <span className="font-semibold text-gycora">{adminName}</span>. Berikut performa Gycora hari ini.</p>
//         </div>
//         {/* <div className="flex gap-3">
//           <button className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
//             Unduh Laporan
//           </button>
//           <Link to="/admin/products/create" className="px-4 py-2 text-sm font-medium text-white transition rounded-lg shadow-md bg-gycora hover:bg-gycora-dark shadow-emerald-500/20">
//             + Tambah Produk
//           </Link>
//         </div> */}
//       </div>

//       {/* STATISTIK UTAMA (Efek Kartu Premium) */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {/* Card 1 */}
//         <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group">
//           <div className="absolute top-0 right-0 p-4 transition-transform transform translate-x-4 -translate-y-4 opacity-10 group-hover:scale-110">
//             <svg className="w-24 h-24 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
//           </div>
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Pendapatan Bulan Ini</p>
//           <h3 className="text-3xl font-extrabold text-gray-900">Rp 140M</h3>
//           <p className="flex items-center gap-1 mt-2 text-sm font-medium text-emerald-600">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
//             +27.2% dari bulan lalu
//           </p>
//         </div>

//         {/* Card 2 */}
//         <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group">
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Pesanan Aktif</p>
//           <h3 className="text-3xl font-extrabold text-gray-900">124</h3>
//           <p className="flex items-center gap-1 mt-2 text-sm font-medium text-amber-500">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//             Perlu diproses segera
//           </p>
//         </div>

//         {/* Card 3 */}
//         <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group">
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Katalog Produk</p>
//           <h3 className="text-3xl font-extrabold text-gray-900">45</h3>
//           <p className="flex items-center gap-1 mt-2 text-sm font-medium text-red-500">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
//             3 produk stok menipis
//           </p>
//         </div>

//         {/* Card 4 */}
//         <div className="relative p-6 overflow-hidden text-white border shadow-lg bg-gradient-to-br from-gycora to-gycora-dark rounded-2xl border-emerald-700">
//           <p className="mb-1 text-sm font-semibold tracking-wider uppercase text-emerald-100">Pelanggan Baru</p>
//           <h3 className="text-3xl font-extrabold">+892</h3>
//           <p className="mt-2 text-sm font-medium text-white">
//             Tumbuh pesat bulan ini!
//           </p>
//         </div>
//       </div>

//       {/* BARIS GRAFIK: BAR CHART & PIE CHART */}
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
//         {/* BAR CHART PENJUALAN (Col-span 2) */}
//         <div className="p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-bold text-gray-900">Tren Pendapatan 2026 (Juta Rupiah)</h2>
//             <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none font-medium">
//               <option>Tahun Ini</option>
//               <option>Tahun Lalu</option>
//             </select>
//           </div>
          
//           <div className="w-full h-72">
//             <ResponsiveContainer width="100%" height="100%" debounce={300}>
//               <BarChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
//                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
//                 <Tooltip 
//                   cursor={{fill: '#f9fafb'}} 
//                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
//                   formatter={formatRupiahTooltip}
//                 />
//                 <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={40} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* PIE CHART PRODUK POPULER (Col-span 1) */}
//         <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <h2 className="mb-2 text-lg font-bold text-gray-900">5 Produk Terlaris</h2>
//           <p className="mb-6 text-xs text-gray-500">Berdasarkan volume penjualan (Unit)</p>
          
//           <div className="flex-1 min-h-[250px]">
//             <ResponsiveContainer width="100%" height="100%" debounce={300}>
//               <PieChart>
//                 <Pie
//                   data={topProductsData}
//                   cx="50%"
//                   cy="45%"
//                   innerRadius={60}
//                   outerRadius={80}
//                   paddingAngle={5}
//                   dataKey="value"
//                   stroke="none"
//                 >
//                   {topProductsData.map((_entry, index) => (
//                     <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
//                 />
//                 <Legend 
//                   verticalAlign="bottom" 
//                   height={36}
//                   iconType="circle"
//                   iconSize={8}
//                   wrapperStyle={{ fontSize: '12px', color: '#4b5563' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </div>

//       {/* BARIS TRANSAKSI TERBARU (Full Width) */}
//       <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-lg font-bold text-gray-900">Pesanan Masuk Terbaru</h2>
//           <Link to="#" className="flex items-center gap-1 text-sm font-medium transition-colors text-gycora hover:text-gycora-dark">
//             Lihat Semua Transaksi
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
//           </Link>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="border-b border-gray-100 bg-gray-50">
//               <tr>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">ID Pesanan</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Pelanggan</th>
//                 <th className="p-4 text-xs font-bold text-gray-500 uppercase">Total Tagihan</th>
//                 <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Status</th>
//                 <th className="p-4 text-xs font-bold text-right text-gray-500 uppercase">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {[
//                 { id: "INV-202604-001", name: "Sarah Johnson", amount: "Rp 450.000", status: "Dibayar", color: "bg-emerald-100 text-emerald-700" },
//                 { id: "INV-202604-002", name: "Budi Santoso", amount: "Rp 125.000", status: "Menunggu", color: "bg-amber-100 text-amber-700" },
//                 { id: "INV-202604-003", name: "Ayu Lestari", amount: "Rp 890.000", status: "Dikirim", color: "bg-blue-100 text-blue-700" },
//                 { id: "INV-202604-004", name: "Michael Chen", amount: "Rp 320.000", status: "Dibayar", color: "bg-emerald-100 text-emerald-700" },
//               ].map((tx, i) => (
//                 <tr key={i} className="transition-colors hover:bg-gray-50">
//                   <td className="p-4 font-mono text-sm text-gray-600">{tx.id}</td>
//                   <td className="flex items-center gap-3 p-4">
//                     <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-gycora-light text-gycora-dark">
//                       {tx.name.charAt(0)}
//                     </div>
//                     <span className="text-sm font-semibold text-gray-900">{tx.name}</span>
//                   </td>
//                   <td className="p-4 text-sm font-bold text-gray-900">{tx.amount}</td>
//                   <td className="p-4 text-center">
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${tx.color}`}>
//                       {tx.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-right">
//                     <button className="text-sm font-medium transition-colors text-gycora hover:text-gycora-dark">Proses</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { BASE_URL } from "../../config/api";

// // Palet warna hijau khas Gycora dari gelap ke terang
// const PIE_COLORS = ['#065f46', '#059669', '#10b981', '#34d399', '#6ee7b7'];

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [adminName, setAdminName] = useState("Admin");
//   const [loading, setLoading] = useState(true);

//   // --- STATE UNTUK DATA DASHBOARD ---
//   const [stats, setStats] = useState<any>({});
//   const [revenueData, setRevenueData] = useState<any[]>([]);
//   const [popularProducts, setPopularProducts] = useState<any[]>([]);

//   useEffect(() => {
//     const userStr = localStorage.getItem("admin_user");
//     const token = localStorage.getItem("admin_token");

//     if (!token || !userStr) {
//       navigate("/admin/login");
//       return;
//     }

//     const user = JSON.parse(userStr);
//     setAdminName(user.first_name);

//     const fetchDashboardData = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/admin/dashboard/master-data`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json"
//           }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setStats(data.stats || {});
//           setRevenueData(data.revenue || []);
          
//           // Mengolah data Popular Products agar format key sesuai dengan Recharts (name & value)
//           const formattedPopular = (data.popular || []).map((item: any) => ({
//             name: item.name,
//             value: Number(item.total_sold)
//           }));
//           setPopularProducts(formattedPopular);
//         } else if (res.status === 401) {
//           localStorage.removeItem("admin_token");
//           localStorage.removeItem("admin_user");
//           navigate("/admin/login");
//         }
//       } catch (error) {
//         console.error("Gagal mengambil data dashboard:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [navigate]);

//   // Format angka ke format Rupiah
//   const formatRupiah = (angka: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(angka || 0);
//   };

//   const formatRupiahTooltip = (value: any) => [formatRupiah(value), 'Pendapatan'];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[500px]">
//         <div className="flex flex-col items-center">
//           <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-gycora animate-spin"></div>
//           <p className="mt-4 text-xs font-bold tracking-widest uppercase text-gycora animate-pulse">Memuat Dasbor...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 pb-20 mx-auto space-y-8 font-sans max-w-7xl animate-fade-in-up">
      
//       {/* HEADER DASHBOARD */}
//       <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
//           <p className="mt-1 text-gray-500">Selamat datang kembali, <span className="font-semibold text-gycora">{adminName}</span>. Berikut performa Gycora hari ini.</p>
//         </div>
//       </div>

//       {/* STATISTIK UTAMA */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {/* Card 1: Pendapatan */}
//         <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group">
//           <div className="absolute top-0 right-0 p-4 transition-transform transform translate-x-4 -translate-y-4 opacity-10 group-hover:scale-110">
//             <svg className="w-24 h-24 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
//           </div>
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Total Pendapatan</p>
//           <h3 className="text-2xl font-extrabold text-gray-900 truncate" title={formatRupiah(stats.total_sales)}>
//             {formatRupiah(stats.total_sales)}
//           </h3>
//           <p className={`flex items-center gap-1 mt-2 text-sm font-medium ${stats.sales_growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
//             {stats.sales_growth >= 0 ? (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
//             ) : (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
//             )}
//             {stats.sales_growth >= 0 ? '+' : ''}{stats.sales_growth}% dari bulan lalu
//           </p>
//         </div>

//         {/* Card 2: Pesanan / Transaksi */}
//         <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group">
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Total Transaksi</p>
//           <h3 className="text-3xl font-extrabold text-gray-900">{stats.total_transactions || 0}</h3>
//           <p className={`flex items-center gap-1 mt-2 text-sm font-medium ${stats.transaction_growth >= 0 ? 'text-amber-500' : 'text-red-500'}`}>
//             {stats.transaction_growth >= 0 ? (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
//             ) : (
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
//             )}
//             {stats.transaction_growth >= 0 ? '+' : ''}{stats.transaction_growth}% dari bulan lalu
//           </p>
//         </div>

//         {/* Card 3: Katalog Produk */}
//         <div className="relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group">
//           <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Katalog Produk</p>
//           <h3 className="text-3xl font-extrabold text-gray-900">{stats.total_products || 0}</h3>
//           <p className="flex items-center gap-1 mt-2 text-sm font-medium text-blue-500">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
//             +{stats.new_products_growth || 0} produk baru bulan ini
//           </p>
//         </div>

//         {/* Card 4: Pelanggan Baru */}
//         <div className="relative p-6 overflow-hidden text-white border shadow-lg bg-gradient-to-br from-gycora to-gycora-dark rounded-2xl border-emerald-700">
//           <p className="mb-1 text-sm font-semibold tracking-wider uppercase text-emerald-100">Total Pelanggan</p>
//           <h3 className="text-3xl font-extrabold">{stats.total_users || 0}</h3>
//           <p className="mt-2 text-sm font-medium text-white">
//             +{stats.new_users_growth || 0} pengguna baru bulan ini!
//           </p>
//         </div>
//       </div>

//       {/* BARIS GRAFIK: BAR CHART & PIE CHART */}
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
//         {/* BAR CHART PENJUALAN (Col-span 2) */}
//         <div className="p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-bold text-gray-900">Tren Pendapatan 6 Bulan Terakhir</h2>
//           </div>
          
//           <div className="w-full h-72">
//             {revenueData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%" debounce={300}>
//                 <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
//                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
//                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(val) => `Rp${(val/1000000).toFixed(0)}M`} />
//                   <Tooltip 
//                     cursor={{fill: '#f9fafb'}} 
//                     contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
//                     formatter={formatRupiahTooltip}
//                   />
//                   <Bar dataKey="total" fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={40} />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">
//                 Belum ada data transaksi dalam 6 bulan terakhir.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* PIE CHART PRODUK POPULER (Col-span 1) */}
//         <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
//           <h2 className="mb-2 text-lg font-bold text-gray-900">Top Produk Terlaris</h2>
//           <p className="mb-6 text-xs text-gray-500">Berdasarkan volume penjualan historis</p>
          
//           <div className="flex-1 min-h-[250px]">
//             {popularProducts.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%" debounce={300}>
//                 <PieChart>
//                   <Pie
//                     data={popularProducts}
//                     cx="50%"
//                     cy="45%"
//                     innerRadius={50}
//                     outerRadius={80}
//                     paddingAngle={5}
//                     dataKey="value"
//                     stroke="none"
//                   >
//                     {popularProducts.map((_entry, index) => (
//                       <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip 
//                     contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
//                     formatter={(value: any) => [`${value} Unit`, 'Terjual']}
//                   />
//                   <Legend 
//                     verticalAlign="bottom" 
//                     height={36}
//                     iconType="circle"
//                     iconSize={8}
//                     wrapperStyle={{ fontSize: '11px', color: '#4b5563' }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">
//                 Belum ada data penjualan produk.
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { BASE_URL } from "../../config/api";

// Palet warna hijau khas Gycora dari gelap ke terang
const PIE_COLORS = ['#065f46', '#059669', '#10b981', '#34d399', '#6ee7b7'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");
  
  // State untuk mengontrol animasi loading (Skeleton)
  const [loading, setLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);

  // --- STATE UNTUK DATA DASHBOARD ---
  const [stats, setStats] = useState<any>({});
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem("admin_user");
    const token = localStorage.getItem("admin_token");

    if (!token || !userStr) {
      navigate("/admin/login");
      return;
    }

    const user = JSON.parse(userStr);
    setAdminName(user.first_name);

    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/dashboard/master-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data.stats || {});
          setRevenueData(data.revenue || []);
          
          const formattedPopular = (data.popular || []).map((item: any) => ({
            name: item.name,
            value: Number(item.total_sold)
          }));
          setPopularProducts(formattedPopular);
          
          // Memberi sedikit delay estetika agar animasi Skeleton terasa natural
          setTimeout(() => {
            setLoading(false);
            // Trigger state kedua untuk animasi fade-in layout
            setTimeout(() => setIsDataReady(true), 50); 
          }, 800);

        } else if (res.status === 401) {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        setLoading(false);
        setIsDataReady(true);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Format angka ke format Rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

  const formatRupiahTooltip = (value: any) => [formatRupiah(value), 'Pendapatan'];

  // =========================================================================
  // ANIMASI LOADING MODERN (SKELETON)
  // =========================================================================
  if (loading) {
    return (
      <div className="p-8 pb-20 mx-auto space-y-8 max-w-7xl animate-pulse">
        {/* Skeleton Header */}
        <div className="flex flex-col gap-3">
          <div className="h-8 bg-gray-200 rounded-lg w-44"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-96"></div>
        </div>

        {/* Skeleton Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="w-32 h-4 mb-4 bg-gray-200 rounded"></div>
              <div className="w-24 h-8 mb-4 bg-gray-200 rounded"></div>
              <div className="w-40 h-3 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>

        {/* Skeleton Charts */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
             <div className="w-48 h-6 mb-6 bg-gray-200 rounded"></div>
             <div className="w-full bg-gray-100 rounded-lg h-72"></div>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
             <div className="w-40 h-6 mb-4 bg-gray-200 rounded"></div>
             <div className="w-24 h-3 mb-6 bg-gray-100 rounded"></div>
             <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full mt-7"></div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TAMPILAN DASHBOARD ASLI DENGAN ANIMASI FADE-IN MUNCUL BERTAHAP
  // =========================================================================
  return (
    <div className={`p-8 pb-20 mx-auto space-y-8 font-sans max-w-7xl transition-all duration-700 ease-out transform ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* HEADER DASHBOARD */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">Selamat datang kembali, <span className="font-semibold text-gycora">{adminName}</span>. Berikut performa Gycora hari ini.</p>
        </div>
      </div>

      {/* STATISTIK UTAMA */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Pendapatan */}
        <div className={`relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-500 delay-100 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute top-0 right-0 p-4 transition-transform transform translate-x-4 -translate-y-4 opacity-10 group-hover:scale-110">
            <svg className="w-24 h-24 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
          </div>
          <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Total Pendapatan</p>
          <h3 className="text-2xl font-extrabold text-gray-900 truncate" title={formatRupiah(stats.total_sales)}>
            {formatRupiah(stats.total_sales)}
          </h3>
          <p className={`flex items-center gap-1 mt-2 text-sm font-medium ${stats.sales_growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {stats.sales_growth >= 0 ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
            )}
            {stats.sales_growth >= 0 ? '+' : ''}{stats.sales_growth}% dari bulan lalu
          </p>
        </div>

        {/* Card 2: Pesanan / Transaksi */}
        <div className={`relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-500 delay-200 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Total Transaksi</p>
          <h3 className="text-3xl font-extrabold text-gray-900">{stats.total_transactions || 0}</h3>
          <p className={`flex items-center gap-1 mt-2 text-sm font-medium ${stats.transaction_growth >= 0 ? 'text-amber-500' : 'text-red-500'}`}>
            {stats.transaction_growth >= 0 ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
            )}
            {stats.transaction_growth >= 0 ? '+' : ''}{stats.transaction_growth}% dari bulan lalu
          </p>
        </div>

        {/* Card 3: Katalog Produk */}
        <div className={`relative p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl group transition-all duration-500 delay-300 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="mb-1 text-sm font-semibold tracking-wider text-gray-500 uppercase">Katalog Produk</p>
          <h3 className="text-3xl font-extrabold text-gray-900">{stats.total_products || 0}</h3>
          <p className="flex items-center gap-1 mt-2 text-sm font-medium text-blue-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            +{stats.new_products_growth || 0} produk baru bulan ini
          </p>
        </div>

        {/* Card 4: Pelanggan Baru */}
        <div className={`relative p-6 overflow-hidden text-white border shadow-lg bg-gradient-to-br from-gycora to-gycora-dark rounded-2xl border-emerald-700 transition-all duration-500 delay-400 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="mb-1 text-sm font-semibold tracking-wider uppercase text-emerald-100">Total Pelanggan</p>
          <h3 className="text-3xl font-extrabold">{stats.total_users || 0}</h3>
          <p className="mt-2 text-sm font-medium text-white">
            +{stats.new_users_growth || 0} pengguna baru bulan ini!
          </p>
        </div>
      </div>

      {/* BARIS GRAFIK: BAR CHART & PIE CHART */}
      <div className={`grid grid-cols-1 gap-8 lg:grid-cols-3 transition-all duration-700 delay-500 ${isDataReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* BAR CHART PENJUALAN (Col-span 2) */}
        <div className="p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Tren Pendapatan 6 Bulan Terakhir</h2>
          </div>
          
          <div className="w-full h-72">
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" debounce={300}>
                <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(val) => `Rp${(val/1000000).toFixed(0)}M`} />
                  <Tooltip 
                    cursor={{fill: '#f9fafb'}} 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                    formatter={formatRupiahTooltip}
                  />
                  <Bar dataKey="total" fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">
                Belum ada data transaksi dalam 6 bulan terakhir.
              </div>
            )}
          </div>
        </div>

        {/* PIE CHART PRODUK POPULER (Col-span 1) */}
        <div className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h2 className="mb-2 text-lg font-bold text-gray-900">Top Produk Terlaris</h2>
          <p className="mb-6 text-xs text-gray-500">Berdasarkan volume penjualan historis</p>
          
          <div className="flex-1 min-h-[250px]">
            {popularProducts.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" debounce={300}>
                <PieChart>
                  <Pie
                    data={popularProducts}
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {popularProducts.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                    formatter={(value: any) => [`${value} Unit`, 'Terjual']}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px', color: '#4b5563' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm italic text-gray-400">
                Belum ada data penjualan produk.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}