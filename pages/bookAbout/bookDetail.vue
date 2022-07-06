<!-- 图书详情页 -->
<template>
	<view class="page-content page-padding-lr">
		<view class="book-title">
			{{bookInfo.title}}
			<view class="book-like">
				<uni-icons type="heart-filled" color="#dd524d" size="22" v-if="bookInfo.store" @click="toStore"></uni-icons>
				<uni-icons type="heart" color="#444" size="22" v-else @click="toStore"></uni-icons>
			</view>
		</view>
		<image class="book-img" :src="bookInfo.cover_url" mode="aspectFill"></image>
		<view class="book-desc">
			{{bookInfo.abstract}}
		</view>
		<view class="book-rate" v-cloak>
			<uni-rate :value="bookInfo.rating.star_count"></uni-rate>
			<view class="book-douban">豆瓣评分：<text class="span">{{bookInfo.rating.value}}</text></view>
		</view>
	</view>
</template>

<script>
	import cloudApi from "@/common/cloudApi.js"
	export default {
		data() {
			return {
				id:'',
				myBooks: 0,
				bookInfo: null
			};
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id;
			if(options.mybooks){
				this.mybooks = 1
			}
			this.getInfo()
		},
		methods: {
			// 获取图书详情
			async getInfo() {
				await cloudApi.call({
					name: "books",
					data: {
						action: "getBookDetail",
						id: this.id,
						myBooks: this.myBooks
					},
					success: (res) => {
						console.log(res)
						this.bookInfo = res.result;
						let doubanVal = res.result.rating.value;
						this.bookInfo.rating.value = doubanVal.toFixed(1);
					}
				})
			},
			toStore(){
				if(this.bookInfo.store){
					this.bookInfo.store = 0;
				}else{
					this.bookInfo.store = 1;
				}
				this.toChangeStore()
			},
			async toChangeStore(){
				await cloudApi.call({
					name: "books",
					data: {
						action: "changeStore",
						id: this.id,
						store: this.bookInfo.store
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.book-title{
	position: relative;
	font-size: 36rpx;
	font-weight: bold;
	padding-top: 16rpx;
	padding-right: 60rpx;
	// overflow: hidden;
	// white-space: nowrap;
	// word-break: keep-all;
	// text-overflow: ellipsis;
	.book-like{
		position: absolute;
		top: 0;
		right: 0;
		line-height: 80rpx;
	}
}
.book-img{
	display: block;
	width: 500rpx;
	height: 700rpx;
	margin: 40rpx auto;
	box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
}
.book-desc{
	margin-top: 60rpx;
	font-size: 24rpx;
	color: $uni-text-color-disable;
}
.book-rate{
	position: relative;
	margin-top: 30rpx;
	.book-douban{
		position: absolute;
		top: 0;
		right: 0;
		font-weight: 200;
		font-size: 24rpx;
		color: $uni-text-color-placeholder;
		text-align: right;
		.span{
			font-size: 40rpx;
			color: $uni-color-warning;
			font-weight: bold;
		}
	}
}
</style>
