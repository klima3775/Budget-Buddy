import { useState } from "react";
import "./App.css";
import FormRegLog from "./Components/FormRefLog/FormRegLog";
import CardBlock from "./pages/CardBlock/CardBlock";
import AuthButtons from "./Components/AuthBtn/AuthBtn";

function App() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSubmit = (data: any) => {
    console.log(`${isLogin ? "Login" : "Registration"} successful:`, data);
    setIsAuthenticated(true);
    setIsLogin(null); // Reset to initial state after submission
  };

  const handleCancel = () => {
    setIsLogin(null); // Reset to initial state on cancel
  };

  return (
    <div className="App">
      <div className="App">
        {isAuthenticated ? (
          <CardBlock />
        ) : (
          <>
            {isLogin === null ? (
              <AuthButtons
                onLoginClick={() => setIsLogin(true)}
                onRegisterClick={() => setIsLogin(false)}
              />
            ) : (
              <FormRegLog
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLogin={isLogin}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
