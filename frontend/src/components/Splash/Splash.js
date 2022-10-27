import { Link } from "react-router-dom";
import LoginForm from "../SessionForms/LoginForm";
import SignupFormModal from "../SessionForms/SignupFormModal";
import { Image } from "@chakra-ui/react";
import Logo from "./Logo";
import "./Splash.css";

function Splash() {
  return (
    <>
      <div className="container">
        <div className="top-container">
          <div className="top-container-left">
            <Logo />
          </div>
          <div className="RIGHT">
            <div className="top-container-right">
              <LoginForm />
            </div>
            <div style={{ height: 15 }}></div>
            <div className="splash-signup">
              <SignupFormModal />
            </div>
          </div>
        </div>
        {/* <div className="bottom-container">
          <div className="bottom-container-left">DEMO VIDEO HERE</div>
          <div className="bottom-container-right"></div>
        </div> */}
        <footer>Copyright &copy; 2022 MailMe</footer>
      </div>
    </>
  );
}

export default Splash;
