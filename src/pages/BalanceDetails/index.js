import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./index.css";
import { Divider, Stack } from "@mui/material";
import { Setting } from "../../utils/Setting";
import { getApiData } from "../../utils/APIHelper";
import { ChevronRight } from "@mui/icons-material";
import Images from "../../config/images";
import BlueAbout from "../../components/BlueAbout/index";

const data = [
  {
    id: 1234,
    name: "Kitchen Design",
    balance: "607$",
    history: {
      milestoneName: "Downpayment",
      milestoneAmount: "450 $",
      isPaid: "Yes",
      isApproved: "Declined",
      isReleased: "Yes",
    },
  },
  {
    id: 567,
    name: "Bedroom Design",
    balance: "540$",
    history: {
      milestoneName: "Milestone 1",
      milestoneAmount: "375 $",
      isPaid: "NA",
      isApproved: "approved",
      isReleased: "Yes",
    },
  },
  {
    id: 980,
    name: "Kitchen Design",
    balance: "540$",
    history: {
      milestoneName: "Milestone 1",
      milestoneAmount: "375 $",
      isPaid: "NA",
      isApproved: "Pending",
      isReleased: "Yes",
    },
  },
];

function Details(props) {
  const { project } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Stack>
      <Stack
        padding="16px 0"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" alignItems="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <ChevronRight />}
          </IconButton>
          <div style={{ width: "24px", height: "24px", marginRight: "8px" }}>
            <img src={Images.file} alt="file"></img>
          </div>
          <Typography fontSize="18px" fontFamily="Poppins-Medium">
            {project.project_type}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" gap="64px">
          <span>
            <Typography
              fontSize="14px"
              fontFamily="Poppins-Medium"
              color="#878F9C"
            >
              Project ID
            </Typography>
            <Typography
              fontSize="16px"
              fontFamily="Poppins-Medium"
              color="#202929"
            >
              {project.id}
            </Typography>
          </span>
          <span>
            <Typography
              fontSize="14px"
              fontFamily="Poppins-Medium"
              color="#878F9C"
            >
              Project Dates
            </Typography>
            <Typography
              fontSize="16px"
              fontFamily="Poppins-Medium"
              color="#202929"
            >
              {project.start_date || "NA"} - {project.end_date || "NA"}
            </Typography>
          </span>
          <span>
            <Typography
              fontSize="14px"
              fontFamily="Poppins-Medium"
              color="#878F9C"
            >
              Current Balance
            </Typography>
            <Typography
              fontSize="16px"
              fontFamily="Poppins-Medium"
              color="#202929"
            >
              AED {project.project_balance}
            </Typography>
          </span>
        </Stack>
      </Stack>
      <Divider />

      <Stack>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: "24px" }}>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow
                  style={{
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    backgroundColor: "#F9FBFF",
                    height: "56px",
                  }}
                >
                  <TableCell className="detailsValue">Milestone Name</TableCell>
                  <TableCell className="detailsValue">
                    Milestone Amount
                  </TableCell>
                  <TableCell className="detailsValue">
                    Paid by Homeowner
                  </TableCell>
                  <TableCell className="detailsValue">
                    Approved by Homeowner
                  </TableCell>

                  <TableCell className="detailsValue">
                    Released by Reno
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {project.project_milestones?.map((milestone) => (
                  <TableRow
                    key={milestone.id}
                    style={{
                      borderBottom: "unset !important",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="milestone-value"
                    >
                      {milestone.milestone_name}
                    </TableCell>
                    <TableCell className="milestone-value">
                      AED {milestone.amount}
                    </TableCell>
                    <TableCell className="milestone-value">
                      {milestone.status.is_paid_by_homeowner === "yes" ||
                      milestone.status.is_paid_by_homeowner === "Yes" ? (
                        <p
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            color: "#006557",
                            backgroundColor: "#CCEEE9",
                            borderRadius: "8px",
                          }}
                        >
                          Yes
                        </p>
                      ) : (
                        <p
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            color: "#664F27",
                            backgroundColor: "#FFF3DF",
                            borderRadius: "8px",
                          }}
                        >
                          Pending Payment
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="milestone-value">
                      {milestone.status.is_approved_by_homwowner === "yes" ||
                      milestone.status.is_approved_by_homwowner === "Yes" ? (
                        <p
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            color: "#006557",
                            backgroundColor: "CCEEE9",
                            borderRadius: "8px",
                          }}
                        >
                          Yes
                        </p>
                      ) : (
                        <p
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            color: "#664F27",
                            backgroundColor: "#FFF3DF",
                            borderRadius: "8px",
                          }}
                        >
                          Pending Approval
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="milestone-value">
                      {milestone.status.is_release_by_reno === "yes" ||
                      milestone.status.is_release_by_reno === "Yes" ? (
                        <p
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            color: "#006557",
                            backgroundColor: "CCEEE9",
                            borderRadius: "8px",
                          }}
                        >
                          Yes
                        </p>
                      ) : (
                        <p
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            color: "#664F27",
                            backgroundColor: "#FFF3DF",
                            borderRadius: "8px",
                          }}
                        >
                          Pending Release
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </Stack>
    </Stack>
  );
}

Details.propTypes = {
  project: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function BalanceDetails() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    getBalanceBreakdown();
  }, []);

  async function getBalanceBreakdown() {
    try {
      const response = await getApiData(
        Setting.endpoints.balanceBreakdown,
        "GET",
        {}
      );
      if (response.success) {
        setTotalBalance(response.data?.totalBalance);
        setProjectDetails(response.data?.projectDetails);
      }
    } catch (error) {
      console.log("🚀 error:", error);
    }
  }

  return (
    <Stack>
      <div className="pageContainer">
        <Typography className="tableHeader">Balance Breakdown</Typography>
        <Stack className="tableContainer">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="total-balance"
            bgcolor="#F3F4F9"
            padding="16px"
          >
            <Typography fontSize="16px" fontFamily="Poppins-Medium">
              Total Balance{" "}
            </Typography>
            <Typography fontSize="24px" fontFamily="Poppins-SemiBold">
              AED {totalBalance}
            </Typography>
          </Stack>
          <Stack>
            {projectDetails?.map((project) => (
              <Details key={project.id} project={project} />
            ))}
          </Stack>
        </Stack>
      </div>
      <BlueAbout />
    </Stack>
  );
}
