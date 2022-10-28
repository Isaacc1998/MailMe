import { Box, Button, Heading, Image, Input, useToast } from "@chakra-ui/react";
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
      <Image
        w="10%"
        src="https://thumbs.dreamstime.com/b/clip-art-announcement-illustrator-vector-bulletin-notice-notification-line-sign-symbol-newsletter-line-clipart-sign-icon-221613640.jpg"
      />
      <Heading mb={10}>
        Confirm your subscription to{" "}
        {currentMailingList && currentMailingList.name}'s newsletter.
      </Heading>
      <Input w="700px" placeholder="Enter your email" />
      <Button
        colorScheme="green"
        onClick={() => {
          toast({
            title: "Subscription confirmed.",
            description: "You have subscribed!.",
            status: "success",
            duration: 5000,
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
