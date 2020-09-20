<template>
<div>
  <div id="game">
    <img class="hamburger-icon" src="../assets/hamburger.png">
    <img class="online-icon" src="../assets/online.png">
    <HelpCircleIcon class="help-icon" v-on:click="showHelp(true)" />
    <AlertCircleIcon class="info-icon" v-on:click="showInfo(true)" />
    <h1>X<MinusIcon />OP<MinusIcon />X</h1>
    <div class="game-container">
      <div id="actions">
        <button class="level-select-button" v-on:click="showLevelSelect(true)">{{currentLevel.name}}</button>
        <button class="skip" :class="{disabled: turn === 0}" v-on:click="onSkipButtonClicked()">Skip Turn</button>
        <div id="dices">
          <div class="numbers"> 
            <Dice type="number" :id="1" />
            <Dice type="number" :id="2" />
            <Dice type="number" :id="3" />
          </div>
          <div class="colors">
            <Dice type="color" :id="4"/>
            <Dice type="color" :id="5"/>
            <Dice type="color" :id="6"/>
          </div>
        </div>
        <button class="roll" :class="{disabled: !nextTurnIsPossible}" v-on:click="onRollButtonClicked()">{{turn === 0 ? 'Start' : turn === 30 ? 'Finish' : 'Next turn'}}</button>
      </div>
      <div class="sheet-container">
        <TurnCounter />
        <Sheet />
        <Jokers />
      </div>
      <Score />
      <Finish v-if="isFinished"/>
      <Help v-if="help" />
      <Info v-if="info" />
      <LevelSelect v-if="levelSelect" />
    </div>
  </div>
</div>

</template>

<script>
import Sheet from './Sheet.vue';
import Dice from './Dice.vue';
import TurnCounter from './TurnCounter.vue';
import Score from './Score.vue';
import Jokers from './Jokers.vue';
import Finish from './Finish.vue';
import Help from './Help.vue';
import Info from './Info.vue';
import LevelSelect from './LevelSelect.vue';

import { mapActions, mapGetters, mapMutations } from 'vuex';

import { HelpCircleIcon, AlertCircleIcon, MinusIcon } from 'vue-feather-icons'


export default {
  name: 'Game',
  computed: {
    ...mapGetters([
      "turn", 
      "nextTurnIsPossible", 
      "isFinished", 
      "help", 
      "info", 
      "levelSelect", 
      "currentLevel"
      ]),
  },
  components: {
    Sheet,
    Dice,
    TurnCounter,
    Score,
    Jokers,
    Finish,
    Help,
    Info,
    HelpCircleIcon,
    AlertCircleIcon,
    LevelSelect,
    MinusIcon,
  },
  methods: {
    ...mapActions(["rollTheDie"]),
    ...mapMutations(["showHelp", "showLevelSelect", "showInfo"]),
    onRollButtonClicked: function () {
      if(this.nextTurnIsPossible){
        this.rollTheDie(false)
      }
    },
    onSkipButtonClicked: function () {
      if(this.turn > 0){
        this.rollTheDie(true)
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game{
  position: relative;
  padding:20px 40px 40px 40px;
  border: solid 4px white;
}

h1{
  color: white;
  font-size: 71px;
  margin:0 0 10px 0;
}
h1 svg{
  width:50px;
  height:50px;
}

.hamburger-icon, .online-icon, .help-icon, .info-icon{
  position: absolute;
}

.help-icon, .info-icon{
  color: white;
  right: 20px;
  width: 35px;
  height: 35px;
  top: 20px;
  cursor: pointer;
}
.info-icon{
  right: 65px;
}
.help-icon:hover, .info-icon:hover{
  fill: #b4004e;
}

.hamburger-icon{
  width:60px;
  height: 60px;
  left:-33px;
  top:40px;
}

.online-icon{
  width:60px;
  right:-60px;
  top:50px;
}

.game-container{
  display: flex;
}
.sheet-container{
  display: flex;
  flex-direction: column;
}

#actions{
  margin-right:20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 2px;
}

button{
  width:176px;
  background-color:white;
  color: #043d48;
  border:none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;;
}

.skip, .level-select-button{
  height: 35px;
  margin: 10px 2px 2px;
}

.roll{
  width:176px;
  height:74px;
  margin-top:3px;

  font-weight: bold;
  font-size: 20px;
}

button.disabled{
  cursor: not-allowed;
  opacity: 0.5;
}

#dices{
  display: flex;
  flex-direction: row;
}
</style>

<style>
  div, span{
    box-sizing: border-box;
  }

  .cell{
    display: inline-flex;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin:2px;
  }
</style>

