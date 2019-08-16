import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {sample} from './reducers/sample';

const rootReducers = (history) => combineReducers({
	// add your reducers here
	sample,
	router: connectRouter(history),
});

export default rootReducers;