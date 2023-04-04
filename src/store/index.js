import { createStore } from 'vuex';
import song from './modules/song';

export default createStore({
	modules: { song },
});
