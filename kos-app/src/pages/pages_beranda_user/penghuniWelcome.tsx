import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./css/penghuniWelcome.css";

const PenghuniWelcome: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    // Ambil data pengguna dari localStorage setelah login
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername || "Guest"); // Set default jika tidak ada username
  }, []);

  return (
    <div className="welcome-container">
      <aside className="sidebar">
        <div className="profile-section">
          <div className="profile-picture"></div>
          <div className="profile-info">
            <p className="name">{username}</p>
            <p className="role">Penghuni kos</p>
          </div>
        </div>

        <nav className="menu">
          <ul>
            <li>
              <button onClick={() => navigate("/")}>📊 Dasbor</button>
            </li>
            <li>
              <button onClick={() => navigate("/peraturanPenghuni")}>
                ☑️ Peraturan Penghuni
              </button>
            </li>
            <li className="menu-section">Keuangan</li>
            <li>
              <button onClick={() => navigate("/penghuniPembayaran")}>
                💲 Pembayaran
              </button>
            </li>
            <li className="menu-section">Tugas</li>
            <li>
              <button onClick={() => navigate("/penghuniTugas")}>
                ✅ Tugas Saya
              </button>
            </li>
            <li className="menu-section">Chat</li>
            <li>
              <button onClick={() => navigate("/penghuniChat")}>
                💬 ada yang ingin ditanyakan?
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <p>Hi, {username}</p>
        </header>

        <div className="content">
          <div className="background">
            <h2>
              {" "}
              <p>Selamat datang di platform penghuni kos!</p>
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PenghuniWelcome;
