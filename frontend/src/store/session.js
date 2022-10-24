import jwtFetch from "./jwt";

const SET_CURRENT_USER = "session/SET_CURRENT_USER";
const SET_SESSION_ERRORS = "session/SET_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser,
});

const setErrors = (errors) => ({
  type: SET_SESSION_ERRORS,
  errors,
});

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

export const signup = (user) => startSession(user, "api/users/register");
export const login = (user) => startSession(user, "api/users/login");
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch(logoutUser());
};

const startSession = (userInfo, route) => async (dispatch) => {
  try {
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    const { user, token } = await res.json();
    localStorage.setItem("jwtToken", token);
    return dispatch(setCurrentUser(user));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(setErrors(res.errors));
    }
  }
};

const initialState = {
  user: undefined,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case SET_SESSION_ERRORS:
      return action.errors;
    case SET_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export default sessionReducer;
