import config from './index';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  page: (page) => config.get(`positions.json?page=${page}`),
  search: (desc) => config.get(`positions.json`, desc),
  detail: (idJob) => config.get(`positions/${idJob}`),
};
