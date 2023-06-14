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

const villaDetails = [];

const ManageProject = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setProposalDetails } = authActions;
  const { userData } = useSelector((state) => state.auth);

  const [filter, setFilter] = useState("");
  const [tabData, setTabData] = useState([
    {
      createdAt: "2023-05-31T09:25:35.953Z",
      updatedAt: "2023-06-12T03:27:09.670Z",
      id: 173,
      exp_id: 1,
      project_type: "Interior Design",
      name: "R&C Testing",
      username: null,
      description: "Dix",
      location: "Al Furjan",
      budget: 5000,
      start_date: "01/06/2023",
      end_date: "30/06/2023",
      form_json: [
        {
          size: "120",
          preferred_style: [
            {
              id: 1,
              title: "Modern",
            },
          ],
          unit_Type: {
            id: 1,
            title: "Villa",
            _index: 0,
          },
          floors: 4,
          bedrooms: 7,
          bathrooms: 3,
          kitchen: 4,
        },
      ],
      status: "proposed-to-reno",
      client_id: 599,
      project_slug: "#CH290852061777",
      customer_email: null,
      project_id: 107,
      contractor_id: 1,
      reno_id: 536,
      submitted_by_reno: true,
      scope_of_work: "R&C Testing",
      proposal_id: 173,
      proposal_status: "proposed-to-reno",
      move_in_date: "2023-07-31",
      project_image: [
        {
          id: 351,
          image:
            "https://static.renohome.io/documents/f8145582-932e-41b4-9be6-f0b39d7809fd",
          type: "image/jpeg",
        },
      ],
      user_data: {
        is_email_verified: true,
        profile_url:
          "https://static.renohome.io/reno-cms/ea0b2d8e-352a-45ed-aee4-59bab25bb47f",
        email: "ajay21@mailinator.com",
        phone_code: "91",
        phone_no: "6355442894",
        username: "ajay",
        is_phone_verified: true,
        role: "home_owner",
      },
      reno_data: {
        profile_url:
          "https://static.renohome.io/reno-cms/ea0b2d8e-352a-45ed-aee4-59bab25bb47f",
        email: "reno12@mailinator.com",
        username: "Reno",
        role: "reno",
      },
      proposal: {
        createdAt: "2023-05-31T09:25:35.953Z",
        updatedAt: "2023-06-12T03:27:09.670Z",
        id: 173,
        project_id: 107,
        contractor_id: 1,
        reno_id: 536,
        submitted_by_reno: true,
        scope_of_work: "R&C Testing",
        status: "proposed-to-reno",
      },
    },
    {
      createdAt: "2023-06-09T11:03:01.840Z",
      updatedAt: "2023-06-09T11:03:01.840Z",
      id: 543,
      exp_id: 1,
      project_type: "Interior Design",
      name: "direct proposal Image testing",
      username: null,
      description: "sdsfs",
      location: null,
      budget: 25157,
      start_date: null,
      end_date: null,
      form_json: null,
      status: "proposed-to-client",
      client_id: 647,
      project_slug: "#CH292285622422",
      customer_email: "user@mailinator.com",
      project_id: 322,
      contractor_id: 1,
      reno_id: null,
      submitted_by_reno: false,
      scope_of_work: "sddfsf",
      proposal_id: 543,
      proposal_status: "proposed-to-client",
      move_in_date: "2023-06-30",
      project_image: [
        {
          id: 933,
          image:
            "https://static.renohome.io/documents/87d9c8bf-5c41-4460-a319-b09ca4638628",
          type: "image/png",
        },
        {
          id: 934,
          image:
            "https://static.renohome.io/documents/6b568fcd-0fd7-4188-bab7-12c780f8a811",
          type: "image/png",
        },
        {
          id: 935,
          image:
            "https://static.renohome.io/documents/69b3157a-15a7-44bc-948d-7bdfcd215689",
          type: "image/png",
        },
        {
          id: 936,
          image:
            "https://static.renohome.io/documents/5685af19-b5a5-44ce-8129-d843cd581156",
          type: "image/png",
        },
        {
          id: 937,
          image:
            "https://static.renohome.io/documents/ed6db6bd-0846-4422-9f60-43b70c45ddb1",
          type: "image/png",
        },
      ],
      user_data: {
        is_email_verified: false,
        profile_url:
          "https://static.renohome.io/reno-cms/ea0b2d8e-352a-45ed-aee4-59bab25bb47f",
        email: "user@mailinator.com",
        phone_code: "91",
        phone_no: "7056727102",
        username: "nir",
        is_phone_verified: false,
        role: "home_owner",
      },
      proposal: {
        createdAt: "2023-06-09T11:03:01.840Z",
        updatedAt: "2023-06-09T11:03:01.840Z",
        id: 543,
        project_id: 322,
        contractor_id: 1,
        reno_id: null,
        submitted_by_reno: false,
        scope_of_work: "sddfsf",
        status: "proposed-to-client",
      },
    },
    {
      createdAt: "2023-05-31T04:19:10.873Z",
      updatedAt: "2023-06-08T11:56:27.950Z",
      id: 157,
      exp_id: 1,
      project_type: "Interior Design",
      name: "R&C Testing",
      username: null,
      description: "Dix",
      location: "Al Furjan",
      budget: 5000,
      start_date: "01/06/2023",
      end_date: "30/06/2023",
      form_json: [
        {
          size: "120",
          preferred_style: [
            {
              id: 1,
              title: "Modern",
            },
          ],
          unit_Type: {
            id: 1,
            title: "Villa",
            _index: 0,
          },
          floors: 4,
          bedrooms: 7,
          bathrooms: 3,
          kitchen: 4,
        },
      ],
      status: "proposed-to-client",
      client_id: 599,
      project_slug: "#CH290852061777",
      customer_email: null,
      project_id: 107,
      contractor_id: 1,
      reno_id: 536,
      submitted_by_reno: true,
      scope_of_work: "sfsfs",
      proposal_id: 157,
      proposal_status: "proposed-to-client",
      move_in_date: "2023-06-28",
      project_image: [
        {
          id: 351,
          image:
            "https://static.renohome.io/documents/f8145582-932e-41b4-9be6-f0b39d7809fd",
          type: "image/jpeg",
        },
      ],
      user_data: {
        is_email_verified: true,
        profile_url:
          "https://static.renohome.io/reno-cms/ea0b2d8e-352a-45ed-aee4-59bab25bb47f",
        email: "ajay21@mailinator.com",
        phone_code: "91",
        phone_no: "6355442894",
        username: "ajay",
        is_phone_verified: true,
        role: "home_owner",
      },
      reno_data: {
        profile_url:
          "https://static.renohome.io/reno-cms/ea0b2d8e-352a-45ed-aee4-59bab25bb47f",
        email: "reno12@mailinator.com",
        username: "Reno",
        role: "reno",
      },
      proposal: {
        createdAt: "2023-05-31T04:19:10.873Z",
        updatedAt: "2023-06-08T11:56:27.950Z",
        id: 157,
        project_id: 107,
        contractor_id: 1,
        reno_id: 536,
        submitted_by_reno: true,
        scope_of_work: "sfsfs",
        status: "proposed-to-client",
      },
    },
  ]);

  const [tabLoader, setTabLoader] = useState(false);
  const [tabVal, setTabVal] = useState(0);

  useEffect(() => {
    tabVal === 1
      ? getTabList("proposal")
      : tabVal === 2
      ? getTabList("Requested")
      : tabVal === 3
      ? getTabList("draft-by-contractor")
      : // :
        //  tabVal === 4
        // ? getTabList("ongoing")
        getTabList("ongoing");
  }, [tabVal]);

  async function getTabList(type, bool) {
    setTabLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.listcontractorproject}?status=${type}`,
        "get",
        {}
      );
      if (response?.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          setTabData(response?.data);
        }
      } else {
        if (type === "Requested") {
          toast.error(response?.message);
        }
      }
      setTabLoader(false);
    } catch (error) {
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString());
    }
    setTabLoader(false);
  }
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
                      {18}
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
                      {12}
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
                      {410}
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
                  ? "Delayed"
                  : tabVal === 2
                  ? "Proposal Submitted"
                  : tabVal === 3
                  ? "Submitted request"
                  : tabVal === 4
                  ? "Pending request"
                  : "Completed"}
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
                  // value={searchFilter}
                  // onChange={(v) => {
                  //   isEmpty(v.target.value) && getFleetList(true);
                  //   setSearchFilter(v?.target?.value);
                  // }}
                />
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
            <Grid item justifySelf={"flex-end"}>
              {isArray(tabData) && !isEmpty(tabData) && (
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
          </Grid>

          {tabLoader ? (
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
          ) : isArray(tabData) && !isEmpty(tabData) ? (
            <div className={classes.sliderCon}>
              <Slider {...settings} ref={sSliderRef}>
                {tabData?.map((villa, index) => {
                  return (
                    <div key={`Submitted_Proposal_${index}`}>
                      <ProjectCard
                        manageProject
                        villa={villa}
                        onClick={() => {
                          if (tabVal === 0) {
                            navigate("/ongoing-project", { state: { villa } });
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
          )}
        </Grid>
      </Grid>
      <BlueAbout />
    </>
  );
};

export default ManageProject;
