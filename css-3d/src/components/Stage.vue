<template>
  <div class="stage">
      <origin/>
      <div class="container">
        <cube/>
      </div>
      <selecter/>
      <setting/>
  </div>
</template>

<script>
import Cube from './Cube'
import Setting from './Setting'
import Origin from './Origin'
import Selecter from './Selecter'

export default {
  components:{Cube, Setting, Origin, Selecter}
}
</script>

<style lang="stylus">
.stage{
    display flex
    justify-content center
    align-items center
    flex-direction column
    height 320px
}
.container{
    width 200px
    height 200px
    perspective 900px
}

</style>

