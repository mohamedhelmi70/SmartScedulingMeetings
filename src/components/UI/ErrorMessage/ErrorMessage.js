import React from 'react';

const errorMessage = ( props ) => {
  const { Message } = props;

  return (
    <div className="col-12 alert alert-danger px-3">
      {Message}
    </div>
  );
}

export default errorMessage;
