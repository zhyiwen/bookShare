<!-- 编辑个人信息 -->
<template>
	<view class="page-content page-gray" style="padding-top: 10rpx;">
		<u-form :model="form" ref="uForm">
			<u-form-item v-if="selection == 'nickName'">
				<u-input v-model="userInfo.nickName" placeholder="昵称" />
			</u-form-item>
			<u-form-item v-else-if="selection == 'phone'">
				<u-input v-model="userInfo.phone" placeholder="手机号码" />
			</u-form-item>
		</u-form>
		<u-button class="sub-btn" type="primary" @click="submit">保存</u-button>
	</view>
</template>

<script>
	import cloudApi from "@/common/cloudApi.js"
	export default {
		data() {
			return {
				selection: '',
				userInfo: {
					nickName: '',
					phone: '',
				},
				changeInfo: null
			};
		},
		onLoad(options) {
			console.log(options)
			this.selection = options.text;
			this.userInfo[options.text] = options.val || '';
			if (options.text == 'nickName') {
				uni.setNavigationBarTitle({
					title: "昵称"
				})

			} else if (options.text == 'phone') {
				uni.setNavigationBarTitle({
					title: "手机号码"
				})
			}
		},
		methods: {
			submit() {
				if (this.selection == 'nickName') {
					this.changeInfo = {
						nickName: this.userInfo.nickName
					}
				} else if (this.selection == 'phone') {
					this.changeInfo = {
						phone: this.userInfo.phone
					}
				}
				this.updateUserInfo();
			},
			updateUserInfo() {
				cloudApi.call({
					name: "updateuserinfo",
					data: {
						action: 'updateUser',
						userInfo: this.changeInfo
					},
					success:(res)=>{
						uni.showToast({
							icon:'success',
							title:'修改成功！'
						})
						setTimeout(() => {
							let pages = getCurrentPages(); //获取所有页面栈实例列表
								let nowPage = pages[pages.length - 1]; //当前页页面实例
								let prevPage = pages[pages.length - 2]; //上一页页面实例
								if (this.selection == 'nickName') {
									prevPage.$vm.userInfo.nickName = this.userInfo.nickName; //修改上一页data里面的userInfo.nickName 参数值
								} else if (this.selection == 'phone') {
									prevPage.$vm.userInfo.phone = this.userInfo.phone; //修改上一页data里面的tagIndex 参数值
								}
							uni.navigateBack();
						}, 2000);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-form {
		background-color: #fff;
		padding: 0 30rpx;
	}

	.sub-btn {
		display: block;
		padding: 30rpx;
	}
</style>
