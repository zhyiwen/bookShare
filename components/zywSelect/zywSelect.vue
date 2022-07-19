<template>
	<view class="zyw-select">
		<u-input :value="label" input-align="right" type="select" placeholder=" " :custom-style="customStyle" @click="show = true" />
		<u-select v-model="show" :list="list" @confirm="selectConfirm" v-if="pickerType=='select'"></u-select>
		<u-picker v-model="show" :mode="pickerType" v-else @confirm="selectConfirm"></u-picker>
	</view>
</template>

<script>
	export default {
		name:"zywSelect",
		data() {
			return {
				show: false
			};
		},
		props:{
			label:{
				type: String
			},
			list:{
				type: Array,
				require: true
			},
			// 输入框的自定义样式
			customStyle: {
				type: Object,
				default() {
					return {};
				}
			},
			pickerType:{
				type: String,
				default: 'select'
			}
		},
		methods:{
			selectConfirm(obj){
				this.$emit('confirm',obj)
			}
		}
	}
</script>

<style lang="scss">

</style>