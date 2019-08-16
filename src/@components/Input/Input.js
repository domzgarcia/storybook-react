import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = (props) => (
	<input {...props} type="text" className={generateClassName(props)} />
);

const generateClassName = ({ className, block, align }) => {
	let ownClassName = ['nw-input', ...resolveAlignment(align)];
	ownClassName = (block) ? [...ownClassName,'block'] : [...ownClassName];
	ownClassName = ownClassName.join(" ");
	return `${ownClassName} ${className}`;
};

const resolveAlignment = (align) => {
	let list = [];
	if(align) list.push(`align-${align}`);
	return list;
}

Input.propTypes = {
	align: PropTypes.string,
	block: PropTypes.bool,
}

export default Input;