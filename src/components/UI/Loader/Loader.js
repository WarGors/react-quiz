import React from 'react'
import classes from './Loader.css'

const Loader = () => (
<div className={classes.center}>
  <div className={classes['lds-spinner']}>
    <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
  </div>
</div>
)

export default Loader