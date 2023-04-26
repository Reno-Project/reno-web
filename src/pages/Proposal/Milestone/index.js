import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles";
import { color } from "../../../config/theme";
import CInput from "../../../components/CInput";
import { useTheme } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { isArray, isEmpty, isNull } from "lodash";
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
export default function Milestone() {
  const classes = useStyles();
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
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

    if (isNull(start)) {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please select the start date";
    } else if (!isNull(start) && start?.toString() === "Invalid Date") {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please enter valid date";
    }

    if (isNull(end)) {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please select the end date";
    } else if (!isNull(end) && end?.toString() === "Invalid Date") {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please enter valid date";
    }

    if (isEmpty(state.amount.toString())) {
      valid = false;
      error.amountErr = true;
      error.amountMsg = "Please enter ammount";
    }

    setErrObj(error);
    if (valid) {
      setMilestones((arr) => [...arr, state]);
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
    setStart(null);
    setEnd(null);
    setErrObj(errorObj);
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12} py={2}>
          <Typography
            style={{
              fontFamily: "ElMessiri-SemiBold",
            }}
          >
            Total Milestones Amount
          </Typography>
          <Typography
            variant="h6"
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
          <Grid item xs={12} md={6}>
            <FormControl
              variant="standard"
              fullWidth
              error={errObj.startErr}
              style={{ position: "relative" }}
            >
              <InputLabel shrink htmlFor="start-date">
                Start Date:
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={start}
                  onChange={(e, v) => {
                    setEnd(null);
                    setStart(e);
                    setState({
                      ...state,
                      startdate: moment(e).format("MMMM DD,YYYY"),
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
                  format="MMMM DD, YYYY"
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  minDate={start}
                  value={end}
                  onChange={(e) => {
                    setEnd(e);
                    setState({
                      ...state,
                      enddate: moment(e).format("MMMM DD,YYYY"),
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
                  format="MMMM DD, YYYY"
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} id="amount">
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
        </Grid>
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
                  <Typography variant="h6">{milestone.name}</Typography>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
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
                      {milestone.amount && `$ ${milestone.amount}`}
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
      </Grid>
    </>
  );
}
