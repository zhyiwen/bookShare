<template>
	<view class="books-group clearfix">
		<view class="books-col" v-for="item in list" :key="item._id">
			<view class="books-item" @click="toDetail(item._id)">
				<image class="item-img" :src="item.cover_url" mode="aspectFill"></image>
				<view class="item-title">{{item.title}}</view>
				<!-- <view class="item-rating">{{item.rating.value}}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zywBookList",
		data() {
			return {

			};
		},
		props: {
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			myBook: Boolean
		},
		methods:{
			toDetail(id){
				console.log(id)
				if(this.myBook){
					uni.navigateTo({
						url: '/pages/bookAbout/bookDetail?id='+id+'&myBook=1'
					});
				}else{
					uni.navigateTo({
						url: '/pages/bookAbout/bookDetail?id='+id
					});
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.books-group {
		margin: 20rpx;

		.books-col {
			width: 33.333333%;
			float: left;
			padding: 20rpx;
			box-sizing: border-box;
		}

		.books-item {
			position: relative;

			.item-img {
				width: 100%;
				height: 250rpx;
			}

			.item-title {
				font-size: 24rpx;
				line-height: 40rpx;
				height: 80rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
			// .item-rating{
			// 	position: absolute;
			// 	bottom: 80rpx;
			// 	right: 10rpx;
			// 	font-weight: bold;
			// 	color: $uni-color-warning;
			// 	text-shadow: 0 0 3px #fff;
			// 	line-height: 40rpx;
			// 	width: 50rpx;
			// 	text-align: center;
			// }
		}
	}
</style>
