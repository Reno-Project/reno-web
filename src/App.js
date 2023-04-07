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
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import ContractorProfile from "./pages/ContractorProfile";

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
            <Header />
            <div className="MT70">
              <Routes>
                {isLogin ? (
                  <>
                    <Route
                      path={"/create-profile"}
                      element={<CreateProfile />}
                    />
                    <Route path={"/dashboard"} element={<Dashboard />} />
                    <Route
                      path={"/contractor-profile"}
                      element={<ContractorProfile />}
                    />
                    <Route exact path={"/"} element={<HowItWorks />} />
                    <Route
                      path="*"
                      element={
                        <Navigate
                          to={
                            userData?.data?.contractor_data &&
                            userData?.data?.contractor_data
                              ?.profile_completed === "pending"
                              ? "/create-profile"
                              : "/dashboard"
                          }
                        />
                      }
                    />
                  </>
                ) : (
                  <>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/signup"} element={<Signup />} />
                    <Route
                      path={"/reset-password"}
                      element={<ResetPassword />}
                    />
                    <Route path={"/otp-verify"} element={<OtpInput />} />
                    <Route path="*" element={<Navigate to={"/login"} />} />
                  </>
                )}
              </Routes>
            </div>
            <Footer />
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
