import React, { useEffect, useState } from "react";
import api from "../api"; // pastikan ini mengarah ke file API yang benar

interface Kamar {
  id: number;
  documentId: string;
  no_kamar: number;
  harga_per_bulan: number;
  harga_per_tahun: number;
  status_kamar: "Kosong" | "Terisi";
}

const KamarTable: React.FC = () => {
  const [dataKamar, setDataKamar] = useState<Kamar[]>([]);

  const fetchKamar = async () => {
    try {
      const res = await api.get("/kamar");
      console.log("Data Kamar:", res.data.data);  // Periksa data yang diterima
      setDataKamar(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchKamar();
  }, []);

  return (
    <div>
      <h1>Daftar Kamar</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>No Kamar</th>
            <th>Harga Per Bulan</th>
            <th>Harga Per Tahun</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataKamar.length === 0 ? (
            <tr>
              <td colSpan={5}>Tidak ada data kamar.</td>
            </tr>
          ) : (
            dataKamar.map((kamar, index) => (
              <tr key={kamar.id}>
                <td>{index + 1}</td>
                <td>{kamar.no_kamar}</td>
                <td>Rp. {kamar.harga_per_bulan.toLocaleString()}</td>
                <td>Rp. {kamar.harga_per_tahun.toLocaleString()}</td>
                <td>{kamar.status_kamar}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KamarTable;
