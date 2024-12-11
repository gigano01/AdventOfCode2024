import { announceChallenge } from "./common.ts";
import {Memoize,MemoizeExpiring} from 'typescript-memoize';
import { LinkedList, LinkedListItem } from "https://deno.land/x/linkedlist@v1.1.1/mod.ts";

// Get the file path from command line arguments
const filePath = Deno.args[0] || "input/day11.test";
announceChallenge(11, "Plutonian Pebbles");

async function part1(stones: number[]) {
    const maxBlinks = 25;
    for (let blink = 0; blink < maxBlinks; blink++) {
        const newArray = [];
        for (let i = 0; i < stones.length; i++) {
            const stone = stones[i];

            if (stone == 0) {
                newArray.push(1);
            } else if (String(stone).length % 2 == 0) {
                //even digit length
                const str = String(stone);

                newArray.push(parseInt(str.slice(0, str.length / 2)));
                newArray.push(parseInt(str.slice(str.length / 2, str.length)));
            } else {
                newArray.push(stone * 2024);
            }
        }
        stones = newArray;
        // console.log(blink,stones)
    }
    console.log("solution part 1:", stones.length);
}

function splitDigits(number: number) {
    const digitCount = Math.floor(Math.log10(number) + 1);
    const base = Math.pow(10, digitCount / 2);
    // console.log(base)
    const digit1 = number % base;
    const digit2 = (number - digit1) / base;
    return [digit1, digit2];
}

function memoizePerformActions() {
    let cache = {};
    return (stone: number): number[] => {
        if (stone in cache) {
            // console.log(stone)
            return cache[stone];
        }

        if (stone == 0) {
            const a = [1];
            cache[stone] = a;
            return a;
            // stones.push(1)
        } else if (Math.floor(Math.log10(stone) + 1) % 2 == 0) {
            //even digit length
            const res = splitDigits(stone);
            cache[stone] = res;
            return res;
            // stones.push(digits[1])
            // stones.push(digits[0])
        } else {
            const res = [stone * 2024];
            cache[stone] = res;
            return res;
            // stones.push(stone * 2024)
        }
    };
}

let glob = 0;
const performActions = memoizePerformActions();

function MemoizeBlink() {
    let cache: any = {};

    const blink = (stone: number, blinkcount: number, counter: number) => {
		const hash = `${stone},${blinkcount}`
        if (hash in cache) {
			// console.log("found stone: ", hash, "in cache: ",cache[hash])
            return cache[hash];
        }

        if (blinkcount >= 25) {
			cache[hash] = counter + 1
            return counter + 1;
        }

        const H = performActions(stone);
        blinkcount += 1;
        counter = blink(H[0], blinkcount, counter);
        if (H[1]) counter = blink(H[1], blinkcount, counter);

        glob--;
        // console.log(glob)
		// cache[hash] = counter
        return counter;
    };
    return blink;
}

async function part2(stones: number[]) {
    let count = 0;
	const blink = MemoizeBlink()
    for (let i = 0; i < stones.length; i++) {
        count += blink(stones[i], 0, 0);
        console.log(count);
    }

    console.log("solution part 2:", count);
}

async function main() {
    const lines = Deno.readTextFileSync(filePath).trim().split("\n");
    const stones: number[] = lines[0]
        .trim()
        .split(" ")
        .map((val) => parseInt(val));

    part1(structuredClone(stones));
    part2(structuredClone(stones));
}

main();
