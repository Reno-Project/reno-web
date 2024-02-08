import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    color: "#202939",
    fontFamily: "Poppins-Regular !important",
    fontSize: "28px !important",
    lineHeight: "36px !important",
    cursor: "pointer",
    fontWeight: "700 !important",
    marginBottom: "28px !important",
  },
  card: {
    backgroundColor: color.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 24px",
    gap: "16px",
    flex: "1 0 0",
    borderRadius: "0px 12px",
    border: "1px solid var(--gray-200-line, #F2F4F7)",
    boxSizing: "border-box",
    [theme.breakpoints.down("xl")]: {
      width: "100%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "31%",
    },
    [theme.breakpoints.down("md")]: {
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cardTxt: {
    color: "#030F1C",
    fontFamily: "Poppins-Regular !important",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "32px",
  },
  cardSubTxt: {
    color: "#475569",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  annualC: {
    color: "#475569",
    fontFamily: "Poppins-Regular",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    whiteSpace: "nowrap",
  },
  ptitle: {
    color: "#030F1C",
    fontFamily: " Poppins-Regular !important",
    fontSize: "18px !important",
    lineHeight: "24px !important",
    cursor: "pointer",
    fontWeight: "700 !important",
    paddingLeft: 8,
  },
  container: {
    borderRadius: "8px !important",
    backgroundColor: color.white,
    padding: "30px 24px !important",
    marginTop: "28px !important",
  },
  scrollableDiv: {
    display: "flex",
    overflowX: "scroll",
    width: "100%",
    padding: "10px 0",
    WebkitBoxDirection: "normal",
    WebkitOverflowScrolling: "touch", // For iOS Safari
    "&::-webkit-scrollbar": {
      display: "-webkit-inline-box !important",
      width: "10px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
  },
  sliderCon: {
    width: "100%",
    position: "relative",
  },
}));

export default useStyles;
