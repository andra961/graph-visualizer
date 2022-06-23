import React, { useEffect, useState } from "react";
import { orangesRotting } from "../../algorithms/rottenOrange";
import Cell from "../Cell";

const ROWS = 10;
const COLS = 10;

const MIN_SPEED = 0;

const visitedAnimationDuration = 1000;

const rottingAnimationDuration = 200;

const buildGrid = (rows: number, cols: number, startVal: number) => {
  const gridTmp: number[][] = [];

  for (let i = 0; i < rows; i++) {
    gridTmp[i] = [];
    for (let j = 0; j < cols; j++) {
      gridTmp[i].push(startVal);
    }
  }

  return gridTmp;
};

const Grid = () => {
  const [grid, setGrid] = useState<number[][]>([]);

  const [iteration, setIteration] = useState<number>(0);

  const [canClick, setCanClick] = useState<boolean>(true);

  const [speed, setSpeed] = useState<number>(MIN_SPEED);

  const fillGridWith = (val: 0 | 1 | 2) => {
    setGrid(buildGrid(ROWS, COLS, val));
    setIteration(0);
  };

  const launchAlgorithm = (grid: number[][]) => {
    setCanClick(false);
    setIteration(0);
    const gridSnapshot = grid.map((row) => row.slice());
    const bfs = orangesRotting(gridSnapshot);

    bfs.forEach((breadth, i) => {
      setTimeout(
        () => setIteration(i + 1),
        (i + 1) * (visitedAnimationDuration + rottingAnimationDuration)
      );
      breadth.forEach(([r, c]) => {
        const node = document.getElementById("cell " + r + " " + c)!;

        const orange = document.getElementById("orange " + r + " " + c)!;

        setTimeout(() => {
          node.classList.add("visited");
        }, i * (visitedAnimationDuration + rottingAnimationDuration));

        if (grid[r][c] === 1 && gridSnapshot[r][c] === 2) {
          setTimeout(() => {
            orange.classList.add("rotting");
            node.classList.remove("visited");
          }, i * (visitedAnimationDuration + rottingAnimationDuration) + visitedAnimationDuration);

          setTimeout(() => {
            orange.classList.remove("rotting");

            const newGrid = grid.slice();

            newGrid[r][c] = 2;

            setGrid(newGrid);
          }, i * (visitedAnimationDuration + rottingAnimationDuration) + visitedAnimationDuration + rottingAnimationDuration);
        }
      });
    });

    setTimeout(() => {
      setCanClick(true);
    }, bfs.length * (visitedAnimationDuration + rottingAnimationDuration));
  };

  const toggleOrange = (i: number, j: number) => {
    if (canClick) {
      setIteration(0);
      const newGrid = grid.slice();

      newGrid[i][j] = (grid[i][j] + 1) % 3;

      setGrid(newGrid);
    }
  };

  useEffect(() => {
    setGrid(buildGrid(ROWS, COLS, 0));
  }, []);

  return (
    <div>
      <button
        className="startAlgo"
        onClick={() => launchAlgorithm(grid)}
        disabled={!canClick}
      >
        Launch algorithm
      </button>
      <button
        className="reset"
        onClick={() => fillGridWith(0)}
        disabled={!canClick}
      >
        Reset
      </button>
      <button
        className="fill"
        onClick={() => fillGridWith(1)}
        disabled={!canClick}
      >
        Fill
      </button>
      {false && (
        <input
          type="number"
          value={speed}
          onChange={(e) =>
            setSpeed(Math.max(MIN_SPEED, parseInt(e.target.value)))
          }
        />
      )}

      <div className="minutes">Minutes: {iteration}</div>
      {grid.map((row, i) => {
        return (
          <div key={i} style={{ display: "flex", flexDirection: "row" }}>
            {row.map((col, j) => (
              <Cell
                key={j}
                id={i + " " + j}
                val={grid[i][j]}
                onClick={() => toggleOrange(i, j)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
