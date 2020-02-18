import { checkTokens } from 'models/auth';
import { accessToken } from 'models/auth/selectors';
import xhr from 'utils/xhr';

const xhrMiddleware = ({ dispatch }) => next => action => {
  if (!action.payload || !action.payload.xhr) {
    return next(action);
  }

  next(action);

  const { withoutAuth = false, headers = {}, ...request } = action.payload.xhr;

  return withoutAuth
    ? xhr({ ...request, headers })
    : dispatch(checkTokens()).then(() =>
        xhr({
          ...request,
          headers: { ...headers, Authorization: `Bearer ${accessToken()}` },
        })
      );
};

export default xhrMiddleware;
