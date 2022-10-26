import { Link } from "react-router-dom";
import LoginForm from "../SessionForms/LoginForm";
import SignupFormModal from "../SessionForms/SignupFormModal";
import "./Splash.css";
function Splash() {
  return (
    <>
      <div className="container">
        <div className="top-container">
          <div className="top-container-left">Logo Here</div>
          <div className="top-container-right">
            <LoginForm />
          </div>
        </div>
        <div className="bottom-container">
          <div className="bottom-container-left">DEMO VIDEO HERE</div>
          <div className="bottom-container-right">
            <SignupFormModal />
          </div>
        </div>
        <footer>Copyright &copy; 2022 MailMe</footer>
      </div>
    </>
  );
}

export default Splash;
