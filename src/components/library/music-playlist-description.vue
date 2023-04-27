<template>
	<div class="music-playlist-description" v-if="detail.picUrl">
		<div class="description">
			<img :src="detail.picUrl + '?param=200y200'" alt="" />
			<div class="msg">
				<div class="info">
					<p class="name ellipsis">{{ detail.name }}</p>
					<div class="creator" v-if="detail.avatarUrl">
						<a href="javascript:;">
							<img v-lazy="detail.avatarUrl + '?param=130y130'" alt="" />
							<p>{{ detail.nickname }}</p>
						</a>
					</div>
					<div class="creator" v-else>
						<router-link :to="`/singer/${item.id}`" v-for="item in detail.artists" :key="item.id">
							<img v-lazy="item.img1v1Url + '?param=130y130'" alt="" />
							<p>{{ item.name }}</p>
						</router-link>
					</div>
					<div class="playlistInfo">
						<p v-if="detail.updateTime">更新时间：{{ updateTime }}</p>
						<p v-if="detail.publishTime">发布时间：{{ publishTime }}</p>
						<p v-if="detail.subscribedCount">订阅数量：{{ detail.subscribedCount }}</p>
						<p v-if="detail.shareCount">转发数量：{{ detail.shareCount }}</p>
					</div>
					<div class="detailed" v-if="detail.description">{{ detail.description }}</div>
				</div>
				<div class="utils">
					<ul>
						<li>
							<a href="javascript:;" class="active" @click="playAll">
								<i class="iconfont icon-bofang"></i>全部播放
							</a>
						</li>
						<li>
							<a href="javascript:;"><i class="iconfont icon-xihuan21"></i>收藏</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useDateFormat } from '@vueuse/core';
export default {
	name: 'MusicPlaylistDescription',
	setup() {
		const store = useStore();
		const detail = computed(() => store.state.playlist.playlistDetail);
		const updateTime = computed(() => {
			const str = useDateFormat(detail.value.updateTime, 'YYYY-MM-DD HH:mm:ss');
			return str.value.replace(/\"/g, '');
		});
		const publishTime = computed(() => {
			const str = useDateFormat(detail.value.publishTime, 'YYYY-MM-DD HH:mm:ss');
			return str.value.replace(/\"/g, '');
		});
		// 播放全部
		const playAll = () => {
			store.commit('song/ISPLAY', false);
			const lists = computed(() => store.state.playlist.songLists);
			store.commit('song/addList', lists.value);
			store.dispatch('song/getMusic', lists.value[0].id);
		};
		return { detail, updateTime, publishTime, playAll };
	},
};
</script>

<style lang="less" scoped>
.music-playlist-description {
	.description {
		display: flex;
		> img {
			width: 11rem;
			height: 11rem;
			border-radius: 0.5rem;
		}
		.msg {
			flex: 1;
			padding-left: 1rem;
			.info {
				display: flex;
				flex-direction: column;
				.name {
					font-size: 1.8rem;
					font-weight: 700;
					max-width: calc(100% - 11rem);
				}
				.creator {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					padding: 0.5rem 0;
					a {
						display: flex;
						align-items: center;
						margin-right: 1rem;
						height: 2.5rem;
						img {
							width: 1.5rem;
							border-radius: 50%;
						}
						p {
							font-size: 0.8rem;
							color: #94a3b8;
							padding-left: 0.5rem;
						}
					}
				}
				.playlistInfo {
					display: flex;
					padding: 0.5rem 0;
					p {
						margin-right: 1rem;
						font-size: 0.8rem;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}
				.detailed {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 0.7rem;
					color: #334155;
				}
			}
			.utils {
				margin: 1rem 0;
				ul {
					display: flex;
					li {
						margin-right: 1rem;
						a {
							display: block;
							padding: 0.5rem 2rem;
							background-color: #e3e3e3;
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
