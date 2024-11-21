import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import komponen untuk routing
import KamarTable from "./components/KamarTable"; // Mengimpor komponen KamarTable
import AddEditKamar from "./components/AddEditKamar"; // Mengimpor komponen AddEditKamar
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Daftar Kamar</h1>
        </header>

        {/* Routing untuk komponen */}
        <Routes>
          <Route path="/" element={<KamarTable />} /> {/* Route untuk KamarTable */}
          <Route path="/kamar/add" element={<AddEditKamar />} /> {/* Route untuk AddEditKamar (tambah) */}
          <Route path="/kamar/edit/:id" element={<AddEditKamar />} /> {/* Route untuk AddEditKamar (edit) */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
