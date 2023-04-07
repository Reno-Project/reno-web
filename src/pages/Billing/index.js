import { Button, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import CInput from "../../components/CInput";
import Cselect from "../../components/CSelect";

const errorObj = {
  bnameErr: false,
  bnameMsg: "",
  emailErr: false,
  emailMsg: "",
  addErr: false,
  addMsg: "",
  beneficiaryErr: false,
  beneficiaryMsg: "",
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
    beneficiary: "",
    iban: "",
    bank: "",
    acc: "",
    swift: "",
    bankAddress: "",
  });

  const bank = ["HDFC", "SBI", "PNB", "ICICI", "Axis"];

  function validation() {
    const error = { ...errObj };
    let valid = true;
    let scroll = false;
    let section = null;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (isEmpty(state.bname)) {
      valid = false;
      error.bnameErr = true;
      error.bnameMsg = "Please Enter Billing Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bname");
      }
    }

    if (isEmpty(state.address)) {
      valid = false;
      error.addErr = true;
      error.addMsg = "Please Enter Address";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#Address");
      }
    }

    if (isEmpty(state.email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please enter email";
    } else if (!emailRegex.test(state.email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please enter valid email";
    }
    if (isEmpty(state.beneficiary)) {
      valid = false;
      error.beneficiaryErr = true;
      error.beneficiaryMsg = "Please Enter Beneficiary Name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#beneficiary");
      }
    }

    if (isEmpty(state.iban)) {
      valid = false;
      error.ibanErr = true;
      error.ibanMsg = "Please Enter IBAN Number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#iban");
      }
    }

    if (isEmpty(state.bank)) {
      valid = false;
      error.bankErr = true;
      error.bankMsg = "Please Select Bank";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bank");
      }
    }

    if (isEmpty(state.acc)) {
      valid = false;
      error.accErr = true;
      error.accMsg = "Please Enter Bank Account Number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#baccount");
      }
    }

    if (isEmpty(state.swift)) {
      valid = false;
      error.swiftErr = true;
      error.swiftMsg = "Please Enter Swift Code";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#swift");
      }
    }

    if (isEmpty(state.bankAddress)) {
      valid = false;
      error.bankAddErr = true;
      error.bankAddMsg = "Please Enter Bank Address";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bAddress");
      }
    }

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setErrObj(error);

    if (valid) {
      console.log("proceed");
      // addBillingInfoApiCall();
    }
  }

  return (
    <>
      {isMobile || isTablet ? null : <Grid item lg={4}></Grid>}
      <Grid item container xs={12} lg={8} justifyContent="flex-end">
        <Grid item padding={isMobile ? "10px 0" : "10px 20px"}>
          <Typography variant="h5">Billing information</Typography>
          <Typography>
            Lorem Ipsum has been the industry's standard dummy text ever since.
          </Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: isMobile ? 10 : 20,
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
                error={errObj.emailErr}
                helpertext={errObj.emailMsg}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid itempadding={isMobile ? "10px 0" : "10px 20px"}>
          <Typography variant="h5">Payment info</Typography>
          <Typography>
            Lorem Ipsum has been the industry's standard dummy text ever since.
          </Typography>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: isMobile ? 10 : 20,
              marginTop: 20,
            }}
          >
            <Grid item xs={12} style={{ marginTop: 20 }} id="beneficiary">
              <CInput
                label="Beneficiary Name"
                placeholder="Enter Beneficiary Name"
                value={state.beneficiary}
                onChange={(e) => {
                  setState({ ...state, beneficiary: e.target.value });
                  setErrObj({
                    ...errObj,
                    beneficiaryErr: false,
                    beneficiaryMsg: "",
                  });
                }}
                error={errObj.beneficiaryErr}
                helpertext={errObj.beneficiaryMsg}
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
            <Grid item xs={12} id="bAddress">
              <CInput
                multiline
                label="Address"
                placeholder="Enter Address"
                value={state.bankAddress}
                onChange={(e) => {
                  setState({ ...state, bankAddress: e.target.value });
                  setErrObj({
                    ...errObj,
                    bankAddErr: false,
                    bankAddMsg: "",
                  });
                }}
                error={errObj.bankAddErr}
                helpertext={errObj.bankAddMsg}
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
            margin: isMobile ? "20px 0" : "20px",
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
              onClick={validation}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
