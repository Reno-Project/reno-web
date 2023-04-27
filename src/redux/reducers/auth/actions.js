const actions = {
  SET_USER_DATA: "auth/SET_USER_DATA",
  CLEAR_ALL_STORAGE_DATA: "auth/CLEAR_ALL_STORAGE_DATA",
  SET_TOKEN: "auth/SET_TOKEN",
  SET_ACCOUNT_TAB: "auth/SET_ACCOUNT_TAB",

  setUserData: (userdata) => (dispatch) =>
    dispatch({
      type: actions.SET_USER_DATA,
      userdata,
    }),

  setToken: (token) => (dispatch) =>
    dispatch({
      type: actions.SET_TOKEN,
      token,
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
