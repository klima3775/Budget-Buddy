import { useState } from "react";
import "./AddCardBtn.scss";
import { ReactComponent as Plus } from "../../assets/cards/Plus.svg";

interface AddCardBtnProps {
  onAddCard: (title: string, icon: string, backgroundColor: string) => void;
}

const AddCardBtn = ({ onAddCard }: AddCardBtnProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleAddCard = () => {
    onAddCard(title, icon, backgroundColor);
    setTitle("");
    setIcon("");
    setBackgroundColor("");
    setIsFormVisible(false);
  };

  return (
    <div className="add-card-btn">
      {isFormVisible ? (
        <div className="form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Icon URL"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          <input
            type="text"
            placeholder="Background Color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
          <button onClick={handleAddCard}>Add Card</button>
        </div>
      ) : (
        // <button onClick={() => setIsFormVisible(true)}>+</button>
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
