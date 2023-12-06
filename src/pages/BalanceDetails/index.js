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
import Pagination from "@mui/material/Pagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./index.css";
import { Chip } from "@mui/material";
import { Setting } from "../../utils/Setting";
import { getApiData } from "../../utils/APIHelper";

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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset !important" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="values">
          {row.id}
        </TableCell>
        <TableCell className="values">{row.name}</TableCell>
        <TableCell className="values">{row.project_type}</TableCell>
        <TableCell className="values">{row.status}</TableCell>
        <TableCell className="values">{row.project_balance}</TableCell>
        <TableCell className="values">{row.start_date}</TableCell>
        <TableCell className="values">{row.end_date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography className="detailsTitle" gutterBottom component="div">
                Balance Breakdown
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="detailsHeaderValue">
                      Milestone Name
                    </TableCell>
                    <TableCell className="detailsHeaderValue">
                      Milestone Amount
                    </TableCell>
                    <TableCell className="detailsHeaderValue">
                      Approved by Homeowner
                    </TableCell>
                    <TableCell className="detailsHeaderValue">
                      Paid by Homeowner
                    </TableCell>

                    <TableCell className="detailsHeaderValue">
                      Released by Reno
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.project_milestones?.map((milestone) => (
                    <TableRow
                      key={milestone.id}
                      style={{ borderBottom: "unset !important" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ borderBottom: "none" }}
                      >
                        {milestone.milestone_name}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        {milestone.amount}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        {milestone.status.is_approved_by_homeowner}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        {milestone.status.is_paid_by_homeowner}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        {milestone.status.is_release_by_reno}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const onPageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pageContainer">
      <div className="balance">Total Balance = {totalBalance}</div>
      <div className="tableHeader">Balance Breakdown</div>
      <div className="tableContainer">
        <Table
          aria-label="collapsible customized table"
          sx={{ maxHeight: 200 }}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className="detailsHeaderValue"> ID</TableCell>
              <TableCell className="detailsHeaderValue"> Name</TableCell>
              <TableCell className="detailsHeaderValue">Type</TableCell>
              <TableCell className="detailsHeaderValue">Status</TableCell>
              <TableCell className="detailsHeaderValue">Balance</TableCell>
              <TableCell className="detailsHeaderValue">Start Date</TableCell>
              <TableCell className="detailsHeaderValue">End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectDetails?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
        <div style={{ padding: "30px 0 10px 20px" }}>
          <Pagination
            count={Math.ceil(totalPages)}
            page={currentPage}
            size="large"
            hidePrevButton
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
