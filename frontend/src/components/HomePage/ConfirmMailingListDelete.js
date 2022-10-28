import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeMailingList } from "../../store/mailinglist";

const ConfirmMailingListDelete = ({ list }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  return (
    <>
      <Box
        mr={5}
        as={Button}
        colorScheme="red"
        className="deleteList"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        Delete List
      </Box>
      <Modal initialFocusRef={ref} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the{" "}
            <strong style={{ color: "red" }}>entire mailing list</strong>?
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                dispatch(removeMailingList(list._id)).then(() => {
                  setTimeout(() => {
                    onClose();
                  }, 100);
                  setTimeout(() => {
                    toast({
                      title: `Mailing List "${list.name}" has been deleted.`,
                      position: "bottom",

                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                  }, 300);
                });
              }}
              colorScheme="red"
              mr={3}
              ref={ref}
            >
              Confirm Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Nevermind
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmMailingListDelete;
