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
} from "@chakra-ui/react";
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
            <div>
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <TableCaption>Isaac</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Mailing List Name</Th>
                      <Th># of Emails</Th>
                      {/* <Th isNumeric># of Emails</Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mailingLists.length > 0 &&
                      mailingLists.map((list) => {
                        return (
                          // name of mailing, number of emails contained,
                          // <div
                          //   style={{
                          //     border: "1px solid black",
                          //     margin: "5px",
                          //     padding: "5px",
                          //   }}
                          // >
                          <Tr>
                            <Td>{list.name}</Td>

                            <Td>emails: {list.emails.length}</Td>
                          </Tr>
                          // </div>
                        );
                      })}
                    {/* <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr> */}
                  </Tbody>
                  {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
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
