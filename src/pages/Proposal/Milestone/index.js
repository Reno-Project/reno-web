import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  Menu,
  MenuItem,
  useMediaQuery,
  Modal,
  Fade,
  Box,
  Backdrop,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CInput from "../../../components/CInput";
import { useTheme } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment from "moment";
import _, { isArray, isEmpty, isNull } from "lodash";
import ConfirmModel from "../../../components/ConfirmModel";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import { getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import "./index.css";
import { Close } from "@mui/icons-material";
import Images from "../../../config/images";
import SingleMilestoneAccordion from "../../../components/SingleMilestoneAccordian";
import { ConversationsRequestBuilder } from "@cometchat/chat-sdk-javascript";

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
  const { handleClick = () => null, villa, createProposal } = props;
  const dispatch = useDispatch();
  const { proposalDetails } = useSelector((state) => state.auth);
  const { setProposalDetails } = authActions;
  const [state, setState] = useState({
    milestone_name: "",
    description: "",
    start_date: null,
    end_date: null,
    amount: null,
  });

  const [milestones, setMilestones] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [milestoneLoader, setmilestoneLoader] = useState(false);

  const [buttonLoader, setButtonLoader] = useState(false);
  const [errObj, setErrObj] = useState(errorObj);
  const [isCreationOpen, setIsCreationOpen] = useState(false);

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

  const handleCloseCreation = () => {
    setIsCreationOpen(false);
    setVisibleEditModal(false);
    clearData();
  };

  const startDateArray = milestones.map(
    (milestone) => +new Date(milestone.start_date)
  );
  const endDateArray = milestones.map(
    (milestone) => +new Date(milestone.end_date)
  );
  const minStartDate = Math.min(...startDateArray);
  const maxEndDate = Math.max(...endDateArray);
  const startDate = moment(new Date(minStartDate)).format("MMMM DD, yyyy");
  const endDate = moment(new Date(maxEndDate)).format("MMMM DD, yyyy");

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
    if (createProposal) {
      if (
        proposalDetails?.milestone_details?.previous ||
        (isArray(proposalDetails?.milestone_details?.milestone) &&
          !isEmpty(proposalDetails?.milestone_details?.milestone))
      ) {
        setMilestones(proposalDetails?.milestone_details?.milestone || []);
        setState(proposalDetails?.milestone_details?.formvalues);
      }
    }
  }, []);

  useEffect(() => {
    if (isArray(milestones) && !isEmpty(milestones)) {
      if (
        proposalDetails?.budget_details?.previous ||
        (isArray(proposalDetails?.budget_details?.budgets) &&
          !isEmpty(proposalDetails?.budget_details?.budgets))
      ) {
        updateBudgetMilestone(proposalDetails?.budget_details?.budgets);
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
      proposal_id: villa?.proposal_id?.toString(),
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
    event.stopPropagation();
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
    setAnchorEl(null);
    setVisibleEditModal(true);
    setState(selectedBudget.data);
  };

  const handleDelete = () => {
    // if (selectedBudget?.data?.id) {
    //   deleteMilestone();
    // } else {
    // const newItems = [...milestones]; // Create a copy of the array
    // newItems.splice(selectedBudget?.index, 1); // Delete the object at the specified index
    // setMilestones(newItems);
    // setVisible(false);
    // dispatch(
    //   setProposalDetails({
    //     ...proposalDetails,
    //     milestone_details: {
    //       ...proposalDetails.milestone_details,
    //       milestone: newItems,
    //     },
    //   })
    // );
    // handleClose();
    // }
    const indices =
      isArray(budgets) &&
      !isEmpty(budgets) &&
      budgets
        ?.map((item, index) =>
          item?.milestone?.id === selectedBudget?.data?.id ? index : -1
        )
        .filter((index) => index !== -1);
    let newBudArr =
      (indices && budgets?.filter((item, index) => !indices.includes(index))) ||
      [];

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
              milestone: newItems || [],
            },
            budget_details: {
              ...proposalDetails?.budget_details,
              budgets: newBudArr || [],
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
      handleCloseCreation();
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
        setSelectedBudget({});
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
        setMilestones((arr) => [
          ...arr,
          { ...state, id: milestones?.length + 1 || 1 },
        ]);
        let milestone_details = {
          formvalues: {},
          milestone: milestones
            ? [...milestones, { ...state, id: milestones?.length + 1 || 1 }]
            : [{ ...state, id: milestones?.length + 1 || 1 }],
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
      // if (createProposal) {
      const extractedData = milestones?.map((item, ind) => {
        const {
          milestone_name,
          description,
          start_date,
          end_date,
          id,
          milestone_amount,
        } = item;

        // if (id) {
        //   return { id, milestone_name, description, start_date, end_date };
        // } else {
        // let idx = ind + 1;
        return {
          id,
          milestone_name,
          description,
          start_date,
          end_date,
          milestone_amount,
        };
        // }
      });
      const milestone_details = {
        formvalues: state,
        milestone: extractedData,
        previous: false,
      };
      dispatch(
        setProposalDetails({
          ...proposalDetails,
          start_date: startDate,
          end_date: endDate,
          milestone_details,
        })
      );
      handleClick("next");
    } else {
      toast.warning("Please add at least one milestone");
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
      <Modal open={isCreationOpen} onClose={handleCloseCreation}>
        <Fade in={isCreationOpen}>
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="addMilestoneHeader">Create Milestone</div>
              <Close
                style={{ cursor: "pointer" }}
                onClick={() => handleCloseCreation()}
              />
            </div>
            <Grid container>
              <Grid item xs={12} id="name" mt={2}>
                <CInput
                  label={<span>Milestone Name</span>}
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
              <Grid item xs={12} id="description" mt={2}>
                <CInput
                  multiline={true}
                  rows={3}
                  label={<span>Description:</span>}
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
              {/* <Grid item xs={12} id="amount">
                <CInput
                  type={"number"}
                  label="Price:"
                  placeholder="Enter Price "
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
              <Grid
                item
                container
                columnGap={1}
                wrap={md ? "wrap" : "nowrap"}
                mt={2}
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
                    <span className="fieldTitle" htmlFor="start-date">
                      Start Date:
                    </span>
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
                          marginTop: "6px",
                        }}
                        components={{
                          OpenPickerIcon: () => (
                            <img
                              src={Images.calendarIcon}
                              alt="calender-icon"
                            ></img>
                          ),
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
                    <span className="fieldTitle" htmlFor="end-date">
                      End Date:
                    </span>
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
                          marginTop: "6px",
                        }}
                        components={{
                          OpenPickerIcon: () => (
                            <img
                              src={Images.calendarIcon}
                              alt="calender-icon"
                            ></img>
                          ),
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
            </Grid>
            <Divider />
            {milestones.map((milestone) => {
              return (
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="12px 0px"
                    fontFamily="Poppins-Regular !important"
                    sx={{ userSelect: "none" }}
                  >
                    <Stack direction="row" gap="4px">
                      <Stack>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 22V14M5 14V4M5 14L7.47067 13.5059C9.1212 13.1758 10.8321 13.3328 12.3949 13.958C14.0885 14.6354 15.9524 14.7619 17.722 14.3195L17.9364 14.2659C18.5615 14.1096 19 13.548 19 12.9037V5.53669C19 4.75613 18.2665 4.18339 17.5092 4.3727C15.878 4.78051 14.1597 4.66389 12.5986 4.03943L12.3949 3.95797C10.8321 3.33284 9.1212 3.17576 7.47067 3.50587L5 4M5 4V2"
                            stroke="#274BF1"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                      </Stack>
                      <Typography fontSize="14px">
                        {milestone.milestone_name}
                      </Typography>
                    </Stack>
                    <Typography fontSize="14px">
                      {moment(milestone.start_date).format("MMM DD, YYYY")} -{" "}
                      {moment(milestone.end_date).format("MMM DD, YYYY")}
                    </Typography>
                  </Stack>
                  <Divider />
                </Box>
              );
            })}
            <Grid
              item
              container
              justifyContent="center"
              gap={sm ? 1 : 2}
              wrap="nowrap"
              marginTop="10px"
            >
              <Grid item xs={6}>
                <div className="cancel" onClick={handleCloseCreation}>
                  Cancel
                </div>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => validate(false)}
                >
                  Create Milestone
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    );
  }

  return (
    <>
      <Stack width="100%" height="90%" gap="16px">
        <div className="alert">
          {" "}
          <span className="label">Total Milestones Amount</span>
          <span className="cur">
            AED {amounts.reduce((acc, curr) => acc + curr, 0) || villa?.budget}
          </span>
        </div>

        <Divider width="100%" />

        {isCreationOpen && renderMilestoneCreateForm("form")}

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
          <>
            <Stack width="100%" height="100%" gap="16px" overflow="auto">
              <div className="secondaryTitle">Milestones</div>
              <Divider width="100%" />
              <Grid container>
                <Stack width="100%" gap="8px">
                  {milestones.map((milestone, index) => {
                    return (
                      <SingleMilestoneAccordion
                        milestone={milestone}
                        index={index}
                        amounts={amounts}
                        handleRowClick={handleRowClick}
                      />
                    );
                  })}
                </Stack>
                {milestones.length > 0 && (
                  <Divider width="100%" sx={{ marginTop: "8px" }} />
                )}
              </Grid>
            </Stack>
          </>
        )}

        <Grid item container alignItems={"center"} padding="0px 24px">
          <div
            className="btnSubmit"
            onClick={() => {
              setIsCreationOpen(true);
            }}
          >
            <AddCircleOutlineOutlinedIcon style={{ marginRight: 4 }} />
            Add Milestone
          </div>
        </Grid>

        <Divider width="100%" />

        {createProposal ? (
          <Grid
            item
            container
            columnGap={1}
            rowGap={1}
            justifyContent={"space-between"}
          >
            <Grid item sm={5.9} xs={12}>
              <Button
                variant="outlined"
                size="small"
                sx={{ boxShadow: "none", padding: "12px 24px" }}
                onClick={() => {
                  const milestone_details = {
                    formvalues: state,
                    milestone: milestones,
                    previous: true,
                  };
                  dispatch(
                    setProposalDetails({
                      ...proposalDetails,
                      milestone_details,
                    })
                  );

                  handleClick("back");
                }}
              >
                Previous Step
              </Button>
            </Grid>
            <Grid item sm={5.9} xs={12} className="conBtn" gap="16px">
              <Button
                variant="outlined"
                onClick={() => handleClick("back")}
                style={{ padding: "12px 24px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ padding: "12px 24px" }}
              >
                {buttonLoader ? (
                  <CircularProgress size={26} style={{ color: "#fff" }} />
                ) : (
                  "Continue"
                )}
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Stack>

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
            ml: 8,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
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
          style={{
            fontFamily: "Poppins-Regular",
            padding: "12px 36px 12px 12px",
          }}
          onClick={handleEdit}
        >
          Edit
        </MenuItem>
        <Divider style={{ margin: 0 }} />
        <MenuItem
          style={{
            fontFamily: "Poppins-Regular",
            padding: "12px 36px 12px 12px",
          }}
          onClick={() => {
            setVisible(true);
            setAnchorEl(null);
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
              <Grid item xs={12}>
                <Box sx={style}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="addMilestoneHeader">
                      Update Milestone Details
                    </div>
                    <Close
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCloseCreation()}
                    />
                  </div>
                  <Grid container>
                    <Grid item xs={12} id="name" mt={2}>
                      <CInput
                        label={<span>Milestone Name</span>}
                        placeholder="Enter Milestone Name..."
                        value={state.milestone_name}
                        onChange={(e) => {
                          setState({
                            ...state,
                            milestone_name: e.target.value,
                          });
                          setErrObj({
                            ...errObj,
                            nameErr: false,
                            nameMsg: "",
                          });
                        }}
                        inputProps={{ maxLength: 50 }}
                        error={errObj.nameErr}
                        helpertext={errObj.nameMsg}
                      />
                    </Grid>
                    <Grid item xs={12} id="desctiption" mt={2}>
                      <CInput
                        multiline={true}
                        rows={3}
                        label={<span>Description:</span>}
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
                    <Grid
                      item
                      container
                      columnGap={1}
                      mt={2}
                      wrap={md ? "wrap" : "nowrap"}
                    >
                      <Grid item xs={12} md={6} mb={2}>
                        <FormControl
                          variant="standard"
                          fullWidth
                          error={errObj.startErr}
                          style={{ position: "relative" }}
                        >
                          <span className="fieldTitle" htmlFor="start-date">
                            Start Date:
                          </span>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              disablePast
                              value={
                                state.start_date
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
                                marginTop: "6px",
                              }}
                              components={{
                                OpenPickerIcon: () => (
                                  <img
                                    src={Images.calendarIcon}
                                    alt="calendar-icon"
                                  ></img>
                                ),
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
                          <span className="fieldTitle" htmlFor="end-date">
                            End Date:
                          </span>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              minDate={new Date(state?.start_date)}
                              value={
                                state?.end_date
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
                                marginTop: "6px",
                              }}
                              components={{
                                OpenPickerIcon: () => (
                                  <img
                                    src={Images.calendarIcon}
                                    alt="calendar-icon"
                                  ></img>
                                ),
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
                        variant="outlined"
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
                        // style={{ marginTop: 20, marginBottom: 20 }}
                        onClick={() => {
                          validate(true);
                        }}
                        disabled={btnUpdateLoader === "update"}
                      >
                        {btnUpdateLoader === "update" ? (
                          <CircularProgress
                            style={{ color: "#fff" }}
                            size={26}
                          />
                        ) : (
                          "Update"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
