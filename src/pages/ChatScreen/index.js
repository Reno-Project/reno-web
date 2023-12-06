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
import { useDispatch } from "react-redux";
import socketActions from "../../redux/reducers/Socket/actions";

export default function ChatScreen() {
  const dispatch = useDispatch();
  const { initialize } = socketActions;
  const [selectedChat, setSelectedChat] = useState({});
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };
  useEffect(() => {
    // dispatch(initialize());
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
