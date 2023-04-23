<template>
	<div class="singer-description" v-if="artist.id">
		<div class="description">
			<img :src="artist.avatar + '?param=500y500'" alt="" />
			<div class="meta">
				<div class="singerName">
					<div class="name">{{ artist.name }}</div>
					<div class="identify" v-if="identify">
						<img v-if="identify.imageUrl" :src="identify.imageUrl + '?param=50y50'" alt="" />
						<span>{{ identify.imageDesc }}</span>
					</div>
				</div>
				<div class="fansNum">{{ artist.briefDesc }}</div>
				<div class="utils">
					<ul>
						<li>
							<a href="javascript:;" class="active"><i class="iconfont icon-xinjian"></i> 关注</a>
						</li>
						<li>
							<a href="javascript:;"><i class="iconfont icon-diantai"></i>歌手电台</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getSingerDetail } from '@/api/singer';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
export default {
	name: 'SingerDescription',
	setup() {
		const route = useRoute();
		const artist = ref({});
		const identify = ref({});
		watch(
			() => route.params.id,
			newVal => {
				artist.value = {};
				identify.value = {};
				if (newVal) {
					getSingerDetail(newVal).then(data => {
						artist.value = data.data.data.artist;
						identify.value = data.data.data.identify;
					});
				}
			},
			{ immediate: true }
		);
		return { artist, identify };
	},
};
</script>

<style lang="less" scoped>
.singer-description {
	.description {
		position: relative;
		width: 100%;
		height: 28rem;
		> img {
			position: absolute;
			width: 100%;
			object-fit: scale-down;
		}
		.meta {
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			bottom: 0;
			background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent 100%);
			padding: 1.78rem;
			width: 100%;
			height: 50%;
			.singerName {
				display: flex;
				align-items: flex-end;
				color: #fff;
				.name {
					font-size: 3rem;
				}
				.identify {
					display: flex;
					align-items: center;
					height: 1.5rem;
					margin-bottom: 0.5rem;
					margin-left: 0.5rem;
					background-color: rgba(237, 64, 54, 0.3);
					border-radius: 0.75rem;
					img {
						height: 1.5rem;
						font-size: 1rem;
					}
					span {
						padding: 0.5rem;
					}
				}
			}
			.fansNum {
				text-indent: 2rem;
				color: 0.8rem;
				color: #eee;
				margin-bottom: 1rem;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
			.utils {
				ul {
					display: flex;
					li {
						margin-right: 1rem;
						a {
							padding: 0.5rem 2rem;
							background-color: rgba(255, 255, 255, 0.4);
							backdrop-filter: blur(5px);
							color: #000;
							border-radius: 5rem;
							font-size: 0.9rem;
						}
						i {
							padding: 0 5px;
						}
						.active {
							background-color: #1ecf9e;
							color: #fff;
						}
					}
				}
			}
		}
	}
}
</style>
