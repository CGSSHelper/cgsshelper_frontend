<template>
  <md-whiteframe>
    <p class="md-title">{{ $t('point.title') }}</p>
    <md-layout md-column-small md-gutter="8">
      <md-layout>
        <md-input-container>
          <label>{{$t('point.select_event')}}</label>
          <md-select v-model="selectedEvent" @change="handleEventChange">
            <md-option v-for="(epd, index) in eventPointDataList" :value="index">{{epd.id}} - {{epd.name}}</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('point.select_throttle')}}</label>
          <md-select v-model="selectedInterval">
            <md-option :value="0">{{$t('point.select_throttle_option_0')}}</md-option>
            <md-option :value="1">{{$t('point.select_throttle_option_1')}}</md-option>
            <md-option :value="2">{{$t('point.select_throttle_option_2')}}</md-option>
            <md-option :value="3">{{$t('point.select_throttle_option_3')}}</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
    </md-layout>
    <p v-if="selectedEvent !== null">{{$t('point.selected_event')}}: {{eventPointDataList[selectedEvent].name}}</p>
    <p v-if="!isChartReady && selectedEvent !== null">Waiting for chart loading....</p>
    <vue-chart
        :columns="pointColumns"
        :rows="pointRows"
        :options="{
          height: 500,
          title: `${this.eventPointDataList[this.selectedEvent].name} Point Rank Chart`,
          curveType: 'function',
          hAxis: {
            title: 'Event Time',
            baseline: 0,
          },
          vAxis: {
            title: 'Event Point',
            baseline: 0,
          },
          focusTarget: 'category'
        }"
        :chartEvents="chartEvents"
        v-if="eventPoints.length"
    ></vue-chart>
    <vue-chart
        :columns="pointColumns"
        :rows="pointRows"
        :options="{
          height: 500,
          title: `${this.eventPointDataList[this.selectedEvent].name} Score Rank Chart`,
          curveType: 'function',
          hAxis: {
            title: 'Event Time',
            baseline: 0,
          },
          vAxis: {
            title: 'Event Point',
            baseline: 0,
          },
          focusTarget: 'category'
        }"
        :chartEvents="chartEvents"
        v-if="eventScores.length"
    ></vue-chart>
  </md-whiteframe>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'event-point',
  data() {
    return {
      isChartReady: false,
      selectedEvent: null,
      selectedInterval: 0,
      chartEvents: {
        /* eslint no-extra-bind: 0 */
        ready: (() => {
          this.isChartReady = true;
        }).bind(this),
        /* end eslint no-extra-bind */
      },
    };
  },
  mounted() {
    this.getEventAll();
  },
  computed: {
    ...mapState(['point']),
    ...mapGetters(['eventPointDataList']),
    eventPoints() {
      if (!this.point.pointList.length || this.selectedEvent === null) return [];
      const ret = this.point.pointList.find(
        elem => elem.event_id === this.eventPointDataList[this.selectedEvent].id);
      return (ret && ret.point_ranks.length) ? ret.point_ranks : [];
    },
    pointColumns() {
      if (this.eventPoints.length) {
        return [{
          type: 'number',
          label: 'ID',
        }, {
          type: 'number',
          label: '2000',
        }, {
          type: 'number',
          label: '5000',
        }, {
          type: 'number',
          label: '10000',
        }, {
          type: 'number',
          label: '20000',
        }, {
          type: 'number',
          label: '50000',
        }];
      }
      return [];
    },
    pointRows() {
      if (this.eventPoints.length) {
        const interval = [96, 48, 4, 1];
        return this.eventPoints
          .filter((elem, idx, arr) =>
            idx % interval[this.selectedInterval] === 0 || idx === arr.length - 1)
          .map((elem, idx) => ([
            idx,
            elem.level1,
            elem.level2,
            elem.level3,
            elem.level4,
            elem.level5,
          ]));
      }
      return [];
    },
    eventScores() {
      if (!this.point.pointList.length || this.selectedEvent === null) return [];
      const ret = this.point.pointList.find(
        elem => elem.event_id === this.eventPointDataList[this.selectedEvent].id);
      return (ret && ret.score_ranks.length) ? ret.score_ranks : [];
    },
    scoreColumns() {
      if (this.eventScores.length) {
        return [{
          type: 'number',
          label: 'ID',
        }, {
          type: 'number',
          label: '5000',
        }, {
          type: 'number',
          label: '1000',
        }, {
          type: 'number',
          label: '50000',
        }];
      }
      return [];
    },
    scoreRows() {
      if (this.eventScores.length) {
        const interval = [96, 48, 4, 1];
        return this.eventScores
          .filter((elem, idx, arr) =>
            idx % interval[this.selectedInterval] === 0 || idx === arr.length - 1)
          .map((elem, idx) => ([
            idx,
            elem.level1,
            elem.level2,
            elem.level3,
          ]));
      }
      return [];
    },
  },
  methods: {
    ...mapActions(['getEventPoint', 'getEventAll']),
    handleEventChange(idx) {
      const { id } = this.eventPointDataList[idx];
      this.getEventPoint(id);
    },
  },
};
</script>

<style scoped>
</style>
