import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  TextStyle: {
    color: "#202939",
    fontSize: "18px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "24px !important",
    fontFamily: "'Roobert-Regular'",
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
    fontFamily: "'Roobert-Regular'",
    color: "#646F86",
    fontSize: "13px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "25px !important",
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
}));

export default useStyles;
