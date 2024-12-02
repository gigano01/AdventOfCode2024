import { announceChallenge, decodeFile } from './common';

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(1, "Historian Hysteria")

async function part1() {
	await decodeFile(filePath, async (lines) => {

    });

	console.log("solution part 1:", "NAN");
}

async function part2() {
	await decodeFile(filePath, async (lines) => {
		
    });
	
	console.log("solution part 2:", "NAN");
}

part1();
part2();