/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../config/api";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  transactionId: string;
  onSuccess: () => void;
}

export default function ReviewModal({ isOpen, onClose, productId, productName, transactionId, onSuccess }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("user_token");

    const formData = new FormData();
    formData.append("product_id", String(productId));
    formData.append("transaction_id", transactionId);
    formData.append("rating", String(rating));
    formData.append("comment", comment);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${BASE_URL}/api/reviews`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" },
        body: formData, // Browser mengatur Content-Type otomatis untuk multipart/form-data
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Berhasil", "Terima kasih atas ulasan Anda!", "success");
        onSuccess();
        onClose();
      } else {
        Swal.fire("Gagal", data.message || "Gagal mengirim ulasan", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Terjadi kesalahan server.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-3xl animate-fade-in-up">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Beri Ulasan</h3>
          <button onClick={onClose} className="text-2xl font-light text-gray-400 hover:text-gray-900">&times;</button>
        </div>

        <p className="mb-4 text-sm text-gray-500">Bagaimana kepuasan Anda terhadap <span className="font-bold text-gycora">{productName}</span>?</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-4xl transition-transform hover:scale-110 ${rating >= star ? 'text-amber-400' : 'text-gray-200'}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Comment */}
          <div>
            <label className="block mb-2 text-xs font-bold text-gray-700">Tuliskan pengalaman Anda</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Kualitas produk, kecepatan pengiriman, dll..."
              className="w-full p-3 border border-gray-200 outline-none resize-none rounded-xl focus:ring-2 focus:ring-gycora bg-gray-50"
            ></textarea>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block mb-2 text-xs font-bold text-gray-700">Tambahkan Foto (Opsional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gycora text-white font-bold rounded-xl shadow-lg hover:bg-gycora-dark transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
          </button>
        </form>
      </div>
    </div>
  );
}