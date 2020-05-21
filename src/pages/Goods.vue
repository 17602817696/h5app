<template>
  <div id="goods_list">
    <!-- 左边导航 -->
    <div class="goods_left">
      <div @click="selectTable">
        <div
          :data-name="item.name"
          :class="{goods_left_item:true,'active':nowName === item.name}"
          v-for="item in goodsInfo"
          :key="item.name"
        >{{item.name}}</div>
      </div>
    </div>
    <!-- 右边内容 -->
    <div class="goods_right">
      <div>
        <div v-for="item in goodsInfo" :key="item.name" :id="item.name">
          <p class="single_food">{{item.name}}</p>
          <van-card v-for="v in item.foods" :key="v.name" :thumb="v.image">
            <template #tags>
              <p class="commodity_name">{{v.name}}</p>
              <p class="commodity_describe">{{v.description}}</p>
              <p class="commodity_describe">月销{{v.sellCount}} 好评度{{v.rating}}%</p>
              <div class="commodity_warpper">
                <div>
                  <span class="commodity_price">￥{{v.price}}</span>
                  <del v-if="v.oldPrice" class="commodity_describe">￥{{v.oldPrice}}</del>
                </div>
                <div>
                  <button @click="$store.commit('changeNum',{name:v.name,n:-1})" v-show="v.count"  class="btn_number">-</button>
                  <span v-show="v.count">{{v.count}}</span>
                  <button @click="$store.commit('changeNum',{name:v.name,n:1})" class="btn_number">+</button>
                </div>
              </div>
            </template>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodslist } from "../api/apis";
import BSrroll from "better-scroll";
export default {
  mounted() {
    // 弹性列表
    let leftScroll = document.querySelector(".goods_left");
    const lescroll = new BSrroll(leftScroll, {
      // 为true 才能绑定点击事件
      click: true
    });
    let rightScroll = document.querySelector(".goods_right");
    // 挂到this上面，方便调用
    this.riscroll = new BSrroll(rightScroll, {
      // 实时的监听滚动事件（滑动及惯性滑屏皆可监听）
      probeType: 3
    });
    // 绑定滚动事件
    this.riscroll.on("scroll", (pos) => {
      const slide = Math.abs(pos.y);
      // console.log(slide);
      // 当前滚动距离在那个范围  跟新侧边栏状态
      // console.log(this.arr);
      for(let obj of this.arr){
        if(slide >= obj.min && slide < obj.max){
          this.nowName = obj.name;
          break
        }
      }
    });
    // 获取商品的数据
    // this.getGoodslistInfo();

    this.$store.dispatch('initGoodsList');
  },
  // 任何数据更新之后都会执行的生命周期函数
  // updated(){
  //   console.log("updated函数被执行了")
    // 初始化this.arr方式一
    // if(!this.arr){
    //   console.log("getHeight函数被执行了")
    //   this.getHeight();
    // }
  // },
  data() {
    return {
      // goodsInfo: [],
      nowName: "热销榜"
    };
  },
  computed: {
    // 每goodsInfo变化之后computed都会重新执行
    goodsInfo() {
      const list = this.$store.state.goodsInfo; 
      if(list.length){  //等goodslist有数据了，且渲染出来挂载完毕之后再去求得DOM高度，并构建需要的数组
        this.$nextTick(()=>{
          this.getHeight();
        })
      }
      return list;
    }
  },
  methods: {
    // 获取商品数据
    // getGoodslistInfo() {
    //   getGoodslist()
    //     .then(res => {
    //       console.log(res);
    //       // 添加字段
    //       for (let item of res) {
    //         for (let v of item.foods) {
    //           v.count = 0;
    //         }
    //       }
    //       this.goodsInfo = res;
    //       // 等节点跟新完毕后再去获取节点   this.$nextTick这个方法接受一个回调函数作为参数会在一轮节点跟新完毕之后在执行
    //       this.$nextTick(() => {
    //         this.getHeight();
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // 左侧选项卡
    selectTable(e) {
      // 获取自定义属性
      const name = e.target.getAttribute("data-name");
      // 当前选中
      this.nowName = name;
      // console.log(this.nowName)
      // 左侧导航对应内容  第一个参数要跳转到的id位置   第二个参数动画时长
      this.riscroll.scrollToElement(`#${name}`, 500);
    },
    // 获取
    getHeight() {
      this.arr = [];
      let totalHeight = 0;
      this.goodsInfo.forEach(item => {
        // 获取节点id
        const id = item.name;
        // 当前盒子高度
        const h = document.getElementById(id).offsetHeight;
        const obj = { min: totalHeight, max: totalHeight + h, name: id };
        this.arr.push(obj);
        totalHeight += h;
        totalHeight += -1;
      });
      // console.log(arr);
    },



  }
};
</script>

<style lang="less" scoped>
#goods_list {
  display: flex;
  // 左边导航
  .goods_left {
    height: 460px;
    overflow: hidden;
    .goods_left_item {
      width: 70px;
      height: 70px;
      padding: 0px 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
    }
    .active {
      background: #fff;
    }
  }
  // 右边内容
  .goods_right {
    flex: 1;
    height: 460px;
    background: #f5f5f5;
    overflow: hidden;
    // 套餐标题
    .single_food {
      line-height: 30px;
      text-indent: 1em;
      border-left: 2px solid #cfcfcf;
    }
    // 商品卡片
    .van-card {
      margin: 0;
      background: #fff;
      .van-card__header {
        p {
          margin-bottom: 8px;
        }
        .commodity_name {
          font-size: 16px;
          font-weight: 600;
          color: #000;
        }
        .commodity_describe {
          color: #b5b5b5;
        }
        .commodity_warpper {
          display: flex;
          justify-content: space-between;
          .commodity_price {
            color: red;
            font-size: 15px;
            font-weight: 600;
          }
          .btn_number {
            width: 23px;
            height: 23px;
            border-radius: 50%;
            border: 1px solid #000;
            background: cornflowerblue;
          }
        }
      }
    }
  }
}
</style>