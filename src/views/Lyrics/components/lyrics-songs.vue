<template>
	<div class="lyrics-songs">
		<div class="songs">
			<div class="info">
				<span class="songName">{{ songName }}</span>
				<span class="singer" v-if="singer">
					歌手：<router-link
						@click="$store.commit('song/SHOWLYRICS', false)"
						:to="`/singer/${item.id}`"
						v-for="item in singer"
						:key="item.id"
						>{{ item.name }}</router-link
					>
				</span>
				<a class="album" v-if="album">专辑：{{ album }}</a>
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
import { computed, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'LyricsSongs',
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
		watch(
			() => store.state.song.playerTime,
			newVal => {
				let indx = nowIndx(newVal);
				let dom = lis.value[indx];
				let father = ul.value.clientHeight / 2;
				if (indx < 0) {
					y.value = -father;
				} else {
					y.value = dom.offsetTop + dom.clientHeight / 2 - father;
				}
			}
		);
		onMounted(() => {});
		return {
			lyr,
			indx,
			y,
			lis,
			ul,
			songName: computed(() => store.getters['song/songName']),
			singer: computed(() => store.getters['song/singer']),
			album: computed(() => store.getters['song/album']),
		};
	},
};
</script>

<style lang="less" scoped>
.lyrics-songs {
	width: 50rem;
	.songs {
		width: 100%;
		height: 100%;
		color: #fff;
		.info {
			display: flex;
			flex-wrap: wrap;
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
				font-size: 2rem;
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
				hsla(0, 0%, 100%, 0.6) 15%,
				#fff 25%,
				#fff 75%,
				hsla(0, 0%, 100%, 0.6) 85%,
				hsla(0, 0%, 100%, 0)
			);
			ul {
				transition: transform 0.3s ease-out;
				li {
					text-align: center;
					padding: 1rem 0;
					font-size: 1rem;
					transition: all 0.3s ease-out;
				}
				.active {
					color: #1ecc94;
					font-size: 1.2rem;
				}
			}
		}
	}
}
</style>
