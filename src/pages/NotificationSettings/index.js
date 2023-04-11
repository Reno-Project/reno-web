import styled from "@emotion/styled";
import { Grid, Switch, Typography } from "@mui/material";
import { lastIndexOf } from "lodash";
import React from "react";
import { isMobile } from "react-device-detect";

const IOSSwitch = styled((props) => (
  <div style={{ display: "flex" }}>
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
    <Typography paddingLeft={"5px"}>Push</Typography>
  </div>
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function NotificationSettings() {
  const pushArr = [
    { id: 0, label: "Inbox messages", value: "false" },
    { id: 1, label: "Project update", value: "false" },
    { id: 2, label: "Project inquiry", value: "false" },
    { id: 3, label: "Account related", value: "false" },
    { id: 4, label: "Reminde ", value: "false" },
    { id: 5, label: "Reviews", value: "false" },
    { id: 6, label: "Promotional", value: "false" },
    { id: 7, label: "Billing", value: "false" },
  ];

  const emailArr = [
    { id: 0, label: "Project update", value: "false" },
    { id: 1, label: "Inbox messages", value: "false" },
    { id: 2, label: "Project inquiry", value: "false" },
    { id: 3, label: "Account related", value: "false" },
  ];
  return (
    <Grid
      container
      padding={"20px 0"}
      wrap={"nowrap"}
      gap={2}
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        <Typography variant="h5">Notifications Settings</Typography>
        <Grid
          item
          container
          gap={3}
          wrap={isMobile ? "wrap" : "nowrap"}
          style={{
            border: "1px solid #F2F4F7",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            container
            sm={12}
            lg={6}
            flexDirection="column"
            style={{
              padding: 20,
              backgroundColor: "#F5F6F8",
              borderRadius: 5,
            }}
          >
            <Typography variant="h6" marginBottom={"10px"}>
              Push Notifications:
            </Typography>

            {pushArr.map((item, index) => {
              let last = lastIndexOf(pushArr) - 1;
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: index === last ? "none" : "1px solid #E8E8E8",
                  }}
                >
                  <Typography>{item?.label}</Typography>
                  <IOSSwitch />
                </div>
              );
            })}
          </Grid>
          <Grid
            item
            container
            sm={12}
            lg={6}
            flexDirection="column"
            style={{
              padding: 20,
              backgroundColor: "#F5F6F8",
              borderRadius: 5,
            }}
          >
            <Typography variant="h6" marginBottom={"10px"}>
              Email Notifications:
            </Typography>
            {emailArr.map((item, index) => {
              let last = lastIndexOf(emailArr) - 1;
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: index === last ? "none" : "1px solid #E8E8E8",
                  }}
                >
                  <Typography>{item?.label}</Typography>
                  <IOSSwitch />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
