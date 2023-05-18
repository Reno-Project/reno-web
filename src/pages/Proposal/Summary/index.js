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
import Images from "../../../config/images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BlueAbout from "../../../components/BlueAbout";
import theme, { color } from "../../../config/theme";
import Milestone from "../../Proposal/Milestone";
import Budget from "../../Proposal/Budget";
import CInput from "../../../components/CInput";
import { isArray, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import ConfirmModel from "../../../components/ConfirmModel";
import ProfileSuccessModal from "../../../components/ProfileSuccessModal";
import ProposalCard from "../../../components/ProposalCard";
import { getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import { toast } from "react-toastify";
import { isMobile, isTablet } from "react-device-detect";
import { HighlightOffOutlined, ImageOutlined, Tune } from "@mui/icons-material";
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
  const { proposalDetails, userData } = useSelector((state) => state.auth);
  const location = useLocation();

  const createProposal = location?.state?.create_proposal;
  const villa = location?.state ? location?.state : {};
  const dispatch = useDispatch();
  const { setProposalDetails } = authActions;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

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
  console.log("visible====>>>>>", visible);

  const imageArray = [
    {
      id: 1,
      image:
        "https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg",
    },
    {
      id: 2,
      image:
        "https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg",
    },
    {
      id: 3,
      image:
        "https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg",
    },
  ];

  useEffect(() => {
    if (proposalDetails?.milestone_details?.previous) {
      setScope(proposalDetails?.scope_of_work);
      setProjectType(proposalDetails?.project_type);
    }
  }, [proposalDetails]);

  useEffect(() => {
    setScope(villa?.proposal?.scope_of_work);
    setProjectType(villa?.project_type);
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
    const data = {
      project_id: villa?.id,
      user_id: userData?.id,
      status: "pending",
      scope_of_work: scope,
      project_type: projectType,
    };
    try {
      const response = await getApiData(
        Setting.endpoints.createproposal,
        "POST",
        data
      );
      if (response?.success) {
        toast.success(response?.message);
        const scope_of_work = scope;
        dispatch(
          setProposalDetails({
            ...proposalDetails,
            scope_of_work,
            project_type: projectType,
          })
        );
        setDisableMilestone(false);
        setTabValue(1);
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
                  src={villa?.user_data?.profile_url || ""}
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
                    {villa?.user_data?.username}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3} textAlign={"end"}>
                  <Typography className={classes.requestDate}>
                    Request Date
                  </Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={6} xs={6}>
                  <Button
                    variant="contained"
                    style={{
                      marginTop: 3,
                      backgroundColor: "#E9B55C",
                      padding: 5,
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      lineHeight: "16px",
                    }}
                  >
                    REQUEST
                  </Button>
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
                    options={[
                      "Interior design",
                      "Kitchen",
                      "Full reno",
                      "Bathroom",
                      "Landscaping",
                    ]}
                    getOptionLabel={(option) => option}
                    error={errObj.typeErr}
                    helpertext={errObj.typeMsg}
                    readOnly={!createProposal}
                  />
                </Grid>
                {createProposal && (
                  <>
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
                <Grid item xs={12}>
                  <CInput
                    multiline={true}
                    rows={3}
                    label="Scope of work:"
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
                                // if (chosenFiles) {
                                //   UploadFile(chosenFiles);
                                // }
                                const nArr = document ? [...document] : [];
                                chosenFiles.map((item) => nArr.push(item));
                                setDocument(nArr);
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
