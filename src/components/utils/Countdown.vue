<template>
  <md-layout md-row>
    <md-layout md-column>
      <p class="md-display-2 no-margin">{{days}}</p>
      <p class="md-subheading no-margin">Days</p>
    </md-layout>
    <md-layout md-column>
      <p class="md-display-2 no-margin">{{hours}}</p>
      <p class="md-subheading no-margin">Hours</p>
    </md-layout>
    <md-layout md-column>
      <p class="md-display-2 no-margin">{{minutes}}</p>
      <p class="md-subheading no-margin">Minutes</p>
    </md-layout>
    <md-layout md-column>
      <p class="md-display-2 no-margin">{{seconds}}</p>
      <p class="md-subheading no-margin">Seconds</p>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'countdown',
  data() {
    return {
      timeNow: Math.trunc((new Date()).getTime() / 1000),
    };
  },
  props: ['targetTime'],
  computed: {
    toTargetTime() {
      if (this.targetTime) {  // make sure we can calculate
        const targetTimeSec = Math.trunc((new Date(this.targetTime)).getTime() / 1000);
        return targetTimeSec - this.timeNow;
      }
      return -1;
    },
    days() {
      return Math.trunc(this.toTargetTime / 60 / 60 / 24);
    },
    hours() {
      return Math.trunc(this.toTargetTime / 60 / 60) % 24;
    },
    minutes() {
      return Math.trunc(this.toTargetTime / 60) % 60;
    },
    seconds() {
      return this.toTargetTime % 60;
    },
  },
  mounted() {
    setInterval(() => {
      this.timeNow = Math.trunc((new Date()).getTime() / 1000);
    }, 1000);
  },
};
</script>

<style scoped>
.no-margin {
  margin: 0;
}
</style>
