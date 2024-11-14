// Home.tsx
import React from "react";
import RoomCard from "../pages/RoomCard";

const Home: React.FC = () => {
  const rooms = [
    { roomNumber: 1, status: "terisi - belum", occupant: "nama penghuni" },
    { roomNumber: 2, status: "terisi - belum", occupant: "nama penghuni" },
    { roomNumber: 3, status: "terisi - belum", occupant: "nama penghuni" },
    { roomNumber: 4, status: "terisi - belum", occupant: "nama penghuni" },
    { roomNumber: 5, status: "terisi - belum", occupant: "nama penghuni" },
    { roomNumber: 6, status: "terisi - belum", occupant: "nama penghuni" },
  ];

  return (
    <main>
      <h2>INFO-KAMAR</h2>
      <div className="room-grid">
        {rooms.map((room) => (
          <RoomCard
            key={room.roomNumber}
            roomNumber={room.roomNumber}
            status={room.status}
            occupant={room.occupant}
          />
        ))}
      </div>
    </main>
  );
};

export default Home; // Pastikan ada 'export default' di sini