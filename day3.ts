import { announceChallenge, decodeFile } from './common';

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(3, 'Day 3: Mull It Over');

async function part1() {
  let instructionStrings: string = '';
  await decodeFile(filePath, async (lines) => {
    instructionStrings = lines.join('');
  });
  //get the instructions
  const instructions: RegExpExecArray[] = [...instructionStrings.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)];
  console.log(instructions);

  //parse the instructions
  const multipliedInstructions: number[] = instructions.map((instruction) => {
    const numbers: number[] = [...instruction[0].matchAll(/\d{1,3}/g)].map((number) => parseInt(number[0]));
    return numbers[0] * numbers[1];
  });

  const accumulate = multipliedInstructions.reduce((acc, curr) => acc + curr, 0);
  console.log('solution part 1:', accumulate);
}

async function part2() {
  let instructionStrings: string = '';
  await decodeFile(filePath, async (lines) => {
    instructionStrings = lines.join('');
  });
  //get the instructions
  const instructions: RegExpExecArray[] = [...instructionStrings.matchAll(/don't\(\)|do\(\)|mul\(\d{1,3},\d{1,3}\)/g)];
  // console.log(instructions);

  //parse the instructions
  let blocked = false;
  const multipliedInstructions: number[] = instructions.map((instruction) => {
    // return if it's not a number
    if(instruction[0] === "do()") { blocked = false; return 0; }
    if(instruction[0] === "don't()") { blocked = true; return 0;}
    if (blocked) return 0;


    const numbers: number[] = [...instruction[0].matchAll(/\d{1,3}/g)].map((number) => parseInt(number[0]));
    return numbers[0] * numbers[1];
  });

  // console.log(multipliedInstructions);

  const accumulate = multipliedInstructions.reduce((acc, curr) => acc + curr, 0);

  console.log('solution part 2:', accumulate);
}

part1();
part2();
