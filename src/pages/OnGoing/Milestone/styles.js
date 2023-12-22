import { makeStyles } from "@mui/styles";
import { color } from "../../../config/theme";

const useStyles = makeStyles((theme) => ({
  datePicker: {
    "& .MuiButton-root": {
      color: color.primary,
    },
    "& .MuiSvgIcon-root": {
      color: color.primary,
    },
  },
  card: {
    border: `1px solid ${color.borderColor}`,
    borderRadius: 8,
    padding: 8,
    margin: "8px 0px !important ",
  },
  customtable: {
    borderCollapse: "collapse",
    "& td": {
      borderBottom: `1px solid ${theme.palette.divider}`,
      textAlign: "center",
      border: "none !important",
      background: "transparent !important",
      width: 100,
      padding: "4px 0px",
    },
    "& th": {
      color: color.LightSurface,
    },
  },
  cardValueTexy: {
    color: "#030F1C",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "600 !important",
    fontSize: "28px !important",
    lineHeight: "36px !important", //styleName: Headline 4;
  },
  MainTitle: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "22px !important",
    lineHeight: "32px !important",
    fontWeight: "500 !important",
  },
  acctext: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "14px !important",
    lineHeight: "20px !important",
    fontWeight: "400 !important",
  },
  accRightText: {
    fontFamily: "Poppins-Regular  !important",
    fontSize: "14px !important",
    lineHeight: "24px !important",
    fontWeight: "500 !important",
    "& img": {
      width: 140,
      height: 140,
    },
  },
}));
export default useStyles;
