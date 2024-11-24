import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

const KamarTable = () => {
  const [kamarData, setKamarData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  // Enumeration untuk status_kamar
  enum StatusKamar {
    KOSONG = "Kosong",
    TERISI = "Terisi",
  }

  // Mengambil data kamar dari server
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

  // Mengubah status kamar berdasarkan documentId
  const handleEditStatusByDocumentId = async (
    documentId: string,
    currentStatus: string
  ) => {
    // Tentukan status baru
    const newStatus =
      currentStatus === StatusKamar.TERISI
        ? StatusKamar.KOSONG
        : StatusKamar.TERISI;

    try {
      // Kirim permintaan pembaruan ke server dengan documentId di URL
      const response = await axios.put(
        `http://localhost:1337/api/kamars/${documentId}`,
        {
          data: {
            status_kamar: newStatus,
          },
        }
      );

      if (response.status === 200) {
        // Perbarui data kamar di state
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
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating kamar status:",
          error.response?.data || error
        );
        alert(
          `Gagal memperbarui status kamar: ${
            error.response?.data?.error?.message || "Terjadi kesalahan."
          }`
        );
      } else {
        console.error("Unexpected error:", error);
        alert("Terjadi kesalahan yang tidak terduga.");
      }
    }
  };

  // Memuat data kamar saat komponen pertama kali dirender
  useEffect(() => {
    fetchKamarData();
  }, []);

  // Filter data berdasarkan status
  const filteredKamarData = filter
    ? kamarData.filter((kamar) => kamar.status_kamar === filter)
    : kamarData;

  // Jika sedang memuat data
  if (loading) {
    return <p>Loading data kamar...</p>;
  }

  // Jika terjadi kesalahan
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="kamar-table-container">
      <h2>Daftar Kamar</h2>

      {/* Tombol Filter */}
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
              <td>
                <button
                  className="edit-button"
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
    </div>
  );
};

export default KamarTable;
