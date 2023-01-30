import jwtFetch from "./jwt";

const RECEIVE_LISTS = "mailinglist/RECEIVE_LISTS";
const RECEIVE_LIST = "mailinglist/RECEIVE_LIST";
const EMPTY_CURR_LIST = "mailinglist/EMPTY_CURR_LIST";
const CREATE_LIST = "mailinglist/CREATE_LIST";
const UPDATE_LIST = "mailinglist/UPDATE_LIST";
const REMOVE_LIST = "mailinglist/REMOVE_LIST";

const receiveLists = (lists) => ({
  type: RECEIVE_LISTS,
  lists,
});

const receiveList = (list) => ({
  type: RECEIVE_LIST,
  list,
});

export const emptyCurrList = () => ({
  type: EMPTY_CURR_LIST,
});

const createList = (list) => ({
  type: CREATE_LIST,
  list,
});

const updateList = (list) => ({
  type: UPDATE_LIST,
  list,
});

const removeList = (listId) => ({
  type: REMOVE_LIST,
  listId,
});

export const getUserMailingLists = () => async (dispatch) => {
  const res = await jwtFetch("/api/mailinglists/home");
  const data = await res.json();
  return dispatch(receiveLists(data));
};

export const getMailingList = (mailingListId) => async (dispatch) => {
  const res = await jwtFetch(`/api/mailinglists/${mailingListId}`);
  const data = await res.json();
  return dispatch(receiveList(data));
};

export const createMailingList = (params) => async (dispatch) => {
  const { name, ownerId, emails } = params;
  const res = await jwtFetch("/api/mailinglists/", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      owner: ownerId,
      emails: emails,
    }),
  });
  // const data2 = await res.clone();
  const data = await res.json();
  // return dispatch(createList(data));
  dispatch(getUserMailingLists());
  return data._id;

  //* in frontend:
  //* dispatch(createMailingList(43)).then(res => res.json()).then(data => {
  //* history.push("/mailinglist/" + data._id)
  //* })
};

export const updateMailingList = (params) => async (dispatch) => {
  let { mailinglistId, name, emails } = params;
  if (!emails) {
    emails = [];
  }
  const res = await jwtFetch(`/api/mailinglists/${mailinglistId}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      emails: emails,
    }),
  });
  const data2 = await res.clone();
  const data = await res.json();
  dispatch(getUserMailingLists());
  dispatch(getMailingList(mailinglistId));

  return data2;
};

export const removeEmail = (params) => async (dispatch) => {
  const { mailingListId, email } = params;
  const res = await jwtFetch(`/api/mailinglists/${mailingListId}/${email}`, {
    method: "PUT",
  });
  const data = await res.json();
  dispatch(getMailingList(mailingListId));
};

export const removeMailingList = (mailingListId) => async (dispatch) => {
  const res = await jwtFetch(`/api/mailinglists/${mailingListId}`, {
    method: "DELETE",
  });
  dispatch(getUserMailingLists());
  // return dispatch(removeList(mailingListId));
  return;
};

const mailinglistReducer = (
  state = { lists: [], currentMailingList: null },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_LISTS:
      return { ...state, lists: action.lists };
    case RECEIVE_LIST:
      // is mailing list have a field of arrays (emails)
      return { ...state, currentMailingList: action.list };
    case EMPTY_CURR_LIST:
      return { ...state, currentMailingList: null };
    default:
      return state;
  }
};

export default mailinglistReducer;
