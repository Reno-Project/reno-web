const prod = process.env.NODE_ENV === "production";
// const baseUrl = prod
//   ? "https://reno-home.azurewebsites.net/"
//   : "https://reno-home.azurewebsites.net/";
const baseUrl = prod
  ? "http://192.168.2.149:3000/"
  : "http://192.168.2.149:3000/";

export const Setting = {
  baseUrl,
  api: baseUrl,

  GOOLE_MAPS_KEY: "AIzaSyBO1ZlrBp68Oj02lrpoF4gJ7DbuzaFQLNA",
  FACEBOOK_APP_ID: "",
  GOOGLE_CLIENT_ID:
    "271291217173-edt0r9crj6puar4o75r2ipagf0inimue.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET_KEY: "",

  endpoints: {
    login: "api/user/login",
    signup: "api/user/signup",
    googleData: "auth/google",
    verifyOtp: "api/user/verify-otp",
    resendOtp: "api/user/resend-otp",
    updatepassword: "api/user/update-password",
    addContractorDetails: "api/contractor/add-contractor-details",
    addPortfolio: "api/contractor/add-portfolio",
    addBillingInfo: "api/contractor/add-billing-info",
  },

  JS_Regex: {
    email_Regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    pwd1_Regex: /^.{8,}$/, // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    phone_Regex: /^(\+44\s?\d{10}|0044\s?\d{10}|0\s?\d{10})?$/,
    alphabatic_Regex: /^[A-Za-z]+$/,
  },

  page_name: {},
};
