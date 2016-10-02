import baseConfig from './base';

const config = {
  appEnv: 'dist',
  apiAddr: '//api.cgsshelper.tk'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
