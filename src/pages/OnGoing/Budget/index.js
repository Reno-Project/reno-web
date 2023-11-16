import {
  Button,
  CircularProgress,
  Collapse,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListItemButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  Modal,
  Fade,
  Box,
  Backdrop,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles";
import { HighlightOffOutlined, ImageOutlined } from "@mui/icons-material";
import { color } from "../../../config/theme";
import CInput from "../../../components/CInput";
import { useTheme } from "@emotion/react";
import Images from "../../../config/images";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import _, { isArray, isEmpty, isNull, isObject } from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Setting } from "../../../utils/Setting";
import { toast } from "react-toastify";
import { getAPIProgressData, getApiData } from "../../../utils/APIHelper";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/reducers/auth/actions";
import ConfirmModel from "../../../components/ConfirmModel";
import CAutocomplete from "../../../components/CAutocomplete";
import ProfileSuccessModal from "../../../components/ProfileSuccessModal";
import moment from "moment";

export default function Budget(props) {
  const { handleClick = () => null, villa, createProposal } = props;
  const classes = useStyles();
  const [deleteIND, setDeleteIND] = useState(null);
  const { setProposalDetails } = authActions;
  //const percentageSpent = (spentAmount / totalAmount) * 100
  const percentageReleased = (1000 / 1500) * 100;
  const percentageRemaining = 100 - percentageReleased;

  const [budgetDetails, setBudgetDetails] = useState([
    {
      updatedAt: "2023-06-12T03:17:51.483Z",
      id: 528,
      name: "Elaine Kinney",
      material_type: "Mechelle Pugh",
      material_unit: "tonns",
      material_unit_price: 380,
      qty: 22,
      milestone_id: 471,
      manpower_rate: 535,
      days: 22,
      specification: "Qui voluptas fugiat ",
      total_item: 20130,
      buget_image: [
        {
          id: 1048,

          image: Images.building,
          type: "image/jpeg",
        },
        {
          id: 1049,
          image: Images.building,
          type: "image/jpeg",
        },
      ],
    },
    {
      updatedAt: "2023-06-12T03:17:51.483Z",
      id: 528,
      name: "Elaine Kinney",
      material_type: "Mechelle Pugh",
      material_unit: "tonns",
      material_unit_price: 380,
      qty: 22,
      milestone_id: 471,
      manpower_rate: 535,
      days: 22,
      specification: "Qui voluptas fugiat ",
      total_item: 20130,
      buget_image: [
        {
          id: 1048,
          image: Images.building,
          type: "image/jpeg",
        },
        {
          id: 1049,
          image: Images.building,
          type: "image/jpeg",
        },
      ],
    },
    {
      updatedAt: "2023-06-12T03:17:51.483Z",
      id: 528,
      name: "Elaine Kinney",
      material_type: "Mechelle Pugh",
      material_unit: "tonns",
      material_unit_price: 380,
      qty: 22,
      milestone_id: 471,
      manpower_rate: 535,
      days: 22,
      specification: "Qui voluptas fugiat ",
      total_item: 20130,
      buget_image: [
        {
          id: 1048,
          image: Images.building,
          type: "image/jpeg",
        },
        {
          id: 1049,
          image: Images.building,
          type: "image/jpeg",
        },
      ],
    },
  ]);
  const [budgetLoader, setBudgetLoader] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? 300 : 600,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    padding: "25px 25px 0px 25px",
  };

  const [amounts, setAmounts] = useState([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [btnUpdateLoader, setBtnUpdateLoader] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getBudgetList();
    getMilestoneList();
  }, []);

  useEffect(() => {
    const array = [];

    budgetDetails.map((bud) => {
      let count =
        parseInt(bud.material_unit_price || 0) * parseInt(bud.qty || 0) +
        parseInt(bud.manpower_rate || 0) * parseInt(bud.days || 0);
      array.push(count);
    });
    setAmounts(array);
  }, [budgetDetails]);

  async function getBudgetList() {
    setBudgetLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.budgetList}/${villa?.proposal_id}`,
        "GET",
        {}
      );
      if (response.success) {
        if (
          isArray(response?.data?.budget) &&
          !isEmpty(response?.data?.budget)
        ) {
          setBudgetDetails(response?.data?.budget);
        } else {
          setBudgetDetails([]);
        }
      }
      setBudgetLoader(false);
    } catch (error) {
      setBudgetLoader(false);
      console.log("err===>", error);
    }
  }

  const handleChange = (e, i) => {
    let dummyarr = [...budgetDetails];
    dummyarr[i].expanded = !dummyarr[i].expanded;
    setBudgetDetails(dummyarr);
  };

  async function getMilestoneList() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.milestoneProposalList}/${villa?.proposal_id}`,
        "GET",
        {}
      );
      if (response.success) {
        setMilestones(response?.data);
      }
    } catch (error) {
      console.log("err===>", error);
    }
  }

  return (
    <>
      <Grid container>
        {/* <Grid
          item
          container
          xs={12}
          justifyContent={"space-between"}
          pt={"25px"}
          pb={2}
        >
          <Typography
            variant="h5"
            style={{
              fontFamily: "ElMessiri-SemiBold",
            }}
          >
            Total Budget amount
          </Typography>
          <Typography
            variant="h5"
            style={{
              fontFamily: "ElMessiri-SemiBold",
            }}
          >
            AED{" "}
            {(isArray(budgetDetails) &&
              !isEmpty(budgetDetails) &&
              budgetDetails?.reduce((acc, bud) => {
                const amount =
                  parseInt(bud?.material_unit_price || 0) *
                    parseInt(bud?.qty || 0) +
                  parseInt(bud?.manpower_rate || 0) * parseInt(bud?.days || 0);
                return acc + amount;
              }, 0)) ||
              0}
          </Typography>
        </Grid> */}
        <Grid item container justifyContent={"space-between"} pt={2}>
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
            <Grid item xs={12} textAlign={"start"}>
              <Typography
                className={classes.acctext}
                style={{
                  color: color.captionText,
                }}
              >
                Project Name:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.accRightText}>
                {villa?.name}
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
            <Grid item xs={12}>
              <Typography
                className={classes.acctext}
                style={{
                  color: color.captionText,
                }}
              >
                Serial ID:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={classes.accRightText}
                style={{ color: color.primary }}
              >
                {villa?.project_slug}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container className={classes.contentContainer}>
          <Grid item lg={12} sm={12} md={12} xs={12} pb={2}>
            <Typography className={classes.MainTitle}>Budget</Typography>
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
                <Typography className={classes.acctext}>New Amount:</Typography>
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

          <Grid item container justifyContent="space-between" pb={2}>
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
              <Typography variant="body1" style={{ color: "#ffffff" }}>
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
              <Typography variant="body1" style={{ color: "#ffffff" }}>
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
        <Grid item container py={2}>
          <Typography className={classes.MainTitle}>Items:</Typography>
        </Grid>
        <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
          <Tabs
            value={tabValue}
            variant="scrollable"
            onChange={(v, b) => {
              setTabValue(b);
            }}
          >
            <Tab
              label={
                <Typography style={{ display: "flex", alignItems: "center" }}>
                  Ongoing
                  <span
                    style={{
                      padding: "2px 8px",
                      margin: "0px 8px",
                      backgroundColor: "#274BF1",
                      color: color.white,
                      fontWeight: "bold",
                      borderRadius: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    {18}
                  </span>
                </Typography>
              }
            />
            <Tab
              label={
                <Typography style={{ display: "flex", alignItems: "center" }}>
                  Delivered
                  <span
                    style={{
                      padding: "2px 8px",
                      margin: "0px 8px",
                      backgroundColor: "#9C64E8",
                      color: color.white,
                      fontWeight: "bold",
                      borderRadius: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    {4}
                  </span>
                </Typography>
              }
            />
            <Tab
              label={
                <Typography style={{ display: "flex", alignItems: "center" }}>
                  Not Started
                  <span
                    style={{
                      padding: "2px 8px",
                      margin: "0px 8px",
                      backgroundColor: "#E9B55C",
                      color: color.white,
                      fontWeight: "bold",
                      borderRadius: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    {3}
                  </span>
                </Typography>
              }
            />
            <Tab
              label={
                <Typography style={{ display: "flex", alignItems: "center" }}>
                  Completed
                  <span
                    style={{
                      padding: "2px 8px",
                      margin: "0px 8px",
                      backgroundColor: "#5CC385",
                      color: color.white,
                      fontWeight: "bold",
                      borderRadius: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    {1}
                  </span>
                </Typography>
              }
            />
          </Tabs>
        </Grid>
        {budgetLoader ? (
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
          isArray(budgetDetails) &&
          !isEmpty(budgetDetails) &&
          budgetDetails?.map((item, index) => {
            const milestoneValue = item?.milestone_id
              ? milestones?.find((e, i) => {
                  return e?.id === item?.milestone_id;
                })
              : item?.milestone;

            return (
              <Grid container className={classes.card}>
                <Grid item container wrap={sm ? "wrap" : "nowrap"}>
                  <Grid item sx={12} justifyContent={"flex-start"}>
                    {isArray(item?.buget_image) &&
                      !isEmpty(item?.buget_image) && (
                        <>
                          <img
                            style={{
                              width: md ? 150 : 220,
                              maxHeight: 170,
                              objectFit: "contain",
                              borderRadius: 4,
                            }}
                            src={item?.buget_image[0]?.image}
                            alt="budget"
                          />
                        </>
                      )}
                  </Grid>
                  <Grid
                    item
                    container
                    sx={12}
                    p={sm ? "10px" : 2}
                    justifyContent={sm ? "flex-start" : "flex-end"}
                  >
                    <Grid
                      item
                      container
                      justifyContent={"space-between"}
                      alignItems={"flex-start"}
                      wrap="nowrap"
                    >
                      <Typography variant="h5" fontFamily={"ElMessiri-Regular"}>
                        {item?.name || "-"}
                      </Typography>
                    </Grid>
                    <Grid item textAlign={sm ? "start" : "end"}>
                      <Typography fontFamily={"ElMEssiri-Regular"}>
                        AED {amounts[index] || 0}
                      </Typography>
                      <Typography
                        fontFamily={"ElMEssiri-Regular"}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <Typography fontFamily={"Roobert-Regular"} mr={1}>
                          Last updated:
                        </Typography>
                        {moment(item?.updatedAt).format("MMMM DD, YYYY")}
                      </Typography>
                    </Grid>
                    <Grid item container justifyContent={"flex-start"}>
                      <ListItemButton
                        style={{
                          color: color.primary,
                          padding: sm && "10px 0px",
                        }}
                        onClick={() => {
                          handleChange(item, index);
                        }}
                      >
                        {item?.expanded ? "Collapse" : "View Subitems"}
                        {item?.expanded ? (
                          <ExpandLessIcon sx={{ ml: 1 }} />
                        ) : (
                          <ExpandMoreIcon sx={{ ml: 1 }} />
                        )}
                      </ListItemButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Collapse
                  in={item?.expanded}
                  timeout="auto"
                  unmountOnExit
                  style={{ width: "100%" }}
                >
                  {/* <CardContent
                    style={{
                      position: "relative",
                      boxSizing: "border-box",
                      width: "100%",
                    }}
                  > */}
                  <Grid item padding={"10px 10px 0px 10px"}>
                    <Typography fontFamily={"ElMEssiri-Regular"} fontSize={18}>
                      Specifications
                    </Typography>
                    <Typography>{item?.specification || "-"}</Typography>
                    <div
                      style={{
                        width: "100%",
                        paddingTop: 14,
                        paddingBottom: 4,
                      }}
                    >
                      <Divider />
                    </div>
                  </Grid>
                  <div className="responsive-table">
                    <TableContainer
                      style={{ padding: 10, boxSizing: "border-box" }}
                    >
                      <Table className={classes.customtable}>
                        <Typography
                          fontFamily={"ElMEssiri-Regular"}
                          fontSize={18}
                        >
                          Manpower
                        </Typography>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              align="right"
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                            >
                              Milestone
                            </TableCell>
                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Manpower rate
                            </TableCell>

                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Days
                            </TableCell>
                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Amount
                            </TableCell>
                            {/* <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Status
                            </TableCell>
                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Last Change
                            </TableCell> */}
                          </TableRow>
                          <TableRow key={"Manpower"}>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {milestoneValue?.milestone_name || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.manpower_rate || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.days || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                AED{" "}
                                {parseInt(item.manpower_rate || 0) *
                                  parseInt(item.days || 0)}
                              </Typography>
                            </TableCell>

                            {/* <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.manpowerStatus || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.manpowerLastChange || "-"}
                              </Typography>
                            </TableCell> */}
                          </TableRow>
                        </TableBody>
                      </Table>
                      <div
                        style={{ width: "100%", padding: "10px 0px 14px 0px" }}
                      >
                        <Divider />
                      </div>
                      <Table className={classes.customtable}>
                        <Typography
                          fontFamily={"ElMEssiri-Regular"}
                          fontSize={18}
                        >
                          Material
                        </Typography>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              align="right"
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                            >
                              Material Type
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                            >
                              Material Unit
                            </TableCell>
                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Unit Price
                            </TableCell>
                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              style={{
                                color: color.captionText,
                                fontFamily: "Roobert-Regular !important",
                              }}
                              align="right"
                            >
                              Amount
                            </TableCell>
                          </TableRow>
                          <TableRow key={"Manpower"}>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.material_type || "-"}
                              </Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.material_unit || "-"}
                              </Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                AED {item?.material_unit_price || "0"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                {item?.qty || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontFamily={"ElMessiri-Regular"}>
                                AED{" "}
                                {parseInt(item.material_unit_price || 0) *
                                  parseInt(item.qty || 0)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Collapse>
              </Grid>
            );
          })
        )}
        <Grid item container alignItems={"center"} mb={2}>
          <Button
            variant="contained"
            onClick={() => {
              // validate(false);
            }}
          >
            <AddCircleOutlineOutlinedIcon
              style={{ color: color.white, marginRight: 4 }}
            />
            Add Budget
          </Button>
        </Grid>
      </Grid>
    </>
  );
}