import {
  CometChatConversationsWithMessages,
  CometChatIncomingCall,
  CometChatPalette,
  CometChatTheme,
  CometChatThemeContext,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { useEffect } from "react";
import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { store } from "../../../redux/store/configureStore";
import authAction from "../../../redux/reducers/auth/actions";

function ConversationsWithMessagesWrapper({ isMobileView }) {
  const { state } = useLocation();
  const changeThemeToCustom = state?.changeThemeToCustom;
  const { theme } = useContext(CometChatThemeContext);
  const { cometChatUserdata } = useSelector((state) => state.auth);
  useEffect(() => {
    if (cometChatUserdata) {
      CometChatUIKit.login(cometChatUserdata?.uid)
        ?.then((loggedInUser) => {
          console.log("Login successful, loggedInUser:", loggedInUser);
        })
        .catch(() => {
          CometChatUIKit.loginWithAuthToken(process.env.REACT_APP_AUTHKEY);
          // store.dispatch(authAction.clearAllData());
        });
    }
  }, [cometChatUserdata]);

  const themeContext = useMemo(() => {
    let res = theme;
    if (changeThemeToCustom) {
      res = new CometChatTheme({
        palette: new CometChatPalette({
          mode: theme.palette.mode,
          primary: {
            light: "#D422C2",
            dark: "#D422C2",
          },
          accent: {
            light: "#07E676",
            dark: "#B6F0D3",
          },
          accent50: {
            light: "#39f",
            dark: "#141414",
          },
          accent900: {
            light: "white",
            dark: "black",
          },
        }),
      });
    }
    return { theme: res };
  }, [theme, changeThemeToCustom]);

  return (
    <CometChatThemeContext.Provider value={themeContext}>
      <CometChatConversationsWithMessages isMobileView={isMobileView} />
      <CometChatIncomingCall />
    </CometChatThemeContext.Provider>
  );
}

export default ConversationsWithMessagesWrapper;
