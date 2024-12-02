import React, { useState } from "react";
import "./AboutUs.css";
import fajarImage from '../assets/IMG_20241126_105910.jpg'
import akbarImage from '../assets/IMG-20240724-WA0000.jpg'
import fannyImage from '../assets/IMG-20241125-WA0027.jpg'

const AboutUs = () => {
  const team = [
    {
      name: "Fanny Maharani",
      role: "Menganalisis fitur dan menyusun mockup untuk tampilan website",
      description: "menggabungkan keahlian dalam analisis kebutuhan pengguna dan desain antarmuka pengguna (UI) untuk merancang dan mengembangkan tampilan website yang fungsional dan menarik. Tugas utamanya adalah memahami fitur yang dibutuhkan oleh pengguna atau klien dan mentransformasikannya menjadi desain yang dapat digunakan oleh pengembang untuk implementasi.",
      image:fannyImage, 
    },
    {
      name: "Fajar Geran Arifin",
      role: "Front end dan back end developer",
      description: "sebagai full-stack developer, saya menggabungkan kekuatan dari dua aspek utama dalam pengembangan aplikasi: sisi server dan sisi pengguna. Di bagian backend, saya bertanggung jawab untuk membangun dan mengelola server, database, dan API, memastikan data dikelola dengan efisien dan aman. Di sisi frontend, saya fokus pada menciptakan pengalaman pengguna yang memukau dengan desain antarmuka yang responsif dan interaktif. Dengan keterampilan di kedua bidang ini, saya mampu mengembangkan aplikasi secara menyeluruh, memastikan kinerja yang optimal dan tampilan yang menarik bagi pengguna.",
      image:fajarImage ,

    },
    {
      name: "M Akbar Hidayatulloh",
      role: "membantu front end dalam merapihkan website, dan merapihkan tampilan mockup",
      description: "saya membantu tim frontend dalam merapikan dan mengoptimalkan tampilan website agar lebih rapi dan fungsional. Saya memastikan bahwa elemen-elemen desain pada website sesuai dengan pedoman yang telah ditentukan pada mockup, serta memastikan responsivitas dan konsistensi tampilan di berbagai perangkat. Selain itu, saya juga turut membantu mengimplementasikan dan menyempurnakan aspek visual dan interaksi di frontend untuk memberikan pengalaman pengguna yang lebih baik. Fokus utama saya adalah memastikan bahwa desain yang telah dipersiapkan dalam bentuk mockup diterjemahkan dengan baik ke dalam tampilan website yang fungsional dan menarik.",
      image:akbarImage, 
    },
  ];

  // Default currentIndex diatur ke 1 (kartu "Fajar Geran Arifin")
  const [currentIndex, setCurrentIndex] = useState(1);

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
              (index - currentIndex + team.length) % team.length; // Hitung posisi relatif
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
      <div className="description">
        <h3>{team[currentIndex].name}</h3>
        <p>{team[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default AboutUs;
