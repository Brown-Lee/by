<template>
	<view class="mine_navBox">
		<view class="mine_nav">
			<view class="useBox">
				<view class="left">
					<image class="img"
						src="https://tse3-mm.cn.bing.net/th/id/OIP-C.crR6XPmOQy_u_7UqgerW3gAAAA?w=144&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7"
						mode=""></image>
					<view class="useName">
						我的必要名称：<text>{{userName}}</text>
					</view>
				</view>
				<view class="right">
					<image v-on:click="setting()" class="img"
						src="https://gw.alicdn.com/imgextra/i4/O1CN017YkEcW1bj2xKGqX6R_!!6000000003500-2-tps-66-66.png"
						mode=""></image>
				</view>
			</view>
		</view>
		<!-- 订单 -->
		<view class="orderFrom_Box">
			<view class="order">
				<view class="orderText">
					<text>我的订单</text>
					<text>全部></text>
				</view>
				<div class="orader_itemBox">
					<view class="orader_item" v-for="(item,index) in imgAll">
						<image class="img" :src="item" mode=""></image>
						<view class="">
							{{imgText[index]}}
						</view>
					</view>
				</div>
			</view>
		</view>
		<view class="goodCar_Box">
			<view class="goodCar">
				<view class="goodCarText">
					<text>我的购物车</text>
					<image class="img" src="../../static/icons/购物车空.png" mode=""></image>
				</view>

				<view class="goodCar_item" v-for="item in goodList" :key="item.id">
					<image class="img" :src="item.imageUrl" mode=""></image>
					<view>
						<view class="title">
							{{item.title}}
						</view>
						<view class="supplier">
							{{item.supplier}}
						</view>
						<view class="price" style="display: flex; justify-content: space-between;">
							重量: {{JSON.parse(item.sizeList)[0]}} /
							¥{{item.priceStr}}元
						</view>
						<view class="goodBtn">
							<view class="button" v-on:click="goodAdd(item.Id)">+</view>
							<view>
								{{item.count}}
							</view>
							<view class="button" v-on:click="goodMinus(item.Id,item.count)">-</view>
						</view>
						<button v-on:click="del(item.Id)" style="background-color: #e74b4e;">删除</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../api/index.js'
	export default {
		data() {
			return {
				goodCa_icon: 'https://img.alicdn.com/imgextra/i3/O1CN0151qDFg2AN4Vma3SdE_!!6000000008190-2-tps-63-63.png',
				imgAll: [
					'https://gw.alicdn.com/imgextra/i4/O1CN01Ch0s7Q23bXfqHh0du_!!6000000007274-2-tps-96-96.png',
					'https://img.alicdn.com/imgextra/i4/O1CN01nLQgHT25pOrLRDa0J_!!6000000007575-2-tps-96-96.png',
					'https://img.alicdn.com/imgextra/i3/O1CN01nax4oQ1mZqiHhCthD_!!6000000004969-2-tps-96-96.png',
					'https://img.alicdn.com/imgextra/i2/O1CN017zJwGl1Pg2uGVpNQd_!!6000000001869-2-tps-96-96.png',
					'https://img.alicdn.com/imgextra/i2/O1CN01r5ZgMY1StHCKteW88_!!6000000002304-2-tps-96-96.png'
				],
				imgText: ['待付款', '待发货', '待收货', '待评价', '退款/售后'],
				goodList: [],
				token: "",
				userName: "",
				flag: false
			}
		},
		onLoad() {
			uni.getStorage({
				key: "userName",
				success: (res) => {
					console.log(res.data);
					this.userName = res.data
				}
			});

			uni.getStorage({
				key: "token",
				success: (res) => {
					console.log(res.data);
					this.token = res.data
				}
			});
			!this.token ? (uni.navigateTo({
				url: "/pages/login/login"
			})) : ''

			// 获取购物车列表
			this.getList()
		},

		methods: {
			// 加
			goodAdd(id) {
				console.log(this.token, id);
				request({
					url: "/add",
					data: {
						token: this.token,
						goodId: id
					}
				}).then(res => {
					console.log(res);
					this.getList()
				})
			},
			// 减
			goodMinus(id, count) {
				console.log(id, count);
				if (count == 0) {
					uni.showModal({
						title: '删除',
						content: '商品个数小于1,你确定要删除此商品吗?',
						success: (res) => {
							// console.log(this.token);
							if (res.confirm) {
								console.log(this.token);
								request({
									url: "/del",
									data: {
										token: this.token,
										goodId: id
									}
								}).then(res => {
									console.log(res);
									this.getList()
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				} else {
					request({
						url: "/remove",
						data: {
							token: this.token,
							goodId: id
						}
					}).then(res => {
						console.log(res);
						this.getList()
					})
				}

			},
			del(id) {
				console.log(id);
				console.log(this.token);
				uni.showModal({
					title: '删除',
					content: '你确定要删除此商品吗?',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							request({
								url: "/del",
								data: {
									token: this.token,
									goodId: id
								}
							}).then(res => {
								if (res.code == 0) {
									uni.showToast({
										title: "token无效",
										icon: 'error'
									})
								} else if (res.code == 1) {
									uni.showToast({
										title: "删除成功",
										icon: 'success'
									})
								} else {
									uni.showToast({
										title: "删除失败",
										icon: 'error'
									})
								}
								console.log(res);
								this.getList()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})

			},
			setting() {
				uni.showModal({
					title: '别动~',
					content: '谁允许你点我的，都没有设置，你点我干嘛！',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			addgood() {
				request({
					url: "/add",
					data: {
						token: this.token,
						goodId: "6"
					}
				}).then(res => {
					console.log(res);
				})
			},
			getList() {
				request({
					url: "/shopList",
					data: {
						token: this.token
					}
				}).then(res => {
					console.log(res);
					this.goodList = res
				})
			},

		}
	}
</script>
<style scoped lang="scss">
	@import './mine.scss'
</style>