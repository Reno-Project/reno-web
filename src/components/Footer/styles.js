import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  top: { position: "fixed", top: "2%", left: "85%" },
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
    padding: "0 15px",
  },
  footerTextStyle: {
    color: "#FFFFFF",
    fontSize: "13px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "25px !important",
    fontFamily: "Poppins-Regular !important",
    marginLeft: "15px !important",
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
