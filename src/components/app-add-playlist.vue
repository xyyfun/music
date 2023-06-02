<template>
	<div class="app-add-playlist">
		<div class="add-playlist">
			<ul>
				<li v-for="item in playlist" :key="item.id">
					<a href="javascript:;" class="ellipsis" @click="addSong(item.id)">{{ item.name }}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getUserPlaylist } from '@/api/user';
import { useStore } from 'vuex';
import { ref, computed, onMounted } from 'vue';
import { changPlaylist } from '@/api/playlist';
import message from '@/utils/message';
export default {
	name: 'AppAddPlaylist',
	props: {
		songId: {
			type: Number,
			default: 0,
		},
	},
	emits: ['closeList'],
	setup(props, { emit }) {
		const store = useStore();
		const playlist = ref([]);
		const userId = computed(() => store.getters['user/userId']);
		const addSong = playlistId => {
			changPlaylist('add', playlistId, props.songId).then(() => {
				emit('closeList');
				message({ type: 'success', message: '添加成功！' });
			});
		};
		onMounted(() => {
			getUserPlaylist(userId.value).then(data => {
				const arr = data.data.playlist.splice(1);
				playlist.value = arr.filter(e => e.userId === userId.value);
			});
		});
		return { playlist, addSong };
	},
};
</script>

<style lang="less" scoped>
.app-add-playlist {
	position: absolute;
	left: 100%;
	z-index: 2;
	.add-playlist {
		width: 10rem;
		background-color: var(--global-bg2);
		border-radius: 0.5rem;
		box-shadow: 0 0 10px var(--shadow-black);
		padding: 0.5rem 0;
		> ul {
			> li {
				height: 2rem;
				line-height: 2rem;
				&:hover {
					background-color: var(--global-bg7);
				}
				a {
					display: block;
					font-size: 0.85rem;
					padding: 0 0.8rem;
				}
			}
		}
	}
}
</style>
