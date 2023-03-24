import types from "./actions";

const initialState = {
  userdata: {},
  token: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      localStorage.setItem("userData", JSON.stringify(action.userdata));
      return {
        ...state,
        userdata: action.userdata,
      };

    case types.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case types.CLEAR_ALL_STORAGE_DATA:
      // localStorage.clear();
      localStorage.removeItem("userData", "token");
      return {
        ...state,
        userdata: {},
        token: "",
      };

    default:
      return state;
  }
}
