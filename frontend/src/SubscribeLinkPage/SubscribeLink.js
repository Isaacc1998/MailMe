import { Box, Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMailingList } from "../store/mailinglist";
import "./SubscribeLink.css";

const SubscribeLink = () => {
  console.log(window.location.pathname.split("subscribe/")[1]);
  let mailingListId = window.location.pathname.split("subscribe/")[1];
  const dispatch = useDispatch();
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  const toast = useToast();

  useEffect(() => {
    dispatch(getMailingList(mailingListId));
  }, []);
  return (
    <Box
      mt="10vh"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        flexDir: "column",
      }}
    >
      <Heading mb={10}>
        Confirm your subscription to{" "}
        {currentMailingList && currentMailingList.name}
      </Heading>
      <Input w="700px" placeholder="Enter your email" />
      <Button
        colorScheme="green"
        onClick={() => {
          toast({
            title: "Subscription confirmed.",
            description: "You have subscribed!.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }}
        mt={10}
      >
        Confirm Subscription
      </Button>
    </Box>
  );
};
export default SubscribeLink;
