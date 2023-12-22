import { makeStyles } from "@mui/styles";
import { isMobile, isTablet } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "#030F1C",
    fontFamily: " Poppins-SemiBold !important",
    fontWeight: "600 !important",
    fontSize: "28px !important",
    lineHeight: "36px !important",
    padding: "36px 0 28px",
    paddingLeft: isMobile && !isTablet ? "25px" : 0,
  },
}));
export default useStyles;
