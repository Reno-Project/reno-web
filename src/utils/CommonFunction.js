import { getApiData } from "./APIHelper";
import { Setting } from "./Setting";
import { store } from "../redux/store/configureStore";
import authActions from "../redux/reducers/auth/actions";

// this function will update userdata
export const updateUserData = async () => {
  const { setUserData } = authActions;
  try {
    const response = await getApiData(Setting.endpoints.me, "GET", {});
    if (response.success) {
      store.dispatch(setUserData(response?.data));
    }
  } catch (error) {
    console.log("error ===>>>", error);
  }
};
