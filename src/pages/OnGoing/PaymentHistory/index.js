import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import { isArray, isEmpty } from "lodash";

const PaymentHistory = (props) => {
  const { villa } = props;
  const classes = useStyles();
  const [payments, setPayments] = useState([]);
  console.log("payments====>>>>>", payments);
  const [paymentLoader, setPaymentLoader] = useState(false);

  useEffect(() => {
    getPaymentList();
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

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer Payment</TableCell>
            <TableCell>Reno Revenue from Customer</TableCell>
            <TableCell>Reno Revenue from Contractor</TableCell>
            <TableCell>Retained Amount (Reno)</TableCell>
            <TableCell>Released Amount to Contractor</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isArray(payments) &&
            !isEmpty(payments) &&
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.createdAt}</TableCell>
                <TableCell>{payment.customer_payment}</TableCell>
                <TableCell>{payment.reno_revenue_from_customer}</TableCell>
                <TableCell>{payment.reno_revenue_from_contractor}</TableCell>
                <TableCell>{payment.retained_amount_reno}</TableCell>
                <TableCell>{payment.released_amount_to_contractor}</TableCell>
                <TableCell>{payment.payment_status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentHistory;
