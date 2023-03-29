import React from "react";
import { InputLabel, InputBase, alpha, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#FFF",
    border: "1px solid #FFF",
    fontSize: 14,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: "Roobert-Regular",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
function CInput(props) {
  const {
    label = "",
    placeholder = "",
    required = false,
    error = false,
    helperText = "",
    multiline = "",
  } = props;

  return (
    <FormControl variant="standard" fullWidth required={required} error={error}>
      <InputLabel shrink htmlFor="bootstrap-input">
        {label}
      </InputLabel>
      <BootstrapInput
        {...props}
        multiline={multiline}
        placeholder={placeholder}
        id="bootstrap-input"
        style={{ border: error ? "1px solid red" : "none", borderRadius: 6 }}
      />
      <FormHelperText
        error={error}
        style={{ marginBottom: 20, fontFamily: "Roobert-Regular" }}
      >
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}

export default CInput;
