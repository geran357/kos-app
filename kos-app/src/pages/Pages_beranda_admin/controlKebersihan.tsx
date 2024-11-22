import React, { useEffect, useState } from "react";
import "./css/controlKebersihan.css"; // Ganti dengan nama CSS baru

const ControlKebersihan: React.FC = () => {
  const [taskHistory, setTaskHistory] = useState<any[]>([]);

  // Fungsi untuk mengambil data kebersihan
  useEffect(() => {
    // Misalnya, mengambil data dari API atau LocalStorage
    const fetchedTasks = [
      { id: 1, task: "Pembersihan ruang tamu", status: "Selesai" },
      { id: 2, task: "Pembersihan kamar mandi", status: "Sedang dikerjakan" },
    ];
    setTaskHistory(fetchedTasks); // Simulasi pengambilan data
  }, []);

  return (
    <div className="control-kebersihan-container">
      <h2>Kontrol Kebersihan</h2>
      <div className="task-list">
        <h3>Daftar Tugas Kebersihan</h3>
        {taskHistory.length > 0 ? (
          <ul>
            {taskHistory.map((task) => (
              <li key={task.id}>
                <span>{task.task}</span> - <span>{task.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Belum ada tugas kebersihan yang tercatat.</p>
        )}
      </div>
    </div>
  );
};

export default ControlKebersihan;
