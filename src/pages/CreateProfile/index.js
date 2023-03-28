import React, { useState } from "react";
import { Button, Grid, InputAdornment, Typography } from "@mui/material";
import CStepper from "../../components/CStepper";
import useStyles from "./styles";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";
import Images from "../../config/images";
import { color } from "../../config/theme";
import { Facebook, Image, LinkedIn, Upload } from "@mui/icons-material";

const errorObj = {
  cnameErr: false,
  cnameMsg: "",
  descriptionErr: false,
  descriptionMsg: "",
  emailErr: false,
  emailMsg: "",
  webErr: false,
  webMsg: "",
  phoneErr: false,
  phoneMsg: "",
  yearErr: false,
  yearMsg: "",
  employeeErr: false,
  employeeMsg: "",
  contractErr: false,
  contarctMsg: "",
  expertiseErr: false,
  expertiseMsg: "",
  priceErr: false,
  peiceMsg: "",
  locationErr: false,
  locationMsg: "",
  certiErr: false,
  certiMsg: "",
  licenseErr: false,
  licenseMsg: "",
  registrationErr: false,
  registrationMsg: "",
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
    expertise: "",
    location: "",
    linkedin: "",
    sociel: "",
  });
  const [errObj, setErrObj] = useState(errorObj);

  // this function handles the steps
  function continueStep() {
    setActiveStep((step) => step + 1);
  }
  const expertise = ["Interior design", "Renovation", "Retouch"];
  const Pricing = ["49", "99", "129", "189", "249"];

  return (
    <div style={{ backgroundColor: "#F9F9FA" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ padding: "40px 0 120px" }}
      >
        <Grid item xs={6} className={classes.formContainerStyle}>
          <Grid container justifyContent={"center"}>
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
            <Grid item xs={10}>
              <CInput
                multiline
                label="Description"
                placeholder="Write Description"
                value={state.description}
                onChange={(e) => {
                  setState({ ...state, description: e.target.value });
                  setErrObj({
                    ...errObj,
                    descriptionErr: false,
                    descriptionMsg: "",
                  });
                }}
                error={errObj.descriptionErr}
                helperText={errObj.descriptionMsg}
              />
            </Grid>

            <Grid item container xs={10} gap={2.5} wrap="nowrap">
              <Grid item xs={6}>
                <CInput
                  label="Email"
                  placeholder="Enter email..."
                  value={state.email}
                  onChange={(e) => {
                    setState({ ...state, email: e.target.value });
                    setErrObj({ ...errObj, emailErr: false, emailMsg: "" });
                  }}
                  error={errObj.emailErr}
                  helperText={errObj.emailMsg}
                />
              </Grid>
              <Grid item xs={6}>
                <CInput
                  label="Website"
                  placeholder="Link Here..."
                  value={state.website}
                  onChange={(e) => {
                    setState({ ...state, website: e.target.value });
                    setErrObj({ ...errObj, webErr: false, webMsg: "" });
                  }}
                  error={errObj.webErr}
                  helperText={errObj.webMsg}
                />
              </Grid>
            </Grid>

            <Grid item container xs={10} gap={2.5} wrap="nowrap">
              <Grid item xs={6}>
                <CInput
                  label="Phone"
                  placeholder="Enter phone number"
                  value={state.phone}
                  onChange={(e) => {
                    setState({ ...state, phone: e.target.value });
                    setErrObj({ ...errObj, phoneErr: false, phoneMsg: "" });
                  }}
                  error={errObj.phoneErr}
                  helperText={errObj.phoneMsg}
                />
              </Grid>
              <Grid item xs={6}>
                <CInput
                  label="Number of years in business:"
                  placeholder="Enter No. of Years"
                  value={state.businessYear}
                  onChange={(e) => {
                    setState({ ...state, businessYear: e.target.value });
                    setErrObj({ ...errObj, yearErr: false, yearMsg: "" });
                  }}
                  error={errObj.yearErr}
                  helperText={errObj.yearMsg}
                />
              </Grid>
            </Grid>

            <Grid item container xs={10} gap={2.5} wrap="nowrap">
              <Grid item xs={6}>
                <CInput
                  label="Number of Employees"
                  placeholder="Enter No. of Employee"
                  value={state.employees}
                  onChange={(e) => {
                    setState({ ...state, employees: e.target.value });
                    setErrObj({
                      ...errObj,
                      employeeErr: false,
                      employeeMsg: "",
                    });
                  }}
                  error={errObj.employeeErr}
                  helperText={errObj.employeeMsg}
                />
              </Grid>
              <Grid item xs={6}>
                <CInput
                  label="Number of contracts annually:"
                  placeholder="Enter No. of Contracts"
                  value={state.annualContract}
                  onChange={(e) => {
                    setState({ ...state, annualContract: e.target.value });
                    setErrObj({
                      ...errObj,
                      contractErr: false,
                      contarctMsg: "",
                    });
                  }}
                  error={errObj.contractErr}
                  helperText={errObj.contarctMsg}
                />
              </Grid>
            </Grid>

            <Grid item xs={10}>
              <Cselect
                label="Expertise Area"
                placeholder="Select Area of Expertise"
                value={state.expertise}
                onChange={(e) =>
                  setState({ ...state, expertise: e.target.value })
                }
                renderTags={expertise}
              />
            </Grid>

            <Grid item xs={10}>
              <Cselect
                label="Pricing"
                placeholder="Select Pricing"
                value={state.expertise}
                onChange={(e) =>
                  setState({ ...state, expertise: e.target.value })
                }
                renderTags={Pricing}
              />
            </Grid>

            <Grid item xs={10}>
              <CInput
                label="Location"
                placeholder="Enter location here..."
                value={state.location}
                onChange={(e) => {
                  setState({ ...state, location: e.target.value });
                  setErrObj({ ...errObj, locationErr: false, locationMsg: "" });
                }}
                error={errObj.locationErr}
                helperText={errObj.locationMsg}
              />
            </Grid>

            <Grid item xs={10}>
              <CInput
                startAdornment={
                  <InputAdornment position="start">
                    {<LinkedIn />}
                  </InputAdornment>
                }
                label="Team linkedin profile"
                placeholder="Enter Link"
                value={state.linkedin}
                onChange={(e) => {
                  setState({ ...state, linkedin: e.target.value });
                }}
              />
            </Grid>

            <Grid item xs={10}>
              <CInput
                startAdornment={
                  <InputAdornment position="start">
                    {<Facebook />}
                  </InputAdornment>
                }
                label="Social Media"
                placeholder="Enter Link"
                value={state.linkedin}
                onChange={(e) => {
                  setState({ ...state, linkedin: e.target.value });
                }}
              />
            </Grid>

            <Grid item xs={10}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={continueStep}
              >
                Continue
              </Button>
            </Grid>

            <Grid item xs={5}>
              <Typography
                style={{
                  fontFamily: "Roobert-Regular",
                }}
              >
                Already have an account,
                <b> Login now?</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateProfile;
