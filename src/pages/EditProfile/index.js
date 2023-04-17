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
  CircularProgress,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { PhoneNumberUtil } from "google-libphonenumber";
import { isArray, isEmpty, isNumber, isObject, isString } from "lodash";
import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";
import useStyles from "./styles";
import { getAPIProgressData, getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import PlaceAutoComplete from "../../components/PlaceAutoComplete";
import { useDispatch, useSelector } from "react-redux";
import color from "../../config/theme";
import authActions from "../../redux/reducers/auth/actions";

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
  const { token, userData } = useSelector((state) => state.auth);
  const isEdit = !isEmpty(userData);
  const dispatch = useDispatch();
  const { setUserData } = authActions;
  const [profileData, setProfileData] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [userLocation, setUserLocation] = useState("");
  const [active, setActive] = useState(0);
  const [bLogo, setBLogo] = useState(null);
  const [errObj, setErrObj] = useState(errorObj);
  const data = profileData?.contractor_data;
  const [state, setState] = useState({
    businessLogo: "",
    cname: "",
    address: "",
    email: "",
    website: "",
    phone: "",
    countryCode: "AE",
    pCode: "",
    businessYear: "",
    employees: "",
    annualContract: "",
    expertise: [],
    certificate: "",
    license: "",
    registraion: "",
    linkedin: "",
    social: "",
    insta: "",
    portfolio: [],
  });

  const employeeArr = [
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
  ];
  const contractArr = [
    "1",
    " 2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
  ];

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
    getUserDetailsByIdApiCall();
  }, []);

  const expertiseArr = (data) => {
    !isEmpty(data) &&
      data.map((item, index) => {
        let obj = {};
        obj.id = item.id;
        obj.label = item.project_name;
        let arr = [];
        arr.push(obj);
        return arr;
      });
  };

  useEffect(() => {
    if (isEdit) {
      let obj = {};
      obj.lat = data?.lat;
      obj.long = data?.long;
      obj.location = data?.company_address;
      setSelectedLocation(obj);
      setUserLocation(obj?.location);

      const newArray = data?.expertise.map(({ id, project_name }) => ({
        id: id,
        label: project_name,
      }));

      setState({
        ...state,
        businessLogo: profileData?.profile_url,
        cname: data?.company_name || "",
        address: obj.location || "",
        email: profileData?.email || "",
        website: data?.website || "",
        pCode: profileData?.phone_code || "",
        phone: profileData?.phone_no || "",
        businessYear: data?.no_of_years_in_business.toString() || "",
        employees: data?.no_of_employees.toString() || "",
        annualContract: data?.no_of_contracts_annually.toString() || "",
        expertise: newArray || [],
        certificate: data?.iso_certificate || "",
        license: data?.licenses || "",
        registraion: data?.company_registration || "",
        linkedin: data?.linkedin_url || "",
        social: data?.fb_url || "",
        insta: data?.insta_url || "",
        portfolio: data?.portfolio || "",
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (state?.businessLogo && isObject(state?.businessLogo)) {
      const imgUrl = URL.createObjectURL(state?.businessLogo);
      setBLogo(imgUrl);
    } else {
      setBLogo(state?.businessLogo || "");
    }
  }, [state.businessLogo]);

  async function getUserDetailsByIdApiCall() {
    setPageLoad(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.contarctorById}/${userData?.id}`,
        "GET",
        {}
      );
      if (response.success) {
        dispatch(setUserData(response?.data));
        setProfileData(response?.data);
      } else {
        setProfileData(userData);
      }
      setPageLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
      setProfileData(userData);
      setPageLoad(false);
    }
  }

  function validation1() {
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;
    const urlRegex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (isEmpty(state.cname)) {
      valid = false;
      error.cnameErr = true;
      error.cnameMsg = "Please Enter Company's Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#cname");
      }
    }

    if (isEmpty(userLocation)) {
      valid = false;
      error.locationErr = true;
      error.locationMsg = "Please Enter Address";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#Address");
      }
    }

    if (isEmpty(state?.website) && !urlRegex.test(state?.website)) {
      valid = false;
      error.webErr = true;
      error.webMsg = "Please Enter Valid Website Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#web");
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

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setErrObj(error);

    if (valid) {
      editContractorDetailsApiCall();
    }
  }

  const convertToCsv = (array) => {
    let tempIds = [];
    let tempStringIds = "";
    if (isArray(array) && !isEmpty(array)) {
      array?.map((it, ind) => {
        tempIds?.push(it?.id);
      });
    }
    tempStringIds = tempIds?.toString();
    return tempStringIds;
  };

  async function editContractorDetailsApiCall() {
    try {
      setButtonLoader(true);
      let expertiseCsv = convertToCsv(state?.expertise);
      let data = {
        company_name: state?.cname ? state?.cname : "",
        company_address: userLocation ? userLocation : "",
        // email: state?.email || "",
        website: state?.website ? state?.website : "",
        // phone_code: "",
        // phone_no: state?.phone || "",
        no_of_years_in_business: state?.businessYear ? state?.businessYear : "",
        no_of_employees: state?.employees ? state?.employees : "",
        no_of_contracts_annually: state?.annualContract
          ? state?.annualContract
          : "",
        contractor_expertise: expertiseCsv ? expertiseCsv : "", // pass in CSV form
        linkedin_url: state?.linkedin ? state?.linkedin : "",
        fb_url: state?.social ? state?.social : "",
        insta_url: state?.insta ? state?.insta : "",
        lat: selectedLocation?.lat ? selectedLocation?.lat : "",
        long: selectedLocation?.long || "",
      };
      if (active === 1) {
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
      }
      if (active === 2) {
        if (typeof state?.businessLogo !== "string") {
          data.business_logo = state?.businessLogo ? state?.businessLogo : "";
        }
      }
      const response = await getAPIProgressData(
        Setting.endpoints.addContractorDetails,
        "POST",
        data,
        true,
        { Authorization: `Bearer ${token}` }
      );

      if (response.success) {
        if (active === 0) {
          toast.success(response.message);
          continueStep(1);
        } else if (active === 1) {
          toast.success("Your documents successfully updated");
          continueStep(2);
        } else if (active === 2) {
          continueStep(3);
        } else if (active === 3) {
          toast.success("Your social links successfully updated");
          continueStep(4);
        } else if (active === 4) {
          continueStep(5);
        }
      } else {
        toast.error(response.message);
      }
      setButtonLoader(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ loginUser ~ error:", error);
      setButtonLoader(false);
      toast.error(error.toString());
    }
  }

  function validation4() {
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;
    const linkedinRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;
    const facebookRegex =
      /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.com)\/[a-zA-Z0-9_\.]+$/;
    const instaRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)([A-Za-z0-9_\-\.]+)/;

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

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setErrObj(error);

    if (valid) {
      editContractorDetailsApiCall();
    }
  }

  async function addPortfolio() {
    setButtonLoader(true);
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
      } else {
        toast.error(response.message);
      }
      setButtonLoader(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:330 ~ addPortfolio ~ error:", error);
      toast.error(error.toString());
      setButtonLoader(false);
    }
  }

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

  // this function handles the steps
  function continueStep(step) {
    if (step === 1) {
      setActive((step) => step + 1);
    } else if (step === 2) {
      setActive(2);
    } else if (step === 3) {
      if (!state.businessLogo) {
        toast.error("Please upload business logo");
      } else {
        toast.success("Your profile image successfully updated");
        setActive(3);
      }
    } else if (step === 4) {
      setActive(4);
    } else if (step === 5) {
      if (isArray(state.portfolio) && state.portfolio.length === 0) {
        toast.error("Please upload atleast one image");
      } else {
        addPortfolio();
      }
    }
  }
  return (
    <Grid
      container
      padding={"20px 0"}
      wrap={isMobile && !isTablet ? "wrap" : "nowrap"}
      gap={2}
      justifyContent={"center"}
    >
      {pageLoad ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress style={{ color: color.primary }} size={30} />
        </div>
      ) : (
        <>
          <Grid
            item
            xs={isMobile && !isTablet ? 12 : 5}
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
                    cursor: "pointer",
                  }}
                  onClick={() => setActive(index)}
                >
                  <Typography
                    variant="outlined"
                    style={{ fontFamily: "Roobert-Regular" }}
                  >
                    {item}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          {active === 0 ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              padding={isMobile ? "10px 0" : "10px 20px"}
            >
              <Typography variant="h5">Information</Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile ? 10 : 20,
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
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Address
                  </InputLabel>
                  <PlaceAutoComplete
                    fullWidth
                    placeholder="Enter Address Here..."
                    style={{ marginBottom: 10 }}
                    onChange={(obj) => {
                      obj.long = obj.lng;
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

                <Grid item xs={12} id="email">
                  <CInput
                    disabled
                    label="Email"
                    placeholder="Enter Email Here..."
                    value={state.email}
                    // onChange={(e) => {
                    //   setState({ ...state, email: e.target.value });
                    //   setErrObj({
                    //     ...errObj,
                    //     emailErr: false,
                    //     emailMsg: "",
                    //   });
                    // }}
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
                    disabled
                    fullWidth
                    placeholder="Enter phone number"
                    style={{
                      marginBottom: 20,
                    }}
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
                        <InputAdornment position="start">
                          <Typography>+{state.pCode}</Typography>
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
                    {buttonLoader ? (
                      <CircularProgress size={26} style={{ color: "#fff" }} />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {active === 1 ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              padding={isMobile ? "10px 0" : "10px 20px"}
            >
              <Typography variant="h5">Documents</Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile ? 10 : 20,
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
                    onClick={() => editContractorDetailsApiCall()}
                  >
                    {buttonLoader ? (
                      <CircularProgress size={26} style={{ color: "#fff" }} />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {active === 2 ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              padding={isMobile ? "10px 0" : "10px 20px"}
            >
              <Typography variant="h5">Profile Image</Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile ? 10 : 20,
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
                        <Button
                          component="label"
                          className={classes.uploadIcon}
                        >
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
                    onClick={() => editContractorDetailsApiCall()}
                  >
                    {buttonLoader ? (
                      <CircularProgress size={26} style={{ color: "#fff" }} />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {active === 3 ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              padding={isMobile ? "10px 0" : "10px 20px"}
            >
              <Typography variant="h5">Social Link</Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile ? 10 : 20,
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
                    onClick={() => validation4()}
                  >
                    {buttonLoader ? (
                      <CircularProgress size={26} style={{ color: "#fff" }} />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {active === 4 ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              padding={isMobile ? "10px 0" : "10px 20px"}
            >
              <Typography variant="h5">Portfolio</Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile ? 10 : 20,
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
                      cursor: "pointer",
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
                    overflowY: "scroll",
                    maxHeight: 500,
                    width: "100%",
                  }}
                >
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
                              {isString(item?.image)
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
                {/* <Grid item xs={6}>
                  <Button
                    style={{ width: "100%" }}
                    variant="outlined"
                  >
                    Delete portfolio
                  </Button>
                </Grid> */}
                <Grid item xs={12}>
                  <Button
                    style={{ minWidth: "135px", width: "100%" }}
                    variant="contained"
                    onClick={() => continueStep(5)}
                  >
                    {buttonLoader ? (
                      <CircularProgress size={26} style={{ color: "#fff" }} />
                    ) : (
                      "Save portfolio"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </>
      )}
    </Grid>
  );
}
