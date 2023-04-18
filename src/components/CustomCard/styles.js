import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  avtar: {
    objectFit: "contain",
    width: 40,
    maxHeight: 40,
  },
  avtarContainer: {
    padding: 16,
    backgroundColor: color.white,
    borderRadius: "50%",
    width: 40,
    maxHeight: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  avtarMain: {
    minHeight: 80,
    wigth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export default useStyles;
