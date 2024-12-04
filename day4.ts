import { announceChallenge, decodeFile, extract2DArrayFunky, match2DArray } from "./common";

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(4, "Ceres Search");

function findXmas(y: number, x: number, grid: string[][], count: number) {
    const order = ["X", "M", "A", "S"];
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

async function part1(grid: string[][]) {
    let count = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            // traverse the grid until we find X
            if (grid[y][x] === "X") {
                count = findXmas(y, x, grid, count);
            }
        }
    }

    console.log("solution part 1:", count);
}

async function part2(grid: string[][]) {
    let count = 0;
    const patterns: string[][][] = [
        [
            ["M", "", "S"],
            ["", "A", ""],
            ["M", "", "S"],
        ],
        [
            ["M", "", "M"],
            ["", "A", ""],
            ["S", "", "S"],
        ],
        [
            ["S", "", "M"],
            ["", "A", ""],
            ["S", "", "M"],
        ],
        [
            ["S", "", "S"],
            ["", "A", ""],
            ["M", "", "M"],
        ],
    ];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const extracted = extract2DArrayFunky(grid, y - 1, x - 1, 3, 3);
            for (const pattern of patterns) {
                const succes = match2DArray(extracted, pattern);
                if (succes) {
                    count++;
                }
            }
        }
    }

    console.log("solution part 2:", count);
}

async function main() {
    let grid: string[][] = [];
    await decodeFile(filePath, async (lines) => {
        grid = lines.map((line) => line.trim().split(""));
    });
    // console.log(grid);
    part1(grid);
    part2(grid);
}

main();
