import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { productListReducer } from "./reducers/productReducers";

const initalState = {};
const reducer = combineReducers({
	productList: productListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducer,
	initalState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
