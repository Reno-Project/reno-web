import React, { useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Facebook,
  LinkedIn,
  CreateOutlined,
  AttachFileOutlined,
  ImageOutlined,
  ClearOutlined,
} from "@mui/icons-material";
import CStepper from "../../components/CStepper";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";
import useStyles from "./styles";
import { isEmpty, isObject } from "lodash";
import { toast } from "react-toastify";
import { getApiData, getAPIProgressData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import PlaceAutoComplete from "../../components/PlaceAutoComplete";

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
  bnameErr: false,
  bnameMsg: "",
  ibanErr: false,
  ibanMsg: "",
};

const CreateProfile = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [errObj, setErrObj] = useState(errorObj);
  const [changeTab, setChangeTab] = useState(0);
  const [state, setState] = useState({
    businessLogo: "",
    cname: "",
    description: "",
    email: "",
    website: "",
    countryCode: "AE",
    pCode: "971",
    phone: "",
    businessYear: "",
    employees: "",
    annualContract: "",
    expertise: "",
    pricing: "",
    certificate: "",
    license: "",
    registraion: "",
    linkedin: "",
    social: "",
    portfolio: "",
  });
  // console.log("state =====>>> ", state);

  const [selectedLocation, setSelectedLocation] = useState({});
  const [userLocation, setUserLocation] = useState("");
  const [buttonLoader, setButtonLoader] = useState("");

  //validation function for page 1
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

    if (isEmpty(userLocation)) {
      valid = false;
      error.locationErr = true;
      error.locationMsg = "Please Enter Location";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#location");
      }
    }

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setErrObj(error);

    if (valid) {
      step1ConnectApiCall();
    }
  }

  // this function handles the steps
  function continueStep() {
    setActiveStep((step) => step + 1);
    setChangeTab((changeTab) => changeTab + 1);
  }
  function previousStep() {
    setActiveStep((step) => step - 1);
    setChangeTab((changeTab) => changeTab - 1);
  }
  const exp = [
    { id: 1, label: "Interior design" },
    { id: 2, label: "Renovation" },
    { id: 3, label: "Retouch" },
  ];
  const price = ["49", "99", "129", "189", "249"];
  const bank = ["HDFC", "SBI", "PNB", "ICICI", "Axis", ""];
  const employeeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const contractArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  // Step 1 Connect Api integration for api calls ---
  // Step 1 => Pass data in form-data
  async function step1ConnectApiCall() {
    try {
      setButtonLoader("step1");
      const data = {
        // "email": "",
        // "phone_code": "",
        // "phone_no": "",
        company_name: state?.cname ? state?.cname : "",
        description: state?.description ? state?.description : "",
        website: state?.website ? state?.website : "",
        no_of_years_in_business: state?.businessYear ? state?.businessYear : "",
        no_of_employees: state?.employees ? state?.employees : "",
        no_of_contracts_annually: state?.annualContract
          ? state?.annualContract
          : "",
        linkedin_url: state?.linkedin ? state?.linkedin : "",
        fb_url: state?.social ? state?.social : "",
        company_address: userLocation ? userLocation : "",
        contractor_expertise: "", // pass in CSV form
        lat: selectedLocation?.lat ? selectedLocation?.lat : "",
        long: selectedLocation?.lng ? selectedLocation?.lng : "",
        iso_certificate: "",
        licenses: "",
        company_registration: "",
        business_logo: "",
      };
      const response = await getAPIProgressData(
        Setting.endpoints.addContractorDetails,
        "POST",
        data
      );

      console.log("step1 ConnectApiCall response =====>>> ", response);
      if (response.success) {
        continueStep();
        toast.done(response.message);
      } else {
        toast.error(response.message);
      }
      setButtonLoader("");
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ loginUser ~ error:", error);
      setButtonLoader("");
      toast.error(error.toString());
    }
  }

  // Step 3 Connect Api integration for api calls
  async function step3ConnectApiCall() {
    try {
      setButtonLoader("step3");
      const data = {
        beneficiary_name: "",
        iban: "",
        bank_name: "",
        bank_account: "",
        swift_code: "",
        Address: "",
      };

      const response = await getApiData(
        Setting.endpoints.addBillingInfo,
        "POST",
        data
      );

      console.log("step3 ConnectApiCall response =====>>> ", response);
      if (response.success) {
        toast.done(response.message);
      } else {
        toast.error(response.message);
      }
      setButtonLoader("");
    } catch (error) {
      setButtonLoader("");
      console.log("🚀 ~ file: index.js:63 ~ connect api call ~ error:", error);
      toast.error(error.toString());
    }
  }

  return (
    <div style={{ backgroundColor: "#F9F9FA" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ padding: "40px 0 120px" }}
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          className={classes.formContainerStyle}
        >
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
                        onChange={(e) => {
                          setState({
                            ...state,
                            businessLogo: e.target.files[0],
                          });
                        }}
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
            {changeTab === 0 ? (
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

                <Grid item container xs={10} justifyContent={"space-between"}>
                  <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="web">
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

                  <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="year">
                    <Cselect
                      label="Number of Years in Business"
                      placeholder="Enter No. of Years"
                      value={state.businessYear}
                      handleSelect={(e) => {
                        setState({ ...state, businessYear: e });
                        setErrObj({ ...errObj, yearErr: false, yearMsg: "" });
                      }}
                      renderTags={contractArr}
                      error={errObj.yearErr}
                      helperText={errObj.yearMsg}
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={10} justifyContent="space-between">
                  {/* <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="phone">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      Phone
                    </InputLabel>
                    <TextField
                      fullWidth
                      placeholder="Enter phone number"
                      style={{ marginBottom: 20 }}
                      value={state.phone}
                      onChange={(e) => {
                        setState({ ...state, phone: e.target.value });
                        setErrObj({ ...errObj, phoneErr: false, phoneMsg: "" });
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            style={{ marginLeft: "-13px" }}
                          >
                            <PhoneInput
                              country={"ae"}
                              value={state.pCode}
                              onChange={(code, country) => {
                                const countryUpperCase =
                                  country?.countryCode.toUpperCase();
                                setState({
                                  ...state,
                                  pCode: code,
                                  countryCode: countryUpperCase,
                                });
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      className={classes.pickerInput}
                      error={errObj.phoneErr}
                      helperText={errObj.phoneMsg}
                    />
                  </Grid> */}
                </Grid>

                <Grid item container xs={10} justifyContent="space-between">
                  <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="employee">
                    <Cselect
                      label="Number of Employees"
                      placeholder="Enter No. of Employees"
                      value={state.employees}
                      handleSelect={(e) => {
                        setState({ ...state, employees: e });
                        setErrObj({
                          ...errObj,
                          employeeErr: false,
                          employeeMsg: "",
                        });
                      }}
                      renderTags={employeeArr}
                      error={errObj.employeeErr}
                      helperText={errObj.employeeMsg}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="contract">
                    <CInput
                      label="Number of Contracts Annually"
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
                    multiple
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

                <Grid item xs={10} id="location">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Location
                  </InputLabel>
                  <PlaceAutoComplete
                    placeholder="Enter Location Here..."
                    style={{ marginBottom: 10, width: "100%" }}
                    onChange={(obj) => {
                      setUserLocation(obj?.location);
                      setSelectedLocation(obj);
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
                      placeholder="Upload ISO Certificate"
                      style={{ marginBottom: 20 }}
                      value={state.certificate?.name || ""}
                      InputProps={{
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <ClearOutlined
                                style={{ zIndex: 10, cursor: "pointer" }}
                                onClick={() => {
                                  setState({ ...state, certificate: "" });
                                }}
                              />
                            </InputAdornment>
                            <InputAdornment position="end">
                              <AttachFileOutlined />
                            </InputAdornment>
                          </>
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
                      value={state.license?.name || ""}
                      style={{ marginBottom: 20 }}
                      InputProps={{
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <ClearOutlined
                                style={{ zIndex: 10, cursor: "pointer" }}
                                onClick={() => {
                                  setState({ ...state, license: "" });
                                }}
                              />
                            </InputAdornment>
                            <InputAdornment position="end">
                              <AttachFileOutlined />
                            </InputAdornment>
                          </>
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
                      placeholder="Upload Company Registration"
                      value={state.registraion?.name || ""}
                      style={{ marginBottom: 20 }}
                      InputProps={{
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <ClearOutlined
                                style={{ zIndex: 10, cursor: "pointer" }}
                                onClick={() => {
                                  setState({ ...state, registraion: "" });
                                }}
                              />
                            </InputAdornment>
                            <InputAdornment position="end">
                              <AttachFileOutlined />
                            </InputAdornment>
                          </>
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
                    Team Linkedin Profile
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
                    onClick={CheckValidattion}
                    disabled={buttonLoader == "step1"}
                  >
                    {buttonLoader == "step1" ? (
                      <CircularProgress style={{ color: "#fff" }} size={26} />
                    ) : (
                      "Continue"
                    )}
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
            ) : changeTab === 1 ? (
              <>
                <Grid container xs={10} style={{ marginTop: 20 }}>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="bootstrap-input">
                      Upload Photo
                    </InputLabel>
                    <div
                      style={{
                        backgroundColor: "#F9F9FA",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: 170,
                      }}
                    >
                      <ImageOutlined
                        style={{
                          color: "grey",
                          marginBottom: 20,
                          fontSize: 30,
                        }}
                      />
                      <InputLabel>
                        <b>Upload Your Portfolio Photos</b>
                      </InputLabel>
                      <InputLabel style={{ fontSize: 12 }}>
                        {"PNG, JPG, (max size 1200*800)"}
                      </InputLabel>
                    </div>
                  </Grid>

                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      // opacity: 0,
                    }}
                    onChange={(e) => {
                      setState({ ...state, portfolio: e.target.files[0] });
                    }}
                  />
                  <Grid item style={{ marginTop: 40 }}>
                    <div
                      style={{
                        display: "flex",
                        border: "1px solid lightgrey",
                        borderRadius: 6,
                      }}
                    >
                      <img
                        style={{
                          width: "15%",

                          borderRadius: 6,
                          marginRight: 20,
                        }}
                        src="https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
                        alt="Portfolio Photos"
                      />
                      <div style={{ margin: "auto 0" }}>
                        <InputLabel>{state.portfolio?.name || ""}</InputLabel>
                        <InputLabel>
                          {state.portfolio
                            ? `${(state.portfolio.size / 1000).toFixed(2)} kb`
                            : ""}
                        </InputLabel>
                      </div>
                      {state.portfolio && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "auto",
                            marginRight: 10,
                          }}
                        >
                          <ClearOutlined
                            style={{ zIndex: 10, cursor: "pointer" }}
                            onClick={() =>
                              setState({ ...state, portfolio: "" })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </Grid>
                  <Grid
                    xs={12}
                    item
                    container
                    gap={3}
                    style={{
                      marginTop: 40,
                      justifyContent: "center",
                    }}
                  >
                    <Grid item>
                      <Button
                        style={{ width: "230px" }}
                        variant="outlined"
                        onClick={() => previousStep()}
                      >
                        Previous Step
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        style={{ width: "230px" }}
                        variant="contained"
                        onClick={() => continueStep()}
                        disabled={buttonLoader == "step2"}
                      >
                        {buttonLoader == "step2" ? (
                          <CircularProgress
                            style={{ color: "#fff" }}
                            size={26}
                          />
                        ) : (
                          "Upload & Continue"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={10} style={{ marginTop: 20 }} id="name">
                  <CInput
                    label="Beneficiary Name"
                    placeholder="Enter Beneficiary Name"
                    value={state.cname}
                    onChange={(e) => {
                      setState({ ...state, cname: e.target.value });
                      setErrObj({ ...errObj, cnameErr: false, cnameMsg: "" });
                    }}
                    error={errObj.cnameErr}
                    helperText={errObj.cnameMsg}
                  />
                </Grid>

                <Grid item xs={10} id="iban">
                  <CInput
                    label="IBAN"
                    placeholder="Enter IBAN"
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

                <Grid item xs={10} id="bank">
                  <Cselect
                    label="Bank Name"
                    placeholder="Select Bank"
                    value={state.expertise}
                    handleSelect={(e) => {
                      setState({ ...state, expertise: e });
                      setErrObj({
                        ...errObj,
                        expertiseErr: false,
                        expertiseMsg: "",
                      });
                    }}
                    renderTags={bank}
                    error={errObj.expertiseErr}
                    helperText={errObj.expertiseMsg}
                  />
                </Grid>

                <Grid item container xs={10} justifyContent="space-between">
                  <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="baccount">
                    <CInput
                      label="Bank Account"
                      placeholder="Enter Bank Account Number"
                      value={state.phone}
                      onChange={(e) => {
                        setState({ ...state, phone: e.target.value });
                        setErrObj({ ...errObj, phoneErr: false, phoneMsg: "" });
                      }}
                      error={errObj.phoneErr}
                      helperText={errObj.phoneMsg}
                    />
                  </Grid>
                  <Grid item xs={6} id="swift">
                    <CInput
                      label="SWIFT code"
                      placeholder="Enter SWIFT Code"
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

                <Grid item xs={10} id="Address">
                  <CInput
                    multiline
                    label="Address"
                    placeholder="Enter Address"
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

                <Grid
                  xs={12}
                  item
                  container
                  gap={3}
                  style={{
                    marginTop: 40,
                    justifyContent: "center",
                  }}
                >
                  <Grid item>
                    <Button
                      style={{ width: "230px" }}
                      variant="outlined"
                      onClick={() => previousStep()}
                    >
                      Previous Step
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ width: "230px" }}
                      variant="contained"
                      onClick={() => continueStep()}
                    >
                      {buttonLoader == "step3" ? (
                        <CircularProgress style={{ color: "#fff" }} size={26} />
                      ) : (
                        "Save & Create Profile"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateProfile;
