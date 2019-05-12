import React, { Fragment } from 'react';

const layout  = ( props ) => {
    return (
        <Fragment>
            {props.children}            
        </Fragment>
    );
}

export default layout;