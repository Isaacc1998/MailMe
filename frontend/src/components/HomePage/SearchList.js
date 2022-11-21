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
import { useState } from "react";
import { getUserMailingLists } from "../../store/mailinglist";

import "./HomePage.css";

const SearchList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [mailingLists, setMailingLists] = useState([]);

  const lists = useSelector((state) => state.mailingLists.lists);

  let postsCountArray = useSelector((state) => state.posts.posts);
  if (!Array.isArray(postsCountArray)) postsCountArray = [postsCountArray];

  useEffect(() => {
    dispatch(getUserMailingLists());
  }, []);

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let name = params.get("q");
    if (name) {
      let matches = Object.values(lists)
        .filter((list) => {
          let listName = list.name.toLowerCase();
          return listName.startsWith(name.toLowerCase());
        })
        .sort((a, b) => {
          return a.name.length - b.name.length;
        });

      let matches2 = Object.values(lists)
        .filter((list) => {
          let listName = list.name.toLowerCase().split(" ");
          let contains = false;
          for (let i = 1; i < listName.length; i++) {
            if (listName[i].startsWith(name.toLowerCase())) {
              contains = true;
            }
          }
          return contains;
        })
        .sort((a, b) => {
          return a.name.length - b.name.length;
        });
      matches = matches.concat(matches2);
      setMailingLists(matches);
    }
  }, [location, lists]);

  return (
    <>
      <Heading m={4} textAlign="left">
        Searched Mailing Lists
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          {/* <TableCaption>Isaac</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Mailing List Name</Th>
              <Th isNumeric># of Emails</Th>
              <Th isNumeric>Emails sent out</Th>
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

                    <Td
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

                    {/* <Td>10</Td> */}

                    <Td isNumeric>
                      {/* is numeric makes it text align right */}

                      <ConfirmMailingListDelete list={list} />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SearchList;
