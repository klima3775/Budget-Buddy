import React, { useState } from "react";
import { Stack, Box, Button, Typography, Textarea } from "@mui/joy";
import getErrorStyle from "../../utils/formUtils";
import RegistrationFormProps from "../../utils/registerFormInterface";

interface FormCardProps {
  onSubmit: (cardData: RegistrationFormProps) => void;
  onCancel: () => void;
}

const FormReg: React.FC<FormCardProps> = ({ onSubmit, onCancel }) => {
  const [token, setToken] = useState<string | null>("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState({
    token: false,
    password: false,
    email: false,
  });

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      token: !token,
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
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to register");
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
        <h2>Fill in payment card details</h2>
        <Stack spacing={2}>
          <Textarea
            name="email"
            placeholder="Email"
            variant="solid"
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
            variant="solid"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={getErrorStyle(errors.password)}
          />
          {errors.password && (
            <Typography color="danger" fontSize="small">
              Password is required
            </Typography>
          )}
          <Textarea
            name="token"
            placeholder="Token"
            variant="solid"
            value={token || ""}
            onChange={(e) => setToken(e.target.value)}
            sx={getErrorStyle(errors.token)}
          />
          {errors.token && (
            <Typography color="danger" fontSize="small">
              Token is required
            </Typography>
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

export default FormReg;
