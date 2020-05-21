<template>
  <div id="page_shopCar">
    <!-- 弹出效果 -->
    <transition name="slide-fade">
      <div class="shopCar_info" v-if="show">
        <div class="goods_myshop" v-for="v in shopCarList" :key="v.name">
          <div>{{v.name}}</div>
          <div class="goods_shopNum">
            <div @click="$store.commit('changeNum',{name:v.name,n:-1})">-</div>
            {{v.count}}
            <div @click="$store.commit('changeNum',{name:v.name,n:1})">+</div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 底部 -->
    <div class="shopCar_footer">
      <div class="footer_img" @click="show = !show">
        <div class="img_warpper">
          <img :src="imgSrc" />
        </div>
      </div>
      <div class="footer_price">
        <span>￥{{myshopCar}}</span>
      </div>
      <div class="footer_delivery">另需配送费￥{{priceNum}}元</div>
      <div class="footer_foodPrice">￥{{totalPrice}}起送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      priceNum: 4
    };
  },
  computed: {
    shopCarList() {
      return this.$store.getters.shopCarList;
    },
    imgSrc() {
      return this.$store.getters.shopCarList.length
        ? require(`../assets/img/icon_shopcar.png`)
        : require(`../assets/img/icon_shopcar_default.png`);
    },
    totalPrice() {
      let price = 0;
      this.$store.getters.shopCarList.map(item => {
        price += item.price * item.count + this.priceNum;
      });
      return price;
    },
    myshopCar() {
      let myprice = 0;
      this.$store.getters.shopCarList.map(item => {
        myprice += item.price * item.count;
      });
      return myprice;
    }
  }
};
</script>

<style lang="less" scoped>
#page_shopCar {
  // 底部
  .shopCar_footer {
    height: 70px;
    width: 100%;
    background: #000;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    color: #616161;
    .footer_img {
      position: absolute;
      top: -20px;
      left: 10px;
      background: #000;
      padding: 13px;
      border-radius: 50%;
      .img_warpper {
        padding: 10px;
        border-radius: 50%;
        background: #333;
        img {
          width: 30px;
          height: 30px;
          background: #333;
        }
      }
    }
    .footer_price {
      flex: 3;
      text-align: right;
      span {
        display: block;
        padding: 18px;
        border-right: 1px solid #333;
        color: #b8b8b8;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .footer_delivery {
      flex: 3;
      text-indent: 1em;
    }
    .footer_foodPrice {
      height: 100%;
      flex: 2;
      background: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #b8b8b8;
      font-size: 18px;
      font-weight: 600;
    }
  }
  //   动画
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(100px);
    opacity: 0;
  }
  .shopCar_info {
    width: 100%;
    height: 200px;
    position: absolute;
    left: 0;
    bottom: 69px;
    background: #333;
  }
  .goods_myshop {
    display: flex;
    color: #fff;
    justify-content: space-between;
    .goods_shopNum {
      display: flex;
      align-items: center;
      div{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #000;
        border-radius: 50%;
      }
    }
  }
}
</style>