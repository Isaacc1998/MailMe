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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMailingList } from "../../store/mailinglist";
import "./HomePage.css";
function EditName({ id }) {
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
  return (
    <>
      <div className="updateName" onClick={onOpen}>
        edit name
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="text" value={name} onChange={handleChange}></input>
            <Button colorScheme="green" onClick={handleSubmit}>
              Edit
            </Button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditName;
