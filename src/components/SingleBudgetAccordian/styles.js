import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
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
