import React, { useState } from "react";
import CardsType from "../../utils/cardsType";
import "./CardItem.scss";

const CardItem: React.FC<{ card: CardsType }> = ({ card }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrencySymbol = (currencyCode: number) => {
    return currencyCode === 980 ? "UAH" : "$";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("IBAN скопійовано в буфер обміну"))
      .catch((err) => console.error("Помилка копіювання:", err));
  };

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/mono/statement?account=${card.id}`,

        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Не вдалося отримати виписку");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-item" onClick={fetchTransactions}>
      <h3>{card.type}</h3>
      <p>
        {card.balance / 100} {getCurrencySymbol(card.currencyCode)}
      </p>
      <p>
        {card.creditLimit / 100} {getCurrencySymbol(card.currencyCode)}
      </p>
      <p>{card.maskedPan}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          copyToClipboard(card.iban);
        }}
      >
        Копіювати IBAN
      </button>

      {loading && <p>Завантаження транзакцій...</p>}
      {error && <p className="error">{error}</p>}
      {transactions.length > 0 && (
        <ul>
          {transactions.map((tx, index) => (
            <li key={index}>
              {tx.description}: {tx.amount / 100}{" "}
              {getCurrencySymbol(card.currencyCode)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CardItem;
