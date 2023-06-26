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
  Divider,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import BlueAbout from "../../../components/BlueAbout";
import theme, { color } from "../../../config/theme";

import _, { isArray, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import ProposalCard from "../../../components/ProposalCard";
import { getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import { isMobile } from "react-device-detect";
import moment from "moment";
import Images from "../../../config/images";
import ImageViewer from "../../../components/ImageViewer";
import Milestone from "../Milestone";
import Budget from "../Budget";
import PaymentHistoryList from "../PaymentHistory";

export default function Summary(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { proposalDetails } = useSelector((state) => state.auth);
  const location = useLocation();

  const villa = location?.state ? location?.state?.villa : {};
  const [pageLoad, setPageLoad] = useState(true);
  const [projectDetails, setProjectDetails] = useState({});
  const nData = projectDetails?.submitted_by_reno
    ? projectDetails?.reno_data || {}
    : projectDetails?.user_data || {};
  const dispatch = useDispatch();
  const { setProposalDetails } = authActions;
  const [isPressed, setIsPressed] = useState(false);
  const [imgurl, setImgUrl] = useState("");

  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const [tabValue, setTabValue] = useState(0);
  const [disableMilestone, setdisableMilestone] = useState(true);

  //const percentageSpent = (spentAmount / totalAmount) * 100
  const percentageReleased = (1000 / 1500) * 100;
  const percentageRemaining = 100 - percentageReleased;
  useEffect(() => {
    getProjectDetails();
  }, []);

  async function getProjectDetails() {
    setPageLoad(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.getProject}?proposal_id=${villa?.proposal_id}`,
        "GET",
        {}
      );
      if (
        response.success &&
        isArray(response?.data) &&
        !isEmpty(response?.data)
      ) {
        setProjectDetails(response?.data[0]);
        setdisableMilestone(false);
      } else {
        setdisableMilestone(true);
      }
      setPageLoad(false);
    } catch (error) {
      console.log("error:===>>>", error);
      setPageLoad(false);
    }
  }

  return (
    <>
      <div style={{ padding: md ? 20 : 40, backgroundColor: "#F9F9FA" }}>
        <Grid item container>
          <Typography className={classes.header}>Ongoing Projects</Typography>
        </Grid>
        <Grid
          container
          columnGap={1}
          rowGap={1}
          flexDirection="row-reverse"
          justifyContent={!md ? "space-between" : "center"}
          boxSizing={"border-box"}
        >
          <Grid
            item
            container
            xs={isMobile ? 11 : 10}
            sm={10}
            md={4}
            xl={3}
            className={classes.MainContainer}
          >
            <ProposalCard villa={projectDetails} from="ongoing" />
          </Grid>

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
                  {/* <Tab label="Budget" /> */}
                  {/* <Tab label="Change log" /> */}
                  {/* <Tab label="Payment History" /> */}
                  {/* <Tab label="Members" /> */}
                </Tabs>
              </Grid>
              {tabValue === 0 ? (
                pageLoad ? (
                  <div className={classes.dataMain}>
                    <CircularProgress style={{ color: color.primary }} />
                  </div>
                ) : (
                  <>
                    <Grid
                      item
                      container
                      className={classes.contentContainer}
                      mt={2}
                    >
                      <Grid item lg={12} sm={12} md={12} xs={12}>
                        <Typography className={classes.MainTitle}>
                          Project Informations
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        pt={2}
                      >
                        <Grid
                          item
                          container
                          alignItems="center"
                          justifyContent={"flex-end"}
                          margin={0}
                          xl={5.8}
                          md={5.5}
                          sm={12}
                          pb={1}
                        >
                          <Grid
                            item
                            lg={5}
                            sm={6}
                            md={6}
                            xs={12}
                            textAlign={"start"}
                          >
                            <Typography className={classes.acctext}>
                              Project Name:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            lg={7}
                            sm={6}
                            md={6}
                            xs={12}
                            textAlign={sm ? "start" : "end"}
                            pb={1}
                          >
                            <Typography className={classes.accRightText}>
                              {projectDetails?.name}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          alignItems="center"
                          justifyContent={"flex-end"}
                          margin={0}
                          xl={5.8}
                          md={5.5}
                          sm={12}
                          pb={1}
                        >
                          <Grid item lg={5} sm={6} md={6} xs={12}>
                            <Typography className={classes.acctext}>
                              Serial ID:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            lg={7}
                            sm={6}
                            md={6}
                            xs={12}
                            textAlign={sm ? "start" : "end"}
                            pb={1}
                          >
                            <Typography className={classes.accRightText}>
                              {projectDetails?.project_slug}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* <Grid item container justifyContent={"space-between"}>
                      <Grid
                        item
                        container
                        alignItems="center"
                        justifyContent={"flex-end"}
                        margin={0}
                        xl={5.8}
                        md={5.5}
                        sm={12}
                        pb={2}
                      >
                        <Grid
                          item
                          lg={5}
                          sm={6}
                          md={6}
                          xs={12}
                          textAlign={"start"}
                        >
                          <Typography className={classes.acctext}>
                            Customer Name:
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={7}
                          sm={6}
                          md={6}
                          xs={12}
                          textAlign={md ? "start":"end"}
                        >
                          <Typography className={classes.accRightText}>
                            {projectDetails?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems="center"
                        justifyContent={"flex-end"}
                        margin={0}
                        xl={5.8}
                        md={5.5}
                        sm={12}
                        pb={2}
                      >
                        <Grid item lg={5} sm={6} md={6} xs={12}>
                          <Typography className={classes.acctext}>
                            Project Manager:
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={7}
                          sm={6}
                          md={6}
                          xs={12}
                          textAlign={md ? "start":"end"}
                        >
                          <Typography
                            className={classes.accRightText}
                            style={{
                              color: color.primary,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {"Jhon Dhoe"}
                            <img
                              src={Images.edit}
                              alt="edit"
                              style={{ width: 16, height: 16 }}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid> */}
                      <Grid item container justifyContent={"space-between"}>
                        <Grid
                          item
                          container
                          alignItems="center"
                          justifyContent={"flex-end"}
                          margin={0}
                          xl={5.8}
                          md={5.5}
                          sm={12}
                          pb={2}
                        >
                          <Grid
                            item
                            lg={5}
                            sm={6}
                            md={6}
                            xs={12}
                            textAlign={"start"}
                          >
                            <Typography className={classes.acctext}>
                              Project Location:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            lg={7}
                            sm={6}
                            md={6}
                            xs={12}
                            justifyContent={sm ? "flex-start" : "flex-end"}
                            wrap="nowrap"
                          >
                            <Typography className={classes.linkText}>
                              {projectDetails?.location}
                            </Typography>

                            <img
                              alt="logo"
                              src={Images.Location}
                              // style={{ width: '12%' }}
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          alignItems="center"
                          justifyContent={"flex-end"}
                          margin={0}
                          xl={5.8}
                          md={5.5}
                          sm={12}
                          pb={2}
                        >
                          <Grid item lg={5} sm={6} md={6} xs={12}>
                            <Typography className={classes.acctext}>
                              Project Type:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            lg={7}
                            sm={6}
                            md={6}
                            xs={12}
                            textAlign={sm ? "start" : "end"}
                          >
                            <Typography className={classes.accRightText}>
                              {projectDetails?.project_type}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={"space-between"}>
                        <Grid
                          item
                          container
                          alignItems="center"
                          justifyContent={"flex-end"}
                          margin={0}
                          xl={5.8}
                          md={5.5}
                          sm={12}
                          pb={2}
                        >
                          <Grid
                            item
                            lg={5}
                            sm={6}
                            md={6}
                            xs={12}
                            textAlign={"start"}
                          >
                            <Typography className={classes.acctext}>
                              Start Date:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            lg={7}
                            sm={6}
                            md={6}
                            xs={12}
                            textAlign={sm ? "start" : "end"}
                          >
                            <Typography className={classes.accRightText}>
                              {moment(
                                projectDetails?.start_date,
                                "DD/MM/YYYY"
                              ).format("MMM DD, YYYY")}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          alignItems="center"
                          justifyContent={"flex-end"}
                          margin={0}
                          xl={5.8}
                          md={5.5}
                          sm={12}
                          pb={2}
                        >
                          <Grid item lg={5} sm={6} md={6} xs={12}>
                            <Typography className={classes.acctext}>
                              End Date:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            lg={7}
                            sm={6}
                            md={6}
                            xs={12}
                            textAlign={sm ? "start" : "end"}
                          >
                            <Typography className={classes.accRightText}>
                              {moment(
                                projectDetails?.end_date,
                                "DD/MM/YYYY"
                              ).format("MMM DD, YYYY")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      {isArray(projectDetails?.form_json) &&
                        !isEmpty(projectDetails?.form_json) && (
                          <>
                            <div
                              style={{
                                width: "100%",
                                padding: "14px 0px",
                              }}
                            >
                              <Divider />
                            </div>
                            {projectDetails?.exp_id == 1
                              ? projectDetails?.form_json?.map(
                                  (item, index) => {
                                    return (
                                      <>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Unit Type :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              {item?.unit_type?.id == 1 ? (
                                                <Typography
                                                  className={
                                                    classes.accRightText
                                                  }
                                                >
                                                  Villa
                                                </Typography>
                                              ) : item?.unit_type?.id == 2 ? (
                                                <Typography
                                                  className={
                                                    classes.accRightText
                                                  }
                                                >
                                                  Apartment
                                                </Typography>
                                              ) : (
                                                <Typography
                                                  className={
                                                    classes.accRightText
                                                  }
                                                >
                                                  Studio
                                                </Typography>
                                              )}
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Size(sqm) :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.size}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Floors :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.floors}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Bedrooms :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.bedrooms}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Bathrooms :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.bathrooms}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Kitchen :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.kitchen}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Preferred style :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={
                                                item?.preferred_style?.length >
                                                3
                                                  ? "start"
                                                  : "end"
                                              }
                                            >
                                              {item?.preferred_style?.map(
                                                (item1, index) => (
                                                  <div
                                                    key={index}
                                                    style={{
                                                      display: "inline-block",
                                                    }}
                                                  >
                                                    <Typography
                                                      className={
                                                        classes.accRightText
                                                      }
                                                      pr={0.5}
                                                    >
                                                      {item1.title}
                                                      {item?.preferred_style
                                                        ?.length -
                                                        1 !==
                                                      index
                                                        ? ", "
                                                        : " "}
                                                    </Typography>
                                                  </div>
                                                )
                                              )}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </>
                                    );
                                  }
                                )
                              : projectDetails?.exp_id == 3
                              ? projectDetails?.form_json?.map(
                                  (item, index) => {
                                    return (
                                      <>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Unit Type :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              {item?.unit_type?.id == 1 ? (
                                                <Typography
                                                  className={
                                                    classes.accRightText
                                                  }
                                                >
                                                  Villa
                                                </Typography>
                                              ) : item?.unit_type?.id == 2 ? (
                                                <Typography
                                                  className={
                                                    classes.accRightText
                                                  }
                                                >
                                                  Apartment
                                                </Typography>
                                              ) : (
                                                <Typography
                                                  className={
                                                    classes.accRightText
                                                  }
                                                >
                                                  Studio
                                                </Typography>
                                              )}
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Size(sqm) :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.size}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Floors :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.floors}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Bedrooms :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.bedrooms}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Bathrooms :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.bathrooms}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Kitchen :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.kitchen}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Required services :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={
                                                item?.require_service?.length >
                                                3
                                                  ? "start"
                                                  : "end"
                                              }
                                            >
                                              {item?.require_service?.map(
                                                (item1, index) => (
                                                  <div
                                                    key={index}
                                                    style={{
                                                      display: "inline-block",
                                                    }}
                                                  >
                                                    <Typography
                                                      className={
                                                        classes.accRightText
                                                      }
                                                      pr={0.5}
                                                    >
                                                      {item1?.title}
                                                      {item?.require_service
                                                        ?.length -
                                                        1 !==
                                                      index
                                                        ? ", "
                                                        : " "}
                                                    </Typography>
                                                  </div>
                                                )
                                              )}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </>
                                    );
                                  }
                                )
                              : projectDetails?.exp_id == 5
                              ? projectDetails?.form_json?.map(
                                  (item, index) => {
                                    return (
                                      <>
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Size(sqm) :
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                {item?.size}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"flex-end"}
                                            margin={0}
                                            xl={5.8}
                                            md={5.5}
                                            sm={12}
                                            pb={2}
                                          >
                                            <Grid
                                              item
                                              lg={5}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Include appliances:
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={6}
                                              md={6}
                                              xs={12}
                                              textAlign={
                                                item?.include?.length > 3
                                                  ? "start"
                                                  : "end"
                                              }
                                            >
                                              {item?.include?.map(
                                                (item1, index) => (
                                                  <div
                                                    key={index}
                                                    style={{
                                                      display: "inline-block",
                                                    }}
                                                  >
                                                    <Typography
                                                      className={
                                                        classes.accRightText
                                                      }
                                                      pr={0.5}
                                                    >
                                                      {item1?.title}
                                                      {item?.include?.length -
                                                        1 !==
                                                      index
                                                        ? ", "
                                                        : " "}
                                                    </Typography>
                                                  </div>
                                                )
                                              )}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </>
                                    );
                                  }
                                )
                              : projectDetails?.exp_id == 2
                              ? projectDetails?.form_json?.map(
                                  (item, index) => {
                                    const objectWithCheckIconTrue =
                                      item?.kitchenArray?.find(
                                        (item) => item?.checkicon === true
                                      );
                                    return (
                                      <>
                                        <Grid item container>
                                          <Typography
                                            variant="h6"
                                            fontWeight={"bold !important"}
                                            className={classes.acctext}
                                          >
                                            Kitchen - {index + 1}
                                          </Typography>
                                        </Grid>
                                        {objectWithCheckIconTrue?.id == 1 ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Gallery layout
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                <img
                                                  src={Images.kitchen_1}
                                                  alt="Gallery layout"
                                                />
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : objectWithCheckIconTrue?.id == 2 ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Corridor layout
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                <img
                                                  src={Images.corridor}
                                                  alt="Corridor layout"
                                                />
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : objectWithCheckIconTrue?.id == 3 ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                U shape layout
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                <img
                                                  src={Images.U_shape}
                                                  alt="U shape layout"
                                                />
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : objectWithCheckIconTrue?.id == 4 ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                L shape layout
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                <img
                                                  src={Images.l_shaped}
                                                  alt="L shape layout"
                                                />
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Peninsula layout
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                <img
                                                  src={Images.Peninsula}
                                                  alt="Peninsula layout"
                                                />
                                              </Typography>
                                            </Grid>
                                          </>
                                        )}
                                        {item?.new_plumbing === true ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                New plumbing
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                Yes
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : null}
                                        {item?.demolationRequired === true ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Is the demolition required?
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                Yes
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : null}
                                        {item?.island === true ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                With island?
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                Yes
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : null}
                                        {item?.builtInAppliances === true ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Built-in appliances?
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                Yes
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : null}
                                        {isArray(item?.include_Appliances) &&
                                          !isEmpty(
                                            item?.include_Appliances
                                          ) && (
                                            <>
                                              <Grid
                                                item
                                                lg={5}
                                                sm={6}
                                                md={6}
                                                xs={12}
                                              >
                                                <Typography
                                                  className={classes.acctext}
                                                >
                                                  Include appliances:
                                                </Typography>
                                              </Grid>
                                              <Grid
                                                item
                                                lg={7}
                                                sm={6}
                                                md={6}
                                                xs={12}
                                                textAlign="end"
                                              >
                                                {item?.include_Appliances?.map(
                                                  (item1, index) => (
                                                    <div
                                                      key={index}
                                                      style={{
                                                        display: "inline-block",
                                                      }}
                                                    >
                                                      <Typography
                                                        className={
                                                          classes.accRightText
                                                        }
                                                        style={{
                                                          marginRight:
                                                            item
                                                              ?.include_Appliances
                                                              ?.length -
                                                              1 !==
                                                            index
                                                              ? 3
                                                              : 0,
                                                        }}
                                                      >
                                                        {item1.title}
                                                        {item
                                                          ?.include_Appliances
                                                          ?.length -
                                                          1 !==
                                                        index
                                                          ? ", "
                                                          : " "}
                                                      </Typography>
                                                    </div>
                                                  )
                                                )}
                                              </Grid>
                                            </>
                                          )}
                                        {projectDetails?.form_json?.length >
                                          1 && (
                                          <div
                                            style={{
                                              width: "100%",
                                              padding: "14px 0px",
                                            }}
                                          >
                                            <Divider />
                                          </div>
                                        )}
                                      </>
                                    );
                                  }
                                )
                              : projectDetails?.form_json?.map(
                                  (item, index) => {
                                    const objectWithCheckIconTrue =
                                      item?.bathroomArray?.find(
                                        (item) => item.checkicon === true
                                      );
                                    return (
                                      <>
                                        <Grid item container xs={12}>
                                          <Typography
                                            variant="h6"
                                            fontWeight={"bold !important"}
                                            className={classes.acctext}
                                          >
                                            Bathroom - {index + 1}
                                          </Typography>
                                        </Grid>
                                        {objectWithCheckIconTrue?.id == 1 ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Two-piece
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                <img
                                                  src={Images.b2_pieces}
                                                  alt="Two-piece"
                                                />
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : objectWithCheckIconTrue?.id == 2 ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Three piece
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                <img
                                                  src={Images.b3_pieces}
                                                  alt="Three piece"
                                                />
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Four piece
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                <img
                                                  src={Images.b4_pieces}
                                                  alt="Four piece"
                                                />
                                              </Typography>
                                            </Grid>
                                          </>
                                        )}
                                        <Grid item lg={5} sm={6} md={6} xs={12}>
                                          <Typography
                                            className={classes.acctext}
                                          >
                                            Size(sqm) :
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          lg={7}
                                          sm={6}
                                          md={6}
                                          xs={12}
                                          textAlign={sm ? "start" : "end"}
                                        >
                                          <Typography
                                            className={classes.accRightText}
                                          >
                                            {item?.size}
                                          </Typography>
                                        </Grid>
                                        {item?.new_plumbing === true ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                New plumbing
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                Yes
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : null}
                                        {item?.demolationRequired === true ? (
                                          <>
                                            <Grid
                                              item
                                              lg={5}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                            >
                                              <Typography
                                                className={classes.acctext}
                                              >
                                                Is the demolition required?
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              lg={7}
                                              sm={12}
                                              md={6}
                                              xs={12}
                                              textAlign={sm ? "start" : "end"}
                                            >
                                              <Typography
                                                className={classes.accRightText}
                                              >
                                                Yes
                                              </Typography>
                                            </Grid>
                                          </>
                                        ) : null}
                                        {projectDetails?.form_json.length >
                                          1 && (
                                          <div
                                            style={{
                                              width: "100%",
                                              padding: "14px 0px",
                                            }}
                                          >
                                            <Divider />
                                          </div>
                                        )}
                                      </>
                                    );
                                  }
                                )}
                          </>
                        )}
                    </Grid>
                    <Grid item container justifyContent={"space-between"}>
                      <Grid
                        item
                        container
                        justifyContent={"flex-end"}
                        alignContent={"flex-start"}
                        margin={0}
                        xl={6}
                        md={6}
                        sm={12}
                        pb={2}
                      >
                        <Grid item lg={12} sm={12} md={12} xs={12}>
                          <Typography className={classes.acctext}>
                            Scope of work:
                          </Typography>
                        </Grid>
                        <Grid item lg={12} sm={12} md={12} xs={12}>
                          <Typography className={classes.accRightText}>
                            {projectDetails?.scope_of_work}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent={"flex-end"}
                        margin={0}
                        xl={6}
                        md={6}
                        sm={12}
                        pb={2}
                      >
                        {isArray(projectDetails?.project_image) &&
                          projectDetails?.project_image.length > 0 && (
                            <Grid
                              item
                              container
                              alignContent={"flex-start"}
                              alignItems={"flex-start"}
                            >
                              <Grid item xs={12}>
                                <Typography className={classes.acctext}>
                                  Project Files:
                                </Typography>
                              </Grid>
                              <Grid item lg={12}>
                                {projectDetails?.project_image?.map(
                                  (ele, index) => {
                                    return (
                                      <a
                                        href={
                                          ele?.type?.includes("pdf")
                                            ? `${ele?.image}`
                                            : null
                                        }
                                        target="_blank"
                                      >
                                        <img
                                          onClick={() => {
                                            if (ele?.type?.includes("image")) {
                                              setIsPressed(true);
                                              setImgUrl(ele?.image);
                                            } else {
                                              setImgUrl("");
                                            }
                                          }}
                                          alt="logo"
                                          src={
                                            ele?.type?.includes("image")
                                              ? ele?.image
                                              : Images.pdf
                                          }
                                          style={{
                                            cursor: "pointer",
                                            width: "140px",
                                            height: "140px",
                                            borderRadius: "7px",
                                            margin: "15px 5px",
                                            objectFit: "contain",
                                          }}
                                        />
                                      </a>
                                    );
                                  }
                                )}
                              </Grid>
                            </Grid>
                          )}
                      </Grid>
                    </Grid>
                    {/* <div
                      style={{
                        width: "100%",
                        padding: "14px 0px",
                      }}
                    >
                      <Divider />
                    </div> */}
                    {/* <Grid item container className={classes.contentContainer}>
                      <Grid item lg={12} sm={12} md={12} xs={12} pb={2}>
                        <Typography className={classes.MainTitle}>
                          Budget
                        </Typography>
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
                            <Typography className={classes.acctext}>
                              New Amount:
                            </Typography>
                            <Typography className={classes.accRightText}>
                              AED 2,000
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
                              AED 1,750
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        justifyContent="space-between"
                        pb={2}
                      >
                        <Grid
                          item
                          container
                          alignItems="center"
                          justifyContent="center"
                          margin={0}
                          p={2}
                          bgcolor={color.primary}
                          style={{ width: `${percentageReleased}%` }}
                        >
                          <Typography
                            variant="body1"
                            style={{ color: "#ffffff" }}
                          >
                            Released: AED {1000}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          container
                          alignItems="center"
                          margin={0}
                          p={2}
                          justifyContent="center"
                          bgcolor={"#475569"}
                          style={{ width: `${percentageRemaining}%` }}
                        >
                          <Typography
                            variant="body1"
                            style={{ color: "#ffffff" }}
                          >
                            In escrow: AED {1500 - 1000}
                          </Typography>
                        </Grid>
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
                            <Typography className={classes.acctext}>
                              Paid amount:
                            </Typography>
                            <Typography className={classes.accRightText}>
                              AED 1,500
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
                              AED 500
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
                    </Grid>
                    <Grid item container className={classes.contentContainer}>
                      <Grid item lg={12} sm={12} md={12} xs={12} pb={2}>
                        <Typography className={classes.MainTitle}>
                          Milestones
                        </Typography>
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
                            <Typography className={classes.acctext}>
                              Original project end date:
                            </Typography>
                            <Typography className={classes.accRightText}>
                              February 23, 2023
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
                              New end date:
                            </Typography>
                            <Typography className={classes.accRightText}>
                              March 01, 2023
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
                      <Grid item container rowGap={2}>
                        <Grid
                          item
                          container
                          justifyContent={"space-between"}
                          rowGap={2}
                        >
                          <Grid
                            item
                            container
                            sm={12}
                            md={3.9}
                            style={{
                              padding: 10,
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
                              <img src={Images.FileVerified} alt="completed" />
                            </Grid>
                            <Grid item pl={1}>
                              <Typography className={classes.titleText}>
                                Completed
                              </Typography>
                              <Typography className={classes.cardValueTexy}>
                                4
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            sm={12}
                            md={3.9}
                            style={{
                              padding: 10,
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
                              <img src={Images.FilePaste} alt="completed" />
                            </Grid>
                            <Grid item pl={1}>
                              <Typography className={classes.titleText}>
                                Delivered
                              </Typography>
                              <Typography className={classes.cardValueTexy}>
                                6
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            sm={12}
                            md={3.9}
                            style={{
                              padding: 10,
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
                              <img src={Images.FileEdit} alt="completed" />
                            </Grid>
                            <Grid item pl={1}>
                              <Typography className={classes.titleText}>
                                Ongoing
                              </Typography>
                              <Typography className={classes.cardValueTexy}>
                                2
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          rowGap={2}
                          justifyContent={"space-between"}
                        >
                          <Grid
                            item
                            container
                            sm={12}
                            md={3.9}
                            style={{
                              padding: 10,
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
                              <img src={Images.FileAdd} alt="completed" />
                            </Grid>
                            <Grid item pl={1}>
                              <Typography className={classes.titleText}>
                                Delayed
                              </Typography>
                              <Typography className={classes.cardValueTexy}>
                                14
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            sm={12}
                            md={3.9}
                            style={{
                              padding: 10,
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
                              <img src={Images.FileAdd} alt="completed" />
                            </Grid>
                            <Grid item pl={1}>
                              <Typography className={classes.titleText}>
                                New
                              </Typography>
                              <Typography className={classes.cardValueTexy}>
                                14
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            sm={12}
                            md={3.9}
                            style={{
                              padding: 10,
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
                              <img src={Images.FileUnknown} alt="completed" />
                            </Grid>
                            <Grid item pl={1}>
                              <Typography className={classes.titleText}>
                                Not Started
                              </Typography>
                              <Typography className={classes.cardValueTexy}>
                                3
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          sm={12}
                          md={3.9}
                          style={{
                            padding: 10,
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
                            <img src={Images.FileBlock} alt="completed" />
                          </Grid>
                          <Grid item pl={1}>
                            <Typography className={classes.titleText}>
                              Cancelled
                            </Typography>
                            <Typography className={classes.cardValueTexy}>
                              5
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid> */}
                  </>
                )
              ) : null}
              {tabValue === 1 ? (
                <Milestone
                  handleClick={(type, data) => {
                    if (type === "back") {
                      setTabValue(0);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (type === "next") {
                      setTabValue(2);
                    }
                  }}
                  villa={projectDetails}
                />
              ) : null}
              {tabValue === 2 ? (
                <Budget
                  handleClick={(type, data) => {
                    if (type === "back") {
                      setTabValue(1);
                    }
                  }}
                  villa={projectDetails}
                />
              ) : null}
              {tabValue === 3 ? <PaymentHistoryList villa={villa} /> : null}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <BlueAbout />
      <ImageViewer
        url={imgurl}
        visible={isPressed}
        onClose={() => {
          setIsPressed(false);
        }}
      />
    </>
  );
}
