import React from 'react';
import '../../index.css';

const LoadingSpinner = () => {
  return (
    <>
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </>
  );
};

export default LoadingSpinner;
