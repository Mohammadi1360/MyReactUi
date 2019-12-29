import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from "redux-saga";
import rootReducer from './reducers';
import sagas from "./sagas";
import thunk from 'redux-thunk';
import logger from 'redux-logger'

// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware, thunk, logger];
const middlewares = [thunk, logger];

export function configureStore(initialState) {

  // const store = createStore(rootReducer, applyMiddleware(thunk, logger));

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  // store.dispatch(getQuestionGroups());
  // sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
