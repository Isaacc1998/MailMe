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
import { Link } from "react-router-dom";
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
          <div className="top-right-home-container">
            Top Right side container
            <div>Display user email</div>
            <div>
              <CreateEmailFormModal />
            </div>
          </div>
          <div className="bottom-right-home-container">
            {/* <div>Bottom Right side container &nbsp;</div>
            <div>Content of Mailing List</div> */}
            <div className="inner-bottom-right">
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <TableCaption>Isaac</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Mailing List Name</Th>
                      <Th># of Emails</Th>
                      <Th>Emails sent out</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mailingLists.length > 0 &&
                      mailingLists.map((list) => {
                        return (
                          <Tr>
                            <Td>
                              <Box
                                as={Link}
                                to={`${list.name}`}
                                _hover={{
                                  color: "red",
                                }}
                              >
                                Go to {list.name}
                              </Box>
                            </Td>

                            <Td>{list.emails.length}</Td>
                            <Td>10</Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
