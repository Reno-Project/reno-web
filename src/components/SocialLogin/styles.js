import { makeStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

const useStyles = makeStyles((theme) => {
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return {
    socialContainerStyle: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #E3E5E5",
      marginBottom: "10px",
      padding: "6px 0px",
      borderRadius: 8,
      cursor: "pointer",
    },
    socialTextStyle: {
      fontFamily: "Poppins-Regular !important",
      fontSize: sm ? "12px !important" : "15px !important",
      marginLeft: sm ? "5px !important" : ": 10px !important",
    },
    socialImgStyle: {
      height: 30,
      marginRight: sm ? 5 : 90,
      marginLeft: 16,
    },
    facebook: {
      background: "#0078FF",
      color: "#FFFFFF",
    },
    apple: {
      background: "#090A0A",
      color: "#FFFFFF",
    },
  };
});

export default useStyles;
