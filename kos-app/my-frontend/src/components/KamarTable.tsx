// components/KamarTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

const KamarTable = () => {
  const [kamarData, setKamarData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mengambil data kamar dari server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/kamars");
        setKamarData(response.data.data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data kamar.");
        console.error("Error fetching kamar data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Terisi" ? "Kosong" : "Terisi"; // Mengubah status sesuai logika

    try {
      const response = await axios.put(
        `http://localhost:1337/api/kamars/${id}`,
        {
          data: {
            status_kamar: newStatus, // Bungkus status_kamar dalam objek data
          },
        }
      );

      // Update state agar tabel otomatis ter-refresh
      setKamarData((prevData) =>
        prevData.map((kamar) =>
          kamar.id === id
            ? { ...kamar, status_kamar: newStatus } // Update status_kamar
            : kamar
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating kamar status:",
          error.response?.data || error
        );
        alert(
          `Gagal memperbarui status kamar: ${
            error.response?.data?.message || "Terjadi kesalahan."
          }`
        );
      } else {
        console.error("Unexpected error:", error);
        alert("Terjadi kesalahan yang tidak terduga.");
      }
    }
  };

  if (loading) {
    return <p>Loading data kamar...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="kamar-table-container">
      <h2>Daftar Kamar</h2>
      <table className="kamar-table">
        <thead>
          <tr>
            <th>No Kamar</th>
            <th>Harga Per Bulan</th>
            <th>Harga Per Tahun</th>
            <th>Status Kamar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kamarData.map((kamar) => (
            <tr key={kamar.id}>
              <td>{kamar.no_kamar}</td>
              <td>{kamar.harga_per_bulan}</td>
              <td>{kamar.harga_per_tahun}</td>
              <td>{kamar.status_kamar}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditStatus(kamar.id, kamar.status_kamar)}
                >
                  Ubah Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KamarTable;
