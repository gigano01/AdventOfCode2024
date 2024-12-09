import { announceChallenge, getPrettyGrid } from "./common.ts";

// Get the file path from command line arguments
const filePath = Deno.args[0] || "input/day8.test2";
announceChallenge(8, "Resonant Collinearity");

function findAntiNodes(grid: string[][], antiNodes: number[][], _x: number, _y: number, repeat: boolean) {
    const freq = grid[_y][_x];
    let count = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y]?.length; x++) {
            if (grid[y][x] === freq && _x !== x && _y !== y) {
                const dx = x - _x;
                const dy = y - _y;
                // if(y+dy === 11) console.log("fucker")
                if (validateTangent(dx, dy, x, y, grid[y].length, grid.length)) {
                    count += addAntiNode(x + dx, y + dy, dx, dy, grid[y].length, grid.length, repeat, antiNodes);
                }
            }
        }
    }
    return count;
}

function addAntiNode(x: number, y: number, dx: number, dy: number, width: number, height: number, rep: boolean, antiNodes: number[][],count=0) {
	// console.log("H", antiNodes)
    if (rep && validateTangent(dx, dy, x, y, width, height)) {
		count = addAntiNode(x + dx, y + dy, dx, dy, width, height, rep, antiNodes,count);
    }
	if (antiNodes.findIndex((val) => val[0] === x && val[1] === y) !== -1) return count;
    antiNodes.push([x, y]);
	count++
    return count;
}

function validateTangent(dx: number, dy: number, x: number, y: number, width: number, height: number) {
    const newX = x + dx;
    const newY = y + dy;
    // console.log(dx,dy,x,y)
    if (newX < 0 || newX >= width || newY < 0 || newY >= height) return false;
    return true;
}

async function part1(grid: string[][], freqs: Set<string>) {
    let count = 0;

    const antiNodes: number[][] = [];
    for (const freq of freqs) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y]?.length; x++) {
                if (grid[y][x] === freq) {
					count += findAntiNodes(grid, antiNodes, x, y,false);
                }
            }
        }
    }
	
    antiNodes.forEach((val) => {
        grid[val[1]][val[0]] = "#";
    });
    console.log(getPrettyGrid(grid));
    console.log("solution part 1:", count);
}

async function part2(grid: string[][], freqs: Set<string>) {
	let count = 0;
	
    const antiNodes: number[][] = [];
    for (const freq of freqs) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y]?.length; x++) {
                if (grid[y][x] === freq) {
					count += addAntiNode(x,y,0,0,grid[y].length,grid.length,false,antiNodes)
					count += findAntiNodes(grid, antiNodes, x, y,true);
                }
            }
        }
    }

    antiNodes.forEach((val) => {
        grid[val[1]][val[0]] = "#";
    });

	

    console.log("=================");
    console.log(getPrettyGrid(grid));
    console.log("solution part 2:", count);
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
    part1(structuredClone(input), freqs);
    part2(structuredClone(input), freqs);
}

main();
