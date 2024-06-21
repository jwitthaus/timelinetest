import React from "react";

const Controls = ({ onViewModeChange }) => {
  const handleClick = (mode) => {
    onViewModeChange(mode);
  };

  return (
    <div className="controls">
      <button onClick={() => handleClick("month")}>Month</button>
      <button onClick={() => handleClick("week")}>Week</button>
      <button onClick={() => handleClick("day")}>Day</button>
    </div>
  );
};

export default Controls;
