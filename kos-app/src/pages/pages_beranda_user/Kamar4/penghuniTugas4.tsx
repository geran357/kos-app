import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./css/penghuniTugas4.css";

interface Task {
  id: number;
  documentId: string;
  title: string;
  completed: boolean;
  dateCompleted?: string;
}

const ChecklistTasks4: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [countdown, setCountdown] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

  const allCompleted = tasks.every((task) => task.completed);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Memfilter berdasarkan documentId 'jis1sbvnsft4ty3mx2xpclji'
        const response = await fetch(
          "http://localhost:1337/api/tasks?filters[documentId][$eq]=jis1sbvnsft4ty3mx2xpclji&populate=*"
        );
        const data = await response.json();

        const formattedTasks = data.data.map((task: any) => ({
          id: task.id,
          documentId: task.documentId,
          title: task.Title || "Tidak ada judul",
          completed: task.completed || false,
        }));

        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks from Strapi:", error);
      }
    };

    fetchTasks();

    const lastResetDate = localStorage.getItem("lastResetDate");
    const currentDate = new Date();

    if (lastResetDate) {
      const lastReset = new Date(lastResetDate);
      const diffInDays = Math.floor(
        (currentDate.getTime() - lastReset.getTime()) / (1000 * 3600 * 24)
      );

      if (diffInDays >= 7) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => ({ ...task, completed: false }))
        );
        localStorage.setItem("lastResetDate", currentDate.toISOString());
      }

      const resetDate = new Date(lastReset.getTime() + 7 * 24 * 60 * 60 * 1000);
      updateCountdown(resetDate);
    } else {
      localStorage.setItem("lastResetDate", currentDate.toISOString());
    }
  }, []);

  const updateCountdown = (resetDate: Date) => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLeft = resetDate.getTime() - now.getTime();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setCountdown("Waktu reset selesai!");
      } else {
        const days = Math.floor(timeLeft / (1000 * 3600 * 24));
        const hours = Math.floor((timeLeft % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutes = Math.floor((timeLeft % (1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  const toggleTask = (documentId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.documentId === documentId) {
        return { ...task, completed: true };
      }
      return task;
    });

    setTasks(updatedTasks);
    saveToStrapiByDocumentId(documentId);
  };

  const saveToStrapiByDocumentId = async (documentId: string) => {
    const updatedTask = tasks.find((task) => task.documentId === documentId);
    if (!updatedTask) return;

    const requestBody = {
      data: { 
        completed: true, 
        dateCompleted: new Date().toISOString(),
      },
    };

    try {
      const response = await fetch(
        `http://localhost:1337/api/tasks/${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal memperbarui data tugas di Strapi.");
      }

      const updatedData = await response.json();
      console.log("Tugas berhasil diperbarui di Strapi:", updatedData);
    } catch (error) {
      console.error("Kesalahan saat mengupdate tugas di Strapi:", error);
    }
  };

  const handleFinish = () => {
    if (allCompleted) {
      const completedTasks = tasks.filter((task) => task.completed);
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

      completedTasks.forEach((task) => {
        saveToStrapiByDocumentId(task.documentId);
      });

      alert("Data berhasil disimpan ke database dan local storage!");
    } else {
      alert("Harap selesaikan semua tugas terlebih dahulu!");
    }
  };

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
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
                <li key={task.documentId} className="checklist-item">
                  <button
                    className={`task-button ${task.completed ? "completed" : ""}`}
                    onClick={() => toggleTask(task.documentId)}
                  >
                    {task.title}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={handleFinish} className="checklist-button">
              Selesai
            </button>
          </>
        )}
        <p className="countdown">
          Waktu reset otomatis tugas dalam: {countdown}
        </p>
        <button onClick={handleBack} className="back-button">
          Kembali
        </button>
      </div>
    </div>
  );
};

export default ChecklistTasks4;
