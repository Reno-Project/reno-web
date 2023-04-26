import {
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "./styles";
import Images from "../../config/images";
import { NavLink } from "react-router-dom";
import BlueAbout from "../../components/BlueAbout";
import theme from "../../config/theme";
import Milestone from "../Proposal/Milestone";

export default function RequestedProposal() {
  const classes = useStyles();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const [tabValue, setTabValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [show2FModal, setShow2FModal] = useState(false);
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
    <div style={{ backgroundColor: "#F9F9FA" }}>
      <Grid
        container
        xs={12}
        sm={9}
        md={9}
        lg={9}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ padding: "40px 0 40px" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={9}
          className={classes.MainContainer}
          padding={"30px"}
        >
          <Grid container alignItems="center" justifyContent={"flex-end"}>
            <Grid item lg={1} md={12} sm={12} xs={12}>
              <img
                src="https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg"
                alt="chat"
                className={classes.imageStyle}
              />
              <div className={classes.activeContainer}>
                <div className={classes.activeStatus}></div>
              </div>
            </Grid>
            <Grid container lg={11} md={12} sm={12} xs={12}>
              <Grid item lg={9} md={9} sm={9} xs={9}>
                <Typography className={classes.titleText}>
                  Albert Flores
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3} textAlign={"end"}>
                <Typography className={classes.requestDate}>
                  Request Date
                </Typography>
              </Grid>
              <Grid lg={9} md={9} sm={9} xs={9}>
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
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Typography className={classes.dateStyle}>
                  March 01, 2023
                </Typography>
              </Grid>
            </Grid>
            <Grid item container className={classes.contentContainer}>
              <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
                <Tabs
                  value={tabValue}
                  onChange={(v, b) => {
                    setTabValue(b);
                  }}
                  variant="scrollable"
                >
                  <Tab label="Summary" />
                  <Tab label="Milestone" />
                </Tabs>
              </Grid>
              {tabValue === 0 ? (
                <>
                  <Grid lg={12} sm={12} md={12} xs={12}>
                    <Typography
                      className={classes.MainTitle}
                      style={{ paddingTop: 25 }}
                    >
                      Project Informations
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent={"flex-end"}
                    style={{ paddingTop: 25, paddingBottom: 25 }}
                  >
                    <Grid item lg={9} sm={9} md={9} xs={12} textAlign={"start"}>
                      <Typography className={classes.titleStyle}>
                        Project Name:
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={12} textAlign={"end"}>
                      <Typography className={classes.titleStyleRight}>
                        Villa MM-Renovation
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent={"flex-end"}
                  >
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                      <Typography className={classes.titleStyle}>
                        Project Descriptions:
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      sm={12}
                      md={12}
                      xs={12}
                      style={{
                        backgroundColor: "#F5F6F8",
                        padding: "11px 15px",
                        gap: "10px",
                        margin: "10px 0px",
                      }}
                    >
                      <Typography className={classes.paraStyle}>
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since. When an unknown printer took a galley of
                        type and scrambled it to make a type specimen book. It
                        has survived not only five centuries, but also the leap
                        into electronic typesetting, remaining essentially.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent={"flex-end"}
                    rowSpacing={2}
                  >
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Property Type:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        Duplex Building
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Bathroom:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        04
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Bedroom:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        03
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Indoor Space:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        1600 Sqm
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Outdoor Space:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        450 Sqm
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Project Budget:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        $3000-$4000
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
                  <Grid container alignContent={"center"}>
                    <Grid item lg={12}>
                      {imageArray.map((item, index) => {
                        return (
                          <img
                            alt="logo"
                            src={item.image}
                            style={{
                              width: "190px",
                              height: "129px",
                              borderRadius: "7px",
                              margin: "15px 5px",
                            }}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>
                  {/* <Grid
                        xs={12}
                        item
                        container
                        gap={0}
                        style={{
                            marginTop: 20,
                            justifyContent: "center",
                            marginBottom: 20
                        }}
                    >
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <Typography
                                style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    marginTop: 5,
                                    textAlign: 'center'
                                }}
                            >
                                Request clarifications
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <Button
                                style={{ width: "100%" }}
                                variant="contained"
                            >
                                Submit proposal
                            </Button>
                        </Grid>
                    </Grid> */}
                </>
              ) : null}
              {tabValue === 1 ? (
                <>
                  <Milestone />
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BlueAbout />
    </div>
  );
}
