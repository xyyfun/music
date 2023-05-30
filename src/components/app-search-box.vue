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
		<transition name="fade-header">
			<div class="searchList" v-if="isShowList" ref="target">
				<div class="suggest-songs" v-if="suggest.songs">
					<span>单曲</span>
					<ul>
						<li v-for="item in suggest.songs" :key="item.id">
							<router-link :to="`/search/${item.name}`" @click="changKeywords(item.name)">
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
				<div class="suggest-playlists" v-if="suggest.playlists">
					<span>歌单</span>
					<ul>
						<li v-for="item in suggest.playlists" :key="item.id">
							<router-link :to="`/playlist/${item.id}`" @click="changKeywords(item.name)">{{
								item.name
							}}</router-link>
						</li>
					</ul>
				</div>
				<div class="suggest-artists" v-if="suggest.artists">
					<span>歌手</span>
					<ul>
						<li v-for="item in suggest.artists" :key="item.id">
							<router-link :to="`/singer/${item.id}`" @click="changKeywords(item.name)">
								<img :src="item.picUrl + '?param=130y130'" alt="" />{{ item.name }}
							</router-link>
						</li>
					</ul>
				</div>
				<div class="suggest-albums" v-if="suggest.albums">
					<span>专辑</span>
					<ul>
						<li v-for="item in suggest.albums" :key="item.id">
							<router-link :to="`/album/${item.id}`" @click="changKeywords(item.name)">
								<img :src="item.artist.picUrl + '?param=130y130'" alt="" />
								{{ item.name }}
							</router-link>
						</li>
					</ul>
				</div>
				<div class="search-prompt scroll" v-if="searchHotList.length">
					<div class="history">
						<div class="head-history">
							<p>搜索历史<span>（保存最近十条搜索记录）</span></p>
							<a href="javascript:;" @click="removeHistorySearch(true)" title="删除历史记录">
								<i class="iconfont icon-remove"></i>
							</a>
						</div>
						<ul>
							<li v-for="item in HistorySearch" :key="item.id">
								<router-link :to="`/search/${item.keyword}`" @click="changKeywords(item.keyword)">
									{{ item.keyword }}
								</router-link>
								<a href="javascript:;" @click="removeHistorySearch(false, item.id)">
									<i class="iconfont icon-cuo"></i>
								</a>
							</li>
						</ul>
					</div>
					<div class="hot">
						<ul>
							<span>热门搜索</span>
							<li
								v-for="(item, index) in searchHotList"
								:key="index"
								@click="changKeywords(item.searchWord)">
								<router-link :to="`/search/${item.searchWord}`">
									<div class="sort">
										<span>{{ index + 1 }}</span>
									</div>
									<div class="info">
										<div class="msg ellipsis">
											<span v-if="item.searchWord" class="searchWord">{{ item.searchWord }}</span>
											<img v-if="item.iconUrl" :src="item.iconUrl" alt="" />
											<span>{{ item.score }}</span>
										</div>
										<span class="content" v-if="item.content">{{ item.content }}</span>
									</div>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { onClickOutside } from '@vueuse/core';
import { defaultKeyword, searchSuggest, searchHot } from '@/api/search';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import debounce from 'lodash/debounce';
import { getHistorySearch, setHistorySearch } from '@/utils/history';
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
		const HistorySearch = ref([]);
		// 添加历史搜索
		const addNewHistorySearch = keyword => {
			const history = getHistorySearch();
			const result = history.some(e => e.keyword === keyword);
			if (result) return;
			history.unshift({ keyword, id: Date.now() }); // 添加新数据
			if (history.length > 10) history.pop(); // 设置最大历史10
			setHistorySearch(history); // 永久存储
			HistorySearch.value = getHistorySearch();
		};
		// 移除历史搜索
		const removeHistorySearch = (isRemoveAll, id) => {
			const history = getHistorySearch();
			if (isRemoveAll) {
				setHistorySearch([]);
			} else {
				history.forEach((e, i) => {
					if (e.id === id) history.splice(i, 1);
					setHistorySearch(history);
				});
			}
			HistorySearch.value = getHistorySearch();
		};
		// 输入框回车搜索
		const search = () => {
			if (!keywords.value) keywords.value = keyword_default.value;
			router.push(`/search/${keywords.value}`);
			isShowList.value = false;
			addNewHistorySearch(keywords.value);
		};
		// 用户点击关键字路由跳转搜索
		const changKeywords = val => {
			keywords.value = val;
			isShowList.value = false;
			addNewHistorySearch(keywords.value);
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
		// 获取热搜列表
		const getSearchHot = () => {
			searchHot().then(data => (searchHotList.value = data.data.data));
		};
		onClickOutside(target, () => (isShowList.value = false));
		onMounted(() => {
			HistorySearch.value = getHistorySearch(); // 获取历史搜索
			getSearchHot(); // 获取热搜列表
		});
		return {
			target,
			keyword_default,
			keywords,
			suggest,
			isShowList,
			search,
			changKeywords,
			searchHotList,
			removeHistorySearch,
			HistorySearch,
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
			font-size: 0.9rem;
		}
		input {
			outline: none;
			height: 2rem;
			width: 18rem;
			border: none;
			border-radius: 1rem;
			background-color: var(--search-bg);
			text-indent: 2rem;
			color: var(--text-default-color);
		}
	}
	.searchList {
		position: absolute;
		top: 3.5rem;
		width: 100%;
		background-color: var(--global-bg2);
		border-radius: 0.5rem;
		z-index: 999;
		filter: drop-shadow(0 0 10px var(--shadow-black));
		&::before {
			position: absolute;
			top: -0.5rem;
			left: 50%;
			transform: translateX(-50%) rotate(45deg);
			content: '';
			width: 1.5rem;
			height: 1.5rem;
			background-color: var(--global-bg2);
			z-index: -1;
		}
		> div[class^='suggest'] {
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
						background-color: var(--global-hover-bg);
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
		.suggest-artists {
			img {
				border-radius: 50%;
			}
		}
		.suggest-albums {
			img {
				border-radius: 0.3rem;
			}
		}
		.search-prompt {
			padding: 0.5rem 1rem;
			max-height: 37rem;
			overflow-y: auto;
			.hot {
				ul {
					span {
						font-size: 0.9rem;
					}
					li {
						margin: 0.5rem 0;
						a {
							display: flex;
							align-items: center;
							.sort {
								width: 3rem;
								text-align: center;
								span {
									font-size: 0.9rem;
								}
							}
							.info {
								width: calc(100% - 3rem);
								.msg {
									height: 1.5rem;
									line-height: 1.5rem;
									span {
										vertical-align: middle;
										font-size: 0.8rem;
										margin-right: 0.5rem;
									}
									img {
										height: 1rem;
										margin-right: 0.5rem;
									}
								}
								.content {
									height: 1.5rem;
									line-height: 1.5rem;
									font-size: 0.7rem;
									text-overflow: -o-ellipsis-lastline;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 1;
									-webkit-box-orient: vertical;
								}
							}
						}
						&:nth-child(-n + 4) .searchWord {
							font-weight: bold;
						}
						&:nth-child(-n + 4) .sort {
							color: #ff3a3a;
						}
					}
				}
			}
			.history {
				.head-history {
					display: flex;
					justify-content: space-between;
					p {
						font-size: 0.9rem;
					}
					span {
						font-size: 12px;
					}
					i {
						font-size: 0.9rem;
					}
				}
				ul {
					li {
						display: flex;
						justify-content: space-between;
						padding-left: 1rem;
						a,
						i {
							font-size: 0.8rem;
						}
					}
				}
			}
		}
	}
}
</style>
