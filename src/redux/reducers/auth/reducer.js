import types from "./actions";

const initialState = {
  userData: {},
  token: "",
  accountTab: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      localStorage.setItem("userData", JSON.stringify(action.userdata));
      return {
        ...state,
        userData: action.userdata,
      };

    case types.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case types.SET_ACCOUNT_TAB:
      return {
        ...state,
        accountTab: action.accountTab,
      };

    case types.CLEAR_ALL_STORAGE_DATA:
      // localStorage.clear();
      localStorage.removeItem("userData", "token");
      return {
        ...state,
        userData: {},
        token: "",
        accountTab: 0,
      };

    default:
      return state;
  }
}
