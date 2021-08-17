<template>
  <div class="cube" :style="cube">
      <div class="plane" :style="plane">{{tip}}</div>
      <div class="line x"></div>
      <div class="line y"></div>
      <div class="line z"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    computed:{
        tip: function(){
            return "CSS 3D";
        },
        cube: function() {
            //return this.$store.state.cubeStyleItem;
            return this.$store.state.cubeStyle.getItem();
        },
        plane: function(){
            //return this.$store.state.planeStyleItem;
            return this.$store.state.planeStyle.getItem();
            /*
            var list = [];
            var styles = this.$store.state.styles;
            var str;
            for(var i = 0; i < styles.length; i++){
                var key = styles[i];
               if(key.substr(0, 1) === "r"){
                   str = `${key}(${this.$store.state[key]}deg)`;
               }
               else{
                    str = `${key}(${this.$store.state[key]}px)`;
               }
               list.push(str);
            }
            var ts = list.join("");
            return {
                transform: ts,
                "transform-origin":this.$store.state.origin
            }
            */
        }
    }
}


</script>

<style lang="stylus">
.cube{
    transform-style preserve-3d
    perspective 2400px
    position absolute
    width 200px
    height 200px
}
.plane{
    position absolute
    left 0
    top 0
    width 200px
    height 200px
    display flex
    font-size 40px
    background rgba(0, 0, 0, 0.5)
    justify-content center
    align-items center
    color #ffffff
    transform-origin 50% 50% 0
    user-select none
}
.line{
    width 200px
    height 2px
    position absolute
    left 0
    top 99px
}
.x{
    background #ff0000
}
.y{
    transform rotateZ(90deg)
    background #00ff00
}
.z{
    transform rotateY(90deg)
    background #0000ff
}
</style>

