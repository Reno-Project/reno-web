const actions = {
  SET_USER_DATA: "auth/SET_USER_DATA",
  CLEAR_ALL_STORAGE_DATA: "auth/CLEAR_ALL_STORAGE_DATA",
  SET_TOKEN: "auth/SET_TOKEN",

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

  clearAllData: () => (dispatch) =>
    dispatch({
      type: actions.CLEAR_ALL_STORAGE_DATA,
    }),
};

export default actions;
