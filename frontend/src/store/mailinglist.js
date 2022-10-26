import jwtFetch from "./jwt";

const RECEIVE_LISTS = "mailinglist/RECEIVE_LISTS";
const RECEIVE_LIST = "mailinglist/RECEIVE_LIST";
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

  const data2 = await res.clone();
  const data = await res.json();
  // return dispatch(createList(data));
  dispatch(receiveLists(data));
  return data2;

  //* in frontend:
  //* dispatch(createMailingList(43)).then(res => res.json()).then(data => {
  //* history.push("/mailinglist/" + data._id)
  //* })
};

export const updateMailingList = (params) => async (dispatch) => {
  const { mailingListId, name, emails } = params;
  const res = await jwtFetch(`/api/mailinglists/${mailingListId}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      emails: emails,
    }),
  });
  const data = await res.json();
  return dispatch(updateList(data));
};

export const removeMailingList = (mailingListId) => async (dispatch) => {
  const res = await jwtFetch(`/api/mailinglists/${mailingListId}`, {
    method: "DELETE",
  });
  return dispatch(removeList(mailingListId));
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

    case REMOVE_LIST:

    default:
      return state;
  }
};

export default mailinglistReducer;
