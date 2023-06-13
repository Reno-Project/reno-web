import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  MainContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04)",
    border: "1px solid #F2F4F7",
    padding: "20px 20px 20px 20px",
  },
  imageStyle: {
    height: "80px",
    width: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    "@media (max-width:1832px)": {
      height: "65px",
      width: "65px",
    },
    "@media (max-width:1538px)": {
      height: "60px",
      width: "60px",
    },
    "@media (max-width:1384px)": {
      height: "55px",
      width: "55px",
    },
    "@media (max-width:1194px)": {
      height: "80px",
      width: "80px",
    },
  },
  activeContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  activeStatus: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "#32D583",
    border: "1.5px solid #FFFFF",
  },
  titleText: {
    fontSize: "16px !important",
    lineHeight: "25px !important",
    fontFamily: "Roobert-Regular !important",
    fontWeight: "500 !important",
  },
  requestDate: {
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontFamily: "Roobert-Regular !important",
    fontWeight: "500 !important",
    color: "#646F86",
  },
  dateStyle: {
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontFamily: "Roobert-Regular !important",
    color: "#202939",
    textAlign: "end",
    fontWeight: "bold",
  },
  acctext: {
    fontFamily: "Roobert-Regular !important",
    fontSize: "16px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  accRightText: {
    fontFamily: "Roobert-Regular !important",
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
    "& img": {
      width: 140,
      height: 140,
    },
  },
  linkText: {
    fontFamily: "Roobert-Regular !important",
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  titleStyle: {
    fontFamily: "Roobert-Regular !important",
    fontSize: "16px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  titleStyleRight: {
    fontFamily: "Roobert-Regular !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  MainTitle: {
    fontFamily: "Roobert-Regular !important",
    fontSize: "22px !important",
    lineHeight: "32px !important",
    fontWeight: "500 !important",
  },
  paraStyle: {
    fontFamily: "Roobert-Regular !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
    letterSpacing: "0.25px !important",
  },
  popupContainer: {
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
  popupTitle: {
    fontWeight: "600",
    fontFamily: "Elmessiri-Regular",
    fontSize: "18px",
    letterSpacing: "0.6px",
  },
  imageButton: {
    cursor: "pointer",
    // padding: "0px 10px 0px 10px",
    width:'100%'
  },
  popupMessage: {
    fontFamily: "Roobert-Regular",
    fontSize: "13px",
    letterSpacing: "0.6px",
    color: "#696969",
    marginTop: 3,
  },
  subDivForpopup: {
    display: "flex",
    width: "100%",
    padding: "9px",
  },
  subFlexCon: {
    display: "flex",
    flexDirection: "column",
  },
  popupImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 20px 0px",
  },
  notiAppLogo: {
    width: "auto",
    height: "25px",
  },
  notiAppTitleText: {
    fontWeight: "normal",
    fontFamily: "Roobert-Regular",
    fontSize: "13px",
    marginTop: "-3px",
    marginLeft: "5px",
    color: "#a9a9a9",
  },
  table: {
    "& td": {
      width: "33%",
      fontFamily: "Roobert-Regular !important",
    },
    "& .MuiTableCell-head": {
      fontWeight: "bold !important",
      fontFamily: "Roobert-Regular !important",
    },
  },
  dataMain: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
}));

export default useStyles;
