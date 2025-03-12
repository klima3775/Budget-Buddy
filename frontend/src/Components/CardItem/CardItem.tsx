// import React from "react";
// import CardsType from "../../utils/cardsType";
// import "./CardItem.scss";

// const CardItem: React.FC<{ card: CardsType }> = ({ card }) => {
//   const getCurrencySymbol = (currencyCode: number) => {
//     return currencyCode === 980 ? "UAN" : "$";
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         alert("IBAN скопійовано в буфер обміну");
//       })
//       .catch((err) => {
//         console.error("Помилка копіювання в буфер обміну:", err);
//       });
//   };

//   return (
//     <div className="card-item">
//       <h3>{card.type}</h3>
//       <p>
//         {card.balance / 100} {getCurrencySymbol(card.currencyCode)}
//       </p>
//       <p>
//         {card.creditLimit / 100} {getCurrencySymbol(card.currencyCode)}
//       </p>
//       <p>{card.maskedPan}</p>
//       <button onClick={() => copyToClipboard(card.iban)}>Копіювати IBAN</button>
//     </div>
//   );
// };

// export default CardItem;

import React, { useState } from "react";
import CardsType from "../../utils/cardsType";
import "./CardItem.scss";
import axios from "axios";

const CardItem: React.FC<{ card: CardsType }> = ({ card }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrencySymbol = (currencyCode: number) => {
    return currencyCode === 980 ? "UAN" : "$";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("IBAN скопійовано в буфер обміну");
      })
      .catch((err) => {
        console.error("Помилка копіювання в буфер обміну:", err);
      });
  };

  const fetchTransactions = async (from: number, to: number) => {
    try {
      setLoading(true);
      setError(null);
      let allTransactions: any[] = [];
      let currentTo = to;

      while (true) {
        const response = await axios.get(
          `http://localhost:5000/api/mono/statement?from=${from}&to=${currentTo}`,
          {
            withCredentials: true,
          }
        );

        const transactions = response.data;
        allTransactions = [...allTransactions, ...transactions];

        if (transactions.length < 500) {
          break;
        }

        currentTo = transactions[transactions.length - 1].time - 1;
      }

      setTransactions(allTransactions);
    } catch (err) {
      setError("Помилка отримання виписки");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    const to = Math.floor(Date.now() / 1000);
    const from = to - 2682000; // 31 доба + 1 година
    fetchTransactions(from, to);
  };

  return (
    <div className="card-item" onClick={handleCardClick}>
      <h3>{card.type}</h3>
      <p>
        {card.balance / 100} {getCurrencySymbol(card.currencyCode)}
      </p>
      <p>
        {card.creditLimit / 100} {getCurrencySymbol(card.currencyCode)}
      </p>
      <p>{card.maskedPan}</p>
      <button onClick={() => copyToClipboard(card.iban)}>Копіювати IBAN</button>
      {loading && <p>Завантаження...</p>}
      {error && <p>{error}</p>}
      {transactions.length > 0 && (
        <div>
          <h4>Транзакції:</h4>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>{transaction.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CardItem;
