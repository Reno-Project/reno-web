import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useStyles from "./styles";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  ImageList,
  ImageListItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import Images from "../../config/images";
import { isArray, isEmpty } from "lodash";
import BlueAbout from "../../components/BlueAbout";
import moment from "moment";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import DownloadIcon from "@mui/icons-material/Download";
import { color } from "../../config/theme";
import { Apple } from "@mui/icons-material";

export default function ProjectDetail() {
  const { id } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const [villa, setVilla] = useState({});
  console.log("villa====>>>>>", villa);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProjectDetails();
  }, []);

  async function getProjectDetails() {
    setPageLoad(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.proposalDetails}/${id}`,
        "GET",
        {}
      );
      if (response.success) {
        setVilla(response?.data);
      }
      setPageLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
      setPageLoad(false);
    }
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

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
                <Grid item>
                  <img
                    src={villa?.Contractor?.profile_url}
                    alt="chat"
                    className={classes.imageStyle}
                  />
                  <div className={classes.activeContainer}>
                    <div className={classes.activeStatus}></div>
                  </div>
                </Grid>
                <Grid item container>
                  <Grid item lg={9} md={9} sm={9} xs={9}>
                    <Typography className={classes.titleText}>
                      {villa?.Contractor?.company_name}
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
                        backgroundColor:
                          villa?.status === "submitted" ? "#32D583" : "#E9B55C",
                        padding: 5,
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        lineHeight: "16px",
                      }}
                    >
                      {villa?.status}
                    </Button>
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

                {isArray(villa?.milestone) && !isEmpty(villa?.milestone) && (
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

                <Grid item container alignContent={"center"}>
                  <Grid item lg={12}>
                    {villa?.project_image?.map((item, index) => {
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
                {/* 
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
            </Grid> */}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <BlueAbout />
      <Dialog open={isDialogOpen}>
        <div className={classes.popupImage}>
          <img
            loading="lazy"
            src={Images.header_logo}
            alt={"AppIcon"}
            className={classes.notiAppLogo}
          />
        </div>

        <DialogTitle align="center">Download App</DialogTitle>
        <DialogContent>
          <Grid container columnGap={2} rowGap={2}>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" startIcon={<Apple />}>
                Download on iOS
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                startIcon={
                  <img
                    src={Images.playstore}
                    style={{ width: 20, height: 20 }}
                  />
                }
              >
                Download on Android
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
