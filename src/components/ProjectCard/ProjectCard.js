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
  const { villa = {}, type = "", onClick = () => {} } = props;
  const manageProject = type === "manageProject";
  const submitted = type === "submitted";
  const requested = type === "requested";
  const ongoing = type === "ongoing";
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const createdAt = moment(villa?.start_date, "DD/MM/YYYY").format(
    "DD.MM.YYYY"
  );
  const endDate = moment(villa?.end_date, "DD/MM/YYYY").format("DD.MM.YYYY");
  const updatedAt = moment(villa?.updatedAt).format("DD.MM.YYYY");
  const moveInDate = moment(villa?.move_in_date, "YYYY-MM-DD").format(
    "DD.MM.YYYY"
  );
  const nData = villa?.submitted_by_reno
    ? villa?.reno_data || {}
    : villa?.user_data || {};
  const ispdf = villa?.project_image[0]?.type === "application/pdf";
  return (
    <Card key={villa?.id} className={classes.card} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={ispdf ? Images.pdf : villa?.project_image[0]?.image}
        style={{ objectFit: ispdf ? "contain" : "cover" }}
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
              {manageProject || ongoing
                ? "Order Date"
                : requested
                ? "Requested"
                : "Submitted"}
              :{" "}
            </Typography>{" "}
            {requested ? createdAt : updatedAt}
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
        {!manageProject && (
          <>
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Divider style={{ color: "#F2F3F4" }} />
            </div>
            <Typography className={classes.company}>
              <img
                src={nData?.profile_url}
                width={"28px"}
                height={"28px"}
                alt="profile_logo"
                style={{ margin: 0, marginRight: 8, borderRadius: "100%" }}
              />{" "}
              {nData?.username}
              {nData?.submitted_by_reno
                ? null
                : nData?.is_email_verified && (
                    <img
                      src={Images.verified}
                      alt="verified"
                      style={{ marginLeft: 8 }}
                    />
                  )}
            </Typography>
          </>
        )}

        {!manageProject && (
          <div className={classes.rowJustified}>
            <Typography className={classes.row}>
              {requested ? "Client Budget" : "Budget"}:
            </Typography>
            <Typography className={classes.budget}>
              AED {villa?.budget || 0}
            </Typography>
          </div>
        )}

        {submitted && (
          <>
            <div className={classes.rowJustified}>
              <Typography className={classes.row}>
                Client move-in date:
              </Typography>
              {!md && <EastOutlined style={{ color: "#475569" }} />}
              <Typography className={classes.budget}>{moveInDate}</Typography>
            </div>
          </>
        )}
        {manageProject && (
          <>
            <div style={{ width: "100%", margin: "10px 0px" }}>
              <Divider style={{ color: "#F2F3F4" }} />
            </div>
            <div className={classes.rowJustified}>
              <Typography className={classes.row}>Customer name:</Typography>
              <Typography className={classes.budget}>
                {villa?.user_data?.username}
              </Typography>
            </div>
            <div className={classes.rowJustified}>
              <Typography className={classes.row}>Budget :</Typography>
              <Typography className={classes.budget}>
                AED {villa?.budget || 0}
              </Typography>
            </div>
            <div className={classes.rowJustified}>
              <Typography className={classes.row}>Start Date:</Typography>
              <Typography className={classes.budget}>{createdAt}</Typography>
            </div>
            <div className={classes.rowJustified}>
              <Typography className={classes.row}>End Date:</Typography>
              <Typography className={classes.budget}>{endDate}</Typography>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
