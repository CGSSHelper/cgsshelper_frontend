<template>
  <md-card>
    <md-card-media v-if="card_data.full_url">
      <img v-lazy="api_addr + card_data.full_url" alt="People">
    </md-card-media>

    <md-card-header>
      <div class="md-title" :class="attribute_class[card_data.attribute]">{{card_data.name}}</div>
    </md-card-header>

    <md-card-expand>
      <md-card-actions>
        <md-button class="md-icon-button" md-expand-trigger>
          <md-icon>keyboard_arrow_down</md-icon>
        </md-button>
      </md-card-actions>
      <md-card-content>
        <div class="card-red md-body-2">Vocal <span>{{card_data.vocal_min}} / {{card_data.vocal_max}}</span> <md-progress :md-progress="card_data.vocal_min/card_data.vocal_max*100" md-theme="red"></md-progress></div>
        <div class="card-blue md-body-2">Dance <span>{{card_data.dance_min}} / {{card_data.dance_max}}</span> <md-progress :md-progress="card_data.dance_min/card_data.dance_max*100" md-theme="blue"></md-progress></div>
        <div class="card-yellow md-body-2">Visual <span>{{card_data.visual_min}} / {{card_data.visual_max}}</span> <md-progress :md-progress="card_data.visual_min/card_data.visual_max*100" md-theme="orange"></md-progress></div>
      </md-card-content>
    </md-card-expand>

  </md-card>
</template>

<script>
import Vue from 'vue';
import card from '../../api/card';

export default {
  name: 'card',
  props: ['cardId'],
  data() {
    return {
      card_data: {},
      api_addr: Vue.config.api_addr,
      attribute_class: ['', 'card-red', 'card-blue', 'card-yellow'],
    };
  },
  mounted() {
    card.detail(this.cardId).then((res) => {
      this.card_data = res;
    });
  },
};
</script>

<style scoped>
.card-red {
  color: #ff2a2a;
}

.card-blue {
  color: dodgerblue;
}

.card-yellow {
  color: darkorange;
}
</style>
