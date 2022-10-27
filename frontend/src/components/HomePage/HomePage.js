import NavBar from "../NavBar/NavBar";
import "./HomePage.css";
import CreateEmailFormModal from "../CreateEmailForm/CreateEmailFormModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserMailingLists } from "../../store/mailinglist";
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
import { Link, Route, useHistory } from "react-router-dom";
import MailingListSummary from "./MailingListSummary";
import OneMailingList from "./OneMailingList";
import CreateNewMailingListModal from "../CreateNewMailingList/CreateNewMailingListModal";
function HomePage() {
  const dispatch = useDispatch();
  const mailingLists = useSelector((state) => state.mailingLists.lists);
  useEffect(() => {
    dispatch(getUserMailingLists());
  }, [dispatch]);
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="left-home-container">
          Left side container
          <p>Mailing List goes here</p>
        </div>
        <div className="right-home-container">
          <div className="bottom-right-home-container">
            {/* <div>Bottom Right side container &nbsp;</div>
            <div>Content of Mailing List</div> */}
            <div className="inner-bottom-right">
              <Route exact path="/">
                <MailingListSummary mailingLists={mailingLists} />
              </Route>
              <Route path="/mailingList/:_id">
                <OneMailingList />
              </Route>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
