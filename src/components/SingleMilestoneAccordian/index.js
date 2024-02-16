import { ChevronRight } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Stack } from "@mui/system";
import moment from "moment";

const SingleMilestoneAccordion = ({
  milestone,
  index,
  amounts,
  handleRowClick,
  amount,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleChangeExpanded = () => () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Grid item xs={12} key={index}>
      <Accordion
        key={milestone.id}
        onChange={handleChangeExpanded(milestone?.id)}
        style={{
          boxShadow: "none",
          borderRadius: "none",
          backgroundColor: "#f3f4f9",
        }}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            ".MuiAccordionSummary-content": {
              margin: 0,
              padding: "10px",
            },
          }}
        >
          <Grid container>
            <Grid
              item
              md={8}
              xs={8}
              style={{
                display: "flex",
                gap: "2px",
                alignItems: "center",
              }}
            >
              {expanded ? <ExpandMoreIcon /> : <ChevronRight />}
              <div style={{ marginRight: 10 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 22V14M5 14V4M5 14L7.47067 13.5059C9.1212 13.1758 10.8321 13.3328 12.3949 13.958C14.0885 14.6354 15.9524 14.7619 17.722 14.3195L17.9364 14.2659C18.5615 14.1096 19 13.548 19 12.9037V5.53669C19 4.75613 18.2665 4.18339 17.5092 4.3727C15.878 4.78051 14.1597 4.66389 12.5986 4.03943L12.3949 3.95797C10.8321 3.33284 9.1212 3.17576 7.47067 3.50587L5 4M5 4V2"
                    stroke="#274BF1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <span style={{ fontFamily: "Poppins-Regular" }}>
                {milestone.milestone_name}
              </span>
            </Grid>
            <Grid item md={4} xs={4} style={{ display: "flex" }}>
              <Grid
                display={"flex"}
                item
                lg={7}
                sm={12}
                md={7}
                xs={12}
                direction={"column"}
              >
                <div component={"span"} className="accLabel">
                  Due Date
                </div>
                <div component={"span"} className="accLabelValue">
                  {moment(milestone?.end_date).format("MMM DD, YYYY")}
                </div>
              </Grid>
              {amounts?.reduce((acc, curr) => acc + curr, 0) > 0 || amount ? (
                <Grid
                  display={"flex"}
                  item
                  lg={5}
                  sm={12}
                  md={5}
                  xs={12}
                  direction={"column"}
                >
                  <div component={"span"} className="accLabel">
                    Amount
                  </div>
                  <div component={"span"} className="accLabelValue">
                    AED {amounts[index] || amount || "NA"}
                  </div>
                </Grid>
              ) : (
                <Grid
                  display={"flex"}
                  item
                  lg={5}
                  sm={12}
                  md={5}
                  xs={12}
                  direction={"column"}
                >
                  <div component={"span"} className="accLabel">
                    Amount
                  </div>
                  <div component={"span"} className="accLabelValue">
                    NA
                  </div>
                </Grid>
              )}
              {handleRowClick && (
                <Grid item>
                  <IconButton
                    onClick={(e) => handleRowClick(e, milestone, index)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <Divider sx={{ margin: "0px 16px" }} />
        <AccordionDetails
          style={{
            padding: "12px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Grid item md={12} xs={12} style={{ display: "flex" }}>
            <Grid
              display={"flex"}
              item
              lg={3}
              sm={12}
              md={3}
              xs={12}
              direction={"column"}
            >
              <div component={"span"} className="accLabel">
                Start Date
              </div>
              <div component={"span"} className="accLabelValue">
                {moment(milestone?.start_date).format("MMM DD, YYYY")}
              </div>
            </Grid>
            <Grid
              display={"flex"}
              item
              lg={3}
              sm={12}
              md={3}
              xs={12}
              direction={"column"}
            >
              <div component={"span"} className="accLabel">
                End Date
              </div>
              <div component={"span"} className="accLabelValue">
                {moment(milestone?.end_date).format("MMM DD, YYYY")}
              </div>
            </Grid>
            {amounts?.reduce((acc, curr) => acc + curr, 0) > 0 || amount ? (
              <Grid
                display={"flex"}
                item
                lg={6}
                sm={12}
                md={6}
                xs={12}
                direction={"column"}
              >
                <div component={"span"} className="accLabel">
                  Amount
                </div>
                <div component={"span"} className="accLabelValue">
                  AED {amounts[index] || amount || "NA"}
                </div>
              </Grid>
            ) : (
              <Grid
                display={"flex"}
                item
                lg={5}
                sm={12}
                md={5}
                xs={12}
                direction={"column"}
              >
                <div component={"span"} className="accLabel">
                  Amount
                </div>
                <div component={"span"} className="accLabelValue">
                  NA
                </div>
              </Grid>
            )}
          </Grid>
          <Stack>
            <Typography className="accLabel">Description</Typography>
            <Typography className="accLabelValue">
              {milestone.description}
            </Typography>
          </Stack>
        </AccordionDetails>
        {children}
      </Accordion>
    </Grid>
  );
};
export default SingleMilestoneAccordion;
