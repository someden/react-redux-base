import { refreshTokens } from 'models/auth';
import { catchError as catchErrorAction } from 'models/errors';

const catchError = store => next => action => {
  const error = action.payload && action.payload.error;

  if (error && error.response && error.response.status === 401) {
    store.dispatch(refreshTokens());
  } else if (error) {
    store.dispatch(catchErrorAction(error));
  }

  return next(action);
};

export default catchError;
