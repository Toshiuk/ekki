import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

export default function Loading() {
  return (
    <div className="loading">
      <ReactLoading
        className="loading-react"
        type="spinningBubbles"
        color="#4188ca"
        height="30%"
        width="30%"
      />
    </div>
  );
}
