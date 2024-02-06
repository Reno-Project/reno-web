import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { isEmpty } from "lodash";
import BlueAbout from "../../components/BlueAbout/index";
import PhoneInput from "react-phone-input-2";
import {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil,
} from "google-libphonenumber";
import "./index.css";
import useStyles from "./styles";

import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import Images from "../../config/images";
import { DeleteOutline } from "@mui/icons-material";
import CInput from "../../components/CInput";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import moment from "moment";
import { toast } from "react-toastify";

const data = [
  {
    id: 1234,
    name: "Yassin Negm",
    phone: "+201094306430",
    email: "seno@gmail.com",
    createdAt: "12 Nov 23",
    assignedProjects: ["Interior Design", "Kitchen"],
  },
];

function Row(props) {
  const errorObj = {
    cnameErr: false,
    cnameMsg: "",
    addErr: false,
    addMsg: "",
    webErr: false,
    webMsg: "",
    yearErr: false,
    yearMsg: "",
    employeeErr: false,
    employeeMsg: "",
    contractErr: false,
    contarctMsg: "",
    expertiseErr: false,
    expertiseMsg: "",
    socialErr: false,
    socialMsg: "",
    linkedInErr: false,
    linkedInMsg: "",
    instaErr: false,
    instaMsg: "",
  };

  const { row, handleDeleteUser } = props;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [errObj, setErrObj] = useState(errorObj);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className="values">{row.id}</TableCell>
        <TableCell className="values">{row.username}</TableCell>
        <TableCell className="values">{row.phone_no}</TableCell>
        <TableCell className="values">{row.email}</TableCell>
        <TableCell className="values">
          {moment(row.createdAt).format("yyyy-MM-DD")}
        </TableCell>
        {/* <TableCell className="values">
          {" "}
          {row.assignedProjects?.map((item) => (
            <Chip label={item} />
          ))}
        </TableCell> */}
        <TableCell className="actions">
          <IconButton onClick={toggleDrawer("right", true)}>
            <img alt="View User" src={Images.eye} />
          </IconButton>
          <SwipeableDrawer
            className="userDetails"
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            <div className="userDetailsHeader">User Details</div>
            <Grid container>
              <Grid item xs={12} id="cname">
                <CInput
                  label="User Name"
                  placeholder="Enter User Name..."
                  value={row.username}
                  disabled={true}
                  error={errObj.cnameErr}
                  helpertext={errObj.cnameMsg}
                  className={"detailsHeaderValue"}
                />
              </Grid>

              <Grid item xs={12} id="email">
                <CInput
                  disabled
                  label="Email"
                  placeholder="Enter Email Here..."
                  className={"detailsHeaderValue"}
                  value={row.email}
                />
              </Grid>

              <Grid item xs={12} id="phone">
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={"detailsHeaderValue"}
                >
                  Phone
                </InputLabel>
                <TextField
                  disabled
                  fullWidth
                  placeholder="Enter phone number"
                  style={{
                    marginBottom: 20,
                  }}
                  value={row.phone_no}
                />
              </Grid>
              {/* <Grid item xs={12} id="assigne">
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={"detailsHeaderValue"}
                >
                  Assigned Projects
                </InputLabel>
                {row.assignedProjects?.map((item) => (
                  <Chip label={item} />
                ))}
              </Grid> */}
            </Grid>
          </SwipeableDrawer>
          <IconButton>
            <DeleteOutline onClick={() => handleDeleteUser(row)} />
          </IconButton>
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
const errorObj = {
  unameErr: false,
  emailErr: false,
  phoneErr: false,
  unameMsg: "",
  emailMsg: "",
  phoneMsg: "",
};

export default function UserManagement() {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const classes = useStyles();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [state, setState] = useState({
    uname: "",
    email: "",
    pCode: "971",
    countryCode: "AE",
    phone: "",
  });

  // const dispatch = useDispatch()
  // const {userData} = useSelector((state) => state.auth);

  const [errObj, setErrObj] = useState(errorObj);
  const [phonePlaceholder, setPhonePlaceholder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userList, setUserList] = useState([]);
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
  const handleClose = () => {
    setState({
      uname: "",
      email: "",
      pCode: "971",
      countryCode: "AE",
      phone: "",
    });
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeleteUser = (row) => {
    setOpenDelete(true);
  };

  function isValidUsername(username) {
    return username.length >= 3 && username.length <= 20;
  }

  async function getUserList() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.createUser}?page=${currentPage}&per_page=${limit}`,
        "GET"
      );
      if (response.success) {
        setUserList(response.data);
        setPagination({
          totalPage: response.total_pages,
          page: response.page,
          limit: response.per_page,
          totalCount: response.total_count,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("error");
    }
  }

  async function createUser(name, phoneNumber, phCode, email) {
    try {
      const response = await getApiData(
        `${Setting.endpoints.createUser}`,
        "POST",
        {
          username: name,
          phone_no: phoneNumber,
          phone_code: phCode,
          email,
        }
      );
      if (response.success) {
        toast.success("User added successfully");
      }
    } catch (error) {
      console.log("error");
    }
    getUserList();
  }

  async function validation() {
    const { uname, email, phone, pCode, countryCode } = state;
    const error = { ...errObj };
    let valid = true;

    // validate name
    if (isEmpty(uname)) {
      valid = false;
      error.unameErr = true;
      error.unameMsg = "Please enter user name";
    } else if (!isValidUsername(uname)) {
      valid = false;
      error.unameErr = true;
      error.unameMsg = "Username must be between 3 to 20 characters in long.";
    }

    // validate email
    if (isEmpty(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please enter email";
    } else if (!emailRegex.test(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please enter valid email";
    }

    // Validate phone
    if (isEmpty(phone)) {
      valid = false;
      error.phoneErr = true;
      error.phoneMsg = "Please enter phone number";
    } else if (!isEmpty(phone) && !isEmpty(countryCode)) {
      const phoneNumber1 = phoneUtil.parse(phone, countryCode);
      const isValid = phoneUtil.isValidNumber(phoneNumber1);
      if (!isValid) {
        valid = false;
        error.phoneErr = true;
        error.phoneMsg = `Please enter valid phone number Ex: ${phonePlaceholder}`;
      }
    }

    setErrObj(error);
    if (valid) {
      await createUser(uname, phone, pCode, email);
      handleClose();
    }
  }

  useEffect(() => {
    getUserList();
  }, [currentPage, limit]);

  return (
    <Stack flex={1}>
      <div className="pageContainer">
        <div className="tableContainer">
          <div className="addUser">
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              className="btn"
              style={{ margin: "10px 0" }}
            >
              Add User
            </Button>
          </div>

          <Table sx={{ maxHeight: 200 }}>
            <TableHead>
              <TableRow>
                <TableCell className="detailsHeaderValue"> ID</TableCell>
                <TableCell className="detailsHeaderValue">Name</TableCell>
                <TableCell className="detailsHeaderValue">Phone</TableCell>
                <TableCell className="detailsHeaderValue">Email</TableCell>
                <TableCell className="detailsHeaderValue">
                  Creation Date
                </TableCell>
                {/* <TableCell className="detailsHeaderValue">
                  Assigned Projects
                </TableCell> */}
                <TableCell className="detailsHeaderValue">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ height: "430px" }}>
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
                  {userList.length > 0 ? (
                    userList.map((row) => (
                      <Row
                        key={row.id}
                        row={row}
                        handleDeleteUser={handleDeleteUser}
                      />
                    ))
                  ) : (
                    <Stack
                      position="absolute"
                      left="50%"
                      top="50%"
                      style={{ transform: "translate(-50%,-50%)" }}
                    >
                      <Typography
                        variant="p"
                        fontFamily="Poppins-Medium"
                        fontSize="24px"
                      >
                        No records to display
                      </Typography>
                    </Stack>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        {userList.length > 0 && (
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="createHeader">Create User</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <CInput
                outline
                label="Full name"
                placeholder="Enter full name"
                value={state.uname}
                onChange={(e) => {
                  setState({ ...state, uname: e.target.value });
                  setErrObj({ ...errObj, unameErr: false, unameMsg: "" });
                }}
                inputProps={{ maxLength: 20 }}
                white={false}
                error={errObj.unameErr}
                helpertext={errObj.unameMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                outline
                label="Email address"
                placeholder="Enter email address"
                value={state.email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                  setErrObj({ ...errObj, emailErr: false, emailMsg: "" });
                }}
                white={false}
                error={errObj.emailErr}
                helpertext={errObj.emailMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Phone number
              </InputLabel>
              <TextField
                fullWidth
                placeholder={
                  state.pCode ? phonePlaceholder : "Enter phone number"
                }
                style={{ marginBottom: 20 }}
                value={state.phone}
                onChange={(e) => {
                  setState({ ...state, phone: e.target.value });
                  setErrObj({ ...errObj, phoneErr: false, phoneMsg: "" });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ marginLeft: "-13px", marginRight: -5 }}
                    >
                      <PhoneInput
                        country={"ae"}
                        value={state.pCode}
                        onChange={(code, country) => {
                          const countryUpperCase =
                            country?.countryCode.toUpperCase();
                          setState({
                            ...state,
                            pCode: code,
                            countryCode: countryUpperCase,
                            phone: "",
                          });
                          const exampleNumber1 =
                            phoneUtil.getExampleNumberForType(
                              country?.countryCode,
                              PhoneNumberType.MOBILE
                            );
                          const formattedExampleNumber1 = phoneUtil.format(
                            exampleNumber1,
                            PhoneNumberFormat.NATIONAL
                          );
                          setPhonePlaceholder(formattedExampleNumber1);
                        }}
                      />
                      <Typography className={classes.countryCodeStyle}>
                        +{state?.pCode}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                className={classes.pickerInput}
                error={errObj.phoneErr}
                helperText={errObj.phoneMsg}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonStyle}
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={validation}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleCloseDelete} open={openDelete}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonStyle}
            variant="outlined"
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCloseDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
