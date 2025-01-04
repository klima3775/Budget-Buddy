import React, { useState } from "react";
import {
  Textarea,
  Stack,
  Box,
  Autocomplete,
  Button,
  Typography,
} from "@mui/joy";

interface FormCardProps {
  onSubmit: (cardData: {
    // name: string;
    // number: string;
    type: string;
    balance: string;
    currency: string;
  }) => void;
  onCancel: () => void;
}

const FormCard: React.FC<FormCardProps> = ({ onSubmit, onCancel }) => {
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

  const cardType = [
    { value: "Debit Card", label: "Debit Card" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Deposit Card", label: "Deposit Card" },
  ];

  const selectCurrency = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "UAN", label: "UAN" },
  ];

  const getErrorStyle = (error: boolean) => ({
    borderColor: error ? "red" : "inherit",
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
          {/* <Textarea
            placeholder="Payment card name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={getErrorStyle(errors.name)}
          />
          {errors.name && (
            <Typography color="danger" fontSize="small">
              Name is required
            </Typography>
          )} */}
          {/* <Textarea
            placeholder="Payment card number"
            variant="outlined"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            sx={getErrorStyle(errors.number)}
          />
          {errors.number && (
            <Typography color="danger" fontSize="small">
              Number is required
            </Typography>
          )} */}
          <Autocomplete
            variant="outlined"
            options={cardType}
            // Sets the current value based on the 'type' state
            value={cardType.find((option) => option.value === type) || null}
            onChange={(e, newValue) => setType(newValue?.value || null)}
            // Compares options and values to ensure correct selection
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            // Displays the label for each option
            getOptionLabel={(option) => option.label}
            placeholder="Select card type"
            sx={getErrorStyle(errors.type)}
          />
          {errors.type && (
            <Typography color="danger" fontSize="small">
              Card type is required
            </Typography>
          )}
          <Autocomplete
            variant="outlined"
            options={selectCurrency}
            value={
              selectCurrency.find((option) => option.value === currency) || null
            }
            onChange={(e, newValue) => setCurrency(newValue?.value || "")}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            getOptionLabel={(option) => option.label}
            placeholder="Select currency"
            sx={getErrorStyle(errors.currency)}
          />
          {errors.currency && (
            <Typography color="danger" fontSize="small">
              Currency is required
            </Typography>
          )}
          <Textarea
            placeholder="Balance"
            variant="outlined"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            sx={getErrorStyle(errors.balance)}
          />
          {errors.balance && (
            <Typography color="danger" fontSize="small">
              Balance is required
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

export default FormCard;
