import React from "react";
import KamarTable from "../../../my-frontend/src/components/KamarTable";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const AdminPage = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleBack = () => {
    navigate("/adminPage"); // Kembali ke halaman adminPage
  };

  return (
    <div>
      <h1>Control Kamar</h1>
      {/* Menampilkan tabel kamar */}
      <KamarTable />
      {/* Tambahkan tombol kembali */}
      <button onClick={handleBack} className="back-button">
        Kembali
      </button>
    </div>
  );
};

export default AdminPage;
