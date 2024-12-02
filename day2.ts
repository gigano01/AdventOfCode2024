import { announceChallenge, decodeFile, removeFromArray } from './common';

// Get the file path from command line arguments
const filePath = process.argv[2];
announceChallenge(2, 'Red-Nosed Reports');

function validateReport(report: number[]): boolean {
  let isIncreasing = report[0] < report[1];
  if (report[0] === report[1]) return false;
  return report.every((n, i) => {
    if (i === 0) return true;

    const distanceValid = Math.abs(n - report[i - 1]) < 4;
    if (!distanceValid) return false;

    if (isIncreasing) {
      return n > report[i - 1];
    } else {
      return n < report[i - 1];
    }
  });
}

async function part1() {
  const reports: number[][] = [];
  await decodeFile(filePath, async (lines) => {
    for (let line of lines) {
      const numbers: number[] = line.split(' ').map((n) => parseInt(n));
      reports.push(numbers);
    }
  });
  let count = 0;
  for (let report of reports) {
    const isValid = validateReport(report);
    if (isValid) count++;
  }

  console.log('solution part 1:', count);
}

async function part2() {
  const reports: number[][] = [];
  await decodeFile(filePath, async (lines) => {
    for (let line of lines) {
      const numbers: number[] = line.split(' ').map((n) => parseInt(n));
      reports.push(numbers);
    }
  });

  let count = 0;
  for (let report of reports) {
    let isValid: boolean = false;
    for (let i = -1; i < report.length + 1; i++) {
      let _report: number[] = [];
      if (i < 0) {
        _report = report;
      } else {
        _report = removeFromArray(report, i);
      }
      isValid = validateReport(_report);
      if (isValid) break;
    }
    if(isValid) count++;
  }

  console.log('solution part 2:', count);
}

async function main() {

  await part1();
  await part2();
}
main();
