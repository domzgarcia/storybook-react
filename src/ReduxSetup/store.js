import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducers from './rootReducers';

export const history = createBrowserHistory();

const middleware = [
	thunk,
	routerMiddleware(history),
];

function configureStore(preloadState) {
	// link: https://github.com/zalmoxisus/redux-devtools-extension#installation
	const composeEnhancer = typeof window === 'object' &&
								  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
								    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
	const store = createStore(
		rootReducers(history),
		preloadState,
		composeEnhancer(
			applyMiddleware(...middleware),
		),
	);
	return store;
}

const store = configureStore();
export default store;
