import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Images from "../../config/images";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { color } from "../../config/theme";
import useStyles from "./styles";
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

  const startDate = moment(villa?.start_date).format("DD.MM.YYYY");
  const endDate = moment(villa?.end_date).format("DD.MM.YYYY");
  const moveInDate = moment(villa?.move_in_date, "YYYY-MM-DD").format(
    "DD.MM.YYYY"
  );

  // const ispdf = villa?.project_image[0]?.type === "application/pdf";

  return (
    <Card key={villa?.id} className={classes.card} onClick={onClick}>
      <CardMedia
        component="img"
        height="120"
        image={villa?.project_image[0]?.image}
        style={{ objectFit: "cover" }}
        alt={"project_image"}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className={classes.name}>{villa?.name}</Typography>
          {/* <IconButton>
            <MoreVertIcon sx={{ color: color.black }} />
          </IconButton> */}
        </Stack>
        <div className={classes.rowJustified}>
          <Typography
            fontSize="12px"
            fontFamily="Poppins-Regular"
            color="#202939"
          >
            {villa?.project_slug}
          </Typography>

          <Typography className={classes.code1}>
            <Typography className={classes.code1} color="#8C92A4">
              Start-Date:
            </Typography>
            {startDate}
          </Typography>
        </div>
        {/* <Divider /> */}
        {/* <div className={classes.rowJustified}>
          <Typography className={classes.row}>
            <img src={Images.bedroom} alt="badroom" />
            {villa?.form_json?.bedrooms || 0}
          </Typography>
          <Typography className={classes.row}>
            <img src={Images.bathroom} alt="bathroom" />{" "}
            {villa?.form_json?.bathrooms || 0}
          </Typography>
          <Typography className={classes.row}>
            <img src={Images.size} alt="size" /> {villa?.form_json?.size || 0}{" "}
            sqm
          </Typography>
        </div> */}
        {!manageProject && (
          <>
            <Divider style={{ color: "#F2F3F4" }} />
            <Typography className={classes.company}>
              <img
                src={villa?.user_data?.profile_url}
                width="28px"
                height="28px"
                alt="profile_logo"
                style={{ borderRadius: "100%" }}
              />
              {villa?.user_data?.username}
              {villa?.user_data?.is_email_verified && (
                <img
                  src={Images.verified}
                  alt="verified"
                  style={{ marginLeft: 8 }}
                />
              )}
            </Typography>
          </>
        )}

        {!requested && !manageProject && (
          <div className={classes.rowJustified}>
            <Typography className={classes.row}>
              {!requested && "Budget:"}
            </Typography>
            {!requested && (
              <Typography className={classes.budget}>
                AED {villa?.budget || 0}
              </Typography>
            )}
          </div>
        )}

        {(submitted || ongoing) && (
          <>
            <div className={classes.rowJustified}>
              <Typography className={classes.row}>End Date</Typography>
              {!md && <img src={Images.arrow} alt="arrow"></img>}
              <Typography className={classes.budget}>{endDate}</Typography>
            </div>
          </>
        )}
        {manageProject && (
          <>
            <div style={{ width: "100%" }}>
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
              <Typography className={classes.budget}>{startDate}</Typography>
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
