import styled from "@emotion/styled";
import {
  alpha,
  Autocomplete,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const Select = styled(Autocomplete)(({ theme }) => ({
  marginTop: 24,
  marginBottom: 26,
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused": {
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "& .MuiAutocomplete-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "#F5F6F8",
      fontSize: 14,
      fontFamily: "Roobert-Regular",
      padding: 0,
    },
    "& MuiAutocomplete-tag": {
      padding: 0,
      margin: 0,
    },
  },
}));

export default function Cselect(props) {
  const [data, setData] = useState("");

  const {
    label = "",
    required = false,
    error = false,
    placeholder = "",
    renderTags = [],
  } = props;
  return (
    <FormControl variant="standard" fullWidth required={required} error={error}>
      <InputLabel shrink htmlFor="bootstrap-input">
        {label}
      </InputLabel>
      <Select
        variant="contained"
        id="tags-outlined"
        options={renderTags}
        getOptionLabel={(item) => item}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
      />
    </FormControl>
  );
}
