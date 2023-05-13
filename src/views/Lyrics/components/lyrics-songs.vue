<template>
	<div class="lyrics-songs">
		<div class="songs">
			<div class="info">
				<div class="songName">
					<span>{{ songName }}</span>
					<AppIcon :fee="fee" :originCoverType="originCoverType" :mv="mv" />
				</div>
				<span class="singer" v-if="singer">
					歌手：<router-link
						@click="$store.commit('song/SHOWLYRICS', false)"
						:to="`/singer/${item.id}`"
						v-for="item in singer"
						:key="item.id"
						>{{ item.name }}</router-link
					>
				</span>
				<span class="album" v-if="album">
					<router-link @click="$store.commit('song/SHOWLYRICS', false)" :to="`/album/${album.id}`">
						专辑：{{ album.name }}
					</router-link>
				</span>
			</div>
			<div class="lyr" ref="ul">
				<ul :style="{ transform: `translateY(${-y}px)` }">
					<li
						v-for="(item, index) in lyr"
						:key="index"
						ref="lis"
						:class="{ active: index === indx }">
						{{ item.lyrics }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, watch, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import AppIcon from '@/components/app-icon';
export default {
	name: 'LyricsSongs',
	components: { AppIcon },
	setup() {
		const store = useStore();
		const lis = ref([]);
		const ul = ref(null);
		const y = ref(null);
		const indx = ref(0);
		const lyr = computed(() => store.getters['song/lyr']);
		// 当前播放音乐下标
		const nowIndx = val => {
			for (let i = 0; i < lyr.value.length; i++) {
				if (val < lyr.value[i].time) {
					indx.value = i - 1;
					return i - 1;
				}
			}
			indx.value = lyr.value.length - 1;
			return lyr.value.length - 1;
		};
		onMounted(() => {
			watch(
				() => store.state.song.playerTime,
				newVal => {
					let indx = nowIndx(newVal);
					let currentLi = lis.value[indx];
					let father = ul.value.clientHeight / 2;
					if (indx < 0) {
						y.value = -father;
					} else {
						y.value = currentLi.offsetTop + currentLi.clientHeight / 2 - father;
					}
				},
				{ immediate: true }
			);
		});
		return {
			lyr,
			indx,
			y,
			lis,
			ul,
			songName: computed(() => store.getters['song/songName']),
			singer: computed(() => store.getters['song/singer']),
			album: computed(() => store.getters['song/album']),
			fee: computed(() => store.state.song.detail.fee),
			originCoverType: computed(() => store.state.song.detail.originCoverType),
			mv: computed(() => store.state.song.detail.mv),
		};
	},
};
</script>

<style lang="less" scoped>
.lyrics-songs {
	width: 30rem;
	.songs {
		width: 100%;
		height: 100%;
		color: #fff;
		.info {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			height: 10rem;
			padding: 1rem 0;
			.singer {
				a {
					&::after {
						content: ' / ';
					}
					&:last-child {
						&::after {
							display: none;
						}
					}
				}
			}
			span,
			a {
				color: #fff;
				width: 100%;
				text-align: center;
				font-size: 0.9rem;
			}
			.songName {
				display: flex;
				align-items: center;
				span {
					font-size: 1.8rem;
					margin-right: 0.5rem;
				}
			}
		}
		.lyr {
			height: 28rem;
			// overflow: auto;
			// &::-webkit-scrollbar {
			// 	display: none;
			// }
			-webkit-mask-image: linear-gradient(
				180deg,
				hsla(0, 0%, 100%, 0) 0,
				hsla(0, 0%, 100%, 0.6) 20%,
				#fff 30%,
				#fff 70%,
				hsla(0, 0%, 100%, 0.6) 80%,
				hsla(0, 0%, 100%, 0)
			);
			ul {
				transition: transform 0.3s ease-out;
				padding: 0 4rem;
				li {
					text-align: center;
					padding: 1rem 0;
					font-size: 1rem;
					transition: all 0.3s ease-out;
				}
				.active {
					color: #1ecc94;
					transform: scale(1.3);
				}
			}
		}
	}
}
</style>
