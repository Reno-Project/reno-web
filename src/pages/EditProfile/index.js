import {
  AttachFileOutlined,
  ClearOutlined,
  CreateOutlined,
  Facebook,
  HighlightOffOutlined,
  ImageOutlined,
  Image,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { PhoneNumberUtil } from "google-libphonenumber";
import { isArray, isEmpty, isNumber, isObject, isString } from "lodash";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";
import useStyles from "./styles";
const errorObj = {
  cnameErr: false,
  cnameMsg: "",
  addErr: false,
  addMsg: "",
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
  bankErr: false,
  bankMsg: "",
  accErr: false,
  accMsg: "",
  swiftErr: false,
  swiftMsg: "",
  bankaddErr: false,
  bankaddMsg: "",
  socialErr: false,
  socialMsg: "",
  linkedInErr: false,
  linkedInMsg: "",
  instaErr: false,
  instaMsg: "",
};
export default function EditProfile() {
  const classes = useStyles();
  const phoneUtil = PhoneNumberUtil.getInstance();

  const [active, setActive] = useState(0);
  const [bLogo, setBLogo] = useState(null);
  const [errObj, setErrObj] = useState(errorObj);
  const [state, setState] = useState({
    businessLogo: "",
    cname: "",
    address: "",
    email: "",
    website: "",
    phone: "",
    countryCode: "AE",
    pCode: "971",
    businessYear: "",
    employees: "",
    annualContract: "",
    expertise: "",
    certificate: "",
    license: "",
    registraion: "",
    linkedin: "",
    social: "",
    insta: "",
    portfolio: [],
  });
  const employeeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const contractArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const btnArr = [
    "Company Information",
    "Documents",
    "Profile Image",
    "Social Link",
    "Portfolio",
  ];
  const exp = [
    { id: 1, label: "Interior design" },
    { id: 2, label: "Renovation" },
    { id: 3, label: "Retouch" },
  ];

  useEffect(() => {
    if (state?.businessLogo && isObject(state?.businessLogo)) {
      const imgUrl = URL.createObjectURL(state?.businessLogo);
      setBLogo(imgUrl);
    } else {
      setBLogo(state?.businessLogo || "");
    }
  }, [state.businessLogo]);

  function validation1() {
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;
    const urlRegex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const linkedinRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;
    const facebookRegex =
      /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.com)\/[a-zA-Z0-9_\.]+$/;
    const instaRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)([A-Za-z0-9_\-\.]+)/;

    // if (isEmpty(state.cname)) {
    //   valid = false;
    //   error.cnameErr = true;
    //   error.cnameMsg = "Please Enter Company's Name";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#cname");
    //   }
    // }

    // if (isEmpty(state.address)) {
    //   valid = false;
    //   error.addErr = true;
    //   error.addMsg = "Please Enter Address[tion";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#address");
    //   }
    // }

    // if (isEmpty(state.email)) {
    //   valid = false;
    //   error.emailErr = true;
    //   error.emailMsg = "Please enter email";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#email");
    //   }
    // } else if (!emailRegex.test(state.email)) {
    //   valid = false;
    //   error.emailErr = true;
    //   error.emailMsg = "Please enter valid email";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#email");
    //   }
    // }

    // if (isEmpty(state?.website) && !urlRegex.test(state?.website)) {
    //   valid = false;
    //   error.webErr = true;
    //   error.webMsg = "Please Enter Valid Website Name";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#web");
    //   }
    // }

    // if (isEmpty(state.phone)) {
    //   valid = false;
    //   error.phoneErr = true;
    //   error.phoneMsg = "Please enter phone number";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#phone");
    //   }
    // } else if (!isEmpty(state.phone) && !isEmpty(state.countryCode)) {
    //   const phoneNumber1 = phoneUtil.parse(state.phone, state.countryCode);
    //   const isValid = phoneUtil.isValidNumber(phoneNumber1);
    //   if (!isValid) {
    //     valid = false;
    //     error.phoneErr = true;
    //     error.phoneMsg = "Please enter valid phone number";
    //     if (!scroll) {
    //       scroll = true;
    //       section = document.querySelector("#phone");
    //     }
    //   }
    // }

    // if (isEmpty(state.businessYear)) {
    //   valid = false;
    //   error.yearErr = true;
    //   error.yearMsg = "Please Enter No. of Bussiness Years";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#year");
    //   }
    // }
    // if (isEmpty(state.employees)) {
    //   valid = false;
    //   error.employeeErr = true;
    //   error.employeeMsg = "Please Enter No. of Employees";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#employee");
    //   }
    // }
    // if (isEmpty(state.annualContract)) {
    //   valid = false;
    //   error.contractErr = true;
    //   error.contarctMsg = "Please Enter No. of Contarcts Annually";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#contract");
    //   }
    // } else if (state?.annualContract < 0) {
    //   valid = false;
    //   error.contractErr = true;
    //   error.contarctMsg = "Please Enter Valid No. of Contarcts Annually";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#contract");
    //   }
    // }

    // if (isEmpty(state.expertise)) {
    //   valid = false;
    //   error.expertiseErr = true;
    //   error.expertiseMsg = "Please Enter Expertise Area";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#expertise");
    //   }
    // }

    // if (section) {
    //   section.scrollIntoView({ behavior: "smooth", block: "center" });
    // }
    // setErrObj(error);

    if (valid) {
      // addContractorDetailsApiCall();
      continueStep(1);
    }
  }

  function validation3() {}

  // this function handles the steps
  function continueStep(step) {
    if (step === 1) {
      setActive((step) => step + 1);
    } else if (step === 2) {
      if (isArray(state.portfolio) && state.portfolio.length === 0) {
        toast.error("Please upload atleast one image");
      } else {
        // addPortfolio();
      }
    } else if (step === 3) {
      // step3Validation();
    }
  }
  return (
    <>
      <Grid
        item
        xs={5}
        sm={4}
        md={4}
        lg={4}
        style={{
          backgroundColor: "#F5F6F8",
          borderRadius: 6,
          padding: 10,
        }}
      >
        {btnArr.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              style={{
                backgroundColor: active === index ? "#fff" : "transparent",
                padding: "15px 10px",
                borderBottom: "1px solid #F2F3F4",
                borderRadius: 6,
              }}
              onClick={() => setActive(index)}
            >
              <Typography variant="outlined">{item}</Typography>
            </Grid>
          );
        })}
      </Grid>
      {active === 0 ? (
        <Grid item xs={7} sm={8} md={8} lg={8} padding="10px 20px">
          <Typography variant="h5">Information</Typography>
          <Typography>
            Lorem Ipsum has been the industry's standard dummy text ever since.
          </Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: 20,
              marginTop: 20,
            }}
          >
            <Grid item xs={12} id="cname">
              <CInput
                label="Company Name"
                placeholder="Enter Company Name..."
                value={state.cname}
                onChange={(e) => {
                  setState({ ...state, cname: e.target.value });
                  setErrObj({
                    ...errObj,
                    cnameErr: false,
                    cnameMsg: "",
                  });
                }}
                error={errObj.cnameErr}
                helpertext={errObj.cnameMsg}
              />
            </Grid>

            <Grid item xs={12} id="Address">
              <CInput
                multiline
                label="Address"
                placeholder="Enter Address"
                value={state.address}
                onChange={(e) => {
                  setState({ ...state, address: e.target.value });
                  setErrObj({
                    ...errObj,
                    addErr: false,
                    addMsg: "",
                  });
                }}
                error={errObj.addErr}
                helpertext={errObj.addMsg}
              />
            </Grid>

            <Grid item xs={12} id="email">
              <CInput
                label="Email"
                placeholder="Enter Email Here..."
                value={state.email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                  setErrObj({
                    ...errObj,
                    emailErr: false,
                    emailMsg: "",
                  });
                }}
                error={errObj.emailErr}
                helpertext={errObj.emailMsg}
              />
            </Grid>

            <Grid item xs={12} id="web">
              <CInput
                label="Website"
                placeholder="Link Here..."
                value={state.website}
                onChange={(e) => {
                  setState({ ...state, website: e.target.value });
                  setErrObj({
                    ...errObj,
                    webErr: false,
                    webMsg: "",
                  });
                }}
                error={errObj.webErr}
                helpertext={errObj.webMsg}
              />
            </Grid>

            <Grid item xs={12} id="phone">
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
                  setErrObj({
                    ...errObj,
                    phoneErr: false,
                    phoneMsg: "",
                  });
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
            </Grid>

            <Grid item xs={12} id="year">
              <Cselect
                label="Number of Years in Business"
                placeholder="Enter No. of Years"
                value={state.businessYear}
                handleSelect={(e) => {
                  console.log("e ===businessyear==>>> ", e);
                  setState({
                    ...state,
                    businessYear: isNumber(e) ? e.toString() : e,
                  });
                  setErrObj({
                    ...errObj,
                    yearErr: false,
                    yearMsg: "",
                  });
                }}
                renderTags={contractArr}
                error={errObj.yearErr}
                helpertext={errObj.yearMsg}
              />
            </Grid>

            <Grid item xs={12} id="employee">
              <Cselect
                label="Number of Employees"
                placeholder="Enter No. of Employees"
                value={state.employees}
                handleSelect={(e) => {
                  console.log("e ==employee===>>> ", e);
                  setState({
                    ...state,
                    employees: isNumber(e) ? e.toString() : e,
                  });
                  setErrObj({
                    ...errObj,
                    employeeErr: false,
                    employeeMsg: "",
                  });
                }}
                renderTags={employeeArr}
                error={errObj.employeeErr}
                helpertext={errObj.employeeMsg}
              />
            </Grid>
            <Grid item xs={12} id="contract">
              <CInput
                label="Number of Contracts Annually"
                placeholder="Enter No. of Contracts"
                type="number"
                value={state.annualContract}
                onChange={(e) => {
                  setState({
                    ...state,
                    annualContract: e.target.value,
                  });
                  setErrObj({
                    ...errObj,
                    contractErr: false,
                    contarctMsg: "",
                  });
                }}
                error={errObj.contractErr}
                helpertext={errObj.contarctMsg}
              />
            </Grid>
          </Grid>
          <Grid item lg={12} padding="10px 20px">
            <Typography variant="h5">Expertise Area</Typography>
            <Typography>
              Lorem Ipsum has been the industry's standard dummy text ever
              since.
            </Typography>
            <Grid
              item
              container
              style={{
                border: "1px solid #F2F4F7",
                padding: "5px 15px",
                marginTop: 20,
              }}
            >
              <Cselect
                multiple={true}
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
                helpertext={errObj.expertiseMsg}
              />
            </Grid>
          </Grid>
          <Grid
            xs={12}
            item
            container
            wrap="nowrap"
            gap={2}
            style={{
              margin: "25px 0",
              justifyContent: "center",
            }}
          >
            <Grid item xs={6}>
              <Button style={{ width: "100%" }} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ minWidth: "135px", width: "100%" }}
                variant="contained"
                onClick={() => validation1()}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {active === 1 ? (
        <Grid item xs={7} sm={8} md={8} lg={8} padding="10px 20px">
          <Typography variant="h5">Documents</Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: 20,
              marginTop: 20,
            }}
          >
            <Grid item xs={12} id="certi">
              <InputLabel shrink htmlFor="bootstrap-input">
                ISO Certificate
              </InputLabel>
              <div style={{ position: "relative" }}>
                <TextField
                  fullWidth
                  placeholder="Upload ISO Certificate"
                  style={{ marginBottom: 20 }}
                  value={
                    typeof state?.certificate === "string"
                      ? state.certificate || ""
                      : state.certificate?.name || ""
                  }
                  InputProps={{
                    endAdornment: (
                      <>
                        {state.certificate ? (
                          <InputAdornment position="end">
                            <ClearOutlined
                              style={{
                                zIndex: 10,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setState({
                                  ...state,
                                  certificate: "",
                                });
                              }}
                            />
                          </InputAdornment>
                        ) : null}
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
                    setState({
                      ...state,
                      certificate: e.target.files[0],
                    });
                    setErrObj({
                      ...errObj,
                      certiErr: false,
                      certiMsg: "",
                    });
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} id="license">
              <InputLabel shrink htmlFor="bootstrap-input">
                Licenses
              </InputLabel>
              <div style={{ position: "relative" }}>
                <TextField
                  fullWidth
                  placeholder="Upload Licenses"
                  value={
                    typeof state?.license === "string"
                      ? state.license || ""
                      : state.license?.name || ""
                  }
                  style={{ marginBottom: 20 }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {state.license ? (
                          <InputAdornment position="end">
                            <ClearOutlined
                              style={{
                                zIndex: 10,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setState({ ...state, license: "" });
                              }}
                            />
                          </InputAdornment>
                        ) : null}
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
                    setState({
                      ...state,
                      license: e.target.files[0],
                    });
                    setErrObj({
                      ...errObj,
                      licenseErr: false,
                      licenseMsg: "",
                    });
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} id="registartion">
              <InputLabel shrink htmlFor="bootstrap-input">
                Company Registration
              </InputLabel>
              <div style={{ position: "relative" }}>
                <TextField
                  fullWidth
                  placeholder="Upload Company Registration"
                  value={
                    typeof state?.registraion === "string"
                      ? state.registraion || ""
                      : state.registraion?.name || ""
                  }
                  style={{ marginBottom: 20 }}
                  InputProps={{
                    endAdornment: (
                      <>
                        {state.registraion ? (
                          <InputAdornment position="end">
                            <ClearOutlined
                              style={{
                                zIndex: 10,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setState({
                                  ...state,
                                  registraion: "",
                                });
                              }}
                            />
                          </InputAdornment>
                        ) : null}
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
                    setState({
                      ...state,
                      registraion: e.target.files[0],
                    });
                    setErrObj({
                      ...errObj,
                      registrationErr: false,
                      registrationMsg: "",
                    });
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            item
            container
            wrap="nowrap"
            gap={2}
            style={{
              margin: "25px 0",
              justifyContent: "center",
            }}
          >
            <Grid item xs={6}>
              <Button style={{ width: "100%" }} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ minWidth: "135px", width: "100%" }}
                variant="contained"
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {active === 2 ? (
        <Grid item xs={7} sm={8} md={8} lg={8} padding="10px 20px">
          <Typography variant="h5">Profile Image</Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: 20,
              marginTop: 20,
            }}
          >
            <Grid
              item
              xs={12}
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
              id="logo"
            >
              <div style={{ marginTop: 15, marginBottom: 15 }}>
                <div
                  style={{
                    position: "relative",
                    height: 120,
                    width: 120,
                  }}
                >
                  {bLogo ? (
                    <img
                      src={bLogo}
                      alt="business_logo"
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <div className={classes.uploadImgDivStyle}>
                      <Image style={{ color: "#FFF", fontSize: 30 }} />
                    </div>
                  )}
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
                style={{
                  fontFamily: "Roobert-Regular",
                  color: "#475569",
                }}
              >
                {state.businessLogo === "" && "Upload business logo"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            item
            container
            wrap="nowrap"
            gap={2}
            style={{
              margin: "25px 0",
              justifyContent: "center",
            }}
          >
            <Grid item xs={6}>
              <Button style={{ width: "100%" }} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ minWidth: "135px", width: "100%" }}
                variant="contained"
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {active === 3 ? (
        <Grid item xs={7} sm={8} md={8} lg={8} padding="10px 20px">
          <Typography variant="h5">Social Link</Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: 20,
              marginTop: 20,
            }}
          >
            <Grid item xs={12} id="linkedIn">
              <InputLabel shrink htmlFor="bootstrap-input">
                Team LinkedIn Profile
              </InputLabel>
              <TextField
                fullWidth
                placeholder="Enter link..."
                style={{
                  marginBottom: 20,
                  backgroundColor: "#F5F6F8",
                }}
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
                  setErrObj({
                    ...errObj,
                    linkedInErr: false,
                    linkedInMsg: "",
                  });
                }}
                error={errObj.linkedInErr}
                helperText={errObj.linkedInMsg}
              />
            </Grid>

            <Grid item xs={12} id="social">
              <InputLabel shrink htmlFor="bootstrap-input">
                Social Media
              </InputLabel>
              <TextField
                fullWidth
                placeholder="Enter link..."
                style={{
                  marginBottom: 20,
                  backgroundColor: "#F5F6F8",
                }}
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
                  setErrObj({
                    ...errObj,
                    socialErr: false,
                    socialMsg: "",
                  });
                }}
                error={errObj.socialErr}
                helperText={errObj.socialMsg}
              />
            </Grid>

            <Grid item xs={12} id="instagram">
              <InputLabel shrink htmlFor="bootstrap-input">
                Instagram
              </InputLabel>
              <TextField
                fullWidth
                placeholder="Enter link..."
                style={{
                  marginBottom: 20,
                  backgroundColor: "#F5F6F8",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram />
                    </InputAdornment>
                  ),
                }}
                value={state?.insta}
                onChange={(e) => {
                  setState({ ...state, insta: e.target.value });
                  setErrObj({
                    ...errObj,
                    instaErr: false,
                    instaMsg: "",
                  });
                }}
                error={errObj.instaErr}
                helperText={errObj.instaMsg}
              />
            </Grid>
          </Grid>
          <Grid
            xs={12}
            item
            container
            wrap="nowrap"
            gap={2}
            style={{
              margin: "25px 0",
              justifyContent: "center",
            }}
          >
            <Grid item xs={6}>
              <Button style={{ width: "100%" }} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ minWidth: "135px", width: "100%" }}
                variant="contained"
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {active === 4 ? (
        <Grid item xs={7} sm={8} md={8} lg={8} padding="10px 20px">
          <Typography variant="h5">Portfolio</Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: 20,
              marginTop: 20,
            }}
          >
            <Grid
              item
              xs={12}
              style={{
                position: "relative",
              }}
            >
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
                  const nArr = [...state.portfolio];
                  nArr.push(e.target.files[0]);
                  setState({ ...state, portfolio: nArr });
                }}
              />
            </Grid>
            <Grid
              item
              style={{
                marginTop: 40,
                overflow: "scroll",
                maxHeight: 500,
              }}
            >
              {isArray(state.portfolio) &&
                state.portfolio.length > 0 &&
                state.portfolio.map((item, index) => {
                  let imgUrl = "";
                  if (typeof item === "string") {
                    imgUrl = item;
                  } else {
                    imgUrl = URL.createObjectURL(item);
                  }
                  return (
                    <div
                      style={{
                        display: "flex",
                        border: "1px solid #F2F3F4",
                        borderRadius: 6,
                        marginBottom: 10,
                        padding: 3,
                      }}
                    >
                      <img
                        style={{
                          width: "15%",
                          borderRadius: 6,
                          marginRight: 20,
                        }}
                        src={imgUrl}
                        alt="Portfolio Photos"
                      />
                      <div style={{ margin: "auto 0" }}>
                        <Typography
                          style={{
                            fontFamily: "Roobert-Regular",
                            fontWeight: "500",
                            color: "#202939",
                            fontSize: 18,
                          }}
                        >
                          {item?.name || `Portfolio Image ${index + 1}` || ""}
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: "Roobert-Regular",
                            color: "#787B8C",
                          }}
                        >
                          {isString(item)
                            ? ""
                            : `${(item?.size / 1000).toFixed(2)} kb`}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "auto",
                          marginRight: 10,
                        }}
                      >
                        <HighlightOffOutlined
                          style={{
                            zIndex: 10,
                            cursor: "pointer",
                            fontSize: 28,
                            color: "#8C92A4",
                          }}
                          onClick={() => {
                            const nArr = [...state.portfolio];
                            nArr.splice(index, 1);
                            setState({ ...state, portfolio: nArr });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
