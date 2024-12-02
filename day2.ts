import { announceChallenge, decodeFile } from './common';

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(2, "Red-Nosed Reports")

function validateReport(report: number[]): boolean {
	let isIncreasing = report[0] < report[1];
	if(report[0]===report[1]) return false;
	return report.every((n, i) => {
		if(i === 0) return true;
		
		const distanceValid = Math.abs(n - report[i - 1]) < 4;
		if(!distanceValid) return false;

		if(isIncreasing) {
			return n > report[i - 1];
		} else {
			return n < report[i - 1];
		}

	});

}

async function part1() {
	const reports: number[][] = [];
	await decodeFile(filePath, async (lines) => {
		for(let line of lines) {
			const numbers: number[] = line.split(" ").map(n => parseInt(n));
			reports.push(numbers);
		}
    });
	let count = 0;
	for(let report of reports) {
		const isValid = validateReport(report);
		if(isValid) count++;
	}

	console.log("solution part 1:", count);
}

async function part2() {
	await decodeFile(filePath, async (lines) => {
		
    });
	
	console.log("solution part 2:", "NAN");
}

part1();
part2();