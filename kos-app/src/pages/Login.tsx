import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate untuk navigasi
import { loginUser } from "../pages/Data/LoginUser"; // Mengimpor fungsi loginUser
import "../pages/Login.css"; // Mengimpor CSS untuk halaman login

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>(""); // Menyimpan username/email
  const [password, setPassword] = useState<string>(""); // Menyimpan password
  const [error, setError] = useState<string>(""); // Menyimpan pesan error
  const [loading, setLoading] = useState<boolean>(false); // Menyimpan status loading
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  const handleLogin = async (): Promise<void> => {
    if (!identifier || !password) {
      setError("Username atau Password harus diisi.");
      return;
    }

    setLoading(true); // Menandakan loading dimulai

    // Panggil fungsi loginUser untuk autentikasi
    const result = await loginUser(identifier, password);

    // Jika ada error, tampilkan pesan error
    if (result.error) {
      setError(result.error);
      setLoading(false); // Selesai loading
      return;
    }

    // Jika login berhasil, arahkan pengguna ke halaman berikutnya
    navigate("/penghuniWelcome"); // Ganti dengan route yang sesuai
  };

  const handleForgotPassword = (): void => {
    navigate("/lupaPassword"); // Navigasi ke halaman lupa password
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Menampilkan pesan error */}
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
      <button className="login-button" onClick={handleLogin} disabled={loading}>
        {loading ? <div className="loading-spinner"></div> : "Login"}
      </button>
      <p className="forgot-password" onClick={handleForgotPassword}>
        Lupa Password?
      </p>
    </div>
  );
};

export default Login;
