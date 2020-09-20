<template>
  <div class="level-select">
      <div class="mask" />
      <div class="popup">          
        <XIcon class="close" v-on:click="showLevelSelect(false)" />
        <h3>Total points: {{totalPoints()}}</h3>
        <ul>
          <li v-for="(level, i) in levels" :key="i">
            <button v-on:click="onLevelClicked(level)" :class="[{active: level.id === currentLevel.id}, {locked: totalPoints() < level.requirement}]">{{level.name}}</button>
            
            <div class="star-rating" v-if="starRating(level) !== null">
              <div class="filled"><StarIcon v-for="(rating, j) in starRating(level)" :key="j" /></div>
              <div class="empty"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
            </div>

            <span v-if="totalPoints() < level.requirement">unlocked at {{level.requirement}}pt <LockIcon /></span>
            <span v-else-if="level.best">{{level.best}}pt</span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { XIcon,LockIcon,StarIcon } from 'vue-feather-icons'


export default {
  name: 'LevelSelect',
  components: {
    XIcon,
    LockIcon,
    StarIcon
  },
  computed: {
    ...mapGetters(["levelSelection", "levels", "currentLevel"]),
  },
  methods: {
    ...mapMutations(["showLevelSelect"]),
    ...mapActions(["selectLevel"]),
    starRating: function(level){
      if(!level.best){
        return null;
      }
      if(level.best > 40){
        return 5;
      }
      else if(level.best > 32){
        return 4;
      }
      else if(level.best > 24){
        return 3;
      }
      else if(level.best > 16){
        return 2;
      }
      else if(level.best > 8){
        return 1;
      }
      return 0;
    },
    totalPoints: function (){
      let points = 0;
      for(let i in this.levels){
        let level = this.levels[i];
        if(level.best > 0){
          points += level.best
        }
      }
      return points;
    },
    onLevelClicked: function (level){
      if(level.id !== this.currentLevel.id){
        if(!level.requirement || this.totalPoints() >= level.requirement){
          this.selectLevel(level);
        }

      }
    },
  }
}
</script>

<style scoped>
h3{
  text-align: center;
}
.bold{
  font-weight: bold;
}
.level-select{
    position: fixed;
    left:0;
    top:0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
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
    width: 420px;
    padding:20px 40px;
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

.level-select ul{
  list-style: none;
  padding: 0;

}
.level-select ul li{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

.level-select ul li > span{
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
}
.level-select ul li > span svg{
  margin-left: 10px;
  color: gray;
  width:20px;
  height:20px;
}

button{
  background-color: #043d48;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
  width: 145px;
  cursor: pointer;
  margin-right: 15px;
}
button.active{
  background-color: #7c8283;
  cursor: auto;
}
button.locked{
  cursor: not-allowed;
  opacity: 0.3;
}
.star-rating{
  width:120px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.star-rating .filled{
  position: absolute;
  z-index: 1;
  left:0;
}

.star-rating .empty{
  position: absolute;
  z-index: 2;
}

.star-rating .filled svg{
  stroke-width: 0;
  fill: yellow;
}

</style>