import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Detector } from "react-detect-offline";
import HowItWorks from "./pages/HowItWorks";
import "./App.css";

function App() {
  return (
    <Detector
      render={({ online }) => {
        return (
          <Router>
            {/* <Header /> */}
            <div className="MT60">
              <Routes>
                <Route exact path={"/"} element={<HowItWorks />} />
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
