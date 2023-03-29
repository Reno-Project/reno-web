import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Detector } from "react-detect-offline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CreateProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
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
                <Route path={"/create-profile"} element={<CreateProfile />} />
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
