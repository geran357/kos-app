import React from "react";
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate untuk navigasi
import "../pages/LupaPassword.css"; // Mengimpor CSS untuk halaman lupa password

const LupaPassword: React.FC = () => {
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  const handleBackToLogin = (): void => {
    navigate("/login"); // Navigasi kembali ke halaman login
  };

  return (
    <div className="lupa-password-container">
      <h2 className="lupa-password-title">Lupa Password?</h2>
      <p className="lupa-password-description">
        Jangan khawatir! Anda bisa menghubungi ibu kos melalui WhatsApp untuk mendapatkan bantuan lebih lanjut.
      </p>
      <div className="whatsapp-container">
        <a
          href="https://wa.me/6281234567890" // Ganti dengan nomor WhatsApp ibu kos
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubungi Ibu Kos di WhatsApp
        </a>
      </div>
      <button className="back-to-login" onClick={handleBackToLogin}>
        Kembali ke Login
      </button>
    </div>
  );
};

export default LupaPassword;
