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

import "./SignupForm.css";

import SignupForm from "./SignupForm";
function SignupFormModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        width={280}
        colorScheme="white"
        textColor="black"
        className="signup-button-for-splash"
        onClick={onOpen}
      >
        Sign Up
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignupForm onClose={onClose} />
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Sign Up
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignupFormModal;
