import types from "./actions";

const initialState = {
  userData: {},
  cometChatUserdata: {},
  token: "",
  accountTab: 0,
  proposalDetails: {},
  useruuid: "",
  isNotify: false,
  notiData: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      localStorage.setItem("userData", JSON.stringify(action.userdata));
      return {
        ...state,
        userData: action.userdata,
      };

    case types.SET_COMETCHAT_USER_DATA:
      return {
        ...state,
        cometChatUserdata: action.cometChatUserdata,
      };

    case types.PROPOSAL_DETAILS:
      return {
        ...state,
        proposalDetails: action.proposalDetails,
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

    case types.SET_USER_UUID:
      return {
        ...state,
        useruuid: action.useruuid,
      };

    case types.SET_DISPLAY_NOTIFICATION_POP_UP:
      return {
        ...state,
        isNotify: action.isNotify,
      };

    case types.SET_NOTI_DATA:
      return {
        ...state,
        notiData: action.notiData,
      };

    case types.CLEAR_ALL_STORAGE_DATA:
      // localStorage.clear();
      localStorage.removeItem("userData", "token");
      return {
        ...state,
        userData: {},
        token: "",
        accountTab: 0,
        useruuid: "",
        proposalDetails: {},
      };

    default:
      return state;
  }
}
