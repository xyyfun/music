/**
 * @Date         : 2023-04-01 12:30:02
 * @description  : 返回下一首或上一首的音乐id（列表循环）
 * @param         {*} playlist: 播放队列
 * @param         {*} currentMusicID: 当前播放音乐id
 * @param         {*} option: 选项 上一首or下一首 true下一首 false上一首
 * @return        {*}
 */
export const musicPositionLoop = (playlist, currentMusicID, option) => {
	const length = playlist.value.length;
	let nextID = null;
	for (let i = 0; i < length; i++) {
		if (playlist.value[i].id === currentMusicID.value) {
			if (option) {
				// 下一首
				if (length === i + 1) {
					nextID = playlist.value[0].id;
				} else {
					nextID = playlist.value[i + 1].id;
				}
			} else {
				// 上一首
				if (i) {
					nextID = playlist.value[i - 1].id;
				} else {
					nextID = playlist.value[length - 1].id;
				}
			}
			break;
		}
	}
	return nextID;
};

/**
 * @Date         : 2023-04-01 13:32:33
 * @description  : 返回随机音乐id
 * @param         {*} playlist: 播放队列
 * @param         {*} currentMusicID: 当前播放音乐id
 * @return        {*}
 */
export const musicPositionRandom = (playlist, currentMusicID) => {
	const length = playlist.value.length;
	let randomID = null;
	randomID = Math.floor(Math.random() * (length - 0)) + 0;
	for (let i = 0; i < length; i++) {
		if (playlist.value[i].id === currentMusicID.value) {
			if (i === randomID) {
				if (length === i + 1) {
					randomID = playlist.value[0].id;
				} else {
					randomID = playlist.value[i + 1].id;
				}
			} else {
				randomID = playlist.value[randomID].id;
			}
			break;
		}
	}
	return randomID;
};
