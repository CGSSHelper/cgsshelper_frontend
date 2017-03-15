<template>
  <div>
    <div class="title">
      <img src="../assets/cgss.png">
      <p class="md-display-2">{{ $t('main.hello') }} {{ msg }}</p>
    </div>
    
    <div class="title" v-if="Object.keys(now_data.comm_data).length">
      <p class="md-title">{{ $t('event.now_title') }}</p>
      <p class="md-display-1">{{ now_data.comm_data.name }}</p>
      <div v-if="(new Date(now_data.comm_data.event_end)) > (new Date())">
        <p class="md-title">{{ $t('event.event_end_countdown') }}</p>
        <countdown :target-time="now_data.comm_data.event_end"></countdown>
      </div>
      <div v-else-if="(new Date(now_data.comm_data.result_start)) > (new Date())">
        <p class="md-title">{{ $t('event.result_start_countdown') }}</p>
        <countdown :target-time="now_data.comm_data.result_start"></countdown>
      </div>
      <div v-else-if="(new Date(now_data.comm_data.result_end)) > (new Date())">
        <p class="md-title">{{ $t('event.result_end_countdown') }}</p>
        <countdown :target-time="now_data.comm_data.result_end"></countdown>
      </div>
      <p class="md-title">{{ $t('event.background_image') }}</p>
      <md-button class="md-primary md-raised" v-if="!show_bg_img" @click.native="show_bg_img = !show_bg_img">show image</md-button>
      <img v-if="show_bg_img" @click.native="show_bg_img = !show_bg_img" v-lazy="api_addr + now_data.comm_data.bg_url" style="max-width: 100%"/>
      <p class="md-title">{{ $t('event.reward_cards') }}</p>
      <div class="card-container" v-if="now_data.detail">
          <Card class="reward-card" v-for="card in now_data.detail.available" :card-id="card.reward_id" :key="card.reward_id"></Card>
      </div>
    </div>

    <div class="title" v-if="Object.keys(next_data.comm_data).length">
      <p class="md-title">{{ $t('event.next_title') }}</p>
      <p class="md-display-1">{{ next_data.comm_data.name }}</p>
      <p class="md-title">{{ $t('event.next_countdown') }}</p>
      <Countdown :target-time="next_data.comm_data.event_start.replace('2099', (new Date()).getFullYear())"></Countdown>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import Card from './utils/Card';
import Countdown from './utils/Countdown';

/* global BUILD_VERSION:true */
export default {
  name: 'hello',
  data() {
    return {
      msg: 'CGSS Helper',
      api_addr: Vue.config.api_addr,
      show_bg_img: false,
    };
  },
  components: {
    Countdown,
    Card,
  },
  computed: {
    ...mapState({
      now_data(state) {
        return Object.assign({}, state.event.nowEvent,
          state.event.eventList.find(elem =>
            elem.comm_data.id === state.event.nowEvent.comm_data.id));
      },
      next_data: state => state.event.nextEvent,
    }),
  },
  methods: {
    ...mapActions(['getNowEvent', 'getNextEvent', 'getDetail']),
  },
  mounted() {
    this.getNowEvent().then((res) => {
      this.getDetail(res.comm_data.id);
    });
    // event.point(1012).then(res => console.log(res));
    this.getNextEvent();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: center;
}

.event-name {

}

.card-container {
  display: flex;
  justify-content: center;
}

.reward-card {
  width: 100%;
  max-width: 320px;
  margin: 8px 10px;
}

@media (max-width: 768px) {
  .card-container {
    flex-direction:column;
    align-items: center;
  }
  
  .reward-card {
    margin: 8px 0px;
  }
}
</style>
