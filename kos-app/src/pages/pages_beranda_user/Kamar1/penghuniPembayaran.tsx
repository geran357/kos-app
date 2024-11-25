import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./css/penghuniPembayaran.css"; // Pastikan menggunakan file CSS yang sesuai

const PenghuniPembayaran: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const paymentId = "rjk4x8sl3j7h6675dz8c9qkn"; // documentId yang ingin diambil

  // Ambil data pembayaran dari Strapi berdasarkan documentId
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/tagihans"); // Ambil semua data
        console.log(response.data); // Lihat struktur data yang diterima

        // Filter data berdasarkan documentId yang sesuai
        const filteredData = response.data.data.find((item: any) => item.documentId === paymentId);

        if (filteredData) {
          setPaymentDetails(filteredData); // Set data yang sesuai ke state
        } else {
          console.error("Data dengan documentId tidak ditemukan");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchPaymentDetails();
  }, []);  // Gunakan array kosong agar hanya memanggil sekali saat komponen pertama kali dimuat

  // Cek apakah data pembayaran sudah diterima
  if (!paymentDetails) {
    return <p>Loading...</p>;
  }

  // Ambil properti langsung dari paymentDetails
  const { Items, Total, Pembayaran_Visa_Mandiri, Status_Pembayaran } = paymentDetails;

  const handleBack = () => {
    navigate("/penghuniWelcome"); // Kembali ke halaman penghuniWelcome
  };

  return (
    <div className="payment-container">
      <h2>Pembayaran</h2>
      <p>Tagihan Bulan Ini</p>
      <div className="payment-card">
        {/* Menampilkan list tagihan */}
        <ul className="payment-list">
          {Items.items?.map((item: any, index: number) => (
            <li key={index}>
              {item.name}: Rp. {item.amount.toLocaleString()}
            </li>
          ))}
        </ul>
        <hr />
        <p>
          <strong>Total:</strong> Rp. {Total.toLocaleString()}
        </p>
        <p>
          <strong>Pembayaran Via Mandiri:</strong> {Pembayaran_Visa_Mandiri}
        </p>
        <div className="payment-status">
          <span
            className={`status-indicator ${
              Status_Pembayaran === "Belum" ? "status-processing" : "status-success"
            }`}
          >
            {Status_Pembayaran === "Belum" ? "Sedang Diproses" : "Berhasil"}
          </span>
        </div>
      </div>
      {/* Tambahkan tombol kembali */}
      <button onClick={handleBack} className="back-button">
        Kembali
      </button>
    </div>
  );
};

export default PenghuniPembayaran;
