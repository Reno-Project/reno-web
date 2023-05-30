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
  const { villa } = props;
  const classes = useStyles();
  const nData = villa?.submitted_by_reno
    ? villa?.reno_data || {}
    : villa?.user_data || {};
  const [expandProjectInfo, setExpandProjectInfo] = useState(true);
  const [expandAttachments, setExpandAttachments] = useState(true);
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValueforcard, setTabValueforcard] = useState(0);

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
            src={nData?.profile_url}
            alt="chat"
            className={classes.imageStyle}
          />
        </Grid>
        <Grid item container>
          <Grid item lg={9} md={9} sm={9} xs={9}>
            <Typography className={classes.titleText}>
              {nData?.username}
            </Typography>
          </Grid>

          <Grid item lg={9} md={9} sm={6} xs={6} style={{ marginTop: 5 }}>
            <span
              variant="contained"
              style={{
                backgroundColor: "#E9B55C",
                padding: 8,
                fontSize: "10px",
                letterSpacing: "1.5px",
                lineHeight: "16px",
                borderRadius: 4,
                color: "#FFFFFF",
              }}
            >
              REQUEST
            </span>
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
            onChange={() => setExpandProjectInfo(!expandProjectInfo)}
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
                    {villa?.name}
                  </Typography>
                </Grid>
                <Grid item lg={4} sm={4} md={4} xs={4}>
                  <Typography className={classes.acctext}>
                    Project Type:
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>
                    {villa?.project_type}
                  </Typography>
                </Grid>
                {/* {isArray(villa?.form_json) &&
                  !isEmpty(villa?.form_json) &&
                  villa?.form_json?.map((item, index) => {
                    return (
                      <>
                        <Grid item lg={4} sm={4} md={4} xs={4}>
                          <Typography className={classes.acctext}>
                            Project Type:
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
                  })} */}
                <Grid item lg={4} sm={4} md={4} xs={4}>
                  <Typography className={classes.acctext}>
                    Project Budget:
                  </Typography>
                </Grid>
                <Grid item lg={8} sm={8} md={8} xs={8} textAlign={"end"}>
                  <Typography className={classes.accRightText}>
                    AED {villa?.budget || 0}
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
            onChange={() => setExpandAttachments(!expandAttachments)}
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
                    const url = item?.type?.includes("image")
                      ? item?.image
                      : Images.pdf;
                    return (
                      <img
                        key={index}
                        alt="logo"
                        src={url}
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
