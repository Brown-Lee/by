<template>
	<view class="category">
		<view class="search-input-container">
			<view class="search-input" @click="sosuo()">
				<text class="searchIcon">
					<image src="/static//fdj.png" webp mode="widthFix heightFix"></image>
				</text>
				<text class="searchIcon_text">请输入你想要的商品</text>
			</view>

		</view>
		<view class="section-classify">
			<view class="section-firstCate">
				<view class="byui-scroll-wrapper">
					<scroll-view scroll-y="1000" style="100%">
						<view class="byui-scroll-content">
							<view class="byui-scroll-content_ul">
								<view :class="['byui-scroll-content_ul_li', activenum==index?'firstCateActive':'']"
									v-for="(item,index) in list" key="{{index}}" @click="actives(index)">
									<view class="byui-scroll-content_ul_li_view" @click="golist(item)">{{item}}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<view class="section-cateList">
				<scroll-view scroll-y style="height: 100%;">
					<view class="byui-scroll-wrapper">
						<view class="byui-scroll-content">
							<view class="byui-scroll-content_ul" style="pointer-events: auto;">
								<view class="cateList-first_li">
									<view class="cateList-first_li_view">
										<view class="first-cateList-item">
											<text class="first-cateList-name-before">一</text>
											<text class="first-cateList-name">{{list_title2}}</text>
											<text class="first-cateList-name-after">一</text>
										</view>
										<view class="ul">
											<view class="cateList-second">
												<view class="list-hd-wrap">
													<view class="list-hd" v-for="(item,index) in list_title"
														key="{{index}}" @click="gotwoDetail(list_title2,item)">
														<view class="list-hd-name">{{item}}</view>
														<view class="list-hd-more">更多 ＞</view>
													</view>
												</view>
												<view class="clear" v-for="(item2,index2) in list_seller"
													key="{{index2}}">
													<view class="cateList-third" v-for="(item3,index3) in j"
														key="index3">
														<view class="cateList-third_item">
															<view class="cateList-third_item_image">
																<image :src="ite.imageUrl" mode=""></image>
															</view>
														</view>
														<view>{{item3.type_two}}</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	import api from '../../api/index.js'
	export default {
		data() {
			return {
				list: [],
				list_title2: [],
				list_title3: [],
				list_title: [],
				list_seller: [],
				activenum: 0
			}
		},
		methods: {
			gotwoDetail(id,item){
				uni.navigateTo({
					url:`/pages/result/result?search=${id}`
				})
			},
			sosuo() {
				uni.navigateTo({
					url: "/pages/history/history"
				})
			},
			actives(i) {
				this.activenum = i
			},
			golist(id) {
				this.list_title2 = id
				console.log(id);
				api({
					url: `/getTypeTwo`,
					data: {
						type_one: id
					}
				}).then((res) => {
					console.log(res);
					this.list_title = res
					// for (var i = 0; i < res.length; i++) {
					// 	this.list_seller[i]=[]
					// }
					// for (var i = 0; i < res.length; i++) {
					// 	console.log(res[i]);
					// 	api({
					// 		url: `/getTypeTwoList`,
					// 		data: {
					// 			type_one: id,
					// 			type_two: res[i]
					// 		}
					// 	}).then((ress) => {
					// 		console.log(ress);
					// 		this.list_seller[i]=ress




					// 	})
					// }

					//          for (var j = 0; j < this.list_seller; j++) {

					// 	if(j > 4){

					// 	console.log(this.list_seller);
					// 	}
					// }

				})


			},
			onData() {
				api({
					url: `/getTypeone`
				}).then((res) => {
					console.log(res);
					this.list = res
					this.list_title2 = res[0]
					this.list_title3=res[0]
				})
			},
			onData2() {
				api({
					url: `/getTypeTwo`,
					data: {
						type_one: '个护'
					}
				}).then((res) => {
					console.log(res);
					this.list_title = res
				
				})
			},
		},
		onLoad() {
			this.onData()
			this.onData2()
			
		}

	}
</script>

<style lang="scss">
	@import './category.scss';
</style>
