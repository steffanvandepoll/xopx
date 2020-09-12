<template>
  <div class="help">
      <div class="mask" />
      <div class="popup">
          <XIcon class="close" v-on:click="showHelp(false)" />
          <ol>
            <li>Earn points by completing vertical rows, do this by filling the colored cells each turn</li>
            <li>You can only select cells which are in the <span class="bold">starting lane</span>, or directly adjacent to filled in cells</li>
            <li>In your turn chose both a <span class="bold">color</span> and a <span class="bold">number</span> dice.</li>
            <li>You must <span class="bold">use up all the numbers</span>, and can only fill in cells <span class="bold">directly adjecent</span> to where you started</li>
            <li>Black counts as any color, and ? as 1-5... but use them wisely you can only use this a limited amount of times</li>
            <li>Stars left at the end of the game cost you points, while filling in all cells of a color grant you bonus points</li>
          </ol>
          <p class="disclaimer">(better instructions coming later)</p>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { XIcon } from 'vue-feather-icons'


export default {
  name: 'Help',
  components: {
    XIcon
  },
  computed: {
    ...mapGetters(["help"]),
  },
  methods: {
    ...mapMutations(["showHelp"]),
  }
}
</script>

<style scoped>
.bold{
  font-weight: bold;
}
.help{
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
    width: 400px;
    padding:20px;
    background: white;
    border-radius: 5px;
    position: relative;
    text-align: left;
}

.close{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>