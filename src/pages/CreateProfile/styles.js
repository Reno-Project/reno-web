import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  welcomeTextStyle: {
    fontFamily: "Roobert-Regular !important",
    fontSize: "13px !important",
    color: "#646F86",
    textAlign: "center",
  },
  loginHeaderText: {
    fontFamily: "ElMessiri-Bold !important",
    fontSize: "22px !important",
    color: "#030F1C",
    textAlign: "center",
    marginTop: "8px !important",
    marginBottom: "15px !important",
  },
  formContainerStyle: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04)",
    border: "1px solid #F2F4F7",
    marginBottom: 40,
    padding: "50px 0px",
  },
  buttonAbsoluteDiv: {
    position: "absolute",
    bottom: 5,
    right: 8,
  },
  uploadIcon: {
    backgroundColor: `#475569 !important`,
    minWidth: "30px !important",
    minHeight: "30px !important",
    borderRadius: "100% !important",
    padding: "0px !important",
    border: "1px solid #FFF",
  },
  pickerInput: {
    "& > div > div > div > input": {
      width: "0px !important",
      border: "0px !important",
      paddingLeft: "38px !important",
    },
    "& > div > div > div > div": {
      border: "0px !important",
      backgroundColor: "#0000 !important",
    },
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
