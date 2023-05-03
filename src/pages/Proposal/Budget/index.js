import {
  Button,
  CardContent,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListItemButton,
  Menu,
  MenuItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles";
import { HighlightOffOutlined, ImageOutlined } from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { color } from "../../../config/theme";
import CInput from "../../../components/CInput";
import Cselect from "../../../components/CSelect";
import { useTheme } from "@emotion/react";
import Images from "../../../config/images";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import _, { isArray, isEmpty, isNull } from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment from "moment";
import { Setting } from "../../../utils/Setting";
import { toast } from "react-toastify";
import { getApiData } from "../../../utils/APIHelper";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";

const errorObj = {
  bNameErr: false,
  bNameMsg: "",
  materialTypeErr: false,
  materialTypeMsg: "",
  materialUnitPriceErr: false,
  materialUnitPriceMsg: "",
  quantityErr: false,
  quantityMsg: "",
  materialMilestoneErr: false,
  materialMilestoneMsg: "",
  daysErr: false,
  daysMsg: "",
  manpowerRateErr: false,
  manpowerRateMsg: "",
  manpowerMilestoneErr: false,
  manpowerMilestoneMsg: "",
  specificationsErr: false,
  specificationsMsg: "",
  photoErr: false,
  photoMsg: "",
};

export default function Budget(props) {
  console.log("Budget Rendering");

  const { handleClick = () => null } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { proposalDetails } = useSelector((state) => state.auth);
  const { setProposalDetails } = authActions;
  const [state, setState] = useState({
    budgetName: "",
    photo: [],
    materialType: "",
    materialUnitPrice: "",
    quantity: "",
    manpowerRate: "",
    days: "",
    materialMilestone: "",
    manpowerMilestone: "",
    specifications: "",
    manpowerLastChange: moment().format("MMMM DD, YYYY")?.toString(),
    materialLastChange: moment().format("MMMM DD, YYYY")?.toString(),
    manpowerStatus: "Pending",
    materialStatus: "pending",
  });

  const [budgetDetails, setBudgetDetails] = useState([]);
  // const budgetlist = [
  //   {
  //     budgetName: "Milestone 1",
  //     materialType: "marble",
  //     materialUnitPrice: "20",
  //     quantity: "2",
  //     materialMilestone: "N/A",
  //     manpowerRate: "20",
  //     days: "",
  //     manpowerMilestone: "N/A",
  //     specifications: "",
  //     photo: Images.building,
  //     manpowerLastChange: moment().format("MMMM DD, YYYY")?.toString(),
  //     materialLastChange: moment().format("MMMM DD, YYYY")?.toString(),
  //     manpowerStatus: "Pending",
  //     materialStatus: "pending",
  //   },
  //   {
  //     photo: Images.building,
  //     budgetName: "Milestone 2",
  //     materialType: "wood",
  //     materialUnitPrice: "20",
  //     quantity: "2",
  //     materialMilestone: "Polish",
  //     manpowerRate: "20",
  //     days: "",
  //     manpowerMilestone: "Procurement",
  //     specifications: "",
  //     manpowerLastChange: moment().format("MMMM DD, YYYY")?.toString(),
  //     materialLastChange: moment().format("MMMM DD, YYYY")?.toString(),
  //     manpowerStatus: "Pending",
  //     materialStatus: "pending",
  //   },
  // ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const [errObj, setErrObj] = useState(errorObj);

  const fileInputRef = useRef();
  const quantityRef = useRef();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setState(
      proposalDetails?.budget_details?.formvalues || {
        budgetName: "",
        photo: [],
        materialType: "",
        materialUnitPrice: "",
        quantity: "",
        manpowerRate: "",
        days: "",
        materialMilestone: "",
        manpowerMilestone: "",
        specifications: "",
        manpowerLastChange: moment().format("MMMM DD, YYYY")?.toString(),
        materialLastChange: moment().format("MMMM DD, YYYY")?.toString(),
        manpowerStatus: "Pending",
        materialStatus: "pending",
      }
    );
    proposalDetails?.budget_details?.budgets
      ? setBudgetDetails(proposalDetails?.budget_details?.budgets)
      : setBudgetDetails([]);
  }, []);

  const handleChange = (e, i) => {
    let dummyarr = [...budgetDetails];
    dummyarr[i].expanded = !dummyarr[i].expanded;
    setBudgetDetails(dummyarr);
  };

  const validate = () => {
    const error = { ...errObj };
    let valid = true;

    if (!isArray(state.photo) || isEmpty(state.photo)) {
      valid = false;
      error.photoErr = true;
      error.photoMsg = "Please upload photo";
    }

    if (isEmpty(state.budgetName)) {
      valid = false;
      error.bNameErr = true;
      error.bNameMsg = "Please enter the name";
    }

    if (isEmpty(state.materialType)) {
      valid = false;
      error.materialTypeErr = true;
      error.materialTypeMsg = "Please enter the material type";
    }

    const regex = /^\d+(\.\d+)?$/;
    if (isEmpty(state.materialUnitPrice)) {
      valid = false;
      error.materialUnitPriceErr = true;
      error.materialUnitPriceMsg = "Please enter the material unit price";
    } else if (!regex.test(state.materialUnitPrice)) {
      valid = false;
      error.materialUnitPriceErr = true;
      error.materialUnitPriceMsg = "Please enter valid material unit price";
    }

    if (isEmpty(state.quantity?.toString())) {
      valid = false;
      error.quantityErr = true;
      error.quantityMsg = "Please select the material quantity";
    }

    if (isEmpty(state.materialMilestone?.toString())) {
      valid = false;
      error.materialMilestoneErr = true;
      error.materialMilestoneMsg = "Please select the milestone";
    }

    if (isEmpty(state.manpowerRate)) {
      valid = false;
      error.manpowerRateErr = true;
      error.manpowerRateMsg = "Please enter the manpower rate";
    }

    if (isEmpty(state.days?.toString())) {
      valid = false;
      error.daysErr = true;
      error.daysMsg = "Please select the days";
    }

    if (isEmpty(state.manpowerMilestone?.toString())) {
      valid = false;
      error.manpowerMilestoneErr = true;
      error.manpowerMilestoneMsg = "Please select the milestone";
    }

    if (isEmpty(state.specifications)) {
      valid = false;
      error.specificationsErr = true;
      error.specificationsMsg = "Please enter the specifications";
    }
    setErrObj(error);

    if (valid) {
      if (
        _.isObject(selectedBudget?.data) &&
        !_.isEmpty(selectedBudget?.data)
      ) {
        const newArray = [...budgetDetails]; // create a copy of the array
        newArray[selectedBudget?.index] = state; // modify the copy
        setBudgetDetails(newArray);
        setSelectedBudget({});
      } else {
        setBudgetDetails((arr) => [...arr, state]);
      }
      clearData();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  function updateRedux() {
    const budget_details = {
      formvalues: state,
      budgets: budgetDetails,
    };
    dispatch(
      setProposalDetails({
        ...proposalDetails,
        budget_details,
      })
    );
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
    // setSelectedBudget(null);
  };

  const handleEdit = (data, index) => {
    setState(selectedBudget.data);
    handleClose();
  };
  const handleDelete = () => {
    console.log(`Deleting ${selectedBudget.name}`);
    handleClose();
  };

  function getMilestones() {
    return (
      proposalDetails?.milestone_details?.milestones?.map(
        (milestone) => milestone.name
      ) || []
    );
  }

  function clearData() {
    setState({
      budgetName: "",
      photo: [],
      materialType: "",
      materialUnitPrice: "",
      quantity: "",
      manpowerRate: "",
      days: "",
      materialMilestone: "",
      manpowerMilestone: "",
      specifications: "",
    });
    setErrObj(errorObj);
  }

  function getPhotoURL(data) {
    if (!data) {
      return;
    } else {
      const imgUrl = URL.createObjectURL(data);
      return (
        <img
          style={{
            width: md ? 150 : 220,
            maxHeight: 170,
            objectFit: "contain",
            borderRadius: 4,
          }}
          src={imgUrl}
          alt=""
        />
      );
    }
  }

  return (
    <>
      <Grid container>
        <Grid
          item
          container
          xs={12}
          justifyContent={"space-between"}
          pt={"25px"}
          pb={2}
        >
          <Typography
            variant="h5"
            style={{
              fontFamily: "ElMessiri-SemiBold",
            }}
          >
            Total Budget amount
          </Typography>
          <Typography
            variant="h5"
            style={{
              fontFamily: "ElMessiri-SemiBold",
            }}
          >
            $15,000
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            position: "relative",
          }}
        >
          <>
            <div
              style={{
                backgroundColor: "#F9F9FA",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 170,
                border: errObj.photoErr ? "1px solid red" : "none",
                borderRadius: 4,
              }}
            >
              <ImageOutlined
                style={{
                  color: "grey",
                  marginBottom: 20,
                  fontSize: 30,
                }}
              />
              <InputLabel>
                <b>Upload Photo</b>
              </InputLabel>
              <InputLabel style={{ fontSize: 12 }}>
                {"PNG, JPG, (max size 1200*800)"}
              </InputLabel>
            </div>
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
                cursor: "pointer",
              }}
              onChange={(e) => {
                const chosenFiles = Array.prototype.slice.call(e.target.files);
                const nArr = state.photo ? [...state.photo] : [];
                chosenFiles.map((item) => nArr.push(item));
                setState({ ...state, photo: nArr });
                setErrObj({
                  ...errObj,
                  photoErr: false,
                  photoMsg: "",
                });
              }}
              ref={fileInputRef}
            />
            <FormHelperText
              error={errObj.photoErr}
              style={{ fontFamily: "Roobert-Regular" }}
            >
              {errObj.photoMsg}
            </FormHelperText>
          </>
        </Grid>

        <Grid
          item
          style={{
            marginTop: state?.photo?.length > 0 && 40,
            overflowY: "scroll",
            maxHeight: 500,
            width: "100%",
          }}
        >
          {isArray(state.photo) &&
            state?.photo?.length > 0 &&
            state?.photo?.map((item, index) => {
              let imgUrl = "";
              if (typeof item === "object") {
                imgUrl = URL.createObjectURL(item);
              } else {
                imgUrl = item;
              }
              return (
                <div
                  style={{
                    display: "flex",
                    border: "1px solid #F2F3F4",
                    borderRadius: 6,
                    marginBottom: 10,
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
                  <div style={{ margin: "auto 0" }}>
                    <Typography
                      style={{
                        fontFamily: "Roobert-Regular",
                        fontWeight: "500",
                        color: "#202939",
                        fontSize: 18,
                      }}
                    >
                      {item?.name || `Portfolio Image ${index + 1}` || ""}
                    </Typography>
                    {/* <Typography
                              style={{
                                fontFamily: "Roobert-Regular",
                                color: "#787B8C",
                              }}
                            >
                              {isString(item?.image)
                                ? ""
                                : `${(item?.size / 1000).toFixed(2)} kb`}
                            </Typography> */}
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
                        color: "#8C92A4",
                      }}
                      onClick={() => {
                        // item?.id && deletePhoto(item?.id);
                        const nArr = [...state.photo];
                        nArr.splice(index, 1);
                        setState({ ...state, photo: nArr });
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </Grid>
        <Grid item xs={12} id="bName" mt={2}>
          <CInput
            label="Budget Name"
            placeholder="Enter Budget Name..."
            value={state.budgetName}
            onChange={(e) => {
              setState({ ...state, budgetName: e.target.value });
              setErrObj({
                ...errObj,
                bNameErr: false,
                bNameMsg: "",
              });
            }}
            error={errObj.bNameErr}
            helpertext={errObj.bNameMsg}
          />
        </Grid>

        <Grid item xs={12} id="materialType">
          <CInput
            label="Material type:"
            placeholder="marble, wood, etc..."
            value={state.materialType}
            onChange={(e) => {
              setState({ ...state, materialType: e.target.value });
              setErrObj({
                ...errObj,
                materialTypeErr: false,
                materialTypeMsg: "",
              });
            }}
            error={errObj.materialTypeErr}
            helpertext={errObj.materialTypeMsg}
          />
        </Grid>
        <Grid item container columnGap={1} wrap={md ? "wrap" : "nowrap"}>
          <Grid item xs={12} md={4} id="price">
            <CInput
              label="Material unit price"
              placeholder="Enter amount here...."
              value={state.materialUnitPrice}
              type="number"
              onChange={(e) => {
                setState({ ...state, materialUnitPrice: e.target.value });
                setErrObj({
                  ...errObj,
                  materialUnitPriceErr: false,
                  materialUnitPriceMsg: "",
                });
              }}
              error={errObj.materialUnitPriceErr}
              helpertext={errObj.materialUnitPriceMsg}
            />
          </Grid>

          <Grid item xs={12} md={4} id="quantity">
            <CInput
              label="Quantity"
              placeholder="Enter quantity here...."
              value={state.quantity}
              type="tel"
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/[^0-9]/g, "");
                setState({ ...state, quantity: numericValue });
                setErrObj({
                  ...errObj,
                  quantityErr: false,
                  quantityMsg: "",
                });
              }}
              inputProps={{
                pattern: "[0-9]*", // Allow only digits
                inputMode: "numeric", // Show numeric keyboard on mobile devices
              }}
              error={errObj.quantityErr}
              helpertext={errObj.quantityMsg}
            />
          </Grid>
          <Grid item xs={12} md={4} id="milestone">
            <Cselect
              label="milestone"
              placeholder="Select milestone"
              value={state.materialMilestone}
              handleSelect={(e) => {
                setState({ ...state, materialMilestone: e });
                setErrObj({
                  ...errObj,
                  materialMilestoneErr: false,
                  materialMilestoneMsg: "",
                });
              }}
              renderTags={getMilestones()}
              error={errObj.materialMilestoneErr}
              helpertext={errObj.materialMilestoneMsg}
            />
          </Grid>
        </Grid>

        <Grid item container columnGap={1} wrap={md ? "wrap" : "nowrap"}>
          <Grid item xs={12} md={4} id="rate">
            <CInput
              label="Manpower rate"
              placeholder="Enter amount here...."
              value={state.manpowerRate}
              type="number"
              onChange={(e) => {
                setState({ ...state, manpowerRate: e.target.value });
                setErrObj({
                  ...errObj,
                  manpowerRateErr: false,
                  manpowerRateMsg: "",
                });
              }}
              error={errObj.manpowerRateErr}
              helpertext={errObj.manpowerRateMsg}
            />
          </Grid>

          <Grid item xs={12} md={4} id="days">
            <CInput
              label="Days"
              placeholder="Enter Days"
              value={state.days}
              type="tel"
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = inputValue.replace(/[^0-9]/g, "");
                setState({ ...state, days: numericValue });
                setErrObj({
                  ...errObj,
                  daysErr: false,
                  daysMsg: "",
                });
              }}
              inputProps={{
                pattern: "[0-9]*", // Allow only digits
                inputMode: "numeric", // Show numeric keyboard on mobile devices
              }}
              error={errObj.daysErr}
              helpertext={errObj.daysMsg}
            />
          </Grid>
          <Grid item xs={12} md={4} id="manpowerMilestone">
            <Cselect
              label="milestone"
              placeholder="Select milestone"
              value={state.manpowerMilestone}
              handleSelect={(e) => {
                setState({ ...state, manpowerMilestone: e });
                setErrObj({
                  ...errObj,
                  manpowerMilestoneErr: false,
                  manpowerMilestoneMsg: "",
                });
              }}
              renderTags={getMilestones()}
              error={errObj.manpowerMilestoneErr}
              helpertext={errObj.manpowerMilestoneMsg}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} id="description">
          <CInput
            multiline={true}
            rows={3}
            label="Specifications:"
            placeholder="Write here..."
            value={state.specifications}
            onChange={(e) => {
              setState({ ...state, specifications: e.target.value });
              setErrObj({
                ...errObj,
                specificationsErr: false,
                specificationsMsg: "",
              });
            }}
            error={errObj.specificationsErr}
            helpertext={errObj.specificationsMsg}
          />
        </Grid>
        <Grid item container alignItems={"center"} mb={2}>
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
            Add Budget
          </Typography>
        </Grid>
        {isArray(budgetDetails) &&
          !isEmpty(budgetDetails) &&
          budgetDetails?.map((item, index) => {
            return (
              <Grid container className={classes.card}>
                <Grid item container wrap={"nowrap"}>
                  <Grid item justifyContent={"flex-start"}>
                    {isArray(item?.photo) && !isEmpty(item?.photo) ? (
                      getPhotoURL(item?.photo[0])
                    ) : (
                      <img
                        style={{
                          width: md ? 150 : 220,
                          maxHeight: 170,
                          objectFit: "contain",
                        }}
                        src={Images.building}
                        alt=""
                      />
                    )}
                  </Grid>
                  <Grid
                    item
                    container
                    sx={12}
                    p={2}
                    justifyContent={"flex-end"}
                  >
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      alignItems={"flex-start"}
                    >
                      <Typography variant="h5" fontFamily={"ElMessiri-Regular"}>
                        {item?.budgetName || "-"}
                      </Typography>
                      {/* <IconButton
                          onClick={(e) => handleRowClick(e, item, index)}
                        >
                          <MoreVertIcon />
                        </IconButton> */}
                      <IconButton
                        onClick={(e) => handleRowClick(e, item, index)}
                      >
                        <MoreVertIcon fontSize="20px" color="red" />
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
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      </Menu>
                    </Grid>
                    <Grid item textAlign={"end"}>
                      <Typography fontFamily={"ElMEssiri-Regular"}>
                        $ {item?.materialUnitPrice || "-"}
                      </Typography>
                      <Typography
                        fontFamily={"ElMEssiri-Regular"}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <Typography fontFamily={"Roobert-Regular"} mr={1}>
                          Last updated:
                        </Typography>
                        March 01, 2023
                      </Typography>
                    </Grid>
                    <Grid item container xl={12} justifyContent={"flex-start"}>
                      <ListItemButton
                        style={{
                          color: color.primary,
                        }}
                        onClick={() => {
                          handleChange(item, index);
                        }}
                      >
                        {item?.expanded ? "Collapse" : "View Subitems"}
                        {item?.expanded ? (
                          <ExpandLessIcon sx={{ ml: 1 }} />
                        ) : (
                          <ExpandMoreIcon sx={{ ml: 1 }} />
                        )}
                      </ListItemButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Collapse
                  in={item?.expanded}
                  timeout="auto"
                  unmountOnExit
                  style={{ width: "100%" }}
                >
                  {/* <CardContent
                    style={{
                      position: "relative",
                      boxSizing: "border-box",
                      width: "100%",
                    }}
                  > */}
                  <TableContainer style={{ padding: 10 }}>
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
                            align="right"
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                          >
                            Milestone
                          </TableCell>
                          <TableCell
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Quantity
                          </TableCell>
                          <TableCell
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Unit Price
                          </TableCell>
                          <TableCell
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Status
                          </TableCell>
                          <TableCell
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Last Change
                          </TableCell>
                        </TableRow>
                        <TableRow key={"Manpower"}>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.manpowerMilestone || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.quantity || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.manpowerRate || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.manpowerStatus || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.manpowerLastChange || "-"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div style={{ width: "100%", padding: "10px 0px" }}>
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
                              fontFamily: "Roobert-Regular !important",
                            }}
                          >
                            Milestone
                          </TableCell>
                          <TableCell
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Quantity
                          </TableCell>
                          <TableCell
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Unit Price
                          </TableCell>
                          <TableCell
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Status
                          </TableCell>
                          <TableCell
                            style={{
                              color: color.captionText,
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Last Change
                          </TableCell>
                        </TableRow>
                        <TableRow key={"Manpower"}>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.materialMilestone || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.materialUnitPrice || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.quantity || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.materialStatus || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontFamily={"ElMessiri-Regular"}>
                              {item?.materialLastChange || "-"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              </Grid>
            );
          })}
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
                updateRedux();
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
                if (isArray(budgetDetails) && !isEmpty(budgetDetails)) {
                  handleClick("submit");
                  updateRedux();
                } else {
                  validate();
                  // toast.warning("Please add atleast one milestone");
                }
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
