import { makeStyles } from "@mui/styles";
import { color } from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    maxHeight: "calc(100% - 140px)",
    marginBottom: 70,

    "&::-webkit-scrollbar": {
      display: "none !important",
    },
  },
  loginHeaderText: {
    fontFamily: "ElMessiri-Bold !important",
    fontSize: "30px !important",
  },
  coverStyle: {
    maxHeight: 240,
    width: "100%",
    objectFit: "cover",
  },
  avtar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    objectFit: "cover",
  },
  titleStyle: {
    color: "#202939",
    fontSize: "22px !important",
    fontFamily: "Roobert-Regular !important",
    lineHeight: 28,
    cursor: "pointer",
    fontWeight: 500,
  },
  verifycontainer: {
    backgroundColor: color.fadedblue,
    width: "min-content",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
    marginLeft: 10,
  },
  row: {
    display: "flex",
    alignItems: "center",
  },
  btnStyle: {
    border: `1px solid ${color.borderColor}`,
    padding: 6,
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    height: 20,
    minWidth: 20,
    "&:hover": {
      backgroundColor: "#e8e8e8e8",
      boxShadow: color.shadow,
    },
  },
  address: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0,
    display: "flex",
    alignItems: "flex-start",
    textAlign: "center",
  },
  review: {
    fontSize: `14px !important`,
    lineHeight: 20,
    letterSpacing: 0,
    display: "flex",
    alignItems: "flex-end",
    textAlign: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.borderColor,
    margin: "20px 0",
  },
  rating: {
    fontFamily: "ElMessiri-Bold !important",
    fontSize: "56px !important",
    fontWeight: 400,
  },
  portfolioImg: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    objectFit: "center",
    boxShadow: color.shadow,
  },
  imgContainer: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "-webkit-fill-available",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  reviewMain: {
    marginTop: 10,
    padding: "20px 0px",
  },
  reviewTitle: {
    marginTop: "0",
  },
  reviewContent: {
    marginBottom: "10px",
  },
  reviewButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
  reviewButtonHover: {
    backgroundColor: "#0062cc",
  },

  replies: {
    padding: "20px 0px",
  },
  reply: {
    display: "flex",
    alignItems: "base-line",
  },
  replyContent: {
    marginBottom: "0",
  },
  formLabel: {
    display: "block",
    marginBottom: "5px",
  },
  formInput: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  formButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
  },
  formButtonHover: {
    backgroundColor: "#0062cc",
  },
  chip: {
    cursor: "pointer",
    padding: "10px 12px",
    borderRadius: 4,
    backgroundColor: color.offWhite,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#e8e8e8e8",
      boxShadow: color.shadow,
    },
    [theme.breakpoints.down("sm")]: {
      padding: "4px 8px",
    },
  },
}));

export default useStyles;