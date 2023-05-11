import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import useStyles from "./styles";
import Images from "../../config/images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BlueAbout from "../../components/BlueAbout";
import theme from "../../config/theme";

export default function RequestedProposal() {
  const location = useLocation();
  const villa = location?.state ? location?.state : {};
  const classes = useStyles();
  const navigate = useNavigate();

  // const villa = {
  //   id: 45,
  //   project_id: 5,
  //   contractor_id: 291,
  //   user_id: 291,
  //   status: "pending",
  //   scope_of_work: "vill",
  //   createdAt: "2023-05-08T05:41:09.510Z",
  //   proposal_budget_item: [
  //     {
  //       id: 1,
  //       proposal_id: 45,
  //       name: "Budget 1",
  //       material_type: "wood",
  //       material_unit: 2,
  //       material_unit_price: 2300,
  //       qty: 1,
  //       milestone_id: 5,
  //       manpower_rate: 1,
  //       days: 5,
  //       specification: "Specs",
  //     },
  //     {
  //       id: 2,
  //       proposal_id: 45,
  //       name: "Budget 2",
  //       material_type: "wood",
  //       material_unit: 1,
  //       material_unit_price: 1000,
  //       qty: 2,
  //       milestone_id: 5,
  //       manpower_rate: 1,
  //       days: 2,
  //       specification: "test",
  //     },
  //   ],
  //   proposal_id: 44,
  //   proposal_photo: {
  //     id: 37,
  //     photo: "documents/proposal-b9d94f67-6dd6-4131-a22e-b6bc6a354e03",
  //   },
  //   project: [
  //     {
  //       createdAt: "2023-05-08T05:33:26.980Z",
  //       updatedAt: "2023-05-08T05:33:26.980Z",
  //       id: 5,
  //       exp_id: 1,
  //       project_type: "iterrior",
  //       name: "vill",
  //       description: "nscnsnc",
  //       location: "27A blikers st",
  //       budget: 1555,
  //       start_date: "01/05/2023",
  //       end_date: "31/08/2023",
  //       form_json: '"{bnchbacb : nasncnasc}"',
  //       status: "pending",
  //       user_id: 291,
  //       contractor_id: 10,
  //     },
  //   ],
  // };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sm = useMediaQuery(theme.breakpoints.down("sm"));
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
        item
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
          <Grid
            item
            container
            wrap={sm ? "wrap" : "nowrap"}
            alignItems={"center"}
            columnGap={2}
          >
            <Grid item>
              <img
                src="https://www.wonderplugin.com/wp-content/uploads/2016/06/blue-grape-hyacinths.jpg"
                alt="chat"
                className={classes.imageStyle}
              />
              <div className={classes.activeContainer}>
                <div className={classes.activeStatus}></div>
              </div>
            </Grid>
            <Grid item container>
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
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <Typography className={classes.dateStyle}>
                  March 01, 2023
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container className={classes.contentContainer}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <Typography className={classes.MainTitle}>
                Project Informations
              </Typography>
            </Grid>
            <Grid
              item
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
              item
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
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since. When an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not
                  only five centuries, but also the leap into electronic
                  typesetting, remaining essentially.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
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
                <Typography className={classes.acctext}>Bathroom:</Typography>
              </Grid>
              <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                <Typography className={classes.accRightText}>04</Typography>
              </Grid>
              <Grid item lg={3} sm={3} md={3} xs={3}>
                <Typography className={classes.acctext}>Bedroom:</Typography>
              </Grid>
              <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                <Typography className={classes.accRightText}>03</Typography>
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
              <Grid
                item
                lg={3}
                sm={3}
                md={3}
                xs={3}
                paddingBottom={"14px"}
                borderBottom={"1px solid #F2F3F4"}
              >
                <Typography className={classes.acctext}>
                  Outdoor Space:
                </Typography>
              </Grid>
              <Grid
                item
                lg={9}
                sm={9}
                md={9}
                xs={9}
                textAlign={"end"}
                paddingBottom={"14px"}
                borderBottom={"1px solid #F2F3F4"}
              >
                <Typography className={classes.accRightText}>
                  450 Sqm
                </Typography>
              </Grid>

              <Grid
                item
                lg={3}
                sm={3}
                md={3}
                xs={3}
                paddingBottom={"14px"}
                borderBottom={"1px solid #F2F3F4"}
              >
                <Typography className={classes.acctext}>
                  Project Budget:
                </Typography>
              </Grid>
              <Grid
                item
                lg={9}
                sm={9}
                md={9}
                xs={9}
                textAlign={"end"}
                paddingBottom={"14px"}
                borderBottom={"1px solid #F2F3F4"}
              >
                <Typography className={classes.accRightText}>
                  $3000-$4000
                </Typography>
              </Grid>
              <Grid
                item
                lg={9}
                sm={9}
                md={9}
                xs={9}
                paddingBottom={"14px"}
                borderBottom={"1px solid #F2F3F4"}
              >
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
                paddingBottom={"14px"}
                borderBottom={"1px solid #F2F3F4"}
              >
                <NavLink>
                  <Typography className={classes.linkText}>View Map</Typography>
                </NavLink>
                <img
                  alt="logo"
                  src={Images.Location}
                  // style={{ width: '12%' }}
                />
              </Grid>
            </Grid>
            <Grid item container alignContent={"center"}>
              <Grid item lg={12}>
                {imageArray.map((item, index) => {
                  return (
                    <img
                      key={index}
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

            <Grid
              item
              container
              columnGap={1}
              rowGap={1}
              justifyContent={"space-between"}
            >
              <Grid item sm={5.9} xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ boxShadow: "none" }}
                  disabled={true}
                >
                  Request clarifications
                </Button>
              </Grid>
              <Grid item sm={5.9} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/create-proposal", { state: villa });
                  }}
                >
                  Submit proposal
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BlueAbout />
    </div>
  );
}
