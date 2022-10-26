import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";
import { Button } from "@chakra-ui/react";
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    return history.push("/");
  };

  return (
    <>
      <div className="navbar-container">
        This is from navBar
        <Button onClick={logoutUser}>Logout</Button>
      </div>
    </>
  );
}

export default NavBar;
