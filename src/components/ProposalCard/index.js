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

import theme, { color } from "../../config/theme";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const errorObj = {
  scpErr: false,
  scpMsg: "",
};

export default function ProposalCard() {
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
  ];

  return (
    <Grid item container xs={12}>
      <Grid
        item
        container
        wrap={sm ? "wrap" : "nowrap"}
        alignItems={"center"}
        justifyContent={"center"}
        columnGap={2}
      >
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <img
            src="https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg"
            alt="chat"
            className={classes.imageStyle}
          />
        </Grid>
        <Grid item container>
          <Grid item lg={9} md={9} sm={9} xs={9}>
            <Typography className={classes.titleText}>Albert Flores</Typography>
          </Grid>

          <Grid item lg={9} md={9} sm={6} xs={6}>
            <Button
              variant="contained"
              style={{
                marginTop: 3,
                backgroundColor: "#E9B55C",
                padding: 5,
                fontSize: "10px",
                letterSpacing: "1.5px",
                lineHeight: "16px",
              }}
            >
              REQUEST
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.contentContainer} id="scope">
        <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
          <Tabs
            value={tabValueforcard}
            onChange={(v, b) => {
              setTabValueforcard(b);
            }}
            variant="fullWidth"
          >
            <Tab label="Proposal summary" />
            <Tab label="Chat" />
          </Tabs>
        </Grid>
      </Grid>
      {tabValueforcard === 0 ? (
        <>
          <Accordion style={{ marginTop: 10 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.accTitleText}>
                Project Information
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
                    Property Type:
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>Home</Typography>
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
                    Project Budget:
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>
                    $300-$400
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={4} md={4} xs={4}>
                  <Typography className={classes.acctext}>
                    Project Location:
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  lg={8}
                  sm={8}
                  md={8}
                  xs={8}
                  textAlign={"end"}
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
      ) : null}
      {tabValueforcard === 1 ? (
        <>
          <Grid item xs={12}></Grid>
        </>
      ) : null}
    </Grid>
  );
}
