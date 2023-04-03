import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  socialContainerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #F2F3F4",
    marginBottom: "10px",
    padding: "6px 0px",
    borderRadius: 5,
    cursor: "pointer",
  },
  socialTextStyle: {
    fontFamily: "Roobert-Regular !important",
    color: "#202939",
    fontSize: 15,
    marginLeft: "10px !important",
  },
  socialImgStyle: {
    height: 30,
  },
}));

export default useStyles;
