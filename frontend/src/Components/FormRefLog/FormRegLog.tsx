import React, { useState } from "react";
import { Stack, Box, Button, Typography, Textarea } from "@mui/joy";
import getErrorStyle from "../../utils/formUtils";
import RegistrationFormProps from "../../utils/registerFormInterface";

interface FormProps {
  onSubmit: (cardData: RegistrationFormProps) => void;
  onCancel: () => void;
  isLogin: boolean;
}

const FormRegLog: React.FC<FormProps> = ({ onSubmit, onCancel, isLogin }) => {
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

      console.log("Form submitted with data:", formData);

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

  return (
    <Box
      sx={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          width: "100%",
          maxWidth: "325px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h2>
          {isLogin ? "Введіть дані для входу" : "Введіть дані для Реєстрації"}
        </h2>
        <Stack spacing={2}>
          <Textarea
            name="email"
            placeholder="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={getErrorStyle(errors.email)}
          />
          {errors.email && (
            <Typography color="danger" fontSize="small">
              Email is required
            </Typography>
          )}
          <Textarea
            name="password"
            placeholder="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={getErrorStyle(errors.password)}
          />
          {errors.password && (
            <Typography color="danger" fontSize="small">
              Password is required
            </Typography>
          )}
          {!isLogin && (
            <>
              <Textarea
                name="token"
                placeholder="Token"
                variant="outlined"
                value={token || ""}
                onChange={(e) => setToken(e.target.value)}
                sx={getErrorStyle(errors.token)}
              />
              {errors.token && (
                <Typography color="danger" fontSize="small">
                  Token is required
                </Typography>
              )}
            </>
          )}

          {backendErrors.length > 0 && (
            <Box>
              {backendErrors.map((error, index) => (
                <Typography key={index} color="danger" fontSize="small">
                  {error}
                </Typography>
              ))}
            </Box>
          )}
          <Button type="submit" size="md">
            Submit
          </Button>
          <Button onClick={onCancel} size="md" variant="soft">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default FormRegLog;
