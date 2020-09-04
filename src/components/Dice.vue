<template>    
  <div v-on:click="selectDie()" class="dice" :class="{rolling: rolling, selected: selected, disabled: !active}">
    <div class="container"> 
      <div v-if="rolling" class="loader">
        <RefreshCcwIcon />
      </div>
      <div v-else>
        <div v-if="type == 'number'" :class="{decrease: selectionCount > 0 && selected}">
          {{selected ? (side === '?' ? '?' : side-selectionCount) : side}}
        </div> 
        <CircleIcon v-else class="color" :class="[side, currentColor]" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { RefreshCcwIcon, CircleIcon } from 'vue-feather-icons'

export default {
  name: 'Dice',
  props: {
    type: String,
    id: Number
  },
  computed: {
    ...mapGetters(["rolling", "numberDice", "colorDice", "currentColor", "selectionCount"]),
  },
   components: {
    RefreshCcwIcon,
    CircleIcon,
  },
  watch: {
    rolling: {
      deep: true,
      handler(rolling) {
        //rolling is done, select a number or color
        this.active = true;
        this.selected = false;
        if(!rolling){
          let randomSide = Math.floor(Math.random()*6);
          this.side = this.$props.type === 'number' ? this.numbers[randomSide] : this.colors[randomSide];
        }
      }
    },
    numberDice: {
      deep: true,
      handler(dice) {
        if(dice.type === this.$props.type){
          this.selected = dice.id === this.$props.id;
        }
      }
    },
    colorDice: {
      deep: true,
      handler(dice) {
        if(dice.type === this.$props.type){
          this.selected = dice.id === this.$props.id;
        }
      }
    },
  },
  data: function () {
    return {
      side: null,
      numbers: [1, 2, 3, 4, 5, "?"],
      colors: ["green", "yellow", "blue", "pink", "orange", "black"],
      selected: false,
      active: true,
      disabled: true,
    }
  },
  methods: {
    ...mapActions(["rollTheDie"]),
    ...mapMutations(["setNumber", "setColor"]),
    selectDie: function () {
      if(this.active && this.side && !this.rolling){
        let die = {
          id: this.$props.id,
          type: this.$props.type,
          value: this.side,
        }
        die.type === "number" ? this.setNumber(die) : this.setColor(die);
      }
    },
  }
}
</script>

<style scoped>
  .dice{
    width:82.5px;
    height: 82.5px;
    border-radius: 5px;
    background-color: white;
    margin:10px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 25px;
    background-image: linear-gradient(bottom, rgb(100,100,100) 0%, rgb(200,200,200) 100%);
    box-shadow: 0px 5px 0px 0px #999;
    position: relative;
    user-select: none;
    cursor: pointer;
  }

  .decrease{
    color: red;
  }

  .dice.selected{
    background-color:#83c938;
  }

  .dice.disabled:before{
    content: '';
    position:absolute;
    width: 100%;
    height: 100%;
    display: block;
    background-color: black;
    box-shadow: inset 0px 1px 0px black, 0px 5px 0px 0px black;
    opacity: 0.5;
    border-radius: 5px;
  }

  .color{
    width: 40px;
    height: 40px;
    fill:none;
    color:transparent;
  }

  .color.yellow{
    fill: #fec709;
    color: #dfad00;
  }

  .color.green{
    fill: #83c938;
    color: #5db400;
  }

  .color.blue{
    fill: #70c8f1;
    color: #18b6fe;
  }

  .color.pink{
    fill: #e1106b;
    color: #b4004e;
  }

  .color.orange{
    fill: #de782d;
    color: #d15900;
  }

  .color.black{
    fill: #474747;
    color: black;
  }

  .selected .color.black.green{
    color: #5db400;
  }
  .selected .color.black.orange{
    color: #d15900;
  }
  .selected .color.black.blue{
    color: #18b6fe;
  }
  .selected .color.black.yellow{
    color: #dfad00;
  }
  .selected .color.black.pink{
    color: #b4004e;
  }

  .container{
    width:90%;
    height:90%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e5e5e5;
    box-shadow: 0 3px 3px 0px rgba(0,0,0,0.5);
    border-radius: 100%;
  }

  .container div{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes rolling { 
    25% { transform: rotate(-5deg) }
    75% { transform: rotate(5deg) }
  }

  @keyframes loading { 
    100% { transform: rotate(1080deg)}
  }
  .rolling { 
    animation: rolling 0.5s;
    animation-iteration-count: infinite;
  }
  .loader{
    animation: loading 1.5s;
    animation-iteration-count: infinite;
    width:35px;
    height:35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader svg{
    width:100%;
    height:100%;
  }
</style>
