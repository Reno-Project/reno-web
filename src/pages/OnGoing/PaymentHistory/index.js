import {
  Box,
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
import { DataGrid, GridPagination, GridToolbar } from "@mui/x-data-grid";

const PaymentHistory = (props) => {
  const { villa } = props;
  const classes = useStyles();
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [initialPayment, setInitialPayment] = useState({});

  const [payments, setPayments] = useState([]);
  const [pageLoad, setPageLoad] = useState(false);
  const percentageReleased = (750 / 1500) * 100;
  const percentageRemaining = 100 - percentageReleased;

  useEffect(() => {
    getPaymentList("");
    getPaymentList("initial_payment");
  }, []);
  async function getPaymentList(type) {
    setPageLoad(true);
    const url = !isEmpty(type)
      ? `${Setting.endpoints.paymentList}?proposal_id=${villa?.proposal_id}&type=${type}`
      : `${Setting.endpoints.paymentList}?proposal_id=${villa?.proposal_id}`;
    try {
      const response = await getApiData(url, "GET", {});
      if (response.success) {
        if (type === "initial_payment") {
          setInitialPayment(response?.data);
        } else if (isArray(response?.data) && !isEmpty(response?.data)) {
          setPayments(response?.data);
        } else {
          setPayments([]);
        }
      }
      setPageLoad(false);
    } catch (error) {
      setPageLoad(false);
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

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      width: 220,
      renderCell: (params) => {
        return (
          <Typography>
            {moment(params?.row?.createdAt).format("MMM DD, YYYY")}
          </Typography>
        );
      },
    },
    {
      field: "payment_transaction_id",
      headerName: "Payment Transaction ID",
      flex: 1,
      minWidth: 220,
    },

    {
      field: "customer_payment",
      headerName: "Customer Payment",
      width: 160,
      renderCell: (params) => (
        <Typography fontSize={14}>
          AED {params?.row?.customer_payment || 0}
        </Typography>
      ),
    },
    {
      field: "payment_status",
      headerName: "Payment Status",
      width: 160,
    },
  ];

  function StatusFilterHeader() {
    return (
      <select>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    );
  }

  return (
    <Grid container className={classes.MainContainer}>
      {pageLoad ? (
        <div className={classes.dataMain}>
          <CircularProgress style={{ color: color.primary }} />
        </div>
      ) : (
        <>
          <Grid item container className={classes.card}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Initial Payment
              </Typography>

              <Typography
                variant="h5"
                style={{
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                AED {initialPayment?.customer_payment || ""}
              </Typography>
            </Grid>
            <div style={{ width: "100%" }}>
              <Divider sx={{ my: 2 }} />
            </div>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid
                item
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Typography variant="caption" color={"#8C92A4"}>
                  Requested
                </Typography>
                <Typography fontFamily={"Poppins-SemiBold"}>
                  {moment(initialPayment?.updatedAt).format("MMM DD, YYYY")}
                </Typography>
              </Grid>

              <Grid
                item
                sx={{
                  alignItems: "flex-end",
                  justifyContent: "center",
                  textAlign: "end",
                }}
              >
                <Typography variant="caption" color={"#8C92A4"}>
                  {initialPayment?.payment_status === "approve-request"
                    ? "Under Review"
                    : "Paid"}
                </Typography>
                <Typography fontFamily={"Poppins-SemiBold"}>
                  {moment(initialPayment?.updatedAt).format("MMM DD, YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <DataGrid
            rows={payments}
            columns={columns}
            rowSelection={false}
            pageSizeOptions={[10, 25, 100]}
            components={{
              Pagination: GridPagination,
            }}
          />
        </>
      )}
      {/* <Grid item container className={classes.contentContainer} mt={2}>
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
                      fontFamily={"Poppins-Regular"}
                      fontWeight="bold"
                      pl={1}
                    >
                      {item?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography
                      pl={1}
                      fontFamily={"Poppins-Regular"}
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
                              fontFamily: "Poppins-Regular !important",
                            }}
                          >
                            Amount
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontFamily: "Poppins-Regular !important",
                            }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            style={{
                              fontFamily: "Poppins-Regular !important",
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
                              fontFamily={"Poppins-Regular"}
                            >
                              AED {item?.total_item || "-"}
                            </Typography>
                          </TableCell>

                          <TableCell align="right">
                            <Typography
                              style={{ fontSize: 16, fontWeight: "600" }}
                              fontFamily={"Poppins-Regular"}
                            >
                              {item?.status || "-"}
                            </Typography>
                          </TableCell>

                          <TableCell align="right">
                            <Typography
                              style={{ fontSize: 16, fontWeight: "600" }}
                              fontFamily={"Poppins-Regular"}
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
      </Grid> */}
    </Grid>
  );
};

export default PaymentHistory;
