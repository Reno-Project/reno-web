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
  FormHelperText,
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
import { getAPIProgressData, getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import Images from "../../../config/images";
import NoData from "../../../components/NoData";
import CInput from "../../../components/CInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownwardRounded,
  HighlightOffOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import { useRef } from "react";
import CAutocomplete from "../../../components/CAutocomplete";

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
  bNameErr: false,
  bNameMsg: "",
  materialTypeErr: false,
  materialTypeMsg: "",
  materialUnitPriceErr: false,
  materialUnitPriceMsg: "",
  quantityErr: false,
  quantityMsg: "",
  unitErr: false,
  unitMsg: "",
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
export default function Milestone(props) {
  const { handleClick = () => null, villa } = props;
  console.log("villa", villa);
  const fileInputRef = useRef();

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [uploadLoader, setUploadLoader] = useState(false);

  const Released = villa?.milestone_budget_data?.released_amount || 0;
  const Escrow = villa?.milestone_budget_data?.escrow_amount || 0;
  const Due = villa?.milestone_budget_data?.due_amount || 0;
  const Total = _.isNumber(villa?.budget) ? villa?.budget : villa?.budget || 0;
  const ReleasedPercentage =
    (Released / Total) * 100 >= 100 && (Released / Total) * 100 <= 0
      ? "100"
      : `${(Released / Total) * 100}`;
  const EscrowPercentage =
    (Escrow / Total) * 100 >= 100 && (Escrow / Total) * 100 <= 0
      ? "100"
      : `${(Escrow / Total) * 100}`;
  const DuePercentage =
    (Due / Total) * 100 >= 100 && (Due / Total) * 100 <= 0
      ? "100"
      : `${(Due / Total) * 100}`;

  const calculateWidth1 = (progress) => {
    if (progress >= 33.33) {
      return progress;
    } else {
      return "33.33";
    }
  };

  const sumPercentage =
    parseFloat(calculateWidth1(ReleasedPercentage)) +
    parseFloat(calculateWidth1(EscrowPercentage)) +
    parseFloat(calculateWidth1(DuePercentage));

  const adjustedProgress1 =
    (parseFloat(calculateWidth1(ReleasedPercentage)) / sumPercentage) * 100;
  const adjustedProgress2 =
    (parseFloat(calculateWidth1(EscrowPercentage)) / sumPercentage) * 100;
  const adjustedProgress3 =
    (parseFloat(calculateWidth1(DuePercentage)) / sumPercentage) * 100;

  const [selectedMilestone, setSelectedMilestone] = useState({});
  const [selectedBudget, setSelectedBudget] = useState({});
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
  const [anchorElBudget, setAnchorElBudget] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const [state, setState] = useState({
    milestone_name: "",
    description: "",
    start_date: null,
    end_date: null,
  });

  const [stateBudget, setStateBudget] = useState({
    name: "",
    photo_url: [],
    buget_image: [],
    material_type: "",
    material_unit: "",
    material_unit_price: "",
    qty: "",
    manpower_rate: "",
    days: "",
    milestone: null,
    specification: "",
  });
  console.log("stateBudget", stateBudget);

  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleBudgetModal, setVisibleBudgetModal] = useState(false);
  const [visibleAddBudget, setVisibleAddBudget] = useState(false);
  const [btnUpdateLoader, setBtnUpdateLoader] = useState("");
  const [deleteIND, setDeleteIND] = useState(null);
  const [pendingMilestone, setPendingMilestone] = useState([]);
  const [ongoingMilestone, setongoingMilestone] = useState([]);
  const [deliveryMilestone, setdeliveryMilestone] = useState([]);
  const [completedMilestone, setcompletedMilestone] = useState([]);
  const [milestoneName, setMilestoneName] = useState([]);
  const [visibleDeleteBudget, setVisibleDeleteBudget] = useState(false);
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
  const handleRowClick1 = (event, milestoneDetail, budget, index) => {
    setAnchorElBudget(event.currentTarget);
    setSelectedBudget({
      data: budget,
      milestoneDetail: milestoneDetail,
      index: index,
    });
    setMilestoneName(milestoneDetail);
  };

  const handleClose1 = () => {
    setAnchorElBudget(null);
    setSelectedBudget(null);
  };
  const handePayment = () => {
    setVisible(true);
    setState(selectedMilestone.data);
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

  const handleEdit = (data, index) => {
    setVisibleEditModal(true);
    setState(selectedMilestone?.data);
  };
  const handleEditBudget = (data, index) => {
    setVisibleAddBudget(false);
    setVisibleBudgetModal(true);
    setStateBudget(selectedBudget?.data);
  };
  function renderMilestoneCreateForm(mode) {
    return (
      <>
        <Grid
          item
          xs={12}
          id="name"
          mt={2}
          style={{ fontFamily: "Poppins-Regular" }}
        >
          <CInput
            style={{ fontFamily: "Poppins-Regular" }}
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
        <Grid
          item
          xs={12}
          id="desctiption"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          <CInput
            style={{ fontFamily: "Poppins-Regular" }}
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
        <Grid
          item
          container
          columnGap={1}
          wrap={md ? "wrap" : "nowrap"}
          style={{ fontFamily: "Poppins-Regular" }}
        >
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
                      end_date: null,
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
                  components={{
                    OpenPickerIcon:()=><img src={Images.calendarIcon} alt="calender-icon"></img>
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
                  components={{
                    OpenPickerIcon:()=><img src={Images.calendarIcon} alt="calender-icon"></img>
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
      </>
    );
  }
  function checkImgSize(img) {
    let valid = true;
    if (img && img.size && img.size > 3145728) {
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }

  function clearErr() {
    setErrObj({
      ...errObj,
      materialTypeErr: false,
      materialTypeMsg: "",
      materialUnitPriceErr: false,
      materialUnitPriceMsg: "",
      quantityErr: false,
      quantityMsg: "",
      unitErr: false,
      unitMsg: "",
      daysErr: false,
      daysMsg: "",
      manpowerRateErr: false,
      manpowerRateMsg: "",
    });
  }
  function displayImagesView(mode) {
    if (
      isArray(stateBudget?.buget_image) &&
      stateBudget?.buget_image?.length > 0
    ) {
      if (mode === "form" && visibleBudgetModal) {
        return null;
      } else {
        return (
          isArray(stateBudget?.buget_image) &&
          !isEmpty(stateBudget?.buget_image) &&
          stateBudget?.buget_image?.map((item, index) => {
            let imgUrl = "";
            if (item.image) {
              imgUrl = item.image;
            } else if (typeof item === "object" && item instanceof Blob) {
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
                  alt="Budget Photos"
                />
                <div style={{ margin: "auto 0" }}>
                  <Typography
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontWeight: "500",
                      color: "#202939",
                      fontSize: 18,
                    }}
                  >
                    {item?.name || `Budget Image ${index + 1}` || ""}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: 10,
                  }}
                >
                  {deleteIND === index ? (
                    <CircularProgress style={{ color: "#274BF1" }} size={26} />
                  ) : (
                    <HighlightOffOutlined
                      style={{
                        zIndex: 10,
                        cursor: "pointer",
                        fontSize: 28,
                        color: "#8C92A4",
                      }}
                      onClick={() => {
                        // if (createProposal) {
                        const nArr = [...stateBudget.buget_image];
                        nArr.splice(index, 1);
                        setStateBudget({
                          ...stateBudget,
                          buget_image: nArr,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })
        );
      }
    }
  }
  async function UploadFileDirectly(img) {
    const nArr1 = stateBudget.buget_image ? [...stateBudget.buget_image] : [];
    for (let i = 0; i < img.length; i++) {
      nArr1.push(img[i]);
    }
    setStateBudget({ ...stateBudget, buget_image: nArr1 });

    setErrObj({
      ...errObj,
      photoErr: false,
      photoMsg: "",
    });
  }
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  function renderBudgetCreateForm(mode) {
    return (
      <>
        <Grid
          item
          xs={12}
          style={{
            position: "relative",
          }}
        >
          {uploadLoader &&
          ((mode === "form" && visibleBudgetModal) ||
            (mode === "modal" && visibleBudgetModal)) ? (
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
                  const chosenFiles = Array.prototype.slice.call(
                    e.target.files
                  );
                  let showMsg = false;
                  let limit = false;
                  const newArr = [...stateBudget?.buget_image];
                  chosenFiles.map((item) => {
                    const bool = checkImgSize(item);
                    if (bool && newArr.length < 5) {
                      newArr.push(item);
                    } else if (newArr.length >= 4) {
                      limit = true;
                    } else {
                      showMsg = true;
                    }
                  });
                  if (limit) {
                    toast.error("You can upload maximum 5 files");
                  } else if (showMsg) {
                    toast.error(
                      "Some registraion you are attempting to upload exceeds the maximum file size limit of 3 MB. Please reduce the size of your image and try again."
                    );
                  }
                  // if (createProposal) {
                  let shouldUpload =
                    isArray(newArr) &&
                    !isEmpty(newArr) &&
                    newArr?.filter((elem) => typeof elem !== "string");
                  if (shouldUpload) {
                    UploadFileDirectly(shouldUpload);
                  }
                }}
                ref={fileInputRef}
              />
              <FormHelperText
                error={errObj.photoErr}
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {errObj.photoMsg}
              </FormHelperText>
            </>
          )}
        </Grid>

        <Grid
          item
          style={{
            marginTop: stateBudget?.buget_image?.length > 0 && 40,
            overflowY: "scroll",
            maxHeight: 500,
            width: "100%",
          }}
        >
          {displayImagesView(mode)}
        </Grid>
        <Grid item xs={12} id="bName" mt={2}>
          <CInput
            label="Budget Name"
            placeholder="Enter Budget Name..."
            value={
              mode === "modal" && visibleBudgetModal
                ? stateBudget.name
                : mode === "form" && visibleBudgetModal
                ? ""
                : stateBudget.name
            }
            onChange={(e) => {
              setStateBudget({ ...stateBudget, name: e.target.value });
              setErrObj({
                ...errObj,
                bNameErr: false,
                bNameMsg: "",
              });
            }}
            inputProps={{ maxLength: 50 }}
            error={
              mode === "modal" && visibleBudgetModal
                ? errObj.bNameErr
                : mode === "form" && visibleBudgetModal
                ? ""
                : errObj.bNameErr
            }
            helpertext={
              mode === "modal" && visibleBudgetModal
                ? errObj.bNameMsg
                : mode === "form" && visibleBudgetModal
                ? ""
                : errObj.bNameMsg
            }
          />
        </Grid>

        <Grid item xs={12} id="material_type">
          <CInput
            label="Material type:"
            placeholder="marble, wood, etc..."
            value={
              mode === "modal" && visibleBudgetModal
                ? stateBudget.material_type
                : mode === "form" && visibleBudgetModal
                ? ""
                : stateBudget.material_type
            }
            onChange={(e) => {
              setStateBudget({ ...stateBudget, material_type: e.target.value });
              clearErr();
            }}
            inputProps={{ maxLength: 50 }}
            error={
              mode === "modal" && visibleBudgetModal
                ? errObj.materialTypeErr
                : mode === "form" && visibleBudgetModal
                ? ""
                : errObj.materialTypeErr
            }
            helpertext={
              mode === "modal" && visibleBudgetModal
                ? errObj.materialTypeMsg
                : mode === "form" && visibleBudgetModal
                ? ""
                : errObj.materialTypeMsg
            }
          />
        </Grid>
        <Grid item container columnGap={1} wrap={md ? "wrap" : "nowrap"}>
          <Grid item xs={12} md={4} id="Unit">
            <CAutocomplete
              label="Material unit:"
              placeholder="Enter material unit"
              value={
                mode === "modal" && visibleBudgetModal
                  ? stateBudget.material_unit
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : stateBudget?.material_unit
              }
              onChange={(e, newValue) => {
                setStateBudget({ ...stateBudget, material_unit: newValue });
                clearErr();
              }}
              options={[
                "tonns",
                "Kg",
                "g",
                "lbs",
                "liter",
                "ml",
                "sqm",
                "item",
              ]}
              getOptionLabel={(option) => option}
              error={
                mode === "modal" && visibleBudgetModal
                  ? errObj.unitErr
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.unitErr
              }
              helpertext={
                mode === "modal" && visibleBudgetModal
                  ? errObj.unitMsg
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.unitMsg
              }
            />
          </Grid>
          <Grid item xs={12} md={4} id="price">
            <CInput
              label="Material unit price"
              placeholder="Enter amount here...."
              value={
                mode === "modal" && visibleBudgetModal
                  ? stateBudget.material_unit_price == 0
                    ? ""
                    : stateBudget.material_unit_price
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : stateBudget.material_unit_price
              }
              type="number"
              onChange={(e) => {
                const bool = /^[0-9]+(?:\.[0-9]+)?$/.test(
                  Number(e.target.value)
                );
                if (bool) {
                  setStateBudget({
                    ...stateBudget,
                    material_unit_price: e.target.value,
                  });
                }
                clearErr();
              }}
              error={
                mode === "modal" && visibleBudgetModal
                  ? errObj.materialUnitPriceErr
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.materialUnitPriceErr
              }
              helpertext={
                mode === "modal" && visibleBudgetModal
                  ? errObj.materialUnitPriceMsg
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.materialUnitPriceMsg
              }
            />
          </Grid>

          <Grid item xs={12} md={4} id="qty">
            <CInput
              label="Quantity"
              placeholder="Enter quantity here...."
              value={
                mode === "modal" && visibleBudgetModal
                  ? stateBudget.qty == 0
                    ? ""
                    : stateBudget.qty
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : stateBudget.qty
              }
              type="tel"
              onChange={(e) => {
                const bool = /^[0-9]+$/.test(Number(e.target.value));
                if (bool) {
                  setStateBudget({ ...stateBudget, qty: e.target.value });
                }
                clearErr();
              }}
              inputProps={{
                pattern: "[0-9]*", // Allow only digits
                inputMode: "numeric", // Show numeric keyboard on mobile devices
              }}
              error={
                mode === "modal" && visibleBudgetModal
                  ? errObj.quantityErr
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.quantityErr
              }
              helpertext={
                mode === "modal" && visibleBudgetModal
                  ? errObj.quantityMsg
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.quantityMsg
              }
            />
          </Grid>
        </Grid>

        <Grid item container columnGap={1} wrap={md ? "wrap" : "nowrap"}>
          <Grid item xs={12} md={4} id="rate">
            <CInput
              label="Manpower rate"
              placeholder="Enter amount here...."
              value={
                mode === "modal" && visibleBudgetModal
                  ? stateBudget.manpower_rate
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : stateBudget.manpower_rate
              }
              type="number"
              onChange={(e) => {
                const bool = /^[0-9]+(?:\.[0-9]+)?$/.test(
                  Number(e.target.value)
                );
                if (bool) {
                  setStateBudget({
                    ...stateBudget,
                    manpower_rate: e.target.value,
                  });
                }
                clearErr();
              }}
              error={
                mode === "modal" && visibleBudgetModal
                  ? errObj.manpowerRateErr
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.manpowerRateErr
              }
              helpertext={
                mode === "modal" && visibleBudgetModal
                  ? errObj.manpowerRateMsg
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.manpowerRateMsg
              }
            />
          </Grid>

          <Grid item xs={12} md={4} id="days">
            <CInput
              label="Days"
              placeholder="Enter Days"
              value={
                mode === "modal" && visibleBudgetModal
                  ? stateBudget.days
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : stateBudget.days
              }
              type="tel"
              onChange={(e) => {
                const bool = /^[0-9]+$/.test(Number(e.target.value));
                if (bool) {
                  setStateBudget({ ...stateBudget, days: e.target.value });
                }
                clearErr();
              }}
              inputProps={{
                pattern: "[0-9]*", // Allow only digits
                inputMode: "numeric", // Show numeric keyboard on mobile devices
              }}
              error={
                mode === "modal" && visibleBudgetModal
                  ? errObj.daysErr
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.daysErr
              }
              helpertext={
                mode === "modal" && visibleBudgetModal
                  ? errObj.daysMsg
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.daysMsg
              }
            />
          </Grid>
          <Grid item xs={12} md={4} id="manpowerMilestone">
            <CAutocomplete
              label="Milestone"
              placeholder="Select milestone"
              value={
                mode === "modal" && visibleBudgetModal
                  ? stateBudget?.milestone || milestoneName
                  : mode === "form" && visibleBudgetModal
                  ? stateBudget?.milestone
                  : stateBudget?.milestone
              }
              onChange={(e, newValue) => {
                setStateBudget({ ...stateBudget, milestone: newValue });
                setErrObj({
                  ...errObj,
                  manpowerMilestoneErr: false,
                  manpowerMilestoneMsg: "",
                });
              }}
              options={milestoneName}
              getOptionLabel={(option) => option.milestone_name}
              error={
                mode === "modal" && visibleBudgetModal
                  ? errObj.manpowerMilestoneErr
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.manpowerMilestoneErr
              }
              helpertext={
                mode === "modal" && visibleBudgetModal
                  ? errObj.manpowerMilestoneMsg
                  : mode === "form" && visibleBudgetModal
                  ? ""
                  : errObj.manpowerMilestoneMsg
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12} id="description">
          <CInput
            multiline={true}
            rows={3}
            label="Specifications:"
            placeholder="Write here..."
            value={
              mode === "modal" && visibleBudgetModal
                ? stateBudget.specification
                : mode === "form" && visibleBudgetModal
                ? ""
                : stateBudget.specification
            }
            onChange={(e) => {
              setStateBudget({ ...stateBudget, specification: e.target.value });
              setErrObj({
                ...errObj,
                specificationsErr: false,
                specificationsMsg: "",
              });
            }}
            error={
              mode === "modal" && visibleBudgetModal
                ? errObj.specificationsErr
                : mode === "form" && visibleBudgetModal
                ? ""
                : errObj.specificationsErr
            }
            helpertext={
              mode === "modal" && visibleBudgetModal
                ? errObj.specificationsMsg
                : mode === "form" && visibleBudgetModal
                ? ""
                : errObj.specificationsMsg
            }
          />
        </Grid>
      </>
    );
  }
  const validateMilestone = (isUpdateModalVisible) => {
    const error = { ...errObj };
    let valid = true;

    const stDate = new Date(state?.start_date);
    const enDate = new Date(state?.end_date);
    const todayDate = new Date();

    const st = moment(stDate, "DD/MM/YYYY").format("DD/MM/YYYY");

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
    } else if (
      (!isNull(stDate) &&
        (stDate?.toString() === "Invalid date" ||
          stDate?.toString() === "Invalid Date")) ||
      st === "Invalid date" ||
      st === "Invalid Date"
    ) {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please enter valid date";
    } else if (moment(st).isBefore(moment(todayDate).format("DD/MM/YYYY"))) {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please enter valid date";
    }

    if (isNull(state.end_date)) {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please select the end date";
    } else if (
      !isNull(enDate) &&
      (enDate?.toString() === "Invalid date" ||
        enDate?.toString() === "Invalid Date")
    ) {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please enter valid date";
    } else if (stDate > enDate) {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please enter valid date";
    }

    setErrObj(error);
    if (valid) {
      if (isUpdateModalVisible) {
        setVisibleBudgetModal(false);
        updateMilestoneApiCall(state);
      }
      if (
        _.isObject(selectedMilestone?.data) &&
        !_.isEmpty(selectedMilestone?.data)
      ) {
        // const newArray = [...pendingMilestone]; // create a copy of the array
        // newArray[selectedMilestone?.index] = state; // modify the copy
        // setPendingMilestone(newArray);
        // setSelectedMilestone({});
      }
      clearData();
    }
  };
  const validate = (isUpdateModalVisible) => {
    const error = { ...errObj };
    let valid = true;
    const stDate = new Date(state?.start_date);
    const enDate = new Date(state?.end_date);
    const todayDate = new Date();
    const st = moment(stDate, "DD/MM/YYYY").format("DD/MM/YYYY");

    if (isEmpty(stateBudget?.name?.trim())) {
      valid = false;
      error.bNameErr = true;
      error.bNameMsg = "Please enter the name";
    } else if (stateBudget?.name?.length > 50) {
      valid = false;
      error.bNameErr = true;
      error.bNameMsg = "Please enter the name less then 50 characters";
    }

    const positiveIntRegex = /^[1-9]\d*$/;
    const regex = /^\d+(\.\d+)?$/;

    if (
      isEmpty(stateBudget?.material_type?.trim()) &&
      (isEmpty(stateBudget?.material_unit) ||
        isNull(stateBudget?.material_unit)) &&
      isEmpty(stateBudget?.material_unit_price?.toString()) &&
      isEmpty(stateBudget?.qty?.toString()) &&
      isEmpty(stateBudget?.manpower_rate?.toString()) &&
      isEmpty(stateBudget?.days?.toString())
    ) {
      if (isEmpty(stateBudget.material_type?.trim())) {
        valid = false;
        error.materialTypeErr = true;
        error.materialTypeMsg = "Please enter the material type";
      }

      if (isEmpty(stateBudget.material_unit_price?.toString())) {
        valid = false;
        error.materialUnitPriceErr = true;
        error.materialUnitPriceMsg = "Please enter the material unit price";
      } else if (
        !regex.test(stateBudget.material_unit_price) ||
        parseInt(stateBudget.material_unit_price) <= 0
      ) {
        valid = false;
        error.materialUnitPriceErr = true;
        error.materialUnitPriceMsg = "Please enter valid material unit price";
      }
      if (isEmpty(stateBudget?.qty?.toString())) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please enter the material qty";
      } else if (!positiveIntRegex.test(stateBudget?.qty)) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please enter valid material qty";
      } else if (stateBudget?.qty >= 100000) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please enter Quantity less then 100000";
      }

      if (
        isEmpty(stateBudget.material_unit) ||
        isNull(stateBudget?.material_unit)
      ) {
        valid = false;
        error.unitErr = true;
        error.unitMsg = "Please enter material unit";
      }

      if (isEmpty(stateBudget?.manpower_rate?.toString())) {
        valid = false;
        error.manpowerRateErr = true;
        error.manpowerRateMsg = "Please enter the manpower rate";
      } else if (!regex.test(stateBudget?.manpower_rate)) {
        valid = false;
        error.manpowerRateErr = true;
        error.manpowerRateMsg = "Please enter valid manpower rate";
      } else if (stateBudget?.manpower_rate >= 100000) {
        valid = false;
        error.manpowerRateErr = true;
        error.manpowerRateMsg = "Please enter valid manpower rate under 10000 ";
      }

      if (isEmpty(stateBudget?.days?.toString())) {
        valid = false;
        error.daysErr = true;
        error.daysMsg = "Please enter the days";
      } else if (!positiveIntRegex.test(stateBudget?.days)) {
        valid = false;
        error.daysErr = true;
        error.daysErr = "Please enter valid days";
      } else if (stateBudget?.days >= 365) {
        valid = false;
        error.daysErr = true;
        error.daysMsg = "Please enter days under 365";
      }
    } else {
      if (
        !isEmpty(stateBudget.material_type?.trim()) ||
        !isEmpty(stateBudget.material_unit_price?.toString()) ||
        (!isEmpty(stateBudget.material_unit) &&
          !isNull(stateBudget?.material_unit)) ||
        !isEmpty(stateBudget?.qty?.toString())
      ) {
        if (isEmpty(stateBudget.material_type?.trim())) {
          valid = false;
          error.materialTypeErr = true;
          error.materialTypeMsg = "Please enter the material type";
        }

        if (!stateBudget.material_unit_price) {
          valid = false;
          error.materialUnitPriceErr = true;
          error.materialUnitPriceMsg = "Please enter the material unit price";
        } else if (
          !regex.test(stateBudget.material_unit_price) ||
          parseInt(stateBudget.material_unit_price) <= 0
        ) {
          valid = false;
          error.materialUnitPriceErr = true;
          error.materialUnitPriceMsg = "Please enter valid material unit price";
        }
        if (isEmpty(stateBudget?.qty?.toString())) {
          valid = false;
          error.quantityErr = true;
          error.quantityMsg = "Please enter the material qty";
        } else if (!positiveIntRegex.test(stateBudget?.qty)) {
          valid = false;
          error.quantityErr = true;
          error.quantityMsg = "Please enter valid material qty";
        } else if (stateBudget?.qty >= 100000) {
          valid = false;
          error.quantityErr = true;
          error.quantityMsg = "Please enter Quantity less then 100000";
        }

        if (isEmpty(stateBudget.material_unit)) {
          valid = false;
          error.unitErr = true;
          error.unitMsg = "Please enter material unit";
        }
      }
      if (
        !isEmpty(stateBudget?.manpower_rate?.toString()) ||
        !isEmpty(stateBudget?.days?.toString())
      ) {
        if (isEmpty(stateBudget?.manpower_rate?.toString())) {
          valid = false;
          error.manpowerRateErr = true;
          error.manpowerRateMsg = "Please enter the manpower rate";
        } else if (!regex.test(stateBudget.manpower_rate)) {
          valid = false;
          error.manpowerRateErr = true;
          error.manpowerRateMsg = "Please enter valid manpower rate";
        } else if (stateBudget?.manpower_rate >= 100000) {
          valid = false;
          error.manpowerRateErr = true;
          error.manpowerRateMsg =
            "Please enter valid manpower rate under 10000 ";
        }

        if (isEmpty(stateBudget?.days?.toString()) || stateBudget?.days <= 0) {
          valid = false;
          error.daysErr = true;
          error.daysMsg = "Please enter the days";
        } else if (!positiveIntRegex.test(stateBudget?.days)) {
          valid = false;
          error.daysErr = true;
          error.daysMsg = "Please enter valid days";
        }
        //  else if (stateBudget?.days > totalDays) {
        //   valid = false;
        //   error.daysErr = true;
        //   error.daysMsg =
        //     "Days can't be more than the total assigned milestone duration";
        // }
      }
    }
    if (visibleAddBudget) {
      if (
        isEmpty(stateBudget?.milestone?.id?.toString()) ||
        stateBudget?.milestone === undefined ||
        stateBudget?.milestone === ""
      ) {
        valid = false;
        error.manpowerMilestoneErr = true;
        error.manpowerMilestoneMsg = "Please select the milestone";
      }
    } else {
      if (isEmpty(stateBudget?.milestone_id?.toString())) {
        valid = false;
        error.manpowerMilestoneErr = true;
        error.manpowerMilestoneMsg = "Please select the milestone";
      }
    }

    if (isEmpty(stateBudget?.specification)) {
      valid = false;
      error.specificationsErr = true;
      error.specificationsMsg = "Please enter the specification";
    }

    setErrObj(error);

    if (valid) {
      if (isUpdateModalVisible) {
        createSingleBudgetApiCall(stateBudget);
        updateSingleBudgetApiCall(stateBudget);
      }
      if (
        _.isObject(selectedMilestone?.data) &&
        !_.isEmpty(selectedMilestone?.data)
      ) {
        // const newArray = [...pendingMilestone]; // create a copy of the array
        // newArray[selectedMilestone?.index] = state; // modify the copy
        // setPendingMilestone(newArray);
        // setSelectedMilestone({});
      }
      clearData();
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
  async function updateMilestoneApiCall(dataOfMilestone) {
    setAnchorEl(null);
    setBtnUpdateLoader("update");
    const data = {
      status: dataOfMilestone?.status,
      id: dataOfMilestone?.id,
      milestone_name: dataOfMilestone?.milestone_name,
      start_date: dataOfMilestone?.start_date,
      end_date: dataOfMilestone?.end_date,
      amount: dataOfMilestone?.amount,
    };
    const endpoint = Setting.endpoints.updateMilestone;

    try {
      const response = await getApiData(endpoint, "POST", data);
      if (response?.success) {
        setTimeout(() => {
          setVisibleEditModal(false);
          toast.success(response?.message);
          getMilestoneList("pending");
        }, 1000);
      } else {
        toast.error(response?.message);
      }
      setBtnUpdateLoader("");
    } catch (error) {
      setBtnUpdateLoader("");
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }

  async function createSingleBudgetApiCall(dataOfBudget) {
    setAnchorElBudget(null);
    setBtnUpdateLoader("update");
    const data = {
      proposal_id: villa?.proposal_id,
      name: dataOfBudget?.name,
      material_type: dataOfBudget?.material_type,
      material_unit: dataOfBudget?.material_unit,
      material_unit_price: dataOfBudget?.material_unit_price,
      qty: dataOfBudget?.qty,
      milestone_id: dataOfBudget?.milestone?.id,
      manpower_rate: dataOfBudget?.manpower_rate,
      days: dataOfBudget?.days,
      specification: dataOfBudget?.specification,
      image: dataOfBudget.buget_image,
    };

    const endpoint = Setting.endpoints.createSingleBudget;

    try {
      const response = await getAPIProgressData(endpoint, "POST", data, true);
      if (response?.success) {
        setTimeout(() => {
          setVisibleBudgetModal(false);
          toast.success(response?.message);
          getMilestoneList("pending");
        }, 1000);
      } else {
        toast.error(response?.message);
      }
      setBtnUpdateLoader("");
    } catch (error) {
      setBtnUpdateLoader("");
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }
  async function updateSingleBudgetApiCall(dataOfBudgetUpdate) {
    setAnchorElBudget(null);
    setBtnUpdateLoader("update");
    const data = {
      status: dataOfBudgetUpdate?.status,
      id: dataOfBudgetUpdate?.id,
      name: dataOfBudgetUpdate?.name,
      material_type: dataOfBudgetUpdate?.material_type,
      material_unit: dataOfBudgetUpdate?.material_unit,
      material_unit_price: dataOfBudgetUpdate?.material_unit_price,
      qty: dataOfBudgetUpdate?.qty,
      milestone_id: dataOfBudgetUpdate?.milestone_id,
      manpower_rate: dataOfBudgetUpdate?.manpower_rate,
      days: dataOfBudgetUpdate?.days,
      specification: dataOfBudgetUpdate?.specification,
      image: dataOfBudgetUpdate?.buget_image,
    };

    const endpoint = Setting.endpoints.updateSingleBudget;

    try {
      const response = await getAPIProgressData(endpoint, "POST", data, true);
      if (response?.success) {
        setTimeout(() => {
          setVisibleBudgetModal(false);
          toast.success(response?.message);
          getMilestoneList("pending");
        }, 1000);
      } else {
        toast.error(response?.message);
      }
      setBtnUpdateLoader("");
    } catch (error) {
      setBtnUpdateLoader("");
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }
  async function handleDeleteBudget(budgetId) {
    setAnchorElBudget(null);
    setAnchorEl(null);
    setBtnUpdateLoader("update");
    try {
      const response = await getApiData(
        `${Setting.endpoints.budgetDelete}/${budgetId}`,
        "GET",
        {}
      );
      if (response?.success) {
        setTimeout(() => {
          setVisibleDeleteBudget(false);
          toast.success(response?.message);
          getMilestoneList("pending");
        }, 1000);
      } else {
        toast.error(response?.message);
      }
      setBtnUpdateLoader("");
    } catch (error) {
      setBtnUpdateLoader("");
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }
  async function handleDeleteMilestone(milestoneId) {
    setAnchorElBudget(null);
    setAnchorEl(null);
    setBtnUpdateLoader("update");
    try {
      const response = await getApiData(
        `${Setting.endpoints.milestoneDelete}/${milestoneId}`,
        "GET",
        {}
      );
      if (response?.success) {
        setTimeout(() => {
          setVisibleDelete(false);
          toast.success(response?.message);
          getMilestoneList("pending");
        }, 1000);
      } else {
        toast.error(response?.message);
      }
      setBtnUpdateLoader("");
    } catch (error) {
      setBtnUpdateLoader("");
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }
  return (
    <>
      <Grid container>
        {/* <Grid item container className={classes.contentContainer} mt={2}>
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

          <Grid container pb={2} wrap="nowrap" width={"99.99999999999999%"}>
            <div
              style={{
                width: `${Math.round(adjustedProgress1)}%`,
                display: "flex",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color.primary,
              }}
            >
              {!md ? (
                <Typography variant="body1" style={{ color: "#ffffff" }}>
                  Released: AED {Released}
                </Typography>
              ) : (
                <Typography variant="body1" style={{ color: "#ffffff" }}>
                  {Released}
                </Typography>
              )}
            </div>
            <div
              style={{
                width: `${Math.round(adjustedProgress2)}%`,
                display: "flex",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color.cardDescColor,
              }}
            >
              {!md ? (
                <Typography variant="body1" style={{ color: "#ffffff" }}>
                  In Escrow: AED {Escrow}
                </Typography>
              ) : (
                <Typography variant="body1" style={{ color: "#ffffff" }}>
                  {Escrow}
                </Typography>
              )}
            </div>
            <div
              style={{
                width: `${Math.round(adjustedProgress3)}%`,
                display: "flex",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color.verydarkgrey,
              }}
            >
              {!md ? (
                <Typography variant="body1" style={{ color: "#ffffff" }}>
                  Due: AED {Due}
                </Typography>
              ) : (
                <Typography variant="body1" style={{ color: "#ffffff" }}>
                  {Due}
                </Typography>
              )}
            </div>
          </Grid>
          {md && (
            <Grid
              item
              contaier
              sx={12}
              style={{
                width: "100%",
                paddingBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
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
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 5,
                    marginRight: 8,
                    backgroundColor: color.cardDescColor,
                  }}
                />
                <Typography>In escrow Amount</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 5,
                    marginRight: 8,
                    backgroundColor: color.verydarkgrey,
                  }}
                />
                <Typography>Due Amount</Typography>
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
        </Grid> */}
        {/* <Grid item container className={classes.contentContainer}>
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
                </Grid>
              </Grid>
            )
          )}
        </Grid> */}
        {/* {renderMilestoneCreateForm("form")} */}

        <Grid
          style={{ marginTop: 28, marginBottom: 28 }}
          container
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Grid item>
            <Typography className={classes.MainTitle}>Milestones</Typography>
          </Grid>

          <Grid item>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9997 9.17C16.8123 8.98375 16.5589 8.87921 16.2947 8.87921C16.0305 8.87921 15.7771 8.98375 15.5897 9.17L11.9997 12.71L8.4597 9.17C8.27234 8.98375 8.01889 8.87921 7.7547 8.87921C7.49052 8.87921 7.23707 8.98375 7.0497 9.17C6.95598 9.26297 6.88158 9.37357 6.83081 9.49543C6.78004 9.61729 6.75391 9.74799 6.75391 9.88C6.75391 10.012 6.78004 10.1427 6.83081 10.2646C6.88158 10.3864 6.95598 10.497 7.0497 10.59L11.2897 14.83C11.3827 14.9237 11.4933 14.9981 11.6151 15.0489C11.737 15.0997 11.8677 15.1258 11.9997 15.1258C12.1317 15.1258 12.2624 15.0997 12.3843 15.0489C12.5061 14.9981 12.6167 14.9237 12.7097 14.83L16.9997 10.59C17.0934 10.497 17.1678 10.3864 17.2186 10.2646C17.2694 10.1427 17.2955 10.012 17.2955 9.88C17.2955 9.74799 17.2694 9.61729 17.2186 9.49543C17.1678 9.37357 17.0934 9.26297 16.9997 9.17Z"
                fill="black"
              />
            </svg>
          </Grid>
        </Grid>

        <Grid container display={"flex"} justifyContent={"space-between"}>
          <Grid item xl={6}>
            <Typography
              style={{ fontSize: 14 }}
              variant="caption"
              color={"#8C92A4"}
            >
              End date
            </Typography>
            <Typography style={{ fontSize: 18 }} fontFamily={"Poppins-Regular"}>
              March 12, 2023
            </Typography>
          </Grid>
          <Grid item xl={6}>
            <Typography
              style={{ fontSize: 14 }}
              variant="caption"
              color={"#8C92A4"}
            >
              Amount
            </Typography>
            <Typography style={{ fontSize: 18 }} fontFamily={"Poppins-Regular"}>
              $1,500
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid item container py={2}>
          <Typography className={classes.MainTitle}>Items:</Typography>
        </Grid> */}
        <Grid
          item
          container
          xs={12}
          style={{ borderBottom: "1px solid #F2F3F4" }}
          justifyContent={"space-between"}
        >
          <Grid item xs={12}>
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
                      {_.find(milestoneCount, { type: "completed" })?.value ||
                        0}
                    </span>
                  </Typography>
                }
              />
            </Tabs>
          </Grid>
        </Grid>
        {villa?.is_modified && (
          <Grid item xs={12} textAlign={"end"}>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: 20, marginBottom: 10 }}
              onClick={() =>
                navigate("/create-proposal", {
                  state: {
                    villa,
                    // fromManageProject,
                  },
                })
              }
            >
              Add Milestone
            </Button>
          </Grid>
        )}
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
                      <div>
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: "18px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            color: "#030F1C",
                          }}
                          fontFamily={"Poppins-Regular"}
                        >
                          {milestone?.milestone_name}
                        </Typography>
                      </div>
                      {/* {milestone?.payment_status === "pending" ||
                      milestone?.payment_status === "" ? ( */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          wrap: "no-wrap",
                        }}
                      >
                        {milestone?.payment_status === "pending" ||
                        milestone?.payment_status === "" ? null : (
                          <div
                            style={{
                              padding: 8,
                              border: `1px solid ${color.primary}`,
                              backgroundColor: color.primary,
                              borderRadius: 4,
                              width: "max-content",
                            }}
                          >
                            <span style={{ color: color.white }}>
                              {milestone?.payment_status === "completed"
                                ? "Paid"
                                : milestone?.payment_status === "requested"
                                ? "Requested"
                                : "Payment under review"}
                            </span>
                          </div>
                        )}
                        <IconButton
                          onClick={(e) => handleRowClick(e, milestone, index)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </div>
                      {/* ) : ( */}

                      {/* )} */}
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      py={2}
                    >
                      <Grid item xl={6}>
                        <Typography
                          style={{ fontSize: 14 }}
                          variant="caption"
                          color={"#8C92A4"}
                        >
                          End date
                        </Typography>
                        <Typography
                          style={{ fontSize: 18 }}
                          fontFamily={"Poppins-Regular"}
                        >
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>

                      <Grid item xl={6}>
                        <Typography
                          style={{ fontSize: 14 }}
                          variant="caption"
                          color={"#8C92A4"}
                        >
                          Amount
                        </Typography>
                        <Typography
                          style={{ fontSize: 18 }}
                          fontFamily={"Poppins-Regular"}
                        >
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
                          alignItems: "start",
                          justifyContent: "start",
                          width: "100%",
                          cursor: "pointer",
                          fontSize: "16px",
                          lineHeight: "24px",
                          fontFamily: "Poppins-Regular",
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
                              fontFamily: "Poppins-SemiBold",
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
                              fontFamily: "Poppins-SemiBold",
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
                              fontFamily: "Poppins-SemiBold",
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
                                    <Grid
                                      item
                                      container
                                      xs={12}
                                      justifyContent={"space-between"}
                                    >
                                      <Typography
                                        fontFamily={"Poppins-Regular"}
                                        fontWeight="bold"
                                        pl={1}
                                      >
                                        {item?.name}
                                      </Typography>
                                      <IconButton
                                        onClick={(e) => {
                                          handleRowClick1(
                                            e,
                                            milestone,
                                            item,
                                            index
                                          );
                                        }}
                                      >
                                        <MoreVertIcon />
                                      </IconButton>
                                    </Grid>
                                    <TableContainer
                                      style={{
                                        padding: 10,
                                        boxSizing: "border-box",
                                      }}
                                    >
                                      <Table className={classes.customtable}>
                                        <Typography
                                          fontFamily={"Poppins-Regular"}
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
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Manpower rate
                                            </TableCell>

                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Days
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Amount
                                            </TableCell>
                                          </TableRow>
                                          <TableRow key={"Manpower"}>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.manpower_rate || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.days || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
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
                                          fontFamily={"Poppins-Regular"}
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
                                                  "Poppins-Regular !important",
                                              }}
                                            >
                                              Material Type
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                            >
                                              Material Unit
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Unit Price
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Quantity
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Amount
                                            </TableCell>
                                          </TableRow>
                                          <TableRow key={"Manpower"}>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.material_type || "-"}
                                              </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.material_unit || "-"}
                                              </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                AED{" "}
                                                {item?.material_unit_price ||
                                                  "0"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.qty || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
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
                      {villa?.is_modified && (
                        <Button
                          color="primary"
                          variant="contained"
                          style={{ marginTop: 20, marginBottom: 10 }}
                          onClick={() => {
                            setVisibleBudgetModal(true);
                            setVisibleAddBudget(true);
                            setMilestoneName([milestone]);
                            setStateBudget({
                              name: "",
                              photo_url: [],
                              buget_image: [],
                              material_type: "",
                              material_unit: "",
                              material_unit_price: "",
                              qty: "",
                              manpower_rate: "",
                              days: "",
                              milestone: milestone,
                              specification: "",
                            });
                          }}
                        >
                          Add Budget
                        </Button>
                      )}
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
                      <Typography variant="h6" fontFamily={"Poppins-Regular"}>
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
                        <Typography fontFamily={"Poppins-SemiBold"}>
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Status
                        </Typography>
                        <Typography fontFamily={"Poppins-SemiBold"}>
                          {_.capitalize(milestone?.status) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Amount
                        </Typography>
                        <Typography fontFamily={"Poppins-SemiBold"}>
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
                              fontFamily: "Poppins-SemiBold",
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
                              fontFamily: "Poppins-SemiBold",
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
                              fontFamily: "Poppins-SemiBold",
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
                                        fontFamily={"Poppins-Regular"}
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
                                          fontFamily={"Poppins-Regular"}
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
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Manpower rate
                                            </TableCell>

                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Days
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Amount
                                            </TableCell>
                                          </TableRow>
                                          <TableRow key={"Manpower"}>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.manpower_rate || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.days || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
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
                                          fontFamily={"Poppins-Regular"}
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
                                                  "Poppins-Regular !important",
                                              }}
                                            >
                                              Material Type
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                            >
                                              Material Unit
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Unit Price
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Quantity
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Amount
                                            </TableCell>
                                          </TableRow>
                                          <TableRow key={"Manpower"}>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.material_type || "-"}
                                              </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.material_unit || "-"}
                                              </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                AED{" "}
                                                {item?.material_unit_price ||
                                                  "0"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.qty || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
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
                      <Typography variant="h6" fontFamily={"Poppins-Regular"}>
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
                        <Typography fontFamily={"Poppins-SemiBold"}>
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Status
                        </Typography>
                        <Typography fontFamily={"Poppins-SemiBold"}>
                          Delivered
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Amount
                        </Typography>
                        <Typography fontFamily={"Poppins-SemiBold"}>
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
                              fontFamily: "Poppins-SemiBold",
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
                              fontFamily: "Poppins-SemiBold",
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
                              fontFamily: "Poppins-SemiBold",
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
                                <Grid item container xs={12} md={9}>
                                  <Grid item container xs={12}>
                                    <Typography
                                      fontFamily={"Poppins-Regular"}
                                      fontWeight="bold"
                                      pl={1}
                                    >
                                      {item?.name}
                                    </Typography>
                                    <IconButton
                                      onClick={() => {}}
                                      //   handleRowClick(e, milestone, index)
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                  </Grid>
                                  <TableContainer
                                    style={{
                                      padding: 10,
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    <Table className={classes.customtable}>
                                      <Typography
                                        fontFamily={"Poppins-Regular"}
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
                                                "Poppins-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Manpower rate
                                          </TableCell>

                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Poppins-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Days
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Poppins-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"Poppins-Regular"}
                                            >
                                              {item?.manpower_rate || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"Poppins-Regular"}
                                            >
                                              {item?.days || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"Poppins-Regular"}
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
                                        fontFamily={"Poppins-Regular"}
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
                                                "Poppins-Regular !important",
                                            }}
                                          >
                                            Material Type
                                          </TableCell>
                                          <TableCell
                                            align="right"
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Poppins-Regular !important",
                                            }}
                                          >
                                            Material Unit
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Poppins-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Unit Price
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Poppins-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Quantity
                                          </TableCell>
                                          <TableCell
                                            style={{
                                              color: color.captionText,
                                              fontFamily:
                                                "Poppins-Regular !important",
                                            }}
                                            align="right"
                                          >
                                            Amount
                                          </TableCell>
                                        </TableRow>
                                        <TableRow key={"Manpower"}>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"Poppins-Regular"}
                                            >
                                              {item?.material_type || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"Poppins-Regular"}
                                            >
                                              {item?.material_unit || "-"}
                                            </Typography>
                                          </TableCell>

                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"Poppins-Regular"}
                                            >
                                              AED{" "}
                                              {item?.material_unit_price || "0"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"Poppins-Regular"}
                                            >
                                              {item?.qty || "-"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              fontFamily={"Poppins-Regular"}
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
                      <Typography variant="h6" fontFamily={"Poppins-Regular"}>
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
                        <Typography fontFamily={"Poppins-SemiBold"}>
                          {milestone.end_date
                            ? moment(milestone.end_date).format("MMMM DD, YYYY")
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Status
                        </Typography>
                        <Typography fontFamily={"Poppins-SemiBold"}>
                          {_.capitalize(milestone?.status) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item xl={4}>
                        <Typography variant="caption" color={"#8C92A4"}>
                          Amount
                        </Typography>
                        <Typography fontFamily={"Poppins-SemiBold"}>
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
                              fontFamily: "Poppins-SemiBold",
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
                              fontFamily: "Poppins-SemiBold",
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
                              fontFamily: "Poppins-SemiBold",
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
                                        fontFamily={"Poppins-Regular"}
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
                                          fontFamily={"Poppins-Regular"}
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
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Manpower rate
                                            </TableCell>

                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Days
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Amount
                                            </TableCell>
                                          </TableRow>
                                          <TableRow key={"Manpower"}>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.manpower_rate || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.days || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
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
                                          fontFamily={"Poppins-Regular"}
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
                                                  "Poppins-Regular !important",
                                              }}
                                            >
                                              Material Type
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                            >
                                              Material Unit
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Unit Price
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Quantity
                                            </TableCell>
                                            <TableCell
                                              style={{
                                                color: color.captionText,
                                                fontFamily:
                                                  "Poppins-Regular !important",
                                              }}
                                              align="right"
                                            >
                                              Amount
                                            </TableCell>
                                          </TableRow>
                                          <TableRow key={"Manpower"}>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.material_type || "-"}
                                              </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.material_unit || "-"}
                                              </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                AED{" "}
                                                {item?.material_unit_price ||
                                                  "0"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
                                              >
                                                {item?.qty || "-"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography
                                                fontFamily={"Poppins-Regular"}
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
      </Grid>
      <ConfirmModel
        visible={visibleDeleteBudget}
        handleClose={() => setVisibleDeleteBudget(false)}
        confirmation={() => {
          handleDeleteBudget(selectedBudget?.data?.id);
        }}
        message={`Are you sure you want to delete ${selectedBudget?.data?.name} Budget?`}
        loader={btnUpdateLoader === "update" ? true : false}
      />
      <ConfirmModel
        visible={visibleDelete}
        handleClose={() => setVisibleDelete(false)}
        confirmation={() => {
          handleDeleteMilestone(selectedMilestone?.data?.id);
        }}
        message={`Are you sure you want to delete ${selectedMilestone?.data?.milestone_name} milestone?`}
        loader={btnUpdateLoader === "update" ? true : false}
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
        {tabValue === 0 && (
          <MenuItem
            style={{ fontFamily: "Poppins-Regular" }}
            disabled={
              selectedMilestone?.data?.payment_status === "pending" ||
              selectedMilestone?.data?.payment_status === ""
                ? false
                : true
            }
            onClick={() => {
              if (
                selectedMilestone?.data?.payment_status === "pending" ||
                selectedMilestone?.data?.payment_status === ""
              ) {
              }
              handePayment();
            }}
          >
            {selectedMilestone?.data?.payment_status === "pending" ||
            selectedMilestone?.data?.payment_status === ""
              ? "Request Payment"
              : "Requested for payment"}
          </MenuItem>
        )}
        {tabValue !== 0 && (
          <MenuItem
            style={{ fontFamily: "Poppins-Regular" }}
            onClick={handePayment}
          >
            Submit Milestone
          </MenuItem>
        )}
        <MenuItem
          style={{ fontFamily: "Poppins-Regular" }}
          disabled={
            selectedMilestone?.data?.payment_status === "completed"
              ? true
              : false
          }
          onClick={handleEdit}
        >
          Edit
        </MenuItem>
        <MenuItem
          style={{ fontFamily: "Poppins-Regular" }}
          disabled={
            selectedMilestone?.data?.payment_status === "completed"
              ? true
              : false
          }
          onClick={() => {
            setVisibleDelete(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Menu
        id={`budget-menu1`}
        anchorEl={anchorElBudget}
        open={Boolean(anchorElBudget)}
        onClose={handleClose1}
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
        <MenuItem
          disabled={
            selectedMilestone?.data?.payment_status === "completed"
              ? true
              : false
          }
          onClick={handleEditBudget}
        >
          Edit
        </MenuItem>
        <MenuItem
          disabled={
            selectedMilestone?.data?.payment_status === "completed"
              ? true
              : false
          }
          onClick={() => {
            setVisibleDeleteBudget(true);
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
              <Typography
                fontFamily="Poppins-Regular"
                className={classes.forgotHeaderText}
              >
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
                      validateMilestone(true);
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
      {visibleBudgetModal ? (
        <Modal
          open={visibleBudgetModal}
          onClose={() => {
            if (btnUpdateLoader === "update") {
              return null;
            } else {
              setVisibleBudgetModal(false);
            }
            clearData();
          }}
          closeAfterTransition
          disableAutoFocus
          slotProps={{ backdrop: Backdrop }}
          style={{ overflowY: "scroll" }}
        >
          <Fade in={visibleBudgetModal}>
            <Box sx={style}>
              <Grid
                container
                style={{ height: 600, overflow: "auto" }}
                justifyContent="center"
                alignItems="center"
              >
                <Typography className={classes.forgotHeaderText}>
                  {visibleAddBudget
                    ? "Add Budget Details"
                    : "Update Budget Details"}
                </Typography>
                <Grid item xs={12}>
                  {visibleAddBudget
                    ? renderBudgetCreateForm("modal")
                    : renderBudgetCreateForm("modal")}
                </Grid>
              </Grid>
              <Grid
                item
                container
                columnGap={1}
                justifyContent={"space-between"}
                alignItems="end"
              >
                <Grid item xs={5.7}>
                  <Button
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20, marginBottom: 20 }}
                    onClick={() => {
                      setVisibleAddBudget(false);
                      setVisibleBudgetModal(false);
                      clearData();
                    }}
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
                      setVisibleAddBudget(false);
                      validate(true);
                    }}
                  >
                    {btnUpdateLoader === "update" ? (
                      <CircularProgress style={{ color: "#fff" }} size={26} />
                    ) : visibleAddBudget ? (
                      "Add"
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      ) : null}
    </>
  );
}
