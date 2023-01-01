import React from "react";
import "./Description.css";

const Description = () => {
  return (
    <div className="descriptionContainer">
      <h2>Rotten Oranges</h2>
      You are given an <code>m x n</code> <code>grid</code> where each cell can
      have one of three values:
      <ul>
        <li>0 representing an empty cell</li>
        <li>1 representing a fresh orange, or</li>
        <li>2 representing a rotten orange</li>
      </ul>
      Every minute, any fresh orange that is <b>4-directionally adjacent</b> to
      a rotten orange becomes rotten. Return the minimum number of minutes that
      must elapse until no cell has a fresh orange. If this is impossible,
      return <code>-1</code>
      <h2>How to set the initial state</h2>
      Click a cell to cycle between the 3 states:
      <ul>
        <li>empty cells represent...empty cells </li>
        <li>
          <span
            style={{
              backgroundColor: "orange",
              borderRadius: "5px",
              color: "white",
              padding: "0px 5px",
            }}
          >
            orange
          </span>{" "}
          spheres represent fresh oranges
        </li>
        <li>
          <span
            style={{
              backgroundColor: "green",
              borderRadius: "5px",
              color: "white",
              padding: "0px 5px",
            }}
          >
            green
          </span>{" "}
          spheres represent rotten oranges
        </li>
      </ul>
      Once you are done, press the <code>Launch Algorithm</code> button to see
      the algorithm in action!
      <h2>About the algorithm</h2>
      The optimal solution uses <code>multiple source</code>{" "}
      <code>Breadth First Search</code> with a queue. <br />
      First, each cell is scanned to find the sources, the rotten oranges. The
      queue is then initialized with the sources found and the{" "}
      <code>Breadth First Search</code> starts. <br /> Only fresh oranges will
      be <code>visited</code>, meaning they get rotted too and they will start
      rot adjacent fresh oranges too!
      <br /> Each time a <code>level</code> is visited, the minutes counter is
      increased (starts from 0). Once the <code>Breadth First Search</code> is
      over (and the queue empty), the minutes counter will tell how many minutes
      it took! <br />
      <code>Time complexity: O(n * m)</code> <br />
      <code>Space complexity: O(n * m)</code>
    </div>
  );
};

export default Description;
