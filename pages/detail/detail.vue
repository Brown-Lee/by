<template>
  <view class="gl-wrap">
    <!-- 详情 -->
    <view class="commodity">
      <!-- 轮播 -->
      <view class="gl-slider">
        <view
          class="gl-img-slider"
          style="transform-style: preserve-3d; position: relative"
        >
          <!-- 轮播送礼logo -->
          <view class="sprites-icon">
            <image
              src="/static/礼物.png"
              webp
              mode="widthFix heightFix"
            ></image>
            <text>送礼</text>
          </view>
          <view class="swiper">
            <swiper
              style="height: 750px"
              @change="onchange"
              current="0"
              circular
              :indicator-dots="true"
              :autoplay="true"
              :interval="3000"
              :duration="1000"
            >
              <swiper-item v-for="item in swiper" :key="item">
                <view class="swiper-item">
                  <image :src="item" mode="widthFix heightFix"></image>
                </view>
              </swiper-item>
            </swiper>
            <view class="banner-item1">
              <text>{{ num }}/5</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 轮播下基本数据 -->
      <view class="gl-base-detial-wrap">
        <view class="price-collec-info">
          <view class="price base-price">{{ list.priceStr }}￥</view>
          <view class="al-pay-hb">
            <text class="text1"
              ><image
                src="/static/花呗.png"
                webp
                mode="widthFix heightFix"
              ></image
            ></text>
            <text class="text2">支持花呗分期付款</text>
          </view>
          <view class="collectSign">
            <image
              src="/static/收藏3.png"
              webp
              mode="widthFix heightFix"
            ></image>
            <text>收藏</text>
          </view>
        </view>
        <view class="makers-info">
          <view class="markers-text">
            <image
              src="/static/401位置.png"
              webp
              mode="widthFix heightFix"
            ></image>
            <text>{{ list.supplier }}</text>
          </view>
          <view class="generate-time">生产周期:{{ list.leadTime }}天</view>
        </view>
        <view class="product-h1-title">{{ list.title }}</view>
        <view class="product-h3-desc">{{ list.salePoint }}</view>
      </view>
      <!-- 评价 -->
      <view class="evaluate">
        <view class="gl-comment-empty">
          <view class="no-comment"> 商品刚刚上线，暂时还没有评价… </view>
        </view>
      </view>
      <!-- 店铺 -->
      <view class="gl-supplier-wrap">
        <view class="supplier-info-wrap">
          <view class="supplier-info-center">
            <text class="supplier-info-center_text1">{{
              list.addressName
            }}</text>
            <text class="supplier-info-center_text2"
              >商品质量:5.0 服务态度: 5.0</text
            >
          </view>
          <view class="supplier-info-right"> 全部商品 {{ index }} ＞ </view>
        </view>
        <view class="sipplier-img-wrap">
          <view class="commend-list">
            <view class="aLinkJump" v-for="(item, index) in comm" :key="index">
              <view class="recommend-pic">
                <image :src="item.imageUrl" mode=""></image>
              </view>
              <text class="recommend-tit">{{ item.title }}</text>
              <text class="item-labels">一起拼</text>
              <text class="item-price">￥{{ item.priceStr }}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 下方购买按钮 -->
      <view class="gl-footer">
        <view class="gl-other-wrap">
          <text class="gl-other-wrap_image">
            <image
              src="/static/信息.png"
              webp
              mode="widthFix heightFix"
            ></image>
          </text>
          <text class="gl-other-wrap_text">客服</text>
        </view>
        <view class="choose-gl-btn">
          <view class="btn1" @click="addCar()">加入购物车</view>
          <view class="btn2">单独购买￥{{ pirce }}</view>
          <view class="btn3">新人参团￥{{ newPrice }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from "../../api/index.js";
export default {
  data() {
    return {
      id: [],
      list: [],
      swiper: [],
      swiper: [],
      store: "",
      comm: [],
      index: 0,
      swipernum: 0,
      pirce: [],
      newPrice: [],
      num: 1,
    };
  },
  methods: {
    onchange(e) {
      this.num = e.detail.current + 1;
    },
    addCar() {
      api({
        url: "/add",
        data: {
          goodId: this.id,
        },
      }).then((res) => {
        console.log(this.id);
        console.log(res);
      });
    },
    onData() {
      api({
        url: "/detail",
        data: {
          goodId: this.id,
        },
      }).then((res) => {
        // console.log(res);
        this.list = res[0];
        // console.log(this.list);
        let image = res[0].imgs;
        this.swiper = JSON.parse(image).splice(1, 5);
        for (var i = 0; i < this.swiper.length; i++) {
          this.swipernum = i + 1;
        }
        // console.log(this.swiper);
        this.store = res[0].supplier;
        //  "["http://bfs.biyao.com/group1/M00/9E/DF/rBACYV2R8pKADL-UAAXySYF3dNw017_800x800.jpg","http://bfs.biyao.com/group1/M00/9E/DF/rBACYV2R8pKADL-UAAXySYF3dNw017_800x800.jpg","http://bfs.biyao.com/group1/M00/9D/7B/rBACVF2R8pWAPBwlAA4MP7IFU4M340_800x800.jpg","http://bfs.biyao.com/group1/M00/9F/61/rBACW12R8piABhauAAasCj3MUvo880_800x800.jpg","http://bfs.biyao.com/group1/M00/9D/7B/rBACVF2R8puAeCi-ABYMXGF76xg030_800x800.jpg","http://bfs.biyao.com/group1/M00/9F/61/rBACW12R8p-AEK_sAApM0DeT4zE484_800x800.jpg"]"
        // console.log(this.store);
        this.pirce = res[0].priceStr;
        this.newPrice = this.pirce - 5;
        // console.log(this.newPrice);
        this.onStore();
      });
    },
    onStore() {
      api({
        url: "/supplierList",
        data: {
          supplier: this.store,
        },
      }).then((res) => {
        for (var i = 0; i < res.length; i++) {
          this.index = i;
        }
        // console.log(res);
        this.comm = res;
      });
    },
  },
  onLoad(option) {
    console.log(option);
    this.id = option.id;
    // console.log(this.id);
    this.onData();
  },
};
</script>

<style lang="scss">
@import "./detail.scss";
</style>
