<template>
	<div class="new">
		<div class="head">
			<MusicTitleChild title="最新MV" />
			<ul>
				<li
					v-for="item in title"
					:key="item.id"
					:class="{ active: now === item.id }"
					@click="changTitle(item)">
					<a href="javascript:;">{{ item.name }}</a>
				</li>
			</ul>
		</div>
		<MusicMvList :lists="lists" />
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import MusicMvList from '@/components/library/music-mv-list';
import { getNewMv } from '@/api/video';
import { ref } from 'vue';
export default {
	name: 'MvNew',
	components: { MusicTitleChild, MusicMvList },
	setup() {
		const title = [
			{ id: 1, name: '内地' },
			{ id: 2, name: '港台' },
			{ id: 3, name: '欧美' },
			{ id: 4, name: '日本' },
			{ id: 5, name: '韩国' },
		];
		const now = ref(1);
		const lists = ref([]);
		const changTitle = item => {
			now.value = item.id;
			getData(item.name);
		};
		const getData = area => {
			getNewMv(area, 15).then(data => (lists.value = data.data.data));
		};
		getData();
		return { title, now, changTitle, lists };
	},
};
</script>

<style scoped lang="less">
.new {
	.head {
		display: flex;
		justify-content: space-between;
		ul {
			display: flex;
			align-items: center;
			li {
				margin-left: 1rem;
				height: 2rem;
				line-height: 2rem;
				border-radius: 1rem;
				transition: border 0.2s;
				border: 1px solid transparent;
				a {
					padding: 0 1rem;
					font-size: 0.8rem;
				}
				&:hover {
					border-color: #1ecf9d;
				}
			}
			.active {
				background-color: #1ecf9d;
				a {
					color: #fff;
				}
			}
		}
	}
}
</style>
