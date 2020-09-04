<template>
  <div class="sheet">
    <Collumn v-for="collumn in sheet.colls" 
      :key="collumn.name" 
      :name="collumn.name" 
      :cells="collumn.cells"
      :pointsMax="collumn.pointsMax"
      :pointsMin="collumn.pointsMin"
      :startingLane="collumn.startingLane"
    />
  </div>
</template>

<script>
import Collumn from './Collumn.vue'
import { mapGetters } from "vuex";


export default {
  name: 'Sheet',
  components: {
    Collumn
  },
  computed: {
    ...mapGetters(["sheet"]),
  },
  watch: {
    rolling: {
      deep: true,
      handler(sheet) {
        console.log(sheet);
      }
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color:white;
}
.sheet{
  display: flex;
  justify-content: center;
}
</style>