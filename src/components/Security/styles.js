import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#030F1C",
    fontFamily: "Roobert-Regular !important",
    fontWeight: "500 !important",
    fontSize: "22px !important",
    lineHeight: "32px !important",
  },
  subtitle: {
    color: "#646F86",
    fontFamily: "Roobert-Regular !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    marginTop: "8px !important",
    marginBottom: "16px !important",
  },
  TextStyle: {
    color: "#202939 ",
    fontFamily: "Roobert-Regular !important",
    fontSize: "18px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  TextDeviceStyle: {
    color: "#5CC385",
    fontSize: "15px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "26px !important",
    fontFamily: "Roobert-medium !important",
    marginLeft: "4px !important",
  },
  language: {
    fontFamily: "Roobert-Regular !important",
    color: "#646F86",
    fontSize: "16px !important",
    fontWeight: "400 !important",
    letterSpacing: "0.5px !important",
    lineHeight: "24px !important",
  },
  myOtpInput: {
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
  imgStyle: { height: "16px" },
  signOut: {
    fontFamily: "Roobert-Regular !important",
    color: "#646F86",
    fontSize: "14px !important",
    fontWeight: "400 !important",
    lineHeight: "20px !important",
  },
}));

export default useStyles;
