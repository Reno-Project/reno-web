import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "100px 0",
    justifyContent: "space-evenly",
  },
  subContainer: {
    padding: "0 20px",
  },
  text: {
    color: "#475569",
    paddingTop: isMobile ? 0 : "12px",
    cursor: "pointer",
    fontFamily: "Roobert-Regular !important",
  },
}));
export default useStyles;
