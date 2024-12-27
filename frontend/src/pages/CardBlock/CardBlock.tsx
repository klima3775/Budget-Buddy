import "./CardBlock.scss";
import Card from "../../Components/Card/Card";
import AddCardBtn from "../../Components/AddCardBtn/AddCardBtn";
import { useState } from "react";
import logo from "../../assets/logo/BudgetLogo.png";

interface CardBlockProps {
  title: string;
  icon: string;
  backgroundColor: string;
}

const CardBlock: React.FC = () => {
  const [cards, setCards] = useState<CardBlockProps[]>([]);

  const addCard = (title: string, icon: string, backgroundColor: string) => {
    const newCard: CardBlockProps = { title, icon, backgroundColor };
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
