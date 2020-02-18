import { createSlice } from '@reduxjs/toolkit';

import getExpiresAt from 'utils/getExpiresAt';

import * as selectors from './selectors';
import { name } from './constants';
export { name };

const initialState = {};

const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    getCSRFTokenRequest: state => state,
    getCSRFTokenSuccess: state => state,
    getCSRFTokenFailure: state => state,

    loginRequest: state => state,
    loginSuccess: state => state,
    loginFailure: state => state,

    refreshTokensRequest: state => state,
    refreshTokensSuccess: state => state,
    refreshTokensFailure: state => state,

    logoutRequest: state => state,
    logoutFinished: state => state,
  },
});

export default reducer;

export const {
  getCSRFTokenRequest,
  getCSRFTokenSuccess,
  getCSRFTokenFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  refreshTokensRequest,
  refreshTokensSuccess,
  refreshTokensFailure,
  logoutRequest,
  logoutFinished,
} = actions;

export const getCSRFToken = () => dispatch =>
  dispatch(
    getCSRFTokenRequest({
      xhr: {
        withoutAuth: true,
        method: 'get',
        url: '/user/request/',
      },
    })
  )
    .then(({ data: { csrfToken } }) => {
      localStorage.setItem('csrfToken', csrfToken);
      dispatch(getCSRFTokenSuccess({ csrfToken }));
    })
    .catch(error => {
      dispatch(getCSRFTokenFailure({ error }));
      throw error;
    });

export const login = ({ username, password }) => dispatch =>
  dispatch(getCSRFToken()).then(({ payload }) =>
    dispatch(
      loginRequest({
        xhr: {
          withoutAuth: true,
          method: 'post',
          url: '/user/login/',
          headers: { 'X-csrf-token': payload.csrfToken },
          data: {
            username,
            password,
          },
        },
      })
    )
      .then(({ data: { accessToken, expiresIn } }) => {
        const expiresAt = getExpiresAt(expiresIn);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiresAt', String(expiresAt));
        dispatch(loginSuccess({ accessToken, expiresAt }));
      })
      .catch(error => {
        dispatch(loginFailure({ error }));
        throw error;
      })
  );

const resetTokens = () => {
  localStorage.removeItem('csrfToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expiresAt');
};

export const logout = () => dispatch =>
  dispatch(
    logoutRequest({
      xhr: {
        method: 'get',
        url: '/user/logout/',
      },
    })
  ).finally(() => {
    resetTokens();
    dispatch(logoutFinished());
  });

let cachedRefreshTokensPromise = null;
export const refreshTokens = () => dispatch => {
  if (cachedRefreshTokensPromise) {
    return cachedRefreshTokensPromise;
  }

  const refreshTokensPromise = dispatch(
    refreshTokensRequest({
      xhr: {
        withoutAuth: true,
        method: 'get',
        url: '/user/refresh/',
        headers: { 'X-csrf-token': selectors.csrfToken() },
      },
    })
  )
    .then(({ data: { csrfToken, accessToken, expiresIn } }) => {
      cachedRefreshTokensPromise = null;
      const expiresAt = getExpiresAt(expiresIn);
      localStorage.setItem('csrfToken', csrfToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expiresAt', String(expiresAt));
      return dispatch(refreshTokensSuccess({ csrfToken, accessToken, expiresAt }));
    })
    .catch(() => {
      cachedRefreshTokensPromise = null;
      resetTokens();
      dispatch(refreshTokensFailure());
      dispatch(logoutFinished());
      return Promise.reject();
    });

  cachedRefreshTokensPromise = refreshTokensPromise;

  return refreshTokensPromise;
};

export const checkTokens = () => dispatch =>
  selectors.needToRefreshTokens() ? dispatch(refreshTokens()) : Promise.resolve();
