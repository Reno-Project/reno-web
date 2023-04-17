import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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
  uploadStyle: {
    backgroundColor: "#F9F9FA",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 170,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
export default useStyles;
