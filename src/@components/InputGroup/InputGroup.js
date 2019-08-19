import React from 'react';
import PropTypes from 'prop-types';
import './inputGroup.scss';

const InputGroup = ({className, compact, children}) => {
    className = (! className) ? '' : className;  
    let ownClasses = ['nw-input-group'];
    if(compact) ownClasses.push('compact');
    ownClasses = ownClasses.join(" ");
    return (
        <div className={`${className} ${ownClasses}`}>
            {children}
        </div>
    )
}

InputGroup.propTypes = {
    compact:  PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}


export default InputGroup;