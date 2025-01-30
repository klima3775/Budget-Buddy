import { useState } from "react";
import "./App.css";
import FormRegLog from "./Components/FormRefLog/FormRegLog";

function App() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const handleSubmit = (data: any) => {
    console.log(`${isLogin ? "Login" : "Registration"} successful:`, data);
    setIsLogin(null); // Reset to initial state after submission
  };

  const handleCancel = () => {
    setIsLogin(null); // Reset to initial state on cancel
  };

  return (
    <div className="App">
      {isLogin === null ? (
        <div className="app__button-container">
          <button
            className="app__button app__button--login"
            onClick={() => setIsLogin(true)}
          >
            Вхід
          </button>
          <button
            className="app__button app__button--register"
            onClick={() => setIsLogin(false)}
          >
            Реєстрація
          </button>
        </div>
      ) : (
        <FormRegLog
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLogin={isLogin}
        />
      )}
    </div>
  );
}

export default App;
