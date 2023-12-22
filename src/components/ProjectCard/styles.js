import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    minWidth: 380,
    maxWidth: 380,
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
      minWidth: 280,
      flexDirection: "column",
      alignItems: "flex-start",
      "& > *": {
        padding: "4px 0px",
      },
      width: 200,
    },
  },
  name: {
    color: "#202939",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "600 !important",
    fontSize: "21px !important",
    lineHeight: "28px !important",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  rowJustified: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  code: {
    display: "flex",
    alignItems: "center",
    "& > img": {
      // paddingRight: 8,
    },
    color: "#202939",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "400 !important",
    fontSize: "12px !important",
    lineHeight: "16px !important",
  },
  code1: {
    color: "#202939",
    display: "flex",
    alignItems: "center",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "400 !important",
    fontSize: "12px !important",
    lineHeight: "16px !important",
  },
  row: {
    "& > img": {
      paddingRight: 8,
    },
    color: "#202939",
    display: "flex",
    alignItems: "center",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "24px !important",
  },
  company: {
    display: "flex",
    alignItems: "center",
    color: "#202939",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "500 !important",
    fontSize: "15px !important",
    lineHeight: "21px !important",
    marginBottom: "8px !important",
  },
  budget: {
    color: "#202939",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "500 !important",
    fontSize: "18px !important",
    lineHeight: "24px !important",
  },
}));
export default useStyles;
