<template>
  <div class="finish">
      <div class="mask" />
      <div class="popup">
          <h2>You scored {{colorPoints + columnPoints + jokerPoints - starPoints}} points!</h2>

          <button v-on:click="resetGame()">Try again</button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Finish',
  components: {
    
  },
  computed: {
    ...mapGetters(["colorPoints", "columnPoints", "jokerPoints", "starPoints"]),
  },
  methods: {
    ...mapActions(["resetGame"]),
  }
}
</script>

<style scoped>
.finish{
    position: fixed;
    left:0;
    top:0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mask{
    position: absolute;
    left:0;
    top:0;
    height:100%;
    width:100%;
    background: black;
    opacity: 0.6;
    z-index: -1;
}
.popup{
    width: 300px;
    height:200px;
    background: white;
    border-radius: 5px;
}
</style>