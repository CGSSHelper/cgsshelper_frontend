<template>
  <md-tabs md-fixed>
    <md-tab id="atapon" :md-label="$t('event.atapon_name')">
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
      </md-layout>
      <md-layout md-column-small md-gutter="8">
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.atapon.normal_consum_stamina')}}</label>
            <md-input v-model="atapon.normalConsumStamina" type="number" min="10" max="19"></md-input>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.atapon.normal_point_level')}}</label>
            <md-select v-model="atapon.normalPointLevel">
              <md-option value="0">D</md-option>
              <md-option value="1">C</md-option>
              <md-option value="2">B</md-option>
              <md-option value="3">A</md-option>
              <md-option value="4">S</md-option>
            </md-select>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.atapon.normal_multiplex')}}</label>
            <md-select v-model="atapon.normalMultiplex">
              <md-option value="1">1x</md-option>
              <md-option value="2">2x</md-option>
              <md-option value="4">4x</md-option>
            </md-select>
          </md-input-container>
        </md-layout>
      </md-layout>
      <md-layout md-column-small md-gutter="8">
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.atapon.event_consum_item')}}</label>
            <md-select v-model="atapon.eventConsumItem">
              <md-option value="0">75</md-option>
              <md-option value="1">90</md-option>
              <md-option value="2">120</md-option>
              <md-option value="3">150</md-option>
            </md-select>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.atapon.event_point_level')}}</label>
            <md-select v-model="atapon.eventPointLevel">
              <md-option value="0">D</md-option>
              <md-option value="1">C</md-option>
              <md-option value="2">B</md-option>
              <md-option value="3">A</md-option>
              <md-option value="4">S</md-option>
            </md-select>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.atapon.event_multiplex')}}</label>
            <md-select v-model="atapon.eventMultiplex">
              <md-option value="1">1x</md-option>
              <md-option value="2">2x</md-option>
              <md-option value="4">4x</md-option>
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
        <md-button style="width: 100%;" class="md-raised md-primary" @click.native="calcAtapon">DO CALCULATE!</md-button>
      </md-layout>
    </md-tab>
    <md-tab id="medley" :md-label="$t('event.medley_name')">
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
      </md-layout>
      <md-layout md-column-small md-gutter="8">
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.medley.medley_difficulty')}}</label>
            <md-select v-model="medley.medleyDifficulty">
              <md-option value="0">Debut</md-option>
              <md-option value="1">Regular</md-option>
              <md-option value="2">Pro</md-option>
              <md-option value="3">Master</md-option>
            </md-select>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.medley.encore_difficulty')}}</label>
            <md-select v-model="medley.encoreDifficulty">
              <md-option value="0">Debut</md-option>
              <md-option value="1">Regular</md-option>
              <md-option value="2">Pro</md-option>
              <md-option value="3">Master</md-option>
              <md-option value="4">Master+</md-option>
            </md-select>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.medley.encore_score_level')}}</label>
            <md-select v-model="medley.encoreScoreLevel">
              <md-option value="0">D</md-option>
              <md-option value="1">C</md-option>
              <md-option value="2">B</md-option>
              <md-option value="3">A</md-option>
              <md-option value="4">S</md-option>
            </md-select>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{$t('calc.medley.hakoyure_level')}}</label>
            <md-select v-model="medley.hakoyureLevel">
              <md-option v-for="i in 21" :value="i-1">{{i-1}}</md-option>
              <md-option :value="21">21~30</md-option>
              <md-option :value="22">31~40</md-option>
              <md-option :value="23">41~50</md-option>
              <md-option :value="24">51~</md-option>
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
        <md-button style="width: 100%;" class="md-raised md-primary" @click.native="calcMedley">DO CALCULATE!</md-button>
      </md-layout>
    </md-tab>
    <md-tab id="party" :md-label="$t('event.party_name')">
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
    </md-tab>
    <md-dialog ref="resultDialog" v-if="calcResult">
      <md-dialog-title>{{$t('calc.result')}}</md-dialog-title>

      <md-dialog-content>
        <p v-if="calcResult.type === 'atapon'">{{$t('calc.result.normal_times')}}: {{calcResult.normalTimes}}</p>
        <p>{{$t('calc.result.event_times')}}: {{calcResult.eventTimes}}</p>
        <p>{{$t('calc.result.total_time')}}: {{calcResult.totalTime}}</p>
        <p>{{$t('calc.result.final_point')}}: {{calcResult.hasPT}}</p>
        <p v-if="calcResult.type === 'atapon'">{{$t('calc.result.final_items')}}: {{calcResult.hasItem}}</p>
        <p>{{$t('calc.result.final_level')}}: {{calcResult.Lv}}</p>
        <p>{{$t('calc.result.final_exp')}}: {{calcResult.Exp}} / {{calcResult.totalExp}}</p>
        <p>{{$t('calc.result.consum_stamina')}}: {{calcResult.useLP}}</p>
        <p>{{$t('calc.result.consum_stone')}}: {{calcResult.useLC}}</p>
        <p v-if="calcResult.isWarn"><b>{{$t('calc.result.warning')}}</b></p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('resultDialog')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-tabs>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as Calc from '../utils/Calculator';

export default {
  name: 'calculator',
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
      atapon: {
        normalConsumStamina: 19,
        normalPointLevel: '4',
        normalMultiplex: '1',
        eventConsumItem: '0',
        eventPointLevel: '4',
        eventMultiplex: '1',
      },
      medley: {
        medleyDifficulty: '3',
        encoreDifficulty: '4',
        encoreScoreLevel: '4',
        encoreFailPossibility: 0,
        hakoyureLevel: 23,
      },
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
    ...mapActions(['getNowEvent', 'getNextEvent', 'getDetail']),
    calcAtapon() {
      this.calcResult = {
        ...Calc.calcAtapon({
          restTime: this.remainTime,
          wasteTime: this.unusedStamina,
          normalLP: this.atapon.normalConsumStamina - 10,
          normalScore: this.atapon.normalPointLevel,
          useItem: this.atapon.eventConsumItem,
          eventScore: this.atapon.eventPointLevel,
          useMulti: this.atapon.eventMultiplex,
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
        type: 'atapon',
      };
      this.$refs.resultDialog.open();
    },
    calcMedley() {
      this.calcResult = {
        ...Calc.calcMedley({
          restTime: this.remainTime,
          wasteTime: this.unusedStamina,
          medleyLevel: this.medley.medleyDifficulty,
          encoreLevel: this.medley.encoreDifficulty,
          encoreScore: this.medley.encoreScoreLevel,
          encoreFail: this.medley.encoreFailPossibility,
          hakoyureLevel: this.medley.hakoyureLevel,
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
        type: 'medley',
      };
      this.$refs.resultDialog.open();
    },
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
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    handleRemainingTime() {
      this.isCurrRemainTime = !this.isCurrRemainTime;
      if (this.isCurrRemainTime) {
        if (!Object.keys(this.now_data.comm_data).length) {
          this.getNowEvent().then((res) => {
            this.getDetail(res.comm_data.id);
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
