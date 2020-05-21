import Vue from 'vue'
import Vuex from 'vuex'
import {getGoodslist} from './api/apis'

Vue.use(Vuex)

//创建数据仓库  一个项目只有一个仓库(store)
const store = new Vuex.Store({
    // state中存放store的数据
    state:{
        name:'阿三',
        list:[],
        personList:[
            {id:0,name:'阿三',age:20},
            {id:1,name:'阿四',age:21},
            {id:2,name:'阿五',age:22},
        ]
    },
    // 改变state里的值   《mutations只能是同步的》 state中的数据只能通过提交mutation修改
    mutations:{
        // 形参state代表仓库store中的所有数据，即state对象中的数据
        changeName(state,val){
            // state.name = val;
            state.name = val.name;  //val为对象时的修改方式
        },
        initList(state,list){
            // state.list = list;
            state.list = list.list;
        }
    },
    // 《异步改变》支持任意的异步代码，需要异步时写
    actions:{
        // 这里的context即store
        initList(context){
            // 发送请求获取数据并回填到list中
            getGoodslist()
            .then((res)=>{
                console.log(res)
                // context.commit('initList',res)
                context.commit({
                    type:'initList',
                    list:res
                })
            })
            .catch((err)=>{
                console.log('err',err)
            })
        }
    },
    // vuex的计算属性(根据母体数据衍生出新数据，母体数据一旦发生变化，计算属性会自动计算)
    getters:{
        filterPerson(state){
            return state.personList.filter((item)=>item.age>20)
        }
    }
});

// 不能使用这种方式修改数据，这种方式会导致数据不可预测，且页面可能监听不到数据变化
// store.state.name = '阿四'

// 修改数据只能在store下面的commit方法提交mutation来修改数据    commit->提交
// store.commit('changeName','阿五')   //第一个参数mutations的名字  第二个参数你要传递的参数
// store.commit({
//     type:'changeName', //必须有type且要有mutations的名字
//     name:'阿六'
// })


// 提交action只能通过store.dispatch
store.dispatch('initList')

console.log('store',store) 


export default store;
