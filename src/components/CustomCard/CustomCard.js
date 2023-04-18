import {
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { color } from "../../config/theme";
import useStyles from "./styles";
import Images from "../../config/images";

export default function CustomCard(props) {
  const { icon, text, invert, stepTxt, normalTxt, showQuote } = props;
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Card
      sx={{
        maxWidth: md ? 200 : 244,
        minHeight: 240,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: invert ? color.white : "#F5F6F8",
        paddingTop: 3,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        overflow: "unset",
        boxShadow: "none",
      }}
    >
      {!lg && showQuote && (
        <div
          style={{
            position: "absolute",
            top: -30,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 99,
          }}
        >
          <img
            style={{ width: 60, height: 60 }}
            src={Images.quote}
            alt="quote"
          />
        </div>
      )}
      <div className={classes.avtarMain}>
        {stepTxt && (
          <div
            style={{
              backgroundColor: invert ? "#5CC385" : "#E9B55C",
              padding: "4px 12px",
              borderRadius: 4,
              color: color.white,
              marginBottom: 8,
            }}
          >
            <Typography textTransform={"uppercase"}>{stepTxt}</Typography>
          </div>
        )}
        <div
          className={classes.avtarContainer}
          style={{
            backgroundColor: invert ? "#F5F6F8" : color.white,
          }}
        >
          <img alt="logo" src={icon} className={classes.avtar} />
        </div>
      </div>
      <CardContent>
        <Typography
          variant="h6"
          color={normalTxt ? "" : color.primary}
          fontWeight={normalTxt ? "normal" : "bold"}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}
