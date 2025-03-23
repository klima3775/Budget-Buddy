import CardsType from "../../utils/cardsType";
import "./CardItem.scss";
import { useTransactionsStore } from "../../store/useTransactionsStore";

const CardItem: React.FC<{ card: CardsType }> = ({ card }) => {
  const setTransactions = useTransactionsStore(
    (state) => state.setTransactions
  );

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
      console.error(err);
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
    </div>
  );
};

export default CardItem;
