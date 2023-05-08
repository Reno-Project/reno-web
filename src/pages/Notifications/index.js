import { Button, Grid, Pagination, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import Images from "../../config/images";
import { color } from "../../config/theme";

export default function Notifications() {
  const [tabValue, setTabValue] = useState(0);

  const dataArr = [
    {
      id: 0,
      img: Images.profile,
      label: "Mike White are send message",
      time: "Yesterday at 7:30 AM",
    },
    {
      id: 1,
      img: Images.profile,
      label: "Jacob Jones are completed the project",
      time: "Yesterday at 7:30 AM",
    },
    {
      id: 2,
      img: Images.profile,
      label: "Albert Flores are accept payment request",
      time: "Yesterday at 7:30 AM",
    },
    {
      id: 3,
      img: Images.profile,
      label: "Esther Howard are send new project request",
      time: "Yesterday at 7:30 AM",
    },
    {
      id: 4,
      img: Images.profile,
      label: "Mike White are send message",
      time: "Yesterday at 7:30 AM",
    },
    {
      id: 5,
      img: Images.profile,
      label: "Eleanor Pena are approved new request request",
      time: "Yesterday at 7:30 AM",
    },
  ];

  return (
    <Grid container xs={12} sm={9} md={8} lg={6} paddingBottom={20}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          style={{
            lineHeight: 4,
            fontFamily: "ElMessiri-semiBold",
            fontSize: "28px",
          }}
        >
          Notifications
        </Typography>
      </Grid>

      <Grid item container border="1px solid #F2F4F7" padding={"20px"}>
        <Grid item xs={12} style={{ borderBottom: "1px solid #F2F3F4" }}>
          <Tabs
            value={tabValue}
            onChange={(v, b) => {
              setTabValue(b);
            }}
            variant="scrollable"
          >
            <Tab label="All" />
            <Tab label="Read" />
            <Tab label="Unread" />
          </Tabs>
        </Grid>
        {tabValue === 0 ? (
          <Grid container>
            {dataArr.map((item, index) => {
              return (
                <Grid
                  item
                  container
                  wrap="nowrap"
                  gap={2}
                  padding={"20px 0"}
                  borderBottom={"1px solid #E8E8E8"}
                >
                  <Grid
                    item
                    container
                    xs={1.5}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <img src={item?.img} width={"60px"} />
                  </Grid>
                  <Grid item container xs={10.5} alignItems={"center"}>
                    <Grid item xs={12}>
                      <Typography style={{ fontFamily: "Roobert-Regular" }}>
                        {item?.label}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Roobert-Regular",
                          color: "#274BF1",
                        }}
                      >
                        {item?.time}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} marginTop={1}>
                      <Button
                        variant="contained"
                        style={{
                          width: 100,
                          borderRadius: 7,
                          marginRight: 10,
                          padding: 3,
                        }}
                      >
                        Chat now
                      </Button>
                      <Button
                        variant="outlined"
                        style={{
                          width: 100,
                          borderRadius: 7,
                          padding: 3,
                          border: "none",
                          backgroundColor: "#F5F6F8",
                        }}
                      >
                        Decline
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            <div style={{ padding: "30px 0 10px 20px" }}>
              <Pagination count={4} size="large" hidePrevButton />
            </div>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}
