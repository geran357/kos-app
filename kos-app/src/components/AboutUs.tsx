import React, { useState } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const team = [
    {
      name: "Alice",
      role: "Frontend Developer",
      description: "Mengembangkan UI/UX untuk memastikan pengalaman pengguna yang baik.",
      image: "https://randomuser.me/api/portraits/women/1.jpg", // Gambar Alice
    },
    {
      name: "Fajar Geran Arifin",
      role: "Backend Developer",
      description: "Membangun server, database, dan API untuk mendukung aplikasi.",
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Gambar Bob
    },
    {
      name: "Charlie",
      role: "UI/UX Designer",
      description: "Merancang wireframe dan prototipe untuk antarmuka pengguna.",
      image: "https://randomuser.me/api/portraits/men/2.jpg", // Gambar Charlie
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % team.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? team.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="about-us">
      <h1 className="title">Tentang Kami</h1>
      <div className="carousel-container">
        <button className="nav-button prev" onClick={handlePrev}>
          &#x276E;
        </button>
        <div className="carousel">
          {team.map((member, index) => {
            const position =
              (index - currentIndex + team.length) % team.length; // Posisi relatif kartu
            return (
              <div
                key={index}
                className={`card ${position === 0 ? "front" : ""}`}
                style={{
                  transform: `rotateY(${(index - currentIndex) * 60}deg) translateZ(300px)`,
                  opacity: position === 0 ? 1 : 0.5,
                }}
              >
                <img src={member.image} alt={member.name} />
                <h2>{member.name}</h2>
                <p>{member.role}</p>
              </div>
            );
          })}
        </div>
        <button className="nav-button next" onClick={handleNext}>
          &#x276F;
        </button>
      </div>
      
    </div>
  );
};

export default AboutUs;
