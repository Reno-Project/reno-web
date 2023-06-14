import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";
import { isMobile, isTablet } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "#030F1C",
    fontFamily: " ElMessiri-Semibold !important",
    fontWeight: "600 !important",
    fontSize: "28px !important",
    lineHeight: "36px !important",
    paddingLeft: isMobile && !isTablet ? "25px" : 0,
  },
  titleStyle: {
    color: "#202939",
    fontFamily: "Roobert-Regular !important",
    fontSize: "28px !important",
    lineHeight: "36px !important",
    cursor: "pointer",
    fontWeight: "700 !important",
    marginBottom: "28px !important",
  },

  ptitle: {
    color: "#030F1C",
    fontFamily: "Roobert-Regular !important",
    fontSize: "24px !important",
    lineHeight: "32px !important",
    cursor: "pointer",
    fontWeight: "600 !important",
    paddingLeft: 8,
  },
  container: {
    borderRadius: "8px !important",
    backgroundColor: color.white,
    padding: "30px 24px !important",
    marginTop: "28px !important",
  },
  sliderCon: {
    width: "100%",
    position: "relative",
  },
  iconOpen: {
    transform: "rotate(0deg)",
  },
}));

export default useStyles;
