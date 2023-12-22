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
import moment from "moment";
import "./index.css";

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
};

export default function Summary(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { proposalDetails } = useSelector((state) => state.auth);
  const location = useLocation();

  const createProposal = location?.state?.create_proposal || false;
  const villa = location?.state?.villa ? location?.state?.villa : {};
  console.log("villa", villa?.status);
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
      <div className="title">Submit Proposal</div>
      <Grid
        container
        columnGap={1}
        rowGap={1}
        flexDirection="row-reverse"
        style={{ padding: isMobile && !isTablet ? "20px 0" : md ? 20 : 40 }}
        justifyContent={!createProposal && !md ? "space-between" : "center"}
        boxSizing={"border-box"}
      >
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
        <Grid
          item
          xs={createProposal ? 12 : isMobile ? 11 : 10}
          sm={10}
          md={7.8}
          xl={8}
          className={classes.MainContainer}
        >
          <Grid item container className={classes.contentContainer} id="scope">
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
                    <Grid item xs={12} style={{ paddingTop: 25 }}>
                      <CAutocomplete
                        label="Project Type"
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
                    <Grid item xs={12}>
                      <CInput
                        label="Project Name"
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
                    <Grid item xs={12}>
                      <CInput
                        multiline={true}
                        rows={3}
                        label="Project Description"
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                  </>
                )}
                <Grid
                  item
                  xs={12}
                  style={{ paddingTop: createProposal ? 0 : 25 }}
                >
                  <CInput
                    multiline={true}
                    rows={1}
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
                          {/* <InputLabel shrink error={errObj.documentErr}>
                            Project Files
                          </InputLabel> */}
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
                                backgroundColor: "#F9F9FA",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: 170,
                                border: errObj.documentErr
                                  ? "1px solid red"
                                  : "none",
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
                                <b>Upload Document</b>
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
                                const newArr = [...originalDoc];
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
                              marginTop: document?.length > 0 && 40,
                              overflowY: "scroll",
                              maxHeight: 500,
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
      </Grid>
      <BlueAbout />
    </div>
  );
}
