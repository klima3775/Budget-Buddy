import "./CardBlock.scss";
import AddCardBtnProps from "../../Components/AddCardBtn/AddCardBtn";
const CardBlock = () => {
  return (
    <div className="card-block">
      <AddCardBtnProps onAddCard={(title, icon, backgroundColor) => {}} />
    </div>
  );
};

export default CardBlock;
