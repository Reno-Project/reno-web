import { makeStyles } from "@mui/styles";
import { color } from "../../../config/theme";

const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${color.borderColor}`,
    borderRadius: 8,
    padding: 8,
    margin: "8px 0px !important ",
  },
  customCard: {
    borderRadius: "8px",
    border: "1px solid var(--Divider-2, #E8E8E8)",
    background: "#F5F6F8",
    padding: "24px",
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
