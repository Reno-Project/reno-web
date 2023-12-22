import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "100px 0",
    justifyContent: "space-evenly",
  },
  subContainer: {
    padding: "0 20px",
  },
  title: {
    color: "##202939",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "500 !important",
    fontSize: "18px !important",
    lineHeight: "24px !important",
    marginBottom: "23px !important",
  },
  text: {
    color: "#475569",
    paddingTop: isMobile ? 4 : "12px",
    cursor: "pointer",
    fontFamily: "Poppins-Regular !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "22px !important",
  },
}));
export default useStyles;
