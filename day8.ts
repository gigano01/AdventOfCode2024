import { announceChallenge } from "./common.ts";

// Get the file path from command line arguments
const filePath = Deno.args[0];
announceChallenge(8, "Resonant Collinearity");

function findAntiNodes(grid: string[][], antiNodes: number[][], _x: number, _y: number) {
    const freq = grid[_y][_x];
	let count = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y]?.length; x++) {
            if (grid[y][x] === freq && _x !== x && _y !== y) {
                if (validateTangent(_y - y, _x - x, x, y, grid.length, grid[y].length)) {
					console.log("H", antiNodes)
					count++;
                }
            }
        }
    }
	return count
}

function validateTangent(dx: number, dy: number, x: number, y: number, width: number, height: number) {
    const newX = x + dx;
    const newY = y + dx;
    if (newX < 0 || newX >= width || newY < 0 || newY >= height) return false;
    return true;
}

async function part1(grid: string[][], freqs: IterableIterator<string>) {
	let count = 0;

    for (const freq of freqs) {
        const antiNodes: number[][] = []
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y]?.length; x++) {
                if (grid[y][x] === freq) {
                    count += findAntiNodes(grid,antiNodes, x, y);
                }
            }
        }
    }
    console.log("solution part 1:", count);
}

async function part2() {
    console.log("solution part 2:", "NAN");
}

//antenes hebben elks hun eigen frequentie en zijn volledig gesplitst.
//de antiantennes zijn geloceerd op de tegenovergestelde DX en DY in vergelijking met elkaar
//we creëren apparte arrays voor elke frequentie

async function main() {
    const lines = Deno.readTextFileSync(filePath).trim().split("\n");

    const freqs: Set<string> = new Set();
    const input = lines
        .map((val) => val.trim().split(""))
        .map((val) =>
            val.map((val) => {
                if (val !== ".") freqs.add(val);
                return val;
            })
        );
    // const input = lines.map(val=>{if(val !== "."){}})
    // console.log(input, freqs);
    part1(input, freqs);
    part2();
}

main();
