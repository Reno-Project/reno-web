import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Detector } from "react-detect-offline";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Header from "./components/Header";
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
                <Route exact path={"/login"} element={<Login />} />
              </Routes>
            </div>
            {/* <Footer /> */}
          </Router>
        );
      }}
    />
  );
}

export default App;
