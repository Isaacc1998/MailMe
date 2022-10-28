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
  Input,
  Box,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMailingList } from "../../store/mailinglist";
import "./HomePage.css";
function EditName({ id, oldName }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMailingList({ mailinglistId: id, name: name }));
    onClose();
  };
  const ref = useRef();

  return (
    <>
      <Box
        _hover={{ cursor: "pointer", color: "orange" }}
        className="updateName"
        onClick={() => {
          onOpen();
          setTimeout(() => {
            ref.current.focus();
            setName(oldName);
          }, 200);
        }}
      >
        edit name
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={() => {
                console.log("yolo");
              }}
            >
              <Input
                mt={-3}
                mb={4}
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Enter your new name"
                ref={ref}
              ></Input>
              <Button type="submit" colorScheme="green" onClick={handleSubmit}>
                Edit
              </Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditName;
