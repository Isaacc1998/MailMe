import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ViewHistoryForm from "./ViewHistoryForm";
//import actual form here

function ViewHistoryModel({ setTitle, setBody }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  return (
    <>
      <Button onClick={onOpen}>Past emails</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>History</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ViewHistoryForm
              onClose={onClose}
              list={currentList}
              setTitle={setTitle}
              setBody={setBody}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewHistoryModel;
