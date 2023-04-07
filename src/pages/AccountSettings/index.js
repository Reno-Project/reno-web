import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "./styles";
import About from "../../components/About";
import EditProfile from "../EditProfile";
import Billing from "../Billing";
import ChangePassword from "../ChangePassword";
import PhoneVerificationModal from "../../components/PhoneVerificationModal";

export default function AccountSettings() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Grid container xs={12} sm={9} md={8} lg={6} marginBottom="1px">
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
              <Tab className={classes.tabBtn} label="Edit Profile" />
              <Tab className={classes.tabBtn} label="Billing" />
              <Tab className={classes.tabBtn} label="Notifications" />
              <Tab className={classes.tabBtn} label="Change password" />
              <Tab className={classes.tabBtn} label="Security" />
            </Tabs>
          </Grid>
          <Grid
            container
            padding={"20px 0"}
            wrap="nowrap"
            gap={2}
            justifyContent={"center"}
          >
            {tabValue === 0 ? <EditProfile /> : null}
            {tabValue === 1 ? <Billing /> : null}
            {tabValue === 3 ? <ChangePassword /> : null}
          </Grid>
        </Grid>
      </Grid>

      <About />
      <PhoneVerificationModal
        visible={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}
