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
import Summary from "./Summary";
import Budget from "./Budget";
import Milestone from "./Milestone";
import { color } from "../../config/theme";
export default function CreateProposal() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [show2FModal, setShow2FModal] = useState(false);

  return (
    <Grid
      container
      flexWrap={"wrap-reverse"}
      p={2}
      bgcolor={color.LightSurface}
      flex={1}
      maxWidth={"unset"}
      style={{ padding: 40 }}
    >
      <Grid container sm={12} md={8} lg={9}>
        <Grid
          item
          container
          className={classes.contentContainer}
          padding={"20px"}
        >
          <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
            <Tabs
              value={tabValue}
              onChange={(v, b) => {
                setTabValue(b);
              }}
              variant="scrollable"
            >
              <Tab label="Summary" />
              <Tab label="Budget" />
              <Tab label="Milestone" />
            </Tabs>
          </Grid>
          {tabValue === 0 ? <Summary /> : null}
          {tabValue === 1 ? <Budget /> : null}
          {tabValue === 2 ? <Milestone /> : null}
        </Grid>
      </Grid>
      <Grid container sm={12} md={4} lg={3}>
        <Typography>Component</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          style={{
            lineHeight: 2,
            fontFamily: "ElMessiri-SemiBold",
          }}
        >
          Submit Request
        </Typography>
      </Grid>
    </Grid>
  );
}
