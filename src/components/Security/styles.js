import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#030F1C",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "500 !important",
    fontSize: "22px !important",
    lineHeight: "32px !important",
  },
  subtitle: {
    color: "#646F86",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    marginTop: "8px !important",
    marginBottom: "16px !important",
  },
  container: {
    border: "1px solid #F2F4F7 !important",
    padding: "22px !important",
    backgroundColor: "#F9F9FB !important",
    borderRadius: "8px !important",
    justifyContent: "flex-end !important",
  },
  TextStyle: {
    color: "#202939 ",
    fontFamily: "Poppins-Regular !important",
    fontSize: "18px !important",
    letterSpacing: "0.5px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },

  language: {
    fontFamily: "Poppins-Regular !important",
    color: "#646F86",
    fontSize: "16px !important",
    fontWeight: "400 !important",
    letterSpacing: "0.5px !important",
    lineHeight: "24px !important",
  },
  imgStyle: { height: "16px" },
  signOut: {
    fontFamily: "Poppins-Regular !important",
    color: "#646F86",
    fontSize: "14px !important",
    fontWeight: "400 !important",
    lineHeight: "20px !important",
  },
}));

export default useStyles;
