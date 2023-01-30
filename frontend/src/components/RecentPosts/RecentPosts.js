import { Box, Heading, list, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../store/posts";
// import introJs from "intro.js";
// import "../HomePage/CustomIntrojs.css";

const RecentPosts = () => {
  //  get the useSelector state then map
  let posts = useSelector((state) => state.posts.posts);
  const currentUserId = useSelector((state) => state.session.user._id);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!Array.isArray(posts)) posts = [posts];

  let filteredPosts =
    posts &&
    posts.filter((ele) => {
      if (!ele.list) return false;
      return currentUserId == ele.list.owner;
    });

  useEffect(() => {
    dispatch(getAllPosts());

    // setTimeout(() => {
    //   dispatch(getAllPosts());
    // }, 400);
  }, [dispatch, currentUserId, posts.length]);
  // console.log(filteredPosts, "posts");
  return (
    <>
      <Box className="recentPostsTutorial" mt={4}>
        <Heading sx={{ marginLeft: "1%" }} mb={6}>
          Recent Posts
        </Heading>
        {filteredPosts.length > 0 &&
          filteredPosts.map((pst) => (
            <Box
              id={`${pst._id}`}
              className="recent-post"
              shadow="lg"
              p={10}
              mb={5}
              sx={{
                border: "1px solid lightgray",
                borderRadius: "10px",
                backgroundColor: "white",
                boxShadow: "1px 1px 2.5px 2.5px lightgray;",
              }}
              onClick={() => {
                setTimeout(() => {
                  history.push(`/mailingList/${pst.list._id}`);
                }, 150);
              }}
              _hover={{
                cursor: "pointer",
                backgroundColor: "#BEE3F8",
              }}
              _active={{
                transform: "scale(0.95)",
                backgroundColor: "#BEE3F8",
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
    </>
  );
};
export default RecentPosts;
