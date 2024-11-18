import React, { useEffect, useState } from "react";
import "./css/penghuniWelcome.css";

const PenghuniWelcome: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    // Ambil data pengguna dari localStorage setelah login
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername); // Set username yang diambil dari localStorage
    }
  }, []);

  return (
    <div className="welcome-container">
      <aside className="sidebar">
        <div className="profile-section">
          <div className="profile-picture"></div>
          <div className="profile-info">
            <p className="name">{username || "Guest"}</p>{" "}
            {/* Tampilkan username atau "Guest" */}
            <p className="role">Penghuni kos</p>
          </div>
        </div>

        <nav className="menu">
          <ul>
            <li>📊 Dasbor</li>
            <li>👤 Profil Saya</li>
            <li className="menu-section">KEUANGAN</li>
            <li>💲 Pembayaran</li>
            <li className="menu-section">Tugas</li>
            <li>✅ Tugas Saya</li>
            <li className="menu-section">Chat</li>
            <li>✅ Chat dengan IbuKos</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <p>Hi, {username || "Guest"}</p>{" "}
          {/* Tampilkan username atau "Guest" */}
        </header>

        <div className="content">
          <div className="background">
            <div className="chair"></div>{" "}
            {/* Tambahkan gambar atau konten lain */}
          </div>

          <section className="dashboard">
          </section>
        </div>
      </main>
    </div>
  );
};

export default PenghuniWelcome;
