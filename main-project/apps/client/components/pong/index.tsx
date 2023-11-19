import React from "react";
import './index.css'

function Pong() :JSX.Element {
  return (
    <div className="field">
      <div className="net"></div>
      <div className="ping"></div>
      <div className="pong"></div>
      <div className="ball"></div>
    </div>
  );
}

export default Pong;
