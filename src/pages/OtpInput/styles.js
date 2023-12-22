import { makeStyles } from "@mui/styles";

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
    marginBottom: "10px !important",
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
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  description: {
    fontFamily: "Poppins-Regular !important",
    color: "#475569",
    marginBottom: "15px !important",
  },
}));

export default useStyles;
