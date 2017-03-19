<template>
  <div>
    <div class="title">
      <img src="/cgss.png">
      <p class="md-display-2">{{ $t('main.hello') }} {{ msg }}</p>
    </div>

    <md-snackbar md-position="top center" ref="Subscribe" :md-duration="100000">
      <span>We're now using <a href="https://onesignal.com/">OneSignal</a> for notifications such as Event start/end alert.</span>
      <md-button @click.native="handleSubscribe">Subscribe</md-button>
      <md-button class="md-accent" @click.native="$refs.Subscribe.close()">No Interest</md-button>
    </md-snackbar>

    <md-snackbar md-position="top center" ref="ThankSubscribe" :md-duration="2000">
      <span>Thanks for your subscribing!</span>
      <md-button class="md-accent" @click.native="$refs.ThankSubscribe.close()">Dismiss</md-button>
    </md-snackbar>
    
    <div class="title" v-if="Object.keys(now_data.comm_data).length">
      <p class="md-title">{{ $t('event.now_title') }}</p>
      <p class="md-display-1 no-margin">{{ now_data.comm_data.name }}</p>
      <p class="md-subtitle">{{ $t(`event.${now_data.comm_data.type.toLowerCase()}_name`) }}</p>
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
      <div v-if="(new Date(now_data.comm_data.event_end)) > (new Date())">
      <p class="md-title">{{ $t('event.reward_cards') }}</p>
        <div class="card-container" v-if="now_data.detail">
            <Card class="reward-card" v-for="card in now_data.detail.available" :card-id="card.reward_id" :key="card.reward_id"></Card>
        </div>
      </div>
    </div>

    <div class="title" v-if="Object.keys(next_data.comm_data).length">
      <p class="md-title">{{ $t('event.next_title') }}</p>
      <p class="md-display-1 no-margin">{{ next_data.comm_data.name }}</p>
      <p class="md-subtitle">{{ $t(`event.${next_data.comm_data.type.toLowerCase()}_name`) }}</p>
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

/* global OneSignal:true */
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
    handleSubscribe() {
      OneSignal.registerForPushNotifications();
      this.$refs.Subscribe.close();
    },
  },
  mounted() {
    if (!Object.keys(this.now_data.comm_data).length) {
      this.getNowEvent().then((res) => {
        this.getDetail(res.comm_data.id);
      });
    }
    // event.point(1012).then(res => console.log(res));
    if (!Object.keys(this.next_data.comm_data).length) {
      this.getNextEvent();
    }
    OneSignal.push(() => {
      OneSignal.isPushNotificationsEnabled().then((isEnabled) => {
        if (!isEnabled) this.$refs.Subscribe.open();
      });
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        // console.log("The user's subscription state is now:", isSubscribed, this.$refs);
        if (isSubscribed) this.$refs.ThankSubscribe.open();
      });
    });
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

.no-margin {
  margin: 0;
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
