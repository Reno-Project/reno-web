import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// import { TextArea } from "@dinkum/components/Input";
// import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
// import { useTranslation } from "next-i18next";
// import Button from '@dinkum/components/Button';
import { useDispatch, useSelector } from "react-redux";
// import { handleTyping } from "@dinkum/store/chat/middleware";
// import { notification, Typography, Upload } from "antd";
// import { docTypes } from "@dinkum/helpers/utility";
// import getApiData from "@dinkum/helpers/apiHelper";
import {
  Button,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  styled,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CInput from "../../CInput";
import { Upload } from "@mui/icons-material";
import Images from "../../../config/images";

let valTimer = null;
const { Text } = Typography;

function ChatFooter(props) {
  const { handleSend } = props;

  const inputRef = useRef(null);
  // const { t } = useTranslation("chat");

  const dispatch = useDispatch();
  // const { selectedChat } = useSelector((state) => state.chat);

  const [state, setState] = useState({
    msg: "",
    typing: false,
    uploading: false,
  });

  const sendMsg = () => {
    if (!state.msg || !state.msg.trim()) {
      return;
    }
    handleSend({ message: state.msg.trim() });
    setState((p) => ({ ...p, msg: "" }));
    if (inputRef?.current) inputRef.current.focus();
  };

  const stopTyping = () => {
    // dispatch(
    //   handleTyping({
    //     group_id: selectedChat.group_id,
    //     stop: true,
    //   })
    // );
  };

  // useEffect(
  //   () => () => {
  //     stopTyping();
  //     if (selectedChat.group_id) {
  //       stopTyping();
  //     }
  //   },
  //   []
  // );

  // useEffect(
  //   () => () => {
  //     if (selectedChat.group_id) {
  //       stopTyping();
  //     }
  //   },
  //   [selectedChat.group_id]
  // );

  // useEffect(() => {
  //   if (selectedChat.group_id) {
  //     // dispatch(
  //     //   handleTyping({
  //     //     group_id: selectedChat.group_id,
  //     //     stop: !state.typing,
  //     //   })
  //     // );
  //   }
  // }, [state.typing]);

  // const handleUploadFile = async (file) => {
  //   if (!file.type) {
  //     //!docTypes[file.type]
  //     notification.open({
  //       type: "error",
  //       // message: t('err.fileType'),
  //     });
  //     return false;
  //   }

  //   if (file.size > 20000000) {
  //     notification.open({
  //       type: "error",
  //       // message: t('err.maxMBFile', { ns: 'common', size: 20 }),
  //     });
  //     return false;
  //   }

  //   setState((p) => ({ ...p, uploading: true }));

  //   const fmData = new FormData();
  //   fmData.append("group_id", selectedChat.group_id);
  //   fmData.append("type", file);
  //   try {
  //     const res = await getApiData({
  //       url: "group/file-upload",
  //       method: "post",
  //       data: fmData,
  //       formData: true,
  //     });
  //     if (res.success && res.data.file_meta) {
  //       setState((p) => ({ ...p, uploading: false }));
  //       handleSend({
  //         type: "file",
  //         file_url: res.data.file_url,
  //         file_meta: res.data.file_meta,
  //       });
  //     } else {
  //       setState((p) => ({ ...p, uploading: false }));
  //       notification.open({
  //         type: "error",
  //         // message: res.message || t('err.api', { ns: 'common' }),
  //       });
  //     }
  //   } catch (e) {
  //     setState((p) => ({ ...p, uploading: false }));
  //     notification.open({ type: "error", message: "something went wrong" });
  //   }

  //   return false;
  // };
  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleImageUpload = (e) => {
    const chosenFiles = Array.from(e.target.files);
    const imagesPreview = [];

    chosenFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        imagesPreview.push(event.target.result);
        if (imagesPreview.length === chosenFiles.length) {
          setSelectedImages(imagesPreview);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <Grid
      item
      container
      xs={12}
      sm={12}
      md={12}
      lg={12}
      padding={"20px 22px 20px 22px"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item xs={10} sm={11} md={10} lg={11}>
        <CInput
          onChange={(e) => {
            setState((p) => ({
              ...p,
              searchVal: e.target.value,
              isSearching: true,
            }));
            clearTimeout(valTimer);
            valTimer = setTimeout(() => {
              // getData(e.target.value);
            }, 800);
          }}
          endAdornment={
            <InputAdornment position="end" style={{ padding: 20 }}>
              <IconButton>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  multiple
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  onChange={handleImageUpload}
                  />
                <img src={Images.fileUpload} alt="" />
              </IconButton>
              <IconButton>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  multiple
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  onChange={handleImageUpload}
                />
                <img src={Images.pictureUpload} alt="" />
              </IconButton>
            </InputAdornment>
          }
          placeholder="Type a message"
        />
      </Grid>
      <Grid item xs={2} sm={1} md={2} lg={1} padding={"0px 10px 0px 10px"}>
        <div
          style={{
            backgroundColor: "#5CC385",
            width: "44px",
            height: "44px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <img
            src={Images.send}
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </Grid>
      <div>
        {selectedImages?.map((image) => (
          <img
            key={image}
            src={image}
            alt="Selected"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              margin:10
            }}
          />
        ))}
      </div>
    </Grid>
  );
}

ChatFooter.propTypes = {
  handleSend: PropTypes.func,
};

ChatFooter.defaultProps = {
  handleSend: () => {},
};

export default ChatFooter;
