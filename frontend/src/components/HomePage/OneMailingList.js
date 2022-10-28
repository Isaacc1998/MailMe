import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getMailingList } from "../../store/mailinglist";
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

const OneMailingList = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState();
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
      <Heading fontSize={30} m={5} textAlign="left">
        List of subscribers for "
        <Text sx={{ display: "inline", fontWeight: 700 }} color="red">
          {currentMailingList.name}
        </Text>
        "
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
                    <Td>
                      <div
                        className="deleteEmail"
                        onClick={() => {
                          return dispatch(
                            removeEmail({
                              mailingListId: currentMailingList._id,
                              email: mail,
                            })
                          ).then(() => {
                            setEmails(currentMailingList.emails);
                          });
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
      <Box textAlign="center">
        <AddEmailToList />
        <Spacer m={5} />
        <CreateEmailFormModal />
        <br />
        {/* <Link to={`/subscribe/${_id}`}> */}
        <Input
          mt={5}
          width="500px"
          value={window.location.href.replace("mailingList", "subscribe")}
        />
        <br />
        <Button
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
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          Copy to Clipboard the Subscribe Link
        </Button>
        {/* </Link> */}
      </Box>
    </div>
  );
};
export default OneMailingList;
// bakc anf forward butotn
// email link ***
// add emails to mailing list
