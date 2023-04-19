<template>
	<view class="">
		我的
	</view>
</template>

<script>
	import request from '../../api/index.js'
	export default {
		data() {
			return {
				token: ""
			}
		},
		onLoad() { 
			uni.getStorage({
				key: "token",
				success: (res) => {
					console.log(res.data);
					this.token = res.data
				}
			})
			if (!this.token) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}else{
				return
			} 
		}, 
		
		methods: {


		}
	}
</script>
<style>
</style>