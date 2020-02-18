import { combineReducers } from '@reduxjs/toolkit';

/* Packages */
import { connectRouter } from 'connected-react-router';

/* Models */
import AuthReducer, { name as Auth } from 'models/auth';
import ErrorsReducer, { name as Errors } from 'models/errors';
import ProductsReducer, { name as Products } from 'models/products';
/* ... */

const createReducer = history =>
  combineReducers({
    /* Packages */
    router: connectRouter(history),

    /* Models */
    [Auth]: AuthReducer,
    [Errors]: ErrorsReducer,
    [Products]: ProductsReducer,
    /* ... */
  });

export default createReducer;
