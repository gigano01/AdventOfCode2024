import { announceChallenge, factorial, removeFromArray } from "./common.ts";

// Get the file path from command line arguments
const filePath = Deno.args[0] || "input/day7.test";
announceChallenge(1, "Historian Hysteria");

type Entry = {
    testVal: number;
    numbers: number[];
};

// function addOption(depth: number, array: string[], options: string[][]) {
//     if (depth < 1) {
//         options.push(array);
//         return;
//     }
//     const a: string[] = structuredClone(array);
//     const b: string[] = structuredClone(array);
//     a.push("+");
//     b.push("*");
//     depth--;
//     addOption(depth, a, options);
//     addOption(depth, b, options);
// }

function addOption(depth: number, array: string[], options: string[][], opps: string[]) {
    if (depth < 1) {
        options.push(array);
        return;
    }
    depth--;

    for (const opp of opps) {
        const newArray = structuredClone(array);
        newArray.push(opp);
        addOption(depth, newArray, options, opps);
    }
}

// function addEntries(depth: number, array: number[], options: number[][]) {
//     if (depth < 1) {
// 		console.log(array)
//         options.push(array);
//         return;
//     }
//     depth--;

//     for (let i = 0; i < 2; i++) {
//         const newArray = structuredClone(array);
//         if (i == 0) {
//             let str: string = String(newArray.pop());
//             let str2 = String(newArray.pop());
//             if (str2 == "undefined") return;
//             let newEntry = str2.concat(str);
//             // console.log(newEntry, str, str2)
//             // console.log(depth)
//             newArray.push(parseInt(newEntry));
//         }
//         // console.log(newArray)
//         addEntries(depth, newArray, options);
//     }
// }

function addEntries(depth: number, array: number[], options: number[][]) {
    if (depth < 1) {
        console.log(array);
        options.push(array);
        return;
    }
    depth--;

    for (let pos = 0; pos < array.length; pos++) {
        for (let i = 0; i < 2; i++) {
            let newArray = structuredClone(array);
            if (i == 0) {
                let str = String(newArray[pos]);
                let str2 = String(newArray[pos + 1]);
                if (str2 == "undefined") return;
                let newEntry = str.concat(str2);
                // console.log(newEntry, str, str2)
                // console.log(depth)
                newArray[pos] = parseInt(newEntry);
                newArray = removeFromArray(newArray, pos + 1);
            }
            // console.log(newArray)
            addEntries(depth, newArray, options);
        }
    }
}

const enc = (s: string) => new TextEncoder().encode(s);
async function part1(entries: Entry[]) {
    let solution = 0;
    let counter1 = 0;
    let counter2 = 0;
    for (const entry of entries) {
        counter2 = 0;
        let valid = false;

        const options: string[][] = [];
        addOption(entry.numbers.length - 1, [], options, ["+", "*"]);

        for (const option of options) {
            // console.log(entry.numbers, " : ",option)
            let sum = entry.numbers[0];
            for (let i = 0; i < option.length; i++) {
                if (option[i] === "+") {
                    sum += entry.numbers[i + 1];
                } else {
                    sum *= entry.numbers[i + 1];
                }
            }
            // console.log(sum)
            if (sum === entry.testVal) {
                // console.log("huzzah!");
                valid = true;
            }
            counter2++;
        }

        counter1++;
        if (valid) solution += entry.testVal;
        await Deno.stdout.write(enc(`${counter1}/${entries.length} | ${counter2}/${options.length} (${valid}) | ${solution}\r`));
    }

    console.log("solution part 1:", solution);
}

async function part2(entries: Entry[]) {
    let solution = 0;
    let counter1 = 0;
	let counter2 = 0;

    for (const entry of entries) {
		counter2++
        let valid = false;

        const options: string[][] = [];
        addOption(entry.numbers.length - 1, [], options, ["+", "*", "||"]);

        for (const option of options) {
            // console.log(entry.numbers, " : ",option)
            let sum = entry.numbers[0];
            for (let i = 0; i < option.length; i++) {
                if (option[i] === "+") {
                    sum += entry.numbers[i + 1];
                } else if (option[i] === "*") {
                    sum *= entry.numbers[i + 1];
                } else if (option[i] === "||") {
                    sum = parseInt(sum.toString().concat(entry.numbers[i + 1].toString()));
                }
            }

            if (sum === entry.testVal) {
                valid = true;
            }
			counter2++
        }
		counter1++;
        if (valid) solution += entry.testVal;
        await Deno.stdout.write(enc(`${counter1}/${entries.length} | ${counter2}/${options.length} (${valid}) | ${solution}\r`));
    }

    console.log("solution part 2:", solution);
}

async function main() {
    const lines = Deno.readTextFileSync(filePath).trim().split("\n");
    const entries: Entry[] = [];
    lines.forEach((val) => {
        const split = val.trim().split(":");
        entries.push({
            testVal: parseInt(split[0]),
            numbers: split[1]
                .slice(1, split[1].length)
                .split(" ")
                .map((val) => parseInt(val)),
        });
    });

    console.log(entries);
    part1(structuredClone(entries));
    part2(structuredClone(entries));
}

main();
