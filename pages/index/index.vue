<template>
	<view>
		
	</view>
</template>

<script>
	import request from '@/api/index.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
		},
		onLoad() {
			request({
				url: '/hotList?page=1'
			}).then(res => {
				console.log(res);
			})
		}
	}
</script>

<style lang="scss">

</style>
