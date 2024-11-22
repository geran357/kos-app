import React, { useState, useEffect } from "react";
import api from "../api"; // Impor axios instance
import "./UserAndPass.css";

type User = {
  id?: number;
  username: string;
  password: string;
  name: string;
  email: string;
};

const UserAndPass = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
    name: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch Users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/penghuni");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddOrUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/penghuni/${formData.id}`, formData);
      } else {
        await api.post("/penghuni", { data: formData });
      }
      // Reset form data after successful submit
      setFormData({ username: "", password: "", name: "", email: "" });
      setEditMode(false); // Reset edit mode
      // Fetch the updated user list
      const response = await api.get("/penghuni");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setEditMode(true);
  };

  const handleDelete = async (userId: number) => {
    try {
      await api.delete(`/penghuni/${userId}`);
      const response = await api.get("/penghuni");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <h1>User and Password Management</h1>

      <form onSubmit={handleAddOrUpdateUser}>
        <h2>{editMode ? "Edit User" : "Add New User"}</h2>

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
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
          {editMode ? "Update" : "Add"} User
        </button>
      </form>

      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="action-button" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="action-button" onClick={() => handleDelete(user.id!)}>
                  Delete
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
