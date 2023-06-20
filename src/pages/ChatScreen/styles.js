import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  mainTitleStyle: {
    lineHeight: "36px",
    fontFamily: "Inter",
    fontSize: "28px",
    paddingBottom: "27px",
  },
  chatListContainer: {
    backgroundColor: "#FEFEFF",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    borderRight: "2px solid #F2F4F7",
  },
  chatCardContainer: {
    backgroundColor: "#FEFEFF",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    borderLeft: "2px solid #F2F4F7",
  },
}));

export default useStyles;
