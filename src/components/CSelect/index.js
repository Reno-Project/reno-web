import styled from "@emotion/styled";
import {
  alpha,
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
const Select = styled(Autocomplete)(({ theme }) => ({
  marginTop: 24,
  borderRadius: 5,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#FFF",
    "&.Mui-focused": {
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "& .MuiAutocomplete-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "#FFF",
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
  const {
    handleSelect = () => null,
    label = "",
    required = false,
    error = false,
    helpertext = "",
    multiple = false,
    placeholder = "",
    renderTags = [],
    value = [],
  } = props;

  const val = multiple ? value || [] : value || null;
  return (
    <FormControl variant="standard" fullWidth required={required} error={error}>
      <InputLabel shrink htmlFor="bootstrap-input">
        {label}
      </InputLabel>
      <Select
        style={{ border: error ? "1px solid red" : "none" }}
        variant="contained"
        id="tags-outlined"
        multiple={multiple}
        options={renderTags}
        // getOptionLabel={(item) => item.label}
        filterSelectedOptions
        // isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
        value={val}
        onChange={(a, b, c, e) => {
          handleSelect(b);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.label}
              deleteIcon={<CloseIcon />}
              {...getTagProps({ index })}
              sx={{
                fontWeight: "normal",
                textTransform: "uppercase",
                pl: "16px",
                bgcolor: "rgba(245, 246, 248, 1)",
                border: "none",
                "& .MuiChip-deleteIcon": {
                  position: "absolute",
                  left: 10,
                  bgcolor: "transparent",
                  color: "rgba(0, 0, 0, 1)",
                },
              }}
            />
          ))
        }
      />
      <FormHelperText
        error={error}
        style={{ marginBottom: 20, fontFamily: "Roobert-Regular" }}
      >
        {helpertext}
      </FormHelperText>
    </FormControl>
  );
}
