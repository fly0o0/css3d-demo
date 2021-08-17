import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function Style(){
    this.origin = "";
    this.keys = ["rotateX", "rotateY", "rotateZ", "translateX", "translateY", "translateZ"];
    this.rotateX = 0;
    this.rotateY = 0;
    this.rotateZ = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;
}

Style.prototype.getItem = function(){
    var list = [];
    var str;
    for(var i = 0; i < this.keys.length; i++){
        var key = this.keys[i];
       if(key.substr(0, 1) === "r"){
           str = `${key}(${this[key]}deg)`;
       }
       else{
            str = `${key}(${this[key]}px)`;
       }
       list.push(str);
    }
    var ts = list.join("");
    return {
        transform: ts,
        "transform-origin": this.origin
    }
}

var planeStyle = new Style();
var cubeStyle = new Style();

const state = {
    /*
    origin:"",
    rotateX:0,
    rotateY:0,
    rotateZ:0,
    translateX:0,
    translateY:0,
    translateZ:0,
    styles:["rotateX", "rotateY", "rotateZ", "translateX", "translateY", "translateZ"],
    planeStyleItem: planeStyle.getItem(),
    cubeStyleItem: cubeStyle.getItem(),
    */
    planeStyle: planeStyle,
    cubeStyle: cubeStyle,
    curItem: 'cube',
    zIndex:1
}

const mutations = {
    setCurItem(state, n){
        state.curItem = n;
    },
    setTransform(state, list){
        var key = list[0];
        var data = list[1];
        var item = state[state.curItem + "Style"];
        item[key] = data;
        state[state.curItem + "StyleItem"] = item.getItem();
    },
    sortKeys(state, list){
        var item = state[state.curItem + "Style"];
        item.keys = list;
        state[state.curItem + "StyleItem"] = item.getItem();
    },
    setOrigin(state, data){
        var item = state[state.curItem + "Style"];
        item.origin = data;
        state[state.curItem + "StyleItem"] = item.getItem();
    },
    updateIndex(state){
        state.zIndex++;
    }
}

export default new Vuex.Store({
    state,mutations
})