import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import useStyles from "./styles";
import { color } from "../../config/theme";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import { useTheme } from "@emotion/react";
import Images from "../../config/images";
import CustomCard from "../../components/CustomCard/CustomCard";
import Cselect from "../../components/CSelect";
import BlueAbout from "../../components/BlueAbout";
import { useNavigate } from "react-router-dom";

const HowItWorks = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const Root = styled("div")(({ theme, borderColor }) => ({
    width: "100%",

    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
      marginTop: theme.spacing(0),
    },
  }));

  const CustomDivider = styled(Divider)(({ theme, borderColor }) => ({
    "&::before, &::after": {
      borderColor: borderColor ? borderColor : "#000000", // use prop value or default to black
    },
  }));

  const employeeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <div className={classes.mainContainer}>
      <Grid container className={classes.heroContainer}>
        <Grid container flexDirection={"column"} wrap="nowrap">
          <Grid item sm={12} textAlign={"center"}>
            <Typography className={classes.titleTxt}>
              Manage everything
            </Typography>
          </Grid>
          <Grid item sm={12} textAlign={"center"}>
            <Typography className={classes.titleTxt}>the simple way</Typography>
          </Grid>
          <Grid item sm={12} textAlign={"center"}>
            <Typography
              mt={sm ? 0 : 3}
              py={sm ? 3 : 6}
              fontSize={24}
              color={color.white}
            >
              Simplicity, security and safety
            </Typography>
          </Grid>
          <Grid item sm={12} textAlign={"center"}>
            <Button
              variant="contained"
              style={{
                borderRadius: 50,
                width: md ? 200 : 300,
                fontWeight: "bold",
                fontSize: sm ? 16 : 18,
                lineHeight: 1.4,
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Become a<br />
              contractor
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.SecContainer}>
        <Grid container flexDirection={"column"} wrap="nowrap" py={md ? 5 : 20}>
          <Grid item container md={10} justifyContent={"center"}>
            <Typography className={classes.titleTxt}>
              Contractor value proposition
            </Typography>
          </Grid>
          <Grid
            item
            mt={md ? 5 : 10}
            px={sm && 2}
            container
            columnGap={sm ? 2 : 1}
            rowGap={2}
            justifyContent={"center"}
            xs={10}
          >
            <Grid item lg={2}>
              <CustomCard
                icon={Images.icon1}
                text={"Access to broad spectrum of clients"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                icon={Images.icon2}
                text={"Hassle-free project management tool"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                icon={Images.icon3}
                text={"Record of all requirements and changes"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                icon={Images.icon4}
                text={"Payment and collection guarantee"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                icon={Images.icon5}
                text={"Mediation in case of conflict"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container flexDirection={"column"} wrap="nowrap" py={md ? 5 : 8}>
          <Grid item>
            <Typography className={classes.titleTxt}>How it works</Typography>
          </Grid>
          <Grid
            container
            mt={md ? 5 : 10}
            px={sm && 2}
            columnGap={sm ? 2 : 4}
            rowGap={2}
            justifyContent={"center"}
            xs={10}
          >
            <Grid
              item
              maxWidth={md ? 200 : 260}
              flexDirection={"row"}
              wrap="nowrap"
              container
              columnGap={1}
              margin={0}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: color.primary,
                  borderRadius: 12,
                  padding: 3,
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  fontWeight="bold"
                  color={color.white}
                  lineHeight={1.4}
                >
                  01
                </Typography>
              </div>
              <Grid item>
                <Typography variant="subtitle2" color={"#646F86"}>
                  Journey 1
                </Typography>
                <Typography
                  fontSize={sm ? 16 : md ? 18 : 24}
                  fontFamily={"ElMessiri"}
                >
                  Contractor selection and contracting
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              maxWidth={md ? 200 : 260}
              flexDirection={"row"}
              wrap="nowrap"
              container
              columnGap={1}
              margin={0}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "#E9B55C",

                  borderRadius: 12,
                  padding: 3,
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  fontWeight="bold"
                  color={color.white}
                  lineHeight={1.4}
                >
                  02
                </Typography>
              </div>
              <Grid item>
                <Typography variant="subtitle2" color={"#646F86"}>
                  Journey 2
                </Typography>
                <Typography
                  fontSize={sm ? 16 : md ? 18 : 24}
                  fontFamily={"ElMessiri"}
                >
                  Contract management and payment
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              maxWidth={md ? 200 : 260}
              flexDirection={"row"}
              wrap="nowrap"
              container
              columnGap={1}
              margin={0}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "#9C64E8",
                  borderRadius: 12,
                  padding: 3,
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  fontWeight="bold"
                  color={color.white}
                  lineHeight={1.4}
                >
                  03
                </Typography>
              </div>
              <Grid item>
                <Typography variant="subtitle2" color={"#646F86"}>
                  Journey 3
                </Typography>
                <Typography
                  fontSize={sm ? 16 : md ? 18 : 24}
                  fontFamily={"ElMessiri"}
                >
                  Mediation in case of conflict
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} py={md ? 5 : 10}>
        <Grid item sm={12} textAlign={"center"}>
          <Button variant="contained">JOURNEY - 01</Button>
        </Grid>
        <Grid item container sm={12} mt={2} justifyContent={"center"}>
          <div style={{ maxWidth: 450, textAlign: "center" }}>
            <Typography
              fontFamily={"ElMessiri"}
              lineHeight={"unset"}
              fontSize={sm ? 30 : 50}
            >
              Contractor selection and contracting
            </Typography>
          </div>
          <Grid
            item
            mt={md ? 2 : 10}
            px={sm && 2}
            container
            columnGap={sm ? 2 : 1}
            rowGap={2}
            justifyContent={"center"}
            xs={10}
          >
            <Grid item md={3}>
              <Card
                sx={{
                  minHeight: 240,
                  maxWidth: md ? 300 : 400,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "none",
                  height: "100%",
                }}
              >
                <div className={classes.avtarMain}>
                  <div className={classes.avtarContainer}>
                    <img
                      alt="logo"
                      src={Images.icon6}
                      className={classes.avtar}
                    />
                  </div>
                </div>
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6">
                    Search for contractors and submit requirements to chortlict
                  </Typography>
                </CardContent>
                <Root borderColor={color.primary}>
                  <CustomDivider borderColor={color.primary}>
                    <span
                      style={{
                        backgroundColor: color.primary,
                        borderRadius: 50,
                        color: color.white,
                        padding: 2,
                        fontWeight: "bold",
                      }}
                    >
                      01
                    </span>
                  </CustomDivider>
                </Root>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card
                sx={{
                  maxWidth: md ? 300 : 400,
                  minHeight: 240,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "none",
                  height: "100%",
                }}
              >
                <div className={classes.avtarMain}>
                  <div className={classes.avtarContainer}>
                    <img
                      alt="logo"
                      src={Images.icon3}
                      className={classes.avtar}
                    />
                  </div>
                </div>
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6">
                    Search for contractors and submit requirements to chortlict
                  </Typography>
                </CardContent>
                <Root>
                  <CustomDivider borderColor="#E9B55C">
                    <span
                      style={{
                        backgroundColor: "#E9B55C",
                        borderRadius: 50,
                        color: color.white,
                        padding: 2,
                        fontWeight: "bold",
                      }}
                    >
                      02
                    </span>
                  </CustomDivider>
                </Root>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card
                sx={{
                  maxWidth: md ? 300 : 400,
                  minHeight: 240,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "none",
                  height: "100%",
                }}
              >
                <div className={classes.avtarMain}>
                  <div className={classes.avtarContainer}>
                    <img
                      alt="logo"
                      src={Images.icon7}
                      className={classes.avtar}
                    />
                  </div>
                </div>
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6">
                    Homeowner accepts & signs contract
                  </Typography>
                </CardContent>
                <Root>
                  <CustomDivider borderColor="#9C64E8">
                    <span
                      style={{
                        backgroundColor: "#9C64E8",
                        borderRadius: 50,
                        color: color.white,
                        padding: 2,
                        fontWeight: "bold",
                      }}
                    >
                      03
                    </span>
                  </CustomDivider>
                </Root>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        py={md ? 5 : 10}
        bgcolor={"#F5F6F8"}
        maxWidth={"unset"}
        flexDirection={"column"}
      >
        <Grid item sm={12} textAlign={"center"} mt={2}>
          <Button variant="contained" style={{ backgroundColor: "#E9B55C" }}>
            JOURNEY - 02
          </Button>
        </Grid>
        <Grid item container sm={12} mt={2} justifyContent={"center"}>
          <div style={{ maxWidth: 450, textAlign: "center" }}>
            <Typography
              fontFamily={"ElMessiri"}
              lineHeight={"unset"}
              fontSize={sm ? 30 : 50}
            >
              Contract management and payment
            </Typography>
          </div>
          <Grid
            item
            mt={5}
            px={sm && 2}
            container
            columnGap={sm ? 2 : 1}
            rowGap={2}
            justifyContent={"center"}
            xs={10}
          >
            <Grid item lg={2}>
              <CustomCard
                invert
                normalTxt
                stepTxt="STEP 01"
                icon={Images.icon8}
                text={"Contractor Initiates payment request"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                invert
                normalTxt
                stepTxt="STEP 02"
                icon={Images.icon12}
                text={"Payment to escrow account"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                invert
                normalTxt
                stepTxt="STEP 03"
                icon={Images.icon9}
                text={"Contractor delivers service"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                invert
                normalTxt
                stepTxt="STEP 04"
                icon={Images.icon10}
                text={"Customer confirms services received"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                invert
                normalTxt
                stepTxt="STEP 05"
                icon={Images.icon11}
                text={"Payment released to contractor"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} py={md ? 5 : 10}>
        <Grid item sm={12} textAlign={"center"} mt={2}>
          <Button variant="contained" style={{ backgroundColor: "#9C64E8" }}>
            JOURNEY - 03
          </Button>
        </Grid>
        <Grid item container sm={12} mt={2} justifyContent={"center"}>
          <div style={{ maxWidth: 450, textAlign: "center" }}>
            <Typography
              fontFamily={"ElMessiri"}
              lineHeight={"unset"}
              fontSize={sm ? 30 : 50}
            >
              Mediation in case of conflict
            </Typography>
          </div>
          <Grid
            item
            mt={5}
            px={sm && 2}
            container
            columnGap={sm ? 2 : 1}
            rowGap={2}
            justifyContent={"center"}
            xs={10}
          >
            <Grid item lg={2}>
              <CustomCard
                normalTxt
                stepTxt="STEP 01"
                icon={Images.icon13}
                text={"Customer and contractor fail reach agreement"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                stepTxt="STEP 02"
                normalTxt
                icon={Images.icon14}
                text={"3rd party engineering company reviews deliver"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                showQuote
                stepTxt="STEP 03"
                normalTxt
                icon={Images.icon15}
                text={"Detailed report sent to both parties for rectification"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                stepTxt="STEP 04"
                normalTxt
                icon={Images.icon16}
                text={"Contractor rectifies issues"}
              />
            </Grid>
            <Grid item lg={2}>
              <CustomCard
                stepTxt="STEP 05"
                normalTxt
                icon={Images.icon17}
                text={"Payment released"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        py={md ? 5 : 10}
        bgcolor={"#F5F6F8"}
        maxWidth={"unset"}
        flexDirection={"column"}
      >
        <Grid
          item
          container
          mt={2}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <div style={{ maxWidth: 450, textAlign: "center" }}>
            <Typography
              fontFamily={"ElMessiri"}
              lineHeight={"unset"}
              fontSize={sm ? 30 : 50}
            >
              FAQ
            </Typography>
          </div>
          <Grid
            item
            mt={5}
            px={sm && 2}
            container
            columnGap={sm ? 2 : 1}
            rowGap={2}
            justifyContent={"center"}
            xs={10}
          >
            <Grid item sm={12} md={5}>
              <Select
                value={"Lorem Ipsum is simply dummy text of the?"}
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                placeholder="Lorem Ipsum is simply dummy text of the?"
              >
                <MenuItem
                  value="Lorem Ipsum is simply dummy text of the?"
                  selected
                >
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"01 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"02 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
              </Select>
            </Grid>
            <Grid item sm={12} md={5}>
              <Select
                value={"Lorem Ipsum is simply dummy text of the?"}
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                placeholder="Lorem Ipsum is simply dummy text of the?"
              >
                <MenuItem
                  value="Lorem Ipsum is simply dummy text of the?"
                  selected
                >
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"01 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"02 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
              </Select>
            </Grid>
            <Grid item sm={12} md={5}>
              <Select
                value={"Lorem Ipsum is simply dummy text of the?"}
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                placeholder="Lorem Ipsum is simply dummy text of the?"
              >
                <MenuItem
                  value="Lorem Ipsum is simply dummy text of the?"
                  selected
                >
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"01 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"02 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
              </Select>
            </Grid>
            <Grid item sm={12} md={5}>
              <Select
                value={"Lorem Ipsum is simply dummy text of the?"}
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                placeholder="Lorem Ipsum is simply dummy text of the?"
              >
                <MenuItem
                  value="Lorem Ipsum is simply dummy text of the?"
                  selected
                >
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"01 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"02 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
              </Select>
            </Grid>
            <Grid item sm={12} md={5}>
              <Select
                value={"Lorem Ipsum is simply dummy text of the?"}
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                placeholder="Lorem Ipsum is simply dummy text of the?"
              >
                <MenuItem
                  value="Lorem Ipsum is simply dummy text of the?"
                  selected
                >
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"01 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"02 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
              </Select>
            </Grid>
            <Grid item sm={12} md={5}>
              <Select
                value={"Lorem Ipsum is simply dummy text of the?"}
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                placeholder="Lorem Ipsum is simply dummy text of the?"
              >
                <MenuItem
                  value="Lorem Ipsum is simply dummy text of the?"
                  selected
                >
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"01 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
                <MenuItem value={"02 Lorem Ipsum is simply dummy text of the?"}>
                  Lorem Ipsum is simply dummy text of the?
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BlueAbout />
    </div>
  );
};

export default HowItWorks;
