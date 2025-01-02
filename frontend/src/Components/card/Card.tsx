// import React, { JSX } from "react";
import "./Card.scss";
import { ReactComponent as Debit } from "../../assets/cards/Debit.svg";
import { ReactComponent as Credit } from "../../assets/cards/Credit.svg";
import { ReactComponent as Deposit } from "../../assets/cards/Deposit.svg";
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

const cardTypeIcons: { [key: string]: JSX.Element } = {
  "Debit Card": <Debit />,
  "Credit Card": <Credit />,
  "Deposit Card": <Deposit />,
};

function Card({ name, number, type, balance }: CardProps) {
  const cardColor = cardTypeColors[type] || "#FFFFFF";
  const cardIcon = cardTypeIcons[type] || null;

  return (
    <div className="card" style={{ backgroundColor: cardColor }}>
      <div className="card-icon">{cardIcon}</div>
      <h3>{name}</h3>
      <p>Type: {type}</p>
      <p>Number: {number}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}

export default Card;
