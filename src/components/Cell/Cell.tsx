import React from "react";

import "./Cell.css";

const Cell = ({
  id,
  val,
  onClick,
}: {
  id: string;
  val: number;
  onClick: () => void;
}) => {
  return (
    <div id={"cell " + id} className="cell" onClick={onClick}>
      {(val === 1 || val === 2) && (
        <div id={"orange " + id} className={val === 1 ? "orange" : "rotten"} />
      )}
    </div>
  );
};

export default Cell;
