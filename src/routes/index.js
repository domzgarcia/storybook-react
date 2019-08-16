import React from 'react';
import {Route, Switch} from 'react-router';
import DefaultScene from '../scenes/DefaultScene';

const routes = (
	<Switch>
		<Route path={'/'} component={DefaultScene} />
	</Switch>
);

export default routes;