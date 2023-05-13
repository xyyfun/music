<template>
	<div class="app-icon">
		<a href="javascript:;" v-if="fee === 1">
			<i class="iconfont icon-shiting"></i>
		</a>
		<a href="javascript:;" v-if="fee === 1">
			<i class="iconfont icon-VIP"></i>
		</a>
		<router-link :to="`/player?vid=${mv}&type=mv`" v-if="mv">
			<i class="iconfont icon-MV"></i>
		</router-link>
		<a href="javascript:;" v-if="originCoverType === 1">
			<i class="iconfont icon-originality"></i>
		</a>
	</div>
</template>

<script>
export default {
	name: 'AppIcon',
	props: {
		fee: {
			type: Number,
			default: 0,
		},
		originCoverType: {
			type: Number,
			default: 0,
		},
		mv: {
			type: Number,
			default: 0,
		},
	},
};
</script>

<style lang="less" scoped>
.app-icon {
	a {
		margin: 0 0.2rem;
		i {
			font-size: 1.3rem;
		}
		.icon-shiting {
			color: #ff6664;
		}
		.icon-VIP {
			color: #1fd3ac;
		}
		.icon-MV {
			color: #e5b046;
		}
		.icon-originality {
			color: #ef8a54;
		}
	}
}
</style>
