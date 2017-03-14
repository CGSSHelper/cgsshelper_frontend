import Vue from 'vue';

const reqInit = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default {
  now() {
    return new Promise((resolve, reject) => {
      fetch(`${Vue.config.api_addr}/event/now`, reqInit).then(res => res.json())
        .then(res => resolve(res.result))
        .catch(res => reject(res));
    });
  },
  next() {
    return new Promise((resolve, reject) => {
      fetch(`${Vue.config.api_addr}/event/next`, reqInit).then(res => res.json())
        .then(res => resolve(res.result))
        .catch(res => reject(res));
    });
  },
  detail(id) {
    return new Promise((resolve, reject) => {
      fetch(`${Vue.config.api_addr}/event/${id}`, reqInit).then(res => res.json())
        .then(res => resolve(res.result))
        .catch(res => reject(res));
    });
  },
};
