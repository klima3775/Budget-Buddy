import CardsType from "../../utils/cardsType";

const CardItem: React.FC<{ card: CardsType }> = ({ card }) => {
  const getCurrencySymbol = (currencyCode: number) => {
    return currencyCode === 980 ? "UAN" : "$";
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
    </div>
  );
};

export default CardItem;
