import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    boxSizing: "border-box",
    position: "fixed",
    width: "350px",
    zIndex: 1001,
    backgroundColor: "#ffffff",
    marginTop: "-6px",
    borderRadius: "5px",
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    "@media screen and(max-width: 500px)": {
      width: "96%",
    },
    "@media screen and(max-width: 450px)": {
      width: "95%",
    },
    "@media screen and(max-width: 350px)": {
      width: "94%",
    },
  },
  topRight: {
    top: "15px",
    right: "15px",
    transition: "transform 0.6s ease-in-out",
    animation: "toast-in-right 0.7s",
  },
  notificationTitle: {
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    fontSize: "14px",
    letterSpacing: "0.6px",
    marginTop: 3,
  },
  notificationMessage: {
    fontFamily: "Poppins-Regular",
    fontSize: "13px",
    letterSpacing: "0.6px",
    color: "#696969",
    marginTop: 3,
  },
  subDivForNotification: {
    display: "flex",
    width: "100%",
    padding: "9px",
  },
  subFlexCon: {
    display: "flex",
    flexDirection: "column",
  },
  notificationImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "5px",
  },
  notiAppLogo: {
    width: "auto",
    height: "25px",
  },
  notiAppTitleText: {
    fontWeight: "normal",
    fontFamily: "Poppins-Regular",
    fontSize: "13px",
    marginTop: "-3px",
    marginLeft: "5px",
    color: "#a9a9a9",
  },
}));

export default useStyles;
