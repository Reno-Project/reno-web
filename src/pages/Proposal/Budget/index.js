import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "./styles";
import About from "../../../components/About";
import EditProfile from "../../EditProfile";
import Billing from "../../Billing";
import ChangePassword from "../../ChangePassword";
import PhoneVerificationModal from "../../../components/PhoneVerificationModal";
import TwoFectorModal from "../../../components/TwoFectorModal";
import NotificationSettings from "../../NotificationSettings";
import Security from "../../../components/Security";
export default function Budget() {
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
              fontFamily: "ElMessiri-SemiBold",
            }}
          >
            Budget
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
