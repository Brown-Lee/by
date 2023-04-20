<style lang="scss">
	.home {
		width: 100%;
		position: relative;

		.fixed {
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 1;

			.home_input {
				width: 100%;
				margin: 0 auto;
				margin-top: 40px;
				height: 45px;
				background-color: #fff;
				padding: 7px 20px;
				box-sizing: border-box;

				.search {
					height: 30px;
					border-radius: 20px;
					padding: 5px 20px;
					font-size: 12px;
					background-color: #eee;
					line-height: 20px;
					box-sizing: border-box;
				}
			}

			.home_group {
				width: 100%;
				height: 45px;

				background-color: #fff;

				.home_item {
					display: block;
					float: left;
					margin: 0 20rpx;
					height: 100%;
					font-size: 12px;
					white-space: nowrap;
					line-height: 45px;
					text-align: center;
				}
			}
		}


		.swiper {
			width: 100%;
			padding-top: 180rpx;
			height: 400rpx;

			.swiper_item {
				width: 100%;
				height: 100%;

				.swiper_img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.hot_groups {
			width: 100%;
			margin-bottom: 50rpx;

			.hot_groups_item {
				float: left;
				line-height: 50rpx;
				margin: 0 4rpx;
			}
		}

		.list {
			width: 100%;
			height: 2000px;
			padding: 20rpx;
			box-sizing: border-box;

			.list_item {
				width: calc(50% - 16rpx);
				height: 400rpx;
				float: left;
				margin: 8rpx;

				.list_item_img {
					width: 100%;
					height: 300rpx;
				}
				.title{
					width: 100%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>

<template>
	<view class="home">
		<view class="fixed">
			<view class="home_input">
				<view class="search" @click="onNavigate">请输入您想要的商品</view>
			</view>
			<view class="home_group">
				<template v-for="item, i in groups" :key="i">
					<template v-if="i <= 5">
						<text class="home_item">{{ item }}</text>
					</template>
				</template>
				<text class="home_item">V</text>
			</view>
		</view>
		<swiper :indicator-dots="true" class="swiper" circular autoplay :interval="3000" :duration="500">
			<swiper-item class="swiper_item" v-for="item, index in swipers" :key="index">
				<image class="swiper_img" :src="item" mode="widthFix heightFix"></image>
			</swiper-item>
		</swiper>
		<view class="hot_groups">
			<template v-for="item,i in hotGroups" :key="i">
				<view class="hot_groups_item" v-if="i < hotGroups.length - 1">
					{{ item }}
					<text style="margin-left: 8rpx;">/</text>
				</view>
				<div class="hot_groups_item" v-else>{{ item }}</div>
			</template>
		</view>
		<view class="list" ref="listRef">
			<template v-for="item in list" :key="item.Id">
				<view class="list_item" @click="onDetail(item.Id)">
					<image class="list_item_img" :src="item.imageUrl" mode="center"></image>
					<view class="title">{{ item.title }}</view>
					<view class="price">￥{{ item.priceStr }}</view>
				</view>
			</template>
		</view>
		<view style="padding-bottom: 200rpx;"></view>
	</view>
</template>

<script>
	// 测试接口
	import UNI from '@/api/test.js';
	import request from '@/api/index.js';
	export default {
		data() {
			return {
				bool: true,
				listRef: null,
				offsetTop: 0,
				page: 1,
				swipers: [
					'http://bfs.biyao.com/group2/M00/34/23/CghkFmJ8yo2AXZtuAAB_g0vFyPE028.jpg',
					'http://bfs.biyao.com/group2/M00/4A/F4/CghiFmKmyQOAdEAcAABQs_Xb738947.jpg',
					'http://bfs.biyao.com/group2/M00/32/A4/CghjFmJ6MhGAFTauAAA7JMbh0zk995.jpg',
					'http://bfs.biyao.com/group2/M00/34/F7/CghiFmJ-GA-AMGFqAABHeb9UWS0393.jpg'
				],
				hotGroups: ['大牌品质', '工厂价格', '分期支付', '顺丰包邮', '无忧退款'],
				groups: [],
				list: []
			}
		},
		computed: {},
		methods: {
			onDetail(id){
				uni.navigateTo({
					url:`/pages/detail/detail?id=${id}`
				})
			},
			onNavigate(){
				uni.navigateTo({
					url:'/pages/history/history'
				})
			},
			fn() {
				if (window.scrollY + 200 >= this.$refs.listRef.$el.offsetHeight) {
					if (this.bool) {
						this.bool = false
						this.page += 1
						this.onData()
						console.log('123456');
						setTimeout(() => {
							this.bool = true
						}, 1000)
					}
				}
			},
			onData() {
				request({
					url: `/hotList?page=${this.page}`
				}).then(res => {
					if (res.length) {
						this.list = res
					} else {
						this.title = '没有更多了'
					}
					// res.data.forEach(item =>{
					// 	this.list.push(item)
					// })
					// console.log(res.data);
				})
			},
			onInit() {
				request({
					url: '/getTypeOne'
				}).then(res => {
					this.groups = res
				})
				// UNI({
				// 	url: '/home/floorlist',
				// 	method: 'POST'
				// }).then(res => {
				// 	console.log(res);
				// })
			}
		},
		mounted() {
			window.onscroll = () => this.fn()
		},
		onLoad() {
			this.onInit()
			this.onData()
		}
	}
</script>