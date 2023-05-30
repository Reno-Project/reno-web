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
import Milestone from "../../Proposal/Milestone";
import Budget from "../../Proposal/Budget";
import CInput from "../../../components/CInput";
import { isArray, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import ConfirmModel from "../../../components/ConfirmModel";
import ProposalCard from "../../../components/ProposalCard";
import { getAPIProgressData, getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import { toast } from "react-toastify";
import { isMobile, isTablet } from "react-device-detect";
import { HighlightOffOutlined, ImageOutlined } from "@mui/icons-material";
import CAutocomplete from "../../../components/CAutocomplete";
import moment from "moment";

const errorObj = {
  scpErr: false,
  scpMsg: "",
  typeErr: false,
  typeMsg: "",
  nameErr: false,
  nameMsg: "",
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
  const villa = location?.state ? location?.state : {};
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
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState([]);

  const [disableMilestone, setDisableMilestone] = useState(true);
  const [disableBudget, setDisableBudget] = useState(true);
  const [loader, setloader] = useState(false);
  const [visible, setvisible] = useState({ bool: false, val: null });
  const [expertiseList, setExpertiesList] = useState([]);
  const [dpId, setDpId] = useState("");

  useEffect(() => {
    if (!createProposal) {
      setScope(villa?.proposal?.scope_of_work);
      setProjectType(villa?.project_type);
    } else {
      getprojectList();
    }
  }, []);

  useEffect(() => {
    if (proposalDetails?.milestone_details?.previous) {
      setScope(proposalDetails?.scope_of_work);
      if (createProposal) {
        setProjectType(proposalDetails?.project_type || "");
        setName(proposalDetails?.name || "");
        setDescription(proposalDetails?.description || "");
        setEmail(proposalDetails?.email || "");
        setDocument(proposalDetails?.project || []);
      }
    }
  }, [proposalDetails]);

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
      if (isEmpty(email)) {
        valid = false;
        error.emailErr = true;
        error.emailMsg = "Please enter email";
      } else if (!emailRegex.test(email)) {
        valid = false;
        error.emailErr = true;
        error.emailMsg = "Please enter valid email";
      }

      if (!isArray(document) || isEmpty(document)) {
        valid = false;
        error.documentErr = true;
        error.documentMsg = "Please upload document";
      }
    }

    setErrObj(error);
    if (valid) {
      createproposalApicall();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function createproposalApicall() {
    setloader(true);
    const data = createProposal
      ? {
          scope_of_work: scope,
          project_type: projectType?.project_name,
          name,
          description: description,
          email,
          project: document,
        }
      : {
          proposal_id: villa?.id,
          scope_of_work: scope,
          project_type: villa?.project_type,
        };

    if (createProposal && proposalDetails?.milestone_details?.previous) {
      data.id = proposalDetails?.id;
    }

    const endpoint = createProposal
      ? Setting.endpoints.directproposal
      : Setting.endpoints.createproposal;

    try {
      const response = await getAPIProgressData(endpoint, "POST", data, true);
      if (response?.success) {
        // toast.success(response?.message);
        const scope_of_work = scope;
        createProposal
          ? dispatch(
              setProposalDetails({
                ...proposalDetails,
                id: response?.data?.project_id,
                scope_of_work,
                project_type: projectType,
                name,
                description: description,
                email,
                project: document,
              })
            )
          : dispatch(
              setProposalDetails({
                ...proposalDetails,
                scope_of_work,
                project_type: projectType,
              })
            );
        setDisableMilestone(false);
        setDpId(response?.data?.proposal_id);
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
  return (
    <div style={{ backgroundColor: "#F9F9FA" }}>
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
          {!createProposal && (
            <Grid
              item
              container
              wrap={sm ? "wrap" : "nowrap"}
              alignItems={"center"}
              columnGap={2}
            >
              <Grid item>
                <img
                  src={nData?.profile_url || ""}
                  alt="logo"
                  className={classes.imageStyle}
                />
                <div className={classes.activeContainer}>
                  <div className={classes.activeStatus}></div>
                </div>
              </Grid>

              <Grid container>
                <Grid item lg={9} md={9} sm={9} xs={9}>
                  <Typography className={classes.titleText}>
                    {nData?.username}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3} textAlign={"end"}>
                  <Typography className={classes.requestDate}>
                    Request Date
                  </Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={6} xs={6} style={{ marginTop: 5 }}>
                  <span
                    variant="contained"
                    style={{
                      backgroundColor: "#E9B55C",
                      padding: 8,
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      lineHeight: "16px",
                      borderRadius: 4,
                      color: "#FFFFFF",
                    }}
                  >
                    REQUEST
                  </span>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6}>
                  <Typography className={classes.dateStyle}>
                    {moment(villa?.project?.createdAt).format("MMMM DD, YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item container className={classes.contentContainer} id="scope">
            <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
              <Tabs
                value={tabValue}
                onChange={(v, b) => {
                  setvisible({ bool: true, val: b });
                }}
                variant="scrollable"
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
                    rows={3}
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
                      {false /*uploadLoader */ ? (
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
                              // onChange={(e) => {
                              //   const chosenFiles = Array.prototype.slice.call(
                              //     e.target.files
                              //   );
                              // if (chosenFiles) {
                              //   UploadFile(chosenFiles);
                              // }
                              // const nArr = document ? [...document] : [];
                              // chosenFiles.map((item) => nArr.push(item));
                              // setDocument(nArr);

                              onChange={(e) => {
                                const chosenFiles = Array.prototype.slice.call(
                                  e.target.files
                                );
                                const data = [...document];
                                let showMsg = false;
                                let limit = false;
                                chosenFiles.map((item) => {
                                  const bool = checkImgSize(item);
                                  if (bool && data.length < 5) {
                                    data.push(item);
                                  } else if (data.length >= 4) {
                                    limit = true;
                                  } else {
                                    showMsg = true;
                                  }
                                });
                                if (limit) {
                                  toast.error("You can upload maximum 5 files");
                                } else if (showMsg) {
                                  toast.error(
                                    "Some certificate you are attempting to upload exceeds the maximum file size limit of 3 MB. Please reduce the size of your image and try again."
                                  );
                                }
                                setDocument(data);
                                setErrObj({
                                  ...errObj,
                                  documentErr: false,
                                  documentMsg: "",
                                });
                              }}
                            />
                            <FormHelperText
                              error={errObj.documentErr}
                              style={{ fontFamily: "Roobert-Regular" }}
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
                            {isArray(document) &&
                              document?.length > 0 &&
                              document?.map((item, index) => {
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
                                        {item?.name ||
                                          `Portfolio Image ${index + 1}` ||
                                          ""}
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
                                        // onClick={() => {
                                        //   let uploadID =
                                        //     document[index]?.image_id;
                                        //   uploadID &&
                                        //     deletePhoto(uploadID, index);
                                        // }}
                                        onClick={() => {
                                          const nArr = [...document];
                                          nArr.splice(index, 1);
                                          setDocument(nArr);
                                        }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </>
                )}
                {/* {!createProposal && (
                  <>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                      <Typography className={classes.MainTitle}>
                        Project Informations
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent={"flex-end"}
                      style={{ paddingTop: 25, paddingBottom: 25 }}
                    >
                      <Grid
                        item
                        lg={9}
                        sm={9}
                        md={9}
                        xs={12}
                        textAlign={"start"}
                      >
                        <Typography className={classes.titleStyle}>
                          Project Name:
                        </Typography>
                      </Grid>
                      <Grid item lg={3} sm={3} md={3} xs={12} textAlign={"end"}>
                        <Typography className={classes.titleStyleRight}>
                          {villa?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                   <Grid
                      container
                      alignItems="center"
                      justifyContent={"flex-end"}
                    >
                      <Grid item lg={12} sm={12} md={12} xs={12}>
                        <Typography className={classes.titleStyle}>
                          Project Descriptions:
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        lg={12}
                        sm={12}
                        md={12}
                        xs={12}
                        style={{
                          backgroundColor: "#F5F6F8",
                          padding: "11px 15px",
                          gap: "10px",
                          margin: "10px 0px",
                        }}
                      >
                        <Typography className={classes.paraStyle}>
                          {villa?.description}
                        </Typography>
                      </Grid>
                    </Grid>
                   <Grid
                      container
                      alignItems="center"
                      justifyContent={"flex-end"}
                      rowSpacing={2}
                    >
                      <Grid item lg={3} sm={3} md={3} xs={3}>
                        <Typography className={classes.acctext}>
                          Property Type:
                        </Typography>
                      </Grid>
                      <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                        <Typography className={classes.accRightText}>
                          {villa?.project_type}
                        </Typography>
                      </Grid>
                      <Grid item lg={3} sm={3} md={3} xs={3}>
                        <Typography className={classes.acctext}>
                          Bathroom:
                        </Typography>
                      </Grid>
                      <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                        <Typography className={classes.accRightText}>
                          {villa?.project?.bathroom}
                        </Typography>
                      </Grid>
                      <Grid item lg={3} sm={3} md={3} xs={3}>
                        <Typography className={classes.acctext}>
                          Bedroom:
                        </Typography>
                      </Grid>
                      <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                        <Typography className={classes.accRightText}>
                          {villa?.project?.badroom}
                        </Typography>
                      </Grid>
                      <Grid item lg={3} sm={3} md={3} xs={3}>
                        <Typography className={classes.acctext}>
                          Indoor Space:
                        </Typography>
                      </Grid>
                      <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                        <Typography className={classes.accRightText}>
                          1600 Sqm
                        </Typography>
                      </Grid>
                      <Grid item lg={3} sm={3} md={3} xs={3}>
                        <Typography className={classes.acctext}>
                          Outdoor Space:
                        </Typography>
                      </Grid>
                      <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                        <Typography className={classes.accRightText}>
                          450 Sqm
                        </Typography>
                      </Grid>
                      <Grid item lg={3} sm={3} md={3} xs={3}>
                        <Typography className={classes.acctext}>
                          Project Budget:
                        </Typography>
                      </Grid>
                      <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                        <Typography className={classes.accRightText}>
                          $3000-$4000
                        </Typography>
                      </Grid>
                      <Grid item lg={9} sm={9} md={9} xs={9}>
                        <Typography className={classes.acctext}>
                          Project Location:
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        lg={3}
                        sm={3}
                        md={3}
                        xs={3}
                        justifyContent={"flex-end"}
                        wrap="nowrap"
                      >
                        <NavLink>
                          <Typography className={classes.linkText}>
                            View Map
                          </Typography>
                        </NavLink>
                        <img
                          alt="logo"
                          src={Images.Location}
                          // style={{ width: '12%' }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container alignContent={"center"}>
                      <Grid item lg={12}>
                        {imageArray.map((item, index) => {
                          return (
                            <img
                              key={index}
                              alt="logo"
                              src={item.image}
                              style={{
                                width: "190px",
                                height: "129px",
                                borderRadius: "7px",
                                margin: "15px 5px",
                              }}
                            />
                          );
                        })}
                      </Grid>
                    </Grid> 
                  </>
                )} */}

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
                      fullWidth
                      sx={{ boxShadow: "none" }}
                      onClick={() => {
                        navigate(-1);
                        dispatch(setProposalDetails({}));
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item sm={5.9} xs={12}>
                    <Button variant="contained" fullWidth onClick={validation}>
                      {loader ? (
                        <CircularProgress style={{ color: "#fff" }} size={26} />
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </Grid>
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
                dpId={dpId}
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
                dpId={dpId}
              />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <BlueAbout />
      <ConfirmModel
        visible={visible?.bool}
        handleClose={() => setvisible({ bool: false, val: null })}
        confirmation={() => {
          setTabValue(visible?.val);
          setvisible({ bool: false, val: null });
        }}
        titleText={"⚠️ Warning: You will lose the form data."}
        message={"Are you sure you want to change the tab?"}
      />
    </div>
  );
}
