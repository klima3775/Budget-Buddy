import React, { useState } from "react";
import "./AddCardBtn.scss";
import { ReactComponent as Plus } from "../../assets/cards/Plus.svg";
import FormCard from "../FormCard/FormCard";

interface AddCardBtnProps {
  onAddCard: (title: string, icon: string, backgroundColor: string) => void;
}

const AddCardBtn: React.FC<AddCardBtnProps> = ({ onAddCard }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddCard = (cardData: {
    name: string;
    number: string;
    type: string;
    balance: string;
  }) => {
    const newCard = {
      title: cardData.name,
      icon: "", // Подставьте логику выбора иконки, если нужно
      backgroundColor: "#ccc", // Установите цвет по умолчанию
    };
    onAddCard(newCard.title, newCard.icon, newCard.backgroundColor);
    setIsFormVisible(false);
  };

  return (
    <div className="add-card-btn">
      {isFormVisible ? (
        <FormCard
          onSubmit={handleAddCard}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <div className="addCard" onClick={() => setIsFormVisible(true)}>
          <div className="addCard__icon">
            <Plus />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCardBtn;
