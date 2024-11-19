import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./css/penghuniPembayaran.css"; // Mengimpor CSS untuk styling

type PaymentStatus = "processing" | "success"; // Status pembayaran

const PenghuniPembayaran: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const paymentStatus: PaymentStatus = "processing"; // Atur status di sini

  const handleBackClick = () => {
    navigate("/penghuniWelcome"); // Ganti "/desired-page" dengan path yang ingin dituju
  };

  return (
    <div className="payment-container">
      <h2>Pembayaran</h2>
      <p>Tagihan Bulan Ini</p>
      <div className="payment-card">
        <ul className="payment-list">
          <li>Listrik: Rp. 100.000,00</li>
          <li>Air PDAM: Rp. 100.000,00</li>
          <li>Sewa Kamar: Rp. 200.000,00</li>
          <li>Wifi: Rp. 100.000,00</li>
        </ul>
        <hr />
        <p>
          <strong>Total:</strong> Rp. 500.000,00
        </p>
        <p>
          <strong>Pembayaran Via Mandiri:</strong> 6032 9875 0917 2612
        </p>
        <div className="payment-status">
          <span
            className={`status-indicator ${
              paymentStatus === "processing"
                ? "status-processing"
                : "status-success"
            }`}
          >
            {paymentStatus === "processing" ? "Sedang Diproses" : "Berhasil"}
          </span>
        </div>
      </div>
      <button
        className="btn btn-back"
        onClick={handleBackClick} // Use the handleBackClick function
      >
        Balik ke Beranda
      </button>
    </div>
  );
};

export default PenghuniPembayaran;
