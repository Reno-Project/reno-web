import React from "react";
import { Grid, Typography } from "@mui/material";
import useStyles from "./styles";

const HowItWorks = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.heroContainer}>
        <Typography>Manage everything the simple way</Typography>
      </div>
      <Grid container>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
};

export default HowItWorks;
