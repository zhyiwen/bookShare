<!-- 我的信息 -->
<template>
	<view class="page-content page-gray">
		<uni-list>
			<uni-list-item title="头像" clickable @click="onClick"></uni-list-item>
			<uni-list-item title="昵称">
				<text slot="footer">自定义插槽</text>
			</uni-list-item>
			<uni-list-item title="手机号码">
				<text slot="footer">自定义插槽</text>
			</uni-list-item>
		</uni-list>
		<view style="height: 24rpx;"></view>
		<uni-list>
			<uni-list-item title="性别" clickable @click="onClick"></uni-list-item>
			<uni-list-item title="生日" clickable @click="onClick"></uni-list-item>
			<uni-list-item title="地区" clickable @click="onClick"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			updateUserInfo() {
				// #ifdef MP-WEIXIN
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (res) => {
						console.log(res);
						this.userInfo = Object.assign(this.userInfo, res.userInfo);
						cloudApi.call({
							name: "updateuserinfo",
							data: {
								userInfo: this.userInfo
							}
						})
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">

</style>
