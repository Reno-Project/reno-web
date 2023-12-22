import { makeStyles } from "@mui/styles";
import { isMobile, isTablet } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
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
  container: {
    border: "1px solid #F2F4F7",
    padding: isMobile && !isTablet ? 10 : 20,
    marginTop: "20px !important",
    borderRadius: "8px",
  },
}));
export default useStyles;
