// Login.tsx
import React from "react";
import "../pages/Login.css"; //mengimport css login

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="login-title">Login..</h2>

      <div className="input-container">
        <div className="icon">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
            alt="user-icon"
          />
        </div>
        <input
          type="text"
          placeholder="Masukkan Username Anda"
          className="input"
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
        />
      </div>

      <button className="login-button">Login</button>

      <p className="forgot-password">Lupa Password..?</p>
    </div>
  );
};

export default Login;
