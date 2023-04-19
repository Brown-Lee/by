<template>
	<view class="login_nav">
		<view class="login_logoBox">
			<view class="login_img">
				<image class="login_img" src="http://static3.biyao.com/pc/common/img/master/logo.png" mode=""></image>
			</view>
			<view class="login_iptBox">
				<view class="acc">
					<view class="accText">
						账号:
					</view><input type="text" v-model="userName" placeholder="请输入账号">
				</view>
				<view class="acc">
					<view class="accText">
						密码:
					</view><input type="safe-password" passwordp v-model="password" placeholder="请输入密码">
				</view>
				<view class="register" v-on:click="goLogin()">
					已有账号,去登录 -->
				</view>
				<view class="login_loginBtn">
					<view class="btn" v-on:click="goRegister()">
						注册
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
				userName: "",
				password: "",
				toggleFlag: false
			}
		},
		methods: {
			// 注册
			goRegister() {
				uni.showLoading({
					title: '注册中',
					mask: true,
					success: (res) => {
						// console.log(res);
						// console.log(this.userName, this.password);
						setTimeout(() => {
							request({
								url: "/register",
								data: {
									userName: this.userName,
									password: this.password
								}
							}).then(res => {
								console.log(res);
								if (res.code == 1) {
									uni.showToast({
										title: "注册成功"
									})
								} else if (res.code == 0) {
									uni.showToast({
										title: "被占用",
										icon: 'error'
									})
								}
							})
						}, 500)
					}
				});

				//  注册底
			},
			// 
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
		},
		computed() {
			// 计算属性
		},
		onLaunch() {
			console.log('页面初始化,只执行一次');
		},
		onLoad() {
			console.log('页面加载');
		}

	}
</script>

<style lang="scss" scoped>
	@import "./register.scss"
</style>