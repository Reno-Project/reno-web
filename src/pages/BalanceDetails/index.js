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
import {
  CircularProgress,
  Divider,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import { Setting } from "../../utils/Setting";
import { getApiData } from "../../utils/APIHelper";
import { ChevronRight } from "@mui/icons-material";
import Images from "../../config/images";
import BlueAbout from "../../components/BlueAbout/index";
import moment from "moment";

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

const Status = ({ status }) => {
  return (
    <p
      style={{
        display: "inline-block",
        padding: "10px 16px",
        borderRadius: "8px",
        fontFamily: "Poppins-Medium",
        backgroundColor:
          status === "pending"
            ? "#FFF3DF"
            : status === "ongoing"
            ? "#007AFF"
            : status === "completed"
            ? "#CCEEE9"
            : "#F1C40F",
      }}
    >
      {status}
    </p>
  );
};

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
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <Stack direction="row" alignItems="center">
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowDownIcon /> : <ChevronRight />}
          </IconButton>
          <div style={{ width: "24px", height: "24px", marginRight: "8px" }}>
            <img src={Images.file} alt="file"></img>
          </div>
          <Typography fontSize="18px" fontFamily="Poppins-Medium">
            {project.name}
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
              {project.project_id}
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
              {project.start_date === "undefined" ||
              project.start_date === null ? (
                <span>NA</span>
              ) : (
                <span>
                  {moment(project.start_date).format("MMMM DD, yyyy")}-
                  {moment(project.end_date).format("MMMM DD, yyyy")}
                </span>
              )}
            </Typography>
          </span>
          <span>
            <Typography
              fontSize="14px"
              fontFamily="Poppins-Medium"
              color="#878F9C"
            >
              Reno Commission
            </Typography>
            <Typography
              fontSize="16px"
              fontFamily="Poppins-Medium"
              color="#202929"
            >
              AED {project.reno_revenue || "NA"}
            </Typography>
          </span>
          <span>
            <Typography
              fontSize="14px"
              fontFamily="Poppins-Medium"
              color="#878F9C"
            >
              Total Project Value
            </Typography>
            <Typography
              fontSize="16px"
              fontFamily="Poppins-Medium"
              color="#202929"
            >
              AED {project.project_value_without_commission || "NA"}
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
              AED {(project.project_balance || 0).toFixed(2)}
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
                  <TableCell className="detailsValue">Milestone Id</TableCell>

                  <TableCell className="detailsValue">Milestone Name</TableCell>
                  <TableCell className="detailsValue">
                    Milestone Amount
                  </TableCell>
                  <TableCell className="detailsValue">
                    Milestone Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {project.milestones?.map((milestone) => (
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
                      {milestone.milestone_id}
                    </TableCell>
                    <TableCell className="milestone-value">
                      {milestone.milestone_name}
                    </TableCell>
                    <TableCell className="milestone-value">
                      AED {milestone.milestone_value.toFixed(1)}
                    </TableCell>
                    <TableCell className="milestone-value">
                      {milestone.milestone_status ? (
                        <Status status={milestone.milestone_status} />
                      ) : (
                        "NA"
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
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    totalPage: 0,
    page: 1,
    limit: 10,
    totalCount: 0,
  });

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  const onPageChange = (event, page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  useEffect(() => {
    getBalanceBreakdown();
  }, [currentPage, limit]);

  async function getBalanceBreakdown() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.balanceBreakdown}?page=${currentPage}&per_page=${limit}`,
        "GET",
        {}
      );
      if (response.success) {
        setProjectDetails(response.data.projects);
        setTotalBalance(response.data.balance);
        setPagination({
          totalPage: response.total_pages,
          page: response.page,
          limit: response.per_page,
          totalCount: response.total_count,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀 error:", error);
    }
  }

  return (
    <Stack flex={1}>
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
          <Stack flex={1} position="relative">
            {loading ? (
              <CircularProgress
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              />
            ) : (
              <>
                {projectDetails?.length > 0 ? (
                  projectDetails?.map((project) => (
                    <Details key={project.id} project={project} />
                  ))
                ) : (
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    flex={1}
                    border="1px dashed #B1B1B1"
                  >
                    <Typography fontFamily="Poppins-Medium" fontSize="16px">
                      No records to display
                    </Typography>
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </Stack>
        {projectDetails?.length > 0 && (
          <div
            style={{
              display: "flex",
              padding: "20px",
              position: "sticky",
              bottom: 0,
              backgroundColor: "white",
            }}
          >
            <Stack direction="row" alignItems="center" gap="8px">
              <InputLabel>Items per page</InputLabel>
              <Select
                value={limit}
                onChange={handleLimit}
                style={{ fontFamily: "Poppins-Medium", color: "#000" }}
              >
                <MenuItem value={10} style={{ fontFamily: "Poppins-Regular" }}>
                  10
                </MenuItem>
                <MenuItem value={20} style={{ fontFamily: "Poppins-Regular" }}>
                  20
                </MenuItem>
                <MenuItem value={25} style={{ fontFamily: "Poppins-Regular" }}>
                  25
                </MenuItem>
                <MenuItem value={40} style={{ fontFamily: "Poppins-Regular" }}>
                  40
                </MenuItem>
              </Select>
            </Stack>
            <Pagination
              count={pagination.totalPage}
              page={currentPage}
              size="large"
              onChange={onPageChange}
            />
          </div>
        )}
      </div>
      <BlueAbout />
    </Stack>
  );
}
