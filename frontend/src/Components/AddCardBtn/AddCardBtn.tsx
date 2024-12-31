import React, { useState } from "react";
import "./AddCardBtn.scss";
import { ReactComponent as Plus } from "../../assets/cards/Plus.svg";
import FormCard from "../FormCard/FormCard";
import { Modal } from "@mui/joy";

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
      icon: "",
      backgroundColor: "#ccc",
    };
    onAddCard(newCard.title, newCard.icon, newCard.backgroundColor);
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
        onClose={() => setIsFormVisible(false)}
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
