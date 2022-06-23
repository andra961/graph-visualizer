function validateCell(grid: number[][], i: number, j: number) {
  if (i < 0 || i > grid.length - 1) return false;
  if (j < 0 || j > grid[0].length - 1) return false;
  if (grid[i][j] === 0 || grid[i][j] === 2) return false;

  return true;
}

export function orangesRotting(grid: number[][]): number[][][] {
  let minutes = 0;

  let queue: number[][] = [];

  let fresh = { count: 0 };

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, +1],
  ];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) queue.push([i, j]);
      if (grid[i][j] === 1) fresh.count++;
    }
  }

  const bfs: number[][][] = [];

  if (fresh.count === 0) return bfs.slice(1);

  while (queue.length > 0) {
    let queueSize = queue.length;
    bfs.push([...queue]);
    for (let i = 0; i < queueSize; i++) {
      let [r, c] = queue.shift() as number[];
      for (let [rd, rc] of directions) {
        let [nr, nc] = [r + rd, c + rc];
        if (validateCell(grid, nr, nc)) {
          queue.push([nr, nc]);
          grid[nr][nc] = 2;
          fresh.count--;
        }
      }
    }
    if (queue.length > 0) minutes++;
  }

  console.log("minutes used", minutes);

  if (fresh.count === 0) return bfs.slice(1);

  return bfs.slice(1);
}
