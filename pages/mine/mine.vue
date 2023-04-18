<template>
	<view class="">
		{{num}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
num:10
			}
		},
		onLoad() {
			 uni.navigateTo({
			 	url: "/pages/login/login"
			 })
		},
		methods: {


		}
	}
</script>
<style>
</style>