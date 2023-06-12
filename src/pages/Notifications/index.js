import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Images from "../../config/images";
import { color } from "../../config/theme";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import { isArray, isEmpty } from "lodash";
import moment from "moment";
import NoData from "../../components/NoData";

export default function Notifications() {
  const [tabValue, setTabValue] = useState(0);
  const [notification, setNotification] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoad, setPageLoad] = useState(true);
  useEffect(() => {
    getProjectDetails(currentPage);
  }, []);
  const now = moment();
  async function getProjectDetails(currentPage) {
    setPageLoad(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.notificationList}?page=${currentPage}`,
        "GET",
        {}
      );
      if (response.success) {
        setNotification(response?.data?.notifications);
        setTotalPages(response?.data?.total_pages);
        // setNotification(response?.data?.notifications);
      }
      setPageLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
      setPageLoad(false);
    }
  }
  const onPageChange = (event, page) => {
    setCurrentPage(page);
    getProjectDetails(page);
  };

  return pageLoad ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress style={{ color: color.primary }} size={40} />
    </div>
  ) : (
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
            {isArray(notification) &&
              !isEmpty(notification) &&
              notification.map((item, index) => {
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
                      <img
                        src={item?.image}
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "48px",
                          objectFit: "unset",
                        }}
                      />
                    </Grid>
                    <Grid item container xs={10.5} alignItems={"center"}>
                      {item?.is_read === 0 ? (
                        <>
                          <div style={{ display: "flex", width: "100%" }}>
                            <Grid item xs={12}>
                              <Typography
                                style={{
                                  fontFamily: "Roobert-Regular",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                }}
                              >
                                {item?.title}
                              </Typography>
                              <Typography
                                style={{
                                  fontFamily: "Roobert-Regular",
                                  fontSize: "14px",
                                }}
                              >
                                {item?.description}
                              </Typography>
                              <Typography
                                style={{
                                  fontFamily: "Roobert-Regular",
                                  color: "#274BF1",
                                }}
                              >
                                {moment(item?.createdAt).calendar(now, {
                                  sameDay: "[Today at]  HH:mm:ss",
                                  lastDay: "[Yesterday at]  HH:mm:ss",
                                  lastWeek: "MMMM D HH:mm:ss",
                                  sameElse: "MMMM D, YYYY HH:mm:ss",
                                })}
                              </Typography>
                            </Grid>
                            <div
                              style={{
                                backgroundColor: "#274BF1",
                                width: "10px",
                                height: "10px",
                                borderRadius: "10px",
                              }}
                            ></div>
                          </div>
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
                        </>
                      ) : (
                        <Grid item xs={12}>
                          <Typography
                            style={{
                              fontFamily: "Roobert-Regular",
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.title}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Roobert-Regular",
                              fontSize: "14px",
                            }}
                          >
                            {item?.description}
                          </Typography>
                          <Typography
                            style={{
                              fontFamily: "Roobert-Regular",
                              color: "#274BF1",
                            }}
                          >
                            {/* {item?.createdAt} // */}

                            {moment(item?.createdAt).calendar(now, {
                              sameDay: "[Today at]  HH:mm:ss",
                              lastDay: "[Yesterday at]  HH:mm:ss",
                              lastWeek: "MMMM D HH:mm:ss",
                              sameElse: "MMMM D, YYYY HH:mm:ss",
                            })}
                          </Typography>
                        </Grid>
                      )}

                      {/* <Grid item xs={12} marginTop={1}>
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
                      </Grid> */}
                    </Grid>
                  </Grid>
                );
              })}
            {isEmpty(notification) && <NoData />}
            {!isEmpty(notification) && (
              <div style={{ padding: "30px 0 10px 20px" }}>
                <Pagination
                  count={Math.ceil(totalPages)}
                  page={currentPage}
                  size="large"
                  hidePrevButton
                  onChange={onPageChange}
                />
              </div>
            )}
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}
