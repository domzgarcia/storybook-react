import React from 'react';
import store, {history} from './store';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';

const ReduxWrapper = ({children}) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			{children}
		</ConnectedRouter>
	</Provider>
);

export default ReduxWrapper; 