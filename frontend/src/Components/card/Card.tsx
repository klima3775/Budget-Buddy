import React from "react";
import "./Card.scss";

interface CardProps {
  name?: string;
  number: string;
  type: string;
  balance: string;
}

function Card({ name, number, type, balance }: CardProps) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Number: {number}</p>
      <p>Type: {type}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}

export default Card;
