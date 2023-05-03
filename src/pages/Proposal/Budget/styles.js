import { makeStyles } from "@mui/styles";
import { color } from "../../../config/theme";

const useStyles = makeStyles((theme) => ({
  customtable: {
    "& tr td": {
      border: "none !important",
      background: "transparent !important",
      width: 100,
      textAlign: "start",
      padding: "4px 0px",
    },
    "& th": {
      color: color.LightSurface,
    },
  },
  card: {
    border: `1px solid ${color.borderColor}`,
    borderRadius: 8,
    padding: 8,
    margin: "8px 0px !important ",
  },
}));
export default useStyles;
