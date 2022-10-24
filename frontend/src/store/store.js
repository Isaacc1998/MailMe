import { createStore, combineReducers, applyMiddlewate, compose } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddlewate(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddlewate(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
