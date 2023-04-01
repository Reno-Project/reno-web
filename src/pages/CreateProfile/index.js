import React, { useEffect, useState } from "react";
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
  HighlightOffOutlined,
  Image,
} from "@mui/icons-material";
import _, { isArray, isEmpty } from "lodash";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CStepper from "../../components/CStepper";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";
import authActions from "../../redux/reducers/auth/actions";
import { getApiData, getAPIProgressData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import PlaceAutoComplete from "../../components/PlaceAutoComplete";
import useStyles from "./styles";
import ProfileSuccessModal from "../../components/ProfileSuccessModal";

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
  bankErr: false,
  bankMsg: "",
  accErr: false,
  accMsg: "",
  swiftErr: false,
  swiftMsg: "",
  addErr: false,
  addMsg: "",
  socialErr: false,
  socialMsg: "",
  linkedInErr: false,
  linkedInMsg: "",
};

const CreateProfile = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { userData } = useSelector((state) => state.auth);
  console.log("userData =====>>> ", userData);
  const dispatch = useDispatch();
  const { setUserData } = authActions;

  const [activeStep, setActiveStep] = useState(0);
  const [errObj, setErrObj] = useState(errorObj);
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
    location: "",
    certificate: "",
    license: "",
    registraion: "",
    linkedin: "",
    social: "",
    portfolio: [],
    bname: "",
    iban: "",
    bank: "",
    acc: "",
    swift: "",
    address: "",
  });
  const [selectedLocation, setSelectedLocation] = useState({});
  const [userLocation, setUserLocation] = useState("");
  const [buttonLoader, setButtonLoader] = useState("");
  const [visible, setVisible] = useState(false);
  const [bLogo, setBLogo] = useState(null);
  const exp = [
    { id: 1, label: "Interior design" },
    { id: 2, label: "Renovation" },
    { id: 3, label: "Retouch" },
  ];
  const price = ["49", "99", "129", "189", "249"];
  const bank = ["HDFC", "SBI", "PNB", "ICICI", "Axis", ""];
  const employeeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const contractArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    getUserDetailsByIdApiCall();
  }, []);

  useEffect(() => {
    if (state?.businessLogo && _.isObject(state?.businessLogo)) {
      const imgUrl = URL.createObjectURL(state?.businessLogo);
      setBLogo(imgUrl);
    } else {
      setBLogo(state?.businessLogo || "");
    }
  }, [state.businessLogo]);

  // get user details by id
  async function getUserDetailsByIdApiCall() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.contarctorById}/${userData?.id}`,
        "GET",
        {}
      );
      if (response.success) {
        dispatch(setUserData(response?.data));
        setPreFillDataFunction(response?.data);
      } else {
        setPreFillDataFunction(userData);
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
      setPreFillDataFunction(userData);
    }
  }

  const setPreFillDataFunction = (mainData) => {
    if (!isEmpty(userData?.contractor_data)) {
      const uData = mainData?.contractor_data;
      const obj = {
        lat: uData?.lat ? uData?.lat : "",
        lng: uData?.long ? uData?.long : "",
        location: uData?.company_address ? uData?.company_address : "",
      };
      setSelectedLocation(obj);
      setUserLocation(uData?.company_address);

      let tempArray = [];
      uData?.expertise?.map((item, index) => {
        const test = findFromArray(item);
        if (test) {
          tempArray.push(test);
        }
      });

      setState({
        ...state,
        businessLogo: uData?.business_logo ? uData?.business_logo : "",
        cname: uData?.company_name ? uData?.company_name : "",
        description: uData?.description ? uData?.description : "",
        website: uData?.website ? uData?.website : "",
        businessYear: uData?.no_of_years_in_business
          ? uData?.no_of_years_in_business.toString()
          : "",
        employees: uData?.no_of_employees
          ? uData?.no_of_employees.toString()
          : "",
        annualContract: uData?.no_of_contracts_annually
          ? uData?.no_of_contracts_annually.toString()
          : "",
        expertise: tempArray ? tempArray : [],
        certificate: uData?.iso_certificate ? uData?.iso_certificate : {},
        license: uData?.licenses ? uData?.licenses : {},
        registraion: uData?.company_registration
          ? uData?.company_registration
          : {},
        linkedin: uData?.linkedin_url ? uData?.linkedin_url : "",
        social: uData?.fb_url ? uData?.fb_url : "",
        // portfolio: [],
      });
    }
  };

  const findFromArray = (item) => {
    return exp?.find((it) => it?.id === item?.project_id);
  };

  // validation function for page 1
  function CheckValidattion() {
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;
    const urlRegex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    const linkedinRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

    if (!state.businessLogo) {
      valid = false;
      toast.error("Please upload business logo");
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#cname");
      }
    }

    if (isEmpty(state.cname)) {
      valid = false;
      error.cnameErr = true;
      error.cnameMsg = "Please Enter Company's Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#cname");
      }
    }
    if (!isEmpty(state?.website) && !urlRegex.test(state?.website)) {
      valid = false;
      error.webErr = true;
      error.webMsg = "Please Enter Valid Website Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#web");
      }
    }
    if (!isEmpty(state?.linkedin) && !linkedinRegex.test(state?.linkedin)) {
      valid = false;
      error.linkedInErr = true;
      error.linkedInMsg = "Please Enter Valid LinkedIn URL";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#linkedIn");
      }
    }
    if (
      !isEmpty(state?.social) &&
      !(
        state?.social.indexOf("https://") === 0 ||
        state?.social.indexOf("http://") === 0
      )
    ) {
      valid = false;
      error.socialErr = true;
      error.socialMsg = "Please Enter Valid Social URL";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#social");
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
      addContractorDetailsApiCall();
    }
  }

  // this function handles the steps
  function continueStep(step) {
    if (step === 1) {
      setActiveStep((step) => step + 1);
    } else if (step === 2) {
      if (isArray(state.portfolio) && state.portfolio.length === 0) {
        toast.error("Please upload atleast one image");
      } else {
        addPortfolio();
      }
    } else if (step === 3) {
      step3Validation();
    }
  }

  function previousStep() {
    setActiveStep((step) => step - 1);
  }

  // this function checks validation for step 3
  function step3Validation() {
    const { bname, iban, bank, acc, swift, address } = state;
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;

    if (isEmpty(bname)) {
      valid = false;
      error.bnameErr = true;
      error.bnameMsg = "Please Enter Beneficiary Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#name");
      }
    }

    if (isEmpty(iban)) {
      valid = false;
      error.ibanErr = true;
      error.ibanMsg = "Please Enter IBAN Number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#iban");
      }
    }

    if (isEmpty(bank)) {
      valid = false;
      error.bankErr = true;
      error.bankMsg = "Please Select Bank";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bank");
      }
    }

    if (isEmpty(acc)) {
      valid = false;
      error.accErr = true;
      error.accMsg = "Please Enter Bank Account Number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#baccount");
      }
    }

    if (isEmpty(swift)) {
      valid = false;
      error.swiftErr = true;
      error.swiftMsg = "Please Enter Swift Code";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#swift");
      }
    }

    if (isEmpty(address)) {
      valid = false;
      error.addErr = true;
      error.addMsg = "Please Enter Bank Address";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#Address");
      }
    }

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setErrObj(error);

    if (valid) {
      console.log("proceed");
      addBillingInfoApiCall();
    }
  }

  const convertToCsv = (array) => {
    let tempIds = [];
    let tempStringIds = "";
    if (_.isArray(array) && !_.isEmpty(array)) {
      array?.map((it, ind) => {
        tempIds?.push(it?.id);
      });
    }
    tempStringIds = tempIds?.toString();
    return tempStringIds;
  };

  // Step 1 Connect Api integration for api calls ---
  // Step 1 => Pass data in form-data
  async function addContractorDetailsApiCall() {
    try {
      setButtonLoader("step1");
      let expertiseCsv = convertToCsv(state?.expertise);
      let data = {
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
        contractor_expertise: expertiseCsv ? expertiseCsv : "", // pass in CSV form
        lat: selectedLocation?.lat ? selectedLocation?.lat : "",
        long: selectedLocation?.lng ? selectedLocation?.lng : "",
      };
      console.log(typeof state?.certificate);
      if (typeof state?.certificate !== "string") {
        data.iso_certificate = state?.certificate ? state?.certificate : "";
      }
      if (typeof state?.license !== "string") {
        data.licenses = state?.license ? state?.license : "";
      }
      if (typeof state?.registraion !== "string") {
        data.company_registration = state?.registraion
          ? state?.registraion
          : "";
      }
      if (typeof state?.businessLogo !== "string") {
        data.business_logo = state?.businessLogo ? state?.businessLogo : "";
      }
      const response = await getAPIProgressData(
        Setting.endpoints.addContractorDetails,
        "POST",
        data,
        true
      );

      if (response.success) {
        continueStep(1);
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

  // this function for add portfolio image
  async function addPortfolio() {
    setButtonLoader("step2");
    try {
      const response = await getAPIProgressData(
        Setting.endpoints.addPortfolio,
        "POST",
        {
          portfolio: state.portfolio,
        },
        true
      );

      if (response.success) {
        toast.success(response.message);
        setActiveStep((step) => step + 1);
      } else {
        toast.error(response.message);
      }
      setButtonLoader("");
    } catch (error) {
      console.log("🚀 ~ file: index.js:330 ~ addPortfolio ~ error:", error);
      toast.error(error.toString());
      setButtonLoader("");
    }
  }

  // Step 3 Connect Api integration for api calls
  async function addBillingInfoApiCall() {
    try {
      setButtonLoader("step3");
      const data = {
        beneficiary_name: state.bname,
        iban: state.iban,
        bank_name: state.bank,
        bank_account: state.acc,
        swift_code: state.swift,
        Address: state.address,
      };

      const response = await getApiData(
        Setting.endpoints.addBillingInfo,
        "POST",
        data
      );

      if (response.success) {
        toast.success(response.message);
        setVisible(true);
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
                style={{ fontFamily: "Roobert-Regular", color: "#475569" }}
              >
                {activeStep === 0 && "Upload business logo"}
              </Typography>
            </Grid>
            {activeStep === 0 ? (
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
                    helpertext={errObj.cnameMsg}
                  />
                </Grid>
                <Grid item xs={10} id="description">
                  <CInput
                    multiline={true}
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
                    helpertext={errObj.descriptionMsg}
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
                      helpertext={errObj.webMsg}
                    />
                  </Grid>

                  <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="year">
                    <Cselect
                      label="Number of Years in Business"
                      placeholder="Enter No. of Years"
                      value={state.businessYear}
                      handleSelect={(e) => {
                        console.log("e ===businessyear==>>> ", e);
                        setState({
                          ...state,
                          businessYear: _.isNumber(e) ? e.toString() : e,
                        });
                        setErrObj({ ...errObj, yearErr: false, yearMsg: "" });
                      }}
                      renderTags={contractArr}
                      error={errObj.yearErr}
                      helpertext={errObj.yearMsg}
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
                      helpertext={errObj.phoneMsg}
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
                        console.log("e ==employee===>>> ", e);
                        setState({
                          ...state,
                          employees: _.isNumber(e) ? e.toString() : e,
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
                      helpertext={errObj.contarctMsg}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={10} id="expertise">
                  <Cselect
                    multiple={true}
                    label="Expertise Area"
                    placeholder="Select Area of Expertise"
                    value={state.expertise}
                    handleSelect={(e) => {
                      console.log("e ==expertise==>>> ", e);
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
                                  style={{ zIndex: 10, cursor: "pointer" }}
                                  onClick={() => {
                                    setState({ ...state, certificate: "" });
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
                                  style={{ zIndex: 10, cursor: "pointer" }}
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
                                  style={{ zIndex: 10, cursor: "pointer" }}
                                  onClick={() => {
                                    setState({ ...state, registraion: "" });
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

                <Grid item xs={10} id="linkedIn">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Team LinkedIn Profile
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
                      setErrObj({ ...errObj, socialErr: false, socialMsg: "" });
                    }}
                    error={errObj.socialErr}
                    helperText={errObj.socialMsg}
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

                {/* <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    style={{
                      fontFamily: "Roobert-Regular",
                      textAlign: "center",
                    }}
                  >
                    Already have an account,
                  </Typography>
                  <NavLink
                    to="/login"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <b
                      style={{
                        marginLeft: "3px",
                        textAlign: "center",
                        color: "#202939",
                        fontSize: "14px",
                        fontFamily: "Roobert-Regular",
                      }}
                    >
                      Login Now
                    </b>
                  </NavLink>
                </Grid> */}
              </>
            ) : activeStep === 1 ? (
              <>
                <Grid container xs={10} style={{ marginTop: 20 }}>
                  <Grid item xs={12} style={{ position: "relative" }}>
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
                  <Grid item style={{ marginTop: 40 }}>
                    {isArray(state.portfolio) &&
                      state.portfolio.length > 0 &&
                      state.portfolio.map((item, index) => {
                        const imgUrl = URL.createObjectURL(item);
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
                                {item?.name || ""}
                              </Typography>
                              <Typography
                                style={{
                                  fontFamily: "Roobert-Regular",
                                  color: "#787B8C",
                                }}
                              >
                                {item
                                  ? `${(item.size / 1000).toFixed(2)} kb`
                                  : ""}
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
                        onClick={() => continueStep(2)}
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
                    value={state.bname}
                    onChange={(e) => {
                      setState({ ...state, bname: e.target.value });
                      setErrObj({ ...errObj, bnameErr: false, bnameMsg: "" });
                    }}
                    error={errObj.bnameErr}
                    helpertext={errObj.bnameMsg}
                  />
                </Grid>

                <Grid item xs={10} id="iban">
                  <CInput
                    label="IBAN"
                    placeholder="Enter IBAN"
                    value={state.iban}
                    onChange={(e) => {
                      setState({ ...state, iban: e.target.value });
                      setErrObj({
                        ...errObj,
                        ibanErr: false,
                        ibanMsg: "",
                      });
                    }}
                    error={errObj.ibanErr}
                    helpertext={errObj.ibanMsg}
                  />
                </Grid>

                <Grid item xs={10} id="bank">
                  <Cselect
                    label="Bank Name"
                    placeholder="Select Bank"
                    value={state.bank}
                    handleSelect={(e) => {
                      setState({ ...state, bank: e });
                      setErrObj({
                        ...errObj,
                        bankErr: false,
                        bankMsg: "",
                      });
                    }}
                    renderTags={bank}
                    error={errObj.bankErr}
                    helpertext={errObj.bankMsg}
                  />
                </Grid>

                <Grid item container xs={10} justifyContent="space-between">
                  <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="baccount">
                    <CInput
                      label="Bank Account"
                      placeholder="Enter Bank Account Number"
                      value={state.acc}
                      onChange={(e) => {
                        setState({ ...state, acc: e.target.value });
                        setErrObj({ ...errObj, accErr: false, accMsg: "" });
                      }}
                      error={errObj.accErr}
                      helpertext={errObj.accMsg}
                    />
                  </Grid>
                  <Grid item xs={6} id="swift">
                    <CInput
                      label="SWIFT code"
                      placeholder="Enter SWIFT Code"
                      value={state.swift}
                      onChange={(e) => {
                        setState({ ...state, swift: e.target.value });
                        setErrObj({ ...errObj, swiftErr: false, swiftMsg: "" });
                      }}
                      error={errObj.swiftErr}
                      helpertext={errObj.swiftMsg}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={10} id="Address">
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
                      onClick={() => continueStep(3)}
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
      {visible && <ProfileSuccessModal visible={visible} />}
    </div>
  );
};

export default CreateProfile;
