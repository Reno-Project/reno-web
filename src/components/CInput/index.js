import React from "react";
import { InputLabel, InputBase, alpha, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import ShowPasswordValidation from "../CSelect/ShowPasswordValidation";
import { isEmpty } from "lodash";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  padding: 0,
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: "#FFF",
    // border: "1px solid #FFF",
    fontSize: 14,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: "Roobert-Regular",
    "&:focus": {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
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
    helpertext = "",
    multiline = false,
    outline = "",
    passwordValidation = false,
    passValue = "",
  } = props;

  const passwordRegex =
    /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z]))(?=.*[!@#$%+:^=<()~>_?`|'";,.&*])((?=.*[A-Z])))(?=.{8,})/;

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
        style={{
          border:
            outline && !error
              ? "1px solid #F5F6F8"
              : error
              ? "1px solid red"
              : "1px solid #E8E8E8",
          backgroundColor: outline ? "#F5F6F8" : "",
          borderRadius: 6,
        }}
      />
      {passwordValidation &&
      !passwordRegex.test(passValue) &&
      !isEmpty(passValue) ? (
        <ShowPasswordValidation password={passValue} />
      ) : null}

      <FormHelperText
        error={error}
        style={{ marginBottom: 20, fontFamily: "Roobert-Regular" }}
      >
        {helpertext}
      </FormHelperText>
    </FormControl>
  );
}

export default CInput;
