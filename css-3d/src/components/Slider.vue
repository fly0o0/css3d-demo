<<template>
  <div class="slider">
      <div class="label" ref="dom">{{tip}}:</div>
      <input class="range" type="range" v-model="num" v-on:input="changeNum(false)" :min="min" :max="max"/>
      <input class="number" type="number" v-model="num" v-on:input="changeNum(true)" :min="min" :max="max"/>
  </div>
</template>

<script>
var height = 45;

export default {
    props:["tip"],
    data(){
        return {
          num: 0,
          min: -360,
          max: 360,
          zIndex: 0
        }
    },
    watch:{
        curItem: function(data) {
            console.log("watch:" + data);
            var state = this.$store.state;
            var origin = state[state.curItem + "Style"].origin;
            var list = origin.split(" ");
            if(list.length == 3){
                if(this.tip == "x"){
                    this.num = parseFloat(list[0]);
                }
                else if(this.tip == "y"){
                    this.num = parseFloat(list[1]);
                }
                else if(this.tip == "z"){
                    this.num = parseFloat(list[2]);
                }
            }
        }
    },
    computed:{
        curItem: function(){
            return this.$store.state.curItem;
        }
    },
    mounted(){
        
    },
    methods:{
        changeNum(reset){
            if(reset){
                if(this.num > this.max){
                    this.num = this.max;
                }
                else if(this.num < this.min){
                    this.num = this.min;
                }
            }
            this.$emit("change");
            //this.$store.commit("change", [this.tip, this.num]);
        }
    }
}
</script>

<style lang="stylus">
.slider{
    position relative
    width 100%
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

