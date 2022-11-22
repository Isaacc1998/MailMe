import { Button } from "@chakra-ui/react";
import introJs from "intro.js";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import HomePage from "../HomePage/HomePage";

import LogoSplashPage from "./LogoSplashPage";

import "./SplashPage.css";
function SplashPage() {
  // const [show, setShow] = useState(false);
  const history = useHistory();
  const handleSkipTutorial = (e) => {
    e.preventDefault();
    // setShow(false);
    localStorage.setItem("show", false);
    setTimeout(() => {
      return history.push("/");
    }, 200);
  };
  const handleTutorial = (e) => {
    e.preventDefault();
    // setShow(true);
    localStorage.setItem("show", true);
    setTimeout(() => {
      return history.push("/");
    }, 200);
  };
  return (
    <>
      <div className="about-page">
        <div className="logo-about">
          <div className="logo-splashpage">
            <LogoSplashPage />
          </div>
          <div className="about">
            MailMe is an easy-to-use, all-in-one, SasS CRM email marketing
            platform. That provides small businessess access to cutting-edge
            email marketing technology
          </div>
        </div>
      </div>
      <div style={{ height: 50 }} />
      <div className="about-page-buttons">
        <button className="skip-tutorial" onClick={handleSkipTutorial}>
          Skip tutorial
        </button>
        <div style={{ width: 55 }}></div>
        <button className="start-tutorial" onClick={handleTutorial}>
          Start tutorial
        </button>
      </div>
    </>
  );
}

export default SplashPage;
