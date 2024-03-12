import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatMessages } from "@cometchat/chat-uikit-react";
import { ListItemStyle } from "@cometchat/uikit-elements";
import {
  MessageComposerConfiguration,
  MessageComposerStyle,
  MessageHeaderConfiguration,
  MessageListConfiguration,
  MessagesStyle,
  MessageInformationStyle,
  MessageInformationConfiguration,
  ThreadedMessagesStyle,
  ThreadedMessagesConfiguration,
} from "@cometchat/uikit-shared";
import "./index.css";

const CometChatComponent = ({ GUID }) => {
  const [group, setGroup] = useState();
  const newGUID = GUID?.replace("#", "");

  useEffect(() => {
    if (!newGUID) return;
    CometChat.getGroup(newGUID).then(
      (group) => {
        setGroup(group);
      },
      (error) => {
        console.log("group details fetching failed with error:", error);
      }
    );
  }, [newGUID]);

  // used to style the message composer (Footer)
  const messageComposerStyle = new MessageComposerStyle({
    textColor: "black",
    textFont: "500 14px Poppins-Regular",
    placeHolderTextColor: "white",
  });

  //used to style the message information when clicked on any single thread
  const messageInfoStyle = new MessageInformationStyle({
    width: "100%",
    background: "red",
    readIconTint: "red",
    deliveredIconTint: "yellow",
    borderRadius: "20px",
  });

  // used to style the header of the group
  const listStyle = new ListItemStyle({
    titleFont: "500 14px Poppins-Regular",
  });

  const messageInformationConfig = new MessageInformationConfiguration({
    deliveredIcon: true,
    readIcon: true,
    messageInformationStyle: messageInfoStyle,
  });

  const messageListConfig = new MessageListConfiguration({
    messageInformationConfiguration: messageInformationConfig,
  });

  // used for configuration for the header
  const messageHeaderConfig = new MessageHeaderConfiguration({
    listItemStyle: listStyle,
    subtitleView: " ",
  });

  // used to style the footer
  const messageComposerConfig = new MessageComposerConfiguration({
    messageComposerStyle: messageComposerStyle,
  });

  const threadedMessageStyle = new ThreadedMessagesStyle({
    background: "white",
    closeIconTint: "black",
    titleColor: "black",
    titleFont: "500 20px Poppins-Medium",
  });

  const threadedMessageConfig = new ThreadedMessagesConfiguration({
    threadedMessagesStyle: threadedMessageStyle,
  });

  // used to style the messages wrapper
  const messageStyle = new MessagesStyle({
    width: "100%",
    height: "50vh",
    border: "1px solid #F3F4F9",
  });

  return (
    <div style={{ width: "100%" }}>
      <CometChatMessages
        group={group}
        hideDetails={true}
        messageListConfiguration={messageListConfig}
        messagesStyle={messageStyle}
        messageHeaderConfiguration={messageHeaderConfig}
        messageComposerConfiguration={messageComposerConfig}
        threadedMessagesConfiguration={threadedMessageConfig}
      />
    </div>
  );
};

export default CometChatComponent;
