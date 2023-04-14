import styled from "@emotion/styled";
import { Button, Grid, Switch, Typography } from "@mui/material";
import { lastIndexOf } from "lodash";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";

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

const notificationListArray = [
  {
    id: 1,
    title: "Push Notifications:",
    subArray: [
      {
        id: 11,
        name: "Inbox messages",
        isChecked: false,
        title: "push_inbox_messages",
        subtitle: "push",
      },
      {
        id: 12,
        name: "Project messages",
        isChecked: false,
        title: "push_project_messages",
        subtitle: "push",
      },
      {
        id: 15,
        name: "Account related",
        isChecked: false,
        title: "push_account_releted",
        subtitle: "push",
      },
      {
        id: 16,
        name: "Promotional",
        isChecked: false,
        title: "push_promotional",
        subtitle: "push",
      },
    ],
  },
  {
    id: 2,
    title: "Email Notifications:",
    subArray: [
      {
        id: 22,
        name: "Project messages",
        isChecked: false,
        title: "email_project_messages",
        subtitle: "email",
      },
      {
        id: 23,
        name: "Account related",
        isChecked: false,
        title: "email_account_releted",
        subtitle: "email",
      },
      {
        id: 24,
        name: "Promotional",
        isChecked: false,
        title: "email_promotional",
        subtitle: "email",
      },
    ],
  },
];

export default function NotificationSettings() {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setUserData } = authActions;
  const [nsetting, setNsetting] = useState([]);
  const data = nsetting;
  const [state, setState] = useState({
    notificationList: [],
  });

  useEffect(() => {
    getUserDetailsByIdApiCall();
    setState({ ...state, notificationList: notificationListArray });
  }, []);

  async function getUserDetailsByIdApiCall() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.contarctorById}/${userData?.id}`,
        "GET",
        {}
      );
      if (response.success) {
        dispatch(setUserData(response?.data));
        setNsetting(response?.data);
      } else {
        setNsetting(userData);
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
      setNsetting(userData);
    }
  }

  // this function for change user notification status from api call
  async function changePushNotificationStatusApiCall(
    type,
    status,
    index1,
    index2
  ) {
    try {
      const response = await getApiData(
        Setting.endpoints.updateUserSetting,
        "post",
        {
          security_type: type ? type : "",
          action: status ? 1 : 0,
        }
      );

      if (response?.success) {
        changeSwitchItem(index1, index2, status);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("change Notification Status ApiCall ~ error:", error);
      toast.error(error.toString() || "Something went wrong! Please try again");
    }
  }

  const changeSwitchItem = (index1, index2, status) => {
    let dummyArray = notificationListArray;
    dummyArray[index1].subArray[index2].isChecked = status;
    setState({ ...state, notificationList: dummyArray });
  };

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
          {state?.notificationList.map((item, index) => {
            return (
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
                  {item?.title}
                </Typography>
                {item?.subArray.map((it, ind) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom:
                          item?.subArray?.length - 1 == ind
                            ? null
                            : "1px solid #E8E8E8",
                      }}
                    >
                      <Typography>{it.name}</Typography>
                      <IOSSwitch
                        checked={it?.isChecked}
                        onChange={(event) => {
                          changePushNotificationStatusApiCall(
                            it?.title,
                            event.target.checked,
                            index,
                            ind
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
