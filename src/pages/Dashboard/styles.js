import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  container: {},
  titleStyle: {
    color: "#202939",
    fontFamily: "Roobert-Regular !important",
    lineHeight: 28,
    cursor: "pointer",
    fontWeight: "700 !important",
  },
  card: {
    backgroundColor: color.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "23px 36px",
    gap: "10px",
    borderRadius: 8,
  },
}));

export default useStyles;
