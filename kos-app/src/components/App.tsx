import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home"; // Untuk Home
import Register from "../pages/Register"; // Untuk Register
import Login from "../pages/Login"; // Untuk Login
import "./App.css";
import "./Navbar.css"; // Mengimpor Navbar.css

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>MiminKost</h1>
          <nav className="navbar">
            <ul className="nav-links">
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <footer>
          <p>MiminKost | 0123456789 // putri pemilik</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
