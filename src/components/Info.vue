<template>
  <div class="info">
      <div class="mask" />
      <div class="popup">
          <XIcon class="close" v-on:click="showInfo(false)" />
          <h2>updates</h2>
            <ul>
              <li><span class="date">20/09/20</span>Made <strong>level 5</strong> a bit harder by adding more stars, so reset score. Sorryyyy!</li>
              <li><span class="date">18/09/20</span>'Marcel' scored <strong>47</strong> points in <strong>level 3</strong> and is the current leader. </li>
              <li><span class="date">18/09/20</span><strong>Level 4</strong> and <strong>Level 5</strong> are out now enjoy!</li>
              <li><span class="date">17/09/20</span>'Joep' scored <strong>47</strong> points in <strong>level 2</strong> and is the current leader. </li>
            </ul>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { XIcon } from 'vue-feather-icons'


export default {
  name: 'Info',
  components: {
    XIcon
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    ...mapMutations(["showInfo"]),
  }
}
</script>

<style scoped>
.bold{
  font-weight: bold;
}
.info{
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
.news{
  margin-top: 30px;
  text-align: left;
  color: white;
}
h2{
  margin: 10px 0 20px;
}
ul{
  margin:10px 0;
  list-style: none;
  padding-left: 0;
}
 li{
  margin:8px 0;
  padding-left: 75px;
  position: relative;
}
 ul .date{
  position: absolute;
  font-weight: bold;
  left: 0px;
 }
 ul .date:after{
  content: ":";
  margin-right: 10px;
}
</style>