import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  container: {},
  menuTitleStyle: {
    color: "#202939",
    fontSize: "14px !important",
    fontFamily: "Poppins-Regular !important",
  },
  welcomeTextStyle: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "13px !important",
    color: "#646F86",
    textAlign: "center",
  },
  loginHeaderText: {
    fontFamily: "Poppins-Bold !important",
    fontSize: "22px !important",
    color: "#030F1C",
    textAlign: "center",
    marginTop: "8px !important",
    marginBottom: "15px !important",
  },
  borderDivStyle: { height: 1, width: "32%", backgroundColor: "#F2F3F4" },
  continueTextStyle: {
    margin: "0px 15px !important",
    fontFamily: "Poppins-Regular !important",
    fontSize: "15px !important",
    color: "#787B8C",
  },
  socialContainerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #F2F3F4",
    marginBottom: "10px",
    padding: "6px 0px",
    borderRadius: 5,
  },
  socialTextStyle: {
    fontFamily: "Poppins-Regular !important",
    color: "#202939",
    fontSize: 15,
    marginLeft: "10px !important",
  },
  socialImgStyle: {
    height: 30,
  },
  mrL3: {
    marginLeft: "3px !important",
  },
  linkStyle: {
    textDecoration: "none",
  },
  accountTextStyle: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "14px !important",
    color: "#646F86",
  },
  needAccountContainer: {
    marginTop: 12,
    paddingBottom: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pickerInput: {
    "& > div > div > div > input": {
      width: "0px !important",
      border: "0px !important",
      paddingLeft: "36px !important",
    },
    "& > div > div > div > div": {
      border: "0px !important",
      // backgroundColor: "#0000 !important",
    },
    "& > div ": {
      border: "0px !important",
      backgroundColor: "#F5F6F8",
    },
  },
  countryCodeStyle: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "14px !important",
    color: `${color.secondary} !important`,
  },
  buttonStyle: {
    boxShadow: "none !important",
  },
}));

export default useStyles;
