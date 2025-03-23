import "./Transactions.scss";
import { useTransactionsStore } from "../../store/useTransactionsStore";

const Transactions: React.FC = () => {
  const transactions = useTransactionsStore((state) => state.transactions);

  return (
    <div className="transactions">
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            {tx.description}: {tx.amount / 100} UAH
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
