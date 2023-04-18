import React from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import styled from "@emotion/styled";
import { KeyboardArrowDown, Done } from "@mui/icons-material";

function CStepper(props) {
  const { data, activeStep } = props;

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient( 95deg,#274BF1 0%,#F2F4F7 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient( 95deg,#6BBBD8 0%,#6BBBD8 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, icon } = props;

    return (
      <div
        style={{
          height: 35,
          width: 35,
          borderRadius: "50px",
          backgroundColor: completed
            ? "#6BBBD8"
            : active
            ? "#274BF1"
            : "#F2F4F7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!active && !completed ? (
          <Typography>{icon}</Typography>
        ) : completed ? (
          <Done style={{ color: "#FFF" }} />
        ) : (
          <KeyboardArrowDown style={{ color: "#FFF", fontSize: 30 }} />
        )}
      </div>
    );
  }

  return (
    <>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {data.map((label) => {
          return (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
}

export default CStepper;
