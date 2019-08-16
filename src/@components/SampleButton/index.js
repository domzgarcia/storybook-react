import React from 'react'
import PropTypes from 'prop-types'

/**
 * Button Component
 */
const Button = ({ onClick, disabled, style, children }) => {
  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  )
}

Button.propTypes = {
  /** callback when button clicked */
  onClick: PropTypes.func,
  /** button disabled */
  disabled: PropTypes.bool,
  /** custom button style */
  style: PropTypes.object,
  /** children nodes  */
  children: PropTypes.node
}

export default Button
