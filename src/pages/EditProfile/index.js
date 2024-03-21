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
import _, { isArray, isEmpty, isNumber, isObject, has } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
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
import ConfirmModel from "../../components/ConfirmModel";

const errorObj = {
  cnameErr: false,
  cnameMsg: "",
  addErr: false,
  addMsg: "",
  webErr: false,
  webMsg: "",
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
  const { token, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setUserData } = authActions;

  const fileInputRef = useRef();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [userLocation, setUserLocation] = useState("");
  const [active, setActive] = useState(0);
  const [bLogo, setBLogo] = useState(null);
  const [expertiseList, setExpertiesList] = useState([]);
  const [errObj, setErrObj] = useState(errorObj);
  const data = profileData?.contractor_data;
  const isEdit = !isEmpty(profileData);
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
    certificate: [],
    license: [],
    registraion: [],
    linkedin: "",
    social: "",
    insta: "",
    portfolio: [],
  });
  const [deleteImg, setDeleteImg] = useState({
    visible: false,
    id: null,
    index: null,
    type: "",
    loader: false,
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

  useEffect(() => {
    getprojectList();
    getUserDetailsByIdApiCall();
  }, []);

  useEffect(() => {
    if (isEdit) {
      let obj = {};
      obj.lat = data?.lat;
      obj.long = data?.long;
      obj.location = data?.company_address;
      setSelectedLocation(obj);
      setUserLocation(obj?.location);

      const newArray = data?.expertise?.map((item) => item?.project_name);

      setState({
        ...state,
        businessLogo: profileData?.profile_url,
        cname: data?.company_name || "",
        description: data?.description || "",
        address: obj.location || "",
        email: profileData?.email || "",
        website: data?.website || "",
        pCode: profileData?.phone_code || "",
        phone: profileData?.phone_no || "",
        businessYear: data?.no_of_years_in_business?.toString() || "",
        employees: data?.no_of_employees?.toString() || "",
        annualContract: data?.no_of_contracts_annually?.toString() || "",
        expertise: newArray || [],
        certificate: data?.iso_certificate || [],
        license: data?.licenses || [],
        registraion: data?.company_registration || [],
        linkedin: data?.linkedin_url || "",
        social: data?.fb_url || "",
        insta: data?.insta_url || "",
        portfolio: data?.portfolio || "",
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (state?.businessLogo && _.isObject(state?.businessLogo)) {
      const imgUrl = URL.createObjectURL(state?.businessLogo);
      setBLogo(imgUrl);
    } else {
      setBLogo(state?.businessLogo || "");
    }
  }, [state?.businessLogo]);

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

  async function getUserDetailsByIdApiCall() {
    setPageLoad(true);
    try {
      const response = await getApiData(Setting.endpoints.me, "GET", {});
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

    if (isEmpty(state.cname)) {
      valid = false;
      error.cnameErr = true;
      error.cnameMsg = "Please Enter Company's Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#cname");
      }
    } else if (state?.cname?.length > 200) {
      valid = false;
      error.cnameErr = true;
      error.cnameMsg =
        "Company Name should not be greater than 200 characters  ";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#cname");
      }
    }

    if (state.description.length > 1000) {
      valid = false;
      error.descriptionErr = true;
      error.descriptionMsg =
        "Description should not be greater than 1000 characters";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#description");
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

    // if (isEmpty(state?.website) && !urlRegex.test(state?.website)) {
    //   valid = false;
    //   error.webErr = true;
    //   error.webMsg = "Please Enter Valid Website Name";
    //   if (!scroll) {
    //     scroll = true;
    //     section = document.querySelector("#web");
    //   }
    // }

    if (isEmpty(state.businessYear)) {
      valid = false;
      error.yearErr = true;
      error.yearMsg = "Please Select No. of Business Years";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#year");
      }
    }
    if (isEmpty(state.employees)) {
      valid = false;
      error.employeeErr = true;
      error.employeeMsg = "Please Select No. of Employees";
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

  // const convertToCsv = (array) => {
  //   let tempIds = [];
  //   let tempStringIds = "";
  //   if (isArray(array) && !isEmpty(array)) {
  //     array?.map((it, ind) => {
  //       tempIds?.push(it?.id);
  //     });
  //   }
  //   console.log("tempIds=====>>>>>", tempIds);
  //   tempStringIds = tempIds?.toString();
  //   return tempStringIds;
  // };

  async function editContractorDetailsApiCall() {
    const selectedOptions = [];
    state?.expertise?.map((e) => {
      expertiseList?.map((options) => {
        if (options?.project_name === e) {
          return selectedOptions.push(options.id);
        }
      });
    });
    try {
      setButtonLoader(true);
      // let expertiseCsv = convertToCsv(state?.expertise);
      let data = {
        company_name: state?.cname ? state?.cname : "",
        description: state?.description ? state?.description : "",
        company_address: userLocation ? userLocation : "",
        website: state?.website ? state?.website : "",
        no_of_years_in_business: state?.businessYear ? state?.businessYear : "",
        no_of_employees: state?.employees ? state?.employees : "",
        no_of_contracts_annually: state?.annualContract
          ? state?.annualContract
          : "",
        contractor_expertise: selectedOptions
          ? selectedOptions?.toString()
          : "", // pass in CSV form
        linkedin_url: state?.linkedin ? state?.linkedin : "",
        fb_url: state?.social ? state?.social : "",
        insta_url: state?.insta ? state?.insta : "",
        lat: selectedLocation?.lat ? selectedLocation?.lat : "",
        long: selectedLocation?.long || "",
        city: selectedLocation?.city || "",
      };
      if (active === 1) {
        // this map for manage new certificate image upload
        const newCertificate = [];
        if (isArray(state?.certificate) && state?.certificate.length > 0) {
          state?.certificate.map((item) => {
            if (!has(item, "image")) {
              newCertificate.push(item);
            }
          });
        }
        if (isArray(state?.certificate) && state?.certificate.length > 0) {
          data.iso_certificate = newCertificate || [];
        }

        // this map for manage new license image upload
        const newLicense = [];
        if (isArray(state?.license) && state?.license.length > 0) {
          state?.license.map((item) => {
            if (!has(item, "image")) {
              newLicense.push(item);
            }
          });
        }
        if (isArray(state?.license) && state?.license.length > 0) {
          data.licenses = newLicense || [];
        }

        // this map for manage new registration image upload
        const newRegistraion = [];
        if (isArray(state?.registraion) && state?.registraion.length > 0) {
          state?.registraion.map((item) => {
            if (!has(item, "image")) {
              newRegistraion.push(item);
            }
          });
        }
        if (isArray(state?.registraion) && state?.registraion.length > 0) {
          data.company_registration = newRegistraion || [];
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
          getUserDetailsByIdApiCall();
          continueStep(2);
        } else if (active === 2) {
          continueStep(3);
        } else if (active === 3) {
          toast.success("Your social links successfully updated");
          continueStep(4);
        } else if (active === 4) {
          continueStep(5);
        }
        dispatch(setUserData(response?.data));
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
      /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
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
      error.socialMsg = "Please Enter Valid Facebook URL";
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

  //this function a for add portfolio images
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
        getUserDetailsByIdApiCall();
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

  //this function a for delete portfolio images
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

  // this function for delete images from server
  async function handleDeleteImage() {
    setDeleteImg({ ...deleteImg, loader: true });
    try {
      const response = await getApiData(
        `${Setting.endpoints.deleteImage}/${deleteImg.id}`,
        "GET"
      );

      if (response.success) {
        const data = [...state[deleteImg.type]];
        data.splice(deleteImg?.index, 1);
        if (deleteImg?.type === "certificate") {
          setState({ ...state, certificate: data });
        } else if (deleteImg?.type === "license") {
          setState({ ...state, license: data });
        } else if (deleteImg?.type === "registraion") {
          setState({ ...state, registraion: data });
        }
        setDeleteImg({
          visible: false,
          id: null,
          index: null,
          type: "",
          loader: false,
        });
        toast.success(response.message);
      } else {
        toast.error(response.message);
        setDeleteImg({ ...deleteImg, loader: false });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:795 ~ handleDeleteImage ~ error:",
        error
      );
      toast.error(error.toString());
      setDeleteImg({ ...deleteImg, loader: false });
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
        toast.error("Please upload at least one image");
      } else {
        addPortfolio();
      }
    }
  }

  // this function checks image size validation
  function checkImgSize(img) {
    let valid = true;
    if (img.size > 5 * 1048576) {
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }

  function checkUploadedFiles(img) {
    if (
      img.type === "image/png" ||
      img.type === "image/jpeg" ||
      img.type === "image/jpg" ||
      img.type === "application/pdf"
    )
      return true;
  }

  function isUploadedImageOnly(img) {
    if (
      img.type === "image/png" ||
      img.type === "image/jpeg" ||
      img.type === "image/jpg"
    )
      return true;
  }

  function checkPortfolioSize(img) {
    let valid = true;
    if (img.size > 15 * 1048576) {
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }
  // this function renders ISO certificate
  function renderISOCertificate() {
    if (isArray(state.certificate) && state.certificate.length > 0) {
      return state.certificate.map((item, index) => {
        return (
          <div style={{ position: "relative" }}>
            <TextField
              fullWidth
              placeholder="Upload ISO Certificate"
              style={{ marginBottom: 20 }}
              value={item?.image ? item?.image : item?.name}
              InputProps={{
                endAdornment: (
                  <>
                    {state.certificate ? (
                      <InputAdornment position="end">
                        <ClearOutlined
                          style={{ zIndex: 10, cursor: "pointer" }}
                          onClick={() => {
                            const data = [...state.certificate];
                            if (has(item, "image")) {
                              setDeleteImg({
                                visible: true,
                                id: item.id,
                                index: index,
                                type: "certificate",
                                loader: false,
                              });
                            } else {
                              data.splice(index, 1);
                              setState({ ...state, certificate: data });
                            }
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
          </div>
        );
      });
    }
    return null;
  }

  // this function renders licenses
  function renderLicenses() {
    if (isArray(state.license) && state.license.length > 0) {
      return state.license.map((item, index) => {
        return (
          <TextField
            fullWidth
            placeholder="Upload Licenses"
            value={item?.image ? item?.image : item?.name}
            style={{ marginBottom: 20 }}
            InputProps={{
              endAdornment: (
                <>
                  {state.license ? (
                    <InputAdornment position="end">
                      <ClearOutlined
                        style={{ zIndex: 10, cursor: "pointer" }}
                        onClick={() => {
                          const data = [...state.license];
                          if (has(item, "image")) {
                            setDeleteImg({
                              visible: true,
                              id: item.id,
                              index: index,
                              type: "license",
                              loader: false,
                            });
                          } else {
                            data.splice(index, 1);
                            setState({ ...state, license: data });
                          }
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
        );
      });
    }
    return null;
  }

  // this function renders company registration
  function renderRegistration() {
    if (isArray(state.registraion) && state.registraion.length > 0) {
      return state.registraion.map((item, index) => {
        return (
          <TextField
            fullWidth
            placeholder="Upload Company Registration"
            value={item?.image ? item?.image : item?.name}
            style={{ marginBottom: 20 }}
            InputProps={{
              endAdornment: (
                <>
                  {state.registraion ? (
                    <InputAdornment position="end">
                      <ClearOutlined
                        style={{ zIndex: 10, cursor: "pointer" }}
                        onClick={() => {
                          const data = [...state.registraion];
                          if (has(item, "image")) {
                            setDeleteImg({
                              visible: true,
                              id: item.id,
                              index: index,
                              type: "registraion",
                              loader: false,
                            });
                          } else {
                            data.splice(index, 1);
                            setState({ ...state, registraion: data });
                          }
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
            helperText={errObj.registrationErr ? errObj.registrationMsg : null}
          />
        );
      });
    }
    return null;
  }

  return (
    <Grid
      container
      padding={isMobile && !isTablet ? "10px" : "20px 0"}
      wrap={isMobile && !isTablet ? "wrap" : "nowrap"}
      gap={isMobile && !isTablet ? 2 : 4}
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
              borderRadius: "8px",
              padding: 10,
            }}
          >
            {btnArr?.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  style={{
                    backgroundColor: active === index ? "#fff" : "transparent",
                    padding: "12px 10px",
                    borderBottom: "1px solid #F2F3F4",
                    cursor: "pointer",
                  }}
                  onClick={() => setActive(index)}
                >
                  <Typography
                    fontWeight={active !== index && "400 !important"}
                    color={active !== index && "#646F86"}
                    className={classes.tag}
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
              padding={isMobile ? "10px 0" : "0px 20px"}
            >
              <Typography className={classes.title}>Information</Typography>
              <Typography className={classes.subtitle}>
                Business Profile & Organization Details
              </Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile && !isTablet ? 10 : 20,
                  marginTop: 20,
                  borderRadius: "8px",
                }}
              >
                <Grid item xs={12} id="cname">
                  <CInput
                    label="Company Name"
                    required
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
                    inputProps={{
                      maxLength: 200,
                    }}
                    error={errObj.cnameErr}
                    helpertext={errObj.cnameMsg}
                  />
                </Grid>

                <Grid item xs={12} id="description">
                  <CInput
                    multiline={true}
                    label="Description"
                    placeholder="Write Description"
                    value={state.description}
                    inputProps={{ maxLength: 1000 }}
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography style={{ fontSize: 14 }}>
                            +{state.pCode}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} id="year">
                  <Cselect
                    label="Number of Years in Business"
                    placeholder="Select No. of Years"
                    required
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
                    placeholder="Select No. of Employees"
                    required
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
                    required
                    value={state.annualContract}
                    onChange={(e) => {
                      const bool = /^[0-9]+$/.test(Number(e.target.value));
                      if (bool) {
                        setState({
                          ...state,
                          annualContract: e.target.value,
                        });
                      }
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
              <Grid item lg={12} paddingTop="20px">
                <Typography className={classes.title}>
                  Expertise Area *
                </Typography>
                <Typography className={classes.subtitle}>
                  Core Competencies and Specialization of Company
                </Typography>
                <Grid
                  item
                  container
                  style={{
                    border: "1px solid #F2F4F7",
                    padding: "0 20px",
                    marginTop: 20,
                    borderRadius: "8px",
                  }}
                >
                  <Cselect
                    multiple={true}
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
                    disabled={buttonLoader}
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
              padding={isMobile ? "10px 0" : "0px 20px"}
            >
              <Typography className={classes.title}>Documents</Typography>
              <Typography className={classes.subtitle}>
                Attach Relevant Documents
              </Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile && !isTablet ? 10 : 20,
                  marginTop: 20,
                  borderRadius: "8px",
                }}
              >
                <Grid item xs={12} id="certi">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    ISO Certificate
                  </InputLabel>
                  {renderISOCertificate()}
                  {isArray(state.certificate) &&
                  state.certificate.length > 4 ? null : (
                    <div style={{ position: "relative" }}>
                      <TextField
                        fullWidth
                        placeholder="Upload ISO Certificate"
                        style={{ marginBottom: 20 }}
                        value={""}
                        InputProps={{
                          endAdornment: (
                            <>
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
                        accept="image/jpeg, image/png, image/jpg, application/pdf"
                        multiple
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          opacity: 0,
                        }}
                        onChange={(e) => {
                          const chosenFiles = Array.prototype.slice.call(
                            e.target.files
                          );
                          const data = [...state.certificate];
                          let showMsg = false;
                          let limit = false;
                          let showTypeError = false;
                          const rejected = chosenFiles.every(
                            (item) =>
                              item.type === "image/png" ||
                              item.type === "image/jpg" ||
                              item.type === "image/jpeg"
                          );
                          if (!rejected) {
                            toast.error("You can only add jpeg,jpg or png");
                          }
                          const filteredFiles = chosenFiles.filter(
                            (item) =>
                              item.type === "image/png" ||
                              item.type === "image/jpg" ||
                              item.type === "image/jpeg"
                          );
                          filteredFiles.map((item) => {
                            const checkFiles = checkUploadedFiles(item);
                            const bool = checkImgSize(item);
                            if (bool && data.length < 5 && checkFiles) {
                              data.push(item);
                            } else if (data.length >= 4) {
                              limit = true;
                            } else if (!bool) {
                              showMsg = true;
                            } else {
                              showTypeError = true;
                            }
                          });
                          if (limit) {
                            toast.error("You can upload maximum 5 files");
                          } else if (showMsg) {
                            toast.error(
                              "Some certificate you are attempting to upload exceeds the maximum file size limit of 5 MB. Please reduce the size of your image and try again."
                            );
                          } else if (showTypeError) {
                            toast.error("Please Upload valid files ");
                          }
                          setState({ ...state, certificate: data });
                        }}
                      />
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} d="license">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Licenses
                  </InputLabel>
                  {renderLicenses()}
                  {isArray(state.license) && state.license.length > 4 ? null : (
                    <div style={{ position: "relative" }}>
                      <TextField
                        fullWidth
                        placeholder="Upload Licenses"
                        value={""}
                        style={{ marginBottom: 20 }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <InputAdornment position="end">
                                <AttachFileOutlined />
                              </InputAdornment>
                            </>
                          ),
                        }}
                        error={errObj.licenseErr}
                        helperText={
                          errObj.licenseErr ? errObj.licenseMsg : null
                        }
                      />
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg, application/pdf"
                        multiple
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          opacity: 0,
                        }}
                        onChange={(e) => {
                          const chosenFiles = Array.prototype.slice.call(
                            e.target.files
                          );
                          const data = [...state.license];
                          let showMsg = false;
                          let limit = false;
                          let showTypeError = false;
                          chosenFiles.map((item) => {
                            const checkFiles = checkUploadedFiles(item);
                            const bool = checkImgSize(item);
                            if (bool && data.length < 5 && checkFiles) {
                              data.push(item);
                            } else if (data.length >= 4) {
                              limit = true;
                            } else if (!bool) {
                              showMsg = true;
                            } else {
                              showTypeError = true;
                            }
                          });
                          if (limit) {
                            toast.error("You can upload maximum 5 files");
                          } else if (showMsg) {
                            toast.error(
                              "Some license you are attempting to upload exceeds the maximum file size limit of 5 MB. Please reduce the size of your image and try again."
                            );
                          } else if (showTypeError) {
                            toast.error("Please Upload valid files ");
                          }
                          setState({ ...state, license: data });
                        }}
                      />
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} id="registartion">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Company Registration
                  </InputLabel>
                  {renderRegistration()}
                  {isArray(state.registraion) &&
                  state.registraion.length > 4 ? null : (
                    <div style={{ position: "relative" }}>
                      <TextField
                        fullWidth
                        placeholder="Upload Company Registration"
                        value={""}
                        style={{ marginBottom: 20 }}
                        InputProps={{
                          endAdornment: (
                            <>
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
                        accept="image/jpeg, image/png, image/jpg, application/pdf"
                        multiple
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          opacity: 0,
                        }}
                        onChange={(e) => {
                          const chosenFiles = Array.prototype.slice.call(
                            e.target.files
                          );
                          const data = [...state.registraion];
                          let showMsg = false;
                          let limit = false;
                          let showTypeError = false;
                          chosenFiles.map((item) => {
                            const checkFiles = checkUploadedFiles(item);
                            const bool = checkImgSize(item);
                            if (bool && data.length < 5 && checkFiles) {
                              data.push(item);
                            } else if (data.length >= 4) {
                              limit = true;
                            } else if (!bool) {
                              showMsg = true;
                            } else {
                              showTypeError = true;
                            }
                          });
                          if (limit) {
                            toast.error("You can upload maximum 5 files");
                          } else if (showMsg) {
                            toast.error(
                              "Some registraion you are attempting to upload exceeds the maximum file size limit of 5 MB. Please reduce the size of your image and try again."
                            );
                          } else if (showTypeError) {
                            toast.error("Please Upload valid files ");
                          }
                          setState({ ...state, registraion: data });
                        }}
                      />
                    </div>
                  )}
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
                    disabled={buttonLoader}
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
              padding={isMobile ? "10px 0" : "0px 20px"}
            >
              <Typography className={classes.title}>Profile Image</Typography>
              <Typography className={classes.subtitle}>
                Attach Your Profile Thumbnail
              </Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile ? 10 : 20,
                  marginTop: 20,
                  borderRadius: "8px",
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
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          cursor: "pointer",
                          opacity: 0,
                        }}
                        onChange={(e) => {
                          const imageUploaded = e.target.files[0];
                          let showSizeError = false;
                          let showTypeError = false;
                          const checkImageType =
                            isUploadedImageOnly(imageUploaded);
                          const checkImageSize = checkImgSize(imageUploaded);
                          if (checkImageType && checkImageSize) {
                            setState({
                              ...state,
                              businessLogo: e.target.files[0],
                            });
                          } else if (!checkImageSize) {
                            showSizeError = true;
                          } else {
                            showTypeError = true;
                          }
                          if (showSizeError) {
                            toast.error(
                              "Image you are attempting to upload exceeds the maximum file size limit of 15 MB. Please reduce the size of your image and try again."
                            );
                          } else if (showTypeError) {
                            toast.error("Please Upload Image only");
                          }
                        }}
                        ref={fileInputRef}
                      />
                      {bLogo ? (
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
                      ) : (
                        <div className={classes.uploadImgDivStyle}>
                          <Image style={{ color: "#FFF", fontSize: 30 }} />
                        </div>
                      )}
                      <div className={classes.buttonAbsoluteDiv}>
                        <Button
                          component="label"
                          className={classes.uploadIcon}
                          onClick={() => fileInputRef.current.click()}
                        >
                          <CreateOutlined
                            style={{ fontSize: "16px", color: "#FFF" }}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Typography
                    style={{
                      fontFamily: "Poppins-Regular",
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
                    disabled={buttonLoader}
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
              padding={isMobile ? "10px 0" : "0px 20px"}
            >
              <Typography className={classes.title}>Social Link</Typography>
              <Typography className={classes.subtitle}>
                Share Your Social Links Here
              </Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile && !isTablet ? 10 : 20,
                  marginTop: 20,
                  borderRadius: "8px",
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
                    Facebook
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
                    disabled={buttonLoader}
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
              padding={isMobile ? "10px 0" : "0px 20px"}
            >
              <Typography className={classes.title}>Portfolio</Typography>
              <Typography className={classes.subtitle}>
                Upload Your Project Samples
              </Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile && !isTablet ? 10 : 20,
                  marginTop: 20,
                  borderRadius: "8px",
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
                      borderRadius: 8,
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
                    multiple
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
                      const nArr = [...state.portfolio];
                      let showMsg = false;
                      let imageType = false;
                      chosenFiles.map((item) => {
                        const checkImageType = isUploadedImageOnly(item);
                        const bool = checkPortfolioSize(item);
                        if (bool && checkImageType) {
                          nArr.push(item);
                        } else if (!bool) {
                          showMsg = true;
                        } else {
                          imageType = true;
                        }
                      });
                      if (showMsg) {
                        toast.error(
                          "Some image you are attempting to upload exceeds the maximum file size limit of 15 MB. Please reduce the size of your image and try again."
                        );
                      } else if (imageType) {
                        toast.error("Uploaded files should be image only ");
                      }
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
                    state?.portfolio?.length > 0 &&
                    state?.portfolio?.map((item, index) => {
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
                                fontFamily: "Poppins-Regular",
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
                                fontFamily: "Poppins-Regular",
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
                    disabled={buttonLoader}
                    style={{ minWidth: "135px", width: "100%" }}
                    variant="contained"
                    onClick={() => continueStep(5)}
                  >
                    {buttonLoader ? (
                      <CircularProgress size={26} style={{ color: "#fff" }} />
                    ) : isEmpty(data?.portfolio) ? (
                      "Save portfolio"
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </>
      )}
      <ConfirmModel
        visible={deleteImg?.visible}
        handleClose={() =>
          setDeleteImg({
            visible: false,
            id: null,
            index: null,
            type: "",
            loader: false,
          })
        }
        loader={deleteImg?.loader}
        confirmation={() => {
          handleDeleteImage();
        }}
        message={`Are you sure you want to delete?`}
      />
    </Grid>
  );
}
