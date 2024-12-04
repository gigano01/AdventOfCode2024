import { announceChallenge, decodeFile } from './common';

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(4, 'Ceres Search');

function findXmas(y: number, x: number, grid: string[][], count: number) {
  const order = ['X', 'M', 'A', 'S'];
  const directions = [
    { dy: 1, dx: 1 }, // down-right
    { dy: 1, dx: -1 }, // down-left
    { dy: -1, dx: 1 }, // up-right
    { dy: -1, dx: -1 }, // up-left
    { dy: 0, dx: 1 }, // right
    { dy: 0, dx: -1 }, // left
    { dy: 1, dx: 0 }, // down
    { dy: -1, dx: 0 }, // up
  ];

  for (const { dy, dx } of directions) {
    let match = true;
    for (let i = 0; i < order.length; i++) {
      const newY = y + i * dy;
      const newX = x + i * dx;
      if (
        newY < 0 ||
        newY >= grid.length ||
        newX < 0 ||
        newX >= grid[newY].length ||
        grid[newY][newX] !== order[i]
      ) {
        match = false;
        break;
      }
    }
    if (match) {
      // console.log("found XMAS diagonally: ", y, x);
      count++;
    }
  }
  return count;
}

let debugtrack = 0;
function findX_MAS(y: number, x: number, grid: string[][], count: number) {
  debugtrack++;

  function rotateDirections(directions: { dx: number; dy: number; pat: string }[]) {
    const rotatedDirections = [];
    for (let i = 0; i < 4; i++) {
      directions = directions.map(({ dx, dy, pat }) => ({ dx: -dy, dy: dx, pat }));
      rotatedDirections.push([...directions]);
    }
    return rotatedDirections;
  }
  const directions = [
    { dx: -1, dy: -1, pat: 'M' },
    { dx: 1, dy: -1, pat: 'S' },
    { dx: -1, dy: 1, pat: 'M' },
    { dx: 1, dy: -1, pat: 'S' },
  ];

  const rotatedDirections = rotateDirections(directions);
//   console.log(rotatedDirections);

  for (let i = 0; i < 4; i++) {
    let match = true;
    for (const { dx, dy, pat } of rotatedDirections[i]) {
    //   console.log(dx, dy);
      let _x = x + 1 * dx;
      let _y = y + 1 * dy;
      if (_y < grid.length && _y >= 0) {
        if (_x > grid[_y].length || _x <= 0 || grid[_y][_x] !== pat) {
          match = false;
        }
      } else {
        // console.log("aiepofhoieahgpioeazhgpioeahgpeaiohgfoaiehgapioegh")
        match = false;
      }
    }
    if (match) {
      count++;
	  console.log(x,y)
      return count;
    }
  }
  return count;
}

async function part1(grid: string[][]) {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      // traverse the grid until we find X
      if (grid[y][x] === 'X') {
        count = findXmas(y, x, grid, count);
      }
    }
  }

  console.log('solution part 1:', count);
}

async function part2(grid: string[][]) {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      // traverse the grid until we find X
      if (grid[y][x] === 'A') {
        count = findX_MAS(y, x, grid, count);
      }
    }
  }

  console.log(debugtrack);
  console.log('solution part 2:', count);
}

async function main() {
  let grid: string[][] = [];
  await decodeFile(filePath, async (lines) => {
    grid = lines.map((line) => line.trim().split(''));
  });
  // console.log(grid);
  part1(grid);
  part2(grid);
}

main();
