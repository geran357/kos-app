import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "./tampilanEdit.css";

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchKamar = async (id: string) => {
    try {
      const response = await api.get(`/kamar/${id}`);
      setKamar(response.data.data.attributes);
    } catch (error) {
      console.error("Error fetching data kamar:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setKamar({ ...kamar, [name]: value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKamar({ ...kamar, status_kamar: e.target.value as "Kosong" | "Terisi" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/kamar/${id}`, {
          data: kamar,
        });
      } else {
        await api.post("/kamar", {
          data: kamar,
        });
      }
      navigate("/kamar");
    } catch (error) {
      console.error("Error saving data kamar:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchKamar(id);
    }
  }, [id]);

  return (
    <div className="container-kamar">
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
