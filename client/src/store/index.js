import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "../reducers/reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;

// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk';
// import reducer from "../reducers/reducers";

// const store = createStore(reducer, applyMiddleware(thunk));

// export default store;