import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate untuk navigasi
import { loginUser } from "../pages/Data/LoginUser"; // Mengimpor fungsi loginUser
import "../pages/Login2.css"; // Mengimpor CSS untuk halaman login

const Login2: React.FC = () => {
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

    const role = result.userData.role;
    console.log("User role:", role); // Debug log

    // Jika login berhasil, arahkan pengguna ke halaman tertentu
    navigate("/adminPage"); // Ganti dengan route yang sesuai
  };

  const handleForgotPassword = (): void => {
    navigate("/resetPassword"); // Navigasi ke halaman reset password
  };

  return (
    <div className="login2-container">
      <h2 className="login2-title">Login2</h2>
      {error && <p className="login2-error-message">{error}</p>}
      <div className="login2-input-container">
        <div className="login2-icon">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
            alt="user-icon"
          />
        </div>
        <input
          type="text"
          placeholder="Masukkan Username atau Email"
          className="login2-input"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </div>
      <div className="login2-input-container">
        <div className="login2-icon">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/lock--v1.png"
            alt="lock-icon"
          />
        </div>
        <input
          type="password"
          placeholder="Masukkan Password Anda"
          className="login2-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="login2-button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <div className="login2-loading-spinner"></div> : "Login"}
      </button>
      <p className="login2-forgot-password" onClick={handleForgotPassword}>
        Lupa Password?
      </p>
    </div>
  );
};

export default Login2;
