export const triggerReady = () => {
	return dispatch => {
		dispatch({
			type: 'RUN_SAMPLE',
		})
	}
}