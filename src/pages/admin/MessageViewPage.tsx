/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";

export default function MessageViewPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/messages`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Gagal memuat pesan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // --- COMPUTED PROPERTIES ---
  const totalMessages = useMemo(() => messages.length, [messages]);
  const unreadMessages = useMemo(() => messages.filter((m) => !m.is_read).length, [messages]);
  const respondedMessages = useMemo(() => messages.filter((m) => m.response).length, [messages]);

  const filteredMessages = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query)
    );
  }, [messages, searchQuery]);

  const paginatedMessages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMessages.slice(start, start + itemsPerPage);
  }, [filteredMessages, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  // --- HANDLERS ---
  const goToDetail = (id: number) => {
    navigate(`/admin/messages/${id}`);
  };

  return (
    <div className="relative p-8 font-sans bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px] animate-fade-in">
      
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
        <div className="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
            Total Messages
          </p>
          <p className="text-4xl font-black text-black">{totalMessages}</p>
        </div>
        <div className="p-6 border bg-amber-50/50 border-amber-100 rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest uppercase text-amber-500">
            Unread
          </p>
          <p className="text-4xl font-black text-amber-600">{unreadMessages}</p>
        </div>
        <div className="p-6 border bg-emerald-50/50 border-emerald-100 rounded-2xl">
          <p className="mb-1 text-xs font-bold tracking-widest uppercase text-emerald-600">
            Responded
          </p>
          <p className="text-4xl font-black text-emerald-700">{respondedMessages}</p>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Inbound Messages</h1>
        <p className="text-sm text-gray-500">View and respond to inquiries from customers.</p>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            type="text"
            placeholder="Search sender or email..."
            className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100">
              <th className="pb-4 pl-2 font-medium">Status</th>
              <th className="pb-4 font-medium">Sender</th>
              <th className="w-1/3 pb-4 font-medium">Message Snippet</th>
              <th className="pb-4 font-medium text-center">Date</th>
              <th className="pb-4 pr-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400 animate-pulse">Memuat pesan...</td>
              </tr>
            ) : paginatedMessages.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 italic text-center text-gray-400">Tidak ada pesan ditemukan.</td>
              </tr>
            ) : (
              paginatedMessages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`transition border-b border-gray-50 ${!msg.is_read ? 'bg-amber-50/30' : 'hover:bg-gray-50'}`}
                >
                  <td className="py-4 pl-2 align-middle">
                    {msg.response ? (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Replied</span>
                    ) : !msg.is_read ? (
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-sm">New</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Read</span>
                    )}
                  </td>
                  <td className="py-4 align-middle">
                    <p className="font-bold text-gray-900">{msg.name}</p>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                  </td>
                  <td className="py-4 align-middle max-w-[200px]">
                    <p className="text-sm truncate">{msg.description}</p>
                  </td>
                  <td className="py-4 text-xs text-center text-gray-400 align-middle">
                    {new Date(msg.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-4 pr-2 text-right align-middle">
                    <button
                      onClick={() => goToDetail(msg.id)}
                      className="px-4 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-lg hover:bg-black"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Simple Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}