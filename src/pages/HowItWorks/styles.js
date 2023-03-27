import { makeStyles } from "@mui/styles";
import worksBg from "../../assets/images/worksBg.png";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    backgroundImage: `url(${worksBg})`,
    backgroundRepeat: "no-repeat",
    // height: "150vh",
  },
}));

export default useStyles;
