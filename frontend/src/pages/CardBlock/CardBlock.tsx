import "./CardBlock.scss";
// import AddCardBtn from "../../Components/AddCardBtn/AddCardBtn";
import logo from "../../assets/logo/BudgetLogo.png";
import CardList from "../../Components/CardList/CardList";

const CardBlock: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="card-block">
        <CardList />
      </div>
    </div>
  );
};

export default CardBlock;
