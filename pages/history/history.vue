<template>
	<view class="history">
		<uni-search-bar class="fixed" v-model="search" @confirm="onSubmit" />
		<view class="history_list">
			<div class="history_title">
				搜索历史
				<div class="clear" v-if="histories.length" @click="onClear">清空历史记录</div>
			</div>
			<view class="history_content">
				<template v-if="histories.length">
					<view class="history_item" v-for="item, i in histories" @click="onNavigate(item)" :key="i">
						<template v-if="i < 10">
							{{ item }}
						</template>
					</view>
				</template>

				<view style="text-align: center;" v-else>暂无搜索 历史</view>
			</view>
		</view>
		<div class="hot_list">
			<view class="hot_title">大家都在搜</view>
			<div class="hot_item" v-for="item in list" :key="item.Id" @click="onDetail(item.Id)">{{ item.title }}</div>
		</div>
	</view>
</template>

<script>
	import request from '@/api/index.js'
	import UniSearchBar from '@/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			UniSearchBar
		},
		data() {
			return {
				search: '',
				histories: [],
				list: []
			}
		},
		methods: {
			onNavigate(it){
				uni.navigateTo({
					url: `/pages/result/result?search=${it}`
				})
			},
			onClear(){
				uni.removeStorageSync('histories')
				this.onHistories()
			},
			onSubmit() {
				this.histories.unshift(this.search)
				uni.setStorageSync('histories', JSON.stringify(this.histories))
				uni.navigateTo({
					url: `/pages/result/result?search=${this.search}`
				})
				this.search = ''
			},
			onDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			},
			onHistories(){				
				let history_list = uni.getStorageSync('histories') || JSON.stringify([])
				this.histories = JSON.parse(history_list)
			},
			onInit() {
				request({
					url: '/rmsp'
				}).then(res => {
					this.list = res
				})
			}
		},
		onLoad() {
			this.onHistories()
			this.onInit()
		}

	}
</script>

<style lang="scss">
	.history {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		position: relative;

		.fixed {
			width: 100%;
			padding: 0 20px;
			box-sizing: border-box;
			margin-top: 40px;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9;
		}

		.history_list {
			width: 100%;
			margin-top: 40rpx;

			.history_title,
			.history_content {
				padding: 20rpx;
				box-sizing: border-box;

				.clear {
					text-align: right;
					font-size: 24rpx;
					color: #a6a6a6;
				}

				.history_item {
					float: left;
					margin: 8rpx;
					padding: 10rpx;
					box-sizing: border-box;
					background-color: #eee;
				}

				&::after {
					content: '';
					display: block;
					clear: both;
				}
			}
		}

		.hot_list {
			width: 100%;

			.hot_title {
				width: 100%;
				margin: 16rpx 0;
				font-size: 30rpx
			}

			.hot_item {
				margin: 32rpx;
				position: relative;
				font-size: 24rpx;

				&::after {
					content: '';
					display: block;
					width: 25rpx;
					height: 25rpx;
					background: url('https://static.biyao.com/mnew/img/master/search/search_hot@2x_d1347a2.png') no-repeat;
					background-size: 100% 100%;
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>