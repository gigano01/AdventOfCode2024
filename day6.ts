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

/*
-1 0
0 1
1 0
0 -1
-1 0
*/
function rotateDirection(dirX: number, dirY: number): [number, number] {
	// console.log(dirX,dirY)
	if(dirX == 0){
		// console.log("H")
		dirX = -dirY
		dirY = 0
	} else {
		dirY = dirX
		dirX = 0
	}
	// console.log(dirX,dirY)
	return [dirX, dirY]
	
}
//1454
function simulate(grid: string[][], x: number, y: number){
	
	let directionY = -1;
	let directionX = 0;
	let noEdgeKiss = true;
	let tries = 0
	while(noEdgeKiss){
		tries++;
		// if(tries > 10000) return true
		// console.log(x,y)

		if(y >= grid.length || y < 0 ) {noEdgeKiss = false; return false};
		if(x < 0 || x >= grid[y].length) {noEdgeKiss = false; return false}
		if(Number.isNaN(parseInt(grid[y][x]))) {
			grid[y][x] = "0"
		} else {
			if(grid[y][x] == "1000"){
				console.log(grid)
				return true;
			}
			grid[y][x] = String(parseInt(grid[y][x]) + 1)
		}
		x += directionX
		y += directionY
		if(grid[y+directionY]?.[x+directionX] === "#"){
			// console.log("turn!");
			[directionX, directionY] = rotateDirection(directionX, directionY)
			// console.log(directionX, directionY)
		}


	}
}

async function part1(grid: string[][]) {
	let noEdgeKiss = true;
	let directionY = -1;
	let directionX = 0;
	let {x, y} = findStart(grid)
	// console.log(x, y)
	let count = 0;
	while(noEdgeKiss){
		// console.log(x,y)

		if(y >= grid.length || y < 0 ) {noEdgeKiss = false; continue};
		if(x < 0 || x > grid[y].length) {noEdgeKiss = false; continue}
		if(grid[y][x] != "X"){
			count++
			grid[y][x] = "X"
		}
		x += directionX
		y += directionY
		if(grid[y+directionY]?.[x+directionX] === "#"){
			// console.log("turn!");
			[directionX, directionY] = rotateDirection(directionX, directionY)
			// console.log(directionX, directionY)
		}


	}
    console.log("solution part 1:", count);
}

async function part2(grid: string[][]) {
	let {x, y} = findStart(grid);
	let count = 0
	for(let i = 0; i < grid.length; i++){
		for(let j = 0; j < grid[i].length; j++){
			let fonyGrid: string[][] = structuredClone(grid)
			if(fonyGrid[i][j] != "#" && fonyGrid[i][j] != "^"){
				// console.log(i,j)
				fonyGrid[i][j] = "#"
				// console.log(fonyGrid)
				if(simulate(fonyGrid, x, y)){
					// console.log(i,j, fonyGrid)
					count++;
					console.log(count)
				}
			}
		}
	}
    console.log("solution part 2:", count);
}

async function main() {
    const lines = Deno.readTextFileSync(filePath).trim().split("\n");
    const grid: string[][] = lines.map((value) => {return value.trim().split("");});
	// prettyPrintGrid(grid)
	// console.log(grid)
    part1(structuredClone(grid));
    part2(structuredClone(grid));
}

main();
