import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "./styles";
import About from "../../components/About";
import EditProfile from "../EditProfile";
import Billing from "../Billing";
import ChangePassword from "../ChangePassword";
import PhoneVerificationModal from "../../components/PhoneVerificationModal";
import TwoFectorModal from "../../components/TwoFectorModal";
import NotificationSettings from "../NotificationSettings";
import Security from "../../components/Security";
export default function AccountSettings() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [show2FModal, setShow2FModal] = useState(false);

  return (
    <>
      <Grid container xs={12} sm={9} md={8} lg={6}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            style={{
              lineHeight: 3,
              fontFamily: "El Messiri",
              padding: "0 15px",
            }}
          >
            Account Settings
          </Typography>
        </Grid>

        <Grid item container border="1px solid #F2F4F7" padding={"20px"}>
          <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
            <Tabs
              value={tabValue}
              onChange={(v, b) => {
                setTabValue(b);
              }}
              variant="scrollable"
            >
              <Tab label="Edit Profile" />
              <Tab label="Billing" />
              <Tab label="Notifications" />
              <Tab label="Change password" />
              <Tab label="Security" />
            </Tabs>
          </Grid>
          {tabValue === 0 ? <EditProfile /> : null}
          {tabValue === 1 ? <Billing /> : null}
          {tabValue === 2 ? <NotificationSettings /> : null}
          {tabValue === 3 ? <ChangePassword /> : null}
          {tabValue === 4 ? <Security /> : null}
        </Grid>
      </Grid>

      <About />
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
