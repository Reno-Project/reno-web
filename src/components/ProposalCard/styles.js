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
      height: "70px",
      width: "70px",
    },
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
    position: "relative",
    top: -30,
    left: 65,
    "@media (max-width:1832px)": {
      left: 55,
      top: -28,
    },
    "@media (max-width:1538px)": {
      left: 50,
      top: -25,
    },
    "@media (max-width:1440px)": {
      left: 50,
      top: -22,
    },
    "@media (max-width:1384px)": {
      left: 44,
      top: -21,
    },
    "@media (max-width:1194px)": {
      top: -30,
      left: 65,
    },
  },
  activeStatus: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "#32D583",
    border: "1.5px solid #FFFFF",
    "@media (max-width:1832px)": {
      width: 14,
      height: 14,
      borderRadius: 14,
    },
    "@media (max-width:1538px)": {
      width: 12,
      height: 12,
      borderRadius: 12,
    },
    "@media (max-width:1440px)": {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    "@media (max-width:1194px)": {
      width: 16,
      height: 16,
      borderRadius: 16,
    },
  },
  titleText: {
    fontSize: "16px !important",
    lineHeight: "25px !important",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "500 !important",
  },
  requestDate: {
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "500 !important",
    color: "#646F86",
  },
  dateStyle: {
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontFamily: "Poppins-Regular !important",
    color: "#202939",
    textAlign: "end",
    fontWeight: "bold",
  },
  acctext: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  accRightText: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  accTitleText: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "14px !important",
    lineHeight: "22px !important",
    fontWeight: "500 !important",
  },

  linkText: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  titleStyle: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "16px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  titleStyleRight: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  MainTitle: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "22px !important",
    lineHeight: "32px !important",
    fontWeight: "500 !important",
  },
  paraStyle: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
    letterSpacing: "0.25px !important",
  },
}));

export default useStyles;
