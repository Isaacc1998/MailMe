import jwtFetch from "./jwt";

const RECEIVE_POSTS = "posts/receivePosts";
const RECEIVE_POST = "posts/receivePost";
const REMOVE_POST = "posts/removePost";

const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts,
});

const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
});

const removePost = (postId) => ({
  type: REMOVE_POST,
  postId,
});

export const getAllPosts = () => async (dispatch) => {
  console.log("hit posts thunk");
  const res = await jwtFetch("/api/posts/");
  const data = await res.json();
  console.log(data, "this posts redux thiunk");
  return dispatch(receivePosts(data));
};

export const getPosts = (mailinglistId) => async (dispatch) => {
  const res = await jwtFetch(`/api/mailinglists/${mailinglistId}/posts`);
  const data = await res.json();
  return dispatch(receivePosts(data));
};

export const getPost = (params) => async (dispatch) => {
  const { mailinglistId, postId } = params;
  const res = await jwtFetch(
    `/api/mailinglists/${mailinglistId}/posts/${postId}`
  );
  const data = await res.json();
  return dispatch(receivePost(data));
};

export const createPost = (params) => async (dispatch) => {
  console.log(params, "this is params");
  const { mailinglistId, title, content } = params;
  const res = await jwtFetch(`/api/mailinglists/${mailinglistId}/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const data2 = await res.clone();
  const data = await res.json();
  dispatch(receivePosts(data)); // solely an update function
  return data2;
};

export const updatePost = (params) => async (dispatch) => {
  const { mailinglistId, title, content, postId } = params;
  const res = await jwtFetch(
    `/api/mailinglists/${mailinglistId}/posts/${postId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    }
  );

  const data2 = await res.clone();
  const data = await res.json();
  dispatch(receivePosts(data)); // solely an update function
  return data2;
};

export const deletePost = (params) => async (dispatch) => {
  const { mailinglistId, postId } = params;
  const res = await jwtFetch(
    `/api/mailinglists/${mailinglistId}/posts/${postId}`,
    {
      method: "DELETE",
    }
  );
  const data = res.json();
  dispatch(getPosts());
};

const postReducer = (state = { posts: [], currentPost: null }, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      console.log(action.posts, "THUN POST LEGIT");
      return { ...state, posts: action.posts };
    case RECEIVE_POST:
      return { ...state, currentPost: action.post };
    default:
      return state;
  }
};

export default postReducer;
