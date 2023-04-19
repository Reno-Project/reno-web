import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleTextStyle: {
    fontFamily: "ElMessiri-SemiBold !important",
    fontSize: "28px !important",
    marginTop: "12px !important",
  },
  descTextStyle: {
    fontFamily: "Roobert-Regular !important",
    color: "#030F1C",
    marginBottom: "15px !important",
    textAlign: "center",
  },
}));

export default useStyles;
