import "./CardBlock.scss";
import Card from "../../Components/Card/Card";
import AddCardBtn from "../../Components/AddCardBtn/AddCardBtn";
import { useState } from "react";
import logo from "../../assets/logo/BudgetLogo.png";
import CardProps from "../../utils/cardInterface";

const CardBlock: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);

  // Функция для добавления новой карты
  const addCard = (
    // title: string,
    // number: string,
    type: string,
    balance: string,
    currency: string
    // name?: string
  ) => {
    const newCard: CardProps = {
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
