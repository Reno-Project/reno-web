import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FormControl, FormHelperText, InputLabel, styled } from "@mui/material";
const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  marginTop: 24,
  "& .MuiOutlinedInput-root": {
    padding: "11px 12px",
    backgroundColor: "#FFF",
    "&.Mui-focused": {
      boxShadow: "none",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #E8E8E8 !important",
      },
    },
    "&:hover": {
      border: "none !important",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #E8E8E8 !important",
      },
    },
    "& .MuiAutocomplete-input": {
      position: "relative",
      backgroundColor: "#FFF",
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      padding: 0,
    },
    "& MuiAutocomplete-tag": {
      padding: 0,
      margin: 0,
    },
  },
  "& .Mui-focused": {
    outline: "unset",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #E8E8E8 !important",
  },
}));

const CAutocomplete = ({
  options,
  isMultiSelect,
  onChange,
  value = isMultiSelect ? [] : null,
  ...props
}) => {
  return (
    <FormControl
      variant="standard"
      fullWidth
      required={props?.required || false}
      error={props?.error || false}
    >
      <InputLabel shrink htmlFor="input">
        {props.label}
      </InputLabel>
      <CustomAutocomplete
        id="input"
        variant="contained"
        multiple={isMultiSelect}
        value={value}
        onChange={onChange}
        options={options}
        getOptionLabel={props?.getOptionLabel}
        renderOption={props?.renderOption}
        style={{
          border: props?.error ? "1px solid red" : "",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={props?.placeholder || ""}
          />
        )}
        {...props}
      />
      <FormHelperText
        error={props?.error || false}
        style={{ marginBottom: 20, fontFamily: "Poppins-Regular" }}
      >
        {props?.helpertext || ""}
      </FormHelperText>
    </FormControl>
  );
};

export default CAutocomplete;
