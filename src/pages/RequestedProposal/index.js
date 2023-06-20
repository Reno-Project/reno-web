import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Divider,
  TableRow,
  TableCell,
  Table,
  ImageList,
  ImageListItem,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Images from "../../config/images";
import { useLocation, useNavigate } from "react-router-dom";
import BlueAbout from "../../components/BlueAbout";
import moment from "moment";
import { isArray, isEmpty } from "lodash";
import { useTheme } from "@mui/styles";
import ImageViewer from "../../components/ImageViewer";
import { color } from "../../config/theme";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";

export default function RequestedProposal() {
  const location = useLocation();
  const [villa, setVilla] = useState(location?.state?.villa);
  const nData = villa?.submitted_by_reno
    ? villa?.reno_data || {}
    : villa?.user_data || {};
  const isSubmitted = location?.state?.status === "submitted";
  const fromManageProject = location?.state?.activeScreen === "/manage-project";
  const [isPressed, setIsPressed] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);

  const [url, setUrl] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProjectDetails();
  }, []);

  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

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
        setVilla(response?.data[0]);
      }
      setPageLoad(false);
    } catch (error) {
      console.log("error:===>>>", error);
      setPageLoad(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#F9F9FA" }}>
      <Grid
        item
        container
        xs={12}
        sm={9}
        md={9}
        lg={9}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ padding: "40px 0 40px" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={9}
          className={classes.MainContainer}
          padding={"30px"}
        >
          {pageLoad ? (
            <div className={classes.dataMain}>
              <CircularProgress style={{ color: color.primary }} />
            </div>
          ) : (
            <>
              <Grid
                item
                container
                wrap={sm ? "wrap" : "nowrap"}
                alignItems={"center"}
                columnGap={2}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={nData?.profile_url}
                    alt="chat"
                    className={classes.imageStyle}
                  />
                  <div className={classes.activeContainer}>
                    <div className={classes.activeStatus}></div>
                  </div>
                </div>
                <Grid item container style={{ width: "100%", margin: 0 }}>
                  <Grid item lg={9} md={9} sm={9} xs={9}>
                    <Typography className={classes.titleText}>
                      {nData?.username}
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={3} xs={3} textAlign={"end"}>
                    <Typography className={classes.requestDate}>
                      {isSubmitted ? "Submitted Date" : "Request Date"}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={9}
                    md={9}
                    sm={6}
                    xs={6}
                    style={{ marginTop: 5 }}
                  >
                    <span
                      variant="contained"
                      style={{
                        backgroundColor: isSubmitted ? "#32D583" : "#E9B55C",
                        padding: 8,
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        lineHeight: "16px",
                        borderRadius: 4,
                        color: color.white,
                      }}
                    >
                      {isSubmitted ? "SUBMITTED" : "REQUEST"}
                    </span>
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Typography className={classes.dateStyle}>
                      {isSubmitted
                        ? moment(villa?.updatedAt).format("MMMM DD, YYYY")
                        : moment(villa?.createdAt).format("MMMM DD, YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container className={classes.contentContainer}>
                <Grid
                  item
                  lg={12}
                  sm={12}
                  md={12}
                  xs={12}
                  paddingTop={md ? "16px" : 0}
                >
                  <Typography className={classes.MainTitle}>
                    Project Informations
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent={"flex-end"}
                  style={{
                    paddingTop: md ? 16 : 25,
                    paddingBottom: md ? 16 : 25,
                  }}
                >
                  <Grid item lg={5} sm={12} md={6} xs={12} textAlign={"start"}>
                    <Typography className={classes.titleStyle}>
                      Project Name:
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    sm={12}
                    md={6}
                    xs={12}
                    textAlign={md ? "start" : "end"}
                    paddingTop={md ? "16px" : 0}
                  >
                    <Typography className={classes.titleStyleRight}>
                      {villa?.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
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
                  item
                  container
                  alignItems="center"
                  justifyContent={"flex-end"}
                  style={{
                    paddingTop: md ? 16 : 25,
                    paddingBottom: md ? 16 : 25,
                  }}
                >
                  <Grid item lg={5} sm={12} md={6} xs={12}>
                    <Typography className={classes.acctext}>
                      Project Type:
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={7}
                    sm={12}
                    md={6}
                    xs={12}
                    textAlign={md ? "start" : "end"}
                    paddingTop={md ? "16px" : 0}
                  >
                    <Typography className={classes.accRightText}>
                      {villa?.project_type}
                    </Typography>
                  </Grid>
                </Grid>

                {isSubmitted &&
                  isArray(villa?.milestone) &&
                  !isEmpty(villa?.milestone) && (
                    <Grid
                      item
                      container
                      justifyContent={"flex-end"}
                      rowSpacing={2}
                    >
                      {villa?.milestone?.map((milestone, index) => {
                        let amount = 0;
                        if (
                          isArray(milestone?.budget) &&
                          milestone?.budget.length > 0
                        ) {
                          milestone?.budget.forEach((bud) => {
                            let count =
                              parseInt(bud?.material_unit_price || 0) *
                                parseInt(bud?.qty || 0) +
                              parseInt(bud?.manpower_rate || 0) *
                                parseInt(bud?.days || 0);
                            amount += count;
                          });
                        }
                        return (
                          <>
                            {villa?.milestone?.lenght > 1 && (
                              <Grid item container xs={12}>
                                <Typography
                                  variant="h6"
                                  fontWeight={"bold !important"}
                                  className={classes.acctext}
                                >
                                  Milestone - {index + 1}
                                </Typography>
                              </Grid>
                            )}
                            <Grid item lg={5} sm={12} md={6} xs={12}>
                              <Typography className={classes.acctext}>
                                Milestone Name:
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              lg={7}
                              sm={12}
                              md={6}
                              xs={12}
                              textAlign={md ? "start" : "end"}
                              paddingTop={md ? "16px" : 0}
                            >
                              <Typography className={classes.accRightText}>
                                {milestone?.milestone_name}
                              </Typography>
                            </Grid>
                            <Grid item lg={5} sm={12} md={6} xs={12}>
                              <Typography className={classes.acctext}>
                                Total milestone amount:
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              lg={7}
                              sm={12}
                              md={6}
                              xs={12}
                              textAlign={md ? "start" : "end"}
                              paddingTop={md ? "16px" : 0}
                            >
                              <Typography className={classes.accRightText}>
                                AED {amount || 0}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} sm={12} md={6} xs={12}>
                              <Typography
                                component={"span"}
                                className={classes.acctext}
                                pr={1}
                              >
                                Start Date:
                              </Typography>
                              <Typography
                                component={"span"}
                                className={classes.accRightText}
                              >
                                {moment(milestone?.start_date).format(
                                  "MMM DD, YYYY"
                                )}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              lg={6}
                              sm={12}
                              md={6}
                              xs={12}
                              textAlign={md ? "start" : "end"}
                              paddingTop={md ? "16px" : "0px"}
                            >
                              <Typography
                                component={"span"}
                                className={classes.acctext}
                                pr={1}
                              >
                                End Date:
                              </Typography>
                              <Typography
                                component={"span"}
                                className={classes.accRightText}
                              >
                                {moment(milestone?.end_date).format(
                                  "MMM DD, YYYY"
                                )}
                              </Typography>
                            </Grid>

                            <Grid item xs={12}>
                              <Typography className={classes.acctext}>
                                Description:
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                className={classes.accRightText}
                                style={{
                                  backgroundColor: "#F5F6F8",
                                  padding: "11px 15px",
                                  gap: "10px",
                                  margin: "10px 0px",
                                }}
                              >
                                {milestone?.description}
                              </Typography>
                            </Grid>
                            {isArray(milestone?.budget) &&
                              !isEmpty(milestone?.budget) && (
                                <Grid item xs={12}>
                                  <Typography className={classes.acctext}>
                                    Budget Details:
                                  </Typography>
                                </Grid>
                              )}
                            <Grid item container xs={12}>
                              {isArray(milestone?.budget) &&
                                !isEmpty(milestone?.budget) &&
                                milestone?.budget?.map((item, ind) => (
                                  <Grid
                                    item
                                    container
                                    style={{
                                      border: `1px solid ${color.borderColor}`,
                                      padding: 8,
                                      borderRadius: 8,
                                      marginBottom: 15,
                                    }}
                                  >
                                    {milestone?.budget?.length > 1 && (
                                      <Grid item xs={12} p={2}>
                                        <Typography
                                          variant="h6"
                                          fontWeight={"bold !important"}
                                          className={classes.acctext}
                                        >
                                          {`Budget - ${ind + 1}`}
                                        </Typography>
                                      </Grid>
                                    )}
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography
                                        className={classes.acctext}
                                        px={2}
                                      >
                                        Budget Name:
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={"end"}
                                    >
                                      <Typography
                                        px={2}
                                        className={classes.accRightText}
                                      >
                                        {item?.name}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} mt={2}>
                                      <Typography
                                        px={2}
                                        className={classes.acctext}
                                      >
                                        Specifications:
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography
                                        px={2}
                                        className={classes.accRightText}
                                        style={{
                                          backgroundColor: "#F5F6F8",
                                          padding: "11px 15px",
                                          gap: "10px",
                                          margin: "10px 0px",
                                        }}
                                      >
                                        {item?.specification}
                                      </Typography>
                                    </Grid>
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography
                                        className={classes.acctext}
                                        px={2}
                                      >
                                        Total amount
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={"end"}
                                    >
                                      <Typography
                                        px={2}
                                        className={classes.accRightText}
                                      >
                                        AED{" "}
                                        {item?.material_unit_price * item?.qty +
                                          item?.manpower_rate * item?.days}
                                      </Typography>
                                    </Grid>
                                    <Table className={classes.table}>
                                      <TableRow>
                                        <TableCell variant="head">
                                          Material Type
                                        </TableCell>
                                        <TableCell variant="head">
                                          Material Unit Price
                                        </TableCell>
                                        <TableCell variant="head">
                                          Quantity
                                        </TableCell>
                                        <TableCell variant="head">
                                          Amount
                                        </TableCell>
                                      </TableRow>
                                      <TableRow key={item.id}>
                                        <TableCell
                                          className={classes.accRightText}
                                        >
                                          {item?.material_type}
                                        </TableCell>
                                        <TableCell
                                          className={classes.accRightText}
                                        >
                                          {item?.material_unit}{" "}
                                          {item?.material_unit_price}
                                        </TableCell>
                                        <TableCell
                                          className={classes.accRightText}
                                        >
                                          {item?.qty}
                                        </TableCell>
                                        <TableCell
                                          className={classes.accRightText}
                                        >
                                          AED{" "}
                                          {item?.material_unit_price *
                                            item?.qty}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell variant="head">
                                          Manpower Rate
                                        </TableCell>
                                        <TableCell variant="head" colSpan={2}>
                                          Days
                                        </TableCell>
                                        <TableCell variant="head" colSpan={2}>
                                          Amount
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell
                                          className={classes.accRightText}
                                        >
                                          {item?.manpower_rate}
                                        </TableCell>
                                        <TableCell
                                          colSpan={2}
                                          className={classes.accRightText}
                                        >
                                          {item?.days}
                                        </TableCell>
                                        <TableCell
                                          colSpan={2}
                                          className={classes.accRightText}
                                        >
                                          AED {item?.manpower_rate * item?.days}
                                        </TableCell>
                                      </TableRow>
                                    </Table>

                                    <Grid item container>
                                      {isArray(item?.buget_image) &&
                                        !isEmpty(item?.buget_image) &&
                                        item?.buget_image?.map((ele) => (
                                          <a
                                            href={url ? `${url}` : null}
                                            target="_blank"
                                          >
                                            <img
                                              onClick={() => {
                                                if (
                                                  ele?.type?.includes("image")
                                                ) {
                                                  setIsPressed(true);
                                                  setImgUrl(ele?.image);
                                                  setUrl("");
                                                } else {
                                                  setUrl(ele?.image);
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
                                        ))}
                                    </Grid>
                                  </Grid>
                                ))}
                            </Grid>
                            {villa?.milestone?.length > 1 && (
                              <div style={{ width: "100%", paddingTop: 14 }}>
                                <Divider />
                              </div>
                            )}
                          </>
                        );
                      })}
                      {villa?.milestone?.length > 1 && (
                        <div style={{ width: "100%" }}>
                          <Divider />
                        </div>
                      )}
                    </Grid>
                  )}
                {!isSubmitted && (
                  <>
                    <Grid item lg={6} sm={12} md={6} xs={12}>
                      <Typography
                        component={"span"}
                        className={classes.acctext}
                        pr={1}
                      >
                        Start Date:
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.accRightText}
                      >
                        {moment(villa?.start_date, "DD/MM/YYYY").format(
                          "MMM DD, YYYY"
                        )}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      sm={12}
                      md={6}
                      xs={12}
                      textAlign={md ? "start" : "end"}
                      paddingTop={md ? "16px" : "0px"}
                    >
                      <Typography
                        component={"span"}
                        className={classes.acctext}
                        pr={1}
                      >
                        End Date:
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.accRightText}
                      >
                        {moment(villa?.end_date, "DD/MM/YYYY").format(
                          "MMM DD, YYYY"
                        )}
                      </Typography>
                    </Grid>
                  </>
                )}
                {!isSubmitted &&
                  isArray(villa?.form_json) &&
                  !isEmpty(villa?.form_json) && (
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent={"flex-end"}
                      rowSpacing={2}
                    >
                      {villa?.exp_id == 1
                        ? villa?.form_json?.map((item, index) => {
                            return (
                              <>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Unit Type :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  {item?.unit_type?.id == 1 ? (
                                    <Typography
                                      className={classes.accRightText}
                                    >
                                      Villa
                                    </Typography>
                                  ) : item?.unit_type?.id == 2 ? (
                                    <Typography
                                      className={classes.accRightText}
                                    >
                                      Apartment
                                    </Typography>
                                  ) : (
                                    <Typography
                                      className={classes.accRightText}
                                    >
                                      Studio
                                    </Typography>
                                  )}
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Size(sqm) :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.size}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Floors :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.floors}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Bedrooms :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.bedrooms}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Bathrooms :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.bathrooms}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Kitchen :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.kitchen}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Preferred style :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  {item?.preferred_style?.map(
                                    (item1, index) => (
                                      <div
                                        key={index}
                                        style={{ display: "inline-block" }}
                                      >
                                        <Typography
                                          className={classes.accRightText}
                                          pr={0.5}
                                        >
                                          {item1.title}
                                          {item?.preferred_style?.length - 1 !==
                                          index
                                            ? ", "
                                            : " "}
                                        </Typography>
                                      </div>
                                    )
                                  )}
                                </Grid>
                              </>
                            );
                          })
                        : villa?.exp_id == 3
                        ? villa?.form_json?.map((item, index) => {
                            return (
                              <>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Unit Type :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  {item?.unit_type?.id == 1 ? (
                                    <Typography
                                      className={classes.accRightText}
                                    >
                                      Villa
                                    </Typography>
                                  ) : item?.unit_type?.id == 2 ? (
                                    <Typography
                                      className={classes.accRightText}
                                    >
                                      Apartment
                                    </Typography>
                                  ) : (
                                    <Typography
                                      className={classes.accRightText}
                                    >
                                      Studio
                                    </Typography>
                                  )}
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Size(sqm) :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.size}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Floors :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.floors}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Bedrooms :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.bedrooms}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Bathrooms :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.bathrooms}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Kitchen :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.kitchen}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Required services :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  {item?.require_service?.map(
                                    (item1, index) => (
                                      <div
                                        key={index}
                                        style={{ display: "inline-block" }}
                                      >
                                        <Typography
                                          className={classes.accRightText}
                                          pr={0.5}
                                        >
                                          {item1?.title}
                                          {item?.require_service?.length - 1 !==
                                          index
                                            ? ", "
                                            : " "}
                                        </Typography>
                                      </div>
                                    )
                                  )}
                                </Grid>
                              </>
                            );
                          })
                        : villa?.exp_id == 5
                        ? villa?.form_json?.map((item, index) => {
                            return (
                              <>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Size(sqm) :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.size}
                                  </Typography>
                                </Grid>
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Include appliances:
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  {item?.include?.map((item1, index) => (
                                    <div
                                      key={index}
                                      style={{ display: "inline-block" }}
                                    >
                                      <Typography
                                        className={classes.accRightText}
                                        pr={0.5}
                                      >
                                        {item1?.title}
                                        {item?.include?.length - 1 !== index
                                          ? ", "
                                          : " "}
                                      </Typography>
                                    </div>
                                  ))}
                                </Grid>
                              </>
                            );
                          })
                        : villa?.exp_id == 2
                        ? villa?.form_json?.map((item, index) => {
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Gallery layout
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Corridor layout
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        U shape layout
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        L shape layout
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Peninsula layout
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        New plumbing
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Is the demolition required?
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        With island?
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Built-in appliances?
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
                                    >
                                      <Typography
                                        className={classes.accRightText}
                                      >
                                        Yes
                                      </Typography>
                                    </Grid>
                                  </>
                                ) : null}
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Include appliances:
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  {item?.include_Appliances?.map(
                                    (item1, index) => (
                                      <div
                                        key={index}
                                        style={{ display: "inline-block" }}
                                      >
                                        <Typography
                                          className={classes.accRightText}
                                          style={{
                                            marginRight:
                                              item?.include_Appliances?.length -
                                                1 !==
                                              index
                                                ? 3
                                                : 0,
                                          }}
                                        >
                                          {item1.title}
                                          {item?.include_Appliances?.length -
                                            1 !==
                                          index
                                            ? ", "
                                            : " "}
                                        </Typography>
                                      </div>
                                    )
                                  )}
                                </Grid>

                                {villa?.form_json?.length > 1 && (
                                  <div
                                    style={{ width: "100%", paddingTop: 14 }}
                                  >
                                    <Divider />
                                  </div>
                                )}
                              </>
                            );
                          })
                        : villa?.form_json?.map((item, index) => {
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Two-piece
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Three piece
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Four piece
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                <Grid item lg={5} sm={12} md={6} xs={12}>
                                  <Typography className={classes.acctext}>
                                    Size(sqm) :
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  lg={7}
                                  sm={12}
                                  md={6}
                                  xs={12}
                                  textAlign={md ? "start" : "end"}
                                  paddingTop={md ? "7px" : 0}
                                >
                                  <Typography className={classes.accRightText}>
                                    {item?.size}
                                  </Typography>
                                </Grid>
                                {item?.new_plumbing === true ? (
                                  <>
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        New plumbing
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
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
                                    <Grid item lg={5} sm={12} md={6} xs={12}>
                                      <Typography className={classes.acctext}>
                                        Is the demolition required?
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={7}
                                      sm={12}
                                      md={6}
                                      xs={12}
                                      textAlign={md ? "start" : "end"}
                                      paddingTop={md ? "7px" : 0}
                                    >
                                      <Typography
                                        className={classes.accRightText}
                                      >
                                        Yes
                                      </Typography>
                                    </Grid>
                                  </>
                                ) : null}
                                {villa?.form_json.length > 1 && (
                                  <div
                                    style={{ width: "100%", paddingTop: 14 }}
                                  >
                                    <Divider />
                                  </div>
                                )}
                              </>
                            );
                          })}

                      <Grid
                        item
                        lg={5}
                        sm={12}
                        md={6}
                        xs={12}
                        paddingBottom={md ? "5px" : "14px"}
                      >
                        <Typography className={classes.acctext}>
                          Project Budget:
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        lg={7}
                        sm={12}
                        md={6}
                        xs={12}
                        textAlign={md ? "start" : "end"}
                        paddingBottom={md ? "5px" : "14px"}
                      >
                        <Typography className={classes.accRightText}>
                          AED {villa?.budget || 0}
                        </Typography>
                      </Grid>
                      <div style={{ width: "100%" }}>
                        <Divider />
                      </div>
                      <Grid
                        item
                        lg={5}
                        sm={12}
                        md={6}
                        xs={12}
                        paddingBottom={md ? "5px" : "14px"}
                      >
                        <Typography className={classes.acctext}>
                          Project Location:
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        lg={7}
                        sm={12}
                        md={6}
                        xs={12}
                        justifyContent={md ? "flex-start" : "flex-end"}
                        wrap="nowrap"
                        paddingBottom={md ? "5px" : "14px"}
                      >
                        <Typography className={classes.linkText}>
                          {villa?.location}
                        </Typography>

                        <img
                          alt="logo"
                          src={Images.Location}
                          // style={{ width: '12%' }}
                        />
                      </Grid>
                      <div style={{ width: "100%", paddingBottom: 14 }}>
                        <Divider />
                      </div>
                    </Grid>
                  )}

                {isArray(villa?.project_image) &&
                  villa?.project_image.length > 0 && (
                    <Grid item container alignContent={"center"} pt={"25px"}>
                      <Grid item xs={12}>
                        <Typography className={classes.acctext}>
                          Project Files:
                        </Typography>
                      </Grid>
                      <Grid item lg={12}>
                        {villa?.project_image?.map((item, index) => {
                          return (
                            <a href={url ? `${url}` : null} target="_blank">
                              <img
                                onClick={() => {
                                  if (item?.type?.includes("image")) {
                                    setIsPressed(true);
                                    setImgUrl(item?.image);
                                    setUrl("");
                                  } else {
                                    setUrl(item?.image);
                                    setImgUrl("");
                                  }
                                }}
                                alt="logo"
                                src={
                                  item?.type?.includes("image")
                                    ? item?.image
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
                        })}
                      </Grid>
                    </Grid>
                  )}

                {!isSubmitted && (
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
                        disabled={true}
                      >
                        Request clarifications
                      </Button>
                    </Grid>
                    <Grid item sm={5.9} xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          navigate("/create-proposal", {
                            state: {
                              villa,
                              fromManageProject,
                            },
                          });
                        }}
                      >
                        Submit proposal
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <BlueAbout />
      <ImageViewer
        url={imgurl}
        visible={isPressed}
        isPdf={url}
        onClose={() => {
          setIsPressed(false);
        }}
      />
    </div>
  );
}
