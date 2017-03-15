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
          <md-input-container>
            <label>{{$t('calc.unused_stamina')}}</label>
            <md-input v-model="unusedStamina" type="number" min="0"></md-input>
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
          <md-input-container>
            <label>{{$t('calc.unused_stamina')}}</label>
            <md-input v-model="unusedStamina" type="number" min="0"></md-input>
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
        <p>{{$t('calc.result.normal_times')}}: {{calcResult.normalTimes}}</p>
        <p>{{$t('calc.result.event_times')}}: {{calcResult.eventTimes}}</p>
        <p>{{$t('calc.result.total_time')}}: {{calcResult.totalTime}}</p>
        <p>{{$t('calc.result.final_point')}}: {{calcResult.hasPT}}</p>
        <p v-if="calcResult.hasItem">{{$t('calc.result.final_items')}}: {{calcResult.hasItem}}</p>
        <p>{{$t('calc.result.final_level')}}: {{calcResult.Lv}}</p>
        <p>{{$t('calc.result.final_exp')}}: {{calcResult.Exp}} / {{calcResult.totalExp}}</p>
        <p>{{$t('calc.result.consum_stamina')}}: {{calcResult.useLP}}</p>
        <p>{{$t('calc.result.consum_stone')}}: {{calcResult.useLC}}</p>
        <p v-if="calcResult.isWarn">{{$t('calc.result.warning')}}</p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('resultDialog')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-tabs>
</template>

<script>
import * as Calc from '../utils/Calculator';

export default {
  name: 'calculator',
  data() {
    return {
      remainTime: 0,
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
      },
      party: {
      },
      calcResult: {},
    };
  },
  methods: {
    calcAtapon() {
      this.calcResult = Calc.calcAtapon({
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
      });
      this.$refs.resultDialog.open();
    },
    calcMedley() {
      this.$refs.resultDialog.open();
    },
    calcParty() {
      this.$refs.resultDialog.open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
