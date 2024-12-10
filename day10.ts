import { announceChallenge, get2DArrayElementSafe } from "./common.ts";

// Get the file path from command line arguments
const filePath = Deno.args[0] || "input/day10.test";
announceChallenge(10, "Hoof It");

function walkPath(grid: string[][], x: number, y: number, depth: number, mustBeUnique: boolean, trailheads: string[] = [], count = 0) {
    const gridH = grid.length;
    const gridW = grid[0].length;
    const char = get2DArrayElementSafe(grid, x, y);
    if (x < 0 || x >= gridW || y < 0 || y >= gridH) return count;
    if (grid[y][x] === String(depth)) {
        if (depth > 8 && trailheads.findIndex((val) => val == `${x},${y}`) === -1) {
            // console.log("H ", x, y);
            if (mustBeUnique) {
                trailheads.push(`${x},${y}`);
            }
            return count + 1;
        }
        count = walkPath(grid, x, y - 1, depth + 1, mustBeUnique, trailheads, count);
        count = walkPath(grid, x, y + 1, depth + 1, mustBeUnique, trailheads, count);
        count = walkPath(grid, x - 1, y, depth + 1, mustBeUnique, trailheads, count);
        count = walkPath(grid, x + 1, y, depth + 1, mustBeUnique, trailheads, count);
    }

    return count;
}

async function part1(grid: string[][]) {
    const gridH = grid.length;
    const gridW = grid[0].length;
    let count = 0;
    for (let y = 0; y < gridH; y++) {
        for (let x = 0; x < gridW; x++) {
            if (grid[y][x] == "0") {
                count += walkPath(grid, x, y, 0, true);
                // console.log(x, y, count);
            }
        }
    }

    console.log("solution part 1:", count);
}

async function part2(grid: string[][]) {
	const gridH = grid.length;
    const gridW = grid[0].length;
    let count = 0;
    for (let y = 0; y < gridH; y++) {
        for (let x = 0; x < gridW; x++) {
            if (grid[y][x] == "0") {
                count += walkPath(grid, x, y, 0, false);
                // console.log(x, y, count);
            }
        }
    }
    console.log("solution part 2:", count);
}

async function main() {
    const lines = Deno.readTextFileSync(filePath).trim().split("\n");
    const grid = lines.map((val) => val.trim().split(""));
    // console.log(grid)

    part1(grid);
    part2(grid);
}

main();
