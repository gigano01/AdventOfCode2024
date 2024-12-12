import { announceChallenge, getGridSize, outOfBounds, removeFromArray } from "./common.ts";

// Get the file path from command line arguments
const filePath = Deno.args[0] || "input/day12.input";
announceChallenge(12, "Garden Groups");

function calculatePlot(grid: string[][], x: number, y: number, type: string) {
    // const [w, h] = getGridSize(grid);
    let area = 0;
    let perimeter = 0;

    if (outOfBounds(grid, x, y, grid[0].length, grid.length)) return [area, perimeter + 1];
    const plot = grid[y][x];

    if (plot != `!${type}`) {
        if (plot === type) {
            grid[y][x] = `!${type}`;
            area += 1;
            let [_area, _perimeter] = calculatePlot(grid, x + 1, y, type);
            area += _area;
            perimeter += _perimeter;
            [_area, _perimeter] = calculatePlot(grid, x - 1, y, type);
            area += _area;
            perimeter += _perimeter;
            [_area, _perimeter] = calculatePlot(grid, x, y + 1, type);
            area += _area;
            perimeter += _perimeter;
            [_area, _perimeter] = calculatePlot(grid, x, y - 1, type);
            area += _area;
            perimeter += _perimeter;
        } else {
            perimeter += 1;
        }
    }

    return [area, perimeter];
}

async function part1(grid: string[][]) {
    const [w, h] = getGridSize(grid);
    let solution = 0;
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            if (grid[y][x].at(0) != "!") {
                let [area, perimeter] = calculatePlot(grid, x, y, grid[y][x]);
                solution += area * perimeter;
                console.log(grid[y][x], area, perimeter);
            }
        }
    }
    console.log("solution part 1:", solution);
}

type Perimeter = {
    dir: string;
    x: number;
    y: number;
};

function addSide(perimeter: Perimeter[], x: number, y: number, dir: string) {
    if (dir == "U" || dir == "D") {
        perimeter.push({ dir, x, y });
        return;
    } else if (dir == "L" || dir == "R") {
        perimeter.push({ dir, x, y });
        return;
    }
}

function calculatePlotSides(grid: string[][], x: number, y: number, type: string, perimeter: Perimeter[], direction: string = "none") {
    // const [w, h] = getGridSize(grid);
    let area = 0;

    if (outOfBounds(grid, x, y, grid[0].length, grid.length)) {
        addSide(perimeter, x, y, direction);
        return area;
    }
    const plot = grid[y][x];

    if (plot != `!${type}`) {
        if (plot === type) {
            grid[y][x] = `!${type}`;
            area += 1;
            area += calculatePlotSides(grid, x + 1, y, type, perimeter, "R");

            area += calculatePlotSides(grid, x - 1, y, type, perimeter, "L");

            area += calculatePlotSides(grid, x, y + 1, type, perimeter, "D");

            area += calculatePlotSides(grid, x, y - 1, type, perimeter, "U");
        } else {
            addSide(perimeter, x, y, direction);
            // perimeter += 1;
        }
    }

    return area;
}

let glob = 0;
function traceEdge(sides: Perimeter[], side: Perimeter) {
    let length = 1;
	if(side.dir == "H") return length
    const index = sides.findIndex((val) => side.x == val.x && side.y == val.y && side.dir == val.dir);
	// console.log(index)
	// console.log(side)
    if (index == -1) return 0;
    const sideN = structuredClone(side);
    sides[index].dir = "H"

    switch (sideN.dir) {
        case "U":
            length += traceEdge(sides, { dir: sideN.dir, x: sideN.x + 1, y: sideN.y });
            length += traceEdge(sides, { dir: sideN.dir, x: sideN.x - 1, y: sideN.y });
            break;
        case "D":
            length += traceEdge(sides, { dir: sideN.dir, x: sideN.x + 1, y: sideN.y });
            length += traceEdge(sides, { dir: sideN.dir, x: sideN.x - 1, y: sideN.y });
            break;
        case "L":
            length += traceEdge(sides, { dir: sideN.dir, x: sideN.x, y: sideN.y + 1 });
            length += traceEdge(sides, { dir: sideN.dir, x: sideN.x, y: sideN.y - 1 });
            break;
        case "R":
            length += traceEdge(sides, { dir: sideN.dir, x: sideN.x, y: sideN.y + 1 });
            length += traceEdge(sides, { dir: sideN.dir, x: sideN.x, y: sideN.y - 1 });
            break;
    }

    return length;
}

function filterSides(sides: Perimeter[]) {
    console.log(sides);
    let count = 0
    for (var i = 0; i < sides.length; i++) {
        const H = sides[i];
        if (H.dir != "H") {
            let length = traceEdge(sides, H);
            count += 1
        }
    }
    return count;
}

async function part2(grid: string[][]) {
    const [w, h] = getGridSize(grid);
    let solution = 0;
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            if (grid[y][x].at(0) != "!") {
                const perimeters: Perimeter[] = [];
                let area = calculatePlotSides(grid, x, y, grid[y][x], perimeters);
                const sideCount = filterSides(perimeters);
                // const set = new Set(perimeter);
                solution += area * sideCount;
                console.log(grid[y][x], area);
            }
        }
    }
    console.log("solution part 2:", solution);
}

async function main() {
    const lines = Deno.readTextFileSync(filePath).trim().split("\n");
    const grid = lines.map((val) => val.trim().split(""));

    part1(structuredClone(grid));
    part2(structuredClone(grid));
}

main();
