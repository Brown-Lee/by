<style lang="scss">
	.result {
		width: 100%;
		background-color: #eee;

		.result_title {
			width: 100%;
			background-color: #eee;

			.title {
				width: 100%;
				text-align: center;
				line-height: 100rpx;
			}

			.content {
				width: 100%;
				overflow-x: scroll;

				&::-webkit-scrollbar {
					width: 10px;
					height: 5px;
					background-color: #eee;
					border-radius: 5px;
				}

				&::-webkit-scrollbar-thumb {
					height: 2px !important;
					border-radius: 8px;
					background: #eee;
					border-top: 1px solid #a6a6a6;
				}

				.mini_title {
					// width: 700px;
					height: 60rpx;
					padding: 0 20rpx;
					white-space: nowrap;
					box-sizing: border-box;

					.active {
						background-color: #1296db;
						color: #eee;
					}

					.title_item {
						float: left;
						width: 100px;
						text-align: center;
						white-space: nowrap;
						padding: 5rpx 10rpx;
						box-sizing: border-box;
						font-size: 24rpx;
						border-radius: 20rpx;
					}
				}
			}

		}

		.goods {
			width: 100%;
			padding: 20rpx;
			box-sizing: border-box;

			.goods_item {
				width: 100%;
				height: 200rpx;
				margin: 32rpx 0;
				padding: 12rpx;
				box-sizing: border-box;
				background-color: #fff;

				.cover {
					display: block;
					width: 200rpx;
					height: 100%;
					float: left;
				}

				.info {
					.title {
						font-size: 30rpx;
						white-space: nowrap;
					}

					.desc {
						font-size: 24rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.supplier {
						font-size: 18rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.price {
						color: #F7A701;
					}
					
					.evaluate{
						font-size: 16rpx;
						color: #a6a6a6;
					}
				}
			}
		}
	}
</style>
<template>
	<view class="result">
		<view class="result_title">
			<view class="title">{{ search }}</view>
			<view class="content">
				<view class="mini_title" :style="{width: ((titles.length * 100) + 100) + 'px'}">
					<template v-for="item, i in titles" :key="i">
						<text :class="index == i ? 'active title_item' : 'title_item'">{{ item }}</text>
					</template>
				</view>
			</view>
		</view>
		<view class="goods">
			<template v-for="item in list" :key="item.Id">
				<div class="goods_item">
					<image class="cover" :src="item.imageUrl" mode="heightFix"></image>
					<view class="info">
						<view class="title">{{ item.title }}</view>
						<view class="desc">{{ item.salePoint }}</view>
						<view class="supplier">{{ item.supplier }}</view>
						<view class="price">
							<text style="font-size: 24rpx;">￥</text>{{ item.priceStr }}
						</view>
						<view class="evaluate">{{ item.evaluate }}条好评</view>
					</view>
				</div>
			</template>
		</view>
	</view>
</template>

<script>
	import request from '@/api/index.js'
	export default {
		data() {
			return {
				index: 0,
				search: '',
				titles: [],
				list: []
			}
		},
		methods: {
			onData(search) {
				request({
					url: `/search?word=${search}`
				}).then(res => {
					res.forEach(item => {
						if (item.type_two == this.titles[this.index]) {
							this.list.push(item)
						}
					})
					console.log(this.list);
				})
			},
			onInit(search) {
				this.search = search
				request({
					url: `/getTypeTwo?type_one=${search}`
				}).then(res => {
					console.log(res);
					this.titles = res
				})
			}
		},
		onLoad(option) {
			this.onInit(option.search)
			this.onData(option.search)
		}
	}
</script>