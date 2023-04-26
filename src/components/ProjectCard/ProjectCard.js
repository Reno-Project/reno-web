import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Images from "../../config/images";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { color } from "../../config/theme";
import useStyles from "./styles";
import { EastOutlined } from "@mui/icons-material";

const ProjectCard = (props) => {
  const { villa = {}, requested = false, onClick = () => {} } = props;
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card className={classes.card} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={villa.image}
        alt={villa.name}
      />
      <CardContent>
        <div className={classes.row}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontFamily={"ElMessiri-Regular"}
            margin={0}
          >
            {villa.name}
          </Typography>
          <IconButton>
            <MoreVertIcon style={{ color: color.black }} />
          </IconButton>
        </div>
        <div className={classes.rowJustified}>
          <Typography className={classes.row} mr={2}>
            <img src={Images.LocationBlue} alt="Location" /> {villa.code}
          </Typography>
          <Typography>
            <Typography component="span" color="text.secondary">
              Created:{" "}
            </Typography>
            {villa.created}
          </Typography>
        </div>
        <div className={classes.rowJustified}>
          <Typography className={classes.row}>
            <img src={Images.badroom} alt="badroom" /> {villa.bedrooms}
          </Typography>
          <Typography className={classes.row}>
            <img src={Images.bathroom} alt="bathroom" /> {villa.bathrooms}
          </Typography>
          <Typography className={classes.row}>
            <img src={Images.size} alt="size" /> {villa.size}
          </Typography>
        </div>
        <div style={{ width: "100%", margin: "8px 0px" }}>
          <Divider />
        </div>
        <Typography className={classes.row}>
          <img
            src={Images.profile_logo}
            alt="profile_logo"
            style={{ marginRight: 8 }}
          />{" "}
          {villa.company}
          {villa.is_email_verified && (
            <img
              src={Images.verified}
              alt="verified"
              style={{ marginLeft: 8 }}
            />
          )}
        </Typography>

        {!requested && (
          <>
            <div className={classes.rowJustified}>
              <Typography>Budget:</Typography>
              <Typography fontFamily={"ElMessiri-Regular"}>
                {villa.budget}
              </Typography>
            </div>
            <Typography className={classes.rowJustified}>
              <Typography>Your move-in date:</Typography>
              {!md && <EastOutlined />}
              <Typography fontFamily={"ElMessiri-Regular"}>
                {villa.moveInDate}
              </Typography>
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
