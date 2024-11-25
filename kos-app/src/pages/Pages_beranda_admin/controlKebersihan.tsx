// pages/admin/TaskPage.tsx
import React from "react";
import TaskTable from "../../../my-frontend/src/components/TaskTable";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TaskPage: React.FC = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleBack = () => {
    navigate("/adminPage"); // Arahkan kembali ke halaman adminPage
  };

  return (
    <div>
      <h1>Manajemen Tugas</h1>
      <TaskTable />
      {/* Tambahkan tombol kembali */}
      <button onClick={handleBack} className="back-button">
        Kembali
      </button>
    </div>
  );
};

export default TaskPage;
