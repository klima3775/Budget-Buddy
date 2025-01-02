import React from "react";
import "./Card.scss";

interface CardProps {
  name?: string;
  number: string;
  type: string;
  balance: string;
}

const cardTypeColors: { [key: string]: string } = {
  "Debit Card": "#2D90D7",
  "Credit Card": "#FFFFFF",
  "Deposit Card": "#FB9A94",
};

function Card({ name, number, type, balance }: CardProps) {
  const cardColor = cardTypeColors[type] || "#FFFFFF";

  return (
    <div className="card" style={{ backgroundColor: cardColor }}>
      <h3>{name}</h3>
      <p>Number: {number}</p>
      <p>Type: {type}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}

export default Card;
