import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";
import { Box, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CreateNewMailingListModal from "../CreateNewMailingList/CreateNewMailingListModal";
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    return history.push("/login");
  };

  return (
    <>
      <div className="navbar-container">
        This is from navBar
        <Button onClick={logoutUser}>Logout</Button>
        <div className="top-right-home-container">
          <Box>
            <Button
              mr={5}
              onClick={() => {
                history.go(-1);
              }}
            >
              <ArrowBackIcon fontSize={25} />
            </Button>
            <Button
              onClick={() => {
                history.go(1);
              }}
            >
              <ArrowForwardIcon fontSize={25} />
            </Button>
          </Box>
          Top Right side container
          <div>Display user email</div>
          <Box>
            {/* <CreateEmailFormModal /> */}
            <CreateNewMailingListModal />
          </Box>
        </div>
      </div>
    </>
  );
}

export default NavBar;
