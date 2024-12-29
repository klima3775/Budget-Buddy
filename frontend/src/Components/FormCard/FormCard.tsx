import React from "react";
import { Textarea, Stack, Box, Autocomplete, Button } from "@mui/joy";

const FormCard: React.FC = () => {
  // onSubmit={(event) => {
  //       event.preventDefault();
  //     }}

  const cardType = [
    { value: "Debit", label: "Debit" },
    { value: "Credit", label: "Credit" },
    { value: "Deposit Card", label: "Deposit Card" },
  ];

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
            name="Primary"
            placeholder="Payment card name"
            variant="outlined"
            color="primary"
            sx={{ color: "grey" }}
          />
          <Textarea
            required
            name="Primary"
            placeholder="Payment card number"
            variant="outlined"
            color="primary"
            sx={{ color: "grey" }}
          />

          <Autocomplete
            variant="outlined"
            placeholder="select map type"
            options={cardType}
            color="primary"
            sx={{ width: 325, color: "grey" }}
          />

          <Textarea
            required
            name="Primary"
            placeholder="Balance card"
            variant="outlined"
            color="primary"
            sx={{ color: "grey" }}
          />

          <Button size="md">SUBMIT</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default FormCard;
