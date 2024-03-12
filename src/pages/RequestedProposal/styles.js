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
    fontSize: "16px !important",
    lineHeight: "24px !important",
    fontFamily: "Poppins-Medium !important",
    color: "#202939",
    textAlign: "end",
    fontWeight: "bold",
  },
  acctext: {
    fontFamily: "Poppins-Regular",
    fontSize: "16px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  accRightText: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
    "& img": {
      width: 140,
      height: 140,
    },
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
  dataMain: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  table: {
    "& td": {
      width: "30%",
      fontFamily: "Poppins-Regular !important",
    },
    "& .MuiTableCell-head": {
      fontWeight: "bold !important",
      fontFamily: "Poppins-Regular !important",
    },
  },
  projectInformation: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderRadius: "10px",
    fontFamily: "Poppins-Medium !important",
    // backgroundColor: "#F3F4F9",
  },

  informationCard: {
    fontSize: "14px !important",
    padding: "0 12px",
    color: "#646f86",
    fontFamily: "Poppins-Regular !important",
  },

  value: {
    fontSize: "16px !important",
    padding: "4px 12px",
    fontFamily: "Poppins-Medium !important",
  },
}));

export default useStyles;
