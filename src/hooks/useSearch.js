import { onMounted, ref } from 'vue';
import { search } from '@/api/search';
import { useDateFormat } from '@vueuse/core';
import useNumberSwitch from '@/hooks/useNumberSwitch';

const defaultType = {
	songs: 1,
	albums: 10,
	artists: 100,
	playlists: 1000,
	videos: 1014,
};

/**
 * @Date         : 2023-05-08 17:26:01
 * @description  :
 * @param         {*} keyword: 搜索内容
 * @param         {*} type: 搜索类型（参考默认类型）
 * @param         {*} offset: 偏移数
 * @return        {*}
 */
export default function (keyword, type, offset, callback) {
	search(keyword, defaultType[type], offset).then(data => {
		const result = data.data.result[type];
		const isMore = data.data.result.hasMore;
		if (type === 'songs') {
			result.forEach(e => {
				e.al = e.album;
				e.ar = e.artists;
				e.dt = e.duration;
				delete e.album;
				delete e.artists;
				delete e.duration;
			});
			callback && callback(result, isMore);
		} else if (type === 'albums') {
			result.forEach(e => (e.publishTime = useDateFormat(e.publishTime, 'YYYY-MM-DD')));
			callback && callback(result, data.data.result.albumCount);
		} else if (type === 'artists') {
			callback && callback(result, isMore);
		} else if (type === 'playlists') {
			result.forEach(e => (e.playCount = useNumberSwitch(e.playCount)));
			callback && callback(result, isMore);
		} else if (type === 'videos') {
			callback && callback(result, isMore);
		}
	});
}
