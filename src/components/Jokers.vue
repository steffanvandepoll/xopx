<template>
  <div class="jokers">
    <div class="label">
        <span class="dice number">?</span>
        <MinusIcon class="minus" />
        <span class="dice color"></span>
        <PauseIcon class="equals"/>
    </div>
    <div class="joker-container">
    <div class="joker" v-for="i in jokersMax" :key="i" :class="{used: i <= jokersUsed, active: i <= getActiveJokers()}">
        !
        <CircleIcon  />
        <XIcon class="x" />
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CircleIcon, XIcon, MinusIcon, PauseIcon } from 'vue-feather-icons'

export default {
  name: 'Jokers',
  computed: {
    ...mapGetters(["jokersMax", "jokersUsed", "numberDice", "colorDice"]),
  },
  components: {
    CircleIcon,
    XIcon,
    MinusIcon,
    PauseIcon
  },
  methods: {
    getActiveJokers: function () {
        let activeJokers = this.jokersUsed;
        
        if(this.colorDice && this.colorDice.value === "black"){
            activeJokers++;
        }
        if(this.numberDice && this.numberDice.value === "?"){
            activeJokers++;
        }

        return activeJokers;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.joker{
    position: relative;
    width: 32px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
}
.joker svg{
    position: absolute;
    width: 27px;
    height: 27px;
}
.x{
    color: transparent;
}
.joker.used .x{
    color: #043d48;
}
.joker.used{
    opacity: 0.5;
}

.joker.active{
    color: red;
}
.joker.used.active{
    color:#043d48;
}

.jokers{
    display: flex;
    color: #043d48;
    height:35px;
    margin:10px 2px 2px;
}
.label{
    display: flex;
    background: white;
    height: 100%;
    align-items: center;
    border-radius: 5px 0 0 5px;
    padding-left:3px;
    position: relative;
}
.label .minus{
    position: absolute;
    left: 19px;
    width:35px;
    height:35px;
    transform: rotate(110deg);
}
.label .equals{
    transform: rotate(90deg);
    margin-left:2px;
    width: 14px;
    height: 14px;
    fill: #043d48;
}
.dice{
    width:25px;
    height:25px;
    margin:2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
}
.dice.number{
    background: #043d48;
    color: white;
    margin-right: 12px;
}
.dice.color:after{
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: #043d48;
}
.dice.color{
    border: solid 2px #043d48;
    position: relative;
}

.joker-container{
    background: white;
    border-radius: 0 5px 5px 0;
    display: flex;
    padding-right: 7px;
}
</style>