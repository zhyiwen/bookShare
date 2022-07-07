<template>
	<view class="page-content">
		<view class="search-cont sticky">
			<view class="search-box">
				<uni-search-bar placeholder="搜索图书" v-model="searchLabel" :radius="100" cancelButton="none" @confirm="requestBookList" />
			</view>
			<view class="button-box">
				<button class="u-reset-button add-btn" @click="btnScan">
					<uni-icons type="plusempty" size="20" color="#fff"></uni-icons>
				</button>
			</view>
		</view>
		<zyw-books :list="bookList" myBook></zyw-books>
	</view>
</template>

<script>
	import cloudApi from "@/common/cloudApi.js"
	import zywBooks from "@/components/zywBookList/zywBookList.vue"
	export default {
		components:{
			zywBooks
		},
		data() {
			return {
				bookList: [],
				searchLabel: ""
			};
		},
		onLoad() {
			this.requestBookList();
		},
		methods: {
			// 扫码添加图书
			btnScan() {
				uni.scanCode({
					success: async (res) => {
						const isbnres = await cloudApi.call({
							name: "ISBNQuery",
							data: {
								isbn: res.result
							}
						})
						await cloudApi.call({
							name: "books",
							data: {
								action: "add",
								isbnid: isbnres.result._id,
							}
						})

						this.requestBookList();
					}
				})
			},
			// 获取图书列表
			async requestBookList() {
				await cloudApi.call({
					name: "books",
					data: {
						action: "listbyshelf",
						searchLabel: this.searchLabel
					},
					success: (res) => {
						this.bookList = res.result.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.books-group {
		margin-top: 0px;
	}

	.search-cont {
		display: flex;
	}

	.search-box {
		flex: 1;
	}

	.button-box {
		width: 80rpx;
		text-align: right;
		padding: 10px 10px 0 0;
		box-sizing: border-box;

		.add-btn {
			position: relative;
			background: linear-gradient(to bottom, #9faee6, #76e9d6);
			border-radius: 50%;
			width: 50rpx;
			height: 50rpx;
			margin-top: 10rpx;
			margin-right: 0;
			text-align: center;
			line-height: 50rpx;
			box-sizing: border-box;
			padding: 0;
		}
	}
</style>
