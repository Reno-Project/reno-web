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
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { color } from "../../../config/theme";
import { useTheme } from "@emotion/react";
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
  const percentageReleased =
    villa?.milestone_budget_data?.released_amount === 0 &&
    villa?.milestone_budget_data?.escrow_amount === 0
      ? 0
      : ((villa?.milestone_budget_data?.released_amount || 0) /
          ((villa?.milestone_budget_data?.released_amount || 0) +
            (villa?.milestone_budget_data?.escrow_amount || 0))) *
        100;
  const percentageRemaining =
    villa?.milestone_budget_data?.released_amount === 0 &&
    villa?.milestone_budget_data?.escrow_amount === 0
      ? 0
      : 100 - percentageReleased;

  const [selectedMilestone, setSelectedMilestone] = useState({});
  const [milestoneCount, setMilestoneCount] = useState([]);
  const [counterLoader, setCounterLoader] = useState(true);

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

  const [pendingMilestone, setPendingMilestone] = useState([]);
  const [ongoingMilestone, setongoingMilestone] = useState([]);
  const [deliveryMilestone, setdeliveryMilestone] = useState([]);
  const [completedMilestone, setcompletedMilestone] = useState([]);

  const [pendingLoader, setPendingLoader] = useState(true);
  const [ongoingLoader, setongoingLoader] = useState(true);
  const [deliveryLoader, setdeliveryLoader] = useState(true);
  const [completedLoader, setcompletedLoader] = useState(true);
  const [paymentLoader, setpaymentLoader] = useState(false);

  useEffect(() => {
    getMilestoneList("ongoing");
    getMilestoneList("delivery");
    getMilestoneList("completed");
    getMilestoneList("pending");
  }, []);

  async function getMilestoneList(type, bool) {
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
            if (bool) {
              setongoingMilestone([]);
              setTimeout(() => {
                getMilestoneList("ongoing");
              }, 500);
            }
            setdeliveryMilestone(response?.data);
          } else if (type === "completed") {
            setcompletedMilestone(response?.data);
          }
        }
        getMilestoneCount();
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
  async function getMilestoneCount(type) {
    setCounterLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.milestoneCount}?proposal_id=${villa?.proposal_id}`,
        "GET",
        {}
      );
      if (response.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          setMilestoneCount(response?.data);
        }
      }
      setCounterLoader(false);
    } catch (error) {
      console.log("err===>", error);
    }
    setCounterLoader(false);
  }

  async function paymentRequest() {
    setpaymentLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.paymentRequest}?payment_id=${selectedMilestone?.data?.payment_id}`,
        "GET",
        {}
      );
      if (response.success) {
        handleClose();
        setVisible(false);
        getMilestoneList("pending");
      }
      setpaymentLoader(false);
    } catch (error) {
      console.log("err===>", error);
      setpaymentLoader(false);
    }
  }

  async function submitMilestone() {
    setpaymentLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.submitMilestone}/${selectedMilestone?.data?.id}`,
        "GET",
        {}
      );
      if (response.success) {
        handleClose();
        setVisible(false);
        getMilestoneList("delivery", true);
      }
      setpaymentLoader(false);
    } catch (error) {
      console.log("err===>", error);
      setpaymentLoader(false);
    }
  }

  const handleRowClick = (event, budget, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedMilestone({
      data: budget,
      index: index,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMilestone(null);
  };

  const handePayment = () => {
    setVisible(true);
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
                  AED {villa?.milestone_budget_data?.next_payment || 0}
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
                  AED {villa?.budget || 0}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {percentageReleased === 0 && percentageRemaining === 0 ? null : (
            <Grid
              item
              container
              justifyContent="space-between"
              pb={2}
              wrap="nowrap"
            >
              <Tooltip
                title={`Released: AED ${
                  villa?.milestone_budget_data?.released_amount || 0
                }`}
                arrow
              >
                <div
                  style={{
                    width:
                      percentageReleased === 0
                        ? "20px"
                        : `${percentageReleased}%`,
                    display: "flex",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: color.primary,
                    cursor: "pointer",
                  }}
                >
                  {percentageReleased > 20 ? (
                    <Typography variant="body1" style={{ color: "#ffffff" }}>
                      Released: AED{" "}
                      {villa?.milestone_budget_data?.released_amount || 0}
                    </Typography>
                  ) : (
                    <Typography variant="body1" style={{ color: "#ffffff" }}>
                      {villa?.milestone_budget_data?.released_amount || 0}
                    </Typography>
                  )}
                </div>
              </Tooltip>
              <Tooltip
                title={`In escrow: AED ${
                  villa?.milestone_budget_data?.escrow_amount || 0
                }`}
                arrow
              >
                <div
                  style={{
                    width:
                      percentageRemaining === 0
                        ? "20px"
                        : `${percentageRemaining}%`,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#475569",
                    cursor: "pointer",
                  }}
                >
                  {percentageRemaining > 20 ? (
                    <Typography variant="body1" style={{ color: "#ffffff" }}>
                      In escrow: AED{" "}
                      {villa?.milestone_budget_data?.escrow_amount || 0}
                    </Typography>
                  ) : (
                    <Typography variant="body1" style={{ color: "#ffffff" }}>
                      {villa?.milestone_budget_data?.escrow_amount || 0}
                    </Typography>
                  )}
                </div>
              </Tooltip>
            </Grid>
          )}
          {percentageReleased === 0 && percentageRemaining === 0 ? null : (
            <Grid
              item
              contaier
              sx={12}
              style={{ width: "100%", paddingBottom: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 5,
                    backgroundColor: color.primary,
                    marginRight: 8,
                  }}
                />
                <Typography>Released Amount</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 5,
                    marginRight: 8,
                    backgroundColor: "#475569",
                  }}
                />
                <Typography>In escrow Amount</Typography>
              </div>
            </Grid>
          )}
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
                  AED {villa?.milestone_budget_data?.paid_amount || 0}
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
                  AED {villa?.milestone_budget_data?.remaing_amount || 0}
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

          {counterLoader ? (
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
          ) : (
            isArray(milestoneCount) &&
            !isEmpty(milestoneCount) && (
              <Grid item container rowGap={2}>
                <Grid item container columnGap={1} rowGap={2}>
                  {milestoneCount?.map((item, ind) => {
                    if (
                      item?.type === "pending" ||
                      item?.type === "ongoing" ||
                      item?.type === "delivery" ||
                      item?.type === "completed"
                    ) {
                      return (
                        <Grid
                          item
                          container
                          xs={12}
                          sm={5.8}
                          md={5.8}
                          lg={3.9}
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
                            <img
                              src={
                                item?.type === "cancelled"
                                  ? Images.FileBlock
                                  : item?.type === "delivery"
                                  ? Images.FilePaste
                                  : item?.type === "new_milestones"
                                  ? Images.FileAdd
                                  : item?.type === "ongoing"
                                  ? Images.FileEdit
                                  : item?.type === "pending"
                                  ? Images.FileVerified
                                  : item?.type === "not_started"
                                  ? Images.FileUnknown
                                  : Images.FileVerified
                              }
                              alt="completed"
                            />
                          </Grid>
                          <Grid item pl={1}>
                            <Typography className={classes.titleText}>
                              {_.capitalize(item?.type?.replace("_", " "))}
                            </Typography>
                            <Typography className={classes.cardValueTexy}>
                              {item?.value || 0}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {/* <Grid
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
                  <Typography className={classes.cardValueTexy}>
                    {milestoneCount?.delivery || 0}
                  </Typography>
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
                  <Typography className={classes.cardValueTexy}>
                    {milestoneCount?.ongoing || 0}
                  </Typography>
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
                  <Typography className={classes.cardValueTexy}>
                    {milestoneCount?.delay || 0}
                  </Typography>
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
                  <Typography className={classes.cardValueTexy}>
                    {milestoneCount?.new_milestones || 0}
                  </Typography>
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
                  <Typography className={classes.cardValueTexy}>
                    {milestoneCount?.pending || 0}
                  </Typography>
                </Grid>
              </Grid> */}
                </Grid>

                {/* </Grid> */}
                {/* <Grid
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
                <Typography className={classes.cardValueTexy}>
                  {milestoneCount?.cancelled || 0}
                </Typography>
              </Grid>
            </Grid> */}
              </Grid>
            )
          )}
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
                  pending
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
                    {_.find(milestoneCount, { type: "pending" })?.value || 0}
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
                    {_.find(milestoneCount, { type: "ongoing" })?.value || 0}
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
                    {_.find(milestoneCount, { type: "delivery" })?.value || 0}
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
                    {_.find(milestoneCount, { type: "completed" })?.value || 0}
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
                      {milestone?.payment_status === "pending" && (
                        <IconButton
                          onClick={(e) => handleRowClick(e, milestone, index)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      )}
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
                          {milestone?.payment_status === "approve-request"
                            ? "Payment under review"
                            : milestone?.payment_status === "pending"
                            ? "Pending"
                            : "Requested"}
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
                      {isArray(milestone?.budget) &&
                        !isEmpty(milestone?.budget) &&
                        milestone?.budget?.map((item, index) => {
                          if (item?.milestone_id === milestone?.id) {
                            return (
                              <Grid
                                container
                                className={classes.card}
                                rowGap={2}
                              >
                                {isArray(item?.buget_image) &&
                                  !isEmpty(item?.buget_image) && (
                                    <Grid
                                      item
                                      xs={12}
                                      md={3}
                                      justifyContent={"flex-start"}
                                    >
                                      <img
                                        style={{
                                          width: "100%",
                                          height: 170,
                                          objectFit: "contain",
                                          borderRadius: 4,
                                        }}
                                        src={item?.buget_image[0]?.image}
                                        alt="budget"
                                      />
                                    </Grid>
                                  )}
                                {
                                  <Grid
                                    item
                                    container
                                    xs={12}
                                    md={
                                      !isArray(item?.buget_image) ||
                                      isEmpty(item?.buget_image)
                                        ? 12
                                        : 9
                                    }
                                  >
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
                                                {item?.material_unit_price ||
                                                  "0"}
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
                                }
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
                          {_.capitalize(milestone?.status) || "-"}
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
                      {isArray(milestone?.budget) &&
                        !isEmpty(milestone?.budget) &&
                        milestone?.budget?.map((item, index) => {
                          if (item?.milestone_id === milestone?.id) {
                            return (
                              <Grid
                                container
                                className={classes.card}
                                rowGap={2}
                              >
                                {isArray(item?.buget_image) &&
                                  !isEmpty(item?.buget_image) && (
                                    <Grid
                                      item
                                      xs={12}
                                      md={3}
                                      justifyContent={"flex-start"}
                                    >
                                      <img
                                        style={{
                                          width: "100%",
                                          height: 170,
                                          objectFit: "contain",
                                          borderRadius: 4,
                                        }}
                                        src={item?.buget_image[0]?.image}
                                        alt="budget"
                                      />
                                    </Grid>
                                  )}
                                {
                                  <Grid
                                    item
                                    container
                                    xs={12}
                                    md={
                                      !isArray(item?.buget_image) ||
                                      isEmpty(item?.buget_image)
                                        ? 12
                                        : 9
                                    }
                                  >
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
                                                {item?.material_unit_price ||
                                                  "0"}
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
                                }
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
                      {/* <IconButton
                        onClick={(e) => handleRowClick(e, milestone, index)}
                      >
                        <MoreVertIcon />
                      </IconButton> */}
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
                          Delivered
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
                      {isArray(milestone?.budget) &&
                        !isEmpty(milestone?.budget) &&
                        milestone?.budget?.map((item, index) => {
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
                                  {isArray(item?.buget_image) &&
                                    !isEmpty(item?.buget_image) && (
                                      <>
                                        <img
                                          style={{
                                            width: "100%",
                                            height: 170,
                                            objectFit: "contain",
                                            borderRadius: 4,
                                          }}
                                          src={item?.buget_image[0]?.image}
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
                      {/* <IconButton
                        onClick={(e) => handleRowClick(e, milestone, index)}
                      >
                        <MoreVertIcon />
                      </IconButton> */}
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
                          {_.capitalize(milestone?.status) || "-"}
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
                      {isArray(milestone?.budget) &&
                        !isEmpty(milestone?.budget) &&
                        milestone?.budget?.map((item, index) => {
                          if (item?.milestone_id === milestone?.id) {
                            return (
                              <Grid
                                container
                                className={classes.card}
                                rowGap={2}
                              >
                                {isArray(item?.buget_image) &&
                                  !isEmpty(item?.buget_image) && (
                                    <Grid
                                      item
                                      xs={12}
                                      md={3}
                                      justifyContent={"flex-start"}
                                    >
                                      <img
                                        style={{
                                          width: "100%",
                                          height: 170,
                                          objectFit: "contain",
                                          borderRadius: 4,
                                        }}
                                        src={item?.buget_image[0]?.image}
                                        alt="budget"
                                      />
                                    </Grid>
                                  )}
                                {
                                  <Grid
                                    item
                                    container
                                    xs={12}
                                    md={
                                      !isArray(item?.buget_image) ||
                                      isEmpty(item?.buget_image)
                                        ? 12
                                        : 9
                                    }
                                  >
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
                                                {item?.material_unit_price ||
                                                  "0"}
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
                                }
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
        {/* <Grid item container alignItems={"center"}>
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
        </Grid> */}
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
        loader={paymentLoader}
        handleClose={() => setVisible(false)}
        confirmation={() => {
          if (tabValue === 0) {
            paymentRequest();
          } else if (tabValue === 1) {
            submitMilestone();
          }
        }}
        message={
          tabValue === 0
            ? `Are you sure you want to make a payment request?`
            : `Are you sure you want to submit this milestone?`
        }
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
        <MenuItem onClick={handePayment}>
          {tabValue === 0 ? "Request Payment" : "Submit Milestone"}
        </MenuItem>
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
                      setSelectedMilestone(null);
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
