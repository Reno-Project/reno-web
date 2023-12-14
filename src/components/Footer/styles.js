import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  top: { position: "fixed", top: "2%", left: "85%" },
  topLeft: {
    position: "fixed",
    top: "34px",
    left: "33px",
  },
  footerMainCon: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    position: "fixed",
    height: "70px",
  },
  container: {
    height: "100%",
    padding: "0px",
  },
  footerTextStyle: {
    left: "33px !important",
    bottom: "34px",
    position: "fixed",
    color: "#646F86",
    fontSize: "12px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "18px !important",
    fontFamily: "Poppins-Regular !important",
    fontWeight: 400,
    // marginLeft: "15px !important",
  },
  imgStyle: { height: "20px" },
  imgStyleLanguage: { height: "13px" },
  language: {
    color: "#646F86",
    fontSize: "13px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "25px !important",
    fontFamily: "Poppins-Regular !important",
    marginLeft: "5px !important",
  },
}));

export default useStyles;
