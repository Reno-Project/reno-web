import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  headerMainCon: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    position: "fixed",
    height: "70px",
    alignItems: "center",
    backgroundColor: color.white,
    boxShadow: "0px 2px 5px #D9DFEB",
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  imgContainer: {
    display: "flex",
    height: "30px",
    cursor: "pointer",
  },
  imgStyle: { height: "100%", width: "100%", objectFit: "contain" },
  menuTitleStyle: {
    color: "#202939",
    fontSize: "15px !important",
    fontFamily: "Roobert-Regular !important",
    textAlign: "center",
  },
  linkStyle: {
    textDecoration: "none",
  },
  PR25: {
    // paddingRight: "25px",
    paddingRight: "4%",
  },
  logoStyle: {
    height: "40px",
    width: "40px",
    minWidth: 40,
    maxWidth: 40,
    borderRadius: "40px",
    cursor: "pointer",
    objectFit: "cover",
  },
  rightLogoContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  logoutTextStyle: {
    cursor: "pointer",
    padding: "0px 10px",
    fontFamily: "Roobert-Regular !important",
  },
  uploadImgDivStyle: {
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
