import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCurrList } from "../../store/mailinglist";

const MailingListSummary = ({ mailingLists }) => {
  const dispatch = useDispatch();
  console.log(mailingLists, "this is mailingLists");
  useEffect(() => {
    // dispatch(emptyCurrList());
    dispatch({
      type: "mailinglist/EMPTY_CURR_LIST",
    });
  }, []);
  return (
    <>
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
                        to={`mailingList/${list._id}`}
                        _hover={{
                          color: "red",
                        }}
                        fontSize="20px"
                      >
                        {list.name}
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
    </>
  );
};
export default MailingListSummary;
