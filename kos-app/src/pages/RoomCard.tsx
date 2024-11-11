import React from "react";
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
      <button className="detail-button">Detail</button>
    </div>
  );
};

export default RoomCard;
