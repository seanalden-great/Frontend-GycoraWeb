import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  usertype: string;
  is_subscribed: boolean;
  created_at: string;
}

export default function AdminUsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

const fetchUsers = async () => {
    try {
      // 1. Ambil token admin dari localStorage (sesuaikan nama key-nya, misal "user_token")
      const token = localStorage.getItem("admin_token");

      // 2. Tambahkan header Authorization dan Accept
      const res = await fetch("https://backend-gycora-web.vercel.app/api/api/admin/users", {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error("Gagal load data pelanggan");
      
      const data = await res.json();
      
      // 3. Perbaiki typo logika ternary (jika tidak ada data.data, ambil data langsung)
      const responseData = data.data ? data.data : data;
      
      setUsers(responseData || []);
    } catch (error) {
      console.error("Gagal mengambil data users:", error);
      Swal.fire("Error", "Gagal memuat daftar pelanggan", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] font-sans">
        <div className="w-10 h-10 border-b-2 rounded-full animate-spin border-gycora"></div>
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto space-y-6 font-sans max-w-7xl animate-fade-in-up">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftar Pelanggan</h1>
          <p className="mt-1 text-sm text-gray-500">Kelola data pengguna terdaftar di Gycora.</p>
        </div>
        <div className="px-4 py-2 text-sm font-bold border rounded-lg bg-emerald-50 text-emerald-700 border-emerald-100">
          Total: {users.length} Pelanggan
        </div>
      </div>

      {/* Tabel Data Pengguna */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Pelanggan</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                <th className="p-4 text-xs font-bold text-center text-gray-500 uppercase">Status Berlangganan</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Tanggal Daftar</th>
                <th className="p-4 text-xs font-bold text-right text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id} className="transition-colors hover:bg-gray-50">
                  <td className="flex items-center gap-3 p-4">
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-bold uppercase rounded-full bg-gycora-light text-gycora-dark shrink-0">
                      {u.first_name.charAt(0)}{u.last_name.charAt(0)}
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-gray-900">{u.first_name} {u.last_name}</span>
                      <span className="text-xs text-gray-500">ID: {u.id}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{u.email}</td>
                  <td className="p-4 text-center">
                    {u.is_subscribed ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Subscribed</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">Reguler</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(u.created_at)}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-sm font-medium transition-colors text-gycora hover:text-gycora-dark">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Belum ada pelanggan yang terdaftar.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}