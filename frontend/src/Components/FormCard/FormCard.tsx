import React, { useState } from "react";
import { Textarea, Stack, Box, Autocomplete, Button } from "@mui/joy";

interface FormCardProps {
  onSubmit: (cardData: {
    name: string;
    number: string;
    type: string;
    balance: string;
  }) => void;
  onCancel: () => void;
}

const FormCard: React.FC<FormCardProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [balance, setBalance] = useState("");

  const cardType = [
    { value: "Debit Card", label: "Debit Card" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Deposit Card", label: "Deposit Card" },
  ];

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (type) {
      onSubmit({ name, number, type, balance });
      setName("");
      setNumber("");
      setType(null);
      setBalance("");
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
            required
            placeholder="Payment card name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            required
            placeholder="Payment card number"
            variant="outlined"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Autocomplete
            variant="outlined"
            options={cardType}
            value={cardType.find((option) => option.value === type) || null}
            onChange={(e, newValue) => setType(newValue?.value || null)}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            getOptionLabel={(option) => option.label}
            placeholder="Select card type"
          />
          <Textarea
            required
            placeholder="Balance"
            variant="outlined"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
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
