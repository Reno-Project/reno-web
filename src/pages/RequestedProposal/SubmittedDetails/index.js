import { useSelector } from "react-redux";
import moment from "moment";
import { Stack, Divider, Typography, Button } from "@mui/material";
import useStyles from "./styles";
import SingleMilestoneAccordion from "../../../components/SingleMilestoneAccordian";
import SingleBudgetAccordion from "../../../components/SingleBudgetAccordian";
import { useEffect, useState } from "react";
import { getApiData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import { isArray, isEmpty } from "lodash";

const SubmittedDetails = (props) => {
  const { villa, handleClose } = props;
  const classes = useStyles();
  const { proposalDetails } = useSelector((state) => state.auth);
  const { start_date, end_date, budget_details, milestone_details } =
    proposalDetails;
  const [milestones, setMilestones] = useState([]);
  const [budgetLoader, setBudgetLoader] = useState([]);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    setMilestones(
      proposalDetails?.milestone_details?.milestone || villa?.milestone
    );
  }, [proposalDetails?.milestone_details?.milestone, villa?.milestone]);

  useEffect(() => {
    getBudgetList();
  }, []);

  useEffect(() => {
    const newAmounts = [];
    milestones?.forEach((milestone) => {
      let amount = 0;
      budget_details?.budgets?.forEach((bud) => {
        if (
          bud?.milestone_id === milestone?.id ||
          bud?.milestone?.milestone_name === milestone?.milestone_name
        ) {
          console.log("here");
          let count =
            parseInt(bud?.material_unit_price || 0) * parseInt(bud?.qty || 0) +
            parseInt(bud?.manpower_rate || 0) * parseInt(bud?.days || 0);
          amount += count;
        }
      });
      newAmounts.push(amount);
    });
    setAmounts(newAmounts);
  }, [budget_details, milestones]);

  async function getBudgetList() {
    setBudgetLoader(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.budgetList}/${villa?.proposal_id}`,
        "GET"
      );
      if (response.success) {
        if (
          proposalDetails?.budget_details?.previous ||
          (isArray(proposalDetails?.budget_details?.budgets) &&
            !isEmpty(proposalDetails?.budget_details?.budgets))
        ) {
          const updatedBudgets = proposalDetails?.budget_details?.budgets?.map(
            (budget) => {
              const matchingMilestone = milestones.find(
                (milestone) => milestone?.id === budget?.milestone_id
              );
              if (matchingMilestone) {
                return { ...budget, milestone: matchingMilestone };
              }
              return budget;
            }
          );
          setBudgetDetails(updatedBudgets || []);
        } else if (
          !proposalDetails?.budget_details?.previous &&
          isArray(response?.data?.budget) &&
          !isEmpty(response?.data?.budget)
        ) {
          const modifiedArray = response?.data?.budget?.map((item) => ({
            ...item,
            photo_origin: item.photo_origin,
          }));
          setBudgetDetails(modifiedArray);
        } else {
          setBudgetDetails([]);
        }
      }
      setBudgetLoader(false);
    } catch (error) {
      setBudgetLoader(false);
      console.log("err===>", error);
    }
  }

  return (
    <Stack
      width="100%"
      gap="16px"
      height="90%"
      overflow="auto"
      paddingRight="8px"
    >
      <Stack width="100%" gap="16px">
        <Typography
          className={classes.projectInformation}
          sx={{ backgroundColor: "#F3F4F9" }}
        >
          Project Details
        </Typography>
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
              <Typography className={classes.value}>{villa?.name}</Typography>
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
              <Typography className={classes.informationCard}>Email</Typography>
              <Typography className={classes.value}>
                {villa?.customer_email}
              </Typography>
            </Stack>
            <Stack>
              <Typography className={classes.informationCard}>
                Project Dates
              </Typography>
              <Typography className={classes.value}>
                {moment(start_date).format("MMM DD, YYYY")} -{" "}
                {moment(end_date).format("MMM DD, YYYY")}
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
        </Stack>
        <Divider />
      </Stack>
      <Stack gap="12px" width="100%">
        <Stack direction="row" gap="4px" width="100%">
          <Typography className={classes.projectInformation} padding="4px 16px">
            Milestones
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 10px",
                margin: "0px 8px",
                backgroundColor: "#E9B55C",
                fontWeight: "bold",
                borderRadius: 22,
                fontSize: 12,
              }}
            >
              {villa?.milestone?.length}
            </span>
          </Typography>
        </Stack>
        <Divider />
        <Stack width="100%" gap="8px">
          {milestones.map((milestone, index) => {
            return (
              <SingleMilestoneAccordion
                milestone={milestone}
                index={index}
                amounts={amounts}
                amount={milestone?.amount}
              >
                <Stack
                  padding="16px"
                  gap="16px"
                  divider={<Divider />}
                  width="100%"
                >
                  {budgetDetails?.map((budget, index) => {
                    if (
                      budget.milestone?.milestone_name ===
                        milestone?.milestone_name ||
                      budget?.milestone_id === milestone?.id
                    ) {
                      return (
                        <>
                          <SingleBudgetAccordion
                            budget={budget}
                            index={index}
                            key={index}
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
        <Stack alignItems="end">
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default SubmittedDetails;
