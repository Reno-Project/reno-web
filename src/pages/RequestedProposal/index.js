import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Divider,
  CircularProgress,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  Box,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import BlueAbout from "../../components/BlueAbout";
import moment from "moment";
import { isArray, isEmpty } from "lodash";
import { useTheme } from "@mui/styles";
import ImageViewer from "../../components/ImageViewer";
import { color } from "../../config/theme";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import { Add, RemoveRedEye } from "@mui/icons-material";
import Select from "react-select";
import ConversationsWithMessagesWrapper from "../../components/Chat/ConversationsWithMessagesWrapper";
import SingleMilestoneAccordion from "../../components/SingleMilestoneAccordian";
import SingleBudgetAccordion from "../../components/SingleBudgetAccordian";

export default function RequestedProposal() {
  let data = [
    { value: "Mohamed Negm", label: "Mohamed Negm" },
    { value: "Hagar", label: "Hagar" },
    { value: "Yassin", label: "Yassin" },
    { value: "Ali", label: "Ali" },
  ];
  const options = [
    { value: "Mohamed Negm", label: "Mohamed Negm" },
    { value: "Hagar", label: "Hagar" },
    { value: "Yassin", label: "Yassin" },
    { value: "Ali", label: "Ali" },
    { value: "Ibrahim", label: "Ibrahim" },
    { value: "Ahmed", label: "Ahmed" },
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const location = useLocation();
  const [villa, setVilla] = useState(location?.state?.villa);
  const nData = villa?.submitted_by_reno
    ? villa?.reno_data || {}
    : villa?.user_data || {};
  const isSubmitted = location?.state?.status === "submitted";
  const fromManageProject = location?.state?.activeScreen === "/manage-project";
  const [isPressed, setIsPressed] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [assignedContractors, setAssignedContractors] = useState(data);
  const [url, setUrl] = useState("");
  const [imgurl, setImgUrl] = useState("");
  const [openAssign, setOpenAssign] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProjectDetails();
  }, []);

  async function getProjectDetails() {
    setPageLoad(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.getProject}?proposal_id=${villa?.proposal_id}`,
        "GET",
        {}
      );
      if (
        response.success &&
        isArray(response?.data) &&
        !isEmpty(response?.data)
      ) {
        setVilla(response?.data[0]);
      }
      setPageLoad(false);
    } catch (error) {
      console.log("error:===>>>", error);
      setPageLoad(false);
    }
  }
  const handleAddContractor = () => {
    setOpenAssign(true);
  };
  const handleCloseAssign = () => {
    setOpenAssign(false);
  };

  return (
    <div style={{ backgroundColor: "#F9F9FA" }}>
      <Grid
        item
        container
        xs={12}
        sm={9}
        md={9}
        lg={12}
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
          sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {pageLoad ? (
            <div className={classes.dataMain}>
              <CircularProgress style={{ color: color.primary }} />
            </div>
          ) : (
            <>
              <Grid
                item
                container
                wrap={sm ? "wrap" : "nowrap"}
                alignItems={"center"}
                columnGap={2}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={nData?.profile_url}
                    alt="chat"
                    className={classes.imageStyle}
                  />
                  <div className={classes.activeContainer}>
                    <div className={classes.activeStatus}></div>
                  </div>
                </div>
                <Grid item container style={{ width: "100%", margin: 0 }}>
                  <Grid item lg={9} md={9} sm={9} xs={9}>
                    <Typography className={classes.titleText}>
                      {nData?.username}
                    </Typography>
                  </Grid>
                  <Grid item lg={3} md={3} sm={3} xs={3} textAlign={"end"}>
                    <Typography className={classes.requestDate}>
                      {isSubmitted ? "Submitted Date" : "Request Date"}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={9}
                    md={9}
                    sm={6}
                    xs={6}
                    style={{ marginTop: 5 }}
                  >
                    <span
                      variant="contained"
                      style={{
                        backgroundColor: isSubmitted ? "#32D583" : "#E9B55C",
                        padding: "8px",
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        lineHeight: "16px",
                        borderRadius: 4,
                        color: color.white,
                      }}
                    >
                      {isSubmitted ? "Submitted" : "Request"}
                    </span>
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Typography className={classes.dateStyle}>
                      {isSubmitted
                        ? moment(villa?.updatedAt).format("MMMM DD, YYYY")
                        : moment(villa?.createdAt).format("MMMM DD, YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Stack width="100%" gap="16px">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  className={classes.projectInformation}
                  sx={{
                    backgroundColor: "#F3F4F9",
                  }}
                >
                  Project Details
                  <Stack>
                    <Typography className={classes.informationCard}>
                      Total Amount
                    </Typography>
                    <Typography className={classes.value}>
                      AED {villa?.budget || "NA"}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack gap="8px" width="100%">
                  <Stack
                    direction="row"
                    gap="8px"
                    padding="0 12px"
                    width="100%"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Stack>
                      <Typography className={classes.informationCard}>
                        Project Name
                      </Typography>
                      <Typography className={classes.value}>
                        {villa?.name}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography className={classes.informationCard}>
                        Project Type
                      </Typography>
                      <Typography className={classes.value}>
                        {villa?.project_type}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography className={classes.informationCard}>
                        Email
                      </Typography>
                      <Typography className={classes.value}>
                        {villa.customer_email}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography className={classes.informationCard}>
                        Project Dates
                      </Typography>
                      <Typography className={classes.value}>
                        {moment(villa?.start_date).format("MMM DD, YYYY")} -{" "}
                        {moment(villa?.end_date).format("MMM DD, YYYY")}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                  <Stack padding="0 12px">
                    <Stack>
                      <Typography className={classes.informationCard}>
                        Scope of work
                      </Typography>
                      <Typography className={classes.value}>
                        {villa?.scope_of_work}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                  <Stack padding="0 12px">
                    <Stack>
                      <Typography className={classes.informationCard}>
                        Project Description
                      </Typography>
                      <Typography className={classes.value}>
                        {villa?.description}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                  <Stack padding="0 12px">
                    <Typography className={classes.informationCard}>
                      Assigned Contractors
                    </Typography>
                    <Grid item lg={7} sm={12} md={6} xs={12} pt={1} px={1}>
                      {assignedContractors.map((contractor) => (
                        <Chip
                          label={contractor.label}
                          key={contractor.value}
                          style={{ marginRight: 2, padding: "0px 16px" }}
                        />
                      ))}
                      <IconButton onClick={handleAddContractor}>
                        {assignedContractors.length === 5 ? (
                          <RemoveRedEye />
                        ) : (
                          <Add />
                        )}
                      </IconButton>
                    </Grid>
                  </Stack>
                  <Divider />
                </Stack>
              </Stack>
              <Stack gap="12px" width="100%">
                <Stack direction="row" gap="4px" width="100%">
                  <Typography
                    className={classes.projectInformation}
                    padding="8px 16px"
                  >
                    Milestones
                    <span
                      style={{
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px 10px",
                        margin: "0px 8px",
                        backgroundColor: "#E9B55C",
                        borderRadius: 22,
                      }}
                    >
                      {villa?.milestone?.length}
                    </span>
                  </Typography>
                </Stack>
                <Divider />
                <Stack width="100%" gap="8px">
                  {villa?.milestone?.map((milestone, index) => {
                    return (
                      <SingleMilestoneAccordion
                        milestone={milestone}
                        index={index}
                        amounts={[]}
                        amount={milestone?.amount}
                      >
                        <Stack padding="16px" gap="16px" width="100%">
                          {milestone?.budget?.map((budget, index) => {
                            if (budget?.milestone_id === milestone?.id) {
                              return (
                                <>
                                  <SingleBudgetAccordion
                                    budget={budget}
                                    index={index}
                                  />
                                </>
                              );
                            }
                          })}
                        </Stack>
                      </SingleMilestoneAccordion>
                    );
                  })}
                </Stack>
              </Stack>
            </>
          )}
          <Divider />
        </Grid>
      </Grid>
      <Grid
        style={{
          position: "fixed",
          bottom: 200,
          left: "90%",
          display: "flex",
          justifyContent: "end",
          padding: 5,
        }}
      >
        {/* <Fab
          variant="extended"
          color="primary"
          onClick={() => setIsChatStarted(true)}
        >
          <ChatBubbleOutline sx={{ mr: 1 }} />
          Chat
        </Fab> */}
      </Grid>
      <Modal
        open={isChatStarted}
        onClose={() => setIsChatStarted(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <ConversationsWithMessagesWrapper isMobileView={true} />
        </Box>
      </Modal>
      <BlueAbout />
      <ImageViewer
        url={imgurl}
        visible={isPressed}
        isPdf={url}
        onClose={() => {
          setIsPressed(false);
        }}
      />
      <Dialog open={openAssign} onClose={handleCloseAssign}>
        <DialogTitle>Assign Contractors</DialogTitle>
        <DialogContent>
          <Grid container width={450} height={200}>
            <Grid item xs={12} md={12}>
              <Select
                options={options}
                isMulti
                defaultValue={assignedContractors}
                closeMenuOnSelect={false}
                onChange={(e) => setAssignedContractors(e)}
                isOptionDisabled={() => assignedContractors.length == 5}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseAssign}>
            Cancel
          </Button>
          <Button variant="contained">Assign</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
