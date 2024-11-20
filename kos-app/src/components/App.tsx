import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home"; // Untuk Home
import Login from "../pages/Login"; // Untuk Login
import WelcomePage from "../pages/pages_beranda_user/penghuniWelcome";
// Mengimpor dari beranda-user
import PenghuniChat from "../pages/pages_beranda_user/penghuniChat";
import PenghuniPembayaran from "../pages/pages_beranda_user/penghuniPembayaran";
import PenghuniTugas from "../pages/pages_beranda_user/penghuniTugas";
import PenghuniProfile from "../pages/pages_beranda_user/penghuniProfile";
// Mengimpor dari pages_beranda_admin
import AdminPage from "../pages/Pages_beranda_admin/adminPage";
import ControlKamar from "../pages/Pages_beranda_admin/controlKamar";
import ControlKebersihan from "../pages/Pages_beranda_admin/controlKebersihan";
import ControlPembayaran from "../pages/Pages_beranda_admin/controlPembayaran";
import ControlPenghuni from "../pages/Pages_beranda_admin/controlPenghuni";
import ControlUserPass from "../pages/Pages_beranda_admin/controlUserPass";
import "./App.css";
import "./Navbar.css"; // Mengimpor Navbar.css

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="header-wrapper">
          <div className="header">
            <h1>MiminKost</h1>
            <nav className="navbar">
              <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login user</Link>
                </li>
                <li>
                  <Link to="/">login Admin</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Routes>
          {/* Halaman Utama */}
          <Route path="/" element={<Home />} />

          {/* Halaman Login */}
          <Route path="/login" element={<Login />} />

          {/* Halaman Penghuni */}
          <Route path="/penghuniWelcome" element={<WelcomePage />} />
          <Route path="/penghuniChat" element={<PenghuniChat />} />
          <Route path="/penghuniPembayaran" element={<PenghuniPembayaran />} />
          <Route path="/penghuniTugas" element={<PenghuniTugas />} />
          <Route path="/penghuniProfile" element={<PenghuniProfile />} />

          {/* Halaman Admin */}
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/controlKamar" element={<ControlKamar />} />
          <Route path="/controlKebersihan" element={<ControlKebersihan />} />
          <Route path="/controlPembayaran" element={<ControlPembayaran />} />
          <Route path="/controlPenghuni" element={<ControlPenghuni />} />
          <Route path="/controlUserPass" element={<ControlUserPass />} />
        </Routes>
        <div className="footer-wrapper">
          <footer className="footer">
            <p>MiminKost | 0123456789 // Putri Pemilik</p>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
