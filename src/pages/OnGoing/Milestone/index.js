import {
  Button,
  Card,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  Modal,
  Fade,
  Box,
  Backdrop,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { color } from "../../../config/theme";
import CInput from "../../../components/CInput";
import { useTheme } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import _, { isArray, isEmpty, isNull } from "lodash";
import ConfirmModel from "../../../components/ConfirmModel";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import { getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import Images from "../../../config/images";
import NoData from "../../../components/NoData";

const errorObj = {
  nameErr: false,
  nameMsg: "",
  descriptionErr: false,
  descriptionMsg: "",
  startErr: false,
  startMsg: "",
  endErr: false,
  endMsg: "",
  amountErr: false,
  amountMsg: "",
};
export default function Milestone(props) {
  const { handleClick = () => null, villa } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const percentageReleased = (1000 / 1500) * 100;
  const percentageRemaining = 100 - percentageReleased;

  const [selectedBudget, setSelectedBudget] = useState({});

  const [errObj, setErrObj] = useState(errorObj);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? 300 : 500,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);

  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [btnUpdateLoader, setBtnUpdateLoader] = useState("");
  const [pendingBudget, setPendingBudget] = useState([]);
  const [ongoingBudget, setongoingBudget] = useState([]);
  const [deliveryBudget, setdeliveryBudget] = useState([]);
  const [completedBudget, setcompletedBudget] = useState([]);

  const [pendingMilestone, setPendingMilestone] = useState([]);
  const [ongoingMilestone, setongoingMilestone] = useState([]);
  const [deliveryMilestone, setdeliveryMilestone] = useState([]);
  const [completedMilestone, setcompletedMilestone] = useState([]);

  const [pendingLoader, setPendingLoader] = useState([]);
  const [ongoingLoader, setongoingLoader] = useState([]);
  const [deliveryLoader, setdeliveryLoader] = useState([]);
  const [completedLoader, setcompletedLoader] = useState([]);

  useEffect(() => {
    getMilestoneList("ongoing");
    getBudgetList("ongoing");

    getMilestoneList("delivery");
    getBudgetList("delivery");

    getMilestoneList("completed");
    getBudgetList("completed");

    getMilestoneList("pending");
    getBudgetList("pending");
  }, []);

  async function getMilestoneList(type) {
    if (type === "pending") {
      setPendingLoader(true);
    } else if (type === "ongoing") {
      setongoingLoader(true);
    } else if (type === "delivery") {
      setdeliveryLoader(true);
    } else if (type === "completed") {
      setcompletedLoader(true);
    }
    try {
      const response = await getApiData(
        `${Setting.endpoints.milestoneProposalList}?proposal_id=${villa?.proposal_id}&status=${type}`,
        "GET",
        {}
      );
      if (response.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          if (type === "pending") {
            setPendingMilestone(response?.data);
          } else if (type === "ongoing") {
            setongoingMilestone(response?.data);
          } else if (type === "delivery") {
            setdeliveryMilestone(response?.data);
          } else if (type === "completed") {
            setcompletedMilestone(response?.data);
          }
        }
      }
      if (type === "pending") {
        setPendingLoader(false);
      } else if (type === "ongoing") {
        setongoingLoader(false);
      } else if (type === "delivery") {
        setdeliveryLoader(false);
      } else if (type === "completed") {
        setcompletedLoader(false);
      }
    } catch (error) {
      if (type === "pending") {
        setPendingLoader(false);
      } else if (type === "ongoing") {
        setongoingLoader(false);
      } else if (type === "delivery") {
        setdeliveryLoader(false);
      } else if (type === "completed") {
        setcompletedLoader(false);
      }
      console.log("err===>", error);
    }
  }

  async function getBudgetList(type) {
    try {
      const response = await getApiData(
        `${Setting.endpoints.budgetList}/${villa?.proposal_id}`,
        "GET",
        {}
      );
      if (response.success) {
        if (
          isArray(response?.data?.budget) &&
          !isEmpty(response?.data?.budget)
        ) {
          if (type === "pending") {
            setPendingBudget(response?.data?.budget);
          } else if (type === "ongoing") {
            setongoingBudget(response?.data?.budget);
          } else if (type === "delivery") {
            setdeliveryBudget(response?.data?.budget);
          } else if (type === "completed") {
            setcompletedBudget(response?.data?.budget);
          }
        }
      }
    } catch (error) {
      console.log("err===>", error);
    }
  }

  const handleRowClick = (event, budget, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedBudget({
      data: budget,
      index: index,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedBudget(null);
  };

  const handleChange = (e, i, type) => {
    let dummyarr =
      type === "pending"
        ? [...pendingMilestone]
        : type === "ongoing"
        ? [...ongoingMilestone]
        : type === "delivery"
        ? [...deliveryMilestone]
        : [...completedMilestone];
    dummyarr[i].expanded = !dummyarr[i]?.expanded || false;
    type === "pending"
      ? setPendingMilestone(dummyarr)
      : type === "ongoing"
      ? setongoingMilestone(dummyarr)
      : type === "delivery"
      ? setdeliveryMilestone(dummyarr)
      : setongoingMilestone(dummyarr);
  };

  // function renderMilestoneCreateForm(mode) {
  //   return (
  //     <>
  //       <Grid item xs={12} id="name" mt={2}>
  //         <CInput
  //           label="Milestone Name"
  //           placeholder="Enter Milestone Name..."
  //           value={
  //             mode === "modal" && visibleEditModal
  //               ? state.milestone_name
  //               : mode === "form" && visibleEditModal
  //               ? ""
  //               : state.milestone_name
  //           }
  //           onChange={(e) => {
  //             setState({ ...state, milestone_name: e.target.value });
  //             setErrObj({
  //               ...errObj,
  //               nameErr: false,
  //               nameMsg: "",
  //             });
  //           }}
  //           inputProps={{ maxLength: 50 }}
  //           error={
  //             mode === "modal" && visibleEditModal
  //               ? errObj.nameErr
  //               : mode === "form" && visibleEditModal
  //               ? ""
  //               : errObj.nameErr
  //           }
  //           helpertext={
  //             mode === "modal" && visibleEditModal
  //               ? errObj.nameMsg
  //               : mode === "form" && visibleEditModal
  //               ? ""
  //               : errObj.nameMsg
  //           }
  //         />
  //       </Grid>
  //       <Grid item xs={12} id="desctiption">
  //         <CInput
  //           multiline={true}
  //           rows={3}
  //           label="Description:"
  //           placeholder="Write description here..."
  //           value={
  //             mode === "modal" && visibleEditModal
  //               ? state.description
  //               : mode === "form" && visibleEditModal
  //               ? ""
  //               : state.description
  //           }
  //           onChange={(e) => {
  //             setState({ ...state, description: e.target.value });
  //             setErrObj({
  //               ...errObj,
  //               descriptionErr: false,
  //               descriptionMsg: "",
  //             });
  //           }}
  //           error={
  //             mode === "modal" && visibleEditModal
  //               ? errObj.descriptionErr
  //               : mode === "form" && visibleEditModal
  //               ? ""
  //               : errObj.descriptionErr
  //           }
  //           helpertext={
  //             mode === "modal" && visibleEditModal
  //               ? errObj.descriptionMsg
  //               : mode === "form" && visibleEditModal
  //               ? ""
  //               : errObj.descriptionMsg
  //           }
  //         />
  //       </Grid>
  //       <Grid item container columnGap={1} wrap={md ? "wrap" : "nowrap"}>
  //         <Grid item xs={12} md={6} mb={2}>
  //           <FormControl
  //             variant="standard"
  //             fullWidth
  //             error={
  //               mode === "modal" && visibleEditModal
  //                 ? errObj.startErr
  //                 : mode === "form" && visibleEditModal
  //                 ? ""
  //                 : errObj.startErr
  //             }
  //             style={{ position: "relative" }}
  //           >
  //             <InputLabel shrink htmlFor="start-date">
  //               Start Date:
  //             </InputLabel>
  //             <LocalizationProvider dateAdapter={AdapterDateFns}>
  //               <DatePicker
  //                 disablePast
  //                 value={
  //                   mode === "modal" && visibleEditModal
  //                     ? new Date(state.start_date)
  //                     : mode === "form" && visibleEditModal
  //                     ? null
  //                     : state.start_date
  //                     ? new Date(state?.start_date)
  //                     : null
  //                 }
  //                 onChange={(e, v) => {
  //                   setState({
  //                     ...state,
  //                     start_date: moment(e).format("MMMM DD, yyyy"),
  //                     end_date: null,
  //                   });
  //                   setErrObj({
  //                     ...errObj,
  //                     startErr: false,
  //                     startMsg: "",
  //                   });
  //                 }}
  //                 sx={{
  //                   width: "100%",
  //                   marginTop: "24px",
  //                 }}
  //                 format="MMMM dd, yyyy"
  //                 slotProps={{
  //                   textField: {
  //                     helperText:
  //                       mode === "modal" && visibleEditModal
  //                         ? errObj.startMsg
  //                         : mode === "form" && visibleEditModal
  //                         ? ""
  //                         : errObj.startMsg,
  //                     error:
  //                       mode === "modal" && visibleEditModal
  //                         ? errObj.startErr
  //                         : mode === "form" && visibleEditModal
  //                         ? ""
  //                         : errObj.startErr,
  //                     id: "start-date",
  //                   },
  //                 }}
  //               />
  //             </LocalizationProvider>
  //           </FormControl>
  //         </Grid>
  //         <Grid item xs={12} md={6} mb={2}>
  //           <FormControl
  //             variant="standard"
  //             fullWidth
  //             error={
  //               mode === "modal" && visibleEditModal
  //                 ? errObj.endErr
  //                 : mode === "form" && visibleEditModal
  //                 ? ""
  //                 : errObj.endErr
  //             }
  //             style={{ position: "relative" }}
  //           >
  //             <InputLabel shrink htmlFor="end-date">
  //               End Date:
  //             </InputLabel>
  //             <LocalizationProvider dateAdapter={AdapterDateFns}>
  //               <DatePicker
  //                 minDate={new Date(state?.start_date)}
  //                 value={
  //                   mode === "modal" && visibleEditModal
  //                     ? new Date(state.end_date)
  //                     : mode === "form" && visibleEditModal
  //                     ? null
  //                     : state?.end_date
  //                     ? new Date(state?.end_date)
  //                     : null
  //                 }
  //                 onChange={(e) => {
  //                   setState({
  //                     ...state,
  //                     end_date: moment(e).format("MMMM DD, yyyy"),
  //                   });
  //                   setErrObj({
  //                     ...errObj,
  //                     endErr: false,
  //                     endMsg: "",
  //                   });
  //                 }}
  //                 sx={{
  //                   width: "100%",
  //                   marginTop: "24px",
  //                 }}
  //                 slotProps={{
  //                   textField: {
  //                     helperText:
  //                       mode === "modal" && visibleEditModal
  //                         ? errObj.endMsg
  //                         : mode === "form" && visibleEditModal
  //                         ? ""
  //                         : errObj.endMsg,
  //                     error:
  //                       mode === "modal" && visibleEditModal
  //                         ? errObj.endErr
  //                         : mode === "form" && visibleEditModal
  //                         ? ""
  //                         : errObj.endErr,
  //                     id: "end-date",
  //                   },
  //                 }}
  //                 format="MMMM dd, yyyy"
  //               />
  //             </LocalizationProvider>
  //           </FormControl>
  //         </Grid>
  //       </Grid>
  //       {/* <Grid item xs={12} id="amount">
  //         <CInput
  //           type={"number"}
  //           label="Milestone Amount:"
  //           placeholder="Amount "
  //           value={state.amount}
  //           inputProps={{
  //             onWheel: (event) => event.currentTarget.blur(),
  //           }}
  //           onChange={(e) => {
  //             setState({ ...state, amount: e.target.value });
  //             setErrObj({
  //               ...errObj,
  //               amountErr: false,
  //               amountMsg: "",
  //             });
  //           }}
  //           error={errObj.amountErr}
  //           helpertext={errObj.amountMsg}
  //         />
  //       </Grid> */}
  //     </>
  //   );
  // }

  return (
    <>
      <Grid container>
        {/* <Grid
          item
          container
          xs={12}
          pb={2}
          pt={"25px"}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h5"
            style={{
              fontFamily: "ElMessiri-SemiBold",
            }}
          >
            Total Milestones Amount
          </Typography>
          <Typography
            variant="h5"
            style={{
              fontFamily: "ElMessiri-SemiBold",
            }}
          >
            AED {amounts.reduce((acc, curr) => acc + curr, 0)}
          </Typography>
        </Grid> */}
        <Grid item container className={classes.contentContainer} mt={2}>
          <Grid item lg={12} sm={12} md={12} xs={12} pb={2}>
            <Typography className={classes.MainTitle}>Budget</Typography>
          </Grid>
          <Grid item container justifyContent={"space-between"}>
            <Grid
              item
              container
              alignItems="center"
              justifyContent={"flex-end"}
              margin={0}
              xl={6}
              md={6}
              sm={12}
              pb={2}
            >
              <Grid item lg={12} sm={12} md={12} xs={12}>
                <Typography className={classes.acctext}>New Amount:</Typography>
                <Typography className={classes.accRightText}>
                  AED 2,000
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent={"flex-end"}
              margin={0}
              xl={6}
              md={6}
              sm={12}
              pb={2}
            >
              <Grid item lg={12} sm={12} md={12} xs={12}>
                <Typography className={classes.acctext}>
                  Original amount:
                </Typography>
                <Typography className={classes.accRightText}>
                  AED 1,750
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container justifyContent="space-between" pb={2}>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              margin={0}
              p={2}
              bgcolor={color.primary}
              style={{ width: `${percentageReleased}%` }}
            >
              <Typography variant="body1" style={{ color: "#ffffff" }}>
                Released: AED {1000}
              </Typography>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              margin={0}
              p={2}
              justifyContent="center"
              bgcolor={"#475569"}
              style={{ width: `${percentageRemaining}%` }}
            >
              <Typography variant="body1" style={{ color: "#ffffff" }}>
                In escrow: AED {1500 - 1000}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent={"space-between"}>
            <Grid
              item
              container
              alignItems="center"
              justifyContent={"flex-end"}
              margin={0}
              xl={6}
              md={6}
              sm={12}
              pb={2}
            >
              <Grid item lg={12} sm={12} md={12} xs={12}>
                <Typography className={classes.acctext}>
                  Paid amount:
                </Typography>
                <Typography className={classes.accRightText}>
                  AED 1,500
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent={"flex-end"}
              margin={0}
              xl={6}
              md={6}
              sm={12}
              pb={2}
            >
              <Grid item lg={12} sm={12} md={12} xs={12}>
                <Typography className={classes.acctext}>
                  Remaining amount:
                </Typography>
                <Typography className={classes.accRightText}>
                  AED 500
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <div
            style={{
              width: "100%",
              padding: "14px 0px",
            }}
          >
            <Divider />
          </div>
        </Grid>
        <Grid item container className={classes.contentContainer}>
          <Grid item lg={12} sm={12} md={12} xs={12} pb={2}>
            <Typography className={classes.MainTitle}>Milestones</Typography>
          </Grid>

          <Grid item container rowGap={2}>
            <Grid item container justifyContent={"space-between"} rowGap={2}>
              <Grid
                item
                container
                xs={12}
                sm={5.8}
                md={3.9}
                style={{
                  padding: 20,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: color.borderColor,
                  margin: 0,
                }}
                wrap="nowrap"
              >
                <Grid item>
                  <img src={Images.FileVerified} alt="completed" />
                </Grid>
                <Grid item pl={1}>
                  <Typography className={classes.titleText}>
                    Completed
                  </Typography>
                  <Typography className={classes.cardValueTexy}>4</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={5.8}
                md={3.9}
                style={{
                  padding: 20,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: color.borderColor,
                  margin: 0,
                }}
                wrap="nowrap"
              >
                <Grid item>
                  <img src={Images.FilePaste} alt="completed" />
                </Grid>
                <Grid item pl={1}>
                  <Typography className={classes.titleText}>
                    Delivered
                  </Typography>
                  <Typography className={classes.cardValueTexy}>6</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={5.8}
                md={3.9}
                style={{
                  padding: 20,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: color.borderColor,
                  margin: 0,
                }}
                wrap="nowrap"
              >
                <Grid item>
                  <img src={Images.FileEdit} alt="completed" />
                </Grid>
                <Grid item pl={1}>
                  <Typography className={classes.titleText}>Ongoing</Typography>
                  <Typography className={classes.cardValueTexy}>2</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={5.8}
                md={3.9}
                style={{
                  padding: 20,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: color.borderColor,
                  margin: 0,
                }}
                wrap="nowrap"
              >
                <Grid item>
                  <img src={Images.FileAdd} alt="completed" />
                </Grid>
                <Grid item pl={1}>
                  <Typography className={classes.titleText}>Delayed</Typography>
                  <Typography className={classes.cardValueTexy}>14</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={5.8}
                md={3.9}
                style={{
                  padding: 20,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: color.borderColor,
                  margin: 0,
                }}
                wrap="nowrap"
              >
                <Grid item>
                  <img src={Images.FileAdd} alt="completed" />
                </Grid>
                <Grid item pl={1}>
                  <Typography className={classes.titleText}>New</Typography>
                  <Typography className={classes.cardValueTexy}>14</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={5.8}
                md={3.9}
                style={{
                  padding: 20,
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: color.borderColor,
                  margin: 0,
                }}
                wrap="nowrap"
              >
                <Grid item>
                  <img src={Images.FileUnknown} alt="completed" />
                </Grid>
                <Grid item pl={1}>
                  <Typography className={classes.titleText}>
                    Not Started
                  </Typography>
                  <Typography className={classes.cardValueTexy}>3</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* </Grid> */}
            <Grid
              item
              container
              xs={12}
              sm={5.8}
              md={3.9}
              style={{
                padding: 20,
                borderTopRightRadius: 16,
                borderBottomLeftRadius: 16,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: color.borderColor,
                margin: 0,
              }}
              wrap="nowrap"
            >
              <Grid item>
                <img src={Images.FileBlock} alt="completed" />
              </Grid>
              <Grid item pl={1}>
                <Typography className={classes.titleText}>Cancelled</Typography>
                <Typography className={classes.cardValueTexy}>5</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* {renderMilestoneCreateForm("form")} */}
        <Grid item container py={2}>
          <Typography className={classes.MainTitle}>Items:</Typography>
        </Grid>
        <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
          <Tabs
            value={tabValue}
            variant="scrollable"
            onChange={(v, b) => {
              setTabValue(b);
            }}
          >
            <Tab
              label={
                <Typography style={{ display: "flex", alignItems: "center" }}>
                  Not Started
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
                      fontSize: 12,
                    }}
                  >
                    {pendingMilestone?.length || 0}
                  </span>
                </Typography>
              }
            />
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
                      fontSize: 12,
                    }}
                  >
                    {ongoingMilestone?.length || 0}
                  </span>
                </Typography>
              }
            />
            <Tab
              label={
                <Typography style={{ display: "flex", alignItems: "center" }}>
                  Delivered
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
                      fontSize: 12,
                    }}
                  >
                    {deliveryMilestone?.length || 0}
                  </span>
                </Typography>
              }
            />

            <Tab
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
                      fontSize: 12,
                    }}
                  >
                    {completedMilestone?.length || 0}
                  </span>
                </Typography>
              }
            />
          </Tabs>
        </Grid>
        {tabValue === 0 && (
          <Grid container>
            {pendingLoader ? (
              <Grid
                item
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={12}
                minHeight={220}
              >
                <CircularProgress style={{ color: "#274BF1" }} size={26} />
              </Grid>
            ) : isArray(pendingMilestone) && !isEmpty(pendingMilestone) ? (
              pendingMilestone?.map((milestone, index) => {
                return (
                  <Card
                    sx={{
                      width: "100%",
                      my: 2,
                      p: 2,
                      boxShadow: "none",
                      border: `1px solid ${color.borderColor}`,
                      borderRadius: "8px",
                    }}
                  >
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      wrap="nowrap"
                    >
                      <Typography variant="h6" fontFamily={"ElMessiri-Regular"}>
                        {milestone?.milestone_name}
                      </Typography>
                      <IconButton
                        onClick={(e) => handleRowClick(e, milestone, index)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      py={2}
                    >
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          End date
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Status
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone?.status || "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Amount
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {`AED ${milestone?.amount}` || `AED 0`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <div style={{ width: "100%", paddingBottom: 16 }}>
                      <Divider />
                    </div>
                    <Grid item container xl={12}>
                      <Typography
                        style={{
                          color: color.primary,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChange(milestone, index, "pending");
                        }}
                      >
                        View Details
                        {milestone?.expanded ? (
                          <ExpandLessIcon sx={{ ml: 1 }} />
                        ) : (
                          <ExpandMoreIcon sx={{ ml: 1 }} />
                        )}
                      </Typography>
                    </Grid>
                    <Collapse
                      in={milestone?.expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Description"
                            secondary={milestone.description}
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Start Date"
                            secondary={
                              milestone.start_date
                                ? moment(milestone.start_date).format(
                                    "MMMM DD, YYYY"
                                  )
                                : "-"
                            }
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                          <ListItemText
                            style={{ textAlign: "end" }}
                            primary="End Date"
                            secondary={
                              milestone.end_date
                                ? moment(milestone.end_date).format(
                                    "MMMM DD, YYYY"
                                  )
                                : "-"
                            }
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                        </ListItem>
                      </List>
                      {isArray(pendingBudget) &&
                        !isEmpty(pendingBudget) &&
                        pendingBudget?.map((item, index) => {
                          if (item?.milestone_id === milestone?.id) {
                            return (
                              <Grid
                                container
                                className={classes.card}
                                rowGap={2}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  md={3}
                                  justifyContent={"flex-start"}
                                >
                                  {isArray(item?.images) &&
                                    !isEmpty(item?.images) && (
                                      <>
                                        <img
                                          style={{
                                            width: "100%",
                                            height: 170,
                                            objectFit: "contain",
                                            borderRadius: 4,
                                          }}
                                          src={item?.images[0]?.image}
                                          alt="budget"
                                        />
                                      </>
                                    )}
                                </Grid>
                                <Grid item container xs={12} md={9}>
                                  <Grid item container xs={12}>
                                    <Typography
                                      fontFamily={"ElMEssiri-Regular"}
                                      fontWeight="bold"
                                      pl={1}
                                    >
                                      {item?.name}
                                    </Typography>
                                  </Grid>
                                  <TableContainer
                                    style={{
                                      padding: 10,
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"ElMEssiri-Regular"}
                                        fontSize={18}
                                      >
                                        Manpower
                                      </Typography>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Manpower rate
                                          </TableCell>

                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Days
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.manpower_rate || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.days || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {parseInt(
                                                item.manpower_rate || 0
                                              ) * parseInt(item.days || 0)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                    <div
                                      style={{
                                        width: "100%",
                                        padding: "10px 0px 14px 0px",
                                      }}
                                    >
                                      <Divider />
                                    </div>
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"ElMEssiri-Regular"}
                                        fontSize={18}
                                      >
                                        Material
                                      </Typography>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                          >
                                            Material Type
                                          </TableCell>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                          >
                                            Material Unit
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Unit Price
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Quantity
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.material_type || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.material_unit || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {item?.material_unit_price || "0"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.qty || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {parseInt(
                                                item.material_unit_price || 0
                                              ) * parseInt(item.qty || 0)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            );
                          }
                        })}
                    </Collapse>
                  </Card>
                );
              })
            ) : (
              <NoData />
            )}
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid container>
            {ongoingLoader ? (
              <Grid
                item
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={12}
                minHeight={220}
              >
                <CircularProgress style={{ color: "#274BF1" }} size={26} />
              </Grid>
            ) : isArray(ongoingMilestone) && !isEmpty(ongoingMilestone) ? (
              ongoingMilestone?.map((milestone, index) => {
                return (
                  <Card
                    sx={{
                      width: "100%",
                      my: 2,
                      p: 2,
                      boxShadow: "none",
                      border: `1px solid ${color.borderColor}`,
                      borderRadius: "8px",
                    }}
                  >
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      wrap="nowrap"
                    >
                      <Typography variant="h6" fontFamily={"ElMessiri-Regular"}>
                        {milestone?.milestone_name}
                      </Typography>
                      <IconButton
                        onClick={(e) => handleRowClick(e, milestone, index)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      py={2}
                    >
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          End date
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Status
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone?.status || "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Amount
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {`AED ${milestone?.amount}` || `AED 0`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <div style={{ width: "100%", paddingBottom: 16 }}>
                      <Divider />
                    </div>
                    <Grid item container xl={12}>
                      <Typography
                        style={{
                          color: color.primary,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChange(milestone, index, "ongoing");
                        }}
                      >
                        View Details
                        {milestone?.expanded ? (
                          <ExpandLessIcon sx={{ ml: 1 }} />
                        ) : (
                          <ExpandMoreIcon sx={{ ml: 1 }} />
                        )}
                      </Typography>
                    </Grid>
                    <Collapse
                      in={milestone?.expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Description"
                            secondary={milestone.description}
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Start Date"
                            secondary={
                              milestone.start_date
                                ? moment(milestone.start_date).format(
                                    "MMMM DD, YYYY"
                                  )
                                : "-"
                            }
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                          <ListItemText
                            style={{ textAlign: "end" }}
                            primary="End Date"
                            secondary={
                              milestone.end_date
                                ? moment(milestone.end_date).format(
                                    "MMMM DD, YYYY"
                                  )
                                : "-"
                            }
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                        </ListItem>
                      </List>
                      {isArray(ongoingBudget) &&
                        !isEmpty(ongoingBudget) &&
                        ongoingBudget?.map((item, index) => {
                          if (item?.milestone_id === milestone?.id) {
                            return (
                              <Grid
                                container
                                className={classes.card}
                                rowGap={2}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  md={3}
                                  justifyContent={"flex-start"}
                                >
                                  {isArray(item?.images) &&
                                    !isEmpty(item?.images) && (
                                      <>
                                        <img
                                          style={{
                                            width: "100%",
                                            height: 170,
                                            objectFit: "contain",
                                            borderRadius: 4,
                                          }}
                                          src={item?.images[0]?.image}
                                          alt="budget"
                                        />
                                      </>
                                    )}
                                </Grid>
                                <Grid item container xs={12} md={9}>
                                  <Grid item container xs={12}>
                                    <Typography
                                      fontFamily={"ElMEssiri-Regular"}
                                      fontWeight="bold"
                                      pl={1}
                                    >
                                      {item?.name}
                                    </Typography>
                                  </Grid>
                                  <TableContainer
                                    style={{
                                      padding: 10,
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"ElMEssiri-Regular"}
                                        fontSize={18}
                                      >
                                        Manpower
                                      </Typography>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Manpower rate
                                          </TableCell>

                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Days
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.manpower_rate || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.days || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {parseInt(
                                                item.manpower_rate || 0
                                              ) * parseInt(item.days || 0)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                    <div
                                      style={{
                                        width: "100%",
                                        padding: "10px 0px 14px 0px",
                                      }}
                                    >
                                      <Divider />
                                    </div>
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"ElMEssiri-Regular"}
                                        fontSize={18}
                                      >
                                        Material
                                      </Typography>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                          >
                                            Material Type
                                          </TableCell>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                          >
                                            Material Unit
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Unit Price
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Quantity
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.material_type || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.material_unit || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {item?.material_unit_price || "0"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.qty || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {parseInt(
                                                item.material_unit_price || 0
                                              ) * parseInt(item.qty || 0)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            );
                          }
                        })}
                    </Collapse>
                  </Card>
                );
              })
            ) : (
              <NoData />
            )}
          </Grid>
        )}
        {tabValue === 2 && (
          <Grid container>
            {deliveryLoader ? (
              <Grid
                item
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={12}
                minHeight={220}
              >
                <CircularProgress style={{ color: "#274BF1" }} size={26} />
              </Grid>
            ) : isArray(deliveryMilestone) && !isEmpty(deliveryMilestone) ? (
              deliveryMilestone?.map((milestone, index) => {
                return (
                  <Card
                    sx={{
                      width: "100%",
                      my: 2,
                      p: 2,
                      boxShadow: "none",
                      border: `1px solid ${color.borderColor}`,
                      borderRadius: "8px",
                    }}
                  >
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      wrap="nowrap"
                    >
                      <Typography variant="h6" fontFamily={"ElMessiri-Regular"}>
                        {milestone?.milestone_name}
                      </Typography>
                      <IconButton
                        onClick={(e) => handleRowClick(e, milestone, index)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      py={2}
                    >
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          End date
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Status
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone?.status || "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Amount
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {`AED ${milestone?.amount}` || `AED 0`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <div style={{ width: "100%", paddingBottom: 16 }}>
                      <Divider />
                    </div>
                    <Grid item container xl={12}>
                      <Typography
                        style={{
                          color: color.primary,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChange(milestone, index, "delivery");
                        }}
                      >
                        View Details
                        {milestone?.expanded ? (
                          <ExpandLessIcon sx={{ ml: 1 }} />
                        ) : (
                          <ExpandMoreIcon sx={{ ml: 1 }} />
                        )}
                      </Typography>
                    </Grid>
                    <Collapse
                      in={milestone?.expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Description"
                            secondary={milestone.description}
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Start Date"
                            secondary={
                              milestone.start_date
                                ? moment(milestone.start_date).format(
                                    "MMMM DD, YYYY"
                                  )
                                : "-"
                            }
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                          <ListItemText
                            style={{ textAlign: "end" }}
                            primary="End Date"
                            secondary={
                              milestone.end_date
                                ? moment(milestone.end_date).format(
                                    "MMMM DD, YYYY"
                                  )
                                : "-"
                            }
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                        </ListItem>
                      </List>
                      {isArray(deliveryBudget) &&
                        !isEmpty(deliveryBudget) &&
                        deliveryBudget?.map((item, index) => {
                          if (item?.milestone_id === milestone?.id) {
                            return (
                              <Grid
                                container
                                className={classes.card}
                                rowGap={2}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  md={3}
                                  justifyContent={"flex-start"}
                                >
                                  {isArray(item?.images) &&
                                    !isEmpty(item?.images) && (
                                      <>
                                        <img
                                          style={{
                                            width: "100%",
                                            height: 170,
                                            objectFit: "contain",
                                            borderRadius: 4,
                                          }}
                                          src={item?.images[0]?.image}
                                          alt="budget"
                                        />
                                      </>
                                    )}
                                </Grid>
                                <Grid item container xs={12} md={9}>
                                  <Grid item container xs={12}>
                                    <Typography
                                      fontFamily={"ElMEssiri-Regular"}
                                      fontWeight="bold"
                                      pl={1}
                                    >
                                      {item?.name}
                                    </Typography>
                                  </Grid>
                                  <TableContainer
                                    style={{
                                      padding: 10,
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"ElMEssiri-Regular"}
                                        fontSize={18}
                                      >
                                        Manpower
                                      </Typography>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Manpower rate
                                          </TableCell>

                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Days
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.manpower_rate || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.days || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {parseInt(
                                                item.manpower_rate || 0
                                              ) * parseInt(item.days || 0)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                    <div
                                      style={{
                                        width: "100%",
                                        padding: "10px 0px 14px 0px",
                                      }}
                                    >
                                      <Divider />
                                    </div>
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"ElMEssiri-Regular"}
                                        fontSize={18}
                                      >
                                        Material
                                      </Typography>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                          >
                                            Material Type
                                          </TableCell>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                          >
                                            Material Unit
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Unit Price
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Quantity
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.material_type || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.material_unit || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {item?.material_unit_price || "0"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.qty || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {parseInt(
                                                item.material_unit_price || 0
                                              ) * parseInt(item.qty || 0)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            );
                          }
                        })}
                    </Collapse>
                  </Card>
                );
              })
            ) : (
              <NoData />
            )}
          </Grid>
        )}
        {tabValue === 3 && (
          <Grid container>
            {completedLoader ? (
              <Grid
                item
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={12}
                minHeight={220}
              >
                <CircularProgress style={{ color: "#274BF1" }} size={26} />
              </Grid>
            ) : isArray(completedMilestone) && !isEmpty(completedMilestone) ? (
              completedMilestone?.map((milestone, index) => {
                return (
                  <Card
                    sx={{
                      width: "100%",
                      my: 2,
                      p: 2,
                      boxShadow: "none",
                      border: `1px solid ${color.borderColor}`,
                      borderRadius: "8px",
                    }}
                  >
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      wrap="nowrap"
                    >
                      <Typography variant="h6" fontFamily={"ElMessiri-Regular"}>
                        {milestone?.milestone_name}
                      </Typography>
                      <IconButton
                        onClick={(e) => handleRowClick(e, milestone, index)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      py={2}
                    >
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          End date
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Status
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone?.status || "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Amount
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {`AED ${milestone?.amount}` || `AED 0`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <div style={{ width: "100%", paddingBottom: 16 }}>
                      <Divider />
                    </div>
                    <Grid item container xl={12}>
                      <Typography
                        style={{
                          color: color.primary,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChange(milestone, index, "completed");
                        }}
                      >
                        View Details
                        {milestone?.expanded ? (
                          <ExpandLessIcon sx={{ ml: 1 }} />
                        ) : (
                          <ExpandMoreIcon sx={{ ml: 1 }} />
                        )}
                      </Typography>
                    </Grid>
                    <Collapse
                      in={milestone?.expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Description"
                            secondary={milestone.description}
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemText
                            primary="Start Date"
                            secondary={
                              milestone.start_date
                                ? moment(milestone.start_date).format(
                                    "MMMM DD, YYYY"
                                  )
                                : "-"
                            }
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                          <ListItemText
                            style={{ textAlign: "end" }}
                            primary="End Date"
                            secondary={
                              milestone.end_date
                                ? moment(milestone.end_date).format(
                                    "MMMM DD, YYYY"
                                  )
                                : "-"
                            }
                            primaryTypographyProps={{
                              variant: "caption",
                              color: "#8C92A4",
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "ElMessiri-SemiBold",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          />
                        </ListItem>
                      </List>
                      {isArray(completedBudget) &&
                        !isEmpty(completedBudget) &&
                        completedBudget?.map((item, index) => {
                          if (item?.milestone_id === milestone?.id) {
                            return (
                              <Grid
                                container
                                className={classes.card}
                                rowGap={2}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  md={3}
                                  justifyContent={"flex-start"}
                                >
                                  {isArray(item?.images) &&
                                    !isEmpty(item?.images) && (
                                      <>
                                        <img
                                          style={{
                                            width: "100%",
                                            height: 170,
                                            objectFit: "contain",
                                            borderRadius: 4,
                                          }}
                                          src={item?.images[0]?.image}
                                          alt="budget"
                                        />
                                      </>
                                    )}
                                </Grid>
                                <Grid item container xs={12} md={9}>
                                  <Grid item container xs={12}>
                                    <Typography
                                      fontFamily={"ElMEssiri-Regular"}
                                      fontWeight="bold"
                                      pl={1}
                                    >
                                      {item?.name}
                                    </Typography>
                                  </Grid>
                                  <TableContainer
                                    style={{
                                      padding: 10,
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"ElMEssiri-Regular"}
                                        fontSize={18}
                                      >
                                        Manpower
                                      </Typography>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Manpower rate
                                          </TableCell>

                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Days
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.manpower_rate || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.days || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {parseInt(
                                                item.manpower_rate || 0
                                              ) * parseInt(item.days || 0)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                    <div
                                      style={{
                                        width: "100%",
                                        padding: "10px 0px 14px 0px",
                                      }}
                                    >
                                      <Divider />
                                    </div>
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"ElMEssiri-Regular"}
                                        fontSize={18}
                                      >
                                        Material
                                      </Typography>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                          >
                                            Material Type
                                          </TableCell>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                          >
                                            Material Unit
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Unit Price
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Quantity
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Roobert-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.material_type || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.material_unit || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {item?.material_unit_price || "0"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              {item?.qty || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"ElMessiri-Regular"}
                                            >
                                              AED{" "}
                                              {parseInt(
                                                item.material_unit_price || 0
                                              ) * parseInt(item.qty || 0)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            );
                          }
                        })}
                    </Collapse>
                  </Card>
                );
              })
            ) : (
              <NoData />
            )}
          </Grid>
        )}
        <Grid item container alignItems={"center"}>
          <Button
            variant="contained"
            onClick={() => {
              // validate(false);
            }}
          >
            <AddCircleOutlineOutlinedIcon
              style={{ color: color.white, marginRight: 4 }}
            />
            Milestone
          </Button>
        </Grid>
        {/* <Grid
          pt={2}
          item
          container
          columnGap={1}
          rowGap={1}
          justifyContent={"space-between"}
        >
          <Grid item sm={5.9} xs={12}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ boxShadow: "none" }}
              onClick={() => {
                const milestone_details = {
                  formvalues: state,
                  milestone: milestones,
                  previous: true,
                };
                dispatch(
                  setProposalDetails({ ...proposalDetails, milestone_details })
                );

                handleClick("back");
              }}
            >
              Previous Step
            </Button>
          </Grid>
          <Grid item sm={5.9} xs={12}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              {buttonLoader ? (
                <CircularProgress size={26} style={{ color: "#fff" }} />
              ) : (
                "Continue"
              )}
            </Button>
          </Grid>
        </Grid> */}
      </Grid>
      <ConfirmModel
        visible={visible}
        handleClose={() => setVisible(false)}
        confirmation={() => {
          // handleDelete();
        }}
        message={`Are you sure you want to delete ${selectedBudget?.data?.milestone_name} milestone?`}
      />
      <Menu
        id={`budget-menu`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <MenuItem /*onClick={handleEdit}*/>Request Payment</MenuItem>
      </Menu>

      {/* Edit details Modal */}
      <Modal
        open={visibleEditModal}
        onClose={() => {
          if (btnUpdateLoader === "update") {
            return null;
          } else {
            setVisibleEditModal(false);
            // clearData();
          }
        }}
        closeAfterTransition
        disableAutoFocus
        slotProps={{ backdrop: Backdrop }}
        style={{ overflowY: "scroll" }}
      >
        <Fade in={visibleEditModal}>
          <Box sx={style}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography className={classes.forgotHeaderText}>
                Update Milestone Details
              </Typography>
              <Grid item xs={12}>
                {/* {renderMilestoneCreateForm("modal")} */}
              </Grid>

              <Grid
                item
                container
                columnGap={1}
                justifyContent={"space-between"}
              >
                <Grid item xs={5.7}>
                  <Button
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={() => {
                      setVisibleEditModal(false);
                      // clearData();
                      setSelectedBudget(null);
                    }}
                    disabled={btnUpdateLoader === "update"}
                  >
                    Close
                  </Button>
                </Grid>

                <Grid item xs={5.7}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={() => {
                      // validate(true);
                    }}
                    disabled={btnUpdateLoader === "update"}
                  >
                    {btnUpdateLoader === "update" ? (
                      <CircularProgress style={{ color: "#fff" }} size={26} />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
