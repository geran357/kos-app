import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home"; // Untuk Home
import Login from "../pages/Login"; // Untuk Login
import LupaPassword from "../pages/lupaPassword";
import WelcomePage from "../pages/pages_beranda_user/Kamar1/penghuniWelcome";
import PenghuniWelcome from "../pages/pages_beranda_user/Kamar2/penghuniWelcome2"; // Untuk kamar2
// Mengimpor dari beranda kamar 1
import PenghuniChat from "../pages/pages_beranda_user/Kamar1/penghuniChat";
import PenghuniPembayaran from "../pages/pages_beranda_user/Kamar1/penghuniPembayaran";
import PenghuniTugas from "../pages/pages_beranda_user/Kamar1/penghuniTugas";
import PenghuniProfile from "../pages/pages_beranda_user/Kamar1/peraturanPenghuni"; // Pastikan ini benar
// mengimport dari beranda kamar 2
import penghuniChat2 from "../pages/pages_beranda_user/Kamar2/penghuniChat2"; // Untuk kamar2
import PenghuniPembayaran2 from "../pages/pages_beranda_user/Kamar2/penghuniPembayaran2"; // Untuk kamar2
import penghuniTugas2 from "../pages/pages_beranda_user/Kamar2/penghuniTugas2"; // Untuk kamar2
import penghuniProfile2 from "../pages/pages_beranda_user/Kamar2/peraturanPenghuni2"; // Untuk kamar2
// Mengimpor dari pages_beranda_admin
import AdminPage from "../pages/Pages_beranda_admin/adminPage";
import ControlKamar from "../pages/Pages_beranda_admin/controlKamar";
import ControlKebersihan from "../pages/Pages_beranda_admin/controlKebersihan";
import ControlPembayaran from "../pages/Pages_beranda_admin/controlPembayaran";
import ControlPenghuni from "../pages/Pages_beranda_admin/controlPenghuni";
import ControlUserPass from "../pages/Pages_beranda_admin/controlUserPass"; // Perbaiki nama import
import "./App.css";
import "./Navbar.css"; // Mengimpor Navbar.css
import Login2 from "../pages/Login2";
import PeraturanKos from "../pages/pages_beranda_user/Kamar2/peraturanPenghuni2";
import PenghuniWelcome2 from "../pages/pages_beranda_user/Kamar2/penghuniWelcome2";
import ChecklistTasks2 from "../pages/pages_beranda_user/Kamar2/penghuniTugas2";
import PeraturanKos2 from "../pages/pages_beranda_user/Kamar2/peraturanPenghuni2";
import FAQs2 from "../pages/pages_beranda_user/Kamar1/penghuniChat";

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
                  <Link to="/login2">Login Admin</Link>{" "}
                  {/* Tautan ke halaman admin */}
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
          <Route path="/login2" element={<Login2 />} />
          <Route path="/lupaPassword" element={<LupaPassword />} />
          {/* Halaman kamar1 */}
          <Route path="/penghuniWelcome" element={<WelcomePage />} />
          <Route path="/penghuniChat" element={<PenghuniChat />} />
          <Route path="/penghuniPembayaran" element={<PenghuniPembayaran />} />
          <Route path="/penghuniTugas" element={<PenghuniTugas />} />
          <Route path="/peraturanPenghuni" element={<PenghuniProfile />} />{" "}
          {/* Halaman kamar2 */}
          <Route path="/penghuniWelcome2" element={<PenghuniWelcome2 />} />
          <Route path="/penghuniChat2" element={<FAQs2 />} />
          <Route path="/penghuniPembayaran2" element={<PenghuniPembayaran2 />} />
          <Route path="/penghuniTugas2" element={<ChecklistTasks2 />} />
          <Route path="/peraturanPenghuni2" element={<PeraturanKos2 />} />
          {/* Halaman Admin */}
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/controlKamar" element={<ControlKamar />} />
          <Route path="/controlKebersihan" element={<ControlKebersihan />} />
          <Route path="/controlPembayaran" element={<ControlPembayaran />} />
          <Route path="/controlPenghuni" element={<ControlPenghuni />} />
          <Route path="/controlUserPass" element={<ControlUserPass />} />{" "}
          {/* Perbaiki rute */}
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
