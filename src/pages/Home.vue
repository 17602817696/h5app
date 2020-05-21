<template>
  <div id="page_home">
    <div class="header_top">
      <div class="header_wrapper">
        <!-- 顶部左侧 -->
        <div class="header_img">
          <img :src="storeinfo.avatar" />
        </div>
        <!-- 顶部右侧 -->
        <div class="header_condent">
          <!-- 右侧详情 -->
          <div style="font-size:18px;font-weight:800;">
            <img style="width:30px;height:15px;" src="../assets/img/brand@2x.png" />
            {{storeinfo.name}}
          </div>
          <div style="font-size:16px;">{{storeinfo.description}} / {{storeinfo.deliveryTime}}分钟送达</div>
          <div class="discount">
            <div>
              <img src="../assets/img/decrease_1@2x.png" />
              {{getSup}}
            </div>

            <!-- 折扣信息弹出框 -->
            <div>
              <span class="small_span">
                <!-- 点击弹出框 -->
                <van-cell is-link @click="showPopup">{{(storeinfo.supports || []).length}}个</van-cell>
                <!-- 弹出框内容 -->
                <van-popup get-container=".small_span" v-model="show" closeable position="top" :style="{ height: '40%' }">
                  <!-- 标题 -->
                  <h1>{{storeinfo.name}}</h1>
                  <!-- 星星指数 -->
                  <p>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star_last"></span>
                  </p>
                  <!-- 优惠标题 -->
                  <div class="discount_warpper">
                    <div class="info_rail"></div>
                    <p class="discount_info">优惠信息</p>
                    <div class="info_rail"></div>
                  </div>
                  <!-- 优惠信息内容 -->
                  <div class="info_warpper" v-for="(v,i) in storeinfo.supports" :key="i">
                    <p><img src="../assets/img/decrease_1@2x.png">{{v.description}}</p>
                  </div>
                  <!-- 公告标题 -->
                  <div class="discount_warpper">
                    <div class="info_rail"></div>
                    <p class="discount_info">商家公告</p>
                    <div class="info_rail"></div>
                  </div>
                  <!-- 公告内容 -->
                  <div class="merchant_info">
                    {{storeinfo.bulletin}}
                  </div>
                </van-popup>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 跑马灯通知栏 -->
      <van-notice-bar :text="storeinfo.bulletin" color="pink" left-icon="volume-o" background="rgba(0,0,0,0)"/>
    </div>
    <!-- 分类导航 -->
    <div class="classify_navigation">
      <p :class="{'activate':$route.path === '/home/goods'}" @click="classify('/home/goods')"><label>商品</label></p>
      <p :class="{'activate':$route.path === '/home/comment'}"><label @click="classify('/home/comment')">评论</label></p>
      <p :class="{'activate':$route.path === '/home/merchant'}"><label @click="classify('/home/merchant')">商家</label></p>
    </div>
    <div class="together_show">
      <!-- 二级路由  路由出口 -->
      <router-view></router-view>
    </div>
    <shopCar></shopCar>
  </div>
</template>

<script>
import shopCar from '../components/shopCar'
// import axios from 'axios';
// 引入apis.js
import { getStoreinfo } from "../api/apis";
export default {
  components:{
    shopCar,
  },
  // 数据
  data() {
    return {
      storeinfo: {},
      // 弹出框
      show: false,
    };
  },
  // DOM结构加载完毕 初始化页面完成后的操作
  mounted() {
    getStoreinfo()
      .then(res => {
        // console.log(res);
        // this.storeinfo=res.data.data;
        //拦截器过滤之后的数据
        this.storeinfo = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 计算属性
  computed: {
    getSup() {
      let str = "";
      (this.storeinfo.supports || []).map(item => {
        // console.log(item.description)
        str += item.description;
      });
      return str;
    },
  },
  // 定义方法的主要区域
  methods: {
    // 弹出框
    showPopup() {
      this.show = true;
    },
    // 分类显示
    classify(v){
      this.$router.push(v)
    }
  }
};
</script>

<style lang="less" scoped>
#page_home {
  height: 100%;
  // 头部信息
  .header_top {
    background: url("../assets/img/bg_header1.jpg") no-repeat;
    background-size: 100% 100%;
    // 头部
    .header_wrapper {
      padding: 10px;
      display: flex;
      .header_img {
        width: 100px;
        height: 100px;
        border: 1px solid brown;
        img {
          width: 100%;
          height: 100%;
        }
      }
      // 右侧内容
      .header_condent {
        margin-left: 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        div {
          color: #fff;
        }
        .discount {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          div {
            display: flex;
            align-items: center;
            img {
              width: 14px;
              height: 14px;
            }
          }
          // 弹出框
          span {
            display: inline-block;
            width: 60px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            // background-color: rgba(53, 52, 52, 0.7);
            border-radius: 10px;
            .van-cell {
              text-align: center;
              border-radius: 10px;
              background-color: rgba(53, 52, 52, 0.6);
              position: static;
              padding: 0;
              padding: 0px 5px;
            }
            // 弹出框内容
            .van-popup {
              background-color: rgba(0, 0, 0, 0);
              width: 100%;
              height: 100% !important;
              display: block;
              h1 {
                width: 100%;
                font-weight: 800;
                font-size: 18px;
                text-align: center;
                margin-top: 80px;
              }
              p {
                margin-top: 20px;
                .star {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  margin: 0px 15px;
                  background: url("../assets/img/star36_on@2x.png") no-repeat;
                  background-size: 100%;
                  background-size: 100%;
                }
                .star_last {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  margin: 0px 15px;
                  background: url("../assets/img/star36_half@2x.png") no-repeat;
                  background-size: 100%;
                  background-size: 100%;
                }
              }
              .discount_warpper {
                width: 80%;
                margin: 20px auto;
                display: flex;
                .info_rail {
                  flex: 1;
                  border-top: 1px solid #fff;
                }
                .discount_info {
                  width: 70px;
                  margin: 0;
                  line-height: 30px;
                  background: rgba(0, 0, 0, 0);
                }
              }
              .info_warpper{
                width: 70%;
                margin: 0 auto;
                p{
                  height: 30px;
                  line-height: 30px;
                  display: flex;
                  align-items: content;
                  margin: 0;
                  img{
                    display: inline-block;
                    margin: auto 0;
                    width: 18px;
                    height: 18px;
                  }
                }
              }
              .merchant_info{
                width: 70%;
                margin: 0 auto;
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
  // 导航分类
  .classify_navigation{
    display: flex;
    height: 40px;
    border-bottom: 1px solid #7d7d7d;
    p{
      flex: 1;
      line-height: 40px;
      text-align: center;
    }
    .activate{
      color: red;
    }
  }
}
</style>