import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  return (
    <>
      <div className="navbar-container">This is from navBar</div>
    </>
  );
}

export default NavBar;
