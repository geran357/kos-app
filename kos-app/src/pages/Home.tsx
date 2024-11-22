import React, { useEffect, useState } from "react";
import RoomCard from "../pages/RoomCard";
import axios from "axios";

// Definisikan tipe untuk data kamar
interface Room {
  id: number;
  no_kamar: number;
  status_kamar: string;
  penghuni?: string; // Penghuni bisa jadi tidak ada
}

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]); // Gunakan tipe Room
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mengambil data kamar dari server
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/kamars");
        setRooms(response.data.data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data kamar.");
        console.error("Error fetching room data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <p>Loading data kamar...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <main>
      <h2>INFO-KAMAR</h2>
      <div className="room-grid">
        {rooms.map((room: Room) => ( // Tentukan tipe untuk room
          <RoomCard
            key={room.id}
            roomNumber={room.no_kamar}
            status={room.status_kamar}
            occupant={room.penghuni || "Kosong"} // Jika penghuni tidak ada, tampilkan "Kosong"
          />
        ))}
      </div>
    </main>
  );
};

export default Home;