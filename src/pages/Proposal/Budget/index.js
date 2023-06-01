import {
  Button,
  CircularProgress,
  Collapse,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListItemButton,
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
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles";
import { HighlightOffOutlined, ImageOutlined } from "@mui/icons-material";
import { color } from "../../../config/theme";
import CInput from "../../../components/CInput";
import { useTheme } from "@emotion/react";
import Images from "../../../config/images";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import _, { isArray, isEmpty, isNull, isObject } from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Setting } from "../../../utils/Setting";
import { toast } from "react-toastify";
import { getAPIProgressData, getApiData } from "../../../utils/APIHelper";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import ConfirmModel from "../../../components/ConfirmModel";
import CAutocomplete from "../../../components/CAutocomplete";
import ProfileSuccessModal from "../../../components/ProfileSuccessModal";
import moment from "moment";

const errorObj = {
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

export default function Budget(props) {
  const { handleClick = () => null, villa, createProposal, dpId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { proposalDetails } = useSelector((state) => state.auth);

  const { setProposalDetails } = authActions;

  const initialFormvalues = {
    name: "",
    photo_url: [],
    photo_origin: [],
    material_type: "",
    material_unit: "",
    material_unit_price: "",
    qty: "",
    manpower_rate: "",
    days: "",
    milestone: null,
    specification: "",
    updatedAt: moment().format("MMMM DD, YYYY"),
  };
  const [state, setState] = useState(initialFormvalues);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [budgetLoader, setBudgetLoader] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleLoader, setVisibleLoader] = useState(false);
  const [alreadySubmittedPop, setAlreadySubmittedPop] = useState(false);
  const [alreadySubmittedPopLoader, setAlreadySubmittedPopLoader] =
    useState(false);
  const [visibleFinal, setVisibleFinal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [submitLoader, setsubmitLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [proposalModal, setProposalModal] = useState(false);

  const [errObj, setErrObj] = useState(errorObj);

  const fileInputRef = useRef();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? 300 : 600,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    padding: "25px 25px 0px 25px",
  };

  const [amounts, setAmounts] = useState([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [btnUpdateLoader, setBtnUpdateLoader] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getBudgetList();
    getMilestoneList();
  }, []);

  useEffect(() => {
    if (
      _.isObject(proposalDetails?.budget_details?.formvalues?.milestone) &&
      proposalDetails?.budget_details?.formvalues?.milestone?.id
    ) {
      const milestoneValue = milestones.find(
        (milestone) =>
          milestone.id ===
          proposalDetails?.budget_details?.formvalues?.milestone?.id
      );
      setState({
        ...proposalDetails?.budget_details?.formvalues,
        milestone: milestoneValue,
      });
    }
  }, [milestones]);

  useEffect(() => {
    const array = [];

    budgetDetails.map((bud) => {
      let count =
        parseInt(bud.material_unit_price || 0) * parseInt(bud.qty || 0) +
        parseInt(bud.manpower_rate || 0) * parseInt(bud.days || 0);
      array.push(count);
    });
    setAmounts(array);
  }, [budgetDetails]);

  async function getBudgetList() {
    setBudgetLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.budgetList}/${createProposal ? dpId : villa?.id}`,
        "GET",
        {}
      );
      if (response.success) {
        if (
          proposalDetails?.budget_details?.previous ||
          (isArray(proposalDetails?.budget_details?.budgets) &&
            !isEmpty(proposalDetails?.budget_details?.budgets))
        ) {
          setBudgetDetails(proposalDetails?.budget_details?.budgets);
        } else if (
          !proposalDetails?.budget_details?.previous &&
          isArray(response?.data) &&
          !isEmpty(response?.data)
        ) {
          const modifiedArray = response?.data?.map((item) => ({
            ...item,
            photo_origin: item.photo_url,
          }));
          setBudgetDetails(modifiedArray);
        } else {
          setBudgetDetails([]);
        }
      }
      setBudgetLoader(false);
    } catch (error) {
      setBudgetLoader(false);
      console.log("err===>", error);
    }
  }

  const handleChange = (e, i) => {
    let dummyarr = [...budgetDetails];
    dummyarr[i].expanded = !dummyarr[i].expanded;
    setBudgetDetails(dummyarr);
  };

  const validate = (isUpdateModalVisible) => {
    const error = { ...errObj };
    let valid = true;

    if (!isArray(state.photo_url) || isEmpty(state.photo_url)) {
      valid = false;
      error.photoErr = true;
      error.photoMsg = "Please upload photo";
    }

    if (isEmpty(state.name?.trim())) {
      valid = false;
      error.bNameErr = true;
      error.bNameMsg = "Please enter the name";
    } else if (state?.name?.length > 50) {
      valid = false;
      error.bNameErr = true;
      error.bNameMsg = "Please enter the name less then 50 characters";
    }

    if (isEmpty(state.material_type?.trim())) {
      valid = false;
      error.materialTypeErr = true;
      error.materialTypeMsg = "Please enter the material type";
    }

    const positiveIntRegex = /^[1-9]\d*$/;
    const regex = /^\d+(\.\d+)?$/;

    if (
      isEmpty(state.material_unit_price?.toString()) &&
      isEmpty(state.material_type?.toString()) &&
      isEmpty(state?.manpower_rate?.toString()) &&
      isEmpty(state?.days?.toString()) &&
      isEmpty(state?.qty?.toString()) &&
      isEmpty(state?.material_unit)
    ) {
      if (isEmpty(state.material_unit_price?.toString())) {
        valid = false;
        error.materialUnitPriceErr = true;
        error.materialUnitPriceMsg = "Please enter the material unit price";
      } else if (
        !regex.test(state.material_unit_price) ||
        parseInt(state.material_unit_price) <= 0
      ) {
        valid = false;
        error.materialUnitPriceErr = true;
        error.materialUnitPriceMsg = "Please enter valid material unit price";
      }
      if (isEmpty(state?.qty?.toString())) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please select the material qty";
      } else if (!positiveIntRegex.test(state?.qty)) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please enter valid material qty";
      }

      if (isEmpty(state.material_unit)) {
        valid = false;
        error.unitErr = true;
        error.unitMsg = "Please enter material unit";
      }

      if (isEmpty(state?.manpower_rate?.toString())) {
        valid = false;
        error.manpowerRateErr = true;
        error.manpowerRateMsg = "Please enter the manpower rate";
      }

      if (isEmpty(state?.days?.toString())) {
        valid = false;
        error.daysErr = true;
        error.daysMsg = "Please select the days";
      } else if (!positiveIntRegex.test(state?.days)) {
        valid = false;
        error.daysErr = true;
        error.daysErr = "Please enter valid days";
      }
    } else if (
      !isEmpty(state.material_unit_price?.toString()) ||
      !isEmpty(state.material_unit) ||
      !isEmpty(state?.qty?.toString())
    ) {
      if (!state.material_unit_price) {
        valid = false;
        error.materialUnitPriceErr = true;
        error.materialUnitPriceMsg = "Please enter the material unit price";
      } else if (
        !regex.test(state.material_unit_price) ||
        parseInt(state.material_unit_price) <= 0
      ) {
        valid = false;
        error.materialUnitPriceErr = true;
        error.materialUnitPriceMsg = "Please enter valid material unit price";
      }
      if (isEmpty(state?.qty?.toString())) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please select the material qty";
      } else if (!positiveIntRegex.test(state?.qty)) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please enter valid material qty";
      }
      if (state?.qty >= 100000) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please enter Quantity less then 100000";
      }
      if (state.manpower_rate >= 100000) {
        valid = false;
        error.manpowerRateErr = true;
        error.manpowerRateMsg = "Please enter valid manpower rate under 10000 ";
      }
      if (state?.days >= 365) {
        valid = false;
        error.daysErr = true;
        error.daysMsg = "Please enter days under 365";
      }

      if (isEmpty(state.material_unit)) {
        valid = false;
        error.unitErr = true;
        error.unitMsg = "Please enter material unit";
      }
    } else if (
      !isEmpty(state?.manpower_rate?.toString()) ||
      !isEmpty(state?.days?.toString())
    ) {
      if (isEmpty(state?.manpower_rate?.toString())) {
        valid = false;
        error.manpowerRateErr = true;
        error.manpowerRateMsg = "Please enter the manpower rate";
      } else if (!regex.test(state.manpower_rate)) {
        valid = false;
        error.manpowerRateErr = true;
        error.manpowerRateMsg = "Please enter valid manpower rate under 100";
      }

      if (isEmpty(state?.days?.toString())) {
        valid = false;
        error.daysErr = true;
        error.daysMsg = "Please select the days";
      } else if (!positiveIntRegex.test(state?.days)) {
        valid = false;
        error.quantityErr = true;
        error.quantityMsg = "Please enter valid days";
      }
    }

    if (
      isEmpty(state?.milestone?.id?.toString()) ||
      state?.milestone === undefined ||
      state?.milestone === ""
    ) {
      valid = false;
      error.manpowerMilestoneErr = true;
      error.manpowerMilestoneMsg = "Please select the milestone";
    }

    if (isEmpty(state?.specification)) {
      valid = false;
      error.specificationsErr = true;
      error.specificationsMsg = "Please enter the specification";
    }
    setErrObj(error);

    if (valid) {
      if (isUpdateModalVisible) {
        setVisibleEditModal(false);
      }
      if (
        _.isObject(selectedBudget?.data) &&
        !_.isEmpty(selectedBudget?.data)
      ) {
        const newArray = [...budgetDetails]; // create a copy of the array
        newArray[selectedBudget?.index] = state; // modify the copy
        setBudgetDetails(newArray);
        setSelectedBudget({});
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            budget_details: {
              ...proposalDetails.budget_details,
              budgets: newArray,
            },
          })
        );
      } else {
        setBudgetDetails((arr) => [...arr, state]);
        let budget_details = {
          formvalues: {},
          budgets: budgetDetails ? [...budgetDetails, state] : [state],
        };

        setTimeout(() => {
          dispatch(
            setProposalDetails({
              ...proposalDetails,
              budget_details,
            })
          );
        }, 500);
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
      previous: true,
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
    setVisibleEditModal(true);
    setErrObj(errorObj);

    if (!selectedBudget) {
      return; // or handle the error in some other way
    }

    const { data: selectedData } = selectedBudget;

    const milestoneObj = milestones?.find((item) => {
      if (selectedData?.milestone_id) {
        return selectedData?.milestone_id?.toString() === item?.id?.toString();
      } else {
        return selectedData?.milestone?.id?.toString() === item?.id?.toString();
      }
    });

    const nextState = {
      ...selectedData,
      milestone: milestoneObj,
      updatedAt: moment().format("MMMM DD, YYYY"),
      photo_origin: selectedData?.photo_url?.image
        ? [selectedData.photo_url]
        : selectedData?.photo_origin,
    };

    setState(nextState);
    handleClose();
  };

  const handleDelete = () => {
    if (selectedBudget?.data?.id) {
      deleteBudget();
    } else {
      const newItems = [...budgetDetails]; // Create a copy of the array
      newItems.splice(selectedBudget?.index, 1); // Delete the object at the specified index
      setBudgetDetails(newItems);
      setVisible(false);
      setSelectedBudget(null);
      handleClose();
      dispatch(
        setProposalDetails({
          ...proposalDetails,
          budget_details: {
            ...proposalDetails.budget_details,
            budgets: newItems,
          },
        })
      );
    }
  };

  async function deleteBudget() {
    setVisibleLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.deleteBudget}/${selectedBudget?.data?.id}`,
        "GET"
      );
      if (response.success) {
        toast.success(response.message);
        const newItems = [...budgetDetails]; // Create a copy of the array
        newItems.splice(selectedBudget?.index, 1); // Delete the object at the specified index
        setBudgetDetails(newItems);
        setVisible(false);
        setSelectedBudget(null);
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            budget_details: {
              ...proposalDetails.budget_details,
              budgets: newItems,
            },
          })
        );
        handleClose();
      } else {
        toast.error(response.message);
      }
      setVisibleLoader(false);
    } catch (error) {
      console.log("error===>>>>", error);
      toast.error(error.toString());
    }
    setVisibleLoader(false);
  }

  async function getMilestoneList() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.milestoneProposalList}/${
          createProposal ? dpId : villa?.id
        }`,
        "GET",
        {}
      );
      if (response.success) {
        setMilestones(response?.data);
      }
    } catch (error) {
      console.log("err===>", error);
    }
  }

  async function addBudget() {
    setButtonLoader(true);
    setAlreadySubmittedPopLoader(true);
    const extractedData = budgetDetails?.map((item) => {
      return {
        name: item?.name,
        material_type: item?.material_type,
        material_unit: item?.material_unit,
        material_unit_price: item?.material_unit_price,
        qty: item?.qty,
        milestone_id: item?.milestone?.id,
        manpower_rate: item?.manpower_rate,
        days: item?.days,
        specification: item?.specification,
        image: item?.photo_url,
      };
    });

    const data = createProposal
      ? {
          proposal_id: dpId,
          email: proposalDetails?.email,
          budget_item: extractedData,
        }
      : {
          proposal_id: villa?.id,
          budget_item: extractedData,
        };

    try {
      const response = await getApiData(
        Setting.endpoints.createBudget,
        "POST",
        data
      );

      if (response.success) {
        toast.success(response.message);
        setAlreadySubmittedPop(false);
        setVisibleFinal(false);
        setProposalModal(true);
        dispatch(setProposalDetails({}));
      } else {
        toast.error(response.message);
      }
      setButtonLoader("");
      setAlreadySubmittedPopLoader(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:330 ~ addPortfolio ~ error:", error);
      toast.error(error.toString());
      setButtonLoader("");
      setAlreadySubmittedPopLoader(false);
    }
  }

  async function checkSubmitted() {
    setsubmitLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.alreadySentProposal}/${villa?.proposal_id}`,
        "GET",
        {}
      );
      if (response.success) {
        setAlreadySubmittedPop(true);
      } else {
        setVisibleFinal(true);
      }
      setsubmitLoader(false);
    } catch (error) {
      setsubmitLoader(false);
      console.log("err===>", error);
    }
  }

  const handleSubmit = () => {
    if (isArray(budgetDetails) && !isEmpty(budgetDetails)) {
      checkSubmitted();
      // setVisibleFinal(true);
    } else {
      validate(false);
      // toast.warning("Please add atleast one milestone");
    }
  };

  function clearData() {
    setState(initialFormvalues);
    setErrObj(errorObj);
  }

  async function UploadFile(img) {
    setUploadLoader(true);
    const data = {
      image: img,
    };
    try {
      const response = await getAPIProgressData(
        Setting.endpoints.uploadTemplate,
        "POST",
        data,
        true
      );
      if (response.success) {
        const nArr = state.photo_url ? [...state.photo_url] : [];
        response?.data?.map((item) => nArr.push(item));

        const nArr1 = state.photo_origin ? [...state.photo_origin] : [];
        for (let i = 0; i < img.length; i++) {
          const base64Data = await convertToBase64(img[i]);
          nArr1.push(base64Data);
        }
        setState({ ...state, photo_url: nArr, photo_origin: nArr1 });

        setErrObj({
          ...errObj,
          photoErr: false,
          photoMsg: "",
        });
      } else {
        toast.error(response.message);
      }
      setUploadLoader("");
    } catch (error) {
      console.log("error", error);
      toast.error(error.toString());
      setUploadLoader("");
    }
  }

  async function deletePhoto(id, ind) {
    try {
      const response = await getApiData(
        `${Setting.endpoints.deleteTemplate}/${id}`,
        "GET",
        {}
      );
      if (response?.success) {
        toast.success(response?.message);
        const nArr = [...state.photo_url];
        nArr.splice(ind, 1);
        const nArr1 = [...state.photo_origin];
        nArr1.splice(ind, 1);
        setState({ ...state, photo_url: nArr, photo_origin: nArr1 });
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Somthing went wromg try again later");
    }
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

  function checkImgSize(img) {
    let valid = true;
    if (img.size > 3145728) {
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }

  function displayImagesView(mode) {
    if (isArray(state.photo_origin) && state?.photo_origin?.length > 0) {
      if (mode === "form" && visibleEditModal) {
        return null;
      } else {
        return state?.photo_origin?.map((item, index) => {
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
                    fontFamily: "Roobert-Regular",
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
                <HighlightOffOutlined
                  style={{
                    zIndex: 10,
                    cursor: "pointer",
                    fontSize: 28,
                    color: "#8C92A4",
                  }}
                  onClick={() => {
                    let uploadID = "";
                    if (state?.photo_url[index]?.image) {
                      const nArr = [...state.photo_origin];
                      const nArr1 = [...state.photo_url];
                      nArr.splice(index, 1);
                      nArr1.splice(index, 1);
                      setState({
                        ...state,
                        photo_origin: nArr,
                        photo_url: nArr1,
                      });
                    }
                    uploadID = state?.photo_url[index]?.image_id;
                    uploadID?.toString() && deletePhoto(uploadID, index);
                  }}
                />
              </div>
            </div>
          );
        });
      }
    }
  }

  function clearErr() {
    setErrObj({
      ...errObj,
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
          ((mode === "form" && visibleEditModal === false) ||
            (mode === "modal" && visibleEditModal)) ? (
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
                  const newArr = [...state?.photo_url];
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
                  let shouldUpload =
                    isArray(newArr) &&
                    !isEmpty(newArr) &&
                    newArr?.filter((elem) => !elem?.image_id);
                  if (shouldUpload) {
                    UploadFile(shouldUpload);
                  }
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
          )}
        </Grid>

        <Grid
          item
          style={{
            marginTop: state?.photo_url?.length > 0 && 40,
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
              mode === "modal" && visibleEditModal
                ? state.name
                : mode === "form" && visibleEditModal
                ? ""
                : state.name
            }
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
              setErrObj({
                ...errObj,
                bNameErr: false,
                bNameMsg: "",
              });
            }}
            inputProps={{ maxLength: 50 }}
            error={
              mode === "modal" && visibleEditModal
                ? errObj.bNameErr
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.bNameErr
            }
            helpertext={
              mode === "modal" && visibleEditModal
                ? errObj.bNameMsg
                : mode === "form" && visibleEditModal
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
              mode === "modal" && visibleEditModal
                ? state.material_type
                : mode === "form" && visibleEditModal
                ? ""
                : state.material_type
            }
            onChange={(e) => {
              setState({ ...state, material_type: e.target.value });
              setErrObj({
                ...errObj,
                materialTypeErr: false,
                materialTypeMsg: "",
              });
            }}
            inputProps={{ maxLength: 50 }}
            error={
              mode === "modal" && visibleEditModal
                ? errObj.materialTypeErr
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.materialTypeErr
            }
            helpertext={
              mode === "modal" && visibleEditModal
                ? errObj.materialTypeMsg
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.materialTypeMsg
            }
          />
        </Grid>
        <Grid item container columnGap={1} wrap={md ? "wrap" : "nowrap"}>
          <Grid item xs={12} md={4} id="Unit">
            {/* <CInput
              label="Material unit:"
              placeholder="Enter material unit"
              value={state.material_unit}
              onChange={(e) => {
                setState({ ...state, material_unit: e.target.value });
                setErrObj({
                  ...errObj,
                  unitErr: false,
                  unitMsg: "",
                });
              }}
              error={errObj.unitErr}
              helpertext={errObj.unitMsg}
            /> */}
            <CAutocomplete
              label="Material unit:"
              placeholder="Enter material unit"
              value={
                mode === "modal" && visibleEditModal
                  ? state.material_unit
                  : mode === "form" && visibleEditModal
                  ? ""
                  : state.material_unit
              }
              onChange={(e, newValue) => {
                setState({ ...state, material_unit: newValue });
                clearErr();
              }}
              options={["tonns", "Kg", "g", "lbs", "liter", "ml", "sqm"]}
              getOptionLabel={(option) => option}
              error={
                mode === "modal" && visibleEditModal
                  ? errObj.unitErr
                  : mode === "form" && visibleEditModal
                  ? ""
                  : errObj.unitErr
              }
              helpertext={
                mode === "modal" && visibleEditModal
                  ? errObj.unitMsg
                  : mode === "form" && visibleEditModal
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
                mode === "modal" && visibleEditModal
                  ? state.material_unit_price
                  : mode === "form" && visibleEditModal
                  ? ""
                  : state.material_unit_price
              }
              type="number"
              onChange={(e) => {
                const bool = /^[0-9]+(?:\.[0-9]+)?$/.test(
                  Number(e.target.value)
                );
                if (bool) {
                  setState({
                    ...state,
                    material_unit_price: e.target.value,
                  });
                }
                clearErr();
              }}
              error={
                mode === "modal" && visibleEditModal
                  ? errObj.materialUnitPriceErr
                  : mode === "form" && visibleEditModal
                  ? ""
                  : errObj.materialUnitPriceErr
              }
              helpertext={
                mode === "modal" && visibleEditModal
                  ? errObj.materialUnitPriceMsg
                  : mode === "form" && visibleEditModal
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
                mode === "modal" && visibleEditModal
                  ? state.qty
                  : mode === "form" && visibleEditModal
                  ? ""
                  : state.qty
              }
              type="tel"
              onChange={(e) => {
                const bool = /^[0-9]+$/.test(Number(e.target.value));
                if (bool) {
                  setState({ ...state, qty: e.target.value });
                }
                clearErr();
              }}
              inputProps={{
                pattern: "[0-9]*", // Allow only digits
                inputMode: "numeric", // Show numeric keyboard on mobile devices
              }}
              error={
                mode === "modal" && visibleEditModal
                  ? errObj.quantityErr
                  : mode === "form" && visibleEditModal
                  ? ""
                  : errObj.quantityErr
              }
              helpertext={
                mode === "modal" && visibleEditModal
                  ? errObj.quantityMsg
                  : mode === "form" && visibleEditModal
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
                mode === "modal" && visibleEditModal
                  ? state.manpower_rate
                  : mode === "form" && visibleEditModal
                  ? ""
                  : state.manpower_rate
              }
              type="number"
              onChange={(e) => {
                const bool = /^[0-9]+(?:\.[0-9]+)?$/.test(
                  Number(e.target.value)
                );
                if (bool) {
                  setState({ ...state, manpower_rate: e.target.value });
                }
                clearErr();
              }}
              error={
                mode === "modal" && visibleEditModal
                  ? errObj.manpowerRateErr
                  : mode === "form" && visibleEditModal
                  ? ""
                  : errObj.manpowerRateErr
              }
              helpertext={
                mode === "modal" && visibleEditModal
                  ? errObj.manpowerRateMsg
                  : mode === "form" && visibleEditModal
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
                mode === "modal" && visibleEditModal
                  ? state.days
                  : mode === "form" && visibleEditModal
                  ? ""
                  : state.days
              }
              type="tel"
              onChange={(e) => {
                const bool = /^[0-9]+$/.test(Number(e.target.value));
                if (bool) {
                  setState({ ...state, days: e.target.value });
                }
                clearErr();
              }}
              inputProps={{
                pattern: "[0-9]*", // Allow only digits
                inputMode: "numeric", // Show numeric keyboard on mobile devices
              }}
              error={
                mode === "modal" && visibleEditModal
                  ? errObj.daysErr
                  : mode === "form" && visibleEditModal
                  ? ""
                  : errObj.daysErr
              }
              helpertext={
                mode === "modal" && visibleEditModal
                  ? errObj.daysMsg
                  : mode === "form" && visibleEditModal
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
                mode === "modal" && visibleEditModal
                  ? state?.milestone
                  : mode === "form" && visibleEditModal
                  ? ""
                  : state?.milestone
              }
              onChange={(e, newValue) => {
                setState({ ...state, milestone: newValue });
                setErrObj({
                  ...errObj,
                  manpowerMilestoneErr: false,
                  manpowerMilestoneMsg: "",
                });
              }}
              options={milestones}
              getOptionLabel={(option) => option.milestone_name}
              error={
                mode === "modal" && visibleEditModal
                  ? errObj.manpowerMilestoneErr
                  : mode === "form" && visibleEditModal
                  ? ""
                  : errObj.manpowerMilestoneErr
              }
              helpertext={
                mode === "modal" && visibleEditModal
                  ? errObj.manpowerMilestoneMsg
                  : mode === "form" && visibleEditModal
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
              mode === "modal" && visibleEditModal
                ? state.specification
                : mode === "form" && visibleEditModal
                ? ""
                : state.specification
            }
            onChange={(e) => {
              setState({ ...state, specification: e.target.value });
              setErrObj({
                ...errObj,
                specificationsErr: false,
                specificationsMsg: "",
              });
            }}
            error={
              mode === "modal" && visibleEditModal
                ? errObj.specificationsErr
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.specificationsErr
            }
            helpertext={
              mode === "modal" && visibleEditModal
                ? errObj.specificationsMsg
                : mode === "form" && visibleEditModal
                ? ""
                : errObj.specificationsMsg
            }
          />
        </Grid>
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
            AED{" "}
            {(isArray(budgetDetails) &&
              !isEmpty(budgetDetails) &&
              budgetDetails?.reduce((acc, bud) => {
                const amount =
                  parseInt(bud?.material_unit_price || 0) *
                    parseInt(bud?.qty || 0) +
                  parseInt(bud?.manpower_rate || 0) * parseInt(bud?.days || 0);
                return acc + amount;
              }, 0)) ||
              0}
          </Typography>
        </Grid>

        {renderBudgetCreateForm("form")}

        <Grid item container alignItems={"center"} mb={2}>
          <Button
            variant="contained"
            onClick={() => {
              validate(false);
            }}
          >
            <AddCircleOutlineOutlinedIcon
              style={{ color: color.white, marginRight: 4 }}
            />
            Add Budget
          </Button>
        </Grid>
        {budgetLoader ? (
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
          isArray(budgetDetails) &&
          !isEmpty(budgetDetails) &&
          budgetDetails?.map((item, index) => {
            const milestoneValue = item?.milestone_id
              ? milestones?.find((e, i) => {
                  return e?.id === item?.milestone_id;
                })
              : item?.milestone;

            return (
              <Grid container className={classes.card}>
                <Grid item container wrap={sm ? "wrap" : "nowrap"}>
                  <Grid item sx={12} justifyContent={"flex-start"}>
                    {isArray(item?.photo_url) && !isEmpty(item?.photo_url) && (
                      <>
                        <img
                          style={{
                            width: md ? 150 : 220,
                            maxHeight: 170,
                            objectFit: "contain",
                            borderRadius: 4,
                          }}
                          src={item?.photo_origin[0]}
                          alt="budget"
                        />
                      </>
                    )}
                  </Grid>
                  <Grid
                    item
                    container
                    sx={12}
                    p={sm ? "10px" : 2}
                    justifyContent={sm ? "flex-start" : "flex-end"}
                  >
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      alignItems={"flex-start"}
                      wrap="nowrap"
                    >
                      <Typography variant="h5" fontFamily={"ElMessiri-Regular"}>
                        {item?.name || "-"}
                      </Typography>
                      <IconButton
                        onClick={(e) => handleRowClick(e, item, index)}
                      >
                        <MoreVertIcon fontSize="20px" color="red" />
                      </IconButton>
                    </Grid>
                    <Grid item textAlign={sm ? "start" : "end"}>
                      <Typography fontFamily={"ElMEssiri-Regular"}>
                        AED {amounts[index] || 0}
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
                        {moment(item?.updatedAt).format("MMMM DD, YYYY")}
                      </Typography>
                    </Grid>
                    <Grid item container justifyContent={"flex-start"}>
                      <ListItemButton
                        style={{
                          color: color.primary,
                          padding: sm && "10px 0px",
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
                  <Grid item padding={"10px 10px 0px 10px"}>
                    <Typography fontFamily={"ElMEssiri-Regular"} fontSize={18}>
                      Specifications
                    </Typography>
                    <Typography>{item?.specification || "-"}</Typography>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: 14,
                        paddingBottom: 4,
                      }}
                    >
                      <Divider />
                    </div>
                  </Grid>
                  <div className="responsive-table">
                    <TableContainer
                      style={{ padding: 10, boxSizing: "border-box" }}
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
                              Manpower rate
                            </TableCell>

                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Days
                            </TableCell>
                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Amount
                            </TableCell>
                            {/* <TableCell
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
                            </TableCell> */}
                          </TableRow>
                          <TableRow key={"Manpower"}>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {milestoneValue?.milestone_name || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.manpower_rate || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.days || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                AED{" "}
                                {parseInt(item.manpower_rate || 0) *
                                  parseInt(item.days || 0)}
                              </Typography>
                            </TableCell>

                            {/* <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.manpowerStatus || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.manpowerLastChange || "-"}
                              </Typography>
                            </TableCell> */}
                          </TableRow>
                        </TableBody>
                      </Table>
                      <div
                        style={{ width: "100%", padding: "10px 0px 14px 0px" }}
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
                                fontFamily: "Roobert-Regular !important",
                              }}
                            >
                              Material Type
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                            >
                              Material Unit
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
                              Quantity
                            </TableCell>
                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Amount
                            </TableCell>
                          </TableRow>
                          <TableRow key={"Manpower"}>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.material_type || "-"}
                              </Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.material_unit || "-"}
                              </Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                AED {item?.material_unit_price || "0"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.qty || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                AED{" "}
                                {parseInt(item.material_unit_price || 0) *
                                  parseInt(item.qty || 0)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Collapse>
              </Grid>
            );
          })
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
                updateRedux();
                handleClick("back");
              }}
            >
              Previous Step
            </Button>
          </Grid>
          <Grid item sm={5.9} xs={12}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              {submitLoader ? (
                <CircularProgress style={{ color: "#fff" }} size={26} />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmModel
        visible={visible}
        loader={visibleLoader}
        handleClose={() => setVisible(false)}
        confirmation={() => {
          handleDelete();
        }}
        message={`Are you sure you want to delete ${selectedBudget?.data?.name} budget?`}
      />
      <ConfirmModel
        visible={visibleFinal}
        loader={buttonLoader}
        handleClose={() => setVisibleFinal(false)}
        confirmation={() => {
          addBudget();
        }}
        message={`Are you sure you want to submit proposal?`}
      />

      <ConfirmModel
        visible={alreadySubmittedPop}
        loader={alreadySubmittedPopLoader}
        handleClose={() => setAlreadySubmittedPop(false)}
        confirmation={() => {
          addBudget();
        }}
        message={`Reno has already submitted the proposal to contractor so are you want to send it again?`}
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
      {proposalModal && (
        <ProfileSuccessModal
          title="Congrats!"
          msg="Proposal successfully submitted!"
          btnTitle="Continue"
          visible={proposalModal}
        />
      )}

      {/* Edit details for Budget Modal */}
      {visibleEditModal ? (
        <Modal
          open={visibleEditModal}
          onClose={() => {
            if (btnUpdateLoader === "update") {
              return null;
            } else {
              setVisibleEditModal(false);
            }
            clearData();
          }}
          closeAfterTransition
          disableAutoFocus
          slotProps={{ backdrop: Backdrop }}
          style={{ overflowY: "scroll" }}
        >
          <Fade in={visibleEditModal}>
            <Box sx={style}>
              <Grid
                container
                style={{ height: 600, overflow: "auto" }}
                justifyContent="center"
                alignItems="center"
              >
                <Typography className={classes.forgotHeaderText}>
                  Update Budget Details
                </Typography>
                <Grid item xs={12}>
                  {renderBudgetCreateForm("modal")}
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
                      setVisibleEditModal(false);
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
                      validate(true);
                    }}
                  >
                    Update
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
