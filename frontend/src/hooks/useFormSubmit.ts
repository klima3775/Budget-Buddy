import { useState } from "react";
import RegistrationFormProps from "../utils/registerFormInterface";

const useFormSubmit = (isLogin: boolean, onSubmit: (data: any) => void) => {
  const [token, setToken] = useState<string | null>("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState({
    token: false,
    password: false,
    email: false,
  });
  const [backendErrors, setBackendErrors] = useState<string[]>([]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      token: !token && !isLogin,
      password: !password,
      email: !email,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      const formData: RegistrationFormProps = {
        token: token || "",
        password,
        email,
      };

      try {
        const response = await fetch(
          isLogin
            ? "http://localhost:5000/api/auth/login"
            : "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          const result = await response.json();
          setBackendErrors(
            result.errors
              ? result.errors.map((err: any) => err.msg)
              : [result.message]
          );
          throw new Error("Failed to submit form");
        }

        const result = await response.json();
        onSubmit(result);
      } catch (error) {
        console.error("Error:", error);
      }

      setToken(null);
      setPassword("");
      setEmail("");
    }
  };

  return {
    token,
    setToken,
    password,
    setPassword,
    email,
    setEmail,
    errors,
    backendErrors,
    handleFormSubmit,
  };
};

export default useFormSubmit;
