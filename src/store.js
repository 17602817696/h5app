import Vue from 'vue';
import Vuex from 'vuex';
import { getGoodslist } from "./api/apis";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        goodsInfo:[],

    },
    mutations:{
        initGoodsList(state,params){
            state.goodsInfo = params;
        },
        // name表示当前商品name  n表示加或者减 
        changeNum(state,{name,n}){
            const {goodsInfo} = state;
            for(let item of goodsInfo){
                for(let food of item.foods){  
                    if(food.name === name){     //找到当前的商品数据
                        food.count += n;
                        break;
                    }
                }
            }
        }
    },
    actions:{
        initGoodsList(context){
            getGoodslist()
        .then(res => {
          console.log(res);
          // 添加字段
          for (let item of res) {
            for (let v of item.foods) {
              v.count = 0;
            }
          }
          context.commit('initGoodsList',res);
          
        })
        .catch(err => {
          console.log(err);
        });
        }
    },
    getters:{
        shopCarList(state){
            const {goodsInfo} =state;
            // 存放购物车数据
            const arr = [];
            for(let item of goodsInfo){
                for(let food of item.foods){
                    if(food.count > 0){  //大于0添加到购物车
                        // 去除重复商品
                        let isRepeat = false;   //表示没有重复数据
                        for(let obj of arr){
                            if(obj.name === food.name){   //如果当前的obj的name和当前f的name相同，则表示重复
                                isRepeat = true;
                                break;
                            }
                        }
                        if(!isRepeat){
                            arr.push(food);
                        }
                    }
                }
            }
            return arr;
        }
    }
});