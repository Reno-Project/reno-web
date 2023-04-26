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
}));
export default useStyles;
