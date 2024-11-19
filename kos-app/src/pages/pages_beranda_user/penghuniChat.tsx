import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate dari react-router-dom
import "./css/penghuniChat.css";

interface FAQ {
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const navigate = useNavigate(); // Menggunakan hook useNavigate

  const faqs: FAQ[] = [
    {
      question: "Bagaimana cara melakukan pembayaran sewa bulan ini?",
      answer:
        "Pembayaran sewa bulan ini dapat dilakukan melalui transfer bank ke rekening kami. Harap pastikan untuk menyertakan kode unik yang tertera pada invoice.",
    },
    {
      question: "Apa saja yang harus dibawa saat tinggal di kos?",
      answer:
        "Bawalah barang-barang pribadi seperti pakaian, perlengkapan mandi, dan peralatan elektronik yang diperlukan. Pastikan juga membawa dokumen yang dibutuhkan seperti KTP atau kartu identitas lainnya.",
    },
    {
      question: "Apakah ada jadwal kebersihan yang harus saya ikuti?",
      answer:
        "Jadwal kebersihan rutin dilakukan setiap hari Senin dan Kamis. Namun, Anda dapat membersihkan kamar kapan saja sesuai kebutuhan, selama tidak mengganggu penghuni lainnya.",
    },
    {
      question: "Apakah ada biaya tambahan selain sewa kamar?",
      answer:
        "Tidak ada biaya tambahan selain sewa kamar, kecuali biaya listrik dan air jika penggunaan melebihi batas yang telah ditentukan oleh pengelola kos.",
    },
    {
      question: "Apakah bisa memperpanjang masa sewa?",
      answer:
        "Ya, Anda bisa memperpanjang masa sewa dengan memberitahukan kami minimal satu minggu sebelum masa sewa berakhir. Pembayaran untuk perpanjangan bisa dilakukan di awal bulan baru.",
    },
    {
      question: "Bagaimana jika saya terlambat membayar sewa?",
      answer:
        "Jika terlambat membayar sewa, akan dikenakan denda sebesar 10% dari jumlah sewa per minggu. Pastikan untuk melakukan pembayaran tepat waktu untuk menghindari denda.",
    },
    {
      question: "Apa ada aturan khusus mengenai tamu di kos?",
      answer:
        "Tamu hanya diperbolehkan datang hingga pukul 10 malam. Tamu harus diberitahukan kepada pengelola kos dan harus meninggalkan kos sebelum batas waktu yang ditentukan.",
    },
  ];

  // Fungsi untuk menangani klik pada pertanyaan
  const handleClick = (index: number) => {
    setSelectedQuestion(selectedQuestion === index ? null : index); // Toggle jawabannya
  };

  // Fungsi untuk kembali ke beranda
  const handleBackToHome = () => {
    navigate("/penghuniWelcome"); // Navigasi ke halaman beranda
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Pertanyaan Umum</h2> {/* Tambahkan kelas untuk judul */}
      <ul className="faq-list"> {/* Tambahkan kelas untuk ul */}
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item"> {/* Tambahkan kelas untuk li */}
            <button className="faq-button" onClick={() => handleClick(index)}> {/* Tambahkan kelas untuk tombol */}
              {faq.question}
            </button>
            {selectedQuestion === index && <p className="faq-answer">{faq.answer}</p>} {/* Tambahkan kelas untuk jawaban */}
          </li>
        ))}
      </ul>
  
      {/* Tombol Kembali ke Beranda */}
      <button className="back-to-home" onClick={handleBackToHome}>
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default FAQs;
