import React from "react";
import "./ProgressBar.scss";

interface IProgressBar {
  isProgressBar: boolean[];
}

function ProgressBar({ isProgressBar }: IProgressBar) {
  return (
    <div className="progress">
      <span className="progressCircleOn" />
      <span
        className={isProgressBar[0] ? "progressCircleOn" : "progressCircleOff"}
      />
      <span
        className={isProgressBar[1] ? "progressCircleOn" : "progressCircleOff"}
      />
      <span
        className={isProgressBar[2] ? "progressCircleOn" : "progressCircleOff"}
      />
    </div>
  );
}

export default ProgressBar;
