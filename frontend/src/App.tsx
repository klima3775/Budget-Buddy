import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import FormRegLog from "./Components/FormRefLog/FormRegLog";
import AuthButtons from "./Components/AuthBtn/AuthBtn";
import Cabinet from "./pages/Cabinet/Cabinet";

const queryClient = new QueryClient();

function App() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSubmit = (data: any) => {
    setIsAuthenticated(true);
    setIsLogin(null); // Reset to initial state after submission
  };

  const handleCancel = () => {
    setIsLogin(null); // Reset to initial state on cancel
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/cabinet" />
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
            <Route path="/cabinet" element={<Cabinet />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
