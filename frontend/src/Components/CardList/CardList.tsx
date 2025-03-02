import CardItem from "../CardItem/CardItem";
import useClientInfo from "../../hooks/useClientInfo";
import cardsType from "../../utils/cardsType";

const CardList = () => {
  const { data, isLoading, isError } = useClientInfo();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="card-list">
      {data.accounts.map((card: cardsType) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
