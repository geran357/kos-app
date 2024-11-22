import React, { useState, useEffect } from "react";
import "./css/penghuniTugas.css";

interface Task {
  id: number;
  documentId: string;
  title: string;
  completed: boolean;
  dateCompleted?: string;
}

const ChecklistTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const allCompleted = tasks.every((task) => task.completed);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/tasks?populate=*");
        const data = await response.json();

        const formattedTasks = data.data.map((task: any) => ({
          id: task.id,
          documentId: task.documentId, // Ambil documentId
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
    } else {
      localStorage.setItem("lastResetDate", currentDate.toISOString());
    }
  }, []);

  const toggleTask = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
      saveToStrapiByDocumentId(task.documentId); // Gunakan documentId untuk update
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

  const saveToStrapiByDocumentId = async (documentId: string) => {
    const updatedTask = tasks.find((task) => task.documentId === documentId);
    if (!updatedTask) {
      console.error("Tugas dengan documentId tidak ditemukan:", documentId);
      return;
    }
  
    const requestBody = {
      data: {
        completed: updatedTask.completed,
        dateCompleted: updatedTask.completed ? new Date().toISOString() : null,
      },
    };
  
    try {
      const response = await fetch(
        `http://localhost:1337/api/tasks?filters[documentId][$eq]=${documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from Strapi:", errorData);
        throw new Error("Gagal memperbarui data tugas di Strapi.");
      }
  
      console.log("Tugas berhasil diperbarui di Strapi:", await response.json());
    } catch (error) {
      // Cek apakah error adalah instance dari Error
      if (error instanceof Error) {
        console.error("Kesalahan saat mengupdate tugas di Strapi:", error.message);
      } else {
        console.error("Kesalahan tidak diketahui saat mengupdate tugas di Strapi:", error);
      }
    }
  };
  

  const handleBack = () => {
    console.log("Back button clicked");
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
                  <button
                    className={`task-button ${task.completed ? "completed" : ""}`}
                    onClick={() => toggleTask(task.id)}
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
        <button onClick={handleBack} className="back-button">
          Kembali
        </button>
      </div>
    </div>
  );
};

export default ChecklistTasks;
