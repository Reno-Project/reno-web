import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    color: "#202939",
    fontFamily: "Roobert-Regular !important",
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
    padding: "23px 36px",
    gap: "10px",
    borderRadius: 8,
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
    fontFamily: "ElMessiri-Regular !important",
    fontWeight: "700 !important",
    fontSize: "28px !important",
    lineHeight: "100% !important",
  },
  cardSubTxt: {
    color: "#475569",
    fontFamily: "Robbert-Regular !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "110% !important",
    textAlign: "center",
  },
  annualC: {
    color: "#475569",
    fontFamily: "Robbert-Regular !important",
    fontWeight: "500 !important",
    fontSize: "16px !important",
    lineHeight: "100% !important",
    margin: "10px 0 !important",
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
}));

export default useStyles;
