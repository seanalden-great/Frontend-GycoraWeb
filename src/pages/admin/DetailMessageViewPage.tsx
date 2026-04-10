/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

export default function DetailMessageViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [msg, setMsg] = useState<any>(null);
  const [responseForm, setResponseForm] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetail = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      
      if (res.ok) {
        const data = await res.json();
        setMsg(data);
      } else {
        throw new Error("Message not found");
      }
    } catch (error) {
      Swal.fire("Error", "Gagal memuat detail pesan.", "error");
      navigate("/admin/messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseForm.trim()) return;

    setIsSending(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/messages/${msg.id}/respond`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({ response: responseForm })
      });

      if (res.ok) {
        Swal.fire("Success", "Balasan berhasil dikirim ke email pelanggan!", "success");
        fetchDetail(); // Refresh data to show "Replied" status
      } else {
        throw new Error("Gagal mengirim balasan");
      }
    } catch (error) {
      Swal.fire("Error", "Gagal mengirim balasan email.", "error");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) return <div className="py-20 text-center animate-pulse">Memuat pesan...</div>;
  if (!msg) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-gray-900"
        >
          <span>&larr;</span> Back to Messages
        </button>
      </div>

      {/* PENGIRIM INFO */}
      <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{msg.name}</h2>
            <p className="text-gray-500">{msg.email} | {msg.phone || 'No Phone'}</p>
          </div>
          <span className="px-3 py-1 text-xs font-medium text-gray-400 rounded-full bg-gray-50">
            Received: {new Date(msg.created_at).toLocaleString('id-ID')}
          </span>
        </div>

        <div className="p-6 border border-gray-200 bg-gray-50 rounded-xl">
          <p className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">Inquiry Message</p>
          <p className="leading-relaxed text-gray-800 whitespace-pre-wrap">{msg.description}</p>
        </div>
      </div>

      {/* RESPONSE AREA */}
      <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <h3 className="mb-4 text-lg font-bold">Admin Response</h3>
        
        {msg.response ? (
          <div className="p-6 border border-emerald-200 bg-emerald-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {/* Sesuaikan alamat email admin di bawah ini jika perlu */}
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-700">Replied from admin@gycora.com</span>
            </div>
            <p className="leading-relaxed text-gray-800 whitespace-pre-wrap">{msg.response}</p>
          </div>
        ) : (
          <form onSubmit={sendResponse}>
            <p className="mb-2 text-xs text-gray-500">
              Write a response. This will be sent to <strong>{msg.email}</strong> via <em>admin@gycora.com</em>.
            </p>
            <textarea 
              value={responseForm}
              onChange={(e) => setResponseForm(e.target.value)}
              rows={6} 
              className="w-full p-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
              placeholder="Type your response here..."
              required
            ></textarea>
            <div className="flex justify-end mt-4">
              <button 
                type="submit" 
                disabled={isSending || !responseForm.trim()} 
                className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition bg-gray-900 rounded-xl hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSending ? 'Sending Email...' : 'Send Response'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}