import {
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Images from "../../config/images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import theme from "../../config/theme";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const errorObj = {
  scpErr: false,
  scpMsg: "",
};

export default function ChatCard() {
  const classes = useStyles();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValueforcard, setTabValueforcard] = useState(0);

  const imageArray = [
    {
      id: 1,
      image:
        "https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg",
    },
    {
      id: 2,
      image:
        "https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg",
    },
    {
      id: 3,
      image:
        "https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg",
    },
    // {
    //   id: 4,
    //   image:
    //     "https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg",
    // },
  ];

  return (
    <Grid
      item
      container
      xs={12}
      sm={12}
      md={12}
      lg={12}
      className={classes.MainContainer}
    >
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src="https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg"
              alt="chat"
              className={classes.imageStyle}
            />
            <div className={classes.activeContainer}>
              <div className={classes.activeStatus}></div>
            </div>
          </div>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} textAlign={"center"}>
          <Typography className={classes.nameStyle}>Albert Flores</Typography>
        </Grid>
        <Grid
          item
          container
          lg={12}
          md={10}
          sm={10}
          xs={10}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item textAlign={"center"}>
            <div
              style={{
                backgroundColor: "#F9FAFC",
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <img
                src={Images.people}
                alt=""
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </div>
            <Typography className={classes.iconTitleStyle}>profile</Typography>
          </Grid>
          <Grid item textAlign={"center"}>
            <div
              style={{
                backgroundColor: "#F9FAFC",
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <img
                src={Images.mute}
                alt=""
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </div>
            <Typography className={classes.iconTitleStyle}>mute</Typography>
          </Grid>
          <Grid item textAlign={"center"}>
            <div
              style={{
                backgroundColor: "#F9FAFC",
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <img
                src={Images.search}
                alt=""
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </div>
            <Typography className={classes.iconTitleStyle}>search</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.contentContainer} id="scope">
        <>
          <Accordion style={{ marginTop: 10, width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.accTitleText}>
                Project Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                item
                container
                alignItems="center"
                justifyContent={"flex-end"}
                rowSpacing={2}
              >
                <Grid item lg={4} sm={4} md={4} xs={4}>
                  <Typography className={classes.acctext}>
                    Project Name:
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>
                    Luxury Interior Design
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={4} md={4} xs={4}>
                  <Typography className={classes.acctext}>
                    Total amount:
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>
                    $2,300
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={4} md={4} xs={4}>
                  <Typography className={classes.acctext}>Space:</Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>
                    1600 sq
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={4} md={4} xs={4}>
                  <Typography className={classes.acctext}>
                    Serial ID:
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>
                    #CH019221002900
                  </Typography>
                </Grid>
                <Grid item lg={9} sm={9} md={9} xs={9}>
                  <Typography className={classes.acctext}>
                    Project Location:
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  lg={3}
                  sm={3}
                  md={3}
                  xs={3}
                  justifyContent={"flex-end"}
                  wrap="nowrap"
                >
                  <NavLink>
                    <Typography className={classes.linkText}>
                      View Map
                    </Typography>
                  </NavLink>
                  <img
                    alt="logo"
                    src={Images.Location}
                    // style={{ width: '12%' }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ marginTop: 10, width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.accTitleText}>
                Attachments
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item container alignContent={"center"}>
                <Grid item lg={9} sm={9} md={9} xs={9}>
                  <Typography className={classes.acctext}>
                    Requirements doc:
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  lg={3}
                  sm={3}
                  md={3}
                  xs={3}
                  justifyContent={"flex-end"}
                  wrap="nowrap"
                >
                  <NavLink>
                    <Typography className={classes.linkText}>
                      View Doc
                    </Typography>
                  </NavLink>
                  <img
                    alt="logo"
                    src={Images.doc}
                    style={{ width: "18px", height: "18px" }}
                  />
                </Grid>
                <Grid item lg={12}>
                  {imageArray.map((item, index) => {
                    return (
                      <img
                        key={index}
                        alt="logo"
                        src={item.image}
                        style={{
                          width: "88px",
                          height: "88px",
                          borderRadius: "7px",
                          margin: "15px 5px",
                        }}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
      </Grid>
    </Grid>
  );
}
