<template>
	<view class="login_nav">
		<!-- 账号密码框 -->
		<view class="login_info">
			<view class="flex">
			 <text>账号:</text>	<input type="text" placeholder="请输入账号">
			</view>
			<view class="flex">
				<text>密码:</text> <input type="safe-password" password placeholder="请输入密码">
			</view>
			<button type="primary">登录</button> <button type="default">注册</button>
		</view>
	</view>
</template>

<script>
	import './login.js'
	
</script>

<style lang="scss" scoped>
	@import "./login.scss"
</style>