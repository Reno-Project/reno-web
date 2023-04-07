import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "400px",
    paddingBottom: 100,
    justifyContent: "space-evenly",
  },
  subContainer: {
    padding: "0 20px",
  },
  text: {
    color: "#475569",
    paddingTop: isMobile ? 0 : "10px",
    cursor: "pointer",
  },
}));
export default useStyles;
