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
import { isArray, isEmpty } from "lodash";

const errorObj = {
  scpErr: false,
  scpMsg: "",
};

export default function ProposalCard(props) {
  // const { villa } = props;
  const classes = useStyles();
  const [expandProjectInfo, setExpandProjectInfo] = useState(true);
  const [expandAttachments, setExpandAttachments] = useState(true);
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
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
            src={villa?.user_data?.profile_url}
            alt="chat"
            className={classes.imageStyle}
          />
        </Grid>
        <Grid item container>
          <Grid item lg={9} md={9} sm={9} xs={9}>
            <Typography className={classes.titleText}>
              {villa?.user_data?.username}
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
          <Accordion
            style={{ marginTop: 10 }}
            expanded={expandProjectInfo}
            onClick={() => setExpandProjectInfo(!expandProjectInfo)}
          >
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
                    {villa?.project_type}
                  </Typography>
                </Grid>
                {isArray(villa?.form_json) &&
                  !isEmpty(villa?.form_json) &&
                  villa?.form_json?.map((item, index) => {
                    return (
                      <>
                        <Grid item lg={4} sm={4} md={4} xs={4}>
                          <Typography className={classes.acctext}>
                            Property Type:
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={8}
                          sm={8}
                          md={8}
                          xs={8}
                          textAlign={"end"}
                        >
                          <Typography className={classes.accRightText}>
                            {item?.selectType?.title}
                          </Typography>
                        </Grid>
                        <Grid item lg={4} sm={4} md={4} xs={4}>
                          <Typography className={classes.acctext}>
                            Space:
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={8}
                          sm={8}
                          md={8}
                          xs={8}
                          textAlign={"end"}
                        >
                          <Typography className={classes.accRightText}>
                            {item?.size} sq
                          </Typography>
                        </Grid>
                      </>
                    );
                  })}
                <Grid item lg={4} sm={4} md={4} xs={4}>
                  <Typography className={classes.acctext}>
                    Project Budget:
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>
                    {villa?.budget}
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
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{ marginTop: 10, width: "100%" }}
            expanded={expandAttachments}
            onClick={() => setExpandAttachments(!expandAttachments)}
          >
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
                  {villa?.project_image.map((item, index) => {
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
