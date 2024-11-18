//Sidebar.tsx
import { Link } from "react-router-dom";

import React from 'react';
import './css/sidebar.css';

const SidebarNavbar: React.FC = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="user-info">
          <div className="avatar"></div>
          <div>
            <p className="name">Fanny Maharani</p>
            <p className="role">Penghuni kos</p>
          </div>
        </div>
        <nav className="menu">
          <a href="#" className="menu-item">
            <span className="icon">📊</span> Dasbor
          </a>
          <a href="#" className="menu-item">
            <span className="icon">👤</span> Profil Saya
          </a>
          <div className="section-title">KEUANGAN</div>
          <a href="#" className="menu-item">
            <span className="icon">💲</span> Pembayaran
          </a>
          <div className="section-title">Tugas</div>
          <a href="#" className="menu-item">
            <span className="icon">✅</span> Tugas Saya
          </a>
          <div className="section-title">Chat</div>
          <a href="#" className="menu-item">
            <span className="icon">💬</span> Chat dengan IbuKos
          </a>
        </nav>
        <div className="footer">
          <p>MiminKost.</p>
          <p>012345678 / putri pemilik</p>
        </div>
      </aside>

      {/* Navbar */}
      <header className="navbar">
        <button className="menu-toggle">☰</button>
        <p className="greeting">Hi, Fanny</p>
      </header>

      {/* Main Content */}
      <main className="content">
        {/* Tempat konten utama */}
      </main>
    </div>
  );
};

export default SidebarNavbar;
