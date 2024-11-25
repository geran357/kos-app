import React, { useState } from "react";
import "./AbutUs.css";

const AboutUs = () => {
  const team = [
    {
      name: "Alice",
      role: "Frontend Developer",
      jobDesk: "Mengembangkan UI/UX untuk memastikan pengalaman pengguna yang baik.",
    },
    {
      name: "Bob",
      role: "Backend Developer",
      jobDesk: "Membangun server, database, dan API untuk mendukung aplikasi.",
    },
    {
      name: "Charlie",
      role: "UI/UX Designer",
      jobDesk: "Merancang wireframe dan prototipe untuk antarmuka pengguna.",
    },
  ];

  const [flipped, setFlipped] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlipped(flipped === index ? null : index);
  };

  return (
    <div className="about-us">
      <h1 className="title">Tentang Kami</h1>
      <div className="card-container">
        {team.map((member, index) => (
          <div
            key={index}
            className={`card ${flipped === index ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="front">
              <h2>{member.name}</h2>
              <p>{member.role}</p>
            </div>
            <div className="back">
              <p>{member.jobDesk}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => window.history.back()}>
        Kembali
      </button>
    </div>
  );
};

export default AboutUs;
