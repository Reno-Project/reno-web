import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tag: {
    color: "#202939",
    fontFamily: "Poppins-Regular !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
  },
  title: {
    color: "#030F1C",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "500 !important",
    fontSize: "22px !important",
    lineHeight: "32px !important",
  },
  subtitle: {
    color: "#030F1C",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    marginTop: "8px !important",
  },
  buttonAbsoluteDiv: {
    position: "absolute",
    bottom: 5,
    right: 8,
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
  uploadIcon: {
    backgroundColor: `#475569 !important`,
    minWidth: "30px !important",
    minHeight: "30px !important",
    borderRadius: "100% !important",
    padding: "0px !important",
    border: "1px solid #FFF",
  },
}));
export default useStyles;
