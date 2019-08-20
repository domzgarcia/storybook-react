import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = (props) => {
	const {html, settings} = addOnsBuilder(props);
	const customProps = Object.assign({}, props);
	cleanAttributes(customProps);
	return(
		<span className={`input-wrap ${withBlock(props.block)}`}>
			{html}
			<input {...customProps} type="text"
			className={classBuilder(customProps, { opts: { 
				addOns: settings, }})} />
		</span>
	)
};
const cleanAttributes = (customProps) => {
	delete customProps.addOnBefore;
	delete customProps.addOnAfter;
	delete customProps.block;
};
const classBuilder = ({className, align}, {opts}) => {
	const settings = opts.addOns;
	const nativeClasses = (className) ? className : '';
	let ownClasses = ['nw-input', 
	...alignment(align),
	...addOnClasses(settings),
	];
	ownClasses = ownClasses.join(" ");
	return `${ownClasses} ${nativeClasses}`;
};
const addOnsBuilder = ({addOnBefore, addOnAfter}) => {
	let html = <React.Fragment/>;
	let exists, position, children;
	switch(true){
		case addOnBefore !== undefined:
			exists = true; position = 'before';
			children = addOnBefore.props.children;
		break;
		case addOnAfter !== undefined:
			exists = true; position = 'after';
			children = addOnAfter.props.children;
		break;
		default: 
		break;
	};
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
		},
	};
};
/*|--------------
  | Add Classes
  |-------------- */
const addOnClasses = (settings) => {
	const classes = [];
	if(settings.exists) return [`-${settings.position}-adjust-padding`];
	return classes;
}
const alignment = (align) => {
	const classes = [];
	if(align) return [`-align-${align}`];
	return classes;
}
const withBlock = (isBlock) => {
	const classes = '';
	if(isBlock) return '-block';
	return classes;
}
/*|--------------
  | Proptypes
  |-------------- */
Input.propTypes = {
	align: PropTypes.string,
	block: PropTypes.bool,
	addOnBefore: PropTypes.object,
	addOnAfter:  PropTypes.object,
};

export default Input;