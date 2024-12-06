import { announceChallenge, decodeFile, get2DArrayElementSafe } from "./common.ts";

// Get the file path from command line arguments
const filePath = Deno.args[0];
announceChallenge(1, "Historian Hysteria");

function findStart(grid: string[][]){
	for (let i = 0; i < grid.length; i++) {
		const find = grid[i].indexOf("^");
		if(find != -1){
			return {x: find, y: i} 
		};
	}
	console.log("this shouldn't happen")
	return {x: 0, y: 0}
}

function prettyPrintGrid(grid: string[][]){

	for(const row of grid){
		let str = ""
		for(const collumn of grid){
			str += collumn
		}
		console.log(str)
	}
}

function rotateDirection(dirX, dirY) {
	
}

async function part1(grid: string[][]) {
	let noEdgeKiss = true;
	let directionY = -1;
	let directionX = 0;
	let {x, y} = findStart(grid)
	console.log(x, y)
	while(noEdgeKiss){
		console.log(x,y)
		if(y > grid.length || y < 0 || x < 0 || x > grid[y].length) {noEdgeKiss = false; continue};
		grid[y][x] = "X"
		x += directionX
		y += directionY
		if(grid[y+directionY]?.[x+directionX] === "#"){
			console.log("turn!")
		}


	}
    console.log("solution part 1:", "NAN");
}

async function part2() {
    console.log("solution part 2:", "NAN");
}

async function main() {
    const lines = Deno.readTextFileSync(filePath).trim().split("\n");
    const grid: string[][] = lines.map((value) => {return value.trim().split("");});
	prettyPrintGrid(grid)
	// console.log(grid)
    part1(grid);
    part2();
}

main();
