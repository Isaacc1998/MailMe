import { Box, Button, Heading, Image, Input, useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMailingList, updateMailingList } from "../store/mailinglist";
import "./SubscribeLink.css";

const SubscribeLink = () => {
  console.log(window.location.pathname.split("subscribe/")[1]);
  let mailingListId = window.location.pathname.split("subscribe/")[1];
  const dispatch = useDispatch();
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  const toast = useToast();
  const ref = useRef();

  useEffect(() => {
    dispatch(getMailingList(mailingListId));
    ref.current.focus();
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();

    let obj = {
      mailinglistId: mailingListId,
      name: currentMailingList.name,
      emails: [ref.current.value],
    };
    dispatch(updateMailingList(obj)).then(() => {
      toast({
        title: "Subscription confirmed.",
        description: "You have subscribed!.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      ref.current.value = "";
    });
  };
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

      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Input
          ref={ref}
          w="700px"
          placeholder="Enter your email"
          required
          type="email"
        />
        <Box textAlign="center">
          <Button type="submit" colorScheme="green" mt={10}>
            Confirm Subscription
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default SubscribeLink;
