import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";

const errorObj = {
  bnameErr: false,
  bnameMsg: "",
  emailErr: false,
  emailMsg: "",
  addErr: false,
  addMsg: "",
  benificiaryErr: false,
  banificiaryMsg: "",
  ibanErr: false,
  ibanMsg: "",
  bankErr: false,
  bankMsg: "",
  accErr: false,
  accMsg: "",
  swiftErr: false,
  swiftMsg: "",
  bankAddErr: false,
  bankAddMsg: "",
};

export default function Billing() {
  const [errObj, setErrObj] = useState(errorObj);
  const [state, setState] = useState({
    bname: "",
    address: "",
    email: "",
    banificiary: "",
    iban: "",
    bank: "",
    acc: "",
    swift: "",
    bankAddress: "",
  });

  const bank = ["HDFC", "SBI", "PNB", "ICICI", "Axis"];

  return (
    <>
      <Grid item lg={4}></Grid>
      <Grid item container lg={8}>
        <Grid item padding="10px 20px">
          <Typography variant="h5">Billing information</Typography>
          <Typography>
            Lorem Ipsum has been the industry's standard dummy text ever since.
          </Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: 20,
              marginTop: 20,
            }}
          >
            <Grid item xs={12} id="bname">
              <CInput
                label="Billing Name"
                placeholder="Enter Billing Name..."
                value={state.bname}
                onChange={(e) => {
                  setState({ ...state, bname: e.target.value });
                  setErrObj({
                    ...errObj,
                    bnameErr: false,
                    bnameMsg: "",
                  });
                }}
                error={errObj.bnameErr}
                helpertext={errObj.bnameMsg}
              />
            </Grid>

            <Grid item xs={12} id="Address">
              <CInput
                multiline
                label="Address"
                placeholder="Enter Address"
                value={state.address}
                onChange={(e) => {
                  setState({ ...state, address: e.target.value });
                  setErrObj({
                    ...errObj,
                    addErr: false,
                    addMsg: "",
                  });
                }}
                error={errObj.addErr}
                helpertext={errObj.addMsg}
              />
            </Grid>

            <Grid item xs={12} id="email">
              <CInput
                label="Email"
                placeholder="Enter Email Here..."
                value={state.website}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                  setErrObj({
                    ...errObj,
                    emailErr: false,
                    emailMsg: "",
                  });
                }}
                error={errObj.webErr}
                helpertext={errObj.webMsg}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item padding="10px 20px">
          <Typography variant="h5">Payment info</Typography>
          <Typography>
            Lorem Ipsum has been the industry's standard dummy text ever since.
          </Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: 20,
              marginTop: 20,
            }}
          >
            <Grid item xs={12} style={{ marginTop: 20 }} id="name">
              <CInput
                label="Beneficiary Name"
                placeholder="Enter Beneficiary Name"
                value={state.bname}
                onChange={(e) => {
                  setState({ ...state, bname: e.target.value });
                  setErrObj({
                    ...errObj,
                    bnameErr: false,
                    bnameMsg: "",
                  });
                }}
                error={errObj.bnameErr}
                helpertext={errObj.bnameMsg}
              />
            </Grid>

            <Grid item xs={12} id="iban">
              <CInput
                label="IBAN"
                placeholder="Enter IBAN"
                value={state.iban}
                onChange={(e) => {
                  setState({ ...state, iban: e.target.value });
                  setErrObj({
                    ...errObj,
                    ibanErr: false,
                    ibanMsg: "",
                  });
                }}
                error={errObj.ibanErr}
                helpertext={errObj.ibanMsg}
              />
            </Grid>

            <Grid item xs={12} id="bank">
              <Cselect
                label="Bank Name"
                placeholder="Select Bank"
                value={state.bank}
                handleSelect={(e) => {
                  setState({ ...state, bank: e });
                  setErrObj({
                    ...errObj,
                    bankErr: false,
                    bankMsg: "",
                  });
                }}
                renderTags={bank}
                error={errObj.bankErr}
                helpertext={errObj.bankMsg}
              />
            </Grid>

            <Grid item xs={12} id="baccount">
              <CInput
                label="Bank Account"
                placeholder="Enter Bank Account Number"
                value={state.acc}
                onChange={(e) => {
                  setState({ ...state, acc: e.target.value });
                  setErrObj({ ...errObj, accErr: false, accMsg: "" });
                }}
                error={errObj.accErr}
                helpertext={errObj.accMsg}
              />
            </Grid>
            <Grid item xs={12} id="swift">
              <CInput
                label="SWIFT code"
                placeholder="Enter SWIFT Code"
                value={state.swift}
                onChange={(e) => {
                  setState({ ...state, swift: e.target.value });
                  setErrObj({
                    ...errObj,
                    swiftErr: false,
                    swiftMsg: "",
                  });
                }}
                error={errObj.swiftErr}
                helpertext={errObj.swiftMsg}
              />
            </Grid>
            <Grid item xs={12} id="Address">
              <CInput
                multiline
                label="Address"
                placeholder="Enter Address"
                value={state.address}
                onChange={(e) => {
                  setState({ ...state, address: e.target.value });
                  setErrObj({
                    ...errObj,
                    addErr: false,
                    addMsg: "",
                  });
                }}
                error={errObj.addErr}
                helpertext={errObj.addMsg}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          item
          container
          wrap="nowrap"
          gap={2}
          style={{
            margin: "25px 0",
            justifyContent: "center",
          }}
        >
          <Grid item xs={6}>
            <Button style={{ width: "100%" }} variant="outlined">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ minWidth: "135px", width: "100%" }}
              variant="contained"
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
