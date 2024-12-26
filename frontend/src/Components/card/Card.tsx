import "./Card.scss";

interface CardProps {
  title: string;
  icon: string;
  backgroundColor: string;
}

function Card({ title, icon, backgroundColor }: CardProps) {
  return (
    <div className="card" style={{ backgroundColor }}>
      <img src={icon} alt={`${title} icon`}></img>
      <h3>{title}</h3>
    </div>
  );
}

export default Card;
