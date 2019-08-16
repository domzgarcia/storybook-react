import React from 'react';
import ReduxWrapper from './ReduxSetup/ReduxWrapper';
import routes from './routes';
const App = () => (
	<ReduxWrapper>
		{routes}
	</ReduxWrapper>
);

export default App;
