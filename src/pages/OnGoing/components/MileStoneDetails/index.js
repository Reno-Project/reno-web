import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import "./index.css";

export default function MilestoneDetails() {
  return (
    <Grid container>
      <Grid item>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 17.0546L9.5 12.0546L14.5 7.05463"
            stroke="#363853"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Grid>
      <Grid item>
        <Typography className="">Milestones</Typography>
      </Grid>
      <Grid item className="status">
        <div>ongoing</div>
      </Grid>
      <Grid item>
        <Divider orientation="vertical" flexItem />
      </Grid>
    </Grid>
  );
}
