import * as fs from "node:fs";
import * as path from "node:path";

export async function announceChallenge(day: number, title: string) {
    console.log(`== Day ${day}: ${title} ==`);
}

export function removeFromArray<T>(array: T[], index: number): T[] {
    return array.slice(0, index).concat(array.slice(index + 1));
}

export async function decodeFile(filePath: string, decodeHandler: (lines: Array<string>) => Promise<void>) {
    if (!filePath) {
        console.error("Please provide a file path as a command line argument.");
        Deno.exit(1);
    }

    // Resolve the file path
    const resolvedPath = path.resolve(filePath);

    try {
        // Read the file content
        const data = fs.readFileSync(resolvedPath, "utf8");

        // Split the data into an array of strings
        const lines = data.split("\n");
        await decodeHandler(lines);
    } catch (err) {
        console.error(`Error reading or parsing file: ${err.message}`);
        Deno.exit(1);
    }
}

export function extract2DArray<T>(
    array: Array<Array<T>>,
    x: number,
    y: number,
    width: number,
    height: number
): Array<Array<any>> {
    let newArray: T[][] = [];
    for (let i = y; i < y + height; i++) {
        newArray.push(array[i]?.slice(x, x + width));
    }
    return newArray;
}

export function get2DArrayElementSafe<T>(array: T[][], x: number, y: number): T {
    return array[y]?.[x]
}

export function extract2DArrayFunky<T>(
    array: T[][],
    x: number,
    y: number,
    width: number,
    height: number
): T[][] {
    let newArray: T[][] = [];
    for (let _y = y; _y < y + height; _y++) {
        let line: T[] = [];
        for (let _x = x; _x < x + width; _x++) {
            const char: T = get2DArrayElementSafe(array, _x, _y);
            line.push(char);
            //   line.push(get2DArrayElementSafe(array,_x,_y))
        }
        newArray.push(line);
    }
    return newArray;
}

//arrays are assumed to be of the same size!
export function match2DArray<T>(array: T[][], matcheable: string[][]) {
    // console.log(matcheable)
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (matcheable[y][x] !== "") {
                // console.log(array[y][x], matcheable[y][x])
                if (array[y][x] !== matcheable[y][x]) {
                    return false;
                }
            }
        }
    }
    return true;
}

export function swapElements(arr: any[], index1: number, index2: number) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

export function factorial(num: number) : number {
    if (num == 0) return 1
    else return num * factorial(num - 1)
}