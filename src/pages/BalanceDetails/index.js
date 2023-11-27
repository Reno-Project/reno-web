import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./index.css";
import { Chip, Paper } from "@mui/material";

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
        <TableCell className="values">{row.balance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                      Paid by Homeowner
                    </TableCell>
                    <TableCell className="detailsHeaderValue">
                      Approved by Homeowner
                    </TableCell>
                    <TableCell className="detailsHeaderValue">
                      Released by Reno
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.history.milestoneName}>
                    <TableCell component="th" scope="row">
                      {row.history.milestoneName}
                    </TableCell>
                    <TableCell>{row.history.milestoneAmount}</TableCell>
                    <TableCell>{row.history.isPaid}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.history.isApproved}
                        color={`${
                          row.history.isApproved === "approved"
                            ? "success"
                            : row.history.isApproved === "Pending"
                            ? "warning"
                            : row.history.isApproved === "Declined"
                            ? "error"
                            : ""
                        }`}
                      />
                    </TableCell>
                    <TableCell>{row.history.isReleased}</TableCell>
                  </TableRow>
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

  const onPageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pageContainer">
      <div className="balance">Total Balance = 2607</div>
      <div className="tableHeader">Balance Breakdown</div>
      <div className="tableContainer">
        <Table
          aria-label="collapsible customized table"
          sx={{ maxHeight: 200 }}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className="detailsHeaderValue"> Project ID</TableCell>
              <TableCell className="detailsHeaderValue">
                {" "}
                Project Name
              </TableCell>
              <TableCell className="detailsHeaderValue">
                Current Balance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
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
