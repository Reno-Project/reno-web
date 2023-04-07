import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footerMainCon: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    position: "fixed",
    height: "70px",
  },
  container: {
    borderTop: "1px solid #F2F4F7",
    height: "100%",
    padding: "0 15px",
  },
  footerTextStyle: {
    color: "#646F86",
    fontSize: "13px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "25px !important",
    fontFamily: "Roobert-Regular !important",
    marginLeft: "15px !important",
  },
  imgStyle: { height: "20px" },
  imgStyleLanguage: { height: "13px" },
  language: {
    color: "#646F86",
    fontSize: "13px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "25px !important",
    fontFamily: "Roobert-Regular !important",
    marginLeft: "5px !important",
  },
}));

export default useStyles;
