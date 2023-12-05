import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import _, { isArray, isEmpty } from "lodash";
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
import BlueAbout from "../../components/BlueAbout";
import NoData from "../../components/NoData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./index.css";

const Dashboard = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const dispatch = useDispatch();
  const { setProposalDetails, setNotiData } = authActions;
  const { userData, notiData } = useSelector((state) => state.auth);
  const [onGoingLoader, setonGoingLoader] = useState(false);
  const [requestedLoader, setrequestedLoader] = useState(true);
  const [submittedLoader, setsubmittedLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [states, setStates] = useState(null);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [requestedProposal, setRequestedProposal] = useState([]);
  const [submittedProposal, setSubmittedProposal] = useState([]);

  const oSliderRef = React.useRef();
  const rSliderRef = React.useRef();
  const sSliderRef = React.useRef();

  useEffect(() => {
    handleUserData();
    getStates();
    askForPermissionToReceiveNotifications();
    onMessageListener();
    requestedProposalApiCall("proposal", true);
    requestedProposalApiCall("Requested", true);
    requestedProposalApiCall("ongoing", true);

    return () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(notiData?.type)) {
      if (notiData?.type === "requested") {
        requestedProposalApiCall("Requested");
      } else if (notiData?.type === "proposal") {
        requestedProposalApiCall("proposal");
      }
    }
  }, [notiData]);

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

  // requested proposal & submitted proposal api call
  async function requestedProposalApiCall(type, bool) {
    type === "Requested" && setrequestedLoader(true);
    type === "proposal" && setsubmittedLoader(true);
    type === "ongoing" && setonGoingLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.listcontractorproject}?status=${type}`,
        "get",
        {}
      );
      if (response?.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          type === "ongoing"
            ? setOngoingProjects(response?.data)
            : type === "Requested"
            ? setRequestedProposal(response?.data)
            : setSubmittedProposal(response?.data);
          if (bool) {
            dispatch(setNotiData({ ...notiData, type: "" }));
          }
        }
      } else {
        if (type === "Requested") {
          toast.error(response?.message);
        }
      }
      type === "Requested" && setrequestedLoader(false);
      type === "proposal" && setsubmittedLoader(false);
      type === "ongoing" && setonGoingLoader(false);
    } catch (error) {
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString());
      type === "Requested" && setrequestedLoader(false);
      type === "proposal" && setsubmittedLoader(false);
      type === "ongoing" && setonGoingLoader(false);
    }
  }

  async function getStates() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.contractorStates}/${userData?.contractor_data?.id}`,
        "get",
        {}
      );
      console.log(">>>> cons ", response);
      if (response?.success) {
        setStates(response);
      }
    } catch (error) {
      console.log("ERROR=====>>>>>", error);
    }
  }
  const settings = {
    dots: false,
    infinite: false,
    // slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: false,
    variableWidth: true,

    // responsive: [
    //   {
    //     breakpoint: 1300, // Screen width at which the settings will change
    //     settings: {
    //       // slidesToShow: 2, // Number of columns to show for screens wider than 1024px
    //       slidesToScroll: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 1024, // Screen width at which the settings will change
    //     settings: {
    //       // slidesToShow: 2, // Number of columns to show for screens wider than 1024px
    //       slidesToScroll: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 900, // Screen width at which the settings will change
    //     settings: {
    //       slidesToShow: 1, // Number of columns to show for screens wider than 768px
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ padding: sm ? 20 : 40 }}
        bgcolor={color.LightSurface}
        maxWidth={"unset"}
      >
        <Grid container>
          <Grid item container>
            <Typography className={classes.titleStyle}>Overview</Typography>
          </Grid>
          <Grid item container gap={2}>
            <Grid item className={classes.card} flexDirection={"column"} lg={3}>
              <span
                className={"card_value"}
                style={{
                  textAlign: "center",
                }}
              >
                Hi {userData?.contractor_data?.company_name}
              </span>
              <Typography className={classes.cardSubTxt}>
                Submit proposals to <br /> your customers
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(setProposalDetails({}));
                  navigate("/create-proposal", {
                    state: {
                      create_proposal: true,
                    },
                  });
                }}
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
              <span className={"card_value"}>AED {states?.annaul_value}</span>
            </Grid>
            <Grid
              item
              className={classes.card}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
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
              <span className={"card_value"}>{states?.active_contracts}</span>
            </Grid>
            <Grid
              item
              className={classes.card}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
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
              <span className={"card_value"}> {states?.total_views}</span>
            </Grid>
            <Grid
              item
              className={classes.card}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
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
              <span className={"card_value"}> {states?.average_rating}</span>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={classes.container}>
          <Grid
            item
            container
            mb={"18px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            wrap="nowrap"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography className={classes.ptitle}>
                Ongoing projects
              </Typography>
              <div
                style={{
                  padding: "2px 10px",
                  margin: "0px 8px",
                  backgroundColor: "#274BF1",
                  color: color.white,
                  fontWeight: "bold",
                  borderRadius: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {ongoingProjects?.length || 0}
              </div>
            </div>
            {isArray(ongoingProjects) && !isEmpty(ongoingProjects) && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{ border: `1px solid #F2F3F4`, marginRight: 8 }}
                  onClick={() => oSliderRef.current.slickPrev()}
                >
                  <KeyboardArrowLeftIcon style={{ color: "#363853" }} />
                </IconButton>
                <IconButton
                  style={{ border: `1px solid #F2F3F4` }}
                  onClick={() => oSliderRef.current.slickNext()}
                >
                  <KeyboardArrowRightIcon style={{ color: "#363853" }} />
                </IconButton>
              </div>
            )}
          </Grid>

          {onGoingLoader ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 0",
              }}
            >
              <CircularProgress size={40} />
            </div>
          ) : isArray(ongoingProjects) && !isEmpty(ongoingProjects) ? (
            <div className={classes.sliderCon}>
              <Slider {...settings} ref={oSliderRef}>
                {ongoingProjects?.map((ongoingData, index) => {
                  return (
                    <div key={`Ongoing_projects_${index}`}>
                      <ProjectCard
                        villa={ongoingData}
                        type="ongoing"
                        onClick={() => {
                          navigate("/ongoing-project", {
                            state: { villa: ongoingData },
                          });
                        }}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          ) : (
            <NoData />
          )}
        </Grid>

        <Grid container className={classes.container}>
          <Grid
            item
            container
            mb={"18px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            wrap="nowrap"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography className={classes.ptitle}>
                Requested proposals
              </Typography>
              <div
                style={{
                  padding: "2px 10px",
                  margin: "0px 8px",
                  backgroundColor: "#FFC561",
                  color: color.white,
                  fontWeight: "bold",
                  borderRadius: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {requestedProposal.length}
              </div>
            </div>
            {isArray(requestedProposal) && !isEmpty(requestedProposal) && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{ border: `1px solid #F2F3F4`, marginRight: 8 }}
                  onClick={() => rSliderRef.current.slickPrev()}
                >
                  <KeyboardArrowLeftIcon style={{ color: "#363853" }} />
                </IconButton>
                <IconButton
                  style={{ border: `1px solid #F2F3F4` }}
                  onClick={() => rSliderRef.current.slickNext()}
                >
                  <KeyboardArrowRightIcon style={{ color: "#363853" }} />
                </IconButton>
              </div>
            )}
          </Grid>
          {requestedLoader ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 0",
              }}
            >
              <CircularProgress size={40} />
            </div>
          ) : isArray(requestedProposal) && !isEmpty(requestedProposal) ? (
            <div className={classes.sliderCon}>
              <Slider {...settings} ref={rSliderRef}>
                {requestedProposal.map((villa, index) => {
                  return (
                    <div
                      key={`Requested_Proposal_${index}`}
                      // style={{
                      //   width: sm ? "100%" : "unset",
                      //   minWidth: sm ? "100%" : "unset",
                      // }}
                    >
                      <ProjectCard
                        villa={villa}
                        type="requested"
                        onClick={() => {
                          dispatch(setProposalDetails({}));
                          navigate("/request-proposal", { state: { villa } });
                        }}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          ) : (
            <NoData />
          )}
        </Grid>

        <Grid container className={classes.container}>
          <Grid
            item
            container
            mb={"18px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            wrap="nowrap"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
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
                {submittedProposal.length}
              </div>
            </div>
            {isArray(submittedProposal) && !isEmpty(submittedProposal) && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{ border: `1px solid #F2F3F4`, marginRight: 8 }}
                  onClick={() => sSliderRef.current.slickPrev()}
                >
                  <KeyboardArrowLeftIcon style={{ color: "#363853" }} />
                </IconButton>
                <IconButton
                  style={{ border: `1px solid #F2F3F4` }}
                  onClick={() => sSliderRef.current.slickNext()}
                >
                  <KeyboardArrowRightIcon style={{ color: "#363853" }} />
                </IconButton>
              </div>
            )}
          </Grid>
          {submittedLoader ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 0",
              }}
            >
              <CircularProgress size={40} />
            </div>
          ) : isArray(submittedProposal) && !isEmpty(submittedProposal) ? (
            <div className={classes.sliderCon}>
              <Slider {...settings} ref={sSliderRef}>
                {submittedProposal?.map((villa, index) => {
                  return (
                    <div
                      key={`Submitted_Proposal_${index}`}
                      // style={{
                      //   width: sm ? "100%" : "unset",
                      //   minWidth: sm ? "100%" : "unset",
                      // }}
                    >
                      <ProjectCard
                        villa={villa}
                        onClick={() => {
                          dispatch(setProposalDetails({}));
                          navigate("/request-proposal", {
                            state: { villa, status: "submitted" },
                          });
                        }}
                        type="submitted"
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          ) : (
            <NoData />
          )}
        </Grid>

        {!visible && (
          <ProfileSuccessModal
            msg="Your profile will be reviewed soon. You will informed by email."
            visible={visible}
          />
        )}
      </Grid>
      <BlueAbout />
    </>
  );
};

export default Dashboard;
