import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import About from "../../components/About";
import EditProfile from "../EditProfile";
import Billing from "../Billing";
import ChangePassword from "../ChangePassword";
import PhoneVerificationModal from "../../components/PhoneVerificationModal";
import TwoFectorModal from "../../components/TwoFectorModal";
import NotificationSettings from "../NotificationSettings";
import Security from "../../components/Security";
import useStyles from "./styles";

export default function AccountSettings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setAccountTab } = authActions;
  const { userData, accountTab } = useSelector((state) => state.auth);
  const [tabValue, setTabValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [show2FModal, setShow2FModal] = useState(false);

  useEffect(() => {
    setTabValue(accountTab);
  }, [accountTab]);

  return (
    <>
      <Grid container xs={12} sm={9} md={8} lg={6}>
        <Grid item xs={12}>
          <Typography className={classes.header}>Account Settings</Typography>
        </Grid>

        <Grid
          item
          container
          borderRadius={"8px"}
          border="1px solid #F2F4F7"
          padding={"20px"}
        >
          <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
            <Tabs
              value={tabValue}
              onChange={(v, b) => {
                setTabValue(b);
                dispatch(setAccountTab(b));
              }}
              variant="scrollable"
            >
              <Tab label="Profile" />
              <Tab label="Billing" />
              <Tab label="Notifications" />
              {userData?.social_connection === "google" ||
              userData?.social_connection === "fb" ||
              userData?.social_connection === "apple" ? null : (
                <Tab label="Change password" />
              )}
              <Tab label="Security" />
            </Tabs>
          </Grid>
          {tabValue === 0 ? <EditProfile /> : null}
          {tabValue === 1 ? <Billing /> : null}
          {tabValue === 2 ? <NotificationSettings /> : null}
          {tabValue === 3 ? (
            userData?.social_connection === "google" ||
            userData?.social_connection === "fb" ||
            userData?.social_connection === "apple" ? (
              <Security />
            ) : (
              <ChangePassword />
            )
          ) : null}
          {tabValue === 4 ? <Security /> : null}
        </Grid>
      </Grid>

      {/* <About /> */}
      <PhoneVerificationModal
        visible={showModal}
        handleClose={() => setShowModal(false)}
      />
      <TwoFectorModal
        visible={show2FModal}
        handleClose={() => setShow2FModal(false)}
      />
    </>
  );
}
