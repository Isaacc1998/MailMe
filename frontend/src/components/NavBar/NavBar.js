import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";
import { Box, Button, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CreateNewMailingListModal from "../CreateNewMailingList/CreateNewMailingListModal";
import MailMeLogo from "./MailMeLogo";
import SignoutMenu from "./SignoutMenu";

import { Steps } from "intro.js-react";
import introJs from "intro.js";
import "intro.js/introjs.css";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  // const steps = [
  //   {
  //     element: ".create-new-mailing-list",
  //     intro: "This is to create a new mailing list",
  //     position: "bottom",
  //   },
  // ];
  // const onExit = () => {
  //   localStorage.setItem("show3", false);
  //   localStorage.setItem("show2", true);
  // };

  return (
    <>
      <div className="navbar-container">
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box ml="auto" pr="70px" mt={5} mr="0px"></Box>
        </Box>
        <div className="top-right-home-container">
          <Link to="/">
            <MailMeLogo />
          </Link>
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

          <Box sx={{ display: "flex" }} justifyContent="flex-end" mr="60px">
            {/* <CreateEmailFormModal /> */}
            <div className="create-new-mailing-list">
              <CreateNewMailingListModal />
            </div>
            <SignoutMenu />
          </Box>
        </div>
      </div>
      {/* {localStorage.getItem("show3") === "true" ? (
        <Steps enabled={true} steps={steps} initialStep={0} onExit={onExit} />
      ) : (
        <div></div>
      )} */}
    </>
  );
}

export default NavBar;
