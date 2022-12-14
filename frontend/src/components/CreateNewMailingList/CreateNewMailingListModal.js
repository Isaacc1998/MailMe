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
  Box,
} from "@chakra-ui/react";
import CreateNewMailingList from "./CreateNewMailingList";
//   import CreateEmailForm from "./CreateEmailForm";
function CreateNewMailingListModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box ml="auto" mr={5}>
        <Button colorScheme="green" onClick={onOpen}>
          Create New Mailing List
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Mailing List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateNewMailingList onClose={onClose} />
            </ModalBody>
            <ModalFooter>
              {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Sign Up
                  </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default CreateNewMailingListModal;
