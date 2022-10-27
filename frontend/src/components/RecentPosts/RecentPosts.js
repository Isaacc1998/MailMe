import { Box, Heading, Text } from "@chakra-ui/react";

const RecentPosts = () => {
  //  get the useSelector state then map
  let posts = [
    { name: "hi", content: "hurr" },
    { name: "bye", content: "gurr" },
    { name: "hi", content: "hurr" },
    { name: "bye", content: "gurr" },
    { name: "hi", content: "hurr" },
    { name: "bye", content: "gurr" },
  ];
  return (
    <Box mt={4}>
      <Heading mb={6}>Recent Posts</Heading>
      {posts.length > 0 &&
        posts.map((pst) => (
          <Box
            shadow="lg"
            p={10}
            mb={5}
            sx={{ border: "1px solid gray", borderRadius: "10px" }}
          >
            <Heading>{pst.name}</Heading>
            <Text mt={5}>{pst.content}</Text>
          </Box>
        ))}
    </Box>
  );
};
export default RecentPosts;
