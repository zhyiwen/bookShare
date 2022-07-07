<template>
	<view class="page-content">
		<view class="sticky">
			<view class="search-cont">
				<uni-search-bar placeholder="搜索图书" v-model="searchLabel" :radius="100" cancelButton="none" @confirm="requestBookList" />
			</view>
		</view>
		<zyw-books :list="bookList"></zyw-books>
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
			// 获取图书列表
			async requestBookList() {
				await cloudApi.call({
					name: "books",
					data: {
						action: "listAll",
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

</style>
