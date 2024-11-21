import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ganti useHistory dengan useNavigate
import api from "../api"; // Import axios atau api instance

// Interface untuk data kamar
interface Kamar {
  id?: number;
  no_kamar: number;
  harga_per_bulan: number;
  harga_per_tahun: number;
  status_kamar: "Kosong" | "Terisi";
}

const AddEditKamar: React.FC = () => {
  const [kamar, setKamar] = useState<Kamar>({
    no_kamar: 0,
    harga_per_bulan: 0,
    harga_per_tahun: 0,
    status_kamar: "Kosong",
  });
  const { id } = useParams<{ id: string }>(); // Mengambil ID kamar dari URL jika sedang mengedit
  const navigate = useNavigate(); // Untuk navigasi setelah submit

  // Fungsi untuk mengambil data kamar jika sedang mengedit
  const fetchKamar = async (id: string) => {
    try {
      const response = await api.get(`/kamar/${id}`);
      setKamar(response.data.data.attributes);
    } catch (error) {
      console.error("Error fetching data kamar:", error);
    }
  };

  // Fungsi untuk handle perubahan form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setKamar({ ...kamar, [name]: value });
  };

  // Fungsi untuk handle perubahan status kamar
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKamar({ ...kamar, status_kamar: e.target.value as "Kosong" | "Terisi" });
  };

  // Fungsi untuk menambahkan kamar baru atau memperbarui data kamar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Jika ada ID, maka kita akan melakukan update
        await api.put(`/kamar/${id}`, {
          data: kamar,
        });
      } else {
        // Jika tidak ada ID, berarti menambah data baru
        await api.post("/kamar", {
          data: kamar,
        });
      }
      // Navigasi kembali setelah berhasil menambah/merubah data
      navigate("/kamar"); // Ganti history.push dengan navigate
    } catch (error) {
      console.error("Error saving data kamar:", error);
    }
  };

  // Jika ada ID, ambil data kamar untuk diedit
  useEffect(() => {
    if (id) {
      fetchKamar(id);
    }
  }, [id]);

  return (
    <div>
      <h1>{id ? "Edit" : "Tambah"} Kamar</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>No Kamar</label>
          <input
            type="number"
            name="no_kamar"
            value={kamar.no_kamar}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Harga Per Bulan</label>
          <input
            type="number"
            name="harga_per_bulan"
            value={kamar.harga_per_bulan}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Harga Per Tahun</label>
          <input
            type="number"
            name="harga_per_tahun"
            value={kamar.harga_per_tahun}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status Kamar</label>
          <select
            name="status_kamar"
            value={kamar.status_kamar}
            onChange={handleStatusChange}
          >
            <option value="Kosong">Kosong</option>
            <option value="Terisi">Terisi</option>
          </select>
        </div>
        <button type="submit">{id ? "Update" : "Tambah"} Kamar</button>
      </form>
    </div>
  );
};

export default AddEditKamar;
