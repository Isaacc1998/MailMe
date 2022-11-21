import NavBar from "../NavBar/NavBar";
import "./HomePage.css";
import CreateEmailFormModal from "../CreateEmailForm/CreateEmailFormModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserMailingLists } from "../../store/mailinglist";
import { getPosts } from "../../store/posts";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Route, useHistory, useLocation } from "react-router-dom";
import MailingListSummary from "./MailingListSummary";
import OneMailingList from "./OneMailingList";
import SearchList from "./SearchList";
import CreateNewMailingListModal from "../CreateNewMailingList/CreateNewMailingListModal";
import RecentPosts from "../RecentPosts/RecentPosts";
import introJs from "intro.js";
import "intro.js/introjs.css";
function HomePage({ show }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const mailingLists = useSelector((state) => state.mailingLists.lists);
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  useEffect(() => {
    dispatch(getUserMailingLists());
  }, [dispatch]);
  if (!currentUser) return <div></div>;

  // console.log(location.state.show, "homepage showewooorewrwe");
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="left-home-container">
          {!["/", "/search"].includes(location.pathname) ? (
            <MailingListSummary
              show={localStorage.getItem("show")}
              mailingLists={mailingLists}
            />
          ) : (
            <RecentPosts />
          )}
        </div>
        <div className="right-home-container">
          <div className="bottom-right-home-container">
            {/* <div>Bottom Right side container &nbsp;</div>
            <div>Content of Mailing List</div> */}
            <div className="inner-bottom-right">
              <Route exact path="/">
                <MailingListSummary
                  show={localStorage.getItem("show")}
                  mailingLists={mailingLists}
                />
              </Route>
              <Route path="/mailingList/:_id">
                <OneMailingList />
              </Route>
              <Route path="/search">
                <SearchList />
              </Route>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
