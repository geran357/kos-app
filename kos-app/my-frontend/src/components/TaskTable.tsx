import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css";

interface Task {
  id: number;
  documentId: string;
  title: string;
  completed: boolean;
  dateCompleted?: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data dari Strapi
  const fetchTasks = async () => {
    try {
      setLoading(true); // Mulai loading
      const response = await axios.get("http://localhost:1337/api/tasks?populate=*");
      const fetchedTasks = response.data.data.map((task: any) => ({
        id: task.id,
        documentId: task.documentId || "Tidak tersedia",
        title: task.Title || "Tidak ada judul",
        completed: task.completed || false,
        dateCompleted: task.dateCompleted || null,
      }));

      setTasks(fetchedTasks); // Menyimpan data ke state
      setError(null); // Reset error jika sukses
    } catch (err) {
      setError("Gagal memuat data tugas.");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading data tugas...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="task-table-container">
      <h2>Daftar Tugas (Admin)</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Judul Tugas</th>
            <th>ID Dokumen</th>
            <th>Status</th>
            <th>Tanggal Selesai</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.documentId}</td>
              <td className={task.completed ? "completed" : "in-progress"}>
                {task.completed ? "Selesai" : "Belum Selesai"}
              </td>
              <td>{task.dateCompleted ? new Date(task.dateCompleted).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
