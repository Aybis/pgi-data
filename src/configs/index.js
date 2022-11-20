import axios from 'axios';
// import errorHandler from './errorHandler';

const instance = axios.create({
  baseURL: `http://dev3.dansmultipro.co.id/api/recruitment/`,
});
// http://dev3.dansmultipro.co.id/api/recruitment/positions/{ID}

// Add a response interceptor
// instance.interceptors.response.use((response) => response.data, errorHandler);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default instance;
