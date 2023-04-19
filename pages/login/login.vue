<template>
	<view class="login_nav">
		<view class="login_nav_top" v-if="!informFlag">
			<text>您需要登陆才能继续访问</text> <text v-on:click="informFlagFun()">关闭</text>
		</view>
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
				<navigator class="register" url="../register/register">
					还没有账号,去注册 --></navigator>
				<view class="login_loginBtn">
					<view class="btn" v-on:click="login()">
						登录
					</view>
					<view class="login_loginText">
						<label class="radio">
							<radio :checked="toggleFlag" v-on:click="toggleFlagFun" />
						</label>
						已阅读并同意以下协议 <text>必要平台服务协议</text><text>隐私权政策</text> <text>法律声明</text> <text>支付宝及客户端服务协议</text>
						， 不许下单,坑死你。
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
				num: 10,
				userName: "",
				password: "",
				toggleFlag: false,
				informFlag :false
			}
		},
		methods: {
			// 去注册
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
				//  注册底
			},
			// 登录
			login() {
				console.log(this.toggleFlag);
				if (!this.toggleFlag) {
					uni.showToast({
						title: "勾选下方协议,不同意你就退了别进来",
						icon: 'error'
					})
				} else {
					request({
						url: "/login",
						data: {
							userName: this.userName,
							password: this.password
						}
					}).then(res => {
						console.log(res);
						if (res.data.code == 1 && res.data.token !== null) {
							uni.setStorage({
								key: "token",
								data: res.data.token
							})
							uni.setStorage({
								key: "useId",
								data: JSON.stringify(res.data.userId)
							})
							uni.setStorage({
								key: "userName",
								data: res.data.userName
							})
							uni.showToast({
								title: "登陆成功",
								icon: 'success'
							})
							this.password = ''
							this.userName = ''
						} else {
							uni.showToast({
								title: "用户名或密码错误",
								icon: 'error'
							})
							this.password = ''
							this.userName = ''
						}
					})
				}
			},
			// 
			toggleFlagFun() {
				this.toggleFlag = !this.toggleFlag
			},
			informFlagFun(){
				this.informFlag = true
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
	@import "./login.scss"
</style>