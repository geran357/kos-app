import React, { useState } from "react";
import "../pages/Register.css"; // Importing CSS for styling
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const SimpleRegistrationForm = () => {
  // State untuk input dan pesan
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Inisialisasi navigate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1337/auth/local/register",
        {
          username,
          email,
          password,
        }
      );

      setSuccessMessage("User registered successfully!");
      setErrorMessage("");

      // Redirect ke halaman login setelah sukses
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Tunggu 2 detik sebelum redirect

      console.log(response.data); // Log data untuk debugging
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.message || "Registration failed");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <main>
        <h2>Register</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </main>
    </div>
  );
};

export default SimpleRegistrationForm;
