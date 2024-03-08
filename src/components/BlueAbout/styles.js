import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "#E7E7E7",
    cursor: "pointer",
    padding: "2px 0px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
export default useStyles;
