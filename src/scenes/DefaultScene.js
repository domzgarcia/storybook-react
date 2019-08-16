import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {triggerReady} from '../ReduxSetup/actions/sample';

class DefaultScene extends Component {

	handleReady = () => {
		this.props.triggerReady();
	}

	render(){
		return(
			<Fragment>
				<p class={"ready " + ((this.props.isReady) ? '-active' : '')}>Redux is Fun</p>
				<button
				onClick={this.handleReady}>Ready</button>
			</Fragment>
		)
	}
}

const mapDispatchToProps = {
	triggerReady,
};

const mapStateToProps = state => ({
	isReady: state.sample.isReady,
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultScene);
