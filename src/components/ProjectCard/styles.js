import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    minWidth: 380,
    margin: "0px 8px",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04)",
    cursor: "pointer",
    transition: "transform 0.3s ease-out !important",
    "@media (min-width: 960px)": {
      "&:hover": {
        transform: "translate3d(0, -10px, 0)",
        filter:
          "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
      },
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "90%",
      flexDirection: "column",
      alignItems: "flex-start",
      "& > *": {
        padding: "4px 0px",
      },
      width: "95% ",
    },
  },
  rowJustified: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "4px 0px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
    "& > img": {
      paddingRight: 8,
    },
  },
}));
export default useStyles;
