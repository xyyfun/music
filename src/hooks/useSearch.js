import { onBeforeMount, ref } from 'vue';
import { search } from '@/api/search';
export default function (keyword, limit, type) {
	const result = ref({});
	onBeforeMount(() => {
		search(keyword, limit.value, type).then(data => {
			console.log(data);
			return Promise.resolve(data.data.result);
		});
	});
}
