<template>
  <div class="setting">
    <controler v-for="(item, index) in orders" @change="change" ref="doms" :order="index" :key="index" :tip="item"/>
  </div>
</template>

<script>
import Cube from './Cube'
import Controler from './Controler'

export default {
  components:{Cube, Controler},
  data(){
    return {
      orders:["rotateX","rotateY","rotateZ","translateX","translateY","translateZ"]
    }
  },
  methods:{
    change(){
      var doms = this.$refs.doms;
      var list = [];
      var tips = [];
      for(var i = 0; i < doms.length; i++){
        list.push(doms[i].pot);
      }
      list.sort(function(a, b) {
        return a > b;
      });
      for(var i = 0; i < doms.length; i++){
        var dom = this.getDom(list[i], doms);
        dom.reset(i);
        tips.push(dom.tip);
      }
      this.$store.commit("sortKeys", tips);
    },
    getDom(pot, doms){
      for(var i = 0; i < doms.length; i++){
        if(doms[i].pot == pot){
          return doms[i];
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.setting{
    display flex
    justify-content center
    align-items center
    flex-direction column
    position fixed
    bottom 0
    left 0
    width 100%
    height 270px
}
</style>

