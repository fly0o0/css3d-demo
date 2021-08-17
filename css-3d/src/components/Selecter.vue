<template>
  <div class="selecter">
      <!-- <div class="item" @click="change('plane')" :class="{chosed:chosed=='plane'}">plane</div> -->
      <div class="item" @click="change('cube')" :class="{chosed:chosed=='cube'}">cube</div>
  </div>
</template>

<script>

export default {
  
  data(){
    return {
    }
  },
  computed:{
      chosed: function() {
        return this.$store.state.curItem;
      }
  },
  mounted(){
      
  },
  methods:{
    change(n){
        this.$store.commit("setCurItem", n);
    }
  }
}
</script>

<style lang="stylus">
.selecter{
    display flex
    flex-direction row
    position fixed
    left 0
    bottom 270px
}
.item{
    padding 6px 12px
    font-size 12px
    text-align center
    background #999
    color #ffffff
    cursor pointer
    transition all 0.3s
}
.chosed.item{
    background #efefef
    color #999
}
</style>

