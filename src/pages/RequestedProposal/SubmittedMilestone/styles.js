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
}));
export default useStyles;
