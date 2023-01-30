import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./NavBar.css";
import {
  Box,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import CreateNewMailingListModal from "../CreateNewMailingList/CreateNewMailingListModal";
import MailMeLogo from "./MailMeLogo";
import SignoutMenu from "./SignoutMenu";

import { Steps } from "intro.js-react";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { useEffect, useState } from "react";
import { getUserMailingLists } from "../../store/mailinglist";
import { useLocation } from "react-router-dom";
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  const currentUser = useSelector((state) => state.session.user);
  const lists = useSelector((state) => state.mailingLists.lists);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState();
  const [searchList, setSearchList] = useState([]);
  const location = useLocation();
  // let header = true;
  // if (location.pathname === "/") {
  //   // header = false;
  // }

  useEffect(() => {
    dispatch(getUserMailingLists());
  }, []);

  useEffect(() => {
    if (searchTerm) {
      let matches = Object.values(lists)
        .filter((list) => {
          let name = list.name.toLowerCase();
          return name.startsWith(searchTerm.toLowerCase());
        })
        .sort((a, b) => {
          return a.name.length - b.name.length;
        })
        .slice(0, 5);
      if (matches.length < 5) {
        let matches2 = Object.values(lists)
          .filter((list) => {
            let name = list.name.toLowerCase().split(" ");
            let contains = false;
            for (let i = 1; i < name.length; i++) {
              if (name[i].startsWith(searchTerm.toLowerCase())) {
                contains = true;
              }
            }
            return contains;
          })
          .sort((a, b) => {
            return a.name.length - b.name.length;
          })
          .slice(0, 5 - matches.length);
        matches = matches.concat(matches2);
      }
      setSearchList(matches);
    } else {
      document.getElementById("search-list").style.display = "none";
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    document.getElementById("search-list").style.display = "block";
  };

  window.onclick = (e) => {
    if (!e.target.matches("search-list")) {
      document.getElementById("search-list").style.display = "none";
    }
  };

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
              sx={{ backgroundColor: "white" }}
              onClick={() => {
                history.go(-1);
              }}
            >
              <ArrowBackIcon fontSize={25} color="lightblue" />
            </Button>
            <Button
              sx={{ backgroundColor: "white" }}
              onClick={() => {
                history.go(1);
              }}
            >
              <ArrowForwardIcon fontSize={25} color="lightblue" />
            </Button>
          </Box>

          <Box sx={{ display: "flex" }} justifyContent="flex-end" mr="60px">
            <div className="search-container">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon w={5} h={5} color="gray.300" />}
                />
                <Input
                  placeholder="Search mailing lists..."
                  width="300px"
                  backgroundColor="white"
                  value={searchTerm}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      return history.push(`/search?q=${e.target.value}`);
                    }
                  }}
                ></Input>
              </InputGroup>
              <div id="search-list">
                {searchList &&
                  searchList.map((list) => {
                    return (
                      <div
                        className="search-term-container"
                        onClick={() => {
                          setSearchTerm(list.name);
                          history.push(`/search?q=${list.name}`);
                        }}
                      >
                        <SearchIcon w={5} h={5} color="gray.300" />
                        <div className="search-term">{list.name}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
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
