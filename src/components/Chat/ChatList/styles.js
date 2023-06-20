import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  mainTextStyle: {
    fontSize: "20px",
    lineHeight: "28px",
    fontFamily: "Inter",
    fontWeight: "600",
  },
  searchInput: {
    backgroundColor: "#F9FAFC",
    borderRadius: "8px",
    width: "100%",
    padding: "6px",
    margin: "20px 0px 10px 0px",
    border: "1px solid #EAECF0",
  },
  userNameStyle: {
    fontSize: "16px",
    lineHeight: "24px",
    fontFamily: "Roobert",
    fontWeight: "500",
  },
  timeLineStyle: {
    fontSize: "19px",
    lineHeight: "16px",
    fontFamily: "Roobert-Regular",
    fontWeight: "400",
    color: "#475569",
  },
  msgTextStyle: {
    fontSize: "12px",
    lineHeight: "16px",
    fontFamily: "Roobert-Regular",
    fontWeight: "400",
    color: "#646F86",
  },
}));

export default useStyles;
