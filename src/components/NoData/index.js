import { Typography } from "@mui/material";
import React from "react";

export default function NoData(props) {
  const { Width = "100vw" } = props;
  return (
    <div
      style={{
        width: Width,
        minHeight: "220px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontFamily={"Poppins-Regular"} margin={"10px"}>
        No data available
      </Typography>
    </div>
  );
}
