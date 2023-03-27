import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import CStepper from "../../components/CStepper";
import useStyles from "./styles";
import CInput from "../../components/CInput";

const errorObj = {
  cnameErr: false,
  descriptionErr: false,
  cnameMsg: "",
  descriptionMsg: "",
};

const CreateProfile = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    cname: "",
    description: "",
    email: "",
    website: "",
    phone: "",
    businessYear: "",
    employees: "",
    annualContract: "",
  });
  const [errObj, setErrObj] = useState(errorObj);

  // this function handles the steps
  function continueStep() {
    setActiveStep((step) => step + 1);
  }

  return (
    <div style={{ backgroundColor: "#F9F9FA" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ paddingTop: 40 }}
      >
        <Grid item xs={6} className={classes.formContainerStyle}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.welcomeTextStyle}>
                Welcome to Reno
              </Typography>
              <Typography className={classes.loginHeaderText}>
                Create your Contractor Profile
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CStepper
                data={[
                  "Contractor Profile",
                  "Upload Portfolio",
                  "Billing Information",
                ]}
                activeStep={activeStep}
              />
            </Grid>
            <Grid item xs={10}>
              <CInput
                label="Company name"
                placeholder="Enter company name..."
                value={state.cname}
                onChange={(e) => {
                  setState({ ...state, cname: e.target.value });
                  setErrObj({ ...errObj, cnameErr: false, cnameMsg: "" });
                }}
                error={errObj.cnameErr}
                helperText={errObj.cnameMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={continueStep}
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateProfile;
