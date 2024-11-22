import React from "react";
import { Link } from "react-router-dom";
import "./RoomCard.css";

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
        <button className="detail-button">LogIn</button>
      </Link>
    </div>
  );
};

export default RoomCard;  