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
    <Card key={villa?.id} className={classes.card} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={villa.image}
        alt={villa.name}
      />
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Typography className={classes.name} gutterBottom component="div">
            {villa.name}
          </Typography>
          <IconButton>
            <MoreVertIcon style={{ color: color.black }} />
          </IconButton>
        </div>
        <div className={classes.rowJustified}>
          <Typography className={classes.code}>
            <img src={Images.LocationBlue} alt="Location" /> {villa.code}
          </Typography>

          <Typography className={classes.code1}>
            <Typography className={classes.code1} color={"#8C92A4"}>
              Created:{" "}
            </Typography>{" "}
            {villa.created}
          </Typography>
        </div>
        <div className={classes.rowJustified}>
          <Typography className={classes.row} fontFamily={"Roobert-Regular"}>
            <img src={Images.badroom} alt="badroom" /> {villa.bedrooms}
          </Typography>
          <Typography className={classes.row} fontFamily={"Roobert-Regular"}>
            <img src={Images.bathroom} alt="bathroom" /> {villa.bathrooms}
          </Typography>
          <Typography className={classes.row} fontFamily={"Roobert-Regular"}>
            <img src={Images.size} alt="size" /> {villa.size}
          </Typography>
        </div>
        <div style={{ width: "100%", margin: "10px 0px" }}>
          <Divider style={{ color: "#F2F3F4" }} />
        </div>
        <Typography className={classes.company}>
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
              <Typography className={classes.row}>Budget:</Typography>
              <Typography className={classes.budget}>{villa.budget}</Typography>
            </div>
            <div className={classes.rowJustified}>
              <Typography className={classes.row}>
                Your move-in date:
              </Typography>
              {!md && <EastOutlined style={{ color: "#475569" }} />}
              <Typography className={classes.budget}>
                {villa.moveInDate}
              </Typography>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
