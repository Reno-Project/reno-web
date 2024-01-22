import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap:"24px",
  },

  title:{
    fontSize:"24px !important",
    fontFamily:"Poppins-SemiBold !important",
    color: "#030f1c !important",
    lineHeight:"32px !important",
    textAlign:"center",
  },
 
  descTextStyle: {
    fontSize: "16px !important",
    fontFamily: "Poppins-Regular !important",
    color: "#030F1C !important",
    textAlign: "center",
    lineHeight:"24px !important",
  },
}));

export default useStyles;
