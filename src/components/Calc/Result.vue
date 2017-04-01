<template>
  <md-dialog ref="resultDialog" v-if="result">
    <md-dialog-title>{{$t('calc.result')}}</md-dialog-title>

    <md-dialog-content>
      <p v-if="result.type === 'atapon'">{{$t('calc.result.normal_times')}}: {{result.normalTimes}}</p>
      <p>{{$t('calc.result.event_times')}}: {{result.eventTimes}}</p>
      <p>{{$t('calc.result.total_time')}}: {{result.totalTime}}</p>
      <p>{{$t('calc.result.final_point')}}: {{result.hasPT}}</p>
      <p v-if="result.type === 'atapon'">{{$t('calc.result.final_items')}}: {{result.hasItem}}</p>
      <p>{{$t('calc.result.final_level')}}: {{result.Lv}}</p>
      <p>{{$t('calc.result.final_exp')}}: {{result.Exp}} / {{result.totalExp}}</p>
      <p>{{$t('calc.result.consum_stamina')}}: {{result.useLP}}</p>
      <p>{{$t('calc.result.consum_stone')}}: {{result.useLC}}</p>
      <p v-if="result.isWarn"><b>{{$t('calc.result.warning')}}</b></p>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="close()">Ok</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  name: 'resultDialog',
  props: ['result'],
  methods: {
    close() {
      this.$refs.resultDialog.close();
    },
    open() {
      this.$refs.resultDialog.open();
    },
  },
};
</script>
