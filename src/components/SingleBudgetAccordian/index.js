import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import useStyles from "./styles";
import { color } from "../../config/theme";

const SingleBudgetAccordion = ({ budget, index, handleRowClick }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const handleChangeExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Grid item xs={12} key={index} sx={{ backgroundColor: "#F5F6F8" }}>
      <Accordion
        key={budget?.name}
        onChange={handleChangeExpanded(`panel_${budget?.name}`)}
        style={{ boxShadow: "none", borderRadius: "none" }}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            ".MuiAccordionSummary-content": {
              margin: "8px 0px !important",
              padding: "10px",
            },
          }}
        >
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid
                item
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <Grid>{expanded ? <ExpandMoreIcon /> : <ChevronRight />}</Grid>
                <Grid>
                  <div style={{ width: "128px", height: "128px" }}>
                    {budget?.photo_origin?.[0] ||
                    budget?.buget_image?.[0]?.image ? (
                      <img
                        src={
                          budget?.photo_origin?.[0] ||
                          budget?.buget_image?.[0]?.image
                        }
                        loading="lazy"
                        width="100%"
                        height="100%"
                        alt="budget-item"
                      />
                    ) : (
                      <div
                        style={{
                          width: "128px",
                          height: "128px",
                        }}
                      >
                        <img
                          width="100%"
                          height="100%"
                          src="https://renohome.blob.core.windows.net/reno-cms/e56d3d53-e335-425f-990e-16e6b2bbee1b"
                          alt="placeholder"
                        ></img>
                      </div>
                    )}
                  </div>
                </Grid>
                <Grid
                  item
                  md={8}
                  xs={8}
                  direction={"column"}
                  display={"flex"}
                  style={{ placeSelf: "baseline", gap: "20px" }}
                >
                  <Stack gap="12px">
                    <Stack>
                      <span className="budgetName">{budget?.name}</span>
                    </Stack>
                    <Stack>
                      <span className="disc">{budget?.specification}</span>
                    </Stack>
                  </Stack>
                  <Grid display={"flex"} gap="40px">
                    {budget?.milestone?.start_date && (
                      <Grid
                        display={"flex"}
                        item
                        lg={7}
                        sm={12}
                        md={7}
                        xs={12}
                        direction={"column"}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <div component={"span"} className="accLabel">
                          Payment Date
                        </div>
                        <div component={"span"} className="accLabelValue">
                          {budget?.milestone.start_date}
                        </div>
                      </Grid>
                    )}
                    <Grid
                      display={"flex"}
                      item
                      lg={5}
                      sm={12}
                      md={5}
                      xs={12}
                      direction={"column"}
                    >
                      <div component={"span"} className="accLabel">
                        Amount
                      </div>
                      <div component={"span"} className="accLabelValue">
                        AED{" "}
                        {parseInt(budget?.material_unit_price || 0) *
                          parseInt(budget?.qty || 0) +
                          parseInt(budget?.manpower_rate || 0) *
                            parseInt(budget?.days || 0) || "NA"}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {handleRowClick && (
                <Grid item>
                  <IconButton onClick={(e) => handleRowClick(e, budget, index)}>
                    <MoreVertIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "0px 24px" }}>
          <div className="disc">{budget?.description}</div>

          <Divider style={{ width: "100%", margin: "12px 0" }} />
          <div
            className="responsive-table"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Stack gap="28px" width="25%">
              <Stack
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                }}
              >
                Budget Details
              </Stack>
            </Stack>
            <TableContainer
              style={{ padding: "16px", boxSizing: "border-box" }}
            >
              {budget?.manpower_rate ? (
                <Table className={classes.customtable}>
                  <Typography fontFamily={"Poppins-Regular"} fontSize={18}>
                    Manpower
                  </Typography>
                  <TableBody>
                    <TableRow>
                      <>
                        <TableCell
                          style={{
                            color: color.captionText,
                            fontFamily: "Poppins-Regular !important",
                          }}
                          align="right"
                        >
                          Manpower rate
                        </TableCell>

                        <TableCell
                          style={{
                            color: color.captionText,
                            fontFamily: "Poppins-Regular !important",
                          }}
                          align="right"
                        >
                          Days
                        </TableCell>
                        <TableCell
                          style={{
                            color: color.captionText,
                            fontFamily: "Poppins-Regular !important",
                          }}
                          align="right"
                        >
                          Amount
                        </TableCell>
                      </>
                    </TableRow>
                    <TableRow key={"Manpower"}>
                      <>
                        <TableCell align="right">
                          <Typography fontFamily={"Poppins-Regular"}>
                            {budget?.manpower_rate || "-"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontFamily={"Poppins-Regular"}>
                            {budget?.days || "-"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontFamily={"Poppins-Regular"}>
                            AED{" "}
                            {parseInt(budget?.manpower_rate || 0) *
                              parseInt(budget?.days || 0)}
                          </Typography>
                        </TableCell>
                      </>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                ""
              )}
              {budget?.material_type && budget?.manpower_rate ? (
                <div style={{ width: "100%", padding: "10px 0px 14px 0px" }}>
                  <Divider />
                </div>
              ) : (
                ""
              )}
              {budget?.material_type && (
                <Table className={classes.customtable}>
                  <Typography fontFamily={"Poppins-Regular"} fontSize={18}>
                    Material
                  </Typography>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        align="right"
                        style={{
                          color: color.captionText,
                          fontFamily: "Poppins-Regular !important",
                        }}
                      >
                        Material Type
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: color.captionText,
                          fontFamily: "Poppins-Regular !important",
                        }}
                      >
                        Material Unit
                      </TableCell>
                      <TableCell
                        style={{
                          color: color.captionText,
                          fontFamily: "Poppins-Regular !important",
                        }}
                        align="right"
                      >
                        Unit Price
                      </TableCell>
                      <TableCell
                        style={{
                          color: color.captionText,
                          fontFamily: "Poppins-Regular !important",
                        }}
                        align="right"
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        style={{
                          color: color.captionText,
                          fontFamily: "Poppins-Regular !important",
                        }}
                        align="right"
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                    <TableRow key={"Manpower"}>
                      <TableCell align="right">
                        <Typography fontFamily={"Poppins-Regular"}>
                          {budget?.material_type || "-"}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography fontFamily={"Poppins-Regular"}>
                          {budget?.material_unit || "-"}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography fontFamily={"Poppins-Regular"}>
                          AED {budget?.material_unit_price || "0"}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontFamily={"Poppins-Regular"}>
                          {budget?.qty || "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontFamily={"Poppins-Regular"}>
                          AED{" "}
                          {parseInt(budget?.material_unit_price || 0) *
                            parseInt(budget?.qty || 0)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </div>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default SingleBudgetAccordion;
