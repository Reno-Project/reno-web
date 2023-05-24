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
import moment from "moment";

const ProjectCard = (props) => {
  const { villa = {}, requested = false, onClick = () => {} } = props;
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const createdAt = moment(villa?.createdAt).format("DD-MM-yyyy");
  const moveInDate = moment(villa?.end_date, "DD/MM/YYYY").format("DD.MM.YYYY");

  return (
    <Card key={villa?.id} className={classes.card} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={villa?.project_image[0]?.image}
        alt={"project_image"}
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
            {villa?.name}
          </Typography>
          {/* <IconButton>
            <MoreVertIcon style={{ color: color.black }} />
          </IconButton> */}
        </div>
        <div className={classes.rowJustified}>
          <Typography className={classes.code}>
            <img src={Images.LocationBlue} alt="Location" />
            {villa?.project_slug}
          </Typography>

          <Typography className={classes.code1}>
            <Typography className={classes.code1} color={"#8C92A4"} mr={0.5}>
              Created:{" "}
            </Typography>{" "}
            {createdAt}
          </Typography>
        </div>
        {/* <div className={classes.rowJustified}>
          <Typography className={classes.row} fontFamily={"Roobert-Regular"}>
            <img src={Images.badroom} alt="badroom" />
            {villa?.form_json[0]?.bedrooms?.title || 0}
          </Typography>
          <Typography className={classes.row} fontFamily={"Roobert-Regular"}>
            <img src={Images.bathroom} alt="bathroom" />{" "}
            {villa?.form_json[0]?.bathrooms?.title || 0}
          </Typography>
          <Typography className={classes.row} fontFamily={"Roobert-Regular"}>
            <img src={Images.size} alt="size" />{" "}
            {villa?.form_json[0]?.size || 0} sqm
          </Typography>
        </div> */}
        <div style={{ width: "100%", margin: "10px 0px" }}>
          <Divider style={{ color: "#F2F3F4" }} />
        </div>
        <Typography className={classes.company}>
          <img
            src={villa?.user_data?.profile_url}
            width={"28px"}
            height={"28px"}
            alt="profile_logo"
            style={{ margin: 0, marginRight: 8, borderRadius: "100%" }}
          />{" "}
          {villa?.user_data?.username}
          {villa?.user_data?.is_email_verified && (
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
              <Typography className={classes.budget}>
                AED {villa?.budget || 0}
              </Typography>
            </div>
            <div className={classes.rowJustified}>
              <Typography className={classes.row}>
                Your move-in date:
              </Typography>
              {!md && <EastOutlined style={{ color: "#475569" }} />}
              <Typography className={classes.budget}>{moveInDate}</Typography>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
