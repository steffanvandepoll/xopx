<template>
  <div class="turn-counter">
      <div class="progress-bar">
          <div class="progress" v-bind:style="{width: (turn/30)*100 + '%' }"/>
      </div>
      <div class="turns">{{turn}}/30</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  name: 'TurnCounter',
  computed: {
    ...mapGetters(["turn"]),
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.turn-counter{
  width:100%;
  display: flex;
  font-weight: bold;
  color: white;
  align-items: center;
  margin-bottom: 5px;;
}
.progress-bar{
    flex-grow: 1;
    height: 10px;
    margin-right: 10px;
    margin-left: 2px;
    background: white;
    border-radius: 5px;
    position: relative;
}
.progress{
    position: absolute;
    background-color: #83c938;
    height: 100%;
    border-radius: 5px;
    left:0;
    transition: width 1s;
}
</style>