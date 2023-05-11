import React, { useEffect, useState } from "react";
import { Button, Grid, Rating, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isArray, isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import { Setting } from "../../utils/Setting";
import { getApiData } from "../../utils/APIHelper";
import { updateUserData } from "../../utils/CommonFunction";
import ProfileSuccessModal from "../../components/ProfileSuccessModal";
import {
  askForPermissionToReceiveNotifications,
  onMessageListener,
} from "../../push-notification";
import useStyles from "./styles";
import { color } from "../../config/theme";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Images from "../../config/images";
import { useTheme } from "@emotion/react";

const errorObj = {
  emailErr: false,
  passwordErr: false,
  emailMsg: "",
  passwordMsg: "",
};

const villaDetails = [
  {
    name: "Villa MM-renovation",
    code: "#CH019221002900",
    created: "21.01.2023",
    bedrooms: 3,
    bathrooms: 4,
    size: "300 sqm",
    company: "Luxury Home Solutions",
    budget: "$1,000.00",
    moveInDate: "01.05.2023",
    image: Images.building,
    logo: Images.profile_logo,
    is_email_verified: true,
  },
  {
    name: "Beachfront Villa",
    code: "#CH019221003000",
    created: "15.02.2023",
    bedrooms: 4,
    bathrooms: 5,
    size: "450 sqm",
    company: "Coastal Luxury Properties",
    budget: "$2,500.00",
    moveInDate: "01.06.2023",
    image: Images.building,
    logo: Images.profile_logo,
    is_email_verified: false,
  },
  {
    name: "Modern Mountain Retreat",
    code: "#CH019221003100",
    created: "10.03.2023",
    bedrooms: 2,
    bathrooms: 3,
    size: "250 sqm",
    company: "Alpine Homes & Resorts",
    budget: "$1,800.00",
    moveInDate: "01.07.2023",
    image: Images.building,
    logo: Images.profile_logo,
    is_email_verified: false,
  },
];

const villaDetails1 = [
  {
    id: 5,
    proposal_id: 45,
    name: "Villa MM-renovation",
    code: "#CH019221002900",
    created: "21.01.2023",
    bedrooms: 3,
    bathrooms: 4,
    size: "300 sqm",
    company: "Luxury Home Solutions",
    image: Images.building,
    logo: Images.profile_logo,
    is_email_verified: true,
  },
];

const Dashboard = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const dispatch = useDispatch();
  const { setUserData, setToken } = authActions;
  const { userData } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errObj, setErrObj] = useState(errorObj);
  const [btnLoad, setBtnLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleBtnLoad, setGoogleBtnLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    handleUserData();
    askForPermissionToReceiveNotifications();
    onMessageListener();

    return () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []);

  // this function for check is user profile approved or not
  async function handleUserData() {
    const response = await updateUserData();
    if (response && !isEmpty(response?.contractor_data)) {
      const { profile_completed, is_profile_verified } =
        response?.contractor_data;
      if (profile_completed === "completed" && !is_profile_verified) {
        setVisible(true);
      }
    }
  }

  // this function checks validation of login field
  function validation() {
    const error = { ...errObj };
    let valid = true;

    // validate email
    if (isEmpty(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please enter email";
    } else if (!emailRegex.test(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please enter valid email";
    }

    // validate password
    if (isEmpty(password)) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "Please enter password";
    } else if (password.length < 8) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "Password length must be of 8-15";
    }

    setErrObj(error);
    if (valid) {
      loginUser();
    }
  }

  // this function for login user
  async function loginUser() {
    setBtnLoad(true);
    try {
      const response = await getApiData(Setting.endpoints.login, "POST", {
        email,
        password,
        device_type: "web",
      });

      if (response.success) {
        dispatch(setUserData(response?.data));
        dispatch(setToken(response?.token));
      } else {
        toast.error(response.message);
      }
      setBtnLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ loginUser ~ error:", error);
      setBtnLoad(false);
      toast.error(error.toString());
    }
  }

  // this function for login user
  async function googleDataApiCall(googleCode) {
    try {
      setGoogleBtnLoad(true);
      const response = await getApiData(Setting.endpoints.googleData, "POST", {
        code: googleCode,
      });

      if (response.success) {
        if (!isEmpty(response?.data)) {
          socialLoginApiCall(response?.data, "google");
        }
      } else {
        toast.error(response.message);
        setGoogleBtnLoad(false);
      }
    } catch (error) {
      console.log("🚀 ~ google data api call ~ error:", error);
      toast.error(error.toString());
      setGoogleBtnLoad(false);
    }
  }

  // social login
  async function socialLoginApiCall(socialData, type) {
    try {
      const response = await getApiData(Setting.endpoints.login, "POST", {
        email: socialData?.email ? socialData?.email : "",
        password: socialData?.password ? socialData?.password : "",
        device_type: "web",
        social_connection: type ? type : "",
      });

      console.log("socialLoginApiCallresponse =====>>> ", response);
      if (response.success) {
        if (response?.is_new_user) {
          navigate("/signup", { state: { socialData, type } });
        } else {
          dispatch(setUserData(response?.data));
          dispatch(setToken(response?.token));
        }
      } else {
        toast.error(response.message);
      }
      setGoogleBtnLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ loginUser ~ error:", error);
      setGoogleBtnLoad(false);
      toast.error(error.toString());
    }
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      style={{ padding: sm ? 20 : 40 }}
      bgcolor={color.LightSurface}
      maxWidth={"unset"}
      mb={"70px"}
    >
      <Grid container>
        <Grid item container>
          <Typography className={classes.titleStyle}>Overview</Typography>
        </Grid>
        <Grid item container gap={2}>
          <Grid item className={classes.card} flexDirection={"column"} lg={2.3}>
            <Typography className={classes.cardTxt}>
              Hi {userData?.contractor_data?.company_name}
            </Typography>
            <Typography className={classes.cardSubTxt}>
              Submit proposals to <br /> your customers
            </Typography>
            <Button
              variant="contained"
              // onClick={() =>
              //   navigate("/create-proposal", {
              //     state: {
              //       create_proposal: true,
              //     },
              //   })
              // }
            >
              Create Proposal
            </Button>
          </Grid>
          <Grid
            item
            className={classes.card}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            lg={2}
          >
            <img
              alt="Annual contracts value"
              src={Images.dollar}
              style={{
                height: 24,
                width: 24,
                padding: 8,
                backgroundColor: "rgba(39, 75, 241, 0.12)",
                borderRadius: 30,
              }}
            />
            <Typography className={classes.annualC}>
              Annual contracts value
            </Typography>
            <Typography className={classes.cardTxt}>$20,000</Typography>
          </Grid>
          <Grid
            item
            className={classes.card}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            lg={2}
          >
            <img
              alt="Annual contracts value"
              src={Images.verify_green}
              style={{
                height: 24,
                width: 24,
                padding: 8,
                backgroundColor: "rgba(92, 196, 133, 0.12)",
                borderRadius: 30,
              }}
            />
            <Typography className={classes.annualC}>
              Active Contracts
            </Typography>
            <Typography className={classes.cardTxt}>$12</Typography>
          </Grid>
          <Grid
            item
            className={classes.card}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            lg={2}
          >
            <img
              alt="Annual contracts value"
              src={Images.eye}
              style={{
                height: 24,
                width: 24,
                padding: 8,
                backgroundColor: "rgba(242, 107, 89, 0.12)",
                borderRadius: 30,
              }}
            />
            <Typography className={classes.annualC}>
              Profile Views today
            </Typography>
            <Typography className={classes.cardTxt}>$4,384</Typography>
          </Grid>
          <Grid
            item
            className={classes.card}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            lg={2}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(233, 181, 92, 0.12)",
                padding: 8,
                borderRadius: 25,
              }}
            >
              <Rating name="rating" value={4.5} max={1} readOnly />
            </div>
            <Typography className={classes.annualC}>455 Reviews</Typography>
            <Typography className={classes.cardTxt}>4.5/5</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.container}>
        <Grid item container mb={"18px"} alignItems={"center"}>
          <Typography className={classes.ptitle}>Ongoing projects</Typography>
          <div
            style={{
              padding: "2px 10px",
              margin: "0px 8px",
              backgroundColor: color.primary,
              color: color.white,
              fontWeight: "bold",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {villaDetails.length}
          </div>
        </Grid>
        {/* <div className={classes.card}> */}
        <div
          style={{
            display: "flex",
            overflowY: "scroll",
            padding: "10px 0",
          }}
        >
          {isArray(villaDetails) &&
            !isEmpty(villaDetails) &&
            villaDetails.map((villa, index) => {
              return (
                <div key={`Ongoing_projects_${index}`}>
                  <ProjectCard villa={villa} />
                </div>
              );
            })}
        </div>
        {/* </div> */}
      </Grid>

      <Grid container className={classes.container}>
        <Grid item container mb={"18px"} alignItems={"center"}>
          <Typography className={classes.ptitle}>
            Requested proposals
          </Typography>
          <div
            style={{
              padding: "2px 10px",
              margin: "0px 8px",
              backgroundColor: "#E9B55C",
              color: color.white,
              fontWeight: "bold",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {villaDetails1.length}
          </div>
        </Grid>
        {/* <div className={classes.card}> */}
        <div
          style={{
            display: "flex",
            overflowY: "scroll",
            padding: "10px 0",
          }}
        >
          {isArray(villaDetails1) &&
            !isEmpty(villaDetails1) &&
            villaDetails1.map((villa, index) => {
              return (
                <div key={`Requested_Proposal_${index}`}>
                  <ProjectCard
                    villa={villa}
                    requested
                    onClick={() => {
                      navigate("/request-proposal", { state: villa });
                    }}
                  />
                </div>
              );
            })}
        </div>
        {/* </div> */}
      </Grid>

      <Grid container className={classes.container}>
        <Grid item container mb={"18px"} alignItems={"center"}>
          <Typography className={classes.ptitle}>
            Submitted proposals
          </Typography>
          <div
            style={{
              padding: "2px 10px",
              margin: "0px 8px",
              backgroundColor: "#5CC385",
              color: color.white,
              fontWeight: "bold",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {villaDetails.length}
          </div>
        </Grid>
        {/* <div className={classes.card}> */}
        <div
          style={{
            display: "flex",
            overflowY: "scroll",
            padding: "10px 0",
          }}
        >
          {isArray(villaDetails) &&
            !isEmpty(villaDetails) &&
            villaDetails.map((villa, index) => {
              return (
                <div key={`Submitted_Proposal_${index}`}>
                  <ProjectCard villa={villa} />
                </div>
              );
            })}
        </div>
        {/* </div> */}
      </Grid>
      {visible && (
        <ProfileSuccessModal
          msg="Your profile will be reviewed soon. You will informed by email."
          visible={visible}
        />
      )}
    </Grid>
  );
};

export default Dashboard;
