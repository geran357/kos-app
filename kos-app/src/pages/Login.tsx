// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import { loginUser } from "../pages/Data/LoginUser"; // Mengimport fungsi loginUser
import "../pages/Login.css"; // Mengimport CSS login

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>(""); // State untuk menyimpan pesan error
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleLogin = async (): Promise<void> => {
    if (!identifier || !password) {
      setError("Username atau Password harus diisi.");
      return;
    }

    // Panggil fungsi loginUser  dengan 2 argumen: identifier dan password
    const result = await loginUser(identifier, password);

    // Jika ada error, set error state
    if (result.error) {
      setError(result.error);
      return;
    }

    // Jika login berhasil, navigasi ke halaman berikutnya
    navigate("/penghuniWelcome"); // Ganti dengan route yang sesuai
  };

  const handleForgotPassword = (): void => {
    navigate("/forgot-password"); // Ubah sesuai dengan route yang diinginkan
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Tampilkan pesan error jika ada */}
      <div className="input-container">
        <div className="icon">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
            alt="user-icon"
          />
        </div>
        <input
          type="text"
          placeholder="Masukkan Username atau Email"
          className="input"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </div>
      <div className="input-container">
        <div className="icon">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/lock--v1.png"
            alt="lock-icon"
          />
        </div>
        <input
          type="password"
          placeholder="Masukkan Password Anda"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p className="forgot-password" onClick={handleForgotPassword}>
        Lupa Password?
      </p>
    </div>
  );
};

export default Login;
