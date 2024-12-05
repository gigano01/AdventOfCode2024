import { announceChallenge, decodeFile } from './common';

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(1, "Historian Hysteria")
//4578
function checkValidity(pageNrs: number[], instructionsX: number[], instructionsY: number[]) {
	for(let i = 0;i<pageNrs.length;i++) {
		const a = pageNrs[i]
		const b = pageNrs[i+1]
		for(let j = 0; j<instructionsX.length; j++){
			if(instructionsX[j] != a && instructionsY[j] != a) continue;
			if(instructionsX[j] != b && instructionsY[j] != b) continue;
			// console.log(a, b, instructionsX[j], instructionsY[j])
			if(instructionsX[j] != a ) return false;
		}
	}
	return true
}

async function part1(instructionsX: number[], instructionsY: number[], pageNrCollection: number[][]) {
	let sum = 0;
	for(const pageNrs of pageNrCollection) {
		if(checkValidity(pageNrs,instructionsX,instructionsY)){
			sum += pageNrs[Math.ceil(pageNrs.length/2)-1]
		}
	}
	
	console.log("solution part 1:", sum);
}

async function part2(instructionsX: number[], instructionsY: number[], pageNrCollection: number[][]) {
	let sum = 0;
	for(const pageNrs of pageNrCollection) {
		if(!checkValidity(pageNrs,instructionsX,instructionsY)){
			pageNrs.sort((a,b)=>{
				for(let j = 0; j<instructionsX.length; j++){
					if(instructionsX[j] != a && instructionsY[j] != a) continue;
					if(instructionsX[j] != b && instructionsY[j] != b) continue;
					// console.log(a, b, instructionsX[j], instructionsY[j])
					if(instructionsX[j] == a ) return -1;
					if(instructionsY[j] == a) return 1;
				}
				return 0
			})
			sum += pageNrs[Math.ceil(pageNrs.length/2)-1]
		}
	}
	
	console.log("solution part 2:", sum);
}

async function main () {
	const instructionsX: number[] = []
	const instructionsY: number[] = []
	const pageNrCollection: number[][] = []

	await decodeFile(filePath, async (lines) => {
		let endOfInstructions = false
		for (const line of lines) {
			if (line.trim() === "") {endOfInstructions=true;continue}
			if(!endOfInstructions) {
				const extracted = line.trim().split("|")
				instructionsX.push(Number.parseInt(extracted[0]))
				instructionsY.push(Number.parseInt(extracted[1]))
			} else {
				pageNrCollection.push(line.trim().split(",").map((val)=>{return parseInt(val)}))
			}
		}
    });

	part1(instructionsX,instructionsY,pageNrCollection);
	part2(instructionsX,instructionsY,pageNrCollection);
}

main()