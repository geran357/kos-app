import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home"; // Untuk Home
import Login from "../pages/Login"; // Untuk Login
import LupaPassword from "../pages/lupaPassword";
import WelcomePage from "../pages/pages_beranda_user/Kamar1/penghuniWelcome";
import PenghuniWelcome from "../pages/pages_beranda_user/Kamar2/penghuniWelcome2"; // Untuk kamar2
import PenghuniWelcome3 from "../pages/pages_beranda_user/Kamar3/penghuniWelcome3";
import PenghuniWelcome4 from "../pages/pages_beranda_user/Kamar4/penghuniWelcome4";
import AboutUs from "./AboutUs";
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
// mengimport dari beranda kamar 3
import FAQs3 from "../pages/pages_beranda_user/Kamar3/penghuniChat3";
import penghuniChat3 from "../pages/pages_beranda_user/Kamar3/penghuniChat3";
import PenghuniPembayaran3 from "../pages/pages_beranda_user/Kamar3/penghuniPembayaran3";
import penghuniTugas3 from "../pages/pages_beranda_user/Kamar3/penghuniTugas3";
import penghuniProfile3 from "../pages/pages_beranda_user/Kamar3/peraturanPenghuni2";
//mengimport dari beranda kamar 4
import penghuniiChatt4 from "../pages/pages_beranda_user/Kamar4/penghuniChat4";
import PenghuniPembayaran4 from "../pages/pages_beranda_user/Kamar4/penghuniPembayaran4";
import FAQs4 from "../pages/pages_beranda_user/Kamar4/penghuniChat4";
import ChecklistTasks4 from "../pages/pages_beranda_user/Kamar4/penghuniTugas4";
import PeraturanKos4 from "../pages/pages_beranda_user/Kamar4/peraturanPenghuni2";
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
import FAQs2 from "../pages/pages_beranda_user/Kamar2/penghuniChat2";
import PeraturanKos3 from "../pages/pages_beranda_user/Kamar3/peraturanPenghuni2";
import ChecklistTasks3 from "../pages/pages_beranda_user/Kamar3/penghuniTugas3";

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
                  <Link to="/AboutUs">Team Pengembang</Link>
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
          <Route path="/AboutUs" element={<AboutUs />} />
          {/* Halaman Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/lupaPassword" element={<LupaPassword />} />
          <Route path="/adminPage" element={<AdminPage />} />
          {/* Halaman kamar1 */}
          <Route path="/penghuniWelcome" element={<WelcomePage />} />
          <Route path="/penghuniChat" element={<PenghuniChat />} />
          <Route path="/penghuniPembayaran" element={<PenghuniPembayaran />} />
          <Route path="/penghuniTugas" element={<PenghuniTugas />} />
          <Route path="/peraturanPenghuni" element={<PenghuniProfile />} />{" "}
          {/* Halaman kamar2 */}
          <Route path="/penghuniWelcome2" element={<PenghuniWelcome2 />} />
          <Route path="/penghuniChat2" element={<FAQs2 />} />
          <Route
            path="/penghuniPembayaran2"
            element={<PenghuniPembayaran2 />}
          />
          <Route path="/penghuniTugas2" element={<ChecklistTasks2 />} />
          <Route path="/peraturanPenghuni2" element={<PeraturanKos2 />} />
          {/* Halaman kamar3 */}
          <Route path="/penghuniWelcome3" element={<PenghuniWelcome3 />} />
          <Route path="/PenghuniChat3" element={<FAQs3 />} />
          <Route
            path="/penghuniPembayaran3"
            element={<PenghuniPembayaran3 />}
          />
          <Route path="/penghuniTugas3" element={<ChecklistTasks3 />} />
          <Route path="/peraturanPenghuni3" element={<PeraturanKos3 />} />
          {/* Halaman kamar4 */}
          <Route path="/penghuniWelcome4" element={<PenghuniWelcome4 />} />
          <Route path="/PenghuniChat4" element={<FAQs4 />} />
          <Route
            path="/penghuniPembayaran4"
            element={<PenghuniPembayaran4 />}
          />
          <Route path="/penghuniTugas4" element={<ChecklistTasks4 />} />
          <Route path="/peraturanPenghuni4" element={<PeraturanKos4 />} />
          {/* Halaman Admin */}
          <Route path="/controlKamar" element={<ControlKamar />} />
          <Route path="/controlKebersihan" element={<ControlKebersihan />} />
          <Route path="/controlPembayaran" element={<ControlPembayaran />} />
          <Route path="/controlPenghuni" element={<ControlPenghuni />} />
          <Route path="/controlUserPass" element={<ControlUserPass />} />
          {/* Perbaiki rute */}
        </Routes>
        <div className="footer-wrapper">
          <footer className="footer">
            <p>MiminKost | +62 877-6421-8008 // Putri Pemilik</p>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
