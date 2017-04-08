import eventApi from '@/api/event';
import * as types from '@/store/mutation-types';

const state = {
  pointList: [],
};

const getters = {};

const actions = {
  getEventPoint({ commit }, id) {
    return eventApi.point(id).then((res) => {
      commit(types.ADD_POINT, res);
      return res;
    });
  },
};

const mutations = {
  [types.ADD_POINT](_state, data) {
    const foundEvent = _state.pointList.find(elem => elem.event_id === data.event_id);
    if (!foundEvent) _state.pointList = [..._state.pointList, data];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
