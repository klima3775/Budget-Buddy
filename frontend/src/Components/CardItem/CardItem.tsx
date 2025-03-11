// import CardsType from "../../utils/cardsType";
// import "./CardItem.scss";

// const CardItem: React.FC<{ card: CardsType }> = ({ card }) => {
//   const getCurrencySymbol = (currencyCode: number) => {
//     return currencyCode === 980 ? "UAN" : "$";
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
//     </div>
//   );
// };

// export default CardItem;

import React from "react";
import CardsType from "../../utils/cardsType";
import "./CardItem.scss";

const CardItem: React.FC<{ card: CardsType }> = ({ card }) => {
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

  return (
    <div className="card-item">
      <h3>{card.type}</h3>
      <p>
        {card.balance / 100} {getCurrencySymbol(card.currencyCode)}
      </p>
      <p>
        {card.creditLimit / 100} {getCurrencySymbol(card.currencyCode)}
      </p>
      <p>{card.maskedPan}</p>
      <button onClick={() => copyToClipboard(card.iban)}>Копіювати IBAN</button>
    </div>
  );
};

export default CardItem;
