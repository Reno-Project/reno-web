import React, { useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  Facebook,
  LinkedIn,
  CreateOutlined,
  AttachFileOutlined,
  Image,
  ImageOutlined,
  PictureInPictureAlt,
} from "@mui/icons-material";
import CStepper from "../../components/CStepper";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";
import useStyles from "./styles";
import { isEmpty, isObject } from "lodash";
import { bgcolor, borderRadius, height } from "@mui/system";

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
  priceMsg: "",
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
  const [errObj, setErrObj] = useState(errorObj);
  const [changeTab, setChangeTab] = useState(1);
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
    pricing: "",
    location: "",
    certificate: "",
    license: "",
    registraion: "",
    linkedin: "",
    social: "",
    portfolio: "",
  });
  console.log("state=====>>>>>", state.portfolio);

  //validation function
  function CheckValidattion() {
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;

    if (isEmpty(state.cname)) {
      valid = false;
      error.cnameErr = true;
      error.cnameMsg = "Please Enter Company's Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#cname");
      }
    }

    if (isEmpty(state.description)) {
      valid = false;
      error.descriptionErr = true;
      error.descriptionMsg = "Please Enter Descri[tion";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#description");
      }
    }

    if (isEmpty(state.email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please Enter Email";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#email");
      }
    }
    if (isEmpty(state.website)) {
      valid = false;
      error.webErr = true;
      error.webMsg = "Please Enter Web Address";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#web");
      }
    }

    if (isEmpty(state.phone)) {
      valid = false;
      error.phoneErr = true;
      error.phoneMsg = "Please Enter Phone No.";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#phone");
      }
    }
    if (isEmpty(state.businessYear)) {
      valid = false;
      error.yearErr = true;
      error.yearMsg = "Please Enter No. of Bussiness Years";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#year");
      }
    }
    if (isEmpty(state.employees)) {
      valid = false;
      error.employeeErr = true;
      error.employeeMsg = "Please Enter No. of Employees";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#employee");
      }
    }
    if (isEmpty(state.annualContract)) {
      valid = false;
      error.contractErr = true;
      error.contarctMsg = "Please Enter No. of Contarcts Annually";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#contract");
      }
    }

    if (isEmpty(state.expertise)) {
      valid = false;
      error.expertiseErr = true;
      error.expertiseMsg = "Please Enter Expertise Area";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#expertise");
      }
    }
    if (isEmpty(state.pricing)) {
      valid = false;
      error.priceErr = true;
      error.priceMsg = "Please Enter Pricing";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#pricing");
      }
    }
    if (isEmpty(state.location)) {
      valid = false;
      error.locationErr = true;
      error.locationMsg = "Please Enter Location";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#location");
      }
    }

    if (!isObject(state.certificate)) {
      valid = false;
      error.certiErr = true;
      error.certiMsg = "Please Upload Certificate";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#certi");
      }
    }
    if (!isObject(state.license)) {
      valid = false;
      error.licenseErr = true;
      error.licenseMsg = "Please Upload License";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#license");
      }
    }
    if (!isObject(state.registraion)) {
      valid = false;
      error.registrationErr = true;
      error.registrationMsg = "Please Upload Registration";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#registartion");
      }
    }

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setErrObj(error);

    if (valid) {
      continueStep();
    }
  }

  // this function handles the steps
  function continueStep() {
    setActiveStep((step) => step + 1);
    setChangeTab(changeTab === 1 ? 2 : changeTab === 2 ? 3 : 1);
  }
  const exp = ["Interior design", "Renovation", "Retouch"];
  const price = ["49", "99", "129", "189", "249"];

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
            <Grid
              item
              xs={10}
              style={{ marginTop: 20 }}
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
            >
              <div style={{ marginTop: 15, marginBottom: 15 }}>
                <div
                  style={{
                    position: "relative",
                    height: 120,
                    width: 120,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
                    alt="business_logo"
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "50%",
                    }}
                  />
                  <div className={classes.buttonAbsoluteDiv}>
                    <Button component="label" className={classes.uploadIcon}>
                      <CreateOutlined
                        style={{ fontSize: "16px", color: "#FFF" }}
                      />
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        hidden
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Typography
                style={{ fontFamily: "Roobert-Regular", color: "#475569" }}
              >
                {changeTab === 1 && "Upload business logo"}
              </Typography>
            </Grid>
            {changeTab === 1 ? (
              <>
                <Grid item xs={10} style={{ marginTop: 20 }} id="cname">
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
                <Grid item xs={10} id="description">
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
                  <Grid item xs={6} id="email">
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
                  <Grid item xs={6} id="web">
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
                  <Grid item xs={6} id="phone">
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
                  <Grid item xs={6} id="year">
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
                  <Grid item xs={6} id="employee">
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
                  <Grid item xs={6} id="contract">
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

                <Grid item xs={10} id="expertise">
                  <Cselect
                    label="Expertise Area"
                    placeholder="Select Area of Expertise"
                    value={state.expertise}
                    handleSelect={(e) => {
                      setState({ ...state, expertise: e });
                      setErrObj({
                        ...errObj,
                        expertiseErr: false,
                        expertiseMsg: "",
                      });
                    }}
                    renderTags={exp}
                    error={errObj.expertiseErr}
                    helperText={errObj.expertiseMsg}
                  />
                </Grid>

                <Grid item xs={10} id="pricing">
                  <Cselect
                    handleSelect={(e) => {
                      setState({ ...state, pricing: e });
                      setErrObj({ ...errObj, priceErr: false, priceMsg: "" });
                    }}
                    label="Pricing"
                    placeholder="Select Pricing"
                    value={state.pricing}
                    renderTags={price}
                    error={errObj.priceErr}
                    helperText={errObj.priceMsg}
                  />
                </Grid>

                <Grid item xs={10} id="location">
                  <CInput
                    label="Location"
                    placeholder="Enter location here..."
                    value={state.location}
                    onChange={(e) => {
                      setState({ ...state, location: e.target.value });
                      setErrObj({
                        ...errObj,
                        locationErr: false,
                        locationMsg: "",
                      });
                    }}
                    error={errObj.locationErr}
                    helperText={errObj.locationMsg}
                  />
                </Grid>

                <Grid item xs={10} id="certificate">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    ISO Certificate
                  </InputLabel>
                  <div style={{ position: "relative" }}>
                    <TextField
                      fullWidth
                      placeholder="Upload ISO certificate"
                      style={{ marginBottom: 20 }}
                      value={state.certificate.name}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AttachFileOutlined />
                          </InputAdornment>
                        ),
                      }}
                      error={errObj.certiErr}
                      helperText={errObj.certiMsg}
                    />
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                      }}
                      onChange={(e) => {
                        setState({ ...state, certificate: e.target.files[0] });
                        setErrObj({ ...errObj, certiErr: false, certiMsg: "" });
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10} id="license">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Licenses
                  </InputLabel>
                  <div style={{ position: "relative" }}>
                    <TextField
                      fullWidth
                      placeholder="Upload Licenses"
                      value={state.license.name}
                      style={{ marginBottom: 20 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AttachFileOutlined />
                          </InputAdornment>
                        ),
                      }}
                      error={errObj.licenseErr}
                      helperText={errObj.licenseErr ? errObj.licenseMsg : null}
                    />
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                      }}
                      onChange={(e) => {
                        setState({ ...state, license: e.target.files[0] });
                        setErrObj({
                          ...errObj,
                          licenseErr: false,
                          licenseMsg: "",
                        });
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10} id="registartion">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Company Registration
                  </InputLabel>
                  <div style={{ position: "relative" }}>
                    <TextField
                      fullWidth
                      placeholder="Upload Company registration"
                      value={state.registraion.name}
                      style={{ marginBottom: 20 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AttachFileOutlined />
                          </InputAdornment>
                        ),
                      }}
                      error={errObj.registrationErr}
                      helperText={
                        errObj.registrationErr ? errObj.registrationMsg : null
                      }
                    />
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                      }}
                      onChange={(e) => {
                        setState({ ...state, registraion: e.target.files[0] });
                        setErrObj({
                          ...errObj,
                          registrationErr: false,
                          registrationMsg: "",
                        });
                      }}
                    />
                  </div>
                </Grid>

                <Grid item xs={10}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Team Linkedin profile
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter link..."
                    style={{ marginBottom: 20, backgroundColor: "#F5F6F8" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedIn />
                        </InputAdornment>
                      ),
                    }}
                    value={state.linkedin}
                    onChange={(e) => {
                      setState({ ...state, linkedin: e.target.value });
                    }}
                  />
                </Grid>

                <Grid item xs={10}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Social Media
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter link..."
                    style={{ marginBottom: 20, backgroundColor: "#F5F6F8" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Facebook />
                        </InputAdornment>
                      ),
                    }}
                    value={state.social}
                    onChange={(e) => {
                      setState({ ...state, social: e.target.value });
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

                <Grid item xs={12}>
                  <Typography
                    style={{
                      fontFamily: "Roobert-Regular",
                      textAlign: "center",
                    }}
                  >
                    Already have an account,
                    <b> Login now?</b>
                  </Typography>
                </Grid>
              </>
            ) : changeTab === 2 ? (
              <></>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateProfile;
