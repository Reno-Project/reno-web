import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  fleetMain: {
    display: "flex",
    flex: 1,
    flexDirection: "column",

    "@media (max-width:425px)": {
      padding: 10,
    },
  },
  inputFieldStyle: {
    marginBottom: 0,
    marginTop: 0,
  },
  dataMain: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
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
