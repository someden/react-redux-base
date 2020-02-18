import axios from 'axios';
import qs from 'qs';

const API = process.env.REACT_APP_API || '';

const xhr = axios.create({
  baseURL: API,
  withCredentials: true,
  paramsSerializer: qs.stringify,
});

export default xhr;
