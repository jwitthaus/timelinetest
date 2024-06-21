import React from "react";
import "./Bar.css"; // Stile für die Timeline
import { Paper } from "@mui/material";

const Bar = ({ startPosition, width, index, label }) => {
  const style = {
    left: `${startPosition}%`,
    width: `${width}%`,
    top: `${index * 30}px`,
  };

  console.log("startPosition");

  return (
    <Paper className="bar" style={style}>
      {label}
    </Paper>
  );
};

export default Bar;
