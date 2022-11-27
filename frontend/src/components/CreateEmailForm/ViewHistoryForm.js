import { FormLabel, Input, Button, Select } from "@chakra-ui/react";
import jwtFetch from "../../store/jwt";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/posts";
import "./ViewHistoryForm.css";
function ViewHistoryForm({ onClose, list, setTitle, setBody }) {
  const dispatch = useDispatch();
  const [currentPost, setCurrentPost] = useState(null);
  const posts = useSelector((state) => state.posts.posts);
  useEffect(() => {
    dispatch(getPosts(list._id));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="postsContainer">
      {posts &&
        posts.map((post) => {
          return (
            <div
              className="post"
              //   id={post._id}
              value={post}
              onClick={() => {
                // document.getElementById(post._id).style.backgroundColor =
                //   "#99CCCC";
                setTitle(post.title);
                setBody(post.content);
                setCurrentPost(post);
              }}
              style={{
                backgroundColor:
                  currentPost && post._id === currentPost._id
                    ? "#99CCCC"
                    : "rgb(200, 231, 231)",
              }}
            >
              <div className="postTitle">{post.title} -</div>
              <div className="postContent">{post.content}</div>
            </div>
          );
        })}
      <Button type="submit" onClick={handleClick}>
        Use this mail
      </Button>
    </div>
  );
}

export default ViewHistoryForm;
