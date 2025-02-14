import React from "react";
import { Stack, Box, Button, Typography, Textarea } from "@mui/joy";
import getErrorStyle from "../../utils/formUtils";
import RegistrationFormProps from "../../utils/registerFormInterface";
import useFormSubmit from "../../hooks/useFormSubmit";

interface FormProps {
  onSubmit: (cardData: RegistrationFormProps) => void;
  onCancel: () => void;
  isLogin: boolean;
}

const FormRegLog: React.FC<FormProps> = ({ onSubmit, onCancel, isLogin }) => {
  const {
    token,
    setToken,
    password,
    setPassword,
    email,
    setEmail,
    errors,
    backendErrors,
    handleFormSubmit,
  } = useFormSubmit(isLogin, onSubmit);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#0000aa",
        overflow: "hidden",
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
