import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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
    fontSize: 15,
    marginLeft: "10px !important",
  },
  socialImgStyle: {
    height: 30,
    marginRight: 90,
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
}));

export default useStyles;
