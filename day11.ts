import { announceChallenge } from './common.ts';

// Get the file path from command line arguments
const filePath = Deno.args[0] || "input/day11.test";
announceChallenge(11, "Plutonian Pebbles")

async function part1(stones: number[]) {
	const maxBlinks = 25
	for(let blink = 0; blink < maxBlinks; blink++){
		const newArray = []
		for(let i = 0; i < stones.length; i++){
			const stone = stones[i];

			if(stone == 0){
				newArray.push(1)
			} else if (String(stone).length % 2 == 0) { //even digit length
				const str = String(stone)
				
				newArray.push(parseInt(str.slice(0,str.length/2)))
				newArray.push(parseInt(str.slice(str.length/2, str.length)))
			} else {
				newArray.push(stone * 2024)
			}
		}
		stones = newArray
		// console.log(blink,stones)
	}
	console.log("solution part 1:", stones.length);
}

function splitDigits(number: number){
	const digitCount = Math.floor(Math.log10(number)+1);
	const base = Math.pow(10,digitCount/2)
	// console.log(base)
	const digit1 = number % base
	const digit2 = (number-digit1) / base
	return [digit1,digit2]	
}

async function part2(stones: number[]) {
	const maxBlinks = 75
	for(let blink = 0; blink < maxBlinks; blink++){
		const len = stones.length
		for(let i = 0; i < len; i++){
			const stone = stones.shift()!;
			// console.log(Math.floor(Math.log10(stone)+1), stone)
			if(stone == 0){
				stones.push(1)
			} else if ((Math.floor(Math.log10(stone)+1)) % 2 == 0) { //even digit length
				const digits = splitDigits(stone)
				stones.push(digits[1])
				stones.push(digits[0])
			} else {
				stones.push(stone * 2024)
			}
		}
		// console.log(blink,stones)
		console.log(blink)
	}
	
	console.log("solution part 2:", stones.length);
}

async function main () {
	const lines = Deno.readTextFileSync(filePath).trim().split("\n");
	const stones: number[] = lines[0].trim().split(" ").map(val=>parseInt(val))

	part1(structuredClone(stones));
	part2(structuredClone(stones));
}

main()