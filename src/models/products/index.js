import { createSlice } from '@reduxjs/toolkit';

import states from 'constants/states';
import { logoutFinished } from 'models/auth';

import { name } from './constants';
export { name };

const initialState = {
  state: states.none,
  entities: [],
  filter: {}, // https://jsonapi.org/format/#fetching-filtering
  page: {}, // https://jsonapi.org/format/#fetching-pagination
  sort: {}, // https://jsonapi.org/format/#fetching-sorting
  total: 0,
};

const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    getProductsRequest: (state, { payload }) => ({
      ...state,
      state: states.requested,
      filter: payload.xhr.params.filter,
      page: payload.xhr.params.page,
      sort: payload.xhr.params.sort,
    }),
    getProductsSuccess: (state, { payload }) => ({
      ...state,
      state: states.successed,
      entities: payload.products,
      total: payload.total,
    }),
    getProductsFailure: state => ({
      ...state,
      state: states.failed,
    }),
  },
  extraReducers: {
    [logoutFinished]: () => initialState,
  },
});

export default reducer;

export const { getProductsRequest, getProductsSuccess, getProductsFailure } = actions;

export const getProducts = ({ filter, page, sort }) => dispatch =>
  dispatch(
    getProductsRequest({
      xhr: {
        method: 'get',
        url: '/products/',
        params: { filter, page, sort },
      },
    })
  )
    .then(({ data }) => {
      dispatch(getProductsSuccess(data));
    })
    .catch(error => {
      dispatch(getProductsFailure({ error }));
      throw error;
    });
