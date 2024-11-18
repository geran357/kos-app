import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home"; // Untuk Home
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
            <ul className="nav-links"></ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
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
