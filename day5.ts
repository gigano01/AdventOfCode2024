import { announceChallenge, decodeFile, swapElements } from "./common";

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(5, "Print Queue");

async function part1(instructX: number[], instructY: number[], pageNrs: number[][]) {
    let answer = 0;
    for (const slice of pageNrs) {
		let correct
		while(!correct){
			correct = true
			for (let i = 0; i < slice.length; i++) {
				const a = slice[i];
				for (let j = 0; i < slice.length; i++) {
					const b = slice[j];
					for (let z = 1; z < instructX.length; z++) {
						if (instructX[z] != a && instructY[z] != a) continue;
						if (instructX[z] != b && instructY[z] != b) continue;
						// console.log(a, b, instructX[i], instructY[i])
						// console.log(a,b)
						console.log(slice)
						if(i > j){
							if (instructY[z] === a) {swapElements(slice, i, j);correct=false};
						} else {
							if (instructY[z] === a) {swapElements(slice, i, j);correct=false};
						}
					}
				}
			}
		}

        console.log(slice);
        if (slice.length % 2 == 0) console.log("fucked list", slice);
        // console.log(Math.round(slice.length / 2)-1)
        answer += slice[Math.round(slice.length / 2) - 1];
    }

    console.log("solution part 1:", answer);
}

async function part2() {
    console.log("solution part 2:", "NAN");
}

async function main() {
    const instructX: number[] = [];
    const instructY: number[] = [];
    const pageNrs: number[][] = [];
    await decodeFile(filePath, async (lines) => {
        let endOfInstructions: boolean = false;
        for (const line of lines) {
            if (line.trim() === "") {
                endOfInstructions = true;
                continue;
            }
            if (!endOfInstructions) {
                const decodedLine = line.trim().split("|");
                instructX.push(Number.parseInt(decodedLine[0]));
                instructY.push(Number.parseInt(decodedLine[1]));
            } else {
                const numbers = line.trim().split(",");
                const newNumber: number[] = numbers.map((value) => {
                    return Number.parseInt(value);
                });
                // console.log(numbers, newNumber);
                pageNrs.push(newNumber);
            }
        }
    });

    // console.log("=============================\n", instructX, instructY, pageNrs);

    part1(instructX, instructY, pageNrs);
    part2();
}

main();
