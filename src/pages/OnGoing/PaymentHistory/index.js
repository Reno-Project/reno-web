import {
  CircularProgress,
  Divider,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles";
import { color } from "../../../config/theme";
import { useTheme } from "@emotion/react";
import _, { isArray, isEmpty } from "lodash";

import { Setting } from "../../../utils/Setting";
import { getApiData } from "../../../utils/APIHelper";
import moment from "moment";

const PaymentHistory = (props) => {
  const { villa } = props;
  const classes = useStyles();
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const [payments, setPayments] = useState([
    {
      updatedAt: "2023-06-07T11:52:18.730Z",
      id: 257,
      name: "B1",
      material_type: "marble",
      material_unit: "tonns",
      material_unit_price: 2100,
      qty: 100,
      milestone_id: 234,
      manpower_rate: 10,
      days: 11,
      specification:
        "Architecto dolor sunt magnam beatae. Exercitationem perferendis dolorem animi est molestias voluptas tempore odit dolor. Dolorum quam qui eum perferendis quibusdam et at consequatur.",
      total_item: 210110,
      status: "pending",
      images: [
        {
          id: 819,
          image:
            "https://static.renohome.io/documents/a11df96d-fd10-41a2-898a-28f2ca439742",
          type: "image/png",
        },
        {
          id: 820,
          image:
            "https://static.renohome.io/documents/dae9e998-9ed6-4740-a5cd-66c5d10bcb57",
          type: "image/png",
        },
        {
          id: 821,
          image:
            "https://static.renohome.io/documents/7affcaee-ad9b-4450-9e4f-8c180df7b934",
          type: "image/png",
        },
      ],
    },
    {
      updatedAt: "2023-06-07T11:52:18.740Z",
      id: 258,
      name: "B1m2",
      material_type: "adasd",
      material_unit: "Kg",
      material_unit_price: 2100,
      qty: 10,
      milestone_id: 239,
      manpower_rate: 101,
      days: 10,
      specification: "sdfsdf",
      total_item: 22010,
      status: "pending",
      images: [
        {
          id: 817,
          image:
            "https://static.renohome.io/documents/fe41525b-edef-496e-a44a-ca474bbc22bf",
          type: "image/png",
        },
        {
          id: 818,
          image:
            "https://static.renohome.io/documents/1fb8106d-e11d-45eb-b575-eee3f9625831",
          type: "image/png",
        },
        {
          id: 822,
          image:
            "https://static.renohome.io/documents/5456faa6-cafc-4c40-bbbb-fd493389c5a3",
          type: "image/png",
        },
      ],
    },
  ]);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const percentageReleased = (750 / 1500) * 100;
  const percentageRemaining = 100 - percentageReleased;

  useEffect(() => {
    // getPaymentList();
  }, []);
  async function getPaymentList() {
    setPaymentLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.paymentList}?${villa?.proposal_id}`,
        "GET",
        {}
      );
      if (response.success) {
        if (isArray(response?.data) && !isEmpty(response?.data)) {
          setPayments(response?.data);
        } else {
          setPayments([]);
        }
      }
      setPaymentLoader(false);
    } catch (error) {
      setPaymentLoader(false);
      console.log("err===>", error);
    }
  }
  const fileInputRef = useRef();
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

  const handleChange = (e, i) => {
    let dummyarr = [...budgetDetails];
    dummyarr[i].expanded = !dummyarr[i].expanded;
    setBudgetDetails(dummyarr);
  };

  return (
    <Grid container>
      <Grid item container className={classes.contentContainer} mt={2}>
        <Grid item lg={12} sm={12} md={12} xs={12} pb={2}>
          <Typography className={classes.MainTitle}>Payment</Typography>
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
                Pending amount:
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
                Pending amount:
              </Typography>
              <Typography className={classes.accRightText}>AED 500</Typography>
            </Grid>
          </Grid>
        </Grid>
        <div
          style={{
            width: "100%",
            padding: "14px 0px ",
            marginBottom: 20,
          }}
        >
          <Divider />
        </div>
      </Grid>
      <Grid
        item
        container
        style={{ border: "1px solid #F2F3F4", borderRadius: 8, padding: 20 }}
      >
        <Grid
          item
          xs={12}
          style={{ borderBottom: "1px solid #F2F3F4", marginBottom: 15 }}
        >
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
                  Completed
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
                    {0}
                  </span>
                </Typography>
              }
            />
            <Tab
              label={
                <Typography style={{ display: "flex", alignItems: "center" }}>
                  In escrow
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
                    {0}
                  </span>
                </Typography>
              }
            />

            <Tab
              label={
                <Typography style={{ display: "flex", alignItems: "center" }}>
                  Pending Payment
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
                    {0}
                  </span>
                </Typography>
              }
            />
          </Tabs>
        </Grid>

        {paymentLoader ? (
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
          isArray(payments) &&
          !isEmpty(payments) &&
          payments?.map((item, index) => {
            return (
              <Grid container className={classes.card} rowGap={2}>
                <Grid item xs={12} md={3} justifyContent={"flex-start"}>
                  {isArray(item?.images) && !isEmpty(item?.images) && (
                    <>
                      <img
                        style={{
                          width: "100%",
                          height: 170,
                          objectFit: "contain",
                          borderRadius: 4,
                        }}
                        src={item?.images[0]?.image}
                        alt="budget"
                      />
                    </>
                  )}
                </Grid>
                <Grid item container xs={12} md={9}>
                  <Grid item container xs={12}>
                    <Typography
                      fontFamily={"ElMEssiri-Regular"}
                      fontWeight="bold"
                      pl={1}
                    >
                      {item?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography
                      pl={1}
                      fontFamily={"Roobert-Regular"}
                      fontSize={14}
                      color={"#646F86"}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Typography>
                  </Grid>
                  <TableContainer
                    style={{
                      padding: 10,
                      boxSizing: "border-box",
                    }}
                  >
                    <Table className={classes.customtable}>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            align="right"
                            style={{
                              fontFamily: "Roobert-Regular !important",
                            }}
                          >
                            Amount
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontFamily: "Roobert-Regular !important",
                            }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            style={{
                              fontFamily: "Roobert-Regular !important",
                            }}
                            align="right"
                          >
                            Payment Date
                          </TableCell>
                        </TableRow>
                        <TableRow key={"Manpower"}>
                          <TableCell align="right">
                            <Typography
                              style={{ fontSize: 16, fontWeight: "600" }}
                              fontFamily={"ElMEssiri-Regular"}
                            >
                              AED {item?.total_item || "-"}
                            </Typography>
                          </TableCell>

                          <TableCell align="right">
                            <Typography
                              style={{ fontSize: 16, fontWeight: "600" }}
                              fontFamily={"ElMEssiri-Regular"}
                            >
                              {item?.status || "-"}
                            </Typography>
                          </TableCell>

                          <TableCell align="right">
                            <Typography
                              style={{ fontSize: 16, fontWeight: "600" }}
                              fontFamily={"ElMEssiri-Regular"}
                            >
                              {moment(item?.updatedAt).format("LL") || "-"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            );
          })
        )}
      </Grid>
    </Grid>
  );
};

export default PaymentHistory;
