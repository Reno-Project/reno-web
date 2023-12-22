import { makeStyles } from "@mui/styles";
import { color } from "../../../config/theme";

const useStyles = makeStyles((theme) => ({
  // customtable: {
  //   "& tr td": {
  //     border: "none !important",
  //     background: "transparent !important",
  //     width: 100,
  //     textAlign: "start",
  //     padding: "4px 0px",
  //   },
  //   "& th": {
  //     color: color.LightSurface,
  //   },
  // },
  MainContainer: {
    width: "100%",
    height: "max-content",
  },
  dataMain: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  card: {
    border: `1px solid ${color.borderColor}`,
    borderRadius: 8,
    padding: 16,
    margin: "20px 0px !important ",
  },
  customtable: {
    borderCollapse: "collapse",
    "& td": {
      borderBottom: `1px solid ${theme.palette.divider}`,
      textAlign: "start",
      border: "none !important",
      background: "transparent !important",
      width: 100,
      padding: "4px 0px",
    },
    "& th": {
      color: color.secondary,
      fontSize: 14,
    },
  },
  cardValueTexy: {
    color: "#030F1C",
    fontFamily: " Poppins-SemiBold !important",
    fontWeight: "600 !important",
    fontSize: "28px !important",
    lineHeight: "36px !important", //styleName: Headline 4;
  },
  MainTitle: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "22px !important",
    lineHeight: "32px !important",
    fontWeight: "500 !important",
  },
  acctext: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "16px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  accRightText: {
    fontFamily: "Poppins-Regular !important",
    fontSize: "18px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
    "& img": {
      width: 140,
      height: 140,
    },
  },
}));
export default useStyles;
