import "./CardBlock.scss";
import Card from "../../Components/Card/Card";
import AddCardBtn from "../../Components/AddCardBtn/AddCardBtn";
import { useState } from "react";
import logo from "../../assets/logo/BudgetLogo.png";

// Интерфейс для карт
interface CardBlockProps {
  // name?: string; // Делаем необязательным, если name не всегда нужно
  // title: string;
  // number: string;
  type: string;
  balance: string;
  currency: string;
}

const CardBlock: React.FC = () => {
  const [cards, setCards] = useState<CardBlockProps[]>([]);

  // Функция для добавления новой карты
  const addCard = (
    // title: string,
    // number: string,
    type: string,
    balance: string,
    currency: string,
    name?: string
  ) => {
    const newCard: CardBlockProps = {
      type,
      balance,
      currency,
    };
    setCards([newCard, ...cards]);
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="card-block">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
        <AddCardBtn onAddCard={addCard} />
      </div>
    </div>
  );
};

export default CardBlock;
