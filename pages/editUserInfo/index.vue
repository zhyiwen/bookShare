<!-- 我的信息 -->
<template>
	<view class="page-content page-gray">
		<u-cell-group v-cloak>
			<u-cell-item title="个人设置" :title-style="{'color':'#000'}" hover-class="cell-hover-class" use-label-slot
				@click="changeUserImg">
				<image :src="userInfo.avatarUrl" mode="" class="user-logo"></image>
			</u-cell-item>
			<u-cell-item title="昵称" :title-style="{'color':'#000'}" :value="userInfo.nickName"></u-cell-item>
			<u-cell-item title="手机号码" :title-style="{'color':'#000'}">
				<view v-if="userInfo.phone">{{userInfo.phone}}</view>
			</u-cell-item>
		</u-cell-group>
		<u-gap height="20" bg-color="#f3f4f5"></u-gap>
		<u-cell-group>
			<u-cell-item title="性别" :title-style="{'color':'#000'}" :value="userInfo.gender==1?'女':'男'" hover-class="cell-hover-class"
				use-label-slot></u-cell-item>
			<u-cell-item title="生日" :title-style="{'color':'#000'}">
				<view v-if="userInfo.birth">{{userInfo.birth}}</view>
			</u-cell-item>
			<u-cell-item title="地区" :title-style="{'color':'#000'}" :value="userInfo.province + '' + userInfo.city"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import cloudApi from "@/common/cloudApi.js"
	export default {
		data() {
			return {
				userInfo: {
					avatarUrl:'',
					nickName: '',
					phone:'',
					gender: 0,
					birth:'',
					province:'',
					city:''
				},
				changeInfo: null
			};
		},
		async created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				// 可以在此上传到服务端
				console.log(path);
				let id =this.userInfo._id;
				uniCloud.uploadFile({
					cloudPath: id + ".jpg",
					filePath: path,
					success: (res) => {
						console.log(res)
						this.userInfo.avatarUrl = res.fileID
						this.changeInfo = {
							avatarUrl: res.fileID
						}
						this.updateUserInfo()
					},
					fail(err) {
						console.log(err)
					},
				})
				
			})
		},
		onLoad() {
			cloudApi.call({
				name:"updateuserinfo",
				data:{
					action: 'getUser'
				},
				success: (res) => {
					console.log(res)
					this.userInfo = res.result;
				}
			})
		},
		methods: {
			updateUserInfo() {
				cloudApi.call({
					name: "updateuserinfo",
					data: {
						action: 'updateUser',
						userInfo: this.changeInfo
					}
				})
			},
			changeUserImg() {
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 400,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 350,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.cell-hover-class {
		background-color: rgb(235, 237, 238);
	}

	.user-logo {
		position: absolute;
		top: 12rpx;
		right: 70rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
</style>
