import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Detector } from "react-detect-offline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";
import { useSelector } from "react-redux";
import { isEmpty, isObject } from "lodash";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CreateProfile";
import ResetPassword from "./pages/ResetPassword";
import OtpInput from "./pages/OtpInput";
import PhoneVerify from "./pages/PhoneVerify";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotificationPopup from "./components/NotificationPopUp";
import "./App.css";
import ContractorProfile from "./pages/ContractorProfile";
import AccountSettings from "./pages/AccountSettings";
import { Box, Grid } from "@mui/material";
import Notifications from "./pages/Notifications";
import RequestedProposal from "./pages/RequestedProposal";
import Summary from "./pages/Proposal/Summary";
import OnGoing from "./pages/OnGoing/Summary";
import ProjectDetail from "./pages/ProjectDetail";
import ManageProject from "./pages/ManageProject";
import ChatScreen from "./pages/ChatScreen";
import Billing from "./pages/Billing";
import BalanceDetails from "./pages/BalanceDetails";

const firebaseConfig = {
  apiKey: "AIzaSyDeJrr2C4h4tIh7Hj0L4-qa1QwRBTfyHXM",
  authDomain: "reno-home.firebaseapp.com",
  projectId: "reno-home",
  storageBucket: "reno-home.appspot.com",
  messagingSenderId: "271291217173",
  appId: "1:271291217173:web:7a4260dcb3527e5869651c",
  measurementId: "G-FL6WQC501W",
};

function App() {
  initializeApp(firebaseConfig);
  const { userData } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (isObject(userData) && !isEmpty(userData)) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userData]);

  return (
    <Detector
      render={({ online }) => {
        return (
          <Router>
            <div
              style={{
                display: "flex",
                height: "100vh",
                boxSizing: "border-box",
                flexDirection: "column",
              }}
            >
              <Header />
              <div className="MT70">
                <Routes>
                  {isLogin ? (
                    <>
                      <Route path={"/otp-verify"} element={<OtpInput />} />
                      <Route
                        path={"/create-profile"}
                        element={<CreateProfile />}
                      />
                      <Route path={"/dashboard"} element={<Dashboard />} />
                      <Route
                        path={"/contractor-profile"}
                        element={<ContractorProfile />}
                      />
                      <Route
                        path={"/account-setting"}
                        element={<AccountSettings />}
                      />
                      <Route
                        path={"/notifications"}
                        element={<Notifications />}
                      />
                      <Route path={"/billing"} element={<Billing />} />
                      <Route path={"/create-proposal"} element={<Summary />} />
                      <Route path={"/ongoing-project"} element={<OnGoing />} />
                      <Route
                        path={"/request-proposal"}
                        element={<RequestedProposal />}
                      />
                      <Route
                        path={"/manage-project"}
                        element={<ManageProject />}
                      />
                      <Route path={"/chat"} element={<ChatScreen />} />
                      <Route
                        path={"/balance-breakdown"}
                        element={<BalanceDetails />}
                      />
                      <Route
                        path="*"
                        element={
                          <Navigate
                            to={
                              userData?.contractor_data &&
                              userData?.contractor_data?.profile_completed ===
                                "pending"
                                ? "/create-profile"
                                : "/dashboard"
                            }
                          />
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Route
                        exact
                        path={"/how-it-works"}
                        element={<HowItWorks />}
                      />
                      <Route path={"/login"} element={<Login />} />
                      <Route path={"/signup"} element={<Signup />} />
                      <Route
                        path={"/reset-password"}
                        element={<ResetPassword />}
                      />
                      <Route path={"/otp-verify"} element={<OtpInput />} />
                      <Route path={"/phone-verify"} element={<PhoneVerify />} />
                      <Route path="*" element={<Navigate to={"/login"} />} />
                    </>
                  )}
                  <Route
                    path={"/project/project-details/:id"}
                    element={<ProjectDetail />}
                  />
                </Routes>
              </div>
              <Footer />
              <NotificationPopup />
            </div>
            <ToastContainer
              autoClose={3000}
              pauseOnFocusLoss={false}
              toastClassName="toastStyle"
            />
          </Router>
        );
      }}
    />
  );
}

export default App;
