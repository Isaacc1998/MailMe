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
import "intro.js/introjs.css";

const MailingListSummary = ({ mailingLists }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // const steps = [
  //   {
  //     element: ".list-name",
  //     intro: "This is the mailing list name",
  //     position: "bottom",
  //   },
  //   {
  //     element: ".list-number-emails",
  //     intro: "This is number of emails/subscribers in the mailing list",
  //     position: "bottom",
  //   },
  //   {
  //     element: ".number-of-emails-sent-out",
  //     intro: "This is number of emails sent out",
  //     position: "bottom",
  //   },
  //   {
  //     element: ".create-new-mailing-list",
  //     intro: "This is to create a new mailing list",
  //     position: "bottom",
  //   },
  // ];
  // const onExit = () => {
  //   // setEnabled(false);
  //   localStorage.setItem("show", false);
  //   localStorage.setItem("show2", true);
  //   // localStorage.setItem("show3", true);
  // };
  let intro = introJs();
  intro.setOptions({
    steps: [
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
        element: ".create-new-mailing-list",
        intro: "This is to create a new mailing list",
        position: "bottom",
      },
    ],
  });
  setTimeout(() => {
    if (localStorage.getItem("show") === "true") {
      intro.start();
    }
    localStorage.setItem("show", false);
  }, 500);
  let postsCountArray = useSelector((state) => state.posts.posts);
  if (!Array.isArray(postsCountArray)) postsCountArray = [postsCountArray];
  console.log(postsCountArray, "length");
  console.log(location, "location");
  console.log(mailingLists, "this is mailingLists");

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
        <Table variant="striped" colorScheme="teal">
          {/* <TableCaption>Isaac</TableCaption> */}
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
                    <Td>
                      <Box
                        // as={Link}
                        // to={`/mailingList/${list._id}`}
                        className="list-name"
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
                    {/* <Td>10</Td> */}

                    {location.pathname === "/" ? (
                      <Td isNumeric>
                        {/* is numeric makes it text align right */}

                        <ConfirmMailingListDelete list={list} />
                      </Td>
                    ) : null}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      {/* {localStorage.getItem("show") === "true" ? (
        <Steps
          enabled={localStorage.getItem("show")}
          steps={steps}
          initialStep={0}
          onExit={onExit}
        />
      ) : (
        <div></div>
      )} */}
    </>
  );
};
export default MailingListSummary;
