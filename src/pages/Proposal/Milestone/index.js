import {
  Button,
  Card,
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
  Typography,
  useMediaQuery,
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
  console.log("milestone Rendering");
  const { handleClick = () => null, from } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { proposalDetails } = useSelector((state) => state.auth);
  const { setProposalDetails } = authActions;

  const [state, setState] = useState({
    name: "",
    description: "",
    startdate: null,
    enddate: null,
    amount: "",
  });
  const [milestones, setMilestones] = useState([]);
  const [errObj, setErrObj] = useState(errorObj);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setState(
      proposalDetails?.milestone_details?.formvalues || {
        name: "",
        description: "",
        startdate: null,
        enddate: null,
        amount: "",
      }
    );
    setMilestones(proposalDetails?.milestone_details?.milestones || []);
  }, []);

  const handleRowClick = (event, budget, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedBudget({
      data: budget,
      index: index,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setSelectedBudget(null);
  };

  const handleEdit = (data, index) => {
    setState(selectedBudget.data);
    handleClose();
  };

  const handleDelete = () => {
    const newItems = [...milestones]; // Create a copy of the array
    newItems.splice(selectedBudget?.index, 1); // Delete the object at the specified index
    setMilestones(newItems);
    setVisible(false);
    setSelectedBudget(null);
    handleClose();
  };

  const validate = () => {
    const error = { ...errObj };
    let valid = true;

    if (isEmpty(state.name)) {
      valid = false;
      error.nameErr = true;
      error.nameMsg = "Please enter the name";
    }

    if (isEmpty(state.description)) {
      valid = false;
      error.descriptionErr = true;
      error.descriptionMsg = "Please enter description";
    }

    if (isNull(state?.startdate)) {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please select the start date";
    } else if (
      !isNull(state?.startdate) &&
      state?.startdate?.toString() == "Invalid date"
    ) {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please enter valid date";
    }

    if (isNull(state.enddate)) {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please select the end date";
    } else if (
      !isNull(state.enddate) &&
      state.enddate?.toString() == "Invalid date"
    ) {
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
      if (
        _.isObject(selectedBudget?.data) &&
        !_.isEmpty(selectedBudget?.data)
      ) {
        const newArray = [...milestones]; // create a copy of the array
        newArray[selectedBudget?.index] = state; // modify the copy
        setMilestones(newArray);
        setSelectedBudget({});
      } else {
        setMilestones((arr) => [...arr, state]);
      }
      clearData();
    }
  };
  const handleChange = (e, i) => {
    let dummyarr = [...milestones];
    dummyarr[i].expanded = !dummyarr[i].expanded;
    setMilestones(dummyarr);
  };

  function clearData() {
    setState({
      name: "",
      description: "",
      startdate: null,
      enddate: null,
      amount: "",
    });
    setErrObj(errorObj);
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12} pb={2} pt={"25px"}>
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
            ${" "}
            {(isArray(milestones) &&
              !isEmpty(milestones) &&
              milestones
                .map((obj) => obj.amount)
                .reduce(
                  (accumulator, current) =>
                    Number(accumulator) + Number(current),
                  0
                )) ||
              0}
          </Typography>
        </Grid>
        <Grid item xs={12} id="name" mt={2}>
          <CInput
            label="Milestone Name"
            placeholder="Enter Milestone Name..."
            value={state.name}
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
              setErrObj({
                ...errObj,
                nameErr: false,
                nameMsg: "",
              });
            }}
            error={errObj.nameErr}
            helpertext={errObj.nameMsg}
          />
        </Grid>
        <Grid item xs={12} id="desctiption">
          <CInput
            multiline={true}
            rows={3}
            label="Description:"
            placeholder="Write description here..."
            value={state.description}
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
        <Grid item container columnGap={1} wrap={md ? "wrap" : "nowrap"}>
          <Grid item xs={12} md={6} mb={2}>
            <FormControl
              variant="standard"
              fullWidth
              error={errObj.startErr}
              style={{ position: "relative" }}
            >
              <InputLabel shrink htmlFor="start-date">
                Start Date:
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={state.startdate ? new Date(state?.startdate) : null}
                  onChange={(e, v) => {
                    setState({
                      ...state,
                      startdate: moment(e).format("MMMM DD, yyyy"),
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
                      helperText: errObj.startMsg,
                      error: errObj.startErr,
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
              error={errObj.endErr}
              style={{ position: "relative" }}
            >
              <InputLabel shrink htmlFor="end-date">
                End Date:
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  minDate={new Date(state?.startdate)}
                  value={state?.enddate ? new Date(state?.enddate) : null}
                  onChange={(e) => {
                    setState({
                      ...state,
                      enddate: moment(e).format("MMMM DD, yyyy"),
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
                      helperText: errObj.endMsg,
                      error: errObj.endErr,
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
        <Grid item container alignItems={"center"}>
          <IconButton
            id="add-icon"
            onClick={() => {
              validate();
            }}
            sx={{ p: 0 }}
          >
            <AddCircleOutlineOutlinedIcon style={{ color: color.primary }} />
          </IconButton>
          <Typography
            variant="button"
            component={"label"}
            htmlFor="add-icon"
            fontFamily={"Roobert-Regular"}
            style={{
              cursor: "pointer",
              height: 24,
              marginLeft: 8,
              color: color.primary,
            }}
          >
            Add Milestone
          </Typography>
        </Grid>
        {isArray(milestones) && !isEmpty(milestones) && (
          <Grid container>
            {milestones.map((milestone, index) => (
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
                <Grid item container justifyContent={"space-between"}>
                  <Typography variant="h6" fontFamily={"ElMessiri-Regular"}>
                    {milestone.name}
                  </Typography>
                  <IconButton
                    onClick={(e) => handleRowClick(e, milestone, index)}
                  >
                    <MoreVertIcon />
                  </IconButton>
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
                </Grid>
                <Grid item container justifyContent={"space-between"} py={2}>
                  <Grid item xl={6}>
                    <Typography variant="caption" color={"#8C92A4"}>
                      End date
                    </Typography>
                    <Typography fontFamily={"ElMessiri-SemiBold"}>
                      {milestone?.enddate}
                    </Typography>
                  </Grid>
                  <Grid item xl={6} textAlign={"end"}>
                    <Typography variant="caption" color={"#8C92A4"}>
                      Amount
                    </Typography>
                    <Typography fontFamily={"ElMessiri-SemiBold"}>
                      {milestone.amount ? `$ ${milestone.amount}` : `$ 0`}
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
                <Collapse in={milestone?.expanded} timeout="auto" unmountOnExit>
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
                        secondary={milestone.startdate?.toString()}
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
                        secondary={milestone.enddate?.toString()}
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
                    {/*  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Amount"
                      secondary={`$ ${
                        milestone.amount ? milestone.amount : "-"
                      }`}
                    />
                  </ListItem> */}
                  </List>
                </Collapse>
              </Card>
            ))}
          </Grid>
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
                  milestones: milestones,
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
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                if (isArray(milestones) && !isEmpty(milestones)) {
                  handleClick("next");
                  const milestone_details = {
                    formvalues: state,
                    milestones: milestones,
                  };
                  dispatch(
                    setProposalDetails({
                      ...proposalDetails,
                      milestone_details,
                    })
                  );
                } else {
                  validate();
                  // toast.warning("Please add atleast one milestone");
                }
              }}
            >
              Continue
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
        message={`Are you sure you want to delete ${selectedBudget?.data?.name} milestone?`}
      />
    </>
  );
}
