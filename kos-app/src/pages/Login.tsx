import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../pages/Data/LoginUser";
import "../pages/Login.css";

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>(""); // Username/Email
  const [password, setPassword] = useState<string>(""); // Password
  const [error, setError] = useState<string>(""); // Pesan error
  const [loading, setLoading] = useState<boolean>(false); // Status loading
  const navigate = useNavigate(); // Navigasi

  const handleLogin = async (): Promise<void> => {
    if (!identifier || !password) {
      setError("Username atau Password harus diisi.");
      return;
    }

    setLoading(true); // Mulai loading
    const result = await loginUser(identifier, password); // Panggil loginUser

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    const user = result.userData;
    if (!user.Nama) {
      alert("Hubungi pemilik kosan untuk memperbaiki akun.");
      setLoading(false);
      return;
    }

    // Arahkan ke halaman sesuai dengan Nama (kamar1, kamar2, dst)
    switch (user.Nama) {
      case "kamar1":
        navigate("/penghuniWelcome");
        break;
      case "kamar2":
        navigate("/penghuniWelcome2");
        break;
      case "kamar3":
        navigate("/penghuniWelcome3");
        break;
      case "kamar4":
        navigate("/penghuniWelcome4");
        break;
      case "kamar5":
        navigate("/penghuniWelcome5");
        break;
      case "kamar6":
        navigate("/penghuniWelcome6");
        break;
      default:
        alert("Nama kamar tidak valid.");
        break;
    }
  };

  const handleForgotPassword = (): void => {
    navigate("/lupaPassword");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
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
