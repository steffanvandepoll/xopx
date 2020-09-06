<template>
  <div class="finish">
      <div class="mask" />
      <div class="popup">
          <h3>Well played, your score is: </h3>
          <table class="all ">
             <tr class="fadein-1">
              <td>
                <span class="green">B</span>
                <span class="yellow">O</span>
                <span class="blue">N</span>
                <span class="pink">U</span>
                <span class="orange">S</span>
              </td>
              <td><PauseIcon class="equalsSign" /></td>
              <td>{{colorPoints}}</td>
            </tr>
            <tr class="fadein-2">
              <td>A - O</td>
              <td><span class="plus"/></td>
              <td>{{columnPoints}}</td>
            </tr>
            <tr class="fadein-3"> 
              <td><span class="joker show-added-value"><CircleIcon  />!</span></td>
              <td><span class="plus"/></td>
              <td>{{jokerPoints}}</td>
            </tr>
            <tr class="fadein-4">
              <td><span class="joker show-lost-value"><StarIcon /></span></td>
              <td><span class="minus"/></td>
              <td>{{starPoints}}</td>
            </tr>
          </table>
                      
          <table class="total fadein-5">
            <tr>
              <td>TOTAL</td>
              <td><PauseIcon class="equalsSign" /></td>
              <td>{{colorPoints + columnPoints + jokerPoints - starPoints}}</td>
            </tr>
          </table>

          <div class="actions">
            <button v-on:click="resetGame()"><RefreshCcwIcon />Try again</button>
            <button v-on:click="onShareButtonClick(colorPoints + columnPoints + jokerPoints - starPoints)"><Share2Icon />Share your score</button>
          </div>

      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { CircleIcon, PauseIcon, StarIcon, RefreshCcwIcon, Share2Icon} from 'vue-feather-icons'

export default {
  name: 'Finish',
  components: {
    CircleIcon,
    PauseIcon,
    StarIcon,
    RefreshCcwIcon,
    Share2Icon
  },
  computed: {
    ...mapGetters(["colorPoints", "columnPoints", "jokerPoints", "starPoints"]),
  },
  methods: {
    ...mapActions(["resetGame"]),
    onShareButtonClick: function(points){
      let text = "https://wa.me/?text=I just scored ";
      text += points;
      text += " points on https%3A%2F%2Fxopx.netlify.app%2F!! Try and beat that"
      window.location.href = text;
    }
  }
}
</script>

<style scoped>

h3{
  font-size: 15px;
}

.actions{
  display: flex;
}
.actions button{
  width: 50%;
  margin:2px;
  border-radius: 5px;
  border:none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding:0 10px;
  font-weight: bold;
}

button svg{
  width:20px;
  height:20px;
}

@keyframes fadein-1-frames{
    0% { opacity:0; }
    50% { opacity:0; }
    100% { opacity:1; }
}
.fadein-1 { 
  animation: fadein-1-frames 1s;
}

@keyframes fadein-2-frames{
    0% { opacity:0; }
    50% { opacity:0; }
    100% { opacity:1; }
}
.fadein-2 { 
  animation: fadein-2-frames 2s;
}

@keyframes fadein-3-frames{
    0% { opacity:0; }
    33% { opacity:0; }
    66% { opacity:0; }
    100% { opacity:1; }
}
.fadein-3 { 
  animation: fadein-3-frames 3s;
}

@keyframes fadein-4-frames{
    0% { opacity:0; }
    25% { opacity:0; }
    50% { opacity:0; }
    75% { opacity:0; }
    100% { opacity:1; }
}
.fadein-4 { 
  animation: fadein-4-frames 4s;
}

@keyframes fadein-5-frames{
    0% { opacity:0; }
    20% { opacity:0; }
    40% { opacity:0; }
    60% { opacity:0; }
    80% { opacity:0; }
    100% { opacity:1; }
}
.fadein-5 { 
  animation: fadein-5-frames 5s;
}

table.all, table.total{
  width: 80%;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  margin-top:20px;
  font-weight: bold;
}

td:nth-child(1){
  width:60px;
  text-align: right;
}
td:nth-child(2){
  width:30px;
  padding-left: 10px;
}

td:nth-child(3){
  width:40px;
  text-align: right;
}

table.total{
  margin-top:5px;
  padding-top:5px;
  border-top: grey dashed 1px;
  margin-bottom: 20px;
}

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
    padding:20px;
    background: white;
    border-radius: 5px;
}
.show-added-value{
  margin-right: 25px;
}
.show-lost-value{
  margin-right: 25px;
}

.show-added-value:after, .show-lost-value:after{
  content: '(+1)';
  font-size: 12px;
  position: absolute;
  right: -27px;
  top:5px;
}
.show-lost-value:after{
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