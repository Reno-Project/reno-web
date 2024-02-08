import {
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  useMediaQuery,
  CircularProgress,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import BlueAbout from "../../../components/BlueAbout";
import theme from "../../../config/theme";
import Milestone from "../Milestone";
import Budget from "../Budget";
import CInput from "../../../components/CInput";
import _, { isArray, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import ProposalCard from "../../../components/ProposalCard";
import { getAPIProgressData, getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import { toast } from "react-toastify";
import { isMobile, isTablet } from "react-device-detect";
import { HighlightOffOutlined, ImageOutlined } from "@mui/icons-material";
import CAutocomplete from "../../../components/CAutocomplete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { FormControl } from "@mui/material";
import Images from "../../../config/images";

const errorObj = {
  scpErr: false,
  scpMsg: "",
  typeErr: false,
  typeMsg: "",
  nameErr: false,
  nameMsg: "",
  cNameErr: false,
  cNameMsg: "",
  descriptionErr: false,
  descriptionMsg: "",
  emailErr: false,
  emailMsg: "",
  documentErr: false,
  documentMsg: "",
  startErr: false,
  startMsg: "",
  endErr: false,
  endMsg: "",
};

export default function Summary(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { proposalDetails } = useSelector((state) => state.auth);
  const location = useLocation();

  const createProposal = location?.state?.create_proposal || false;
  const villa = location?.state?.villa ? location?.state?.villa : {};
  const fromManageProject = location?.state?.fromManageProject || false;
  const nData = villa?.submitted_by_reno
    ? villa?.reno_data || {}
    : villa?.user_data || {};
  const dispatch = useDispatch();
  const { setProposalDetails } = authActions;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const [tabValue, setTabValue] = useState(0);
  const [errObj, setErrObj] = useState(errorObj);
  const [scope, setScope] = useState("");
  const [projectType, setProjectType] = useState(null);
  const [name, setName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState([]);
  const [originalDoc, setOriginalDoc] = useState([]);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [deleteIND, setDeleteIND] = useState(null);

  const [disableMilestone, setDisableMilestone] = useState(true);
  const [disableBudget, setDisableBudget] = useState(true);
  const [loader, setloader] = useState(false);
  const [expertiseList, setExpertiesList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (
      !createProposal &&
      (!_?.isObject(proposalDetails) || isEmpty(proposalDetails))
    ) {
      setScope(villa?.proposal?.scope_of_work);
      setProjectType(villa?.project_type);
    } else if (_?.isObject(proposalDetails) && !isEmpty(proposalDetails)) {
      setScope(proposalDetails?.scope_of_work);
      setProjectType(proposalDetails?.project_type || "");
      setName(proposalDetails?.name || "");
      setStartDate(proposalDetails?.start_date || "");
      setEndDate(proposalDetails?.end_date || "");
      setDescription(proposalDetails?.description || "");
      setCustomerName(proposalDetails?.customer_name || "");
      setEmail(proposalDetails?.email || "");
      setOriginalDoc(proposalDetails?.project || []);
      // setOriginalDoc(proposalDetails?.project_origin);
      getprojectList();
    } else {
      getprojectList();
    }
  }, []);

  function validation() {
    const error = { ...errObj };
    let valid = true;

    if (isEmpty(scope)) {
      valid = false;
      error.scpErr = true;
      error.scpMsg = "Please enter scope of project";
    }

    if (isEmpty(startDate)) {
      valid = false;
      error.startErr = true;
      error.startMsg = "Please enter start date";
    }
    if (isEmpty(endDate)) {
      valid = false;
      error.endErr = true;
      error.endMsg = "Please enter end date";
    }
    if (createProposal) {
      if (!projectType) {
        valid = false;
        error.typeErr = true;
        error.typeMsg = "Please select project type";
      }
      if (isEmpty(name?.trim())) {
        valid = false;
        error.nameErr = true;
        error.nameMsg = "Please enter project name";
      }

      if (isEmpty(description?.trim())) {
        valid = false;
        error.descriptionErr = true;
        error.descriptionMsg = "Please enter project description";
      }
      if (isEmpty(customerName?.trim())) {
        valid = false;
        error.cNameErr = true;
        error.cNameMsg = "Please enter customer name";
      }

      if (isEmpty(email)) {
        valid = false;
        error.emailErr = true;
        error.emailMsg = "Please enter email";
      } else if (!emailRegex.test(email)) {
        valid = false;
        error.emailErr = true;
        error.emailMsg = "Please enter valid email";
      }

      // if (!isArray(document) || isEmpty(document)) {
      //   valid = false;
      //   error.documentErr = true;
      //   error.documentMsg = "Please upload document";
      // }
    }

    setErrObj(error);
    if (valid) {
      if (createProposal) {
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            scope_of_work: scope,
            project_type: projectType,
            name,
            description: description,
            email,
            start_date: startDate,
            end_date: endDate,
            customer_name: customerName,
            project: originalDoc || [],
            // project_origin: originalDoc,
          })
        );
      } else {
        // createproposalApicall();
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            scope_of_work: scope,
            project_type: projectType,
          })
        );
      }
      setDisableMilestone(false);
      setTabValue(1);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  async function createproposalApicall() {
    setloader(true);
    const data = {
      proposal_id: villa?.proposal_id,
      scope_of_work: scope,
      project_type: villa?.project_type,
    };

    const endpoint = Setting.endpoints.createproposal;

    try {
      const response = await getAPIProgressData(endpoint, "POST", data, true);
      if (response?.success) {
        const scope_of_work = scope;

        dispatch(
          setProposalDetails({
            ...proposalDetails,
            scope_of_work,
            project_type: projectType,
          })
        );
        setDocument(response?.data?.image);
        setDisableMilestone(false);
        setTimeout(() => {
          setTabValue(1);
        }, 100);
      } else {
        toast.error(response?.message);
      }
      setloader(false);
    } catch (error) {
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
      setloader(false);
    }
  }

  async function UploadFile(img) {
    const nArr1 = originalDoc ? [...originalDoc] : [];
    for (let i = 0; i < img.length; i++) {
      const base64Data = await convertToBase64(img[i]);
      nArr1.push(base64Data);
    }
    setOriginalDoc(nArr1);

    setErrObj({
      ...errObj,
      photoErr: false,
      photoMsg: "",
    });
  }

  async function getprojectList() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.projectlist}`,
        "GET",
        {}
      );
      if (response.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          setExpertiesList(response?.data);
        } else {
          setExpertiesList([]);
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
    }
  }

  function checkImgSize(img) {
    let valid = true;
    if (img.size > 3145728) {
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }

  async function deletePhoto(id, ind) {
    setDeleteIND(ind);
    try {
      const response = await getApiData(
        `${Setting.endpoints.deleteTemplate}/${id}`,
        "GET",
        {}
      );
      if (response?.success) {
        const nArr = [...document];
        nArr.splice(ind, 1);
        const nArr1 = [...originalDoc];
        nArr1.splice(ind, 1);
        setDocument(nArr);
        setOriginalDoc(nArr1);
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            project: nArr1,
            // project_origin: nArr1,
          })
        );
      } else {
        toast.error(response?.message);
      }
      setDeleteIND(null);
    } catch (error) {
      setDeleteIND(null);

      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Somthing went wromg try again later");
    }
  }

  function displayImagesView() {
    if (isArray(originalDoc) && originalDoc?.length > 0) {
      return originalDoc?.map((item, index) => {
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
                    const nArr = [...originalDoc];
                    nArr.splice(index, 1);
                    setOriginalDoc(nArr);
                    dispatch(
                      setProposalDetails({
                        ...proposalDetails,
                        project: nArr,
                      })
                    );
                  }}
                />
              )}
            </div>
          </div>
        );
      });
    }
  }
  return (
    <div style={{ backgroundColor: "#F9F9FA" }}>
      <div className={classes.title}>Submit Proposal</div>
      <Grid
        container
        style={{ padding: isMobile && !isTablet ? "20px 0" : md ? 20 : 40 }}
        justifyContent={!createProposal && !md ? "space-between" : "center"}
        boxSizing={"border-box"}
      >
        <Grid
          item
          xs={isMobile ? 11 : 10}
          sm={10}
          md={7.8}
          xl={8}
          className={classes.MainContainer}
        >
          <Grid
            item
            container
            className={classes.contentContainer}
            id="scope"
            gap="28px"
          >
            <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
              <Tabs
                value={tabValue}
                variant="scrollable"
                onChange={(v, b) => {
                  setTabValue(b);
                }}
              >
                <Tab label="Summary" />
                <Tab label="Milestone" disabled={disableMilestone} />
                <Tab label="Budget" disabled={disableBudget} />
              </Tabs>
            </Grid>
            {tabValue === 0 ? (
              <>
                {createProposal && (
                  <>
                    <Grid
                      container
                      flex
                      columnGap={1}
                      wrap={md ? "wrap" : "nowrap"}
                    >
                      <Grid item xs={6} style={{ paddingTop: 25 }}>
                        <CAutocomplete
                          label="Type"
                          placeholder="Select project type"
                          value={projectType}
                          onChange={(e, newValue) => {
                            setProjectType(newValue);
                            setErrObj({
                              ...errObj,
                              typeErr: false,
                              typeMsg: "",
                            });
                          }}
                          options={expertiseList}
                          getOptionLabel={(option) => option?.project_name}
                          error={errObj.typeErr}
                          helpertext={errObj.typeMsg}
                        />
                      </Grid>
                      <Grid item xs={6} style={{ paddingTop: 25 }}>
                        <CInput
                          label="Name"
                          placeholder="Write here..."
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
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
                    </Grid>

                    <Grid item xs={12}>
                      <CInput
                        multiline={true}
                        rows={3}
                        label="Description"
                        placeholder="Write here..."
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
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
                      container
                      flex
                      columnGap={1}
                      wrap={md ? "wrap" : "nowrap"}
                    >
                      <Grid item xs={6}>
                        <CInput
                          label="Customer Name"
                          placeholder="Write here..."
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            setErrObj({
                              ...errObj,
                              cNameErr: false,
                              cNameMsg: "",
                            });
                          }}
                          inputProps={{ maxLength: 50 }}
                          error={errObj.cNameErr}
                          helpertext={errObj.cNameMsg}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CInput
                          label="Customer Email"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrObj({
                              ...errObj,
                              emailErr: false,
                              emailMsg: "",
                            });
                          }}
                          error={errObj.emailErr}
                          helpertext={errObj.emailMsg}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} style={{ paddingTop: 25 }}>
                  <CInput
                    multiline={true}
                    rows={4}
                    label="Scope of work"
                    placeholder="Write here..."
                    value={scope}
                    onChange={(e) => {
                      setScope(e.target.value);
                      setErrObj({
                        ...errObj,
                        scpErr: false,
                        scpMsg: "",
                      });
                    }}
                    error={errObj.scpErr}
                    helpertext={errObj.scpMsg}
                  />
                </Grid>
                {createProposal && (
                  <>
                    <Grid
                      item
                      xs={12}
                      style={{
                        marginBottom: 20,
                      }}
                    >
                      {uploadLoader ? (
                        <Grid
                          item
                          container
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={12}
                          minHeight={220}
                        >
                          <CircularProgress
                            style={{ color: "#274BF1" }}
                            size={26}
                          />
                        </Grid>
                      ) : (
                        <>
                          <InputLabel shrink error={errObj.documentErr}>
                            Upload supporting pictures or documentation
                          </InputLabel>
                          <Grid
                            item
                            container
                            xs={12}
                            style={{
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: 170,
                                border: "1px dashed #9CA3AF",
                                borderRadius: 4,
                                gap: 1,
                              }}
                            >
                              <div style={{ width: "24px", height: "24px" }}>
                                <img
                                  src={Images.upload_icon}
                                  alt="upload-icon"
                                ></img>
                              </div>
                              <InputLabel>
                                <b>
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      color: "#2563EB",
                                    }}
                                  >
                                    Click to upload Images
                                  </span>{" "}
                                  or drag and drop{" "}
                                </b>
                              </InputLabel>
                              <InputLabel
                                style={{ fontSize: 12, color: "#6B7280" }}
                              >
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
                                width: "100%",
                              }}
                              onChange={(e) => {
                                const chosenFiles = Array.prototype.slice.call(
                                  e.target.files
                                );
                                const rejected = chosenFiles.every(
                                  (item) =>
                                    item.type === "image/png" ||
                                    item.type === "image/jpg" ||
                                    item.type === "image/jpeg"
                                );
                                if (!rejected) {
                                  toast.error(
                                    "You can only add jpeg,jpg or png"
                                  );
                                }
                                const filteredFiles = chosenFiles.filter(
                                  (item) =>
                                    item.type === "image/png" ||
                                    item.type === "image/jpg" ||
                                    item.type === "image/jpeg"
                                );

                                let showMsg = false;
                                let limit = false;
                                const newArr = [...originalDoc];
                                filteredFiles.map((item) => {
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
                                  newArr?.filter(
                                    (elem) => typeof elem !== "string"
                                  );
                                if (shouldUpload) {
                                  UploadFile(shouldUpload);
                                }
                              }}
                            />
                            <FormHelperText
                              error={errObj.documentErr}
                              style={{ fontFamily: "Poppins-Regular" }}
                            >
                              {errObj.documentMsg}
                            </FormHelperText>
                          </Grid>
                          <Grid
                            item
                            style={{
                              marginTop: "20px",
                              overflowY: "auto",
                              maxHeight: "170px",
                              width: "100%",
                            }}
                          >
                            {displayImagesView()}
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </>
                )}

                <Grid
                  item
                  container
                  columnGap={1}
                  wrap={md ? "wrap" : "nowrap"}
                >
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
                          disablePast
                          value={new Date(startDate)}
                          onChange={(e, v) => {
                            setStartDate(moment(e).format("yyyy-MM-DD"));
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
                          minDate={new Date(startDate)}
                          value={new Date(endDate)}
                          onChange={(e) => {
                            setEndDate(moment(e).format("yyyy-MM-DD"));
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
                            OpenPickerIcon: () => (
                              <img
                                src={Images.calendarIcon}
                                alt="calender-icon"
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
                <Grid
                  item
                  container
                  columnGap={1}
                  rowGap={1}
                  justifyContent={"end"}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ boxShadow: "none" }}
                    onClick={() => {
                      navigate(-1);
                      dispatch(setProposalDetails({}));
                    }}
                  >
                    Cancel
                  </Button>

                  <Button variant="contained" onClick={validation} size="small">
                    {loader ? (
                      <CircularProgress style={{ color: "#fff" }} size={26} />
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </Grid>
              </>
            ) : null}
            {tabValue === 1 ? (
              <Milestone
                handleClick={(type, data) => {
                  if (type === "back") {
                    setTabValue(0);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (type === "next") {
                    setDisableBudget(false);
                    setTabValue(2);
                  }
                }}
                villa={villa}
                createProposal={createProposal}
              />
            ) : null}
            {tabValue === 2 ? (
              <Budget
                handleClick={(type, data) => {
                  if (type === "back") {
                    setTabValue(1);
                  }
                }}
                villa={villa}
                createProposal={createProposal}
                fromManageProject={fromManageProject}
              />
            ) : null}
          </Grid>
        </Grid>
        {!createProposal && (
          <Grid
            item
            container
            xs={isMobile ? 11 : 10}
            sm={10}
            md={4}
            xl={3}
            className={classes.MainContainer}
          >
            <ProposalCard villa={villa} />
          </Grid>
        )}
      </Grid>
      <BlueAbout />
    </div>
  );
}
