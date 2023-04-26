import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { color } from "../../../config/theme";

export default function ShowPasswordValidation(props) {
  const { password } = props;
  const [conditionsMet, setConditionsMet] = useState({
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSymbol: false,
    hasMinLength: false,
    hasAllMatch: false,
  });

  useEffect(() => {
    handlePasswordChangeFunction(password);
  }, [password]);

  function handlePasswordChangeFunction(text) {
    setConditionsMet({
      hasNumber: /\d/.test(text),
      hasUppercase: /[A-Z]/.test(text),
      hasLowercase: /[a-z]/.test(text),
      hasSymbol: /^(?=.*[!@#$%+:^=<()~>_?`|'";,.&*])/.test(text),
      hasMinLength: text.length >= 8 && text?.length <= 15,
    });
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: 12,
            color: conditionsMet?.hasNumber ? color.green : "red",
          }}
        >
          Contains a number
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: 12,
            color: conditionsMet?.hasUppercase ? color.green : "red",
          }}
        >
          Contains an uppercase letter
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: 12,
            color: conditionsMet?.hasLowercase ? color.green : "red",
          }}
        >
          Contains a lowercase letter
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: 12,
            color: conditionsMet?.hasSymbol ? color.green : "red",
          }}
        >
          Contains a special character symbol
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: 12,
            color: conditionsMet?.hasMinLength ? color.green : "red",
          }}
        >
          Has at least 8 characters to 15 characters
        </Typography>
      </Grid>
    </Grid>
  );
}
