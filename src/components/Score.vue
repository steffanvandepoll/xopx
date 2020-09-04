<template>
  <div class="score-bar">
    <div class="score-parts">
      <div class="color-cells">
        <div v-for="(color, i) in colors" :key="i">
          <span class="cell" :class="color.color"><CircleIcon  /><span>{{color.pointsMax}}</span></span>
          <span class="cell" :class="color.color"><CircleIcon  /><span>{{color.pointsMin}}</span></span>
        </div>
      </div>
      <div class="cell-big"><span class="label">BONUS</span>=</div>
      <div class="cell-big"><span class="label">A-O</span>+</div>
      <div class="cell-big"><span class="label">! (+1)</span>+</div>
      <div class="cell-big"><span class="label">* (-2)</span>-</div>
    </div>
    <div class="cell-big"><span class="label">TOTAAL</span>=</div>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import { CircleIcon } from 'vue-feather-icons'


export default {
  name: 'Score',
  computed: {
    ...mapGetters(["colors"]),
  },
  components: {
    CircleIcon
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #83c938;
  }
.cell.pink{
  background-color: #e1106b;
  color: #e1106b;
}
.cell.yellow{
  background-color: #fec709;
  color: #fec709;
}
.cell.blue{
  background-color: #70c8f1;
  color: #70c8f1;
}
.cell.orange{
  background-color: #de782d;
  color: #de782d;
}
</style>