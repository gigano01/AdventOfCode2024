import { announceChallenge } from "./common.ts";

// Get the file path from command line arguments
const filePath = Deno.args[0] || "input/day9.test";
announceChallenge(9, "Disk Fragmenter");
const FREE = -1;

async function part1(fileSystem: number[]) {
	for(let i = 0; i < fileSystem.length; i++){
		const pos = fileSystem.findIndex(val=>val===FREE)
		if(pos === -1) continue
		fileSystem[pos] = fileSystem.pop()!
	}
	fileSystem = fileSystem.filter(val=>val!=FREE)
	const checksum = fileSystem.reduce((accumulator, val, i)=>accumulator+val*i)

	// let str = ""
	// fileSystem.forEach(val=>str+=val)
	// console.log(str)
    console.log("solution part 1:", checksum);
}

async function part2(fileSystem: number[]) {
    console.log("solution part 2:", "NAN");
}

/*
	bestandsysteem werkt als volgt:
	je krijgt een string en deze stelt de datablokken voor. de lengte van een bestand en de grootte van vrijeruimte wisselen elkaar af.
	12345 staat voor 0..111....22222
	elk bestand heeft een ID en het start met 0

	je moet het systeem defragmenteren door het slaatste blok te verplaatsen naar de mest linkse vrije plaats
*/

async function main() {
    const lines = Deno.readTextFileSync(filePath).trim().split("\n");
    let idCounter = 0;

    const fileSystem = lines[0]
        .trim()
        .split("")
        .map((val, i) => (i % 2 == 0 ? Array(parseInt(val)).fill(String(idCounter++)) : Array(parseInt(val)).fill(String(FREE))))
		.flat()
		.map(val=>parseInt(val))

    // console.log(fileSystem);
    part1(fileSystem);
    part2();
}

main();
