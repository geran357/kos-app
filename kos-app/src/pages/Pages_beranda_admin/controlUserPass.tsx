// pages/admin/AdminPage.tsx
import React from "react";
import KamarTable from "../../../my-frontend/src/components/UserAndPass";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminPage: React.FC = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleBack = () => {
    navigate(-1); // Arahkan kembali ke halaman sebelumnya
  };

  return (
    <div>
      <h1>Control User Pass</h1>
      {/* Menampilkan tabel user dan password */}
      <KamarTable />
      {/* Tambahkan tombol kembali */}
      <button onClick={handleBack} className="back-button">
        Kembali
      </button>
    </div>
  );
};

export default AdminPage;
