import "./AuthBtn.scss";
import { useNavigate } from "react-router-dom";

interface AuthButtonsProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  onLoginClick,
  onRegisterClick,
}) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onLoginClick();
    navigate("/auth");
  };

  const handleRegisterClick = () => {
    onRegisterClick();
    navigate("/auth");
  };

  return (
    <div className="app__button-container">
      <button
        className="app__button app__button--login"
        onClick={handleLoginClick}
      >
        Вхід
      </button>
      <button
        className="app__button app__button--register"
        onClick={handleRegisterClick}
      >
        Реєстрація
      </button>
    </div>
  );
};

export default AuthButtons;
