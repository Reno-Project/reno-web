import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import IBAN from "iban";
import CInput from "../../components/CInput";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import { color } from "../../config/theme";

const errorObj = {
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
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setUserData } = authActions;
  const [pageLoad, setPageLoad] = useState(true);
  const [billingData, setBillingData] = useState([]);
  const data = billingData?.contractor_data?.billing_info;
  const isEdit = !isEmpty(billingData);

  const [buttonLoader, setButtonLoader] = useState(false);
  const [errObj, setErrObj] = useState(errorObj);
  const [state, setState] = useState({
    beneficiary: "",
    iban: "",
    bank: "",
    acc: "",
    swift: "",
    bankAddress: "",
  });
  const bank = ["HDFC", "SBI", "PNB", "ICICI", "Axis"];

  useEffect(() => {
    getUserDetailsByIdApiCall();
  }, []);

  useEffect(() => {
    if (isEdit) {
      setState({
        ...state,
        beneficiary: data?.beneficiary_name,
        iban: data?.iban,
        bank: data?.bank_name,
        acc: data?.bank_account,
        swift: data?.swift_code,
        bankAddress: data?.Address,
      });
    }
  }, [billingData]);

  async function getUserDetailsByIdApiCall() {
    setPageLoad(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.contarctorById}/${userData?.id}`,
        "GET",
        {}
      );
      if (response.success) {
        dispatch(setUserData(response?.data));
        setBillingData(response?.data);
      } else {
        setBillingData(userData);
      }
      setPageLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
      setBillingData(userData);
      setPageLoad(false);
    }
  }

  function validation() {
    const error = { ...errObj };
    const swiftCodeRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    const accNumberRegex = /^[0-9]{8,30}$/;
    let valid = true;
    let scroll = false;
    let section = null;

    if (isEmpty(state.beneficiary)) {
      valid = false;
      error.beneficiaryErr = true;
      error.beneficiaryMsg = "Please enter beneficiary name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#beneficiary");
      }
    } else if (state?.beneficiary.length > 50) {
      valid = false;
      error.beneficiaryErr = true;
      error.beneficiaryMsg =
        "Beneficiary name should not be greater than 50 characters";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#beneficiary");
      }
    }

    if (isEmpty(state.iban)) {
      valid = false;
      error.ibanErr = true;
      error.ibanMsg = "Please enter IBAN number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#iban");
      }
    } else if (!IBAN.isValid(state.iban)) {
      valid = false;
      error.ibanErr = true;
      error.ibanMsg = "Please enter valid IBAN number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#iban");
      }
    }

    if (isEmpty(state.bank)) {
      valid = false;
      error.bankErr = true;
      error.bankMsg = "Please enter bank name";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bank");
      }
    } else if (state?.bank.length > 50) {
      valid = false;
      error.bankErr = true;
      error.bankMsg = "Bank name should not be greater than 50 characters";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bank");
      }
    }

    if (isEmpty(state.acc)) {
      valid = false;
      error.accErr = true;
      error.accMsg = "Please enter bank account number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#baccount");
      }
    } else if (!accNumberRegex.test(state?.acc)) {
      valid = false;
      error.accErr = true;
      error.accMsg = "Please enter valid bank account number";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#baccount");
      }
    }

    if (isEmpty(state.swift)) {
      valid = false;
      error.swiftErr = true;
      error.swiftMsg = "Please enter swift code";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#swift");
      }
    } else if (!swiftCodeRegex.test(state.swift)) {
      valid = false;
      error.swiftErr = true;
      error.swiftMsg = "Please enter valid swift code";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#swift");
      }
    }

    if (isEmpty(state.bankAddress)) {
      valid = false;
      error.bankAddErr = true;
      error.bankAddMsg = "Please enter bank address";
      if (!scroll) {
        scroll = true;
        section = document.querySelector("#bAddress");
      }
    } else if (state.bankAddress.length > 100) {
      valid = false;
      error.bankAddErr = true;
      error.bankAddMsg =
        "Bank address should not be greater than 100 characters";
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
      addBillingInfoApiCall();
    }
  }

  async function addBillingInfoApiCall() {
    try {
      setButtonLoader(true);
      const data = {
        beneficiary_name: state.beneficiary,
        iban: state.iban,
        bank_name: state.bank,
        bank_account: state.acc,
        swift_code: state.swift,
        Address: state.bankAddress,
      };

      const response = await getApiData(
        Setting.endpoints.addBillingInfo,
        "POST",
        data
      );

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      setButtonLoader(false);
    } catch (error) {
      setButtonLoader(false);
      console.log("🚀 ~ file: index.js:63 ~ connect api call ~ error:", error);
      toast.error(error.toString());
    }
  }

  return (
    <Grid
      container
      padding={"20px 0"}
      wrap={"nowrap"}
      gap={2}
      justifyContent={"center"}
    >
      {pageLoad ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress style={{ color: color.primary }} size={30} />
        </div>
      ) : (
        <>
          <Grid item container xs={12}>
            <Grid item padding={isMobile ? "10px 0" : "0px 20px"}>
              <Typography variant="h5">Billing Information</Typography>
              <Grid
                item
                container
                style={{
                  border: "1px solid #F2F4F7",
                  padding: isMobile ? 10 : 20,
                  marginTop: 20,
                }}
              >
                <Grid item xs={12} id="beneficiary">
                  <CInput
                    label="Beneficiary Name"
                    required
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
                    required
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
                  <CInput
                    label="Bank Name"
                    placeholder="Enter Bank"
                    required
                    value={state.bank}
                    onChange={(e) => {
                      setState({ ...state, bank: e.target.value });
                      setErrObj({
                        ...errObj,
                        bankErr: false,
                        bankMsg: "",
                      });
                    }}
                    error={errObj.bankErr}
                    helpertext={errObj.bankMsg}
                  />
                </Grid>

                <Grid item xs={12} id="baccount">
                  <CInput
                    type="number"
                    required
                    label="Bank Account"
                    placeholder="Enter Bank Account Number"
                    inputProps={{ maxLength: 30 }}
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
                    required
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
                    required
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
                  {buttonLoader ? (
                    <CircularProgress size={26} style={{ color: "#fff" }} />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
