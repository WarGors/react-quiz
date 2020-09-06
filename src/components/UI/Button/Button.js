import React from 'react'
import classes from './Button.css'

const Button = props => {

  return (
    <button
      onClick={props.onClick}
      className={classes.Button}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button