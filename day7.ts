import { announceChallenge } from './common.ts';

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(1, "Historian Hysteria")

async function part1() {

	console.log("solution part 1:", "NAN");
}

async function part2() {
	
	
	console.log("solution part 2:", "NAN");
}

async function main () {
	const lines = Deno.readTextFileSync(filePath).trim().split("\n");
	
	part1();
	part2();
}

main()