<template>
  <md-card>
    <md-card-header>
      <md-avatar class="md-large">
        <img v-if="card_data[showCard].avatar_url" v-lazy="api_addr + card_data[showCard].avatar_url" alt="People">
      </md-avatar>
      <md-card-header-text>
        <div class="md-subheading" :class="attribute_class[card_data[0].attribute]">{{card_data[showCard].name}}</div>
      </md-card-header-text>
      <md-switch v-model="isEvolved"></md-switch>
      <md-tooltip md-direction="top">Switch evolved/unevolved card</md-tooltip>
    </md-card-header>

    <md-card-media v-if="card_data[showCard].full_url">
      <img v-lazy="api_addr + card_data[showCard].full_url" alt="People">
    </md-card-media>

    <md-card-content>
      <div class="card-red md-body-2">
        Vocal <span>{{card_data[showCard].vocal_min}} / {{card_data[showCard].vocal_max}}</span>
        <!--<md-progress :md-progress="card_data[0].vocal_max/card_data[1].vocal_max*100" md-theme="red"></md-progress>-->
      </div>
      <div class="card-blue md-body-2">
        Dance <span>{{card_data[showCard].dance_min}} / {{card_data[showCard].dance_max}}</span>
        <!--<md-progress :md-progress="card_data[0].dance_max/card_data[1].dance_max*100" md-theme="blue"></md-progress>-->
      </div>
      <div class="card-yellow md-body-2">
        Visual <span>{{card_data[showCard].visual_min}} / {{card_data[showCard].visual_max}}</span>
        <!--<md-progress :md-progress="card_data[0].visual_max/card_data[1].visual_max*100" md-theme="orange"></md-progress>-->
      </div>
    </md-card-content>

    <!--<md-card-expand>
      <md-card-actions>
        <md-button class="md-icon-button" md-expand-trigger>
          <md-icon>keyboard_arrow_down</md-icon>
        </md-button>
      </md-card-actions>
    </md-card-expand>-->

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
      card_data: [],
      api_addr: Vue.config.api_addr,
      attribute_class: ['', 'card-red', 'card-blue', 'card-yellow'],
      isEvolved: false,
    };
  },
  computed: {
    showCard() {
      return Number(this.isEvolved);
    },
  },
  mounted() {
    card.detail(this.cardId).then((res) => {
      this.card_data.push(res);
      return card.detail(Number(this.cardId) + 1);
    }).then(res => this.card_data.push(res));
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
