const initial = {
	isReady: false,
};

const sample = (state=initial, {type, payload}) => {
	switch(type) {
		case "RUN_SAMPLE":
		return {
			...state, isReady: !state.isReady, }
		default:
			return state;
	}
};

export {
	sample
};