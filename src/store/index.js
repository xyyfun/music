import { createStore } from 'vuex';
import song from './modules/song';
import user from './modules/user';

export default createStore({
	modules: { song, user },
});
