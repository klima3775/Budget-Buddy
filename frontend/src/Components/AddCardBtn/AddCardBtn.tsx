import "./AddCardBtn.scss";
import { ReactComponent as Plus } from "../../assets/cards/Plus.svg";

const AddCardBtn: React.FC = ({}) => {
  return (
    <>
      <div className="add-card-btn">
        <div className="addCard">
          <div className="addCard__icon">
            <Plus />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCardBtn;
