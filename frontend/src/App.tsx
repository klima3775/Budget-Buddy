import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import FormRegLog from "./Components/FormRefLog/FormRegLog";
import CardBlock from "./pages/CardBlock/CardBlock";
import AuthButtons from "./Components/AuthBtn/AuthBtn";
import Cabinet from "./pages/Cabinet/Cabinet";

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
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/cards" />
              ) : (
                <AuthButtons
                  onLoginClick={() => setIsLogin(true)}
                  onRegisterClick={() => setIsLogin(false)}
                />
              )
            }
          />
          <Route
            path="/auth"
            element={
              isLogin !== null ? (
                <FormRegLog
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isLogin={isLogin}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/cards" element={<Cabinet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
