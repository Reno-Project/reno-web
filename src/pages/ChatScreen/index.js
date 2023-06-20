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
import ChatMessages from "../../components/Chat/ChatMessages";
import ChatCard from "../../components/ChatCard";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import socketActions from "../../redux/reducers/Socket/actions"

export default function ChatScreen() {
  const dispatch = useDispatch();
const {initialize} = socketActions;
  const [selectedChat, setSelectedChat] = useState({});
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };
  useEffect(() => {
    
    // dispatch(initialize());
   
  }, [])
  

  return (
    <Grid
      container
      xs={12}
      sm={12}
      md={12}
      lg={12}
      paddingBottom={20}
      paddingLeft={"44px"}
      paddingTop={"24px"}
      paddingRight={"44px"}
      style={{ backgroundColor: "#F2F4F7" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          style={{
            lineHeight: "36px",
            fontFamily: "Inter",
            fontSize: "28px",
            paddingBottom: "27px",
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
        paddingBottom={20}
        style={{ border: "1px solid #F2F4F7", borderRadius: "8px" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          className={classes.chatListContainer}
          marginBottom={md ? "12px" : "0px"}
        >
          <ChatList onSelect={handleChatSelect} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={6}
          style={{ backgroundColor: "#FEFEFF" }}
          marginBottom={md ? "12px" : "0px"}
        >
          <ChatMessages selectedChat={selectedChat} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          className={classes.chatCardContainer}
        >
          <ChatCard/>
        </Grid>
      </Grid>
    </Grid>
  );
}
