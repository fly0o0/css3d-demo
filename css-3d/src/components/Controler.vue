<<template>
  <div class="controler" :style="{'transform':`translateY(${pot}px)`,'z-index':zIndex}">
      <div class="label" ref="dom">{{tip}}:</div>
      <input class="range" type="range" v-model="num" v-on:input="changeNum(false)" :min="min" :max="max"/>
      <input class="number" type="number" v-model="num" v-on:input="changeNum(true)" :min="min" :max="max"/>
  </div>
</template>

<script>
var height = 45;

export default {
    props:["tip", "order"],
    data(){
        return {
          num: 0,
          min: -360,
          max: 360,
          pot: this.order * height,
          zIndex: 0
        }
    },
    watch:{
        curItem: function(data) {
            var state = this.$store.state;
            this.num = state[state.curItem + "Style"][this.tip];
            var n = state[state.curItem + "Style"].keys.indexOf(this.tip);
            this.reset(n);
        }
    },
    computed:{
        curItem: function(){
            return this.$store.state.curItem;
        }
    },
    mounted(){
        var $this = this;
        
        var startPot = 0;
        var dom = this.$refs.dom;
        var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        var EVENT_DOWN = isMobile ? "touchstart" : "mousedown";
        var EVENT_MOVE = isMobile ? "touchmove" : "mousemove";
        var EVENT_UP = isMobile ? "touchend" : "mouseup";
        dom.addEventListener(EVENT_DOWN, function (e) {
            e.preventDefault();
            $this.$store.commit("updateIndex");
            $this.zIndex = $this.$store.state.zIndex;
            startPot = isMobile ? e.changedTouches[0].clientY : e.clientY;
            document.addEventListener(EVENT_MOVE, mousemove, false);
            document.addEventListener(EVENT_UP, mouseup, false);
        }, false)

        function mousemove(e) {
            e.preventDefault();
            //var endPot = e.changedTouches[0].clientY;
            var endPot = isMobile ? e.changedTouches[0].clientY : e.clientY;
            var space = endPot - startPot;
            startPot = endPot;
            $this.pot += space;
        }
        function mouseup(e) {
            e.preventDefault();
            document.removeEventListener(EVENT_MOVE, mousemove, false);
            document.removeEventListener(EVENT_UP, mouseup, false);
            //$this.pot = Math.ceil($this.pot / height) * height;
            $this.$emit("change");
        }
    },
    methods:{
        reset(n){
            setTimeout(() => {
                this.pot = n * height;
            }, 30);          
        },
        changeNum(reset){
            if(reset){
                if(this.num > this.max){
                    this.num = this.max;
                }
                else if(this.num < this.min){
                    this.num = this.min;
                }
            }
            this.$store.commit("setTransform", [this.tip, this.num]);
        }
    }
}
</script>

<style lang="stylus">
.controler{
    position absolute
    width 100%
    left 0
    top 0
    display flex
    flex-direction row
    align-items center
    justify-content center
    height 40px
    background #efefef
    padding 2px 0
    transition all 0.3s
    border-bottom solid 1px #aaaaaa
}
.label{
    user-select none
    width :90px;
    height 40px;
    line-height 40px;
    font-size :12px;
    text-align right
    cursor pointer
}
.range{
    width :200px;
    margin 0 8px
}
.number{
    width 60px
}
</style>

