<template>
  <div class="score-bar">
    <div class="score-parts">
      <div class="color-cells">
        <div v-for="(color, i) in colors" :key="i">
          <span class="cell" :class="color.color"><CircleIcon  /><span>{{color.pointsMax}}</span></span>
          <span class="cell" :class="color.color"><CircleIcon  /><span>{{color.pointsMin}}</span></span>
        </div>
      </div>
      <div class="cell-big">
        <span class="label bonus">
          <span class="green">B</span>
          <span class="yellow">O</span>
          <span class="blue">N</span>
          <span class="pink">U</span>
          <span class="orange">S</span>
        </span><PauseIcon class="equalsSign" /></div>
      <div class="cell-big"><span class="label">A - O</span><span class="plus"/></div>
      <div class="cell-big"><span class="label points"><span class="joker"><CircleIcon  />!</span></span><span class="plus"/></div>
      <div class="cell-big"><span class="label points star"><StarIcon /></span><span class="minus"/></div>
    </div>
    <div class="cell-big"><span class="label">TOTAAL</span><PauseIcon class="equalsSign" /></div>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import { CircleIcon, PauseIcon, StarIcon} from 'vue-feather-icons'


export default {
  name: 'Score',
  computed: {
    ...mapGetters(["colors"]),
  },
  components: {
    CircleIcon,
    PauseIcon,
    StarIcon
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label.points{
  margin-right: 27px;
  position: relative;
}
.label.points:after{
  content: '(+1)';
  font-size: 12px;
  position: absolute;
  right: -27px;
  top:5px;
}
.label.points.star:after{
  content: '(-2)';
  right: -25px;
}

.joker{
  position: relative;
  width: 23px;
  height: 23px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
}
.joker svg{
    position: absolute;
    width: 23px;
    height: 23px;
}
.star svg{
  width: 23px;
  height: 23px;
  fill: white;
}
.equalsSign{
  transform: rotate(90deg);
  fill: #043d48;
  color: transparent;
  width: 15px;
  height: 15px;
}
.plus{
  position: relative;
  width:12px;
  height:12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.plus::before{
  content: '';
  position: absolute;
  width:11px;
  height:3px;
  background-color: green;
}
.plus::after{
  content: '';
  position: absolute;
  width:3px;
  height:11px;
  background-color: green;
}

.minus{
  position: relative;
  width:12px;
  height:12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.minus::after{
  content: '';
  position: absolute;
  width:11px;
  height:3px;
  background-color: red;
}
.score-bar{
  display:flex;
  flex-direction: column;
  align-items: flex-end;
}

.score-bar > .cell-big{
  margin-top: 5px;
}
.score-parts{
  display:flex;
  flex-direction: column;
  margin-top: 24px;
  width:140px;
  align-items: flex-end;
  padding-bottom: 2px;
  border-bottom: white dashed 1px;
  margin-left: 10px;
}
.color-cells > div{
  display: flex;
}
.cell{
  position: relative;
  font-weight: bold;
}
.cell-big{
  display: flex;
  background: white;
  height: 33px;
  width: 74px;
  margin: 2px;
  border-radius: 5px;
  position: relative;
  align-items: center;
  padding: 0 5px;
  font-weight: bold;
  font-size: 20px;
  color: #043d48;
}
.cell-big .label{
  position: absolute;
  right: calc(100% + 5px);
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: right;
  color: white;
  font-size: 14px;
}
.cell svg{
  position: absolute;
  fill: rgba(255, 255, 255, 0.7);
  stroke-width: 0;
  width: 33px;
  height: 33px;
}
.cell span{
  position: absolute;

}
.cell.green{
  background-color: #83c938;
  }
.cell.pink{
  background-color: #e1106b;
}
.cell.yellow{
  background-color: #fec709;
}
.cell.blue{
  background-color: #70c8f1;
}
.cell.orange{
  background-color: #de782d;
}

.green{
  color: #83c938;
  }
.pink{
  color: #e1106b;
}
.yellow{
  color: #fec709;
}
.blue{
  color: #70c8f1;
}
.orange{
  color: #de782d;
}

</style>