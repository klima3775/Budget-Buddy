import React, { useState } from "react";
import {
  Stack,
  Box,
  Autocomplete,
  Button,
  Typography,
  Textarea,
} from "@mui/joy";
import getErrorStyle from "../../utils/formUtils";
import CardProps from "../../utils/cardInterface";

interface FormCardProps {
  onSubmit: (cardData: CardProps) => void;
  onCancel: () => void;
}

const FormReg: React.FC<FormCardProps> = ({ onSubmit, onCancel }) => {
  // const [name, setName] = useState("");
  // const [number, setNumber] = useState("");
  const [type, setType] = useState<string | null>("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState<string>("");
  const [errors, setErrors] = useState({
    // name: false,
    // number: false,
    type: false,
    balance: false,
    currency: false,
  });

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      // name: !name.trim(),
      // number: !number.trim(),
      type: !type,
      balance: !balance.trim(),
      currency: !currency,
    };

    setErrors(newErrors);
    // Если нет ошибок, отправить данные
    if (!Object.values(newErrors).some((error) => error)) {
      onSubmit({ type: type || "", balance, currency });
      // setName("");
      // setNumber("");
      setType(null);
      setBalance("");
      setCurrency("");
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
          <Textarea name="outlined" placeholder="Email" variant="solid" />
          {errors.balance && (
            <Typography color="danger" fontSize="small">
              Balance is required
            </Typography>
          )}
          <Textarea name="outlined" placeholder="Password" variant="solid" />
          {errors.balance && (
            <Typography color="danger" fontSize="small">
              Balance is required
            </Typography>
          )}
          <Textarea name="outlined" placeholder="Token" variant="solid" />
          {errors.balance && (
            <Typography color="danger" fontSize="small">
              Balance is required
            </Typography>
          )}
          <Button type="submit" size="md">
            Submit
          </Button>
          <Button size="md" variant="soft">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default FormReg;
