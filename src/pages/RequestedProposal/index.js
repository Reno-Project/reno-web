import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import useStyles from "./styles";
import Images from "../../config/images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BlueAbout from "../../components/BlueAbout";
import theme from "../../config/theme";
import moment from "moment";

export default function RequestedProposal() {
  const location = useLocation();
  // const villa = location?.state ? location?.state : {};
  // console.log("villa======", villa);
  const classes = useStyles();
  const navigate = useNavigate();
  const villa = {
    createdAt: "2023-05-12T06:15:10.670Z",
    updatedAt: "2023-05-12T06:15:10.670Z",
    id: 80,
    exp_id: 1,
    project_type: "Interior design",
    name: " this is for testing",
    description: "I want to create house",
    location: "Al Furjan",
    budget: 25000,
    start_date: "2023-06-17T06:13:45.484Z",
    end_date: "2023-05-12T06:13:45.482Z",
    form_json:
      '[{"size":"25","selectedItems":[{"id":1,"title":"Modern"},{"id":7,"title":"Mid-century"},{"id":9,"title":"Scandinavian"},{"id":4,"title":"Country"},{"id":5,"title":"Boho classic"},{"id":6,"title":"Coastal"},{"id":2,"title":"Industrial"},{"id":12,"title":"Hollywood Regency"}],"selectType":{"id":2,"title":"Apartment"},"selectFloor":{"id":2,"title":"2"},"selectBedrooms":{"id":2,"title":"2"},"selectBathrooms":{"id":3,"title":"3"},"selectKitchen":{"id":2,"title":"2"}}]',
    status: "pending",
    user_id: 465,
    contractor_id: 9,
    project_slug: "#CH555259294600",
    project_image: [
      {
        id: 69,
        image:
          "https://static.renohome.io/documents/46497073-ca83-4598-919d-7bcbda7bd187",
      },
    ],
    user_data: {
      is_email_verified: true,
      profile_url:
        "https://static.renohome.io/reno-cms/ea0b2d8e-352a-45ed-aee4-59bab25bb47f",
      email: "anurag22@groovyweb.co",
      phone_code: "91",
      phone_no: "9624553405",
      username: "Anurag",
      is_phone_verified: false,
      role: "home_owner",
    },
  };
  const formArray = JSON.parse(villa?.form_json);
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
                src={villa?.user_data?.profile_url}
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
                  {villa?.user_data?.username}
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
                  {moment(villa?.createdAt).format("MMMM DD, YYYY")}
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
                  {villa?.name}
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
                  {villa?.description}
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
              {formArray?.map((item, index) => {
                return (
                  <>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Property Type:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        {item?.selectType?.title}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Bathroom:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        {item?.selectBathrooms?.title}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Bedroom:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        {item?.selectBedrooms?.title}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} sm={3} md={3} xs={3}>
                      <Typography className={classes.acctext}>
                        Indoor Space:
                      </Typography>
                    </Grid>
                    <Grid item lg={9} sm={9} md={9} xs={9} textAlign={"end"}>
                      <Typography className={classes.accRightText}>
                        {item?.size}
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
                        {item?.size}
                      </Typography>
                    </Grid>
                  </>
                );
              })}

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
                  {villa?.budget}
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
                <Typography className={classes.linkText}>
                  {villa?.location}
                </Typography>

                <img
                  alt="logo"
                  src={Images.Location}
                  // style={{ width: '12%' }}
                />
              </Grid>
            </Grid>
            <Grid item container alignContent={"center"}>
              <Grid item lg={12}>
                {villa?.project_image.map((item, index) => {
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
