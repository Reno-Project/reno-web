import { makeStyles } from "@mui/styles";
import Images from "../../config/images";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    overflowY: "scroll",
  },
  heroContainer: {
    backgroundImage: `url(${Images.worksBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "calc(100vh - 70px)",
    width: "100%",
    display: "flex",
    flexDirection: "column !important",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "unset !important",
    overflow: "hidden",
    zIndex: 10,
  },
  SecContainer: {
    backgroundImage: `url(${Images.Pattern})`,
    backgroundColor: color.secondary,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    maxWidth: "unset !important",
  },
  avtar: {
    objectFit: "contain",
    width: 40,
    maxHeight: 40,
  },
  avtarContainer: {
    padding: 16,
    backgroundColor: "#F5F6F8",
    borderRadius: "50%",
    width: 40,
    maxHeight: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  avtarMain: {
    height: 80,
    wigth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
}));

export default useStyles;
