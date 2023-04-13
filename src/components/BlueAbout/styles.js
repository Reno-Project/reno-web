import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "50px 0",
    justifyContent: "space-evenly",
    backgroundColor: color.secondary,
  },
  subContainer: {
    padding: "0 20px",
  },
  text: {
    color: color.white,
    paddingTop: isMobile ? 0 : "10px",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  footerTextStyle: {
    backgroundColor: "transparent",
    color: "#B1B1B1",
  },
}));
export default useStyles;