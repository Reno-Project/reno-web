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
  const { handleClick = () => null, villa, createProposal, dpId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { proposalDetails } = useSelector((state) => state.auth);
  const { setProposalDetails } = authActions;

  const [state, setState] = useState({
    milestone_name: "",
    description: "",
    start_date: null,
    end_date: null,
  });
  const [milestones, setMilestones] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [milestoneLoader, setmilestoneLoader] = useState(false);

  const [buttonLoader, setButtonLoader] = useState(false);
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
  const [selectedBudget, setSelectedBudget] = useState({});
  const [visible, setVisible] = useState(false);
  const [amounts, setAmounts] = useState([]);

  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [btnUpdateLoader, setBtnUpdateLoader] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (proposalDetails?.milestone_details?.previous) {
      setState(
        proposalDetails?.milestone_details?.formvalues || {
          milestone_name: "",
          description: "",
          start_date: null,
          end_date: null,
        }
      );
    }
    getMilestoneList();
  }, []);

  useEffect(() => {
    if (isArray(milestones) && !isEmpty(milestones)) {
      if (
        proposalDetails?.budget_details?.previous ||
        (isArray(proposalDetails?.budget_details?.budgets) &&
          !isEmpty(proposalDetails?.budget_details?.budgets))
      ) {
        updateBudgetMilestone(proposalDetails?.budget_details?.budgets);
      } else {
        !createProposal && getBudgetList();
      }
    }
  }, [milestones]);

  useEffect(() => {
    const newAmounts = [];

    milestones.forEach((milestone) => {
      let amount = 0;
      if (isArray(budgets) && budgets.length > 0) {
        budgets.forEach((bud) => {
          if (bud?.milestone?.id === milestone?.id) {
            let count =
              parseInt(bud?.material_unit_price || 0) *
                parseInt(bud?.qty || 0) +
              parseInt(bud?.manpower_rate || 0) * parseInt(bud?.days || 0);
            amount += count;
          }
        });
      }
      newAmounts.push(amount);
    });
    setAmounts(newAmounts);
  }, [budgets, milestones]);

  function updateBudgetMilestone(data) {
    const updatedBudgets = data.map((budget) => {
      if (budget.milestone_id) {
        // Find the corresponding milestone object in milestones array
        const milestone = milestones.find(
          (milestone) => milestone.id === budget.milestone_id
        );
        if (milestone) {
          // Add the milestone object to the budget object
          return {
            ...budget,
            milestone,
          };
        }
      }
      // Return the budget object as is (no milestone object to add)
      return budget;
    });

    setBudgets(updatedBudgets);
  }

  async function getMilestoneList() {
    setmilestoneLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.milestoneProposalList}/${
          createProposal ? dpId : villa?.id
        }`,
        "GET",
        {}
      );
      if (response.success) {
        if (
          proposalDetails?.milestone_details?.previous ||
          (isArray(proposalDetails?.milestone_details?.milestone) &&
            !isEmpty(proposalDetails?.milestone_details?.milestone))
        ) {
          setMilestones(proposalDetails?.milestone_details?.milestone);
        } else if (
          !proposalDetails?.milestone_details?.previous &&
          isArray(response?.data) &&
          !isEmpty(response?.data)
        ) {
          setMilestones(response?.data);
        } else {
          setMilestones([]);
        }
      }
      setmilestoneLoader(false);
    } catch (error) {
      setmilestoneLoader(false);
      console.log("err===>", error);
    }
  }

  async function getBudgetList() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.budgetList}/${createProposal ? dpId : villa?.id}`,
        "GET",
        {}
      );
      if (response.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          updateBudgetMilestone(response?.data);
        } else {
          setBudgets([]);
        }
      }
    } catch (error) {
      console.log("err===>", error);
    }
  }

  async function addMilestone() {
    setButtonLoader(true);
    const extractedData = milestones?.map((item) => {
      const { milestone_name, description, start_date, end_date, id } = item;
      if (id) {
        return { id, milestone_name, description, start_date, end_date };
      } else {
        return { milestone_name, description, start_date, end_date };
      }
    });

    const data = {
      proposal_id: createProposal ? dpId : villa?.id?.toString(),
      milestone_details: extractedData,
    };
    try {
      const response = await getApiData(
        Setting.endpoints.createMilestone,
        "POST",
        data
      );

      if (response.success) {
        // toast.success(response.message);
        const milestone_details = {
          formvalues: {
            milestone_name: "",
            description: "",
            start_date: null,
            end_date: null,
          },
          milestone: [],
          previous: false,
        };
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            milestone_details,
          })
        );
        handleClick("next");
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

  const handleEdit = (data, index) => {
    setVisibleEditModal(true);
    setState(selectedBudget.data);
  };

  const handleDelete = () => {
    if (selectedBudget?.data?.id) {
      deleteMilestone();
    } else {
      const newItems = [...milestones]; // Create a copy of the array
      newItems.splice(selectedBudget?.index, 1); // Delete the object at the specified index
      setMilestones(newItems);
      setVisible(false);
      dispatch(
        setProposalDetails({
          ...proposalDetails,
          milestone_details: {
            ...proposalDetails.milestone_details,
            milestone: newItems,
          },
        })
      );
      handleClose();
    }
  };

  async function deleteMilestone() {
    setmilestoneLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.deleteMilestone}/${selectedBudget?.data?.id}`,
        "GET"
      );
      if (response.success) {
        toast.success(response.message);
        const indices = budgets
          .map((item, index) =>
            item?.milestone?.id === selectedBudget?.data?.id ? index : -1
          )
          .filter((index) => index !== -1);
        let newBudArr = budgets.filter(
          (item, index) => !indices.includes(index)
        );

        const newItems = [...milestones]; // Create a copy of the array
        newItems.splice(selectedBudget?.index, 1); // Delete the object at the specified index
        setMilestones(newItems);
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            milestone_details: {
              ...proposalDetails.milestone_details,
              milestone: newItems,
            },
            budget_details: {
              ...proposalDetails?.budget_details,
              budgets: newBudArr,
            },
          })
        );
        setVisible(false);
        handleClose();
      } else {
        toast.error(response.message);
      }
      setmilestoneLoader(false);
    } catch (error) {
      console.log("error===>>>>", error);
      toast.error(error.toString());
    }
    setmilestoneLoader(false);
  }

  const validate = (isUpdateModalVisible) => {
    const error = { ...errObj };
    let valid = true;

    const stDate = new Date(state?.start_date);
    const enDate = new Date(state?.end_date);
    const todayDate = new Date();

    if (isEmpty(state.milestone_name)) {
      valid = false;
      error.nameErr = true;
      error.nameMsg = "Please enter the name";
    }

    if (isEmpty(state.description)) {
      valid = false;
      error.descriptionErr = true;
      error.descriptionMsg = "Please enter description";
    }

    if (isNull(state?.start_date)) {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please select the start date";
    } else if (!isNull(stDate) && stDate?.toString() == "Invalid Date") {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please enter valid date";
    } else if (
      moment(stDate, "DD/MM/YYYY").isSameOrBefore(
        moment(todayDate).format("DD/MM/YYYY")
      )
    ) {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please enter valid date";
    }

    if (isNull(state.end_date)) {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please select the end date";
    } else if (!isNull(enDate) && enDate?.toString() == "Invalid Date") {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please enter valid date";
    } else if (stDate > enDate) {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please enter valid date";
    }

    // if (isEmpty(state.amount.toString())) {
    //   valid = false;
    //   error.amountErr = true;
    //   error.amountMsg = "Please enter ammount";
    // }

    setErrObj(error);
    if (valid) {
      if (isUpdateModalVisible) {
        setVisibleEditModal(false);
      }
      if (
        _.isObject(selectedBudget?.data) &&
        !_.isEmpty(selectedBudget?.data)
      ) {
        const newArray = [...milestones]; // create a copy of the array
        newArray[selectedBudget?.index] = state; // modify the copy
        setMilestones(newArray);
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            milestone_details: {
              ...proposalDetails.milestone_details,
              milestone: newArray,
            },
          })
        );
      } else {
        setMilestones((arr) => [...arr, state]);
        let milestone_details = {
          formvalues: {},
          milestone: milestones ? [...milestones, state] : [state],
        };
        setTimeout(() => {
          dispatch(
            setProposalDetails({
              ...proposalDetails,
              milestone_details,
            })
          );
        }, 500);
      }
      clearData();
    }
  };
  const handleChange = (e, i) => {
    let dummyarr = [...milestones];
    dummyarr[i].expanded = !dummyarr[i].expanded;
    setMilestones(dummyarr);
  };

  const handleSubmit = () => {
    if (isArray(milestones) && !isEmpty(milestones)) {
      addMilestone();
    } else {
      toast.warning("Please add atleast one milestone");
    }
  };

  function clearData() {
    setState({
      milestone_name: "",
      description: "",
      start_date: null,
      end_date: null,
    });
    setErrObj(errorObj);
    handleClose();
  }

  function renderMilestoneCreateForm(mode) {
    return (
      <>
        <Grid item xs={12} id="name" mt={2}>
          <CInput
            label="Milestone Name"
            placeholder="Enter Milestone Name..."
            value={
              mode === "modal" && visibleEditModal
                ? state.milestone_name
                : mode === "form" && visibleEditModal
                ? ""
                : state.milestone_name
            }
            onChange={(e) => {
              setState({ ...state, milestone_name: e.target.value });
              setErrObj({
                ...errObj,
                nameErr: false,
                nameMsg: "",
              });
            }}
            inputProps={{ maxLength: 50 }}
            error={
              mode === "modal" && visibleEditModal
                ? errObj.nameErr
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.nameErr
            }
            helpertext={
              mode === "modal" && visibleEditModal
                ? errObj.nameMsg
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.nameMsg
            }
          />
        </Grid>
        <Grid item xs={12} id="desctiption">
          <CInput
            multiline={true}
            rows={3}
            label="Description:"
            placeholder="Write description here..."
            value={
              mode === "modal" && visibleEditModal
                ? state.description
                : mode === "form" && visibleEditModal
                ? ""
                : state.description
            }
            onChange={(e) => {
              setState({ ...state, description: e.target.value });
              setErrObj({
                ...errObj,
                descriptionErr: false,
                descriptionMsg: "",
              });
            }}
            error={
              mode === "modal" && visibleEditModal
                ? errObj.descriptionErr
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.descriptionErr
            }
            helpertext={
              mode === "modal" && visibleEditModal
                ? errObj.descriptionMsg
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.descriptionMsg
            }
          />
        </Grid>
        <Grid item container columnGap={1} wrap={md ? "wrap" : "nowrap"}>
          <Grid item xs={12} md={6} mb={2}>
            <FormControl
              variant="standard"
              fullWidth
              error={
                mode === "modal" && visibleEditModal
                  ? errObj.startErr
                  : mode === "form" && visibleEditModal
                  ? ""
                  : errObj.startErr
              }
              style={{ position: "relative" }}
            >
              <InputLabel shrink htmlFor="start-date">
                Start Date:
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disablePast
                  value={
                    mode === "modal" && visibleEditModal
                      ? new Date(state.start_date)
                      : mode === "form" && visibleEditModal
                      ? null
                      : state.start_date
                      ? new Date(state?.start_date)
                      : null
                  }
                  onChange={(e, v) => {
                    setState({
                      ...state,
                      start_date: moment(e).format("MMMM DD, yyyy"),
                      enddate: null,
                    });
                    setErrObj({
                      ...errObj,
                      startErr: false,
                      startMsg: "",
                    });
                  }}
                  sx={{
                    width: "100%",
                    marginTop: "24px",
                  }}
                  format="MMMM dd, yyyy"
                  slotProps={{
                    textField: {
                      helperText:
                        mode === "modal" && visibleEditModal
                          ? errObj.startMsg
                          : mode === "form" && visibleEditModal
                          ? ""
                          : errObj.startMsg,
                      error:
                        mode === "modal" && visibleEditModal
                          ? errObj.startErr
                          : mode === "form" && visibleEditModal
                          ? ""
                          : errObj.startErr,
                      id: "start-date",
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <FormControl
              variant="standard"
              fullWidth
              error={
                mode === "modal" && visibleEditModal
                  ? errObj.endErr
                  : mode === "form" && visibleEditModal
                  ? ""
                  : errObj.endErr
              }
              style={{ position: "relative" }}
            >
              <InputLabel shrink htmlFor="end-date">
                End Date:
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  minDate={new Date(state?.start_date)}
                  value={
                    mode === "modal" && visibleEditModal
                      ? new Date(state.end_date)
                      : mode === "form" && visibleEditModal
                      ? null
                      : state?.end_date
                      ? new Date(state?.end_date)
                      : null
                  }
                  onChange={(e) => {
                    setState({
                      ...state,
                      end_date: moment(e).format("MMMM DD, yyyy"),
                    });
                    setErrObj({
                      ...errObj,
                      endErr: false,
                      endMsg: "",
                    });
                  }}
                  sx={{
                    width: "100%",
                    marginTop: "24px",
                  }}
                  slotProps={{
                    textField: {
                      helperText:
                        mode === "modal" && visibleEditModal
                          ? errObj.endMsg
                          : mode === "form" && visibleEditModal
                          ? ""
                          : errObj.endMsg,
                      error:
                        mode === "modal" && visibleEditModal
                          ? errObj.endErr
                          : mode === "form" && visibleEditModal
                          ? ""
                          : errObj.endErr,
                      id: "end-date",
                    },
                  }}
                  format="MMMM dd, yyyy"
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} id="amount">
          <CInput
            type={"number"}
            label="Milestone Amount:"
            placeholder="Amount "
            value={state.amount}
            inputProps={{
              onWheel: (event) => event.currentTarget.blur(),
            }}
            onChange={(e) => {
              setState({ ...state, amount: e.target.value });
              setErrObj({
                ...errObj,
                amountErr: false,
                amountMsg: "",
              });
            }}
            error={errObj.amountErr}
            helpertext={errObj.amountMsg}
          />
        </Grid> */}
      </>
    );
  }

  return (
    <>
      <Grid container>
        <Grid
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
        </Grid>
        {renderMilestoneCreateForm("form")}
        <Grid item container alignItems={"center"}>
          <Button
            variant="contained"
            onClick={() => {
              validate(false);
            }}
          >
            <AddCircleOutlineOutlinedIcon
              style={{ color: color.white, marginRight: 4 }}
            />
            Add Milestone
          </Button>
        </Grid>
        {milestoneLoader ? (
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
          isArray(milestones) &&
          !isEmpty(milestones) && (
            <Grid container>
              {milestones.map((milestone, index) => {
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
                      <Grid item xl={6}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          End date
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={6} textAlign={"end"}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Amount
                        </Typography>
                        <Typography fontFamily={"ElMessiri-SemiBold"}>
                          {`AED ${amounts[index]}` || `AED 0`}
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
                          handleChange(milestone, index);
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
                      {isArray(budgets) &&
                        !isEmpty(budgets) &&
                        budgets?.map((item, index) => {
                          if (item?.milestone?.id === milestone?.id) {
                            return (
                              <Grid container className={classes.card}>
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
                                            {parseInt(item.manpower_rate || 0) *
                                              parseInt(item.days || 0)}
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
                            );
                          }
                        })}
                    </Collapse>
                  </Card>
                );
              })}
            </Grid>
          )
        )}
        <Grid
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
        </Grid>
      </Grid>
      <ConfirmModel
        visible={visible}
        handleClose={() => setVisible(false)}
        confirmation={() => {
          handleDelete();
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
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            setVisible(true);
          }}
        >
          Delete
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
            clearData();
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
                {renderMilestoneCreateForm("modal")}
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
                      clearData();
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
                      validate(true);
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
