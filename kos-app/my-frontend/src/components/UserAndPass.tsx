import React, { useState, useEffect } from "react";
import api from "../api"; // Impor instance axios
import "./UserAndPass.css";

type User = {
  id?: number;
  username: string;
  password: string;
  Nama: string;
  email: string;
  confirmed: boolean;
};

const UserAndPass = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
    Nama: "", // Ganti name dengan Nama
    email: "",
    confirmed: true, // Pastikan field "confirmed" sesuai dengan status akun
  });
  const [editMode, setEditMode] = useState(false);

  // Ambil data pengguna dari Strapi
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        console.log(response.data); // Memastikan data mengandung field Nama
        setUsers(response.data); // Menyimpan data pengguna ke state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle perubahan input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Menambah atau memperbarui pengguna
  const handleAddOrUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        Nama: formData.Nama, // Ganti name dengan Nama
        confirmed: formData.confirmed,
        role: 2, // Pastikan menggunakan ID role yang benar (misalnya, 2 untuk role "authenticated")
      };
  
      if (editMode) {
        // Update pengguna yang sudah ada
        await api.put(`/users/${formData.id}`, requestData);
      } else {
        // Tambah pengguna baru
        await api.post("/users", requestData);
      }
  
      // Reset form setelah berhasil
      setFormData({ username: "", password: "", Nama: "", email: "", confirmed: true });
      setEditMode(false);
  
      // Ambil daftar pengguna yang diperbarui
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }
  };

  // Mengedit pengguna
  const handleEdit = (user: User) => {
    setFormData(user);
    setEditMode(true);
  };

  // Menghapus pengguna
  const handleDelete = async (userId: number) => {
    try {
      await api.delete(`/users/${userId}`); // Hapus pengguna berdasarkan ID
      const response = await api.get("/users"); // Ambil kembali daftar pengguna yang terbaru
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <h1>Manajemen Pengguna dan Password</h1>

      {/* Peringatan */}
      <div className="warning-box">
        <p><strong>PERHATIAN:</strong> Gunakan "Nama" sesuai dengan kamar yang akan diisi, karena itu akan mempengaruhi logika login, contoh penggunaan "Nama: kamar2".</p>
      </div>

      <form onSubmit={handleAddOrUpdateUser}>
        <h2>{editMode ? "Edit Pengguna" : "Tambah Pengguna Baru"}</h2>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nama:</label>
          <input
            type="text"
            name="Nama" // Ganti name menjadi Nama
            value={formData.Nama}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="user-button">
          {editMode ? "Perbarui" : "Tambah"} Pengguna
        </button>
      </form>

      <h2>Daftar Pengguna</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Nama</th> {/* Tambahkan Nama di sini */}
            <th>Email</th>
            <th>Konfirmasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.Nama}</td> {/* Ganti name menjadi Nama */}
              <td>{user.email}</td>
              <td>{user.confirmed ? "Terkonfirmasi" : "Belum Terkonfirmasi"}</td>
              <td>
                <button className="action-button" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="action-button" onClick={() => handleDelete(user.id!)} >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAndPass;
