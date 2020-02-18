import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import createReducer from './rootReducer';
import catchError from 'middlewares/catchError';
import xhr from 'middlewares/xhr';

const createStore = () => {
  const history = createBrowserHistory();
  const store = configureStore({
    reducer: createReducer(history),
    middleware: [catchError, xhr, ...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(createReducer(history));
    });
  }

  return { store, history };
};

export default createStore;
