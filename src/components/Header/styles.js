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
  },
  linkStyle: {
    textDecoration: "none",
  },
  PR25: {
    paddingRight: "25px",
  },
  logoStyle: {
    height: "40px",
    width: "40px",
    borderRadius: "40px",
    cursor: "pointer",
  },
  rightLogoContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  logoutTextStyle: {
    cursor: "pointer",
  },
}));

export default useStyles;
