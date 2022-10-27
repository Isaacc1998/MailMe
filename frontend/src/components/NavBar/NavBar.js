import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";
import { Box, Button, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CreateNewMailingListModal from "../CreateNewMailingList/CreateNewMailingListModal";
import MailMeLogo from "./MailMeLogo";
import SignoutMenu from "./SignoutMenu";
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <div className="navbar-container">
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box ml="auto" pr="70px" mt={5}>
            <SignoutMenu />
          </Box>
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
          <Box sx={{ width: "428px", height: "60px", textAlign: "center" }}>
            <Text fontWeight={700} fontSize="3xl">
              {/* {currentMailingList && currentMailingList.name} */}
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
