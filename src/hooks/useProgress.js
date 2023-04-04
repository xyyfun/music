export const handlerDuration = (e, ref, val) => {
	let width = ref.value.offsetWidth;
	let trigger = (e.layerX / width) * 100;
	return (trigger / 100) * val.value;
};
