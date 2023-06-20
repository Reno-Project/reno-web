/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import _, { isArray, isEmpty } from "lodash";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ChatFooter from "../ChatFooter";

import {
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import theme from "../../../config/theme";

function ChatMessages(props) {
  const { selectedChat } = props;
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const BadgeStyle = styled(Badge)({
    "& .MuiBadge-dot": {
      backgroundColor: "#32D583",
      width: "12px",
      height: "12px",
      borderRadius: "12px",
      border: "1.5px solid #FFFFFF",
    },
  });
  return (
    <div style={{ minHeight: "75vh", position: "relative" }}>
      <Grid item container xs={12} sm={12} md={12} lg={12} flex={1}>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ borderBottom: "2px solid #F2F4F7" }}
          paddingTop={"20px"}
          paddingBottom={"20px"}
          flex={1}
        >
          <Grid
            item
            xs={12}
            sm={2}
            md={2}
            lg={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {!isEmpty(selectedChat) && selectedChat?.isOnline ? (
              <BadgeStyle>
                <Badge
                  color="success"
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  style={{ color: "pink" }}
                >
                  <Avatar
                    alt={selectedChat?.userName}
                    src={
                      selectedChat?.avtarUrl ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ncY-heISk8kAf3J_MXmEi2Utnl0LsgsfQg&usqp=CAU"
                    }
                    sx={{ width: "40px", height: "40px" }}
                  />
                </Badge>
              </BadgeStyle>
            ) : (
              <Avatar
                alt={selectedChat?.userName}
                src={
                  selectedChat?.avtarUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ncY-heISk8kAf3J_MXmEi2Utnl0LsgsfQg&usqp=CAU"
                }
                sx={{ width: "40px", height: "40px" }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={10} md={10} lg={11}>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              display={sm ? "flex" : ""}
              justifyContent={sm ? "center" : ""}
              alignItems={sm ? "center" : ""}
            >
              <Typography
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontFamily: "Roobert",
                  fontWeight: "500",
                }}
              >
                {selectedChat?.userName || "Vrunda"}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              display={sm ? "flex" : ""}
              justifyContent={sm ? "center" : ""}
              alignItems={sm ? "center" : ""}
            >
              {!isEmpty(selectedChat) && selectedChat?.isOnline ? (
                <Typography
                  style={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontFamily: "Roobert-Regular",
                    fontWeight: "400",
                    color: "#475569",
                  }}
                >
                  Online
                </Typography>
              ) : (
                <Typography
                  style={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontFamily: "Roobert-Regular",
                    fontWeight: "400",
                    color: "#475569",
                  }} // here  is time of last seen
                >
                  Last seen 20 mins ago
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          paddingLeft={"25px"}
          paddingRight={"25px"}
          paddingTop={"24px"}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div
              style={{
                backgroundColor: "#F5F6F8",
                maxWidth: "50%",
                width: `${
                  !isEmpty(selectedChat)
                    ? selectedChat?.message.length * 10
                    : 100
                }px`,
                padding: "10px",
                borderRadius: "10px 10px 10px 0px",
              }}
            >
              <Typography
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  fontFamily: "Roobert-Regular",
                  fontWeight: "400",
                  color: "#202939",
                }}
              >
                {selectedChat?.message || "hiii"}
              </Typography>
            </div>
          </Grid>
          <div style={{ width: "100%", margin: "30px 0px 30px 0px" }}>
            <Divider
              orientation="horizontal"
              variant="fullWidth"
              style={{
                fontSize: "12px",
                lineHeight: "20px",
                fontFamily: "Inter",
                fontWeight: "500",
                color: "#646F86",
              }}
            >
              20 feb 2023, 00:09
            </Divider>
          </div>
          <Grid
            item
            display={"flex"}
            justifyContent={"flex-end"}
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <div
              style={{
                backgroundColor: "#274BF1",
                maxWidth: "50%",
                width: `${
                  !isEmpty(selectedChat)
                    ? selectedChat?.userMsg.length * 10
                    : 100
                }px`,
                padding: "10px",
                borderRadius: "10px 10px 0px 10px",
                marginTop: "10px",
              }}
            >
              <Typography
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  fontFamily: "Roobert-Regular",
                  fontWeight: "400",
                  color: "white",
                }}
              >
                {selectedChat?.userMsg || "Please select"}
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            display={"flex"}
            // justifyContent={"flex-end"}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            width={sm ? "130px" : "224px"}
            height={sm ? "100px" : "159px"}
          >
            {!isEmpty(selectedChat.image) ? (
              <img
                src={selectedChat?.image}
                style={{
                  borderRadius: "7px 7px 7px 7px",
                  marginTop: "10px",
                }}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <ChatFooter />
      </div>
    </div>
  );
}

export default ChatMessages;
