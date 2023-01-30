import {
  Box,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Button,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { emptyCurrList } from "../../store/mailinglist";
import { removeMailingList } from "../../store/mailinglist";
import ConfirmMailingListDelete from "./ConfirmMailingListDelete";
import "./HomePage.css";

import { Steps } from "intro.js-react";

import introJs from "intro.js";
import "./CustomIntrojs.css";
import { useState } from "react";

const MailingListSummary = ({ mailingLists }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [firstPost, setFirstPost] = useState();

  useEffect(() => {
    let posts = document.getElementsByClassName("recent-post");
    if (posts[0]) {
      setFirstPost(posts[0].id);
    }
  }, []);
  let intro = introJs();
  intro.setOption("scrollToElement", false);
  intro.onbeforechange(function () {
    if (this._introItems[this._currentStep].preChange) {
      this._introItems[this._currentStep].preChange();
    }
  });
  intro
    .setOptions({
      disableInteraction: true,
      steps: [
        {
          intro: "These are recent posts that were made",
          preChange: function () {
            this.element = document.querySelectorAll(".recent-post")[0];
            this.position = "bottom";
          },
        },
        {
          element: ".list-name",
          intro: "This is the mailing list name",
          position: "bottom",
        },
        {
          element: ".list-number-emails",
          intro: "This is number of emails/subscribers in the mailing list",
          position: "bottom",
        },
        {
          element: ".number-of-emails-sent-out",
          intro: "This is number of emails sent out",
          position: "bottom",
        },
        {
          element: ".delete-list-tutorial",
          intro: "To delete a specific list",
          position: "bottom",
        },
        {
          element: ".create-new-mailing-list",
          intro: "This is to create a new mailing list",
          position: "bottom",
        },
        {
          element: ".search-container",
          intro: "This is to search mailing list",
        },
        {
          element: ".mailing-list-row",
          intro: "Click on a mailing list row to enter",
          position: "bottom",
        },
      ],
    })
    .oncomplete(() => {
      let list = document.getElementsByClassName("mailing-list-row");
      let listId;
      if (list[0]) {
        listId = list[0].id;
        history.push(`/mailingList/${listId}`);
      }
    });

  // useEffect(() => {
  //   if (firstPost) {
  //     if (localStorage.getItem("show") === "true") {
  //       setTimeout(() => {
  //         intro.start();
  //       }, 500);
  //     }
  //     localStorage.setItem("show", false);
  //   }
  // }, [firstPost]);

  setTimeout(() => {
    if (localStorage.getItem("show") === "true") {
      intro.start();
    }
    localStorage.setItem("show", false);
    localStorage.setItem("show2", true);
  }, 1000);
  let postsCountArray = useSelector((state) => state.posts.posts);
  if (!Array.isArray(postsCountArray)) postsCountArray = [postsCountArray];

  useEffect(() => {
    dispatch({
      type: "mailinglist/EMPTY_CURR_LIST",
    });
  }, []);

  return (
    <>
      <Heading m={4} textAlign="left">
        All Mailing Lists
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="yellow">
          <Thead>
            <Tr>
              <Th>Mailing List Name</Th>
              <Th isNumeric># of Emails</Th>
              {location.pathname === "/" ? (
                <Th isNumeric>Emails sent out</Th>
              ) : null}
            </Tr>
          </Thead>
          <Tbody>
            {mailingLists.length > 0 &&
              mailingLists.map((list) => {
                return (
                  <Tr
                    id={`${list._id}`}
                    className="mailing-list-row"
                    onClick={() => {
                      history.push(`/mailingList/${list._id}`);
                    }}
                    _hover={{
                      cursor: "pointer",
                    }}
                    border={
                      location.pathname.includes(list._id)
                        ? "3px solid black"
                        : null
                    }
                  >
                    <Td className="list-name">
                      <Box
                        _hover={{
                          color: "red",
                        }}
                        fontWeight={
                          location.pathname.includes(list._id) ? 700 : 400
                        }
                        fontSize="20px"
                      >
                        {list.name}
                      </Box>
                    </Td>
                    <Td
                      className="list-number-emails"
                      fontWeight={
                        location.pathname.includes(list._id) ? 700 : 400
                      }
                      fontSize="20px"
                      isNumeric
                    >
                      {list.emails.length}
                    </Td>

                    {location.pathname === "/" ? (
                      <Td
                        className="number-of-emails-sent-out"
                        fontWeight={
                          location.pathname.includes(list._id) ? 700 : 400
                        }
                        fontSize="20px"
                        isNumeric
                      >
                        {postsCountArray &&
                          postsCountArray.filter((e) => e.list?._id == list._id)
                            .length}
                      </Td>
                    ) : null}

                    {location.pathname === "/" ? (
                      <Td className="delete-list-tutorial" isNumeric>
                        <ConfirmMailingListDelete list={list} />
                      </Td>
                    ) : null}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
export default MailingListSummary;
