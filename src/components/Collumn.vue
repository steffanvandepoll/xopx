<template>
  <div class="collumn" :class="{ 'starting-lane': startingLane }">
    <span class="collname cell">{{name}}</span>
    <Cell v-for="(cell, i) in cells" 
    :key="i" 
    :color="cell.color" 
    :hasStar="cell.hasStar" 
    :faded="cell.faded" 
    :selectable="cell.selectable" 
    :id="cell.id" 
    :selected="cell.selected" 
    :marked="cell.marked"
    :startingLane="cell.startingLane"/>
    <span class="points-max cell" :class="{'inactive': isFullyMarked()}">{{pointsMax}}</span>
    <span class="points-min cell inactive">{{pointsMin}}</span>
  </div>
</template>

<script>
import Cell from './Cell.vue'

export default {
  name: 'Collumn',
  components: {
    Cell
  },
  props: {
    name: String,
    cells: Array,
    pointsMax: Number,
    pointsMin: Number,
    startingLane: Boolean
  },
  methods: {
    isFullyMarked: function () {
       return this.$props.cells.filter(cell => !cell.marked).length > 0;
    },
  },
}
</script>

<style scoped>
  .collumn{
    display: flex;
    flex-direction: column;
  }

  .cell{
    background-color: white;
    font-weight: bold;
  }
  .cell.inactive{
    opacity: 0.3;
  }

  .collname{
    margin-bottom: 10px;
  }

  .points-max{
    margin-top:10px;
  }

</style>
