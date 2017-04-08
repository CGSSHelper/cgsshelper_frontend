<template>
  <div>
    <p class="md-title">{{ $t('event.party_name') }}</p>
    <md-layout md-column-small md-gutter="8">
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.remaining_time')}}</label>
          <md-input v-model="remainTime" type="number" min="0"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-button @click.native="handleRemainingTime">
          {{ isCurrRemainTime ? $t('calc.not_use_current_remain') : $t('calc.use_current_remain') }}
        </md-button>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.unused_stamina')}}</label>
          <md-input v-model="unusedStamina" type="number" min="0"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.party.difficulty')}}</label>
          <md-select v-model="party.difficulty">
            <md-option value="2">Pro</md-option>
            <md-option value="3">Master</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-column-small md-gutter="8">
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.current_level')}}</label>
          <md-input v-model="currLevel" type="number" min="1"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.current_exp')}}</label>
          <md-input v-model="currExp" type="number" min="1"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.current_stamina')}}</label>
          <md-input v-model="currStamina" type="number" min="0"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-column-small md-gutter="8">
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.target_point')}}</label>
          <md-input v-model="tarPoint" type="number" min="1"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.current_point')}}</label>
          <md-input v-model="currPoint" type="number" min="0"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.remaining_item')}}</label>
          <md-input v-model="remainItem" type="number" min="0"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-column-small md-gutter="8">
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.stamina_30')}}</label>
          <md-input v-model="stamina[0]" type="number" min="0"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.stamina_20')}}</label>
          <md-input v-model="stamina[1]" type="number" min="0"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{$t('calc.stamina_10')}}</label>
          <md-input v-model="stamina[2]" type="number" min="0"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout>
      <md-button style="width: 100%;" class="md-raised md-primary" @click.native="calcParty">DO CALCULATE!</md-button>
    </md-layout>
    <result-dialog :result="calcResult" ref="resultDialog"></result-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as Calc from '@/utils/Calculator';
import resultDialog from './Result';

export default {
  name: 'calculator',
  components: {
    resultDialog,
  },
  data() {
    return {
      remainTime: 0,
      isCurrRemainTime: false,
      currRemainTimer: null,
      unusedStamina: 0,
      currLevel: 1,
      currStamina: 0,
      currExp: 1,
      tarPoint: 1,
      currPoint: 0,
      remainItem: 0,
      stamina: [0, 0, 0],
      party: {
        difficulty: '3',
      },
      calcResult: {},
    };
  },
  computed: {
    ...mapState({
      now_data(state) {
        return Object.assign({}, state.event.nowEvent,
          state.event.eventList.find(elem =>
            elem.comm_data.id === state.event.nowEvent.comm_data.id));
      },
    }),
  },
  methods: {
    ...mapActions(['getNowEvent', 'getNextEvent', 'getEventDetail']),
    calcParty() {
      this.calcResult = {
        ...Calc.calcParty({
          restTime: this.remainTime,
          wasteTime: this.unusedStamina,
          partyLevel: this.party.difficulty,
          userInfo: {
            myLevel: this.currLevel,
            myExp: this.currExp,
            hasLP: this.currStamina,
            wantEventPt: this.tarPoint,
            hasEventPt: this.currPoint,
            hasItem: this.remainItem,
            hasLP30: this.stamina[0],
            hasLP20: this.stamina[1],
            hasLP10: this.stamina[2],
          },
        }),
        type: 'party',
      };
      this.$refs.resultDialog.open();
      this.$ga.trackEvent('calc', 'click', 'party');
    },
    handleRemainingTime() {
      this.isCurrRemainTime = !this.isCurrRemainTime;
      if (this.isCurrRemainTime) {
        if (!Object.keys(this.now_data.comm_data).length) {
          this.getNowEvent().then((res) => {
            this.getEventDetail(res.comm_data.id);
            this.currRemainTimer = setInterval(() => {
              const targetTimeSec = Math.trunc(
                (new Date(this.now_data.comm_data.event_end)).getTime() / 1000);
              this.remainTime = targetTimeSec - Math.trunc((new Date()).getTime() / 1000);
              if (this.remainTime < 0) this.remainTime = 0;
            }, 1000);
          });
        } else {
          this.currRemainTimer = setInterval(() => {
            const targetTimeSec = Math.trunc(
              (new Date(this.now_data.comm_data.event_end)).getTime() / 1000);
            this.remainTime = targetTimeSec - Math.trunc((new Date()).getTime() / 1000);
            if (this.remainTime < 0) this.remainTime = 0;
          }, 1000);
        }
      } else {
        this.remainTime = 0;
        clearInterval(this.currRemainTimer);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
