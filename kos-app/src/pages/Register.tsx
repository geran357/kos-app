import React from "react";
import "../pages/Register.css"; // Importing CSS for styling

const SimpleRegistrationForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    const confirmPassword = event.currentTarget.confirmPassword.value;

    // Simple validation for password confirmation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      username,
      password, // Ensure to hash or encrypt the password before sending it to the server
    };

    // Sending data to server
    fetch("URL_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle success (e.g., redirect or show success message)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </main>
    </div>
  );
};

export default SimpleRegistrationForm;
