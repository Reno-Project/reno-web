import {
  Button,
  Grid,
  Pagination,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Images from "../../config/images";
import theme, { color } from "../../config/theme";
import ChatList from "../../components/Chat/ChatList";
import ConversationsWithMessagesWrapper from "../../components/Chat/ConversationsWithMessagesWrapper";
import ChatCard from "../../components/ChatCard";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import socketActions from "../../redux/reducers/Socket/actions";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

export default function ChatScreen() {
  const dispatch = useDispatch();
  const { initialize } = socketActions;
  const [selectedChat, setSelectedChat] = useState({});
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const { cometChatUserdata } = useSelector((state) => state.auth);
  const params = {
    method: "post",
    "Content-Type": "application/json",
  };
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };
  useEffect(() => {
    // console.log(">>>>> cometChatUserdata ", cometChatUserdata);
    // fetch(
    //   `https://appid.api-us.cometchat.io/v3/users/${cometChatUserdata.uid}/auth_tokens`,
    //   params
    // ).then((res) => {
    //   CometChatUIKit.getLoggedinUser().then(
    //     (user) => {
    //       if (!user) {
    //         CometChatUIKit.login(res.authToken).then(
    //           (user) => {
    //             console.log("Login Successful:", { user });
    //           },
    //           (error) => {
    //             console.log("Login failed with exception:", { error });
    //           }
    //         );
    //       }
    //     },
    //     (error) => {
    //       console.log("Something went wrong", error);
    //     }
    //   );
    // });
  }, []);

  return (
    <Grid
      container
      paddingBottom={"20px"}
      paddingLeft={"44px"}
      paddingTop={"24px"}
      paddingRight={"44px"}
      style={{ backgroundColor: "#F2F4F7", height: "100%" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          style={{
            lineHeight: "36px",
            fontFamily: "Poppins-Regular",
            fontSize: "28px",
          }}
        >
          All Messages
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        paddingBottom={"20px"}
        height={"100%"}
        style={{
          border: "1px solid #F2F4F7",
          borderRadius: "8px",
          height: "79%",
        }}
      >
        <ConversationsWithMessagesWrapper selectedChat={selectedChat} />

        {/* <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          className={classes.chatCardContainer}
        >
          <ChatCard />
        </Grid> */}
      </Grid>
    </Grid>
  );
}
