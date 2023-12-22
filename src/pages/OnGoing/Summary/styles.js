import { makeStyles } from "@mui/styles";
import { isMobile, isTablet } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  MainContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04)",
    border: "1px solid #F2F4F7",
    padding: "20px 20px 20px 20px",
    height: "max-content",
  },
  header: {
    color: "#15252B",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "600 !important",
    fontSize: "24px !important",
    lineHeight: "32px !important",
    paddingBottom: 20,
  },
  titleText: {
    fontSize: "16px !important",
    lineHeight: "25px !important",
    fontFamily: "Poppins-Regular  !important",
    fontWeight: "500 !important",
  },
  requestDate: {
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontFamily: "Poppins-Regular  !important",
    fontWeight: "500 !important",
    color: "#646F86",
  },
  dateStyle: {
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontFamily: "Poppins-Regular  !important",
    color: "#202939",
    textAlign: "end",
    fontWeight: "bold",
  },
  acctext: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  accRightText: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
    "& img": {
      width: 140,
      height: 140,
    },
  },
  linkText: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  titleStyle: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "16px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  titleStyleRight: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  MainTitle: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "22px !important",
    lineHeight: "32px !important",
    fontWeight: "500 !important",
  },
  paraStyle: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
    letterSpacing: "0.25px !important",
  },
  cardValueTexy: {
    color: "#030F1C",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "600 !important",
    fontSize: "28px !important",
    lineHeight: "36px !important", //styleName: Headline 4;
  },
  dataMain: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    width: "100%",
  },
}));

export default useStyles;
