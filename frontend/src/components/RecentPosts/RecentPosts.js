import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/posts";

const RecentPosts = () => {
  //  get the useSelector state then map
  const posts = useSelector((state) => state.posts.posts);
  const currentUserId = useSelector((state) => state.session.user._id);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(posts, "this is posts");
  let filteredPosts =
    posts &&
    posts.filter((ele) => {
      if (!ele.list) return false;
      return currentUserId == ele.list.owner;
    });
  console.log(filteredPosts.length, "LENGTH HERE");
  // let posts = [
  //   { name: "hi", content: "hurr" },
  //   { name: "bye", content: "gurr" },
  //   { name: "hi", content: "hurr" },
  //   { name: "bye", content: "gurr" },
  //   { name: "hi", content: "hurr" },
  //   { name: "bye", content: "gurr" },
  // ];
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <Box mt={4}>
      <Heading mb={6}>Recent Posts</Heading>
      {filteredPosts.length > 0 &&
        filteredPosts.map((pst) => (
          <Box
            shadow="lg"
            p={10}
            mb={5}
            sx={{ border: "1px solid gray", borderRadius: "10px" }}
            onClick={() => {
              setTimeout(() => {
                history.push(`/mailingList/${pst.list._id}`);
              }, 150);
            }}
            _hover={{
              cursor: "pointer",
              backgroundColor: "#B2F5EA",
            }}
            _active={{
              transform: "scale(0.95)",
              backgroundColor: "#B2F5EA",
            }}
          >
            <Heading>{pst.title}</Heading>
            <Text fontSize="20px" mt={3}>
              {pst.content}
            </Text>
            <Box mt={3} fontSize="14px">
              <Text
                sx={{ display: "inline", fontStyle: "oblique 90deg" }}
                color="gray"
              >
                Sent to{" "}
              </Text>
              <Text sx={{ display: "inline" }} color="gray">
                "{pst.list.name}"
              </Text>
            </Box>
          </Box>
        ))}
    </Box>
  );
};
export default RecentPosts;
