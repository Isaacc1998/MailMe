import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getMailingList, getUserMailingLists } from "../../store/mailinglist";
import { removeEmail } from "../../store/mailinglist";
import {
  Box,
  Button,
  Heading,
  Input,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CreateEmailFormModal from "../CreateEmailForm/CreateEmailFormModal";
import AddEmailToList from "../AddEmailToList/AddEmailToList";
import EditNameModal from "./EditName";
import "./HomePage.css";
import { Steps } from "intro.js-react";
import introJs from "intro.js";

import "intro.js/introjs.css";

const OneMailingList = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState();
  const dispatch = useDispatch();
  const { _id } = useParams();
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  const steps = [
    {
      element: ".step-one",
      intro: "These are emails inside the mailing list",
    },
    {
      element: ".two",
      intro: "This is to delete an email subscribed to the mailing list",
      position: "bottom",
    },
    {
      element: ".three",
      intro: "This is to add subscriber to this mailing list",
      position: "bottom",
    },
    {
      element: ".four",
      intro: "This is to create and send a mail ",
      position: "bottom",
    },
    {
      element: ".five",
      intro:
        "Copy this link and send it to any subscriber so that the subscriber can add themselves to the mailing list",
      position: "bottom",
    },
  ];
  const onExit = () => {
    localStorage.setItem("show2", false);
  };
  // localStorage.setItem("show3", true);
  // if (localStorage.getItem("show2") === "false") {
  //   localStorage.setItem("show3", false);
  // }
  useEffect(() => {
    // if (
    //   // localStorage.getItem("show2") === "true" &&
    //   localStorage.getItem("show3") === "true"
    // ) {
    //   introJs()
    //     .setOptions({
    //       steps: [
    //         {
    //           element: document.querySelector(".step-one"),
    //           intro: "This is Emails inside the mailing list",
    //         },
    //         {
    //           element: document.querySelector(".two"),
    //           intro: "This is the the delete button",
    //           position: "bottom",
    //         },
    //         {
    //           element: document.querySelector(".three"),
    //           intro: "This is to add subscribers to this mailing list",
    //           position: "bottom",
    //         },
    //         {
    //           element: document.querySelector(".four"),
    //           intro: "This is to create an email form",
    //           position: "bottom",
    //         },
    //         {
    //           element: document.querySelector(".five"),
    //           intro:
    //             "Copy this link and send it to any subscriber so that the subscriber can add themselves to the mailing list",
    //           position: "bottom",
    //         },
    //       ],
    //     })
    //     .start();
    // localStorage.setItem("show2", false);
    // }
    if (_id)
      dispatch(getMailingList(_id)).then(() => {
        setLoading(false);
      });
  }, [dispatch, _id]);

  if (loading || !currentMailingList) return <div></div>;
  return (
    <div className="step-one">
      <Heading fontSize={30} m={5} textAlign="left">
        List of subscribers for "
        <Text sx={{ display: "inline", fontWeight: 700 }} color="red">
          {currentMailingList.name}
        </Text>
        "
        <EditNameModal
          id={currentMailingList._id}
          oldName={currentMailingList.name}
        />
      </Heading>
      <TableContainer mb="50px">
        <Table variant="striped" colorScheme="teal">
          {/* <TableCaption>{currentMailingList.name}</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Email Name</Th>
              {/* <Th># of Emails</Th>
              <Th>Emails sent out</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {currentMailingList &&
              currentMailingList.emails.map((mail) => {
                return (
                  <Tr>
                    <Td fontSize="20px">{mail}</Td>
                    <Td isNumeric>
                      <Box
                        as={Button}
                        colorScheme="red"
                        className="two"
                        onClick={() => {
                          console.log("deletin");
                          console.log(mail, "thisss");
                          console.log(mail.replace("\n", ""), "thisss");
                          return dispatch(
                            removeEmail({
                              mailingListId: currentMailingList._id,
                              email: mail.replace("\n", ""),
                            })
                          ).then(() => {
                            // setEmails(currentMailingList.emails);

                            toast({
                              title: `Email ${mail} has been deleted.`,
                              position: "bottom",

                              status: "error",
                              duration: 5000,
                              isClosable: true,
                            });

                            dispatch(getMailingList(_id));
                            dispatch(getUserMailingLists());
                          });
                        }}
                      >
                        Remove Email
                      </Box>
                    </Td>
                  </Tr>
                );
              })}
            {currentMailingList.emails.length === 0 && (
              <Tr>
                <Td textAlign="center" fontSize="30px" fontWeight={500}>
                  You have no emails! Add one below!
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Box textAlign="center">
        <div className="three">
          <AddEmailToList />
        </div>
        <Spacer m={5} />
        <div className="four">
          <CreateEmailFormModal />
        </div>
        <br />
        {/* <Link to={`/subscribe/${_id}`}> */}
        <Input
          mt={5}
          width="500px"
          value={window.location.href.replace("mailingList", "subscribe")}
        />
        <br />
        <Button
          className="five"
          mt={2}
          colorScheme="teal"
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href.replace("mailingList", "subscribe")
            );
            toast({
              title: "Mailing List subscribe link has been copied.",
              description: "The link has been copied to your clipboard.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }}
        >
          Copy to Clipboard the Subscribe Link
        </Button>
        {/* </Link> */}
      </Box>
      {localStorage.getItem("show2") === "true" ? (
        <Steps enabled={true} steps={steps} initialStep={0} onExit={onExit} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default OneMailingList;
// bakc anf forward butotn
// email link ***
// add emails to mailing list
