import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

const KamarTable = () => {
  const [kamarData, setKamarData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [editingKamar, setEditingKamar] = useState<any | null>(null);
  const [penghuni, setPenghuni] = useState<string>("");

  enum StatusKamar {
    KOSONG = "Kosong",
    TERISI = "Terisi",
  }

  const fetchKamarData = async () => {
    setLoading(true);
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

  const handleEditStatusByDocumentId = async (
    documentId: string,
    currentStatus: string
  ) => {
    const newStatus =
      currentStatus === StatusKamar.TERISI
        ? StatusKamar.KOSONG
        : StatusKamar.TERISI;

    try {
      const response = await axios.put(
        `http://localhost:1337/api/kamars/${documentId}`,
        {
          data: { status_kamar: newStatus },
        }
      );

      if (response.status === 200) {
        setKamarData((prevData) =>
          prevData.map((k) =>
            k.documentId === documentId
              ? { ...k, status_kamar: newStatus }
              : k
          )
        );
        alert("Status kamar berhasil diperbarui!");
      } else {
        alert("Gagal memperbarui status kamar.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Gagal memperbarui status kamar.");
    }
  };

  const handleEditPenghuni = async (documentId: string, penghuniBaru: string) => {
    try {
      const response = await axios.put(
        `http://localhost:1337/api/kamars/${documentId}`,
        {
          data: { penghuni: penghuniBaru },
        }
      );

      if (response.status === 200) {
        setKamarData((prevData) =>
          prevData.map((k) =>
            k.documentId === documentId ? { ...k, penghuni: penghuniBaru } : k
          )
        );
        alert("Data penghuni berhasil diperbarui!");
        setEditingKamar(null);
      } else {
        alert("Gagal memperbarui data penghuni.");
      }
    } catch (error) {
      console.error("Error updating penghuni data:", error);
      alert("Gagal memperbarui data penghuni.");
    }
  };

  useEffect(() => {
    fetchKamarData();
  }, []);

  const filteredKamarData = filter
    ? kamarData.filter((kamar) => kamar.status_kamar === filter)
    : kamarData;

  if (loading) {
    return <p>Loading data kamar...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="kamar-table-container">
      <h2>Daftar Kamar</h2>

      <div className="filter-buttons">
        <button onClick={() => setFilter(StatusKamar.KOSONG)}>Kosong</button>
        <button onClick={() => setFilter(StatusKamar.TERISI)}>Terisi</button>
        <button onClick={() => setFilter(null)}>Semua</button>
      </div>

      <table className="kamar-table">
        <thead>
          <tr>
            <th>No Kamar</th>
            <th>Harga Per Bulan</th>
            <th>Harga Per Tahun</th>
            <th>Status Kamar</th>
            <th>Penghuni</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredKamarData.map((kamar) => (
            <tr key={kamar.documentId}>
              <td>{kamar.no_kamar}</td>
              <td>Rp. {kamar.harga_per_bulan.toLocaleString()}</td>
              <td>Rp. {kamar.harga_per_tahun.toLocaleString()}</td>
              <td>{kamar.status_kamar}</td>
              <td>{kamar.penghuni || "Belum Ada"}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => setEditingKamar(kamar)}
                >
                  Edit Penghuni
                </button>
                <button
                  className="status-button"
                  onClick={() =>
                    handleEditStatusByDocumentId(
                      kamar.documentId,
                      kamar.status_kamar
                    )
                  }
                >
                  Ubah Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingKamar && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Penghuni Kamar</h3>
            <p>No Kamar: {editingKamar.no_kamar}</p>
            <label>
              Nama Penghuni:
              <input
                type="text"
                value={penghuni}
                onChange={(e) => setPenghuni(e.target.value)}
                placeholder="Masukkan nama penghuni"
              />
            </label>
            <div className="modal-actions">
              <button
                onClick={() =>
                  handleEditPenghuni(editingKamar.documentId, penghuni)
                }
              >
                Simpan
              </button>
              <button onClick={() => setEditingKamar(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KamarTable;
