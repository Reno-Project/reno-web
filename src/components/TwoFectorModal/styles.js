import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  welcomeTextStyle: {
    fontFamily: "Roobert-Regular !important",
    textAlign: "center",
  },
  loginHeaderText: {
    fontFamily: "ElMessiri-Bold !important",
    fontSize: "22px !important",
    color: "#030F1C",
    textAlign: "center",
    marginTop: "8px !important",
    marginBottom: "15px !important",
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
}));

export default useStyles;
