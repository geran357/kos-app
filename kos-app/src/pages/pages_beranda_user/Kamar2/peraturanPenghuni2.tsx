import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/peraturanPenghuni2.css";

const PeraturanKos2: React.FC = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleBackToHome = () => {
    navigate("/penghuniWelcome2"); // Navigasi ke halaman beranda
  };
  

  return (
    <div className="peraturan-container">
      <h1>Peraturan Kos</h1>
      <ul className="peraturan-list">
        <li>
          <strong>1. Jam Malam:</strong> Jam malam dimulai pukul 22:00 WIB.
          Penghuni diharapkan berada di dalam kos pada jam tersebut.
        </li>
        <li>
          <strong>2. Kebersihan:</strong> Penghuni wajib menjaga kebersihan
          lingkungan kos dan kamar tidur masing-masing.
        </li>
        <li>
          <strong>3. Kebisingan:</strong> Dilarang membuat kebisingan atau
          mengganggu ketenangan penghuni lain, terutama pada malam hari.
        </li>
        <li>
          <strong>4. Tamu:</strong> Tamu hanya diperbolehkan datang ke kos pada
          jam tertentu dan wajib melapor kepada pengelola kos.
        </li>
        <li>
          <strong>5. Merokok:</strong> Merokok hanya diperbolehkan di area yang
          telah disediakan oleh pengelola kos.
        </li>
        <li>
          <strong>6. Kewajiban Pembayaran:</strong> Pembayaran kos dilakukan
          tepat waktu setiap bulan, sesuai dengan ketentuan yang berlaku.
        </li>
        <li>
          <strong>7. Larangan Membawa Hewan:</strong> Hewan peliharaan tidak
          diperbolehkan di dalam area kos.
        </li>
      </ul>
      <p className="catatan">
        Jika ada pertanyaan lebih lanjut, silakan hubungi pengelola kos.
      </p>
      {/* Tombol Kembali ke Beranda */}
      <button className="back-to-home" onClick={handleBackToHome}>
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default PeraturanKos2;
