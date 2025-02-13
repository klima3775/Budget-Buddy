import "./AuthBtn.scss";

interface AuthButtonsProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  onLoginClick,
  onRegisterClick,
}) => {
  return (
    <div className="app__button-container">
      <button className="app__button app__button--login" onClick={onLoginClick}>
        Вхід
      </button>
      <button
        className="app__button app__button--register"
        onClick={onRegisterClick}
      >
        Реєстрація
      </button>
    </div>
  );
};

export default AuthButtons;
