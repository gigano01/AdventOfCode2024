import { announceChallenge, decodeFile } from './common';

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(1, "Historian Hysteria")

async function part1() {
	const left: number[] = [];
	const right: number[] = [];

	await decodeFile(filePath, async (lines) => {
		for (const line of lines) {
			const numbers = line.split(' ');
            left.push(parseInt(numbers[0]));
            right.push(parseInt(numbers[3]));
        }
    });

    // Sort the left and right arrays
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
	//find the differences between these
	let sum = 0;
	for (let i = 0; i < left.length; i++) {
		const num = Math.abs(left[i] - right[i]);
		sum += num;
	}

	console.log("solution part 1:", sum);
}

async function part2() {
	const left: number[] = [];
	const right: number[] = [];

	await decodeFile(filePath, async (lines) => {
		for (const line of lines) {
			const numbers = line.split(' ');
            left.push(parseInt(numbers[0]));
            right.push(parseInt(numbers[3]));
        }
    });

	// get all the final values
	let sum = 0;
	for (let i = 0; i < left.length; i++) {
		const count = right.filter((value) => value === left[i]).length;
		sum += left[i] * count;
	}
	console.log("solution part 2:", sum);
}

part1();
part2();