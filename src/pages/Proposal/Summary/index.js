import {
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  useMediaQuery,
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
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import ConfirmModel from "../../../components/ConfirmModel";
import ProfileSuccessModal from "../../../components/ProfileSuccessModal";
import ProposalCard from "../../../components/ProposalCard";

const errorObj = {
  scpErr: false,
  scpMsg: "",
};

export default function Summary() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { proposalDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { setProposalDetails } = authActions;

  const Location = useLocation();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  const [tabValue, setTabValue] = useState(0);
  const [from, setFrom] = useState("");
  const [errObj, setErrObj] = useState(errorObj);
  const [scope, setScope] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [show2FModal, setShow2FModal] = useState(false);
  const [disableMilestone, setDisableMilestone] = useState(true);
  const [disableBudget, setDisableBudget] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visiblesucess, setVisibleSuccess] = useState(false);

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

  function validation() {
    const error = { ...errObj };
    let valid = true;

    if (isEmpty(scope)) {
      valid = false;
      error.scpErr = true;
      error.scpMsg = "Please enter scope of project";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setErrObj(error);
    if (valid) {
      const scope_of_work = scope;
      dispatch(setProposalDetails({ ...proposalDetails, scope_of_work }));
      setDisableMilestone(false);
      setTabValue(1);
    }
  }

  return (
    <div style={{ backgroundColor: "#F9F9FA" }}>
      <Grid
        container
        columnGap={1}
        rowGap={1}
        flexDirection="row-reverse"
        style={{ padding: md ? 20 : 40 }}
        justifyContent={!md ? "space-between" : "center"}
        boxSizing={"border-box"}
      >
        <Grid
          item
          container
          xs={10}
          md={4}
          xl={3}
          className={classes.MainContainer}
        >
          <ProposalCard />
        </Grid>
        <Grid
          item
          container
          xs={10}
          md={7.8}
          xl={8.8}
          className={classes.MainContainer}
          padding={"20px"}
        >
          <Grid
            item
            container
            wrap={sm ? "wrap" : "nowrap"}
            alignItems={"center"}
            columnGap={2}
          >
            <Grid item>
              <img
                src="https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg"
                alt="chat"
                className={classes.imageStyle}
              />
              <div className={classes.activeContainer}>
                <div className={classes.activeStatus}></div>
              </div>
            </Grid>
            <Grid container>
              <Grid item lg={9} md={9} sm={9} xs={9}>
                <Typography className={classes.titleText}>
                  Albert Flores
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
                  March 01, 2023
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container className={classes.contentContainer} id="scope">
            <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
              <Tabs
                value={tabValue}
                onChange={(v, b) => {
                  setFrom("");
                  setTabValue(b);
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
                  <Grid item lg={9} sm={9} md={9} xs={12} textAlign={"start"}>
                    <Typography className={classes.titleStyle}>
                      Project Name:
                    </Typography>
                  </Grid>
                  <Grid item lg={3} sm={3} md={3} xs={12} textAlign={"end"}>
                    <Typography className={classes.titleStyleRight}>
                      Villa MM-Renovation
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent={"flex-end"}>
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
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since. When an unknown printer took a galley of type
                      and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially.
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
                      Duplex Building
                    </Typography>
                  </Grid>
                  <Grid item lg={3} sm={3} md={3} xs={3}>
                    <Typography className={classes.acctext}>
                      Bathroom:
                    </Typography>
                  </Grid>
                  <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                    <Typography className={classes.accRightText}>04</Typography>
                  </Grid>
                  <Grid item lg={3} sm={3} md={3} xs={3}>
                    <Typography className={classes.acctext}>
                      Bedroom:
                    </Typography>
                  </Grid>
                  <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                    <Typography className={classes.accRightText}>03</Typography>
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
                      cancel
                    </Button>
                  </Grid>
                  <Grid item sm={5.9} xs={12}>
                    <Button variant="contained" fullWidth onClick={validation}>
                      Continue
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : null}
            {tabValue === 1 ? (
              <Milestone
                from={from}
                handleClick={(type, data) => {
                  if (type === "back") {
                    setTabValue(0);
                    setFrom("Milestone");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (type === "next") {
                    setDisableBudget(false);

                    setTabValue(2);
                  }
                }}
              />
            ) : null}
            {tabValue === 2 ? (
              <Budget
                from={from}
                handleClick={(type, data) => {
                  if (type === "back") {
                    setFrom("Budget");
                    setTabValue(1);
                  } else if (type === "submit") {
                    setVisible(true);
                  }
                }}
              />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <BlueAbout />

      <ConfirmModel
        visible={visible}
        handleClose={() => setVisible(false)}
        confirmation={() => {
          dispatch(setProposalDetails({}));
          setVisible(false);
          setVisibleSuccess(true);
        }}
        message="Are you sure you want to submit proposal?"
        title="Submit"
      />
      {visiblesucess && (
        <ProfileSuccessModal
          msg="Your profile has been created successfully."
          visible={visiblesucess}
          btnTitle="Continue"
        />
      )}
    </div>
  );
}
