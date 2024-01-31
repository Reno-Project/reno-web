import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "block",
    paddingTop: "50px",
    width: "100%",
    height: "261px",
    background:
      "var(--Blue-Gradient, linear-gradient(192deg, #274BF1 0.26%, #0B1F7A 116.9%))",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeTextStyle: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold !important",
    fontSize: "40px !important",
    lineHeight: "48px !important",
  },
  loginHeaderText: {
    fontFamily: "Poppins-SemiBold !important",
    fontSize: "24px !important",
    color: "#030F1C",
    textAlign: "center",
  },
  formContainerStyle: {
    width: "680px !important",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04)",
    border: "1px solid #F2F4F7",
    marginBottom: 40,
    padding: "48px 0px",
    transform: "translateY(-108px)",
  },
  buttonAbsoluteDiv: {
    position: "absolute",
    bottom: 4,
    right: 10,
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
  linkStyle: {
    textDecoration: "none",
  },
  uploadFileStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    cursor: "pointer",
  },
}));

export default useStyles;
