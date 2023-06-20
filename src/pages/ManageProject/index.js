import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Rating,
  Select,
  Tab,
  Tabs,
  TextField,
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
import { FilterAlt, FilterAltOutlined, Search } from "@mui/icons-material";

const ManageProject = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setProposalDetails } = authActions;
  const { userData } = useSelector((state) => state.auth);

  const [filter, setFilter] = useState("");
  const [onGoingCount, setOnGoingCount] = useState([]);
  const [proposalSubmitedCount, setProposalSubmitedCount] = useState([]);
  const [submitRequestCount, setSubmitRequestCount] = useState([]);

  const [onGoingLoader, setOnGoingLoader] = useState(true);
  const [proposalSubmitedLoader, setProposalSubmitedLoader] = useState(true);
  const [submitRequestLoader, setSubmitRequestLoader] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");

  const [tabVal, setTabVal] = useState(0);

  useEffect(() => {
    getTabList("proposal");
    getTabList("Requested");
    getTabList("ongoing");
  }, []);

  async function getTabList(type, bool) {
    type === "ongoing" && setOnGoingLoader(true);
    type === "Requested" && setSubmitRequestLoader(true);
    type === "proposal" && setProposalSubmitedLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.listcontractorproject}?status=${type}&search=${
          bool ? "" : searchFilter
        }`,
        "get",
        {}
      );
      if (response?.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          if (type === "ongoing") {
            setOnGoingCount(response?.data);
          }
          if (type === "proposal") {
            setProposalSubmitedCount(response?.data);
          }
          if (type === "Requested") {
            setSubmitRequestCount(response?.data);
          }
        }
      } else {
        if (type === "Requested") {
          toast.error(response?.message);
        }
        setOnGoingCount([]);
        setProposalSubmitedCount([]);
        setProposalSubmitedCount([]);
      }
      type === "ongoing" && setOnGoingLoader(false);
      type === "Requested" && setSubmitRequestLoader(false);
      type === "proposal" && setProposalSubmitedLoader(false);
    } catch (error) {
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString());
      type === "ongoing" && setOnGoingLoader(false);
      type === "Requested" && setSubmitRequestLoader(false);
      type === "proposal" && setProposalSubmitedLoader(false);
    }
  }
  const oSliderRef = React.useRef();
  const rSliderRef = React.useRef();
  const sSliderRef = React.useRef();

  const settings = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    swipeToSlide: false,
    variableWidth: true,
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
        <Grid item container justifyContent={"space-between"}>
          <Grid item>
            <Typography className={classes.header}>Manage Projects</Typography>
          </Grid>
          <Grid item>
            <Button style={{ backgroundColor: color.white, boxShadow: "none" }}>
              <KeyboardArrowLeftIcon />
              This Month
              <KeyboardArrowRightIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.container}>
          <Grid
            item
            xs={12}
            style={{ borderBottom: "1px solid #F2F3F4", marginBottom: 20 }}
          >
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              value={tabVal}
              onChange={(v, b) => {
                setTabVal(b);
              }}
            >
              <Tab
                label={
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    Ongoing
                    <span
                      style={{
                        padding: "2px 8px",
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
                      {onGoingCount?.length || 0}
                    </span>
                  </Typography>
                }
              />
              {/* <Tab
                label={
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    Delayed
                    <span
                      style={{
                        padding: "2px 8px",
                        margin: "0px 8px",
                        backgroundColor: "#BE4A3A",
                        color: color.white,
                        fontWeight: "bold",
                        borderRadius: 22,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {784}
                    </span>
                  </Typography>
                }
              /> */}

              <Tab
                label={
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    Proposal Submitted
                    <span
                      style={{
                        padding: "2px 8px",
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
                      {proposalSubmitedCount?.length || 0}
                    </span>
                  </Typography>
                }
              />
              <Tab
                label={
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    Submitted request
                    <span
                      style={{
                        padding: "2px 8px",
                        margin: "0px 8px",
                        backgroundColor: "#6BBBD8",
                        color: color.white,
                        fontWeight: "bold",
                        borderRadius: 22,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {submitRequestCount?.length || 0}
                    </span>
                  </Typography>
                }
              />
              {/* <Tab
                label={
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    Pending Request
                    <span
                      style={{
                        padding: "2px 8px",
                        margin: "0px 8px",
                        backgroundColor: "#9C64E8",
                        color: color.white,
                        fontWeight: "bold",
                        borderRadius: 22,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {"04"}
                    </span>
                  </Typography>
                }
              /> */}
              {/* <Tab
                label={
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    Completed
                    <span
                      style={{
                        padding: "2px 8px",
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
                      {784}
                    </span>
                  </Typography>
                }
              /> */}
            </Tabs>
          </Grid>

          <Grid
            item
            container
            mb={"20px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            wrap="nowrap"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography className={classes.ptitle}>
                {tabVal === 0
                  ? "Ongoing"
                  : tabVal === 1
                  ? "Proposal Submitted"
                  : "Submitted request"}
              </Typography>
            </div>
          </Grid>

          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
            wrap={sm ? "wrap" : "nowrap"}
            my={2}
            rowGap={2}
          >
            <Grid item container rowGap={2}>
              <Grid item container style={{ width: "unset", margin: 0 }}>
                <Grid item mr={2}>
                  <TextField
                    fullWidth
                    placeholder="Search"
                    className={classes.inputFieldStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <div style={{ lineHeight: 0 }}>
                            <Search style={{ fontSize: 20 }} />
                          </div>
                        </InputAdornment>
                      ),
                    }}
                    value={searchFilter}
                    onChange={(v) => {
                      if (isEmpty(v.target.value)) {
                        tabVal === 0 && getTabList("ongoing", true);
                        tabVal === 1 && getTabList("proposal", true);
                        tabVal === 2 && getTabList("Requested", true);
                      }
                      setSearchFilter(v?.target?.value);
                    }}
                  />
                </Grid>
                <Grid item mr={2}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: color.secondary }}
                    onClick={() => {
                      if (!isEmpty(searchFilter)) {
                        tabVal === 0 && getTabList("ongoing", false);
                        tabVal === 1 && getTabList("proposal", false);
                        tabVal === 2 && getTabList("Requested", false);
                      }
                    }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Select
                  fullWidth
                  value={filter}
                  onChange={(v) => {
                    setFilter(v.target.value);
                  }}
                  displayEmpty
                  startAdornment={<FilterAltOutlined />}
                  style={filter === "" ? { color: "#A2A2A2" } : {}}
                  classes={{
                    iconOpen: classes.iconOpen,
                  }}
                >
                  <MenuItem value={""} selected>
                    Filters
                  </MenuItem>
                </Select>
              </Grid>
            </Grid>
            {tabVal === 0 ? (
              <Grid item justifySelf={"flex-end"}>
                {isArray(onGoingCount) && !isEmpty(onGoingCount) && (
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
            ) : null}
            {tabVal === 1 ? (
              <Grid item justifySelf={"flex-end"}>
                {isArray(submitRequestCount) &&
                  !isEmpty(submitRequestCount) && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        style={{
                          border: `1px solid #F2F3F4`,
                          marginRight: 8,
                        }}
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
            ) : null}
            {tabVal === 2 ? (
              <Grid item justifySelf={"flex-end"}>
                {isArray(proposalSubmitedCount) &&
                  !isEmpty(proposalSubmitedCount) && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        style={{
                          border: `1px solid #F2F3F4`,
                          marginRight: 8,
                        }}
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
            ) : null}
          </Grid>
          {tabVal === 0 ? (
            onGoingLoader ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 0",
                  minHeight: 150,
                }}
              >
                <CircularProgress size={40} />
              </div>
            ) : isArray(onGoingCount) && !isEmpty(onGoingCount) ? (
              <div className={classes.sliderCon}>
                <Slider {...settings} ref={oSliderRef}>
                  {onGoingCount?.map((villa, index) => {
                    return (
                      <div key={`Submitted_Proposal_${index}`}>
                        <ProjectCard
                          manageProject
                          villa={villa}
                          onClick={() => {
                            if (tabVal === 0) {
                              navigate("/ongoing-project", {
                                state: { villa },
                              });
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            ) : (
              <NoData />
            )
          ) : null}
          {tabVal === 1 ? (
            proposalSubmitedLoader ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 0",
                  minHeight: 150,
                }}
              >
                <CircularProgress size={40} />
              </div>
            ) : isArray(proposalSubmitedCount) &&
              !isEmpty(proposalSubmitedCount) ? (
              <div className={classes.sliderCon}>
                <Slider {...settings} ref={rSliderRef}>
                  {proposalSubmitedCount?.map((villa, index) => {
                    return (
                      <div key={`Submitted_Proposal_${index}`}>
                        <ProjectCard
                          manageProject
                          villa={villa}
                          onClick={() => {
                            dispatch(setProposalDetails({}));
                            navigate("/request-proposal", {
                              state: {
                                villa,
                                status: "submitted",
                              },
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
            )
          ) : null}
          {tabVal === 2 ? (
            submitRequestLoader ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 0",
                  minHeight: 150,
                }}
              >
                <CircularProgress size={40} />
              </div>
            ) : isArray(submitRequestCount) && !isEmpty(submitRequestCount) ? (
              <div className={classes.sliderCon}>
                <Slider {...settings} ref={sSliderRef}>
                  {submitRequestCount?.map((villa, index) => {
                    return (
                      <div key={`Submitted_Proposal_${index}`}>
                        <ProjectCard
                          manageProject
                          villa={villa}
                          onClick={() => {
                            dispatch(setProposalDetails({}));
                            navigate("/request-proposal", {
                              state: {
                                villa,
                                activeScreen: "/manage-project",
                              },
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
            )
          ) : null}
        </Grid>
      </Grid>
      <BlueAbout />
    </>
  );
};

export default ManageProject;
