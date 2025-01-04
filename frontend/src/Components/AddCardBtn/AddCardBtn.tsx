import React, { useState } from "react";
import "./AddCardBtn.scss";
import { ReactComponent as Plus } from "../../assets/cards/Plus.svg";
import FormCard from "../FormCard/FormCard";
import { Modal } from "@mui/joy";

import CardProps from "../../utils/cardInterface"; // Импортируйте интерфейс
interface AddCardBtnProps {
  onAddCard: (type: string, balance: string, currency: string) => void;
}

const AddCardBtn: React.FC<AddCardBtnProps> = ({ onAddCard }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddCard: (cardData: CardProps) => void = (cardData) => {
    onAddCard(cardData.type, cardData.balance, cardData.currency);
    setIsFormVisible(false);
  };

  return (
    <>
      <div className="add-card-btn">
        <div className="addCard" onClick={() => setIsFormVisible(true)}>
          <div className="addCard__icon">
            <Plus />
          </div>
        </div>
      </div>

      <Modal
        open={isFormVisible}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormCard
          onSubmit={handleAddCard}
          onCancel={() => setIsFormVisible(false)}
        />
      </Modal>
    </>
  );
};

export default AddCardBtn;
