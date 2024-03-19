import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { isArray } from "lodash";
import { Stack, Button, Divider, Typography } from "@mui/material";
import authActions from "../../../redux/reducers/auth/actions";

import useStyles from "./styles";
import { getAPIProgressData } from "../../../utils/APIHelper";
import { Setting } from "../../../utils/Setting";
import ConfirmModel from "../../../components/ConfirmModel";
import ProfileSuccessModal from "../../../components/ProfileSuccessModal";
import SingleMilestoneAccordion from "../../../components/SingleMilestoneAccordian";
import SingleBudgetAccordion from "../../../components/SingleBudgetAccordian";

const Details = (props) => {
  const {
    handleClick = () => null,
    villa,
    fromManageProject,
    createProposal,
  } = props;

  const { proposalDetails } = useSelector((state) => state.auth);
  const {
    budget_details,
    start_date,
    end_date,
    description,
    milestone_details,
    name,
    project_type,
    scope_of_work,
    email,
  } = proposalDetails;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { setProposalDetails } = authActions;
  const [buttonLoader, setButtonLoader] = useState(false);
  const [amounts, setAmounts] = useState([]);
  const [visibleFinal, setVisibleFinal] = useState(false);
  const [proposalModal, setProposalModal] = useState(false);

  useEffect(() => {
    const newAmounts = [];

    milestone_details?.milestone?.forEach((milestone) => {
      let amount = 0;
      if (
        isArray(budget_details.budgets) &&
        budget_details.budgets.length > 0
      ) {
        budget_details?.budgets?.forEach((bud) => {
          if (bud?.milestone?.id === milestone?.id) {
            let count =
              parseInt(bud?.material_unit_price || 0) *
                parseInt(bud?.qty || 0) +
              parseInt(bud?.manpower_rate || 0) * parseInt(bud?.days || 0);
            amount += count;
          }
        });
      }
      newAmounts.push(amount);
    });
    setAmounts(newAmounts);
  }, [budget_details, milestone_details]);

  async function createproposalApicall(data) {
    setButtonLoader(true);
    try {
      const response = await getAPIProgressData(
        Setting.endpoints.directproposal,
        "POST",
        data,
        true
      );

      if (response.success) {
        setVisibleFinal(false);
        setProposalModal(true);
        dispatch(setProposalDetails({}));
      } else {
        toast.error(response.message);
      }
      setButtonLoader("");
    } catch (error) {
      toast.error(error.toString());
      setButtonLoader("");
    }
  }

  const convertBase64ToImageFile = (base64String, filename) => {
    const arr = base64String?.split(",");
    console.log(arr, ">>>>>>>>>>>>>>>>>>>>>>> arrrererere");
    const mimeType = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const uint8Array = new Uint8Array(n);

    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    const file = new File([uint8Array], filename, { type: mimeType });

    return file;
  };

  const convertPhotoOriginToFiles = (budget) => {
    const photoOriginFiles = budget?.photo_origin?.map(
      (base64String, index) => {
        const filename = `photo_origin_${index + 1}.jpg`;

        return convertBase64ToImageFile(base64String, filename);
      }
    );
    return photoOriginFiles;
  };

  const convertProjectToFiles = () => {
    if (!createProposal) {
      const projectFiles = proposalDetails?.project?.map((item) => item.image);
      return projectFiles;
    } else {
      const projectFiles = proposalDetails?.project?.map(
        (base64String, index) => {
          const filename = `project_image_${index + 1}.jpg`;
          return convertBase64ToImageFile(base64String, filename);
        }
      );

      return projectFiles;
    }
  };

  const handleSubmit = () => {
    const projectFiles = convertProjectToFiles();
    let i = 0;
    const transformedData = {
      email: proposalDetails?.email,
      name: proposalDetails?.name,
      username: proposalDetails?.customer_name || villa?.user_data?.username,
      project_type:
        proposalDetails?.project_type?.project_name || villa?.project_type,
      exp_id: proposalDetails?.project_type.id || villa?.exp_id,
      description: proposalDetails?.description,
      start_date: proposalDetails?.start_date,
      end_date: proposalDetails?.end_date,
      project_image: projectFiles,
      proposal: JSON.stringify({
        scope_of_work: proposalDetails?.scope_of_work,
        milestone_details: proposalDetails?.milestone_details?.milestone?.map(
          (milestone, index) => {
            let mainObj = {
              milestone_name: milestone?.milestone_name,
              description: milestone?.description,
              start_date: milestone?.start_date,
              end_date: milestone?.end_date,
              budget_item: proposalDetails?.budget_details?.budgets
                ?.filter((item) => item?.milestone?.id === milestone?.id)
                .map((item) => {
                  const obj = {
                    name: item?.name,
                    budget_id: i + 1,
                    material_type: item?.material_type,
                    material_unit: item?.material_unit || "",
                    material_unit_price: item?.material_unit_price || "0",
                    qty: item?.qty || "0",
                    manpower_rate: item?.manpower_rate || "0",
                    days: item?.days || "0",
                    specification: item?.specification,
                  };
                  i++;
                  return obj;
                }),
            };

            return mainObj;
          }
        ),
      }),
    };
    proposalDetails?.budget_details?.budgets?.forEach((budget, ind) => {
      const photoOriginFiles = convertPhotoOriginToFiles(budget);
      transformedData[`budget_image_${ind + 1}`] = photoOriginFiles;
    });
    createproposalApicall(transformedData);
  };

  return (
    <Stack width="100%" gap="16px">
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
              <Typography className={classes.value}>{name}</Typography>
            </Stack>
            <Stack>
              <Typography className={classes.informationCard}>
                Project Type
              </Typography>
              <Typography className={classes.value}>
                {project_type?.project_name || villa?.project_type}
              </Typography>
            </Stack>

            <Stack>
              <Typography className={classes.informationCard}>Email</Typography>
              <Typography className={classes.value}>{email || "NA"}</Typography>
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
              <Typography className={classes.value}>{scope_of_work}</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack padding="0 12px">
            <Stack>
              <Typography className={classes.informationCard}>
                Project Description
              </Typography>
              <Typography className={classes.value}>{description}</Typography>
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
              {milestone_details?.milestone?.length}
            </span>
          </Typography>
        </Stack>
        <Divider />
        <Stack width="100%" gap="8px">
          {milestone_details?.milestone?.map((milestone, index) => {
            return (
              <SingleMilestoneAccordion
                milestone={milestone}
                index={index}
                amounts={amounts}
              >
                <Stack
                  padding="16px"
                  gap="16px"
                  divider={<Divider />}
                  width="100%"
                >
                  {budget_details?.budgets?.map((budget, index) => {
                    if (
                      budget.milestone?.milestone_name ===
                      milestone?.milestone_name
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
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Button
            variant="outlined"
            size="large"
            onClick={() => handleClick("back")}
          >
            Previous Step
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" gap="16px">
          <Button
            variant="outlined"
            size="large"
            onClick={() => handleClick("back")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setVisibleFinal(true)}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
      <ConfirmModel
        visible={visibleFinal}
        loader={buttonLoader}
        title={"Submit"}
        handleClose={() => setVisibleFinal(false)}
        confirmation={handleSubmit}
        message={`Are you sure you want to submit proposal?`}
      />
      {proposalModal && (
        <ProfileSuccessModal
          title="Congrats!"
          msg="Proposal successfully submitted!"
          btnTitle="Continue"
          visible={proposalModal}
          navigatePath={fromManageProject ? "/manage-project" : ""}
        />
      )}
    </Stack>
  );
};
export default Details;
