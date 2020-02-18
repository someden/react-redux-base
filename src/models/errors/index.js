import { createSlice } from '@reduxjs/toolkit';

import { logoutFinished } from 'models/auth';

const initialState = [];

export const name = 'errors';

const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    catchError: (state, { payload }) => [...state, payload],
    deleteErrors: () => initialState,
  },
  extraReducers: {
    [logoutFinished]: () => initialState,
  },
});

export default reducer;

export const { catchError, deleteErrors } = actions;

export const errorsArr = state => state[name];
