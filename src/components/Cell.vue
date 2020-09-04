<template>
  <div v-on:click="selectCell()" class="cell" :class="[color, {faded: faded, selectable: selectable}]">
    <StarIcon v-if="hasStar" class="star" />
    <CircleIcon v-else class="circle" />
    <XCircleIcon v-if="selected" class="selected" />
    <XCircleIcon v-if="marked" class="marked" />
  </div>
</template>

<script>
import { StarIcon, CircleIcon, XCircleIcon } from 'vue-feather-icons'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Cell',
  props: {
    color: String,
    hasStar: Boolean,
    faded: Boolean,
    selected: Boolean,
    marked: Boolean,
    startingLane: Boolean,
    selectable: Boolean,
    id: Number
  },
  components: {
    StarIcon,
    CircleIcon,
    XCircleIcon
  },
  computed: {
    ...mapGetters(["colorDice"]),
  },
  methods: {
    ...mapMutations(["updateCell"]),
    selectCell: function () {
      if(!this.colorDice){
        return;
      }

      let color = this.colorDice.value;
      if(color && (this.$props.color === color || color === 'black')){
        this.updateCell(this.$props);
      }
    }
  },
}
</script>

<style scoped>
  .cell.faded{
    opacity: 0.5;
  }

  .cell{
    cursor: pointer;
  }

  .circle{
    fill: rgba(255, 255, 255, 0.5);
    stroke-width: 0;
    width:33px;
    height:33px;
  }
  .star{
    color: white;
    fill: rgba(255, 255, 255, 0.5);
    width:33px;
    height:33px;
    stroke-width: 1px;
  }
  .selected, .marked{
    position: absolute;
    width: 33px;
    height: 33px;
  }
  .selected{
    color: red;
  }
  .marked{
    color: black;
  }
  .starting-lane .cell{
    border: solid 2px white;
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
</style>
