<template>
	<ul>
		<li v-for="item in playlist" :key="item.id">
			<a href="javascript:;">
				<div class="img">
					<img :src="item.picUrl" alt="" />
					<div class="mask"></div>
				</div>
			</a>
			<div class="description ellipsis">{{ item.name }}</div>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'MusicList',
	props: {
		playlist: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
ul {
	display: flex;
	flex-flow: wrap;
	li {
		flex-shrink: 0;
		padding-right: 0.8rem;
		padding-top: 0.8rem;
		.img {
			position: relative;
			transition: transform 0.3s;
			> img {
				border-radius: 0.5rem;
			}
			.mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5) url('../../assets/images/cover_play.png') no-repeat;
				background-position: center center;
				background-size: 3.5rem;
				border-radius: 0.5rem;
				opacity: 0;
			}
			&:hover > .mask {
				opacity: 1;
				transition: opacity 0.3s;
			}
			&:hover {
				transform: translateY(-0.3rem);
			}
		}
		.description {
			font-size: 0.8rem;
			height: 1.5rem;
			line-height: 1.5rem;
		}
	}
}
// 屏幕小于1024px
@media screen and (max-width: 1024px) {
	.playlist {
		li {
			width: 25%;
		}
	}
}
@media screen and (min-width: 1024px) {
	.playlist {
		li {
			width: 20%;
		}
	}
}
@media screen and (min-width: 1280px) {
	.playlist {
		li {
			width: 15%;
		}
	}
}
@media screen and (min-width: 1536px) {
	.playlist {
		li {
			width: 10%;
		}
	}
}
</style>
