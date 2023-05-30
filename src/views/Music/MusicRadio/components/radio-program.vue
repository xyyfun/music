<template>
	<div class="radio-program">
		<div class="program">
			<MusicTitleChild title="24小时节目榜" />
			<ul>
				<li v-for="item in list" :key="item.program.id">
					<a href="javascript:;" @click="playDJ(item.program.id)">
						<img v-lazy="item.program.coverUrl + '?param=130y130'" alt="" />
						<div class="description">
							<span class="name ellipsis">{{ item.program.radio.name }}</span>
							<span class="category ellipsis">{{ item.program.name }}</span>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MusicTitleChild from '@/components/library/music-title-child';
import { getRadioProgram } from '@/api/music';
import { onMounted, shallowRef } from 'vue';
import { useStore } from 'vuex';
export default {
	name: 'RadioProgram',
	components: { MusicTitleChild },
	setup() {
		const store = useStore();
		const list = shallowRef([]);
		const playDJ = id => {
			store.commit('song/ISPLAY', false);
			store.dispatch('song/getMusic', id);
		};
		onMounted(() => {
			getRadioProgram().then(data => {
				list.value = data.data.data.list;
			});
		});
		return { list, playDJ };
	},
};
</script>

<style lang="less" scoped>
.program {
	ul {
		display: grid;
		gap: 1.25rem;
		grid-template-rows: repeat(1, 5rem);
		li {
			border-radius: 0.5rem;
			transition: box-shadow 0.2s;
			a {
				display: block;
				width: 100%;
				height: 100%;
				display: flex;
				img {
					width: 5rem;
					object-fit: cover;
					border-radius: 0.5rem;
				}
				.description {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 0 1rem;
					max-width: calc(100% - 5rem);
					.name {
						color: var(--text-default-color);
						font-size: 1rem;
					}
					.category {
						color: var(--text-default3-a-color);
						font-size: 0.9rem;
					}
				}
			}
			&:hover {
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
			}
		}
	}
	@media screen and (max-width: 1280px) {
		ul {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media screen and (min-width: 1280px) {
		ul {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
}
</style>
