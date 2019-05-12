import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
   return (
        <button className={classes.button} style={{color: props.color}} > 
            <a  href={ props.link } className={classes.a} >
               { props.children }
            </a>
        </button>
   );
}

export default button;