import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMailingList } from "../../store/mailinglist";
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
import { Link } from "react-router-dom";
import CreateEmailFormModal from "../CreateEmailForm/CreateEmailFormModal";

const OneMailingList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { _id } = useParams();
  console.log(_id, "paranms is this");
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );

  useEffect(() => {
    if (_id)
      dispatch(getMailingList(_id)).then(() => {
        setLoading(false);
      });
  }, [dispatch, _id]);
  if (loading) return <div></div>;
  return (
    <div>
      {!loading && currentMailingList && JSON.stringify(currentMailingList)}
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Isaac</TableCaption>
          <Thead>
            <Tr>
              <Th>Email Name</Th>
              {/* <Th># of Emails</Th>
              <Th>Emails sent out</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {currentMailingList.emails.map((mail) => {
              return (
                <Tr>
                  <Td>{mail}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <CreateEmailFormModal />
    </div>
  );
};
export default OneMailingList;
// bakc anf forward butotn
// email link ***
// add emails to mailing list
