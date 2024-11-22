import React, { useState, useEffect } from "react";
import "./css/penghuniTugas.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const ChecklistTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Membersihkan WC", completed: false },
    { id: 2, title: "Membersihkan Dapur", completed: false },
    { id: 3, title: "Membuang Sampah", completed: false },
    { id: 4, title: "Melengkapi Kebutuhan Kebersihan Kos", completed: false },
  ]);

  const allCompleted = tasks.every((task) => task.completed);

  useEffect(() => {
    const lastResetDate = localStorage.getItem("lastResetDate");
    const currentDate = new Date();
    if (lastResetDate) {
      const lastReset = new Date(lastResetDate);
      const diffInDays = Math.floor(
        (currentDate.getTime() - lastReset.getTime()) / (1000 * 3600 * 24)
      );
      if (diffInDays >= 7) {
        // Reset tasks if 7 days have passed
        setTasks(tasks.map((task) => ({ ...task, completed: false })));
        localStorage.setItem("lastResetDate", currentDate.toISOString());
      }
    } else {
      localStorage.setItem("lastResetDate", currentDate.toISOString());
    }
  }, []);

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFinish = () => {
    if (allCompleted) {
      saveToStrapi(tasks);
    } else {
      alert("Harap selesaikan semua tugas terlebih dahulu!");
    }
  };

  const saveToStrapi = async (tasks: Task[]) => {
    try {
      const response = await fetch("http://localhost:1337/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks }),
      });
      if (!response.ok) {
        throw new Error("Gagal menyimpan ke database Strapi");
      }
      alert("Data berhasil disimpan ke database!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    window.history.back(); // Navigasi ke halaman sebelumnya
  };

  return (
    <div className="page-container">
      <div className="checklist-container">
        {allCompleted ? (
          <div>
            <p className="checklist-finished">- Tidak ada tugas untuk Anda -</p>
            <p className="checklist-finished-message">Selamat Berakhir Pekan</p>
          </div>
        ) : (
          <>
            <h3 className="checklist-title">Jadwal Kegiatan</h3>
            <ul className="checklist-list">
              {tasks.map((task) => (
                <li key={task.id} className="checklist-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    {task.title}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleFinish} className="checklist-button">
              Selesai
            </button>
          </>
        )}
        {/* Tombol Kembali */}
        <button onClick={handleBack} className="back-button">
          Kembali
        </button>
      </div>
    </div>
  );
};

export default ChecklistTasks;
