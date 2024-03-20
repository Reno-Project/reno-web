import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  projectInformation: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderRadius: "10px",
    fontFamily: "Poppins-Medium !important",
  },

  informationCard: {
    fontSize: "14px !important",
    padding: "0 12px",
    color: "#646f86",
    fontFamily: "Poppins-Regular !important",
  },

  value: {
    fontSize: "16px !important",
    padding: "4px 12px",
    fontFamily: "Poppins-Medium !important",
  },
}));
export default useStyles;
