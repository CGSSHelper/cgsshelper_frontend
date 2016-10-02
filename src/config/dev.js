import baseConfig from './base';

const config = {
  appEnv: 'dev',
  apiAddr: '//127.0.0.1:8888'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
