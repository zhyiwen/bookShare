<template>
	<view class="zyw-tabs">
		<view class="zyw-tabs-item" :class="{'active': current==index}" v-for="(item, index) in list" :key="index" @tap="clickTab(index)">
			<view class="item-title">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "zyw-tabs",
		props: {
			//需循环的标签列表
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			// 当前活动tab的索引
			current: {
				type: [Number, String],
				default: 0
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 点击某一个tab菜单
			clickTab(index) {
				// 点击当前活动tab，不触发事件
				if(index == this.current) return ;
				// 发送事件给父组件
				this.$emit('change', index);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.zyw-tabs{
		.zyw-tabs-item{
			position: relative;
			display: inline-block;
			margin-right: 60rpx;
			font-size: 30rpx;
			line-height: 2;
			color: #444;
			&.active{
				font-weight: bold;
				color: #333;
				&::after{
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					height: 2px;
					background-color: #333;
				}
			}
		}
	}
</style>
