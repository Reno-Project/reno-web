import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  headerMainCon: {
    top: 0,
    zIndex: 1000,
    position: "sticky",
    height: "70px",
    padding: "10px 40px",
    backgroundColor: color.white,
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
    fontSize: "16px !important",
    fontFamily: "Poppins-Regular !important",
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
    borderRadius: "50%",
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
    color: "#646F86",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "400 !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
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
