// redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./modules/user";
import opening from "./modules/opening";

// middleware
import thunk from "redux-thunk";
import logger from "redux-logger";

// redux router
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user,
  opening,
  router: connectRouter(history),
});

const middleware = [thunk.withExtraArgument({ history }), logger]; // 썽크함수에서 { history } 쓰려면 반드시 필요함
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
