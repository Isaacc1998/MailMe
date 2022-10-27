import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";
import { Box, Button, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CreateNewMailingListModal from "../CreateNewMailingList/CreateNewMailingListModal";
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  const currentUser = useSelector((state) => state.session.user);
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
        <Button onClick={logoutUser}>Logout</Button>
        <div className="top-right-home-container">
          {currentUser && currentUser.username}
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
          <Box sx={{ width: "428px", height: "60px", textAlign: "center" }}>
            <Text fontWeight={700} fontSize="3xl">
              {currentMailingList && currentMailingList.name}
            </Text>
          </Box>
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
