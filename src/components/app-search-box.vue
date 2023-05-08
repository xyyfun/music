<template>
	<div class="search">
		<div class="inp">
			<i class="iconfont icon-search"></i>
			<input
				class="ellipsis"
				type="text"
				@click="isShowList = true"
				@keyup.enter="search"
				:placeholder="keyword_default"
				v-model="keywords" />
		</div>
		<div class="searchList" v-if="isShowList" ref="target">
			<div class="songs" v-if="suggest.songs">
				<span>单曲</span>
				<ul>
					<li v-for="item in suggest.songs" :key="item.id" @click="changKeywords(item.name)">
						<router-link :to="`/search/${item.name}`">
							{{ item.name }} -
							<router-link
								class="singer"
								:to="`/singer/${value.id}`"
								v-for="value in item.artists"
								>{{ value.name }}</router-link
							>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="playlists" v-if="suggest.playlists">
				<span>歌单</span>
				<ul>
					<li v-for="item in suggest.playlists" :key="item.id" @click="changKeywords(item.name)">
						<router-link :to="`/playlist/${item.id}`">{{ item.name }}</router-link>
					</li>
				</ul>
			</div>
			<div class="artists" v-if="suggest.artists">
				<span>歌手</span>
				<ul>
					<li v-for="item in suggest.artists" :key="item.id" @click="changKeywords(item.name)">
						<router-link :to="`/singer/${item.id}`">
							<img :src="item.picUrl + '?param=130y130'" alt="" />{{ item.name }}
						</router-link>
					</li>
				</ul>
			</div>
			<div class="albums" v-if="suggest.albums">
				<span>专辑</span>
				<ul>
					<li v-for="item in suggest.albums" :key="item.id" @click="changKeywords(item.name)">
						<router-link :to="`/album/${item.id}`"
							><img :src="item.artist.picUrl + '?param=130y130'" alt="" />{{
								item.name
							}}</router-link
						>
					</li>
				</ul>
			</div>
			<div class="search-hot" v-if="searchHotList.length">
				<ul>
					<span>热门搜索</span>
					<li
						v-for="(item, index) in searchHotList"
						:key="index"
						@click="changKeywords(item.searchWord)">
						<router-link :to="`/search/${item.searchWord}`">
							<span>{{ index + 1 }}</span>
							<span class="ellipsis">{{ item.searchWord }}</span>
							<span class="score">{{ item.score }}</span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { onClickOutside } from '@vueuse/core';
import { defaultKeyword, searchSuggest, searchHot } from '@/api/search';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import useNumberSwitch from '@/hooks/useNumberSwitch';
import debounce from 'lodash/debounce';
export default {
	name: 'AppSearchBox',
	setup() {
		const router = useRouter();
		const keyword_default = ref(null);
		const keywords = ref(null);
		const isShowList = ref(false);
		const suggest = ref({});
		const searchHotList = ref([]);
		const target = ref(null);
		// 搜索
		const search = () => {
			if (!keywords.value) keywords.value = keyword_default.value;
			router.push(`/search/${keywords.value}`);
			isShowList.value = false;
		};
		// 用户点击关键字
		const changKeywords = val => {
			keywords.value = val;
			isShowList.value = false;
		};
		// 监视搜索框发生变化 预测用户搜索
		watch(
			keywords,
			debounce(newVal => {
				if (newVal) {
					searchHotList.value = [];
					searchSuggest(newVal).then(data => {
						suggest.value = data.data.result || {};
					});
				} else {
					if (!isShowList.value) isShowList.value = true;
					suggest.value = {};
					getSearchHot();
				}
			}, 500)
		);
		// 搜索框默认关键字
		defaultKeyword().then(data => {
			keyword_default.value = data.data.data.showKeyword;
		});
		onClickOutside(target, () => (isShowList.value = false));
		// 获取热搜列表
		const getSearchHot = () => {
			searchHot().then(data => {
				data.data.data.forEach(e => {
					e.score = useNumberSwitch(e.score);
				});
				searchHotList.value = data.data.data.splice(0, 10);
			});
		};
		getSearchHot();
		return {
			target,
			keyword_default,
			keywords,
			suggest,
			isShowList,
			search,
			changKeywords,
			searchHotList,
		};
	},
};
</script>

<style lang="less" scope>
.search {
	position: relative;
	.inp {
		i {
			position: absolute;
			top: 0;
			left: 0.7rem;
			height: 2rem;
			line-height: 2rem;
		}
		input {
			outline: none;
			height: 2rem;
			width: 16rem;
			border: none;
			border-radius: 1rem;
			background-color: #e3e3e3;
			text-indent: 2rem;
		}
	}
	.searchList {
		position: absolute;
		width: 100%;
		background-color: #fff;
		border-radius: 0.5rem;
		z-index: 999;
		> div {
			display: flex;
			padding: 0.5rem 1rem;
			span {
				padding-right: 1rem;
			}
			img {
				width: 2rem;
				margin-right: 0.5rem;
			}
			ul {
				flex: 1;
				li {
					margin: 0.5rem 0;
					height: 2rem;
					border-radius: 0.5rem;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					&:first-child {
						margin-top: 0;
					}
					&:hover {
						background-color: #f6f6f6;
					}
					.singer {
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
			}
		}
		.artists {
			img {
				border-radius: 50%;
			}
		}
		.albums {
			img {
				border-radius: 0.3rem;
			}
		}
		.search-hot {
			display: block;
			ul {
				li {
					a {
						display: flex;
						justify-content: space-between;
						span {
							&:nth-child(1) {
								padding-left: 1rem;
							}
							&:nth-child(2) {
								flex: 1;
							}
						}
					}
					&:nth-child(-n + 4) > a {
						color: #ff6a6a;
					}
				}
			}
		}
	}
}
</style>
