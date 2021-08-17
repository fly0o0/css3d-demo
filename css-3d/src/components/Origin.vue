<template>
  <div class="origin" :class="{hide}">
    <slider @change="change" ref="x" tip="x"/>
    <slider @change="change" ref="y" tip="y"/>
    <slider @change="change" ref="z" tip="z"/>
    <div @click="toggle" class="btn">︾</div>
  </div>
</template>

<script>
import Slider from './Slider'

export default {
  components:{Slider},
  data(){
    return {
      hide:true
    }
  },
  mounted(){
    this.$refs.x.num = 100;
    this.$refs.y.num = 100;
    this.$refs.z.num = 0;
  },
  methods:{
    change(){
        var list = [];
        var x = this.$refs.x.num;
        var y = this.$refs.y.num;
        var z = this.$refs.z.num;
        this.$store.commit("setOrigin", `${x}px ${y}px ${z}px`);
    },
    toggle(){
        this.hide = !this.hide;
    }
  }
}
</script>

<style lang="stylus">
.origin{
position fixed
left 0
top 0
width 100%
transition all 0.3s
z-index 9
}
.hide{
    transform translateY(-135px)
}
.btn{
    position absolute
    right 0
    bottom -32px
    width 40px;
    height 32px
    line-height 32px
    text-align center
    background #ededed
    color #666
    cursor pointer
}
</style>

