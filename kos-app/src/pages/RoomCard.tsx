import React from "react";
import { Link } from "react-router-dom"; // Pastikan untuk mengimpor Link
import "./RoomCard.css"; // Pastikan file CSS ada

interface RoomCardProps {
  roomNumber: number;
  status: string;
  occupant: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomNumber,
  status,
  occupant,
}) => {
  return (
    <div className="room-card">
      <div className="room-header">Kamar {roomNumber}</div>
      <div className="room-details">
        <p>Status: {status}</p>
        <p>Penghuni: {occupant}</p>
      </div>

      <Link to="/login">
        {" "}
        {/* Pastikan URL sesuai dengan rute yang ada */}
        <button className="detail-button">Login</button>
      </Link>
    </div>
  );
};

export default RoomCard;
