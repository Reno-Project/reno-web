/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CInput from "../../CInput";
import Images from "../../../config/images";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Badge,
  BadgeMark,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  ListItemButton,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { isArray, isEmpty } from "lodash";
import useStyles from "./styles";
let valTimer = null;

function ChatList(props) {
  const {
    cList,
    selectedChat,
    handleChatClick,
    setActiveTab = () => {},
    activeTab,
    gList,
    onSelect = () => {},
  } = props;
  console.log("🚀 ~ file: index.js:22 ~ ChatList ~ gList:", cList);
  // const { t } = useTranslation('appointment');
  const [state, setState] = useState({
    chatUserList: [],
    chatGroupList: [],
    searchVal: "",
    isSearching: false,
  });
  const { isSearching, searchVal, chatUserList, chatGroupList } = state;
  useEffect(() => {
    setState((p) => ({ ...p, chatUserList: cList }));
  }, [cList, gList]);
  console.log(
    "🚀 ~ file: index.js:32 ~ ChatList ~ chatUserList:",
    chatUserList
  );

  useEffect(() => {
    const filterGourp = cList.filter((a) => a.is_group === true);
    setState((p) => ({ ...p, chatGroupList: filterGourp }));
  }, [cList]);

  // const getData = async (keyword) => {
  //   try {
  //     const res = await getApiData({ url: 'group/list', data: { keyword }, method: 'post' });
  //     console.log('🚀 ~ file: index.js:38 ~ getData ~ res:', res);
  //     if (res.success && res.data) {
  //       setState((p) => ({ ...p, chatUserList: res.data, isSearching: false }));
  //     } else {
  //       setState((p) => ({ ...p, isSearching: false }));
  //     }
  //   } catch (err) {
  //     console.log('🚀 ~ err', err);
  //     setState((p) => ({ ...p, isSearching: false }));
  //   }s
  // };

  const renderLastMsg = (lastMsg) => {
    if (lastMsg.type === "file") {
      const fData = lastMsg.file_meta || {};
      // const fType = docTypes[fData.type] || '';
      const fType = fData.type || "";
      const isImage = ["png", "jpg", "jpeg"].indexOf(fType) > -1;
      return (
        <>
          {/* {isImage ? <AiOutlineFileImage /> : <AiOutlineFileText />}{" "} */}
          <span>{fData.filename}</span>
        </>
      );
    }
    return lastMsg.message;
  };

  const [selectedItemId, setSelectedItemId] = useState(null);
  const classes = useStyles();
  const handleItemClick = (item) => {
    setSelectedItemId(item.id);
    onSelect(item);
  };
  const chatGroupList1 = [
    {
      id: 1,
      avtarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ncY-heISk8kAf3J_MXmEi2Utnl0LsgsfQg&usqp=CAU",
      userName: "Kristin",
      timeLine: "2d ago",
      message:
        "Thanks for your interested, Please click the link here is our product list, which we need to promoted www.nike.com",
      isOnline: true,
      selected: true,
      userMsg:
        "Hello Hermes, thanks for your message .Yes! i am interested to work with your team, please tell me more..",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/006/965/779/small/empty-top-wooden-table-and-sakura-flower-with-fog-and-morning-light-background-photo.jpg",
    },
    {
      id: 2,
      avtarUrl:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      userName: "Albert Flores",
      timeLine: "1d ago",
      message: "Ummm, Yes sure!",
      isOnline: false,
      selected: false,
      userMsg: "Are you still working on the milestone 3? Can i see an update?",
    },
  ];

  // const rendererChatList = () => (
  //   <List
  //     dataSource={chatGroupList1}
  //     renderItem={(item) => {
  //       console.log("🚀 ~ file: index.js:139 ~ ChatList ~ item:", item);
  //       const active = selectedChat.id === item.id;
  //       const mList = item.chat_list || [];
  //       // const lastMsg = mList[mList.length - 1] || {};
  //       return (
  //         <List.Item
  //           key={item.id}
  //           className={active ? "active" : undefined}
  //           onClick={() => handleChatClick(item)}
  //         >
  //           <List.Item.Meta
  //             // avatar={
  //             //   item.is_group ? (
  //             //     <div className="main-grp-img-container">
  //             //      <img
  //             //        src={images.userGreenChat}
  //             //         height={24} width={24} />
  //             //     </div>
  //             //   )
  //             // }
  //             // title={item.group_name}
  //             description={item.message}
  //             avatar={
  //               <div className="main-grp-img-container">
  //                 <Avatar src={item.avtarUrl} height={40} width={40} />
  //               </div>
  //             }
  //             title={item.userName}
  //           />
  //           <div className="chat-info">
  //             <Typography className="time">
  //               {item.timeLine}
  //               {/* {item.chat_list.length > 0
  //                 ? moment(lastMsg.createdAt).fromNow(true)
  //                 : moment(item.createdAt).fromNow(true) ||
  //                   moment(lastMsg.createdAt).fromNow(true)} */}
  //             </Typography>
  //           </div>
  //         </List.Item>
  //       );
  //     }}
  //   />
  // );
  const ListStyle = styled(List)({
    "& .MuiListItemAvatar-root": {
      width: "40px",
      height: "40px",
    },
    "& .MuiListItem-root": {
      padding: 0,
    },
    "& .MuiList-root": {
      padding: 0,
      margin: 0,
    },
    "& .Mui-selected": {
      background:
        "linear-gradient(89.8deg, rgba(249, 250, 252, 0) 1.04%, rgba(241, 243, 248, 0.911458) 96.89%)",
      borderRight: "2px solid #274BF1",
    },
  });

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
    <Grid
      item
      container
      xs={12}
      sm={12}
      md={12}
      lg={12}
      padding={"20px 22px 20px 22px"}
      boxSizing={"border-box"}
    >
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              fontFamily: "Inter",
              fontWeight: "600",
            }}
          >
            Chats
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img src={Images.editIcon} alt="" style={{ alignSelf: "flex-end" }} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <InputBase
          type="Search"
          placeholder="Search.."
          className={classes.searchInput}
          startAdornment={
            <InputAdornment style={{ padding: 0, margin: 0 }}>
              <IconButton>
                <img
                  src={Images.search}
                  alt=""
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </IconButton>
            </InputAdornment>
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ListStyle>
          {isArray(chatGroupList1) &&
            !isEmpty(chatGroupList1) &&
            chatGroupList1?.map((item, index) => {
              return (
                <List sx={{ width: "100%" }}>
                  <ListItemButton
                    selected={item.id === selectedItemId}
                    alignItems="flex-start"
                    onClick={() => handleItemClick(item)}
                  >
                    <ListItemAvatar>
                      {item?.isOnline ? (
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
                              alt={item?.userName}
                              src={
                                item?.avtarUrl ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ncY-heISk8kAf3J_MXmEi2Utnl0LsgsfQg&usqp=CAU"
                              }
                              sx={{ width: "40px", height: "40px" }}
                            />
                          </Badge>
                        </BadgeStyle>
                      ) : (
                        <Avatar
                          alt={item?.userName}
                          src={
                            item?.avtarUrl ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ncY-heISk8kAf3J_MXmEi2Utnl0LsgsfQg&usqp=CAU"
                          }
                        />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "16px",
                              lineHeight: "24px",
                              fontFamily: "Roobert",
                              fontWeight: "500",
                            }}
                          >
                            {item?.userName}
                          </Typography>
                          {item.id === selectedItemId ? (
                            <div>
                              <img
                                src={Images.dots}
                                alt=""
                                style={{
                                  width: "16px",
                                  height: "16px",
                                }}
                              />
                            </div>
                          ) : (
                            <Typography
                              style={{
                                fontSize: "12px",
                                lineHeight: "16px",
                                fontFamily: "Poppins-Regular",
                                fontWeight: "400",
                                color: "#475569",
                              }}
                            >
                              {item?.timeLine}
                            </Typography>
                          )}
                        </div>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            style={{
                              fontSize: "12px",
                              lineHeight: "16px",
                              fontFamily: "Poppins-Regular",
                              fontWeight: "400",
                              color: "#646F86",
                            }}
                          >
                            {/* {item.message} */}
                            {item?.message.length < 60
                              ? item?.message
                              : item?.message?.substring(0, 50) +
                                `${
                                  (item?.message?.length > 60 && "...") || ""
                                }`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </List>
              );
            })}
        </ListStyle>
      </Grid>
    </Grid>
  );
}

ChatList.propTypes = {
  handleChatClick: PropTypes.func,
  selectedChat: PropTypes.objectOf(PropTypes.any),
  cList: PropTypes.arrayOf(PropTypes.any),
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.bool,
  gList: PropTypes.arrayOf(PropTypes.any),
};

ChatList.defaultProps = {
  handleChatClick: () => {},
  selectedChat: {},
  cList: [],
  setActiveTab: () => {},
  activeTab: "all-chats",
  gList: [],
};

export default ChatList;
