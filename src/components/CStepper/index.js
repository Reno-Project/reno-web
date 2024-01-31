import React from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import styled from "@emotion/styled";
import { Done } from "@mui/icons-material";
import "./index.css";

function CStepper(props) {
  const { data, activeStep } = props;

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient( 95deg,#00CD9E 0%,#00CD9E 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient( 95deg,#00CD9E 0%,#00CD9E 100%)",
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
            ? "#00CD9E"
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
          <Typography style={{ color: "#FFF" }}>{icon}</Typography>
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
              <StepLabel StepIconComponent={QontoStepIcon}>
                <p
                  style={{
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {label}
                </p>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
}

export default CStepper;
