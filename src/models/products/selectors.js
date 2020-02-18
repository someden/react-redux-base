import states from 'constants/states';

import { name } from './constants';

const { requested, successed } = states;

export const productsState = state => state[name].state;
export const productsIsLoading = state => productsState(state) === requested;
export const productsIsLoaded = state => productsState(state) === successed;
export const productsFilter = state => state[name].filter;
export const productsPage = state => state[name].page;
export const productsSort = state => state[name].sort;
export const productsArr = state => state[name].entities;
