import { createStore } from 'vuex';
import song from './modules/song';
import user from './modules/user';
import playlist from './modules/playlist';
import video from './modules/video';

export default createStore({
	modules: { song, user, playlist, video },
});
