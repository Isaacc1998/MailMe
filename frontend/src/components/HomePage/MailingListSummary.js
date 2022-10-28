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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { emptyCurrList } from "../../store/mailinglist";
import { removeMailingList } from "../../store/mailinglist";
import "./HomePage.css";

const MailingListSummary = ({ mailingLists }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  console.log(location, "location");
  console.log(mailingLists, "this is mailingLists");
  useEffect(() => {
    // dispatch(emptyCurrList());
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
          <TableCaption>Isaac</TableCaption>
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
                        as={Link}
                        to={`/mailingList/${list._id}`}
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
                      fontWeight={
                        location.pathname.includes(list._id) ? 700 : 400
                      }
                      fontSize="20px"
                      isNumeric
                    >
                      {list.emails.length}
                    </Td>

                    {location.pathname === "/" ? (
                      <Td isNumeric>{list.emails.length}</Td>
                    ) : null}
                    {/* <Td>10</Td> */}

                    <Td>
                      <div
                        className="deleteList"
                        onClick={() => {
                          return dispatch(removeMailingList(list._id)).then(
                            () => {
                              return history.push("/");
                            }
                          );
                        }}
                      >
                        Remove
                      </div>
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
export default MailingListSummary;
