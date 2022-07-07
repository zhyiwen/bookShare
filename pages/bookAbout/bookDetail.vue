<!-- 图书详情页 -->
<template>
	<view class="page-content page-padding-lr">
		<view class="book-title" v-cloak>
			{{bookInfo.title}}
			<view class="book-like" v-if="myBooks !== 1">
				<uni-icons type="heart-filled" color="#dd524d" size="22" v-if="bookInfo.store" @click="toStore"></uni-icons>
				<uni-icons type="heart" color="#444" size="22" v-else @click="toStore"></uni-icons>
			</view>
		</view>
		<image class="book-img" :src="bookInfo.cover_url" mode="aspectFill"></image>
		<view class="book-desc">
			{{bookInfo.abstract}}
		</view>
		<view class="book-rate" v-cloak>
			<uni-rate :value="bookInfo.rating.star_count" v-if="bookInfo.rating.value != 0"></uni-rate>
			<view class="book-douban">
				<view v-if="bookInfo.rating.value != 0">豆瓣评分：<text class="span">{{bookInfo.rating.value}}</text></view>
				<view v-else>暂无评分</view>
			</view>
		</view>
		<view class="user-info">
			<view class="user-avatar">
				<image :src="bookInfo.user.avatarUrl" mode="aspectFill" style="width: 100%;height: 100%;"></image>
			</view>
			<view class="user-name">{{bookInfo.user.nickName}}</view>
		</view>
	</view>
</template>

<script>
	import cloudApi from "@/common/cloudApi.js"
	export default {
		data() {
			return {
				id:'',
				user:'',
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
			this.user = uni.getStorage('jwt')
			console.log(this.user)
			this.getInfo();
		},
		methods: {
			// 获取图书详情
			async getInfo() {
				await cloudApi.call({
					name: "books",
					data: {
						action: "getBookDetail",
						id: this.id
					},
					success: (res) => {
						console.log('所有信息',res)
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
			// 收藏图书
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
.user-info{
	position: relative;
	margin-top: 80rpx;
	background-color: #8cb6ff;
	border-radius: 20rpx;
	color: #fff;
	padding: 20rpx;
	min-height: 100rpx;
	.user-avatar{
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		width: 70rpx;
		height: 70rpx;
		border-radius: 14rpx;
		overflow: hidden;
	}
	.user-name{
		font-weight: bold;
		font-size: 32rpx;
	}
}
</style>
