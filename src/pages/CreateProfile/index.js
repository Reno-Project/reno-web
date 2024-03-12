import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  CreateOutlined,
  AttachFileOutlined,
  ImageOutlined,
  ClearOutlined,
  HighlightOffOutlined,
  Image,
  Instagram,
} from "@mui/icons-material";
import _, { isArray, isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
import ConfirmModel from "../../components/ConfirmModel";
import Images from "../../config/images";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { v4 as uuid } from "uuid";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import "./index.css";

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
  const { setUserData, clearAllData, setCometChatUserData } = authActions;

  const [activeStep, setActiveStep] = useState(0);
  const [expertiseList, setExpertiesList] = useState([]);
  const [errObj, setErrObj] = useState(errorObj);
  const [state, setState] = useState({
    businessLogo: Images.upload,
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
    certificate: [],
    license: [],
    registraion: [],
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
  const [bLogo, setBLogo] = useState();
  const [deleteImg, setDeleteImg] = useState({
    visible: false,
    id: null,
    index: null,
    type: "",
    loader: false,
  });
  const bank = ["HDFC", "SBI", "PNB", "ICICI", "Axis"];
  const employeeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const contractArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    if (!isEmpty(userData) && !isEmpty(userData?.contractor_data)) {
      const { profile_completed } = userData?.contractor_data;

      // if (profile_completed === "completed") {
      //   navigate("/dashboard");
      // }
    }
  }, [userData]);

  useEffect(() => {
    return () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []);

  useEffect(() => {
    getprojectList();
    if (!isEmpty(userData) && userData?.id) {
      getUserDetailsByIdApiCall();
    }
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
      const response = await getApiData(Setting.endpoints.me, "GET", {});
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
        certificate: uData?.iso_certificate ? uData?.iso_certificate : [],
        license: uData?.licenses ? uData?.licenses : [],
        registraion: uData?.company_registration
          ? uData?.company_registration
          : [],
        linkedin: uData?.linkedin_url ? uData?.linkedin_url : "",
        social: uData?.fb_url ? uData?.fb_url : "",
        insta: uData?.insta_url ? uData?.insta_url : "",
        portfolio: uData?.portfolio || [],
      });
    }
  };
  const createUserInCometChat = (newUserUid, uname, logo) => {
    const newUser = new CometChat.User(newUserUid);
    newUser.setName(uname);
    newUser.setStatus("online");
    // if (logo) {
    //   const imgUrl = URL.createObjectURL(logo);
    //   console.log(">>>> imgUrl ", imgUrl);
    //     newUser.setAvatar(imgUrl);
    // }

    CometChat.createUser(newUser, process.env.REACT_APP_AUTHKEY)
      .then((res) => {
        console.log(">>>>> res user", res);
        setCometChatUserData(res);

        CometChatUIKit.login(newUserUid)?.then((loggedInUser) => {
          console.log("Login successful, loggedInUser:", loggedInUser);
        });
      })
      .catch((error) => {
        console.log(">>> error ", error);
      });
  };

  // validation function for page 1
  function CheckValidattion() {
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;
    const urlRegex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    const linkedinRegex =
      /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
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
        "Company Name should not be greater than 30 characters  ";
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
        toast.error("Please upload at least one image");
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
    const accNumberRegex = /^[0-9]{8,30}$/;

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
      error.bankMsg = "Please enter bank";
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
    } else if (acc.length > 30 || acc.length < 8) {
      valid = false;
      error.accErr = true;
      error.accMsg =
        "Bank account number should not be greater than 30 and less than 8 characters";
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
        city: selectedLocation?.city ? selectedLocation?.city : "",
      };

      // this map for manage new certificate image upload
      const newCertificate = [];
      if (isArray(state?.certificate) && state?.certificate.length > 0) {
        state?.certificate.map((item) => {
          if (!_.has(item, "image")) {
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
          if (!_.has(item, "image")) {
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
          if (!_.has(item, "image")) {
            newRegistraion.push(item);
          }
        });
      }
      if (isArray(state?.registraion) && state?.registraion.length > 0) {
        data.company_registration = newRegistraion || [];
      }

      if (typeof state?.businessLogo !== "string") {
        data.business_logo = state?.businessLogo ? state?.businessLogo : "";
      }
      data.cometChatUid = uuid();

      const response = await getAPIProgressData(
        Setting.endpoints.addContractorDetails,
        "POST",
        data,
        true
      );

      if (response.success) {
        // createUserInCometChat(
        //   response.data.contractor_data.cometChatUid,
        //   response.data.username,
        //   state?.businessLogo ? state?.businessLogo : ""
        // );
        continueStep(1);
        dispatch(setUserData(response?.data));
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
        address: state.address,
      };

      const response = await getApiData(
        Setting.endpoints.addBillingInfo,
        "POST",
        data
      );

      if (response.success) {
        toast.success(response.message);
        setVisible(true);
        // getUserDetailsByIdApiCall();
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

  // this function checks image size validation
  function checkImgSize(img) {
    let valid = true;
    if (img.size > 3145728) {
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
                            if (_.has(item, "image")) {
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
                          if (_.has(item, "image")) {
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
                          if (_.has(item, "image")) {
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
    <>
      <div style={{ backgroundColor: "#F9F9FA" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Grid className={classes.headerContainer}>
            <Typography className={classes.welcomeTextStyle}>
              Welcome to Reno
            </Typography>
          </Grid>

          <Grid
            item
            xs={8}
            sm={9}
            md={7}
            lg={7}
            className={classes.formContainerStyle}
          >
            <Grid container justifyContent={"center"} gap="32px">
              <Stack gap="40px" width="100%">
                <Grid item xs={12}>
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
              </Stack>
              <Grid
                item
                xs={10}
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
                            {/* <CreateOutlined
                            style={{
                              fontSize: "16px",
                              color: "#FFF",
                              position: "absolute",
                              top: 7,
                              left: 8,
                            }}
                          /> */}
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
                  style={{ fontFamily: "Poppins-Regular", color: "#475569" }}
                >
                  {activeStep === 0 && "Upload business logo"}
                </Typography>
              </Grid>
              {activeStep === 0 ? (
                <>
                  <Grid item xs={10} id="cname">
                    <CInput
                      // label="Company Name"
                      label={<span className="labelField">Company Name</span>}
                      required
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
                      // label="Description"
                      label={<span className="labelField">Description</span>}
                      // required
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
                  <Grid container justifyContent="center">
                    <Grid
                      item
                      container
                      xs={10}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="web">
                        <CInput
                          // label="Website"
                          label={<span className="labelField">Website</span>}
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
                          // label="Number of Years in Business"
                          label={
                            <span className="labelField">
                              Number of Years in Business
                            </span>
                          }
                          required
                          placeholder="Select No. of Years"
                          value={state.businessYear}
                          handleSelect={(e) => {
                            console.log("e ===businessyear==>>> ", e);
                            setState({
                              ...state,
                              businessYear: _.isNumber(e) ? e.toString() : e,
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
                    </Grid>

                    <Grid item container xs={10} justifyContent="space-between">
                      {/* <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="phone">
                    <InputLabel shrink htmlFor="bootstrap-input">
                      <span className="labelField">Phone</span>
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
                      <Grid
                        item
                        xs={12}
                        sm={5.5}
                        md={5.5}
                        lg={5.5}
                        id="employee"
                      >
                        <Cselect
                          // label="Number of Employees"
                          label={
                            <span className="labelField">
                              Number of Employees
                            </span>
                          }
                          required
                          placeholder="Select No. of Employees"
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
                      <Grid
                        item
                        xs={12}
                        sm={5.5}
                        md={5.5}
                        lg={5.5}
                        id="contract"
                      >
                        <CInput
                          // label="Number of Contracts Annually"
                          label={
                            <span className="labelField">
                              Number of Contracts Annually
                            </span>
                          }
                          required
                          placeholder="Enter No. of Contracts"
                          value={state.annualContract}
                          onChange={(e) => {
                            const bool = /^[0-9]+$/.test(
                              Number(e.target.value)
                            );
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

                    <Grid item xs={10} id="expertise">
                      <Cselect
                        multiple={true}
                        // label="Expertise Area"
                        label={
                          <span className="labelField">Expertise Area</span>
                        }
                        required
                        placeholder={
                          isArray(state?.expertise) &&
                          state?.expertise.length > 0
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
                        <span className="labelField">Location</span>
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
                        <span className="labelField">ISO Certificate</span>
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
                            accept="image/jpeg, image/png, image/jpg"
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
                              chosenFiles.map((item) => {
                                const bool = checkImgSize(item);
                                if (bool && data.length < 5) {
                                  data.push(item);
                                } else if (data.length >= 4) {
                                  limit = true;
                                } else {
                                  showMsg = true;
                                }
                              });
                              if (limit) {
                                toast.error("You can upload maximum 5 files");
                              } else if (showMsg) {
                                toast.error(
                                  "Some certificate you are attempting to upload exceeds the maximum file size limit of 3 MB. Please reduce the size of your image and try again."
                                );
                              }
                              setState({ ...state, certificate: data });
                            }}
                          />
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={10} id="license">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        <span className="labelField">Licenses</span>
                      </InputLabel>
                      {renderLicenses()}
                      {isArray(state.license) &&
                      state.license.length > 4 ? null : (
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
                            accept="image/jpeg, image/png, image/jpg"
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
                              chosenFiles.map((item) => {
                                const bool = checkImgSize(item);
                                if (bool && data.length < 5) {
                                  data.push(item);
                                } else if (data.length >= 4) {
                                  limit = true;
                                } else {
                                  showMsg = true;
                                }
                              });
                              if (limit) {
                                toast.error("You can upload maximum 5 files");
                              } else if (showMsg) {
                                toast.error(
                                  "Some license you are attempting to upload exceeds the maximum file size limit of 3 MB. Please reduce the size of your image and try again."
                                );
                              }
                              setState({ ...state, license: data });
                            }}
                          />
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={10} id="registartion">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        <span className="labelField">Company Registration</span>
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
                              errObj.registrationErr
                                ? errObj.registrationMsg
                                : null
                            }
                          />
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
                            }}
                            onChange={(e) => {
                              const chosenFiles = Array.prototype.slice.call(
                                e.target.files
                              );
                              const data = [...state.registraion];

                              let showMsg = false;
                              let limit = false;
                              chosenFiles.map((item) => {
                                const bool = checkImgSize(item);
                                if (bool && data.length < 5) {
                                  data.push(item);
                                } else if (data.length >= 4) {
                                  limit = true;
                                } else {
                                  showMsg = true;
                                }
                              });
                              if (limit) {
                                toast.error("You can upload maximum 5 files");
                              } else if (showMsg) {
                                toast.error(
                                  "Some registraion you are attempting to upload exceeds the maximum file size limit of 3 MB. Please reduce the size of your image and try again."
                                );
                              }
                              setState({ ...state, registraion: data });
                            }}
                          />
                        </div>
                      )}
                    </Grid>

                    <Grid item xs={10} id="linkedIn">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        <span className="labelField">
                          Team LinkedIn Profile
                        </span>
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
                                  src={Images.Linkedin2}
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
                        <span className="labelField"> Social Media</span>
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
                                  src={Images.fb}
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

                    <Grid item xs={10} id="instagram">
                      <InputLabel shrink htmlFor="bootstrap-input">
                        <span className="labelField"> Instagram</span>
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
                          <CircularProgress
                            style={{ color: "#fff" }}
                            size={26}
                          />
                        ) : (
                          "Continue"
                        )}
                      </Button>
                    </Grid>

                    <Grid
                      item
                      xs={10}
                      justifyContent={"center"}
                      gap="2px"
                      container
                    >
                      <Typography
                        style={{ textAlign: "center", color: "#646F86" }}
                        className="already"
                      >
                        Already have an account?
                      </Typography>
                      <span
                        onClick={() => {
                          dispatch(clearAllData());
                        }}
                        className="loginText"
                      >
                        Login
                      </span>
                    </Grid>

                    {/* <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    style={{
                      fontFamily: "Poppins-Regular",
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
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Login Now
                    </b>
                  </NavLink>
                </Grid> */}
                  </Grid>
                </>
              ) : activeStep === 1 ? (
                <>
                  <Grid container xs={10} rowGap="32px">
                    <Grid item xs={12} style={{ position: "relative" }}>
                      <InputLabel htmlFor="bootstrap-input">
                        <span className="labelField"> Upload Photo</span>
                      </InputLabel>
                      <div
                        style={{
                          backgroundColor: "#F9FAFC",
                          display: "flex",
                          gap: "8px",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: 140,
                          borderRadius: "8px",
                          border: "1px dashed #EAECF0",
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img src={Images.upload_icon} alt="upload-icon"></img>
                        </div>
                        <Stack>
                          <InputLabel style={{ fontFamily: "Poppins-Medium" }}>
                            <b>Upload Your Portfolio Photos</b>
                          </InputLabel>
                          <InputLabel
                            style={{
                              fontSize: 12,
                              color: "#646F86",
                              textAlign: "center",
                            }}
                          >
                            {"PNG, JPG, (max size 1200*800)"}
                          </InputLabel>
                        </Stack>
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
                          const nArr = [...state.portfolio];
                          let showMsg = false;
                          let limit = false;
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
                            const bool = checkImgSize(item);
                            if (bool && nArr.length < 5) {
                              nArr.push(item);
                            } else if (nArr.length >= 4) {
                              limit = true;
                            } else {
                              showMsg = true;
                            }
                          });
                          if (limit) {
                            toast.error("You can upload maximum 5 files");
                          } else if (showMsg) {
                            toast.error(
                              "Some registraion you are attempting to upload exceeds the maximum file size limit of 3 MB. Please reduce the size of your image and try again."
                            );
                          }
                          setState({ ...state, portfolio: nArr });
                        }}
                      />
                    </Grid>

                    <Grid item style={{ width: "100%" }}>
                      {state.portfolio.length > 0 && (
                        <Typography
                          style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: "14px",
                          }}
                        >
                          Uploaded files
                        </Typography>
                      )}
                      {isArray(state.portfolio) &&
                        state.portfolio.length > 0 &&
                        state.portfolio.map((item, index) => {
                          let itemSize = item?.size / 1024;

                          let imgUrl = "";
                          if (typeof item?.image === "string") {
                            imgUrl = item?.image;
                          } else {
                            imgUrl = URL.createObjectURL(item);
                          }
                          return (
                            <Stack gap="6px">
                              <div
                                style={{
                                  display: "flex",
                                  border: "1px solid #F2F3F4",
                                  borderRadius: 6,

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
                                <div
                                  style={{
                                    margin: "auto 0",
                                    overflow: "hidden",
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontFamily: "Poppins-Regular",
                                      fontWeight: "500",
                                      color: "#202939",
                                      fontSize: 18,
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {item?.name ||
                                      `Portfolio Image ${index + 1}` ||
                                      ""}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontFamily: "Poppins-Regular",
                                      color: "#787B8C",
                                    }}
                                  >
                                    {itemSize < 1000
                                      ? `${itemSize.toFixed(2)}kb`
                                      : `${(itemSize / 1024).toFixed(2)}mb`}
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
                                      color: "#FC5555",
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
                            </Stack>
                          );
                        })}
                    </Grid>
                    <Grid
                      flex
                      xs={12}
                      item
                      container
                      gap="20px"
                      style={{
                        marginTop: "30px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid item width="25%">
                        <Button
                          style={{
                            width: "100%",
                            height: "48px",
                            cursor: "pointer",
                            padding: "24px 24px",
                            backgroundColor: "#F5F6F8",
                            color: "#202939",
                            boxShadow: "none",
                          }}
                          onClick={() => previousStep()}
                        >
                          Back
                        </Button>
                      </Grid>
                      <Grid item display="flex" flex={1}>
                        <Button
                          style={{
                            width: "100%",
                            height: "48px",
                            padding: "24px 14px",
                            boxShadow: "none",
                          }}
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
                      label={
                        <span className="labelField">Beneficiary Name:</span>
                      }
                      // label="Beneficiary Name"
                      placeholder="Enter Beneficiary Name"
                      value={state.bname}
                      required
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
                      label={<span className="labelField">IBAN:</span>}
                      // label="IBAN"
                      placeholder="Enter IBAN"
                      required
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
                    <CInput
                      label={<span className="labelField">Bank Name:</span>}
                      // label="Bank Name"
                      placeholder="Enter Bank"
                      required
                      value={state.bank}
                      onChange={(e) => {
                        setState({ ...state, bank: e.target.value });
                        setErrObj({
                          ...errObj,
                          bankErr: false,
                          bankMsg: "",
                        });
                      }}
                      error={errObj.bankErr}
                      helpertext={errObj.bankMsg}
                    />
                    {/* <Cselect
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
                  /> */}
                  </Grid>

                  <Grid item container xs={10} justifyContent="space-between">
                    <Grid item xs={12} sm={5.5} md={5.5} lg={5.5} id="baccount">
                      <CInput
                        label={
                          <span className="labelField">Bank Account:</span>
                        }
                        // label="Bank Account"
                        inputProps={{ maxLength: 30 }}
                        placeholder="Enter Bank Account Number"
                        required
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
                        label={<span className="labelField">SWIFT code:</span>}
                        //  label="SWIFT code"
                        placeholder="Enter SWIFT Code"
                        required
                        value={state.swift}
                        onChange={(e) => {
                          setState({ ...state, swift: e.target.value });
                          setErrObj({
                            ...errObj,
                            swiftErr: false,
                            swiftMsg: "",
                          });
                        }}
                        error={errObj.swiftErr}
                        helpertext={errObj.swiftMsg}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={10} id="Address">
                    <CInput
                      label={<span className="labelField">Address:</span>}
                      multiline
                      // label="Address"
                      placeholder="Enter Address"
                      required
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
                    flex
                    xs={10}
                    item
                    container
                    gap="20px"
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item width="25%">
                      <Button
                        style={{
                          width: "100%",
                          height: "48px",
                          cursor: "pointer",
                          // marginTop: 5,
                          padding: "24px 24px",
                          backgroundColor: "#F5F6F8",
                          color: "#202939",
                          boxShadow: "none",
                        }}
                        onClick={() => previousStep()}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item display="flex" flex={1}>
                      <Button
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "24px 14px",
                          boxShadow: "none",
                        }}
                        variant="contained"
                        onClick={() => continueStep(3)}
                      >
                        {buttonLoader == "step3" ? (
                          <CircularProgress
                            style={{ color: "#fff" }}
                            size={26}
                          />
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
        {visible && (
          <ProfileSuccessModal
            title="Congrats"
            msg="Your profile has been created successfully"
            btnTitle="Start Exploring"
            visible={visible}
          />
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
      </div>
      <Typography
        style={{
          color: "#646F86",
          fontFamily: "Poppins-Regular",
          fontSize: "12px",
          textAlign: "center",
          transform: "translateY(-90px)",
        }}
      >
        Copyright © 2023. All Rights Reserved by Reno.
      </Typography>
    </>
  );
};

export default CreateProfile;
