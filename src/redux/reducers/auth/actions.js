const actions = {
  SET_USER_DATA: "auth/SET_USER_DATA",
  CLEAR_ALL_STORAGE_DATA: "auth/CLEAR_ALL_STORAGE_DATA",
  SET_TOKEN: "auth/SET_TOKEN",
  SET_ACCOUNT_TAB: "auth/SET_ACCOUNT_TAB",
  PROPOSAL_DETAILS: "auth/PROPOSAL_DETAILS",
  SET_USER_UUID: "auth/SET_USER_UUID",
  SET_NOTI_DATA: "auth/SET_NOTI_DATA",
  SET_DISPLAY_NOTIFICATION_POP_UP: "auth/SET_DISPLAY_NOTIFICATION_POP_UP",
  SET_COMETCHAT_USER_DATA: "SET_COMETCHAT_USER_DATA",

  setCometChatUserData: (cometChatUserdata) => (dispatch) =>
    dispatch({
      type: actions.SET_COMETCHAT_USER_DATA,
      cometChatUserdata,
    }),

  setUserData: (userdata) => (dispatch) =>
    dispatch({
      type: actions.SET_USER_DATA,
      userdata,
    }),

  setProposalDetails: (proposalDetails) => (dispatch) =>
    dispatch({
      type: actions.PROPOSAL_DETAILS,
      proposalDetails,
    }),

  setToken: (token) => (dispatch) =>
    dispatch({
      type: actions.SET_TOKEN,
      token,
    }),

  setUserUUID: (useruuid) => (dispatch) =>
    dispatch({
      type: actions.SET_USER_UUID,
      useruuid,
    }),

  displayNotificationPopUp: (isNotify) => (dispatch) =>
    dispatch({
      type: actions.SET_DISPLAY_NOTIFICATION_POP_UP,
      isNotify,
    }),

  setNotiData: (notiData) => (dispatch) =>
    dispatch({
      type: actions.SET_NOTI_DATA,
      notiData,
    }),

  setAccountTab: (accountTab) => (dispatch) =>
    dispatch({
      type: actions.SET_ACCOUNT_TAB,
      accountTab,
    }),

  clearAllData: () => (dispatch) =>
    dispatch({
      type: actions.CLEAR_ALL_STORAGE_DATA,
    }),
};

export default actions;
