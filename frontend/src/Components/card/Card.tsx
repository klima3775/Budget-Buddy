import React, { JSX } from "react";
import "./Card.scss";
import { ReactComponent as Debit } from "../../assets/cards/Debit.svg";
import { ReactComponent as Credit } from "../../assets/cards/Credit.svg";
import { ReactComponent as Deposit } from "../../assets/cards/Deposit.svg";
interface CardProps {
  name?: string;
  number: string;
  type: string;
  balance: string;
  currency: string;
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

function Card({ name, number, type, balance, currency }: CardProps) {
  const cardColor = cardTypeColors[type] || "#FFFFFF";
  const cardIcon = cardTypeIcons[type] || null;
  const textColor = type === "Debit Card" ? "#FFFFFF" : "#000000";

  return (
    <div className="card" style={{ backgroundColor: cardColor }}>
      <div className="card-info">
        {/* <h3>{name}</h3> */}
        <p style={{ color: textColor }}>{type}</p>
        <div className="card-icon">{cardIcon}</div>
      </div>
      <div className="card-details">
        {/* <p style={{ color: textColor }}>{number}</p> */}
        <p className="balance" style={{ color: textColor }}>
          {balance} {currency}
        </p>
      </div>
    </div>
  );
}

export default Card;
