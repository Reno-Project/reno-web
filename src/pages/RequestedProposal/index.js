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
  const [isPressed, setIsPressed] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);

  const [url, setUrl] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    isSubmitted && getProjectDetails();
  }, []);

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

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
                <Grid item container>
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
                      {moment(villa?.createdAt).format("MMMM DD, YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container className={classes.contentContainer}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                  <Typography className={classes.MainTitle}>
                    Project Informations
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent={"flex-end"}
                  style={{ paddingTop: 25, paddingBottom: 25 }}
                >
                  <Grid item lg={5} sm={6} md={6} xs={12} textAlign={"start"}>
                    <Typography className={classes.titleStyle}>
                      Project Name:
                    </Typography>
                  </Grid>
                  <Grid item lg={7} sm={6} md={6} xs={12} textAlign={"end"}>
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
                  style={{ paddingTop: 25, paddingBottom: 25 }}
                >
                  <Grid item lg={5} sm={12} md={6} xs={12}>
                    <Typography className={classes.acctext}>
                      Project Type:
                    </Typography>
                  </Grid>
                  <Grid item lg={7} sm={12} md={6} xs={9} textAlign={"end"}>
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
                              textAlign={"end"}
                            >
                              <Typography className={classes.accRightText}>
                                {milestone?.milestone_name}
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
                                {milestone?.start_date}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              lg={6}
                              sm={12}
                              md={6}
                              xs={12}
                              textAlign={"end"}
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
                                {milestone?.end_date}
                              </Typography>
                            </Grid>

                            <Grid item xs={12}>
                              <Typography className={classes.acctext}>
                                Description:
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography className={classes.accRightText}>
                                {milestone?.description}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography className={classes.acctext}>
                                Budget Details:
                              </Typography>
                            </Grid>
                            <Grid item container xs={12}>
                              {isArray(milestone?.budget) &&
                                !isEmpty(milestone?.budget) &&
                                milestone?.budget?.map((item) => (
                                  <Grid
                                    item
                                    container
                                    style={{
                                      border: `1px solid ${color.borderColor}`,
                                      padding: 8,
                                      borderRadius: 8,
                                    }}
                                  >
                                    {milestone?.budget?.length > 1 && (
                                      <Grid item xs={12} p={2}>
                                        <Typography
                                          variant="h6"
                                          fontWeight={"bold !important"}
                                          className={classes.acctext}
                                        >
                                          `Budget - {index + 1}`
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
                                      >
                                        {item?.specification}
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
                                      </TableRow>
                                      <TableRow>
                                        <TableCell variant="head">
                                          Manpower Rate
                                        </TableCell>
                                        <TableCell variant="head" colSpan={2}>
                                          Days
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
                                      </TableRow>
                                    </Table>

                                    <Grid item container>
                                      <ImageList
                                        style={{ flex: 1 }}
                                        // sx={{ width: 500 }}
                                        cols={3}
                                      >
                                        {isArray(item?.buget_image) &&
                                          !isEmpty(item?.buget_image) &&
                                          item?.buget_image?.map((ele) => (
                                            <ImageListItem key={ele.ud}>
                                              <img
                                                src={`${ele.image}?w=164&h=164&fit=crop&auto=format`}
                                                srcSet={`${ele.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                alt={`budget_image_${ele?.id}`}
                                                loading="lazy"
                                                style={{
                                                  width: 180,
                                                  height: 150,
                                                }}
                                              />
                                            </ImageListItem>
                                          ))}
                                      </ImageList>
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
                        {villa?.start_date}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} sm={12} md={6} xs={12} textAlign={"end"}>
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
                        {villa?.end_date}
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
                      {villa?.project_type?.toLowerCase() ===
                      "Interior design".toLowerCase()
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
                                  textAlign={"end"}
                                >
                                  {item?.unit_Type === 1 ? (
                                    <Typography
                                      className={classes.accRightText}
                                    >
                                      Villa
                                    </Typography>
                                  ) : item?.unit_Type === 2 ? (
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
                                  textAlign={"end"}
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
                                  textAlign={"end"}
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
                                  textAlign={"end"}
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
                                  textAlign={"end"}
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
                                  textAlign={"end"}
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
                                  textAlign="end"
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
                        : villa?.project_type?.toLowerCase() ===
                          "Home renovation".toLowerCase()
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
                                  textAlign={"end"}
                                >
                                  {item?.unit_Type === 1 ? (
                                    <Typography
                                      className={classes.accRightText}
                                    >
                                      Villa
                                    </Typography>
                                  ) : item?.unit_Type === 2 ? (
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
                                  textAlign={"end"}
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
                                  textAlign={"end"}
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
                                  textAlign={"end"}
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
                                  textAlign={"end"}
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
                                  textAlign={"end"}
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
                                  textAlign="end"
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
                        : villa?.project_type?.toLowerCase() ===
                          "Landscaping".toLowerCase()
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
                                  textAlign={"end"}
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
                                  textAlign="end"
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
                        : villa?.project_type?.toLowerCase() ===
                          "Kitchen".toLowerCase()
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
                                {objectWithCheckIconTrue?.title ===
                                "Gallery layout" ? (
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
                                      textAlign={"end"}
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
                                ) : objectWithCheckIconTrue?.title ===
                                  "Corridor layout" ? (
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
                                      textAlign={"end"}
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
                                ) : objectWithCheckIconTrue?.title ===
                                  "U shape layout" ? (
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
                                      textAlign={"end"}
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
                                ) : objectWithCheckIconTrue?.title ===
                                    "L shape layout" ||
                                  objectWithCheckIconTrue?.title ===
                                    "L shape layout " ? (
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
                                      textAlign={"end"}
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
                                      textAlign={"end"}
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
                                      textAlign={"end"}
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
                                      textAlign={"end"}
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
                                      textAlign={"end"}
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
                                      textAlign={"end"}
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
                                  textAlign="end"
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
                                {objectWithCheckIconTrue?.title ===
                                "Two piece" ? (
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
                                      textAlign={"end"}
                                    >
                                      <Typography
                                        className={classes.accRightText}
                                      >
                                        <img
                                          src={Images.b2_pieces}
                                          alt="Two-piece "
                                        />
                                      </Typography>
                                    </Grid>
                                  </>
                                ) : objectWithCheckIconTrue?.title ===
                                  "Three piece" ? (
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
                                      textAlign={"end"}
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
                                      textAlign={"end"}
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
                                  textAlign={"end"}
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
                                      textAlign={"end"}
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
                                      textAlign={"end"}
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
                        paddingBottom={"14px"}
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
                        textAlign={"end"}
                        paddingBottom={"14px"}
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
                        paddingBottom={"14px"}
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
                        justifyContent={"flex-end"}
                        wrap="nowrap"
                        paddingBottom={"14px"}
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
                          navigate("/create-proposal", { state: villa });
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
