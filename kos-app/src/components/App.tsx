import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home"; // Untuk Home
import Login from "../pages/Login"; // Untuk Login
import WelcomePage from "../pages/pages_beranda_user/penghuniWelcome";
import "./App.css";
import "./Navbar.css"; // Mengimpor Navbar.css
//mengimport dari beranda-user
import PenghuniChat from "../pages/pages_beranda_user/penghuniChat";
import PenghuniPembayaran from "../pages/pages_beranda_user/penghuniPembayaran";
import PenghuniTugas from "../pages/pages_beranda_user/penghuniTugas";
import PenghuniProfile from "../pages/pages_beranda_user/penghuniProfile";


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
              </ul>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/penghuniWelcome" element={<WelcomePage />} />
          <Route path="/penghuniChat" element={<PenghuniChat />} />
          <Route path="/penghuniPembayaran" element={<PenghuniPembayaran />} />
          <Route path="/penghuniTugas" element={<PenghuniTugas />} />
          <Route path="/penghuniProfile" element={<PenghuniProfile />} />
        </Routes>
        <div className="footer-wrapper">
          <footer className="footer">
            <p>MiminKost | 0123456789 // putri pemilik</p>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
