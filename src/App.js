import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Detector } from "react-detect-offline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CreateProfile";
import ResetPassword from "./pages/ResetPassword";
import OtpInput from "./pages/OtpInput";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

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

  return (
    <Detector
      render={({ online }) => {
        return (
          <Router>
            <Header />
            <div className="MT70">
              <Routes>
                <Route exact path={"/"} element={<HowItWorks />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/reset-password"} element={<ResetPassword />} />
                <Route path={"/create-profile"} element={<CreateProfile />} />
                <Route path={"/otp-verify"} element={<OtpInput />} />
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
