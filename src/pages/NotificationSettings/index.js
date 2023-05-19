import styled from "@emotion/styled";
import {
  Grid,
  Switch,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import _ from "lodash";
import { askForPermissionToReceiveNotifications } from "../../push-notification";
import useStyles from "./styles";
import NoData from "../../components/NoData";

const IOSSwitch = styled((props) => (
  <div style={{ display: "flex" }}>
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
    <Typography
      style={{
        color: "#202939",
        fontFamily: "Roobert-Regular",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "24px",
        marginLeft: "5px",
      }}
    >
      Push
    </Typography>
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
  const classes = useStyles();

  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setUserData } = authActions;
  const [state, setState] = useState({
    notificationList: [],
  });
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getMeApiCall();
    setState({ ...state, notificationList: notificationListArray });

    const userAgent = window.navigator.userAgent;
    const isSafari = userAgent.includes("Safari");
    if (!isSafari && !isMobile) {
      if (Notification && Notification?.permission !== "granted") {
        askForPermissionToReceiveNotifications();
      }
    }
  }, []);

  async function getMeApiCall() {
    try {
      const response = await getApiData(Setting.endpoints.me, "GET", {});
      if (response.success) {
        dispatch(setUserData(response?.data));
        setNotificationDetailsPreFillFunc(response?.data);
      } else {
        setNotificationDetailsPreFillFunc(userData);
      }
      setLoader(false);
    } catch (error) {
      setNotificationDetailsPreFillFunc(userData);
      setLoader(false);
      console.log("🚀 ~ file: index.js:63 ~ me api ~ error:", error);
    }
  }

  function setNotificationDetailsPreFillFunc(result) {
    const notiData = result?.user_settings;
    let dummyArray = notificationListArray;
    dummyArray?.map((it, ind) => {
      it?.subArray?.map((it1, ind1) => {
        if (it1?.title === "push_inbox_messages") {
          it1.isChecked = notiData?.push_inbox_messages;
        } else if (it1?.title === "push_account_releted") {
          it1.isChecked = notiData?.push_account_releted;
        } else if (it1?.title === "push_project_messages") {
          it1.isChecked = notiData?.push_project_messages;
        } else if (it1?.title === "push_promotional") {
          it1.isChecked = notiData?.push_promotional;
        } else if (it1?.title === "email_account_releted") {
          it1.isChecked = notiData?.email_account_releted;
        } else if (it1?.title === "email_project_messages") {
          it1.isChecked = notiData?.email_project_messages;
        } else if (it1?.title === "email_promotional") {
          it1.isChecked = notiData?.email_promotional;
        }
      });
    });
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
      padding={isTablet ? "20px 10px" : isMobile ? "10px" : "20px"}
      wrap={"nowrap"}
      gap={2}
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        <Typography className={classes.title}>
          Notifications Settings
        </Typography>
        <Typography className={classes.subtitle}>
          Customize Your Notifications: Manage Your Alerts and Stay in Control
        </Typography>
        <Divider light style={{ width: "100%", margin: "16px 0 28px" }} />

        {loader ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <CircularProgress
              style={{
                color: "#274BF1",
              }}
              size={30}
            />
          </div>
        ) : (
          <Grid
            item
            container
            gap={3}
            wrap={isMobile && !isTablet ? "wrap" : "nowrap"}
          >
            {_.isArray(state?.notificationList) &&
            !_.isEmpty(state?.notificationList) ? (
              state?.notificationList.map((item, index) => {
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
                      borderRadius: "12px",
                    }}
                  >
                    <Typography className={classes.notiTitle}>
                      {item?.title}
                    </Typography>
                    {item?.subArray.map((it, ind) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "14px 0",
                            borderBottom:
                              item?.subArray?.length - 1 == ind
                                ? null
                                : "1px solid #E8E8E8",
                          }}
                        >
                          <Typography className={classes.name}>
                            {it.name}
                          </Typography>
                          <IOSSwitch
                            checked={it?.isChecked}
                            onChange={(event) => {
                              const userAgent = window.navigator.userAgent;
                              const isSafari = userAgent.includes("Safari");
                              if (isSafari && isMobile) {
                              } else if (
                                Notification &&
                                Notification?.permission === "granted"
                              ) {
                                changePushNotificationStatusApiCall(
                                  it?.title,
                                  event.target.checked,
                                  index,
                                  ind
                                );
                              } else if (
                                Notification &&
                                Notification?.permission === "default"
                              ) {
                                askForPermissionToReceiveNotifications();
                              } else {
                                toast.info(
                                  "It's look like you have't granted the permission. Please enable notifications in your browser site settings to value your privacy and will only send notifications relevant to our service"
                                );
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </Grid>
                );
              })
            ) : (
              <NoData />
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
