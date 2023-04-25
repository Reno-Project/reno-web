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
  CreateOutlined,
  AttachFileOutlined,
  ImageOutlined,
  ClearOutlined,
  HighlightOffOutlined,
  Image,
  Instagram,
} from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import _, { isArray, isEmpty, isString } from "lodash";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IBAN from "iban";
import CStepper from "../../components/CStepper";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";
import authActions from "../../redux/reducers/auth/actions";
import { getApiData, getAPIProgressData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import PlaceAutoComplete from "../../components/PlaceAutoComplete";
import useStyles from "./styles";
import ProfileSuccessModal from "../../components/ProfileSuccessModal";
import Images from "../../config/images";

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
  instaErr: false,
  instaMsg: "",
};

const CreateProfile = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setUserData, clearAllData } = authActions;

  const [activeStep, setActiveStep] = useState(0);
  const [expertiseList, setExpertiesList] = useState([]);
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
    insta: "",
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

  const bank = ["HDFC", "SBI", "PNB", "ICICI", "Axis"];
  const employeeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const contractArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    if (!isEmpty(userData) && !isEmpty(userData?.contractor_data)) {
      const { is_profile_verified, profile_completed } =
        userData?.contractor_data;

      if (profile_completed === "completed" && is_profile_verified) {
        navigate("/dashboard");
      }
    }
  }, [userData]);

  useEffect(() => {
    getprojectList();
    getUserDetailsByIdApiCall();
  }, [activeStep]);

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

  async function getprojectList() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.projectlist}`,
        "GET",
        {}
      );
      if (response.success) {
        setExpertiesList(response?.data);
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
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

      const newArray = uData?.expertise?.map((item) => item?.project_name);

      setState({
        ...state,
        businessLogo: userData?.profile_url ? userData?.profile_url : "",
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
        expertise: newArray ? newArray : [],
        certificate: uData?.iso_certificate ? uData?.iso_certificate : "",
        license: uData?.licenses ? uData?.licenses : "",
        registraion: uData?.company_registration
          ? uData?.company_registration
          : "",
        linkedin: uData?.linkedin_url ? uData?.linkedin_url : "",
        social: uData?.fb_url ? uData?.fb_url : "",
        insta: uData?.insta_url ? uData?.insta_url : "",
        portfolio: uData?.portfolio || [],
      });
    }
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
    const facebookRegex =
      /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.com)\/[a-zA-Z0-9_\.]+$/;
    const instaRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)([A-Za-z0-9_\-\.]+)/;

    if (!state.businessLogo) {
      valid = false;
      toast.error("Please upload business logo");
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#logo");
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
    } else if (state?.cname?.length > 30) {
      valid = false;
      error.cnameErr = true;
      error.cnameMsg =
        "Company Name should not be greater thamn 30 characters  ";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#cname");
      }
    }

    if (state.description.length > 255) {
      valid = false;
      error.descriptionErr = true;
      error.descriptionMsg =
        "Description should not be greater than 255 characters";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#description");
      }
    }

    // if (isEmpty(state.website)) {
    //   valid = false;
    //   error.webErr = true;
    //   error.webMsg = "Please Enter Web Address";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#web");
    //   }
    // } else
    // if (isEmpty(state?.website) && !urlRegex.test(state?.website)) {
    //   valid = false;
    //   error.webErr = true;
    //   error.webMsg = "Please Enter Valid Website Name";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#web");
    //   }
    // }
    if (!isEmpty(state?.linkedin) && !linkedinRegex.test(state?.linkedin)) {
      valid = false;
      error.linkedInErr = true;
      error.linkedInMsg = "Please Enter Valid LinkedIn URL";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#linkedIn");
      }
    }
    if (!isEmpty(state?.social) && !facebookRegex.test(state?.social)) {
      valid = false;
      error.socialErr = true;
      error.socialMsg = "Please Enter Valid Social URL";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#social");
      }
    }
    if (!isEmpty(state?.insta) && !instaRegex.test(state?.insta)) {
      valid = false;
      error.instaErr = true;
      error.instaMsg = "Please Enter Valid Instagram URL";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#instagram");
      }
    }

    if (isEmpty(state.businessYear)) {
      valid = false;
      error.yearErr = true;
      error.yearMsg = "Please Enter No. of Business Years";
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
    } else if (state?.annualContract < 0) {
      valid = false;
      error.contractErr = true;
      error.contarctMsg = "Please Enter Valid No. of Contarcts Annually";
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

    // if (!state.certificate) {
    //   valid = false;
    //   error.certiErr = true;
    //   error.certiMsg = "Please Upload Certificate";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#certi");
    //   }
    // }
    // if (!state.license) {
    //   valid = false;
    //   error.licenseErr = true;
    //   error.licenseMsg = "Please Upload License";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#license");
    //   }
    // }
    // if (!state.registraion) {
    //   valid = false;
    //   error.registrationErr = true;
    //   error.registrationMsg = "Please Upload Registration";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#registartion");
    //   }
    // }

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
    const swiftCodeRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;

    if (isEmpty(bname)) {
      valid = false;
      error.bnameErr = true;
      error.bnameMsg = "Please enter beneficiary name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#name");
      }
    } else if (bname.length > 50) {
      valid = false;
      error.bnameErr = true;
      error.bnameMsg =
        "Beneficiary name should not be greater than 50 characters";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#name");
      }
    }

    if (isEmpty(iban)) {
      valid = false;
      error.ibanErr = true;
      error.ibanMsg = "Please enter IBAN number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#iban");
      }
    } else if (!IBAN.isValid(iban)) {
      valid = false;
      error.ibanErr = true;
      error.ibanMsg = "Please enter valid IBAN number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#iban");
      }
    }

    if (isEmpty(bank)) {
      valid = false;
      error.bankErr = true;
      error.bankMsg = "Please select bank";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bank");
      }
    } else if (bank.length > 50) {
      valid = false;
      error.bankErr = true;
      error.bankMsg = "Bank name should not be greater than 50 characters";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bank");
      }
    }

    if (isEmpty(acc)) {
      valid = false;
      error.accErr = true;
      error.accMsg = "Please enter bank account number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#baccount");
      }
    } else if (acc.length > 50) {
      valid = false;
      error.accErr = true;
      error.accMsg =
        "Bank account number should not be greater than 50 characters";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#baccount");
      }
    }

    if (isEmpty(swift)) {
      valid = false;
      error.swiftErr = true;
      error.swiftMsg = "Please enter swift code";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#swift");
      }
    } else if (!swiftCodeRegex.test(swift)) {
      valid = false;
      error.swiftErr = true;
      error.swiftMsg = "Please enter valid swift code";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#swift");
      }
    }
    // else if (swift.length > 11) {
    //   valid = false;
    //   error.swiftErr = true;
    //   error.swiftMsg = "Swift code should not be greater than 11 characters";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#swift");
    //   }
    // }

    if (isEmpty(address)) {
      valid = false;
      error.addErr = true;
      error.addMsg = "Please enter bank address";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#Address");
      }
    } else if (address.length > 100) {
      valid = false;
      error.addErr = true;
      error.addMsg = "Bank address should not be greater than 100 characters";
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

  // const convertToCsv = (array) => {
  //   let tempIds = [];
  //   let tempStringIds = "";
  //   if (_.isArray(array) && !_.isEmpty(array)) {
  //     array?.map((it, ind) => {
  //       tempIds?.push(it?.id);
  //     });
  //   }
  //   tempStringIds = tempIds?.toString();
  //   return tempStringIds;
  // };

  // Step 1 Connect Api integration for api calls ---
  // Step 1 => Pass data in form-data
  async function addContractorDetailsApiCall() {
    const selectedOptions = [];
    state?.expertise?.map((e) => {
      expertiseList?.map((options) => {
        if (options?.project_name === e) {
          return selectedOptions.push(options.id);
        }
      });
    });
    try {
      setButtonLoader("step1");
      // let expertiseCsv = convertToCsv(state?.expertise);
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
        insta_url: state?.insta ? state?.insta : "",
        company_address: userLocation ? userLocation : "",
        contractor_expertise: selectedOptions
          ? selectedOptions?.toString()
          : "", // pass in CSV form
        lat: selectedLocation?.lat ? selectedLocation?.lat : "",
        long: selectedLocation?.lng ? selectedLocation?.lng : "",
      };
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

  // this function for delete portfolio image
  async function deletePortfolio(id) {
    try {
      const response = await getApiData(
        `${Setting.endpoints.deleteportfolio}/${id}`,
        "GET",
        {}
      );
      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Somthing went wromg try again later");
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
        getUserDetailsByIdApiCall();
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
              id="logo"
            >
              <div
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                  backgroundColor: "transparent",
                  position: "relative",
                }}
              >
                <Button
                  component="label"
                  style={{
                    position: "relative",
                    height: 120,
                    width: 120,
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    padding: "0px",
                  }}
                >
                  {bLogo ? (
                    <>
                      <img
                        src={bLogo}
                        alt="business_logo"
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      {activeStep === 0 && (
                        <div className={classes.buttonAbsoluteDiv}>
                          <div className={classes.uploadIcon}>
                            <CreateOutlined
                              style={{
                                fontSize: "18px",
                                color: "#FFF",
                                position: "absolute",
                                top: 7,
                                left: 8,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={classes.uploadImgDivStyle}>
                      <Image style={{ color: "#FFF", fontSize: 30 }} />
                      <div className={classes.buttonAbsoluteDiv}>
                        <div className={classes.uploadIcon}>
                          <CreateOutlined
                            style={{
                              fontSize: "16px",
                              color: "#FFF",
                              position: "absolute",
                              top: 7,
                              left: 8,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Button>
                <input
                  disabled={activeStep !== 0}
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  multiple={false}
                  onChange={(e) => {
                    setState({
                      ...state,
                      businessLogo: e.target.files[0],
                    });
                  }}
                  className={classes.uploadFileStyle}
                />
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
                    label="Company Name"
                    placeholder="Enter Company Name..."
                    value={state.cname}
                    onChange={(e) => {
                      setState({ ...state, cname: e.target.value });
                      setErrObj({ ...errObj, cnameErr: false, cnameMsg: "" });
                    }}
                    inputProps={{
                      maxLength: 40,
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
                      type="number"
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
                    placeholder={
                      isArray(state?.expertise) && state?.expertise.length > 0
                        ? ""
                        : "Select Area of Expertise"
                    }
                    value={state.expertise}
                    handleSelect={(e) => {
                      setState({ ...state, expertise: e });
                      setErrObj({
                        ...errObj,
                        expertiseErr: false,
                        expertiseMsg: "",
                      });
                    }}
                    renderTags={expertiseList}
                    error={errObj.expertiseErr}
                    helpertext={errObj.expertiseMsg}
                  />
                </Grid>

                <Grid item xs={10} id="location" marginBottom={2}>
                  <InputLabel
                    error={errObj.locationErr}
                    shrink
                    htmlFor="bootstrap-input"
                  >
                    Location
                  </InputLabel>
                  <PlaceAutoComplete
                    placeholder="Enter Location Here..."
                    style={{ marginBottom: 10, width: "100%" }}
                    onChange={(obj) => {
                      setUserLocation(obj?.location);
                      setSelectedLocation(obj);
                      setErrObj({
                        ...errObj,
                        locationErr: false,
                        locationMsg: "",
                      });
                    }}
                    defaultValue={selectedLocation?.location}
                    error={errObj.locationErr}
                    helperText={errObj.locationMsg}
                  />
                </Grid>

                <Grid item xs={10} id="certi">
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
                      style: { paddingLeft: "0px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          {/* <LinkedInIcon/> */}
                          <div
                            style={{
                              display: "flex",
                              flex: 1,
                              padding: 10,
                              backgroundColor: "#F5F6F8",
                            }}
                          >
                            <img
                              src={Images.Linkedin1}
                              alt="Linkedin"
                              style={{ borderRadius: 2 }}
                              // className={classes.imgStyleLanguage}
                            />
                          </div>
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

                <Grid item xs={10} id="social">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Social Media
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter link..."
                    style={{ marginBottom: 20, backgroundColor: "#F5F6F8" }}
                    InputProps={{
                      style: { paddingLeft: "0px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div
                            style={{
                              display: "flex",
                              flex: 1,
                              padding: 10,
                              backgroundColor: "#F5F6F8",
                            }}
                          >
                            <img
                              src={Images.Fb1}
                              alt="facebook"
                              // className={classes.imgStyleLanguage}
                            />
                          </div>
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

                <Grid item xs={10} id="instagram">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Instagram
                  </InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter link..."
                    style={{ marginBottom: 20, backgroundColor: "#F5F6F8" }}
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

                <Grid item xs={10} justifyContent={"center"} container>
                  <Typography style={{ textAlign: "center", color: "#646F86" }}>
                    Already have an account,{" "}
                  </Typography>
                  <Typography
                    onClick={() => {
                      dispatch(clearAllData());
                    }}
                    style={{
                      fontWeight: "bold",
                      color: "#030F1C",
                      cursor: "pointer",
                    }}
                  >
                    Login now?
                  </Typography>
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
                      multiple
                      accept="image/jpeg, image/png, image/jpg"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                        cursor: "pointer",
                      }}
                      onChange={(e) => {
                        const chosenFiles = Array.prototype.slice.call(
                          e.target.files
                        );
                        // console.log("chosenFiles", chosenFiles);
                        const nArr = [...state.portfolio];
                        chosenFiles.map((item, index) => {
                          nArr.push(item);
                        });
                        //  nArr.push(e.target.files[0]);
                        setState({ ...state, portfolio: nArr });
                      }}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 40, width: "100%" }}>
                    {isArray(state.portfolio) &&
                      state.portfolio.length > 0 &&
                      state.portfolio.map((item, index) => {
                        let imgUrl = "";
                        if (typeof item?.image === "string") {
                          imgUrl = item?.image;
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
                                width: 60,
                                height: 70,
                                borderRadius: 6,
                                marginRight: 20,
                                objectFit: "cover",
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
                                {item?.name ||
                                  `Portfolio Image ${index + 1}` ||
                                  ""}
                              </Typography>
                              {/* <Typography
                                style={{
                                  fontFamily: "Roobert-Regular",
                                  color: "#787B8C",
                                }}
                              >
                                {isString(item)
                                  ? ""
                                  : `${(item?.size / 1000).toFixed(2)} kb`}
                              </Typography> */}
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
                                  item?.id && deletePortfolio(item?.id);
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
                      <Typography
                        style={{
                          width: "120px",
                          cursor: "pointer",
                          marginTop: 5,
                        }}
                        onClick={() => previousStep()}
                      >
                        Previous Step
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        style={{ width: "342px" }}
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
                  <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="swift">
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
                    <Typography
                      style={{
                        width: "230px",
                        cursor: "pointer",
                        marginTop: 5,
                      }}
                      onClick={() => previousStep()}
                    >
                      Previous Step
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ width: "292px" }}
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
