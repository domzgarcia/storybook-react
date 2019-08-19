import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = (props) => {
	const {html, settings} = resolveAddOn(props);
	const extendedProps = Object.assign({}, props);
	extendedProps.settings = settings;
	
	delete extendedProps.addOnBefore;
	delete extendedProps.addOnAfter;
	
	return(
		<span className={`input-wrap ${resolveBlock(props.block)}`}>
			{html}
			<input {...extendedProps} type="text"
			className={generateClassName(extendedProps)} />
		</span>
	)
};


const generateClassName = ({ className, align, settings}) => {
	// TODO: inject here tomorrow

	const nativeClasses = (className) ? className : '';
	let ownClasses = ['nw-input', 
	...alignment(align),
	...addOnClasses(settings),
	];
	ownClasses = ownClasses.join(" ");
	return `${ownClasses} ${nativeClasses}`;
};

const resolveAddOn = ({addOnBefore, addOnAfter}) => {
	let html = <React.Fragment/>;
	const exists 	= (addOnBefore) ? true : (addOnAfter) ? true : false;
	const position 	= (addOnBefore) ? 'before' : (addOnAfter) ? 'after' : '';
	let children 	= (addOnBefore) 
					? addOnBefore.props.children
					: (addOnAfter) 
						? addOnAfter.props.children 
						: <React.Fragment />;

	if(addOnBefore || addOnAfter){
		html = (
		<div className={`nw-addon -${position}`}>
			{children}
		</div>)
	}
	return {
		html: html,
		settings: {
			exists,
			position,
		}
	};
}

/////////////////
// Add Classes
/////////////////
const addOnClasses = (settings) => {
	if(settings.exists) {
		return [`-${settings.position}-adjust-padding`];
	}
	return [];
}
const alignment = (align) => {
	if(align) return [`align-${align}`];
	return [];
}
const resolveBlock = (isBlock) => {
	const emptyClass = '';
	if(isBlock) return '-block';
	return emptyClass;
}

Input.propTypes = {
	align: PropTypes.string,
	block: PropTypes.bool,
	addOnBefore: PropTypes.object,
	addOnAfter:  PropTypes.object,
}

export default Input;