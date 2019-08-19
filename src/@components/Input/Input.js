import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = (props) => (
	<input {...props} type="text" className={generateClassName(props)} />
);

const generateClassName = ({ className, block, align }) => {
	const nativeClasses = (className) ? className : '';
	let ownClasses = ['nw-input', 
	...alignment(align),
	...isBlock(block),
	];
	ownClasses = ownClasses.join(" ");
	return `${ownClasses} ${nativeClasses}`;
};

const isBlock = (block) => {
	if(block) return ['block'];
	return [];
}

const alignment = (align) => {
	if(align) return [`align-${align}`];
	return [];
}

Input.propTypes = {
	align: PropTypes.string,
	block: PropTypes.bool,
}

export default Input;