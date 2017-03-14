import Vue from 'vue';

const reqInit = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default {
  detail(id) {
    return new Promise((resolve, reject) => {
      fetch(`${Vue.config.api_addr}/card/${id}`, reqInit).then(res => res.json())
        .then(res => resolve(res.result))
        .catch(res => reject(res));
    });
  },
};
