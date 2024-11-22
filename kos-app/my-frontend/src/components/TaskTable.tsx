import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dateCompleted?: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mengambil data tugas dari server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/tasks?populate=*");
        console.log("Response dari Strapi:", response.data); // Debugging respons dari Strapi

        // Memastikan data yang diterima memiliki struktur yang benar
        const fetchedTasks = response.data.data.map((task: any) => {
          console.log("Task yang diterima:", task); // Debugging setiap task yang diterima

          // Mengakses Title langsung dari objek task, bukan task.attributes
          const title = task.Title;
          console.log("Judul tugas:", title); // Debugging field Title

          return {
            id: task.id,
            title: title || "Tidak ada judul", // Jika Title tidak ada, tampilkan "Tidak ada judul"
            completed: task.completed || false,
            dateCompleted: task.dateCompleted,
          };
        });

        setTasks(fetchedTasks); // Menyimpan tugas yang sudah diformat
        setError(null);
      } catch (err) {
        setError("Gagal memuat data tugas.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data tugas...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="task-table-container">
      <h2>Daftar Tugas</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Judul Tugas</th>
            <th>Status</th>
            <th>Tanggal Selesai</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td className={task.completed ? "completed" : "in-progress"}>
                {task.completed ? "Selesai" : "Belum Selesai"}
              </td>
              <td>{task.completed ? task.dateCompleted : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
