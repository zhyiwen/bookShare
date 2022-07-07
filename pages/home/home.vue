<template>
	<view class="page-content">
		<view class="user-info">
			<view class="user-name">{{userInfo.nickName}}</view>
			<view class="user-address" v-if="userInfo.city">{{userInfo.city}}</view>
			<view class="user-text-cont">
				<text class="text-value">34</text>本
				<view class="text-label">借阅数量</view>
			</view>
			<view class="user-text-cont">
				<text class="text-value">34</text>本
				<view class="text-label">拥有图书</view>
			</view>
			<view class="user-logo" @click="updateUserProfile">
				<!-- <u-avatar :src="userInfo.avatarUrl" size="80" @click="updateUserProfile"></u-avatar> -->
				<image class="logo-img" :src="userInfo.avatarUrl" mode="aspectFill"></image>
			</view>
		</view>
			<view class="tab-cont sticky">
				<zyw-tabs :list="list" font-size="36" bar-width="80" :is-scroll="true"
					:current="tabCurrent" @change="tabChange">
				</zyw-tabs>
			</view>
		<zyw-books :list="bookList"></zyw-books>
	</view>
</template>

<script>
	import cloudApi from "@/common/cloudApi.js"
	import zywTabs from "@/components/zyw-tabs/zyw-tabs.vue"
	import zywBooks from "@/components/zywBookList/zywBookList.vue"
	export default {
		components:{
			zywTabs,
			zywBooks
		},
		data() {
			return {
				list: [{
					name: '借阅',
				}, {
					name: '捐赠',
				}, {
					name: '心愿'
				}],
				tabCurrent: 0,
				userInfo:null,
			};
		},
		async onLoad(options){
			// #ifdef MP-WEIXIN
			uni.login({
				provider:"weixin",
				success: (res) => {
					var code = res.code;
					
					cloudApi.call({
						name:"login",
						data:{
							code:code
						},
						success: (res) => {
							console.log(res)
							this.userInfo = res.result;
							uni.setStorage({
								key: 'jwt',
								data: this.userInfo.token,
								success: function () {
									console.log('success');
								}
							});
						}
					})
				}
			})
			// #endif
		},
		methods: {
			tabChange(index) {
				this.tabCurrent = index;
			},
			updateUserProfile(){
				uni.navigateTo({
					url:'/pages/home/editUserInfo'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-info {
		position: relative;
		padding: 30rpx 60rpx;
		height: 180rpx;

		.user-name {
			font-size: 30rpx;
			font-size: #333;
		}

		.user-address {
			font-size: 18rpx;
			color: #ccc;
		}

		.user-text-cont {
			width: 180rpx;
			float: left;
			margin-top: 20rpx;
			color: #ccc;
			font-size: 18rpx;

			.text-label {
				color: #ccc;
				font-size: 18rpx;
			}

			.text-value {
				font-weight: bold;
				color: #333;
				font-size: 30rpx;
				margin-right: 4px;
			}
		}

		.user-logo {
			position: absolute;
			top: 50%;
			right: 60rpx;
			transform: translate(0, -50%);
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			background-color: #eee;
			background-image: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-4d4bcec8-9bb4-4b76-aa37-70d035ec49a6/bd3bff75-0543-4c1b-bef6-f739b833ff66.png") no-repeat 100% 100%;
			.logo-img{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
		}
	}
</style>
