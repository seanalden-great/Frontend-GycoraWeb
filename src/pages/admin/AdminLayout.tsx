/* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom"; 
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
  
//   // STATE BARU: Mengontrol buka/tutup dropdown menu Products
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  
//   const location = useLocation(); 
//   const navigate = useNavigate(); 
  
//   const pathname = location.pathname;

//   // =====================================================================
//   // [SOLUSI SATPAM] ROUTE GUARD (CLIENT-SIDE MIDDLEWARE)
//   // =====================================================================
//   useEffect(() => {
//     if (pathname === "/admin/login") {
//       setIsAuthorized(true);
//       return;
//     }

//     const token = localStorage.getItem("admin_token");
//     const userStr = localStorage.getItem("admin_user");

//     if (!token || !userStr) {
//       navigate("/admin/login", { replace: true });
//       return;
//     }

//     const user = JSON.parse(userStr);
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];
    
//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true }); 
//       return;
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate]);

//   // Efek Samping: Buka otomatis dropdown menu jika user sedang berada di halaman turunan products
//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan apakah submenu aktif
//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
      
//       {/* SIDEBAR */}
//       <aside 
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
        
//         {/* Logo Area */}
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <span className="text-2xl font-extrabold tracking-tight text-gycora">
//             {isSidebarOpen ? "Gycora" : "G"}
//           </span>
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-sm font-medium text-gray-400">Admin</span>
//           )}
//         </div>

//         {/* Menu Navigasi */}
//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                Menu Utama
//              </p>
//           ) : (
//             <div className="h-6 mt-4"></div>
//           )}
          
//           <Link 
//             to="/admin/dashboard" 
//             title={!isSidebarOpen ? "Dashboard" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/dashboard') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link 
//             to="/admin/categories" 
//             title={!isSidebarOpen ? "Kategori" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/categories') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU PRODUCTS (DROPDOWN / ACCORDION) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//               <button 
//                 onClick={() => {
//                     if(!isSidebarOpen) setIsSidebarOpen(true);
//                     setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={!isSidebarOpen ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${
//                   isAnyProductSubmenuActive
//                     ? "bg-gycora-light text-gycora-dark" 
//                     : "text-gray-700 hover:bg-gray-100"
//                 } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {/* Ikon panah bawah/atas (Hanya tampil jika sidebar terbuka) */}
//                 {isSidebarOpen && (
//                     <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                 )}
//               </button>

//               {/* Sub-menu Items (Tersembunyi jika sidebar ditutup atau state false) */}
//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link 
//                         to="/admin/products"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Katalog Utama
//                       </Link>
//                       <Link 
//                         to="/admin/stocks"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Stok & Batch Gudang
//                       </Link>
//                   </div>
//               </div>
//           </div>
//           {/* ============================================================== */}

//           {/* ============================================================== */}
//           {/* MENU TRANSAKSI (BARU DITAMBAHKAN) */}
//           {/* ============================================================== */}
//           <Link 
//             to="/admin/transactions" 
//             title={!isSidebarOpen ? "Transaksi" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/transactions') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           <Link 
//             to="/admin/users" 
//             title={!isSidebarOpen ? "Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/users') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>
//         </nav>

//         {/* Footer Sidebar */}
//         <div className="p-4 border-t border-gray-100">
//           <button 
//             onClick={handleLogout}
//             title={!isSidebarOpen ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">
        
//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>
             
//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">Admin Gycora</p>
//                 <p className="text-xs font-medium text-gycora-dark">Staf Manajemen</p>
//               </div>
//               <img 
//                 src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&bold=true" 
//                 alt="Profile Avatar" 
//                 className="object-cover rounded-full h-9 w-9 ring-2 ring-gycora-light"
//               />
//             </div>
//           </div>
//         </header>

//         {/* AREA KONTEN DINAMIS */}
//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

// /* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom"; 
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
  
//   // STATE BARU: Mengontrol buka/tutup dropdown menu Products
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  
//   const location = useLocation(); 
//   const navigate = useNavigate(); 
  
//   const pathname = location.pathname;

//   // =====================================================================
//   // [SOLUSI SATPAM] ROUTE GUARD (CLIENT-SIDE MIDDLEWARE)
//   // =====================================================================
//   useEffect(() => {
//     if (pathname === "/admin/login") {
//       setIsAuthorized(true);
//       return;
//     }

//     const token = localStorage.getItem("admin_token");
//     const userStr = localStorage.getItem("admin_user");

//     if (!token || !userStr) {
//       navigate("/admin/login", { replace: true });
//       return;
//     }

//     const user = JSON.parse(userStr);
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];
    
//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true }); 
//       return;
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate]);

//   // Efek Samping: Buka otomatis dropdown menu jika user sedang berada di halaman turunan products
//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan apakah submenu aktif
//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
      
//       {/* SIDEBAR */}
//       <aside 
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
        
//         {/* Logo Area */}
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <span className="text-2xl font-extrabold tracking-tight text-gycora">
//             {isSidebarOpen ? "Gycora" : "G"}
//           </span>
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-sm font-medium text-gray-400">Admin</span>
//           )}
//         </div>

//         {/* Menu Navigasi */}
//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                Menu Utama
//              </p>
//           ) : (
//             <div className="h-6 mt-4"></div>
//           )}
          
//           <Link 
//             to="/admin/dashboard" 
//             title={!isSidebarOpen ? "Dashboard" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/dashboard') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link 
//             to="/admin/categories" 
//             title={!isSidebarOpen ? "Kategori" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/categories') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU PRODUCTS (DROPDOWN / ACCORDION) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//               <button 
//                 onClick={() => {
//                     if(!isSidebarOpen) setIsSidebarOpen(true);
//                     setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={!isSidebarOpen ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${
//                   isAnyProductSubmenuActive
//                     ? "bg-gycora-light text-gycora-dark" 
//                     : "text-gray-700 hover:bg-gray-100"
//                 } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && (
//                     <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                 )}
//               </button>

//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link 
//                         to="/admin/products"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Katalog Utama
//                       </Link>
//                       <Link 
//                         to="/admin/stocks"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Stok & Batch Gudang
//                       </Link>
//                   </div>
//               </div>
//           </div>
//           {/* ============================================================== */}

//           {/* ============================================================== */}
//           {/* MENU TRANSAKSI */}
//           {/* ============================================================== */}
//           <Link 
//             to="/admin/transactions" 
//             title={!isSidebarOpen ? "Transaksi" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/transactions') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU LAPORAN (SALES REPORT) */}
//           {/* ============================================================== */}
//           <Link 
//             to="/admin/sales-report" 
//             title={!isSidebarOpen ? "Laporan Penjualan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/sales-report') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link 
//             to="/admin/users" 
//             title={!isSidebarOpen ? "Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/users') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>
//         </nav>

//         {/* Footer Sidebar */}
//         <div className="p-4 border-t border-gray-100">
//           <button 
//             onClick={handleLogout}
//             title={!isSidebarOpen ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">
        
//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>
             
//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">Admin Gycora</p>
//                 <p className="text-xs font-medium text-gycora-dark">Staf Manajemen</p>
//               </div>
//               <img 
//                 src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&bold=true" 
//                 alt="Profile Avatar" 
//                 className="object-cover rounded-full h-9 w-9 ring-2 ring-gycora-light"
//               />
//             </div>
//           </div>
//         </header>

//         {/* AREA KONTEN DINAMIS */}
//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
// import { Link, useLocation, useNavigate } from "react-router-dom"; 
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
  
//   // STATE BARU: Mengontrol buka/tutup dropdown menu Products
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  
//   const location = useLocation(); 
//   const navigate = useNavigate(); 
  
//   const pathname = location.pathname;

//   // =====================================================================
//   // [SOLUSI SATPAM] ROUTE GUARD (CLIENT-SIDE MIDDLEWARE)
//   // =====================================================================
//   useEffect(() => {
//     if (pathname === "/admin/login") {
//       setIsAuthorized(true);
//       return;
//     }

//     const token = localStorage.getItem("admin_token");
//     const userStr = localStorage.getItem("admin_user");

//     if (!token || !userStr) {
//       navigate("/admin/login", { replace: true });
//       return;
//     }

//     const user = JSON.parse(userStr);
//     const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];
    
//     if (!allowedRoles.includes(user.usertype)) {
//       Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
//       navigate("/login", { replace: true }); 
//       return;
//     }

//     setIsAuthorized(true);
//   }, [pathname, navigate]);

//   // Efek Samping: Buka otomatis dropdown menu jika user sedang berada di halaman turunan products
//   useEffect(() => {
//       if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
//           setIsProductMenuOpen(true);
//       }
//   }, [pathname]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Keluar dari Portal?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Ya, Keluar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("admin_token");
//         localStorage.removeItem("admin_user");
//         navigate("/admin/login");
//       }
//     });
//   };

//   if (!isAuthorized) {
//     return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
//   }

//   if (pathname === "/admin/login") {
//     return <>{children}</>;
//   }

//   // Helper untuk menentukan apakah submenu aktif
//   const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
//   const isStocksActive = pathname.includes('/admin/stocks');
//   const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

//   return (
//     <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
      
//       {/* SIDEBAR */}
//       <aside 
//         className={`${
//           isSidebarOpen ? "w-64" : "w-20"
//         } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
//       >
        
//         {/* Logo Area */}
//         <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
//           <span className="text-2xl font-extrabold tracking-tight text-gycora">
//             {isSidebarOpen ? "Gycora" : "G"}
//           </span>
//           {isSidebarOpen && (
//             <span className="mt-1 ml-2 text-sm font-medium text-gray-400">Admin</span>
//           )}
//         </div>

//         {/* Menu Navigasi */}
//         <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
//           {isSidebarOpen ? (
//              <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
//                Menu Utama
//              </p>
//           ) : (
//             <div className="h-6 mt-4"></div>
//           )}
          
//           <Link 
//             to="/admin/dashboard" 
//             title={!isSidebarOpen ? "Dashboard" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/dashboard') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Dashboard</span>}
//           </Link>

//           <Link 
//             to="/admin/categories" 
//             title={!isSidebarOpen ? "Kategori" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/categories') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Kategori</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU PRODUCTS (DROPDOWN / ACCORDION) */}
//           {/* ============================================================== */}
//           <div className="flex flex-col">
//               <button 
//                 onClick={() => {
//                     if(!isSidebarOpen) setIsSidebarOpen(true);
//                     setIsProductMenuOpen(!isProductMenuOpen);
//                 }}
//                 title={!isSidebarOpen ? "Produk" : ""}
//                 className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${
//                   isAnyProductSubmenuActive
//                     ? "bg-gycora-light text-gycora-dark" 
//                     : "text-gray-700 hover:bg-gray-100"
//                 } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//               >
//                 <div className="flex items-center gap-3">
//                     <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     {isSidebarOpen && <span className="truncate">Produk</span>}
//                 </div>
//                 {isSidebarOpen && (
//                     <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                 )}
//               </button>

//               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
//                   <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
//                       <Link 
//                         to="/admin/products"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Katalog Utama
//                       </Link>
//                       <Link 
//                         to="/admin/stocks"
//                         className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
//                       >
//                           Stok & Batch Gudang
//                       </Link>
//                   </div>
//               </div>
//           </div>
//           {/* ============================================================== */}

//           {/* ============================================================== */}
//           {/* MENU TRANSAKSI */}
//           {/* ============================================================== */}
//           <Link 
//             to="/admin/transactions" 
//             title={!isSidebarOpen ? "Transaksi" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/transactions') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Transaksi</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU LAPORAN (SALES REPORT) */}
//           {/* ============================================================== */}
//           <Link 
//             to="/admin/sales-report" 
//             title={!isSidebarOpen ? "Laporan Penjualan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/sales-report') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Laporan</span>}
//           </Link>

//           <Link 
//             to="/admin/users" 
//             title={!isSidebarOpen ? "Pelanggan" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/users') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Pelanggan</span>}
//           </Link>

//           {/* ============================================================== */}
//           {/* MENU SUBSCRIBERS (BARU) */}
//           {/* ============================================================== */}
//           <Link 
//             to="/admin/subscribers" 
//             title={!isSidebarOpen ? "Subscribers" : ""}
//             className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
//               pathname.includes('/subscribers') 
//                 ? "bg-gycora-light text-gycora-dark" 
//                 : "text-gray-700 hover:bg-gray-100"
//             } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//             {isSidebarOpen && <span className="truncate">Subscribers</span>}
//           </Link>

//         </nav>

//         {/* Footer Sidebar */}
//         <div className="p-4 border-t border-gray-100">
//           <button 
//             onClick={handleLogout}
//             title={!isSidebarOpen ? "Logout" : ""}
//             className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
//           >
//             <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {isSidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">
        
//         {/* HEADER */}
//         <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
//               title="Toggle Sidebar"
//             >
//                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                </svg>
//             </button>
             
//              <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
//                 {pathname.split('/').pop() || 'Dashboard'}
//              </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-bold leading-tight text-gray-900">Admin Gycora</p>
//                 <p className="text-xs font-medium text-gycora-dark">Staf Manajemen</p>
//               </div>
//               <img 
//                 src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&bold=true" 
//                 alt="Profile Avatar" 
//                 className="object-cover rounded-full h-9 w-9 ring-2 ring-gycora-light"
//               />
//             </div>
//           </div>
//         </header>

//         {/* AREA KONTEN DINAMIS */}
//         <main className="flex-1 overflow-y-auto bg-gray-50/50">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import logoGycora from "../../assets/gycora_logo.png"; // <-- Import Logo

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // STATE BARU: Mengontrol buka/tutup dropdown menu Products
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  
  const location = useLocation(); 
  const navigate = useNavigate(); 
  
  const pathname = location.pathname;

  // =====================================================================
  // [SOLUSI SATPAM] ROUTE GUARD (CLIENT-SIDE MIDDLEWARE)
  // =====================================================================
  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    const token = localStorage.getItem("admin_token");
    const userStr = localStorage.getItem("admin_user");

    if (!token || !userStr) {
      navigate("/admin/login", { replace: true });
      return;
    }

    const user = JSON.parse(userStr);
    const allowedRoles = ['admin', 'superadmin', 'gudang', 'accounting'];
    
    if (!allowedRoles.includes(user.usertype)) {
      Swal.fire("Akses Ditolak", "Halaman ini khusus untuk Staf Manajemen.", "error");
      navigate("/login", { replace: true }); 
      return;
    }

    setIsAuthorized(true);
  }, [pathname, navigate]);

  // Efek Samping: Buka otomatis dropdown menu jika user sedang berada di halaman turunan products
  useEffect(() => {
      if(pathname.includes('/admin/products') || pathname.includes('/admin/stocks')) {
          setIsProductMenuOpen(true);
      }
  }, [pathname]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar dari Portal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Keluar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        navigate("/admin/login");
      }
    });
  };

  if (!isAuthorized) {
    return <div className="flex items-center justify-center min-h-screen font-sans bg-gray-50">Memverifikasi Akses...</div>;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Helper untuk menentukan apakah submenu aktif
  const isProductsActive = pathname === '/admin/products' || pathname.includes('/admin/products/create') || pathname.includes('/admin/products/') && !pathname.includes('stocks');
  const isStocksActive = pathname.includes('/admin/stocks');
  const isAnyProductSubmenuActive = isProductsActive || isStocksActive;

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
      
      {/* SIDEBAR */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 transition-all duration-300 ease-in-out hidden md:flex`}
      >
        
        {/* Logo Area */}
        <div className={`h-16 flex items-center border-b border-gray-100 overflow-hidden whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
          <img 
            src={logoGycora} 
            alt="Gycora Logo" 
            className={`object-contain transition-all duration-300 ${isSidebarOpen ? 'h-8' : 'h-6'}`} 
          />
          {isSidebarOpen && (
            <span className="mt-1 ml-2 text-[10px] font-bold tracking-widest text-gycora uppercase">Admin</span>
          )}
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          {isSidebarOpen ? (
             <p className="px-4 mt-4 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase transition-opacity duration-300">
               Menu Utama
             </p>
          ) : (
            <div className="h-6 mt-4"></div>
          )}
          
          <Link 
            to="/admin/dashboard" 
            title={!isSidebarOpen ? "Dashboard" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
              pathname.includes('/dashboard') 
                ? "bg-gycora-light text-gycora-dark" 
                : "text-gray-700 hover:bg-gray-100"
            } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/dashboard') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {isSidebarOpen && <span className="truncate">Dashboard</span>}
          </Link>

          <Link 
            to="/admin/categories" 
            title={!isSidebarOpen ? "Kategori" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
              pathname.includes('/categories') 
                ? "bg-gycora-light text-gycora-dark" 
                : "text-gray-700 hover:bg-gray-100"
            } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/categories') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {isSidebarOpen && <span className="truncate">Kategori</span>}
          </Link>

          {/* ============================================================== */}
          {/* MENU PRODUCTS (DROPDOWN / ACCORDION) */}
          {/* ============================================================== */}
          <div className="flex flex-col">
              <button 
                onClick={() => {
                    if(!isSidebarOpen) setIsSidebarOpen(true);
                    setIsProductMenuOpen(!isProductMenuOpen);
                }}
                title={!isSidebarOpen ? "Produk" : ""}
                className={`flex items-center justify-between py-2.5 rounded-lg font-medium group transition-colors ${
                  isAnyProductSubmenuActive
                    ? "bg-gycora-light text-gycora-dark" 
                    : "text-gray-700 hover:bg-gray-100"
                } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
              >
                <div className="flex items-center gap-3">
                    <svg className={`w-6 h-6 shrink-0 transition-colors ${isAnyProductSubmenuActive ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {isSidebarOpen && <span className="truncate">Produk</span>}
                </div>
                {isSidebarOpen && (
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isProductMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                )}
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProductMenuOpen && isSidebarOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                  <div className="flex flex-col pl-2 space-y-1 border-l-2 border-gray-100 ml-11">
                      <Link 
                        to="/admin/products"
                        className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isProductsActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                      >
                          Katalog Utama
                      </Link>
                      <Link 
                        to="/admin/stocks"
                        className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${isStocksActive ? 'text-gycora bg-emerald-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                      >
                          Stok & Batch Gudang
                      </Link>
                  </div>
              </div>
          </div>
          {/* ============================================================== */}

          {/* ============================================================== */}
          {/* MENU TRANSAKSI */}
          {/* ============================================================== */}
          <Link 
            to="/admin/transactions" 
            title={!isSidebarOpen ? "Transaksi" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
              pathname.includes('/transactions') 
                ? "bg-gycora-light text-gycora-dark" 
                : "text-gray-700 hover:bg-gray-100"
            } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/transactions') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {isSidebarOpen && <span className="truncate">Transaksi</span>}
          </Link>

          {/* ============================================================== */}
          {/* MENU LAPORAN (SALES REPORT) */}
          {/* ============================================================== */}
          <Link 
            to="/admin/sales-report" 
            title={!isSidebarOpen ? "Laporan Penjualan" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
              pathname.includes('/sales-report') 
                ? "bg-gycora-light text-gycora-dark" 
                : "text-gray-700 hover:bg-gray-100"
            } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/sales-report') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isSidebarOpen && <span className="truncate">Laporan</span>}
          </Link>

          <Link 
            to="/admin/users" 
            title={!isSidebarOpen ? "Pelanggan" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
              pathname.includes('/users') 
                ? "bg-gycora-light text-gycora-dark" 
                : "text-gray-700 hover:bg-gray-100"
            } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/users') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {isSidebarOpen && <span className="truncate">Pelanggan</span>}
          </Link>

          {/* ============================================================== */}
          {/* MENU SUBSCRIBERS */}
          {/* ============================================================== */}
          <Link 
            to="/admin/subscribers" 
            title={!isSidebarOpen ? "Subscribers" : ""}
            className={`flex items-center gap-3 py-2.5 rounded-lg font-medium group transition-colors ${
              pathname.includes('/subscribers') 
                ? "bg-gycora-light text-gycora-dark" 
                : "text-gray-700 hover:bg-gray-100"
            } ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg className={`w-6 h-6 shrink-0 transition-colors ${pathname.includes('/subscribers') ? "text-gycora" : "text-gray-400 group-hover:text-gycora"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {isSidebarOpen && <span className="truncate">Subscribers</span>}
          </Link>

        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            title={!isSidebarOpen ? "Logout" : ""}
            className={`flex items-center gap-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* HEADER */}
        <header className="z-0 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gycora/20"
              title="Toggle Sidebar"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
            </button>
             
             <h2 className="hidden text-lg font-semibold text-gray-800 capitalize sm:block">
                {pathname.split('/').pop() || 'Dashboard'}
             </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold leading-tight text-gray-900">Admin Gycora</p>
                <p className="text-xs font-medium text-gycora-dark">Staf Manajemen</p>
              </div>
              <img 
                src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff&bold=true" 
                alt="Profile Avatar" 
                className="object-cover rounded-full h-9 w-9 ring-2 ring-gycora-light"
              />
            </div>
          </div>
        </header>

        {/* AREA KONTEN DINAMIS */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          {children}
        </main>

      </div>
    </div>
  );
}